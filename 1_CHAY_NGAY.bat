@echo off
title BAO TANG LICH SU SO 3D - KHOI DONG HE THONG
chcp 65001 > nul
cls

echo ===================================================================
echo   🏛️ HỆ THỐNG BẢO TÀNG LỊCH SỬ SỐ (1954 - 1975) - KHỞI ĐỘNG
echo ===================================================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [1/3] Kiểm tra trạng thái máy chủ cổng 3000...
    netstat -ano | findstr :3000 >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo       ✅ Máy chủ cổng 3000 đã hoạt động từ trước!
    ) else (
        echo       ⚙️ Đang khởi động máy chủ Node.js (cổng 3000)...
        start "🏛️ Máy Chủ Bảo Tàng 3D (Port 3000) - Vui Lòng Không Đóng" cmd /c "node server.cjs"
        echo [2/3] Đang đợi máy chủ thiết lập kết nối (3 giây)...
        timeout /t 3 /nobreak >nul
    )

    echo [3/3] Đang mở Phòng Triển Lãm 3D trên trình duyệt của bạn...
    start "" "http://localhost:3000/"

    echo.
    echo ===================================================================
    echo   🎉 HỆ THỐNG ĐÃ KHỞI ĐỘNG THÀNH CÔNG!
    echo ===================================================================
    echo   👉 [1] PHÒNG THAM QUAN 3D:    http://localhost:3000/
    echo   👉 [2] BẢN QUẢN TRỊ ADMIN:    http://localhost:3000/admin.html
    echo   👉 [3] SA BÀN 3D CHIẾN TRANH ĐẶC BIỆT: http://localhost:3000/SA_BAN_CHIEN_TRANH_DAC_BIET_3D.html
    echo   👉 [4] MỞ TRÊN ĐIỆN THOẠI:    Bấm nút "📱 Mở Trên Điện Thoại" để quét QR
    echo ===================================================================
    echo   💡 Lưu ý quan trọng:
    echo   • Cửa sổ "Máy Chủ Bảo Tàng 3D (Port 3000)" cần được duy trì mở.
    echo   • Để chạy bản độc lập không cần Node.js: mở "2_MO_BAN_OFFLINE.bat".
    echo ===================================================================
    echo.
    echo Bấm phím bất kỳ để đóng cửa sổ này (máy chủ 3D vẫn tiếp tục chạy)...
    pause >nul
) else (
    echo ===================================================================
    echo   ⚠️ KHÔNG TÌM THẤY NODE.JS TRÊN MÁY TÍNH CỦA BẠN!
    echo ===================================================================
    echo   Hệ thống đang tự động mở Bản Độc Lập Hoàn Chỉnh (Offline):
    echo   -> BAO_TANG_LICH_SU_SO.html
    echo   (Bản độc lập chạy trực tiếp trên trình duyệt, không cần cài đặt)
    echo ===================================================================
    start "" "BAO_TANG_LICH_SU_SO.html"
    echo.
    echo Bấm phím bất kỳ để thoát...
    pause >nul
)
