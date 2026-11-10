const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== BẮT ĐẦU DỌN DẸP CÁC VÁCH NGĂN XUNG ĐỘT & KHẮC PHỤC CACHE ===');

// 1. CẬP NHẬT server.cjs để tắt triệt để cache trình duyệt cho .html và .js
const serverPath = path.resolve(__dirname, 'server.cjs');
let serverCode = fs.readFileSync(serverPath, 'utf8');

// Thêm headers chống cache vào serveFileWithRange
const oldServeHead = `res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });`;

const newServeHead = `const isCodeOrHtml = contentType.includes('text/html') || contentType.includes('javascript');
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': isCodeOrHtml ? 'no-cache, no-store, must-revalidate, max-age=0' : 'public, max-age=3600',
        'Pragma': isCodeOrHtml ? 'no-cache' : 'public',
        'Expires': isCodeOrHtml ? '0' : '3600'
      });`;

if (serverCode.includes(oldServeHead)) {
  serverCode = serverCode.replace(oldServeHead, newServeHead);
  fs.writeFileSync(serverPath, serverCode, 'utf8');
  console.log('1. Đã cập nhật Cache-Control không cache cho .html và .js trong server.cjs!');
} else {
  console.log('Lưu ý: oldServeHead không khớp hoàn toàn trong server.cjs.');
}

// 2. CẬP NHẬT index.html: Xóa nạp timeline_museum_system.js và thêm cache-buster v=apbac_v7
const indexHtmlPath = path.resolve(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

indexHtml = indexHtml.replace('<script src="./assets/timeline_museum_system.js"></script>', '');
indexHtml = indexHtml.replace(
  /<script type="module" crossorigin src="\.\/assets\/index-BvJfjYD2\.js[^"]*"><\/script>/,
  '<script type="module" crossorigin src="./assets/index-BvJfjYD2.js?v=apbac_v7"></script>'
);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('2. Đã xóa timeline_museum_system.js và thêm cache buster ?v=apbac_v7 vào index.html!');

// 3. CẬP NHẬT assets/index-BvJfjYD2.js: Xóa gọi __INIT_TIMELINE_MUSEUM_SYSTEM__
const jsPath = path.resolve(__dirname, 'assets/index-BvJfjYD2.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

jsCode = jsCode.replace(
  /if \(typeof window\.__INIT_TIMELINE_MUSEUM_SYSTEM__ === "function"\) \{\s*window\.__INIT_TIMELINE_MUSEUM_SYSTEM__\(window\.__MUSEUM_3D_CTX__\);\s*\}/g,
  '/* Timeline museum system call disabled to prevent wall collisions */'
);

new vm.Script(jsCode);
fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('3. Đã vô hiệu hóa gọi __INIT_TIMELINE_MUSEUM_SYSTEM__ trong assets/index-BvJfjYD2.js!');

// 4. LÀM SẠCH assets/timeline_museum_system.js
const timelineJsPath = path.resolve(__dirname, 'assets/timeline_museum_system.js');
const safeTimelineCode = `
/**
 * TIMELINE MUSEUM SYSTEM - ĐÃ ĐỒNG BỘ VÀO KHÔNG GIAN ĐỘI ẤP BẮC
 * Vô hiệu hóa việc tự tạo vách ngăn 1965-1975 trùng lặp để tránh xung đột với rạp chiếu phim và phòng trưng bày số 3.
 */
(function() {
  window.__INIT_TIMELINE_MUSEUM_SYSTEM__ = function() {
    console.log('[TIMELINE SYSTEM] Đã đồng bộ với Phòng tranh lịch sử Đội Ấp Bắc 1961 - 1965.');
    return null;
  };
})();
`;
fs.writeFileSync(timelineJsPath, safeTimelineCode, 'utf8');
console.log('4. Đã làm sạch assets/timeline_museum_system.js!');

// 5. ĐỒNG BỘ SANG BAO_TANG_LICH_SU_SO.html
const htmlPath = path.resolve(__dirname, 'BAO_TANG_LICH_SU_SO.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const scriptStartTag = '<script type="module">';
const scriptEndTag = '</script>';
const sIdx = html.indexOf(scriptStartTag);
const eIdx = html.lastIndexOf(scriptEndTag);
if (sIdx !== -1 && eIdx !== -1) {
  html = html.substring(0, sIdx + scriptStartTag.length) + '\n' + jsCode + '\n' + html.substring(eIdx);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log('5. Đã đồng bộ hoàn tất sang BAO_TANG_LICH_SU_SO.html!');
}

console.log('=== HOÀN TẤT THÀNH CÔNG ===');

