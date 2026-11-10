const zlib = require('zlib');

// =========================================================================
// EMBEDDED PURE JS QR CODE GENERATOR (ZERO DEPENDENCIES)
// =========================================================================
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x = x < 128 ? x << 1 : (x << 1) ^ 0x11D;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();
function gfMul(a, b) { return a && b ? GF_EXP[GF_LOG[a] + GF_LOG[b]] : 0; }
function rsEncode(data, ecLen) {
  let g = [1];
  for (let i = 0; i < ecLen; i++) {
    const ng = new Array(g.length + 1).fill(0);
    for (let j = 0; j < g.length; j++) {
      ng[j] ^= g[j];
      ng[j + 1] ^= gfMul(g[j], GF_EXP[i]);
    }
    g = ng;
  }
  const msg = [...data, ...new Array(ecLen).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const c = msg[i];
    if (c) for (let j = 0; j < g.length; j++) msg[i + j] ^= gfMul(g[j], c);
  }
  return msg.slice(data.length);
}
const VC_M = [
  null,
  [14, 16, 10, [[1, 16]]], [26, 28, 16, [[1, 28]]], [42, 44, 26, [[1, 44]]],
  [62, 64, 18, [[2, 32]]], [84, 86, 24, [[2, 43]]], [106, 108, 16, [[4, 27]]],
  [122, 124, 18, [[4, 31]]], [152, 154, 22, [[2, 38], [2, 39]]]
];
const ALIGN_PAT = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42]];
const FORMAT_M = [0x5412, 0x5125, 0x5E7C, 0x5B4B, 0x45F9, 0x40CE, 0x4F97, 0x4AA0];

function generateQRDataUrl(text) {
  const bytes = Buffer.from(text, 'utf8');
  let ver = 1;
  while (ver < VC_M.length && VC_M[ver][0] < bytes.length) ver++;
  if (ver >= VC_M.length) ver = VC_M.length - 1;
  const [cap, totalData, ecLen, blocks] = VC_M[ver];
  const size = 17 + 4 * ver;
  const bits = [];
  function pushBits(val, len) { for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1); }
  pushBits(4, 4); pushBits(Math.min(bytes.length, cap), 8);
  for (let i = 0; i < Math.min(bytes.length, cap); i++) pushBits(bytes[i], 8);
  while (bits.length < totalData * 8) { pushBits(0, Math.min(4, totalData * 8 - bits.length)); break; }
  while (bits.length % 8 !== 0) bits.push(0);
  const pads = [0xEC, 0x11]; let pIdx = 0;
  while (bits.length < totalData * 8) pushBits(pads[pIdx++ % 2], 8);
  const dataCW = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
    dataCW.push(b);
  }
  const blockData = [], blockEC = []; let cwPos = 0;
  for (const [nBlocks, blkLen] of blocks) {
    for (let b = 0; b < nBlocks; b++) {
      const blk = dataCW.slice(cwPos, cwPos + blkLen); cwPos += blkLen;
      blockData.push(blk); blockEC.push(rsEncode(blk, ecLen));
    }
  }
  const finalCW = [];
  const maxDataLen = Math.max(...blockData.map(b => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const b of blockData) if (i < b.length) finalCW.push(b[i]);
  }
  for (let i = 0; i < ecLen; i++) {
    for (const e of blockEC) finalCW.push(e[i]);
  }
  const mat = Array.from({ length: size }, () => new Int8Array(size).fill(-1));
  function setFinder(r0, c0) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        mat[r0 + r][c0 + c] = (isBorder || isCenter) ? 1 : 0;
      }
    }
  }
  setFinder(0, 0); setFinder(0, size - 7); setFinder(size - 7, 0);
  for (let i = 0; i < 8; i++) {
    mat[7][i] = 0; mat[i][7] = 0;
    mat[7][size - 1 - i] = 0; mat[i][size - 8] = 0;
    mat[size - 8][i] = 0; mat[size - 1 - i][7] = 0;
  }
  for (let i = 8; i < size - 8; i++) {
    mat[6][i] = (i % 2 === 0) ? 1 : 0; mat[i][6] = (i % 2 === 0) ? 1 : 0;
  }
  const align = ALIGN_PAT[ver];
  for (const r of align) {
    for (const c of align) {
      if ((r === 6 && c === 6) || (r === 6 && c === size - 7) || (r === size - 7 && c === 6)) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          mat[r + dr][c + dc] = (Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)) ? 1 : 0;
        }
      }
    }
  }
  mat[4 * ver + 9][8] = 1;
  const allBits = [];
  for (const cw of finalCW) for (let i = 7; i >= 0; i--) allBits.push((cw >> i) & 1);
  let bitIdx = 0, upwards = true;
  for (let c = size - 1; c > 0; c -= 2) {
    if (c === 6) c--;
    const rows = upwards ? Array.from({ length: size }, (_, i) => size - 1 - i) : Array.from({ length: size }, (_, i) => i);
    for (const r of rows) {
      for (const col of [c, c - 1]) {
        if (mat[r][col] === -1) mat[r][col] = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
      }
    }
    upwards = !upwards;
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (mat[r][c] >= 0) {
        const isFinder = (r < 9 && c < 9) || (r < 9 && c >= size - 8) || (r >= size - 8 && c < 9);
        const isTiming = (r === 6 || c === 6);
        if (!isFinder && !isTiming && !(r === 4 * ver + 9 && c === 8)) {
          if ((r + c) % 2 === 0) mat[r][c] ^= 1;
        }
      }
    }
  }
  const fmt = FORMAT_M[0];
  for (let i = 0; i < 6; i++) mat[8][i] = (fmt >> i) & 1;
  mat[8][7] = (fmt >> 6) & 1; mat[8][8] = (fmt >> 7) & 1; mat[7][8] = (fmt >> 8) & 1;
  for (let i = 9; i < 15; i++) mat[14 - i][8] = (fmt >> i) & 1;
  for (let i = 0; i < 8; i++) mat[size - 1 - i][8] = (fmt >> i) & 1;
  for (let i = 8; i < 15; i++) mat[8][size - 15 + i] = (fmt >> i) & 1;

  // Build PNG
  const scale = 10, margin = 4;
  const w = (size + margin * 2) * scale;
  const rowBytes = 1 + w * 3;
  const raw = Buffer.alloc(rowBytes * w, 255);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (mat[r][c] === 1) {
        const sy = (r + margin) * scale, sx = (c + margin) * scale;
        for (let y = 0; y < scale; y++) {
          const rowStart = (sy + y) * rowBytes + 1;
          for (let x = 0; x < scale; x++) {
            const px = rowStart + (sx + x) * 3;
            raw[px] = 0; raw[px + 1] = 0; raw[px + 2] = 0;
          }
        }
      }
    }
  }
  const compressed = zlib.deflateSync(raw);
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(w, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const pngBuf = Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
  return 'data:image/png;base64,' + pngBuf.toString('base64');
}
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  CRC_TABLE[i] = c;
}
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { getAIStatus, handleChatRequest } = require('./server/apiHandler.cjs');

