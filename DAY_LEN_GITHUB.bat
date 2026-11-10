@echo off
chcp 65001 >nul
title ĐẨY DỰ ÁN BẢO TÀNG LỊCH SỬ SỐ LÊN GITHUB

echo =====================================================================
echo    🏛️ CÔNG CỤ TỰ ĐỘNG ĐẨY DỰ ÁN LÊN GITHUB (MÃ NGUỒN MỞ)
echo =====================================================================
echo.

:: 1. Kiểm tra Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Máy tính chưa cài đặt Git.
    echo Vui lòng tải và cài đặt Git từ: https://git-scm.com/
    pause
    exit /b
)

:: 2. Kiểm tra hoặc cấu hình thông tin cá nhân của bạn
for /f "tokens=*" %%a in ('git config --global user.name 2^>nul') do set CURRENT_NAME=%%a
for /f "tokens=*" %%a in ('git config --global user.email 2^>nul') do set CURRENT_EMAIL=%%a

if "%CURRENT_NAME%"=="" (
    echo [*] Nhập TÊN CỦA BẠN (hiển thị trên GitHub tác giả):
    set /p GIT_NAME="> Tên của bạn: "
    git config --global user.name "%GIT_NAME%"
) else (
    echo [✓] Tên tác giả Git hiện tại: %CURRENT_NAME%
)

if "%CURRENT_EMAIL%"=="" (
    echo [*] Nhập EMAIL của bạn (email đăng ký GitHub):
    set /p GIT_EMAIL="> Email của bạn: "
    git config --global user.email "%GIT_EMAIL%"
) else (
    echo [✓] Email Git hiện tại: %CURRENT_EMAIL%
)

echo.
echo =====================================================================
echo  👉 BƯỚC QUAN TRỌNG:
echo  1. Mở trình duyệt vào trang: https://github.com/new
echo  2. Đặt tên Repository (Ví dụ: BaoTangLichSuSo_3D)
echo  3. Chọn mục "Public" (Dự án mở)
echo  4. Bấm nút "Create repository"
echo  5. Sao chép đường link HTTPS của repo (Ví dụ: https://github.com/TenBan/BaoTangLichSuSo_3D.git)
echo =====================================================================
echo.

set /p REPO_URL="> Dán đường link GitHub Repository vào đây: "

if "%REPO_URL%"=="" (
    echo [LỖI] Bạn chưa nhập link GitHub repository!
    pause
    exit /b
)

echo.
echo [*] Đang chuẩn bị và đóng gói mã nguồn...

:: 3. Khởi tạo Git nếu chưa có
if not exist ".git" (
    git init
)

:: 4. Cấu hình nhánh chính
git branch -M main

:: 5. Thêm các file (đã loại bỏ file rác, file .env qua .gitignore)
echo [*] Đang thêm các tệp vào Git (vui lòng chờ trong giây lát)...
git add .

:: 6. Tạo Commit đầu tiên
git commit -m "Khoi tao du an Bao Tang Lich Su So 3D (1954 - 1975) Open Source"

:: 7. Thiết lập Remote
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%

echo.
echo [*] Đang tải mã nguồn lên GitHub...
echo (Lưu ý: Nếu GitHub yêu cầu đăng nhập, hãy làm theo hướng dẫn trên màn hình hoặc trình duyệt)
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo   🎉 CHÚC MỪNG! DỰ ÁN ĐÃ ĐƯỢC ĐẨY LÊN GITHUB THÀNH CÔNG!
    echo   🔗 Xem kho lưu trữ của bạn tại:
    echo      %REPO_URL%
    echo =====================================================================
) else (
    echo.
    echo [!] Quá trình đẩy lên gặp gián đoạn.
    echo Có thể bạn cần đăng nhập tài khoản GitHub bằng Personal Access Token hoặc trình duyệt.
)

echo.
pause
