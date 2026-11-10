@echo off
title TAI FILE DU AN VE DOWNLOADS VA DESKTOP
chcp 65001 > nul
cls

echo ===================================================================
echo   📦 CHUYỂN FILE DỰ ÁN VÀO THƯ MỤC DOWNLOADS & MÀN HÌNH CHÍNH (DESKTOP)
echo ===================================================================
echo.

set SRC=%~dp0BaoTangLichSuSo_3D_Full.zip

if not exist "%SRC%" (
    echo [THÔNG BÁO] Chưa tìm thấy file zip, đang nén tự động...
    powershell -ExecutionPolicy Bypass -File "%~dp0package_project.ps1"
)

echo [1] Đang sao chép file vào thư mục Downloads...
copy /y "%SRC%" "%USERPROFILE%\Downloads\BaoTangLichSuSo_3D_Full.zip" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo     ✅ Đã lưu vào: %USERPROFILE%\Downloads\BaoTangLichSuSo_3D_Full.zip
) else (
    echo     ⚠️ Không thể copy vào Downloads, vui lòng kiểm tra quyền.
)

echo.
echo [2] Đang sao chép file ra Màn hình chính (Desktop)...
copy /y "%SRC%" "%USERPROFILE%\Desktop\BaoTangLichSuSo_3D_Full.zip" >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo     ✅ Đã lưu vào: %USERPROFILE%\Desktop\BaoTangLichSuSo_3D_Full.zip
) else (
    echo     ⚠️ Không thể copy ra Desktop.
)

echo.
echo [3] Đang mở thư mục chứa file...
explorer.exe /select,"%USERPROFILE%\Downloads\BaoTangLichSuSo_3D_Full.zip"

echo.
echo ===================================================================
echo   HOÀN TẤT! File dự án đã sẵn sàng trong thư mục Downloads của bạn.
echo ===================================================================
echo.
pause

