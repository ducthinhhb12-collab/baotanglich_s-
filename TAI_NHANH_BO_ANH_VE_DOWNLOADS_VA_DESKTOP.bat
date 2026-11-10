@echo off
title TAI BO ANH DU AN VE DOWNLOADS VA DESKTOP
chcp 65001 > nul
cls

echo ===================================================================
echo   🏛️ BẢO TÀNG LỊCH SỬ SỐ 3D — TẢI TRỌN BỘ ẢNH THEO KẾ HOẠCH
echo ===================================================================
echo.
echo [1] Đang giải phóng toàn bộ ảnh vào thư mục Downloads...
xcopy /e /i /y "%~dp0BO_SUU_TAP_HINH_ANH_THEO_KE_HOACH" "%USERPROFILE%\Downloads\BO_SUU_TAP_HINH_ANH_THEO_KE_HOACH" >nul 2>nul
copy /y "%~dp0BO_SUU_TAP_HINH_ANH_BAO_TANG_THEO_KE_HOACH.zip" "%USERPROFILE%\Downloads\" >nul 2>nul

echo [2] Đang tạo lối tắt trọn bộ ảnh trên Màn hình chính (Desktop)...
copy /y "%~dp0BO_SUU_TAP_HINH_ANH_BAO_TANG_THEO_KE_HOACH.zip" "%USERPROFILE%\Desktop\" >nul 2>nul

echo.
echo [THÀNH CÔNG] Toàn bộ ảnh theo bản kế hoạch đã có trong:
echo   -> %USERPROFILE%\Downloads\BO_SUU_TAP_HINH_ANH_THEO_KE_HOACH
echo   -> %USERPROFILE%\Desktop\BO_SUU_TAP_HINH_ANH_BAO_TANG_THEO_KE_HOACH.zip
echo.
echo Đang mở thư mục ảnh cho bạn...
explorer.exe "%USERPROFILE%\Downloads\BO_SUU_TAP_HINH_ANH_THEO_KE_HOACH"
echo.
pause
