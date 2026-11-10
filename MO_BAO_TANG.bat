@echo off
title BAN NGUOI DUNG - BAO TANG LICH SU SO 1954-1975 (3D)
chcp 65001 > nul

echo ===================================================================
echo   🏛️ BẢN NGƯỜI DÙNG - BẢO TÀNG LỊCH SỬ SỐ (1954 - 1975)
echo   Không gian Triển Lãm 3D • Hướng Dẫn Viên AI • Thuyết Minh Lịch Sử
echo ===================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [1] Đang kiểm tra máy chủ bảo tàng...
    powershell -Command "try { $res = Invoke-RestMethod -Uri 'http://localhost:3000/api/ai-status' -TimeoutSec 1; exit 0 } catch { exit 1 }" >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [2] Máy chủ đã sẵn sàng hoạt động!
        echo [3] Đang mở Bản Người Dùng tại: http://localhost:3000/?room=lesson-1
        start "" "http://localhost:3000/?room=lesson-1"
    ) else (
        echo [2] Đang khởi động máy chủ bảo tàng...
        start "" "http://localhost:3000/?room=lesson-1"
        node server.cjs
    )
) else (
    echo [2] Khởi động trình phát tĩnh nội bộ...
    start "" "BAO_TANG_LICH_SU_SO.html"
)