let QRCode = null;
try {
  QRCode = require('qrcode');
} catch (e) {
  try {
    QRCode = require(path.resolve(__dirname, '..', 'node_modules', 'qrcode'));
  } catch (err) { }
}

const PORT = process.env.PORT || 3000;
const DIST_DIR = fs.existsSync(path.resolve(__dirname, 'dist')) ? path.resolve(__dirname, 'dist') : __dirname;
const DATA_FILE = path.resolve(__dirname, 'museum-data.json');
const UPLOADS_DIR = path.resolve(__dirname, 'media', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.jfif': 'image/jpeg',
  '.cache': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.wasm': 'application/wasm',
  '.task': 'application/octet-stream',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogv': 'video/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.zip': 'application/zip'
};

// SSE Clients Registry
const sseClients = new Set();

function broadcastVisitorCount() {
  const count = sseClients.size;
  broadcastSSE('VISITOR_COUNT', { count, timestamp: Date.now() });
  console.log(`[MULTI-USER] 👥 Số người đang tham quan trực tuyến: ${count}`);
}

function broadcastSSE(eventType, data) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  const rawPayload = `data: ${JSON.stringify({ type: eventType, data })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
      client.write(rawPayload);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Heartbeat for SSE
setInterval(() => {
  const ping = `: ping ${Date.now()}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(ping);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}, 20000);

