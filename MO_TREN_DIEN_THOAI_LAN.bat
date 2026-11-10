@echo off
title KET NOI DA THIET BI - BAO TANG LICH SU SO 1954-1975
chcp 65001 > nul

echo ===================================================================
echo   📱 HƯỚNG DẪN MỞ BẢO TÀNG TRÊN ĐIỆN THOẠI, IPAD & THIẾT BỊ KHÁC
echo ===================================================================
echo.

:: Dò tìm địa chỉ IP mạng nội bộ (Wi-Fi / LAN)
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"Dia chi IPv4"') do (
    set LOCAL_IP=%%a
    goto :found_ip
)

:found_ip
:: Xóa khoảng trắng thừa
set LOCAL_IP=%LOCAL_IP: =%

echo [1] ĐỊA CHỈ TRUY CẬP CHO ĐIỆN THOẠI & IPAD (CÙNG MẠNG WI-FI):
echo.
echo     👉 Bản Tham Quan 3D:   http://%LOCAL_IP%:3000/?room=lesson-1
echo     👉 Bản Quản Trị Admin:  http://%LOCAL_IP%:3000/admin.html
echo.
echo ===================================================================
echo   QUY TRÌNH KẾT NỐI 2 BƯỚC CỰC KỲ ĐƠN GIẢN:
echo   1. Kết nối điện thoại / iPad vào CÙNG MẠNG WI-FI với máy tính này.
echo   2. Mở Camera hoặc trình duyệt Safari / Chrome trên điện thoại:
echo      - Quét mã QR hiển thị ở góc màn hình máy tính.
echo      - Hoặc gõ trực tiếp: http://%LOCAL_IP%:3000
echo.
echo   * Lưu ý nếu điện thoại không tải được: Kiểm tra xem mạng Wi-Fi trên
echo     máy tính đã chọn chế độ "Private Network" hoặc mở tường lửa cổng 3000.
echo ===================================================================
echo.

:: Kiểm tra máy chủ và mở trình duyệt
powershell -Command "try { $res = Invoke-RestMethod -Uri 'http://localhost:3000/?room=lesson-1api/ai-status' -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [2] Đang mở trình duyệt hiển thị mã QR...
    start "" "http://localhost:3000/?room=lesson-1?room=lesson-1"
) else (
    echo [2] Đang khởi động máy chủ nền...
    start "" "http://localhost:3000/?room=lesson-1?room=lesson-1"
    node server.cjs
)
