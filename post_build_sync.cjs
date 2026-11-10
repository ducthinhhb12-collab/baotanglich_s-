const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'dist', 'assets');
const destDir = path.resolve(__dirname, 'assets');

// 1. Copy tất cả file từ dist/assets sang assets
const files = fs.readdirSync(srcDir);
let latestJs = '';
files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  if (f.endsWith('.js') && f.startsWith('index-')) {
    latestJs = f;
  }
});

console.log('1. Đã sao chép các tệp build mới vào thư mục assets! Latest JS:', latestJs);

// 2. Cập nhật index.html
if (latestJs) {
  const indexHtmlPath = path.resolve(__dirname, 'index.html');
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  html = html.replace(/src="\.\/assets\/index-[^"]+\.js"/g, `src="./assets/${latestJs}"`);
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log('2. Đã cập nhật index.html với bundle mới:', latestJs);
}

// 3. Tái tạo BAO_TANG_LICH_SU_SO.html (file HTML đơn lẻ)
const singleHtmlScript = path.resolve(__dirname, '..', 'create_single_html.cjs');
if (fs.existsSync(singleHtmlScript)) {
  const { execSync } = require('child_process');
  try {
    execSync('node create_single_html.cjs', { cwd: path.resolve(__dirname, '..') });
    fs.copyFileSync(
      path.resolve(__dirname, '..', 'BAO_TANG_LICH_SU_SO.html'),
      path.resolve(__dirname, 'BAO_TANG_LICH_SU_SO.html')
    );
    console.log('3. Đã cập nhật tệp chạy offline BAO_TANG_LICH_SU_SO.html!');
  } catch (err) {
    console.error('Lỗi tạo single html:', err.message);
  }
}

// 4. Chạy lại generate_qr.cjs
const genQrScript = path.resolve(__dirname, 'generate_qr.cjs');
if (fs.existsSync(genQrScript)) {
  const { execSync } = require('child_process');
  try {
    execSync('node generate_qr.cjs', { cwd: __dirname });
    console.log('4. Đã cập nhật mã QR trỏ thẳng vào ?room=lesson-1!');
  } catch (err) {
    console.error('Lỗi generate qr:', err.message);
  }
}

console.log('>>> ĐỒNG BỘ HOÀN TẤT 100%!');