function serveFileWithRange(req, res, filePath, contentType) {
  try {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
        return res.end();
      }
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      file.pipe(res);
    } else {
      const isCodeOrHtml = contentType.includes('text/html') || contentType.includes('javascript');
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': isCodeOrHtml ? 'no-cache, no-store, must-revalidate, max-age=0' : 'public, max-age=3600',
        'Pragma': isCodeOrHtml ? 'no-cache' : 'public',
        'Expires': isCodeOrHtml ? '0' : '3600'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Error reading file: ' + err.message);
  }
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range, X-Filename');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // Endpoint tải nhanh trọn bộ ảnh theo bản kế hoạch
  if (pathname === '/download-images' || pathname === '/download-images-zip' || pathname === '/api/download-images') {
    const zipPath = path.resolve(__dirname, 'BO_SUU_TAP_HINH_ANH_BAO_TANG_THEO_KE_HOACH.zip');
    if (fs.existsSync(zipPath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="BO_SUU_TAP_HINH_ANH_BAO_TANG_THEO_KE_HOACH.zip"');
      serveFileWithRange(req, res, zipPath, 'application/zip');
      return;
    }
  }

  // 1. API: AI Status
  if (pathname === '/api/ai-status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(getAIStatus()));
    return;
  }

  // 2. API: AI Chat
  if (pathname === '/api/chat' && req.method === 'POST') {
    let bodyStr = '';
    req.on('data', chunk => { bodyStr += chunk; });
    req.on('end', async () => {
      try {
        const body = JSON.parse(bodyStr || '{}');
        const result = await handleChatRequest(body);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 3. API: GET /api/exhibits
  if (pathname === '/api/exhibits' && req.method === 'GET') {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(data);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'museum-data.json not found' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // 4. API: POST /api/exhibits
  if (pathname === '/api/exhibits' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const bodyStr = Buffer.concat(chunks).toString('utf8');
        const incoming = JSON.parse(bodyStr || '{}');
        let existingData = {};
        if (fs.existsSync(DATA_FILE)) {
          try {
            existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
          } catch (e) { }
        }
        const updatedData = { ...existingData, ...incoming };
        updatedData.lastUpdated = Date.now();

        fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8');
        console.log(`[SYNC] Dữ liệu bảo tàng đã được cập nhật lúc ${new Date().toLocaleTimeString('vi-VN')}`);

        // Broadcast SSE
        broadcastSSE('MUSEUM_UPDATED', updatedData);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, lastUpdated: updatedData.lastUpdated, data: updatedData }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Failed to save exhibits: ' + err.message }));
      }
    });
    return;
  }

  // 5. API: POST /api/upload
  if (pathname === '/api/upload' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const headerFilename = req.headers['x-filename'];
        let targetFileName = '';
        let fileBuffer = null;

        if (headerFilename) {
          const sanitized = decodeURIComponent(headerFilename).replace(/[^a-zA-Z0-9._-]/g, '_');
          targetFileName = `${Date.now()}_${sanitized}`;
          fileBuffer = Buffer.concat(chunks);
        } else {
          const bodyStr = Buffer.concat(chunks).toString('utf8');
          const body = JSON.parse(bodyStr || '{}');
          const rawName = body.fileName || `file_${Date.now()}`;
          const sanitized = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
          targetFileName = `${Date.now()}_${sanitized}`;

          let base64Data = body.fileData || '';
          if (base64Data.includes(',')) {
            base64Data = base64Data.split(',')[1];
          }
          fileBuffer = Buffer.from(base64Data, 'base64');
        }

        const outPath = path.join(UPLOADS_DIR, targetFileName);
        fs.writeFileSync(outPath, fileBuffer);

        const publicUrl = `./media/uploads/${targetFileName}`;
        console.log(`[UPLOAD] Đã lưu file: ${targetFileName} (${fileBuffer.length} bytes)`);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          url: publicUrl,
          fileName: targetFileName,
          size: fileBuffer.length
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Upload failed: ' + err.message }));
      }
    });
    return;
  }

  // 6. API: GET /api/network-info
  if (pathname === '/api/network-info' && req.method === 'GET') {
    const localIp = getLocalIpAddress();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      localIp,
      port: PORT,
      userUrl: `http://${localIp}:${PORT}/?role=user`,
      adminUrl: `http://${localIp}:${PORT}/admin.html`,
      localUrl: `http://localhost:${PORT}/?role=user`,
      hostname: os.hostname()
    }));
    return;
  }

  // 7. API: GET /api/qr (LUÔN TRẢ VỀ MÃ QR THỰC TẾ)
  if (pathname === '/api/qr' && req.method === 'GET') {
    const localIp = getLocalIpAddress();
    const targetUrl = parsedUrl.searchParams.get('url') || `http://${localIp}:${PORT}/`;
    try {
      const dataUrl = generateQRDataUrl(targetUrl);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, qr: dataUrl, url: targetUrl, localIp, port: PORT }));
    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message, url: targetUrl }));
    }
    return;
  }

  // 8. API: GET /api/events (Server-Sent Events)
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    sseClients.add(res);
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', clientsCount: sseClients.size })}\n\n`);
    broadcastVisitorCount();

    req.on('close', () => {
      sseClients.delete(res);
      broadcastVisitorCount();
    });
    return;
  }

  // 9. API: GET /api/visitors (Lấy số lượng người đang trực tuyến)
  if (pathname === '/api/visitors' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ count: sseClients.size, timestamp: Date.now() }));
    return;
  }

  // 10. Shortcut Routing
  if (pathname === '/admin' || pathname === '/admin.html') {
    const adminPath = path.join(__dirname, 'admin.html');
    if (fs.existsSync(adminPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(adminPath).pipe(res);
      return;
    }
  }

  // 11. API: Tải trực tiếp file dự án ZIP về máy người dùng
  if (pathname === '/download' || pathname === '/download-zip' || pathname === '/BaoTangLichSuSo_3D_Full.zip') {
    const zipPath = path.join(__dirname, 'BaoTangLichSuSo_3D_Full.zip');
    if (fs.existsSync(zipPath)) {
      const stat = fs.statSync(zipPath);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="BaoTangLichSuSo_3D_Full.zip"',
        'Content-Length': stat.size
      });
      fs.createReadStream(zipPath).pipe(res);
      console.log(`[DOWNLOAD] 📦 Đang tải file dự án BaoTangLichSuSo_3D_Full.zip (${(stat.size / 1024 / 1024).toFixed(1)} MB)...`);
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File zip chưa sẵn sàng. Hãy chạy DONG_GOI_ZIP.bat để tạo gói.');
      return;
    }
  }

  // 12. Static File Serving
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch (e) {
    decodedPath = pathname;
  }

  let filePath = path.join(DIST_DIR, decodedPath === '/' ? 'index.html' : decodedPath);

  if (decodedPath.startsWith('/media/')) {
    filePath = path.join(__dirname, decodedPath);
  } else if (decodedPath.startsWith('/public/')) {
    filePath = path.join(__dirname, decodedPath);
  } else if (decodedPath.startsWith('/assets/doi-ap-bac/')) {
    filePath = path.join(__dirname, 'public', decodedPath);
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    if (pathname === '/admin' || pathname === '/admin.html') {
      filePath = path.join(__dirname, 'admin.html');
    } else {
      filePath = path.join(DIST_DIR, 'index.html');
    }
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    serveFileWithRange(req, res, filePath, contentType);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

// Tối ưu kết nối đồng thời cho nhiều người dùng (Keep-Alive)
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  console.log(`===================================================================`);
  console.log(`  🏛️ BẢO TÀNG LỊCH SỬ SỐ (1954 - 1975) - MÁY CHỦ ĐA NGƯỜI DÙNG`);
  console.log(`===================================================================`);
  console.log(`  👉 TRÊN MÁY TÍNH NÀY (HOST):`);
  console.log(`     • Tham Quan 3D:        http://localhost:${PORT}/`);
  console.log(`     • Quản Trị Admin:      http://localhost:${PORT}/admin.html`);
  console.log(`     • Sa Bàn Đồng Khởi:    http://localhost:${PORT}/SA_BAN_DONG_KHOI_3D.html`);
  console.log(`\n  👉 TRÊN THIẾT BỊ KHÁC (ĐIỆN THOẠI, IPAD, LAPTOP CÙNG WI-FI):`);
  console.log(`     • Link trực tiếp:      http://${localIp}:${PORT}/`);
  console.log(`     • Quản Trị Từ Xa:      http://${localIp}:${PORT}/admin.html`);
  console.log(`     • Quét mã QR kết nối:  http://${localIp}:${PORT}/api/qr`);
  console.log(`     • Hoặc mở file:        XEM_MA_QR.html`);
  console.log(`\n  👉 CƠ CHẾ ĐA NGƯỜI DÙNG (MULTI-USER READY):`);
  console.log(`     • Cập nhật số người online thời gian thực qua Server-Sent Events (/api/events)`);
  console.log(`     • Tự động đồng bộ nội dung & thuyết minh giữa tất cả thiết bị`);
  console.log(`     • Hỗ trợ phát đa luồng âm thanh & video mượt mà`);
  console.log(`     • Trạng thái AI:       ${getAIStatus().message}`);
  console.log(`===================================================================\n`);
});
