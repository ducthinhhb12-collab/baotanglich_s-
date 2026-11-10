@echo off
title DONG GOI TOAN BO DU AN RA FILE ZIP
chcp 65001 > nul
cls

echo ===================================================================
echo   📦 ĐÓNG GÓI BẢO TÀNG LỊCH SỬ SỐ 3D THÀNH FILE ZIP
echo ===================================================================
echo.
echo Đang nén toàn bộ mã nguồn, mô hình 3D, video và âm thanh...
echo Vui lòng chờ trong giây lát (khoảng 30 giây - 1 phút)...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0package_project.ps1"

echo.
echo ===================================================================
echo   File nén đã được lưu tại: BaoTangLichSuSo_3D_Full.zip
echo   Bạn có thể copy file này sang USB hoặc gửi cho người khác!
echo ===================================================================
echo.
pause

