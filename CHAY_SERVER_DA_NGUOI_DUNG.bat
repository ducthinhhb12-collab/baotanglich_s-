@echo off
title MAY CHU BAO TANG 3D - DA THIET BI & DA NGUOI DUNG
chcp 65001 > nul
cls

echo ===============================================================================
echo   🏛️  MÁY CHỦ BẢO TÀNG LỊCH SỬ SỐ 3D (1954 - 1975) - ĐA THIẾT BỊ & ĐA NGƯỜI DÙNG
echo ===============================================================================
echo.

:: Tim dia chi IP mang noi bo (Wi-Fi / LAN)
set LOCAL_IP=127.0.0.1
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address" /c:"Dia chi IPv4"') do (
    set LOCAL_IP=%%a
    goto :ip_found
)

:ip_found
set LOCAL_IP=%LOCAL_IP: =%

echo  [1] TRUY CẬP TRÊN MÁY TÍNH NÀY (MÁY CHỦ):
echo      👉 Bản Tham Quan 3D:    http://localhost:3000/
echo      👉 Bản Quản Trị Admin:  http://localhost:3000/admin.html
echo      👉 Sa Bàn Đồng Khởi:    http://localhost:3000/SA_BAN_DONG_KHOI_3D.html
echo.
echo  [2] DÀNH CHO NHIỀU NGƯỜI TRUY CẬP CÙNG LÚC (ĐIỆN THOẠI, IPAD, MÁY TÍNH KHÁC):
echo      👉 Tất cả thiết bị chỉ cần kết nối CÙNG MẠNG WI-FI với máy tính này!
echo      👉 Mở trình duyệt gõ:   http://%LOCAL_IP%:3000/
echo      👉 Hoặc quét mã QR tại: http://%LOCAL_IP%:3000/api/qr
echo.
echo  [3] TÍNH NĂNG ĐA NGƯỜI DÙNG HOẠT ĐỘNG:
echo      • Hiển thị số lượng người đang online trực tiếp trên thanh công cụ
echo      • Tự động đồng bộ nội dung & thuyết minh tức thì (Server-Sent Events)
echo      • Tải nhanh mô hình 3D, video màn chiếu và âm thanh không bị giật lag
echo ===============================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [LỖI] Máy tính chưa cài Node.js!
    echo Đang mở bản HTML tĩnh dự phòng...
    start "" "%~dp0BAO_TANG_LICH_SU_SO.html"
    pause
    exit /b
)

echo [OK] Đang khởi động máy chủ và mở trình duyệt...
echo [TIP] Giữ cửa sổ đen này chạy để máy chủ tiếp tục phục vụ người tham quan.
echo.

start "" "http://localhost:3000/"
node server.cjs
pause

