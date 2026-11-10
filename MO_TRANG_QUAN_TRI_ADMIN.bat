@echo off
title BANG QUAN TRI ADMIN & PHONG THU LONG TIENG - BAO TANG LICH SU SO
chcp 65001 > nul

echo ===================================================================
echo   🏛️ BẢNG QUẢN TRỊ ADMIN - BẢO TÀNG LỊCH SỬ SỐ (1954 - 1975)
echo   Quản lý Khung Trưng Bày, Sơ Đồ 2D, Khẩu Hiệu & Phòng Thu Lồng Tiếng
echo ===================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [1] Đang kết nối máy chủ quản trị bảo tàng...
    
    :: Kiểm tra xem máy chủ đã chạy trên cổng 3000 chưa
    powershell -Command "try { $res = Invoke-RestMethod -Uri 'http://localhost:3000/api/ai-status' -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [2] Máy chủ đã sẵn sàng hoạt động!
        echo [3] Đang mở Bản Admin tại: http://localhost:3000/admin.html
        start "" "http://localhost:3000/admin.html"
    ) else (
        echo [2] Đang khởi động máy chủ nền...
        start "" "http://localhost:3000/admin.html"
        node server.cjs
    )
) else (
    echo [LỖI] Không tìm thấy Node.js trên máy tính của bạn!
    echo Vui lòng cài đặt Node.js từ https://nodejs.org để sử dụng đầy đủ tính năng Admin & Lồng tiếng.
    pause
)
