# 🏛️ BẢO TÀNG LỊCH SỬ SỐ 3D (1954 – 1975)
### 3D Virtual History Museum — Cuộc Kháng Chiến Chống Mỹ Cứu Nước (Lịch Sử 12 - Bài 8)

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-r128%2B-black?logo=three.js)](https://threejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)](https://ai.google.dev/)

---

## 📖 GIỚI THIỆU DỰ ÁN

**Bảo Tàng Lịch Sử Số 3D (1954 – 1975)** là một nền tảng giáo dục số hóa không gian 3D tương tác trực tiếp trên trình duyệt Web (không cần cài đặt phần mềm). Dự án tái hiện sinh động tiến trình lịch sử kháng chiến chống Mỹ, cứu nước của dân tộc Việt Nam theo khung chương trình chuẩn sách giáo khoa Lịch sử 12 (Bài 8).

Dự án kết hợp đồ họa không gian **WebGL (Three.js)**, công nghệ trí tuệ nhân tạo **AI Hướng dẫn viên (Google Gemini RAG)**, sa bàn quân sự 3D tương tác và hệ thống phân vai thuyết minh bài học sống động.

---

## ✨ TÍNH NĂNG NỔI BẬT

1. **Không gian triển lãm 3D thời gian thực (Virtual 3D Museum):**
   * **Sảnh chính (Foyer):** Tiếp đón, sa bàn tổng quan và thông tin chuyên đề.
   * **Khu 1 (1961 – 1965):** Âm mưu chiến lược "Chiến tranh đặc biệt", Cố vấn quân sự Mỹ, Chiến thuật Trực thăng vận & Thiết xa vận, Quốc sách Ấp chiến lược.
   * **Khu 2 (Rạp chiếu phim tư liệu chuyên biệt):** Màn hình đại cảnh siêu nét **11.2m x 4.9m** cùng khán đài 3 tầng, truyền phát video tư liệu lịch sử.
   * **Khu 3 (Đại thắng các chiến dịch):** Chiến thắng Bình Giã, An Lão, Ba Gia, Đồng Xoài; mô hình xe tăng 843 và máy bay trực thăng UH-1.
2. **Sa bàn chiến thuật 3D tương tác (Tactical 3D Diorama):**
   * Tái hiện địa hình sông nước, đê điều, cánh đồng chiêm trũng Nam Bộ và các điểm chiến sự then chốt.
   * Chế độ **Bay ngắm sa bàn (Cinematic Flyover)** với quỹ đạo lượng giác hướng tâm tự động.
3. **Cô Hướng dẫn viên Ảo AI (Google Gemini RAG):**
   * Nạp sẵn toàn bộ tư liệu giáo án lịch sử chính khóa.
   * Tự động phản hồi bằng giọng nói và hoạt ảnh cử chỉ 3D theo ngữ cảnh hiện vật.
4. **Hệ thống phân vai thuyết minh (HS1 & HS2):**
   * Giọng đọc truyền cảm, trang trọng, tự động ducking (giảm) âm lượng nhạc nền khi phát lời thoại.
5. **Chế độ xem ảnh Lightbox 100%:**
   * Xem cận cảnh ảnh tư liệu lịch sử toàn màn hình, hỗ trợ thu phóng và xoay chuyển mượt mà.
6. **Hỗ trợ đa thiết bị (PC & Mobile):**
   * Tự động sinh mã QR kết nối, cho phép điện thoại di động (iOS/Android) quét mã truy cập tức thì.

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

### Yêu cầu môi trường:
* [Node.js](https://nodejs.org/) (Phiên bản 18 trở lên).
* Trình duyệt Web hiện đại hỗ trợ WebGL (Chrome, Edge, Firefox, Safari).

### Các bước thực hiện:

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/<tai-khoan-cua-ban>/<ten-repository>.git
   cd <ten-repository>
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Cấu hình khóa API AI (Tùy chọn nếu muốn bật tính năng Chat AI):**
   * Sao chép file `.env.example` thành `.env`:
     ```bash
     cp .env.example .env
     ```
   * Điền khóa Google Gemini API của bạn vào biến `AI_API_KEY`:
     ```env
     AI_PROVIDER=gemini
     AI_API_KEY=your_gemini_api_key_here
     ```

4. **Khởi động máy chủ:**
   ```bash
   node server.cjs
   ```
   * **Trên máy tính:** Truy cập [http://localhost:3000](http://localhost:3000)
   * **Trên điện thoại:** Quét mã QR tại [http://localhost:3000/XEM_MA_QR.html](http://localhost:3000/XEM_MA_QR.html) hoặc vào qua IP mạng nội bộ.

---

## 📂 CẤU TRÚC THƯ MỤC CHÍNH

```
├── index.html                   # Giao diện chính của Bảo tàng 3D
├── BAO_TANG_LICH_SU_SO.html     # File nguồn bảo tàng hoàn chỉnh
├── admin.html                   # Trang quản trị hiện vật và nội dung
├── SA_BAN_DONG_KHOI_3D.html     # Mô hình sa bàn Đồng Khởi độc lập
├── server.cjs                   # Máy chủ Node.js đa luồng, hỗ trợ SSE và mã QR
├── server/
│   └── apiHandler.cjs           # Xử lý kết nối RAG và Google Gemini AI
├── assets/                      # Mã nguồn Javascript WebGL, Three.js, CSS bundle
├── media/                       # Thư viện hình ảnh, tư liệu lịch sử, âm thanh
│   ├── khu1/                    # Tư liệu Khu 1: Chiến tranh đặc biệt
│   └── khu3/                    # Tư liệu Khu 3: Ấp Bắc, Bình Giã, An Lão, Ba Gia...
├── museum-data.json             # Cơ sở dữ liệu danh mục hiện vật và phòng trưng bày
├── tests/                       # Bộ kiểm thử tự động E2E (72 kịch bản)
├── package.json                 # Cấu hình dự án Node.js
├── LICENSE                      # Giấy phép mã nguồn mở MIT
└── README.md                    # Tài liệu hướng dẫn dự án
```

---

## 🤝 ĐÓNG GÓP (CONTRIBUTING)

Dự án hoan nghênh mọi đóng góp từ cộng đồng giáo viên, học sinh, lập trình viên và những người yêu lịch sử:
1. Fork dự án trên GitHub.
2. Tạo nhánh tính năng mới (`git checkout -b feature/TinhNangMoi`).
3. Commit các thay đổi (`git commit -m 'Thêm tính năng...'`).
4. Đẩy lên nhánh của bạn (`git push origin feature/TinhNangMoi`).
5. Mở một **Pull Request** trên GitHub.

---

## 📄 BẢN QUYỀN (LICENSE)

Dự án được phân phối dưới giấy phép mã nguồn mở **MIT License**. Bạn được tự do sử dụng, chỉnh sửa và chia sẻ cho mục đích học tập và phi thương mại.
