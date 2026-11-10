/**
 * =========================================================================
 * AUTO-TOUR ĐỘI ẤP BẮC & KHU 3 EXPANDED SHOWCASE MODULE
 * Requirements: R1, R2, R3, R4, R5
 * =========================================================================
 */
(function() {
  "use strict";

  // --- R4. IMAGE RESOLUTION ENGINE ---
  function resolveImgUrl(url) {
    if (!url) return '';
    try {
      url = decodeURIComponent(url);
    } catch (e) {}
    url = url.split(/[?#]/)[0];
    if (typeof window !== 'undefined' && window.__EMBEDDED_MUSEUM_IMAGES__) {
      const store = window.__EMBEDDED_MUSEUM_IMAGES__;
      const clean = url.replace(/^\.\//, '');
      const dotClean = './' + clean;
      if (store[url]) return store[url];
      if (store[dotClean]) return store[dotClean];
      if (store[clean]) return store[clean];
      const slashIdx = clean.lastIndexOf('/');
      if (slashIdx !== -1) {
        const fileName = clean.substring(slashIdx + 1);
        for (const k in store) {
          if (k.endsWith('/' + fileName) || k === fileName) {
            return store[k];
          }
        }
      }
    }
    return url;
  }
  if (typeof window !== 'undefined') {
    window.resolveImgUrl = resolveImgUrl;
  }

  // --- R3. ZONE 3 NINE HISTORICAL PAINTINGS ---
  const ZONE_3_EXHIBITS = [
    {
      id: "exhibit-9",
      hasPhoto: true,
      slot: 9,
      wall: "west",
      title: "Quần chúng nhân dân phá rào, phá tan 'Ấp chiến lược' của Mỹ - Diệm",
      year: "1963-1964",
      campaign: "Phong Trào Nhân Dân",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/TI_T_1_B_I_8-image9.png",
      shortDescription: "Đồng bào miền Nam anh dũng phá tan các ấp chiến lược, biến các khu dồn dân thành làng chiến đấu kiên cường.",
      historicalContent: "Dưới sự lãnh đạo của Mặt trận Dân tộc Giải phóng, phong trào phá rào ấp chiến lược dâng cao như vũ bão. Hàng vạn ấp chiến lược bị san phẳng, xương sống của 'Chiến tranh đặc biệt' bị bẻ gãy từng mảng lớn, đưa cách mạng miền Nam sang giai đoạn chủ động tiến công."
    },
    {
      id: "exhibit-10",
      hasPhoto: true,
      slot: 10,
      wall: "west",
      title: "Chiến thắng Bình Giã (Bà Rịa, 12/1964)",
      year: "12/1964",
      campaign: "Chiến dịch Bình Giã",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_binh_gia_1.jpg",
      shortDescription: "Chiến dịch Bình Giã tiêu diệt nhiều tiểu đoàn cơ động tinh nhuệ ngụy, làm phá sản về cơ bản 'Chiến tranh đặc biệt'.",
      historicalContent: "Từ ngày 02/12/1964 đến 03/01/1965, bộ đội chủ lực Miền mở chiến dịch Bình Giã tại Bà Rịa, tiêu diệt gọn 2 tiểu đoàn thiện chiến thuộc lực lượng trù bị chiến lược ngụy (Thủy quân lục chiến và Biệt động quân), đánh thiệt hại nặng trung đoàn thiết giáp. Chiến thắng Bình Giã đánh dấu sự phá sản về cơ bản của chiến lược 'Chiến tranh đặc biệt'."
    },
    {
      id: "exhibit-11",
      hasPhoto: true,
      slot: 11,
      wall: "west",
      title: "Chiến thắng thung lũng An Lão (Bình Định, 12/1964)",
      year: "12/1964",
      campaign: "Chiến dịch An Lão",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_an_lao_1.jpg",
      shortDescription: "Tiến công quét sạch hệ thống đồn bốt địch tại An Lão, mở rộng vùng giải phóng liên hoàn khu 5.",
      historicalContent: "Lực lượng vũ trang Quân khu 5 tập kích tiêu diệt chi khu quân sự và các cứ điểm kiên cố của địch tại thung lũng An Lão (Bình Định), giải phóng hoàn toàn vùng đất rộng lớn với hơn 10.000 dân, tạo thế uy hiếp trực tiếp hệ thống phòng tuyến ven biển của địch."
    },
    {
      id: "exhibit-12",
      hasPhoto: true,
      slot: 12,
      wall: "west",
      title: "Chiến thắng Ba Gia (Quảng Ngãi, 05/1965)",
      year: "05/1965",
      campaign: "Chiến dịch Ba Gia",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_ba_gia_1.jpg",
      shortDescription: "Tiêu diệt chiến đoàn ngụy cơ động, đẩy quân đội Sài Gòn vào thế suy sụp nghiêm trọng không thể cứu vãn.",
      historicalContent: "Tại Sơn Tịnh (Quảng Ngãi), bằng nghệ thuật 'đánh điểm diệt viện' điêu luyện, bộ đội chủ lực Quân khu 5 đã xóa sổ hoàn toàn một chiến đoàn cơ động hỗn hợp gồm 4 tiểu đoàn ngụy, chứng minh quân đội tay sai Sài Gòn đã mất hoàn toàn khả năng đương đầu với các đòn đánh tập trung của ta."
    },
    {
      id: "exhibit-13",
      hasPhoto: true,
      slot: 13,
      wall: "west",
      title: "Chiến thắng Đồng Xoài (Bình Phước, 06/1965)",
      year: "06/1965",
      campaign: "Chiến dịch Đồng Xoài",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_dong_xoai_2.jpg",
      shortDescription: "Đòn công kiên giáng trả đanh thép, tiêu diệt chi khu quân sự Đồng Xoài, góp phần làm sụp đổ hoàn toàn Chiến tranh đặc biệt.",
      historicalContent: "Quân giải phóng mở đợt công kiên quy mô lớn đánh sập hoàn toàn chi khu quân sự Đồng Xoài (Bình Phước), tiêu diệt 4 tiểu đoàn ngụy và các cố vấn Mỹ. Thắng lợi vang dội Đồng Xoài đã chôn vùi dứt điểm hy vọng xoay chuyển cục diện của Mỹ bằng lực lượng quân đội tay sai."
    },
    {
      id: "exhibit-west-6",
      hasPhoto: true,
      slot: 19,
      wall: "west",
      title: "Toàn cảnh thung lũng An Lão 12/1964",
      year: "12/1964",
      campaign: "Toàn Cảnh An Lão",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_an_lao_2.jpg",
      shortDescription: "Toàn cảnh thung lũng An Lão nơi bộ đội chủ lực Quân khu 5 phối hợp bộ đội địa phương bao vây, tiêu diệt các cứ điểm trọng yếu của địch.",
      historicalContent: "Tư liệu ảnh quý giá ghi lại địa hình thung lũng An Lão hiểm trở, nơi diễn ra cuộc phối hợp tác chiến thần tốc giữa bộ đội chủ lực và dân quân du kích, đập tan tuyến phòng thủ phía tây Bình Định của địch."
    },
    {
      id: "exhibit-west-7",
      hasPhoto: true,
      slot: 20,
      wall: "west",
      title: "Diễn biến Chiến dịch Ba Gia 05/1965",
      year: "05/1965",
      campaign: "Thế Trận Ba Gia",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_chien_dich_ba_gia.jpg",
      shortDescription: "Diễn biến và thế trận tiến công sắc bén của Quân giải phóng trong chiến dịch Ba Gia lịch sử.",
      historicalContent: "Sơ đồ và hình ảnh tư liệu phản ánh diễn biến từng đợt vận động tiến công, siết chặt vòng vây và chia cắt chi viện của địch tại Ba Gia, làm thất bại chiến thuật phòng ngự cơ động của ngụy quyền Sài Gòn."
    },
    {
      id: "exhibit-west-8",
      hasPhoto: true,
      slot: 21,
      wall: "west",
      title: "Chiến lợi phẩm tại Ba Gia 05/1965",
      year: "05/1965",
      campaign: "Chiến Lợi Phẩm Ba Gia",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_chien_dich_ba_gia_2.jpg",
      shortDescription: "Khí tài, súng ống và xe cơ giới thu giữ được tại trận địa Ba Gia chứng minh quân đội Sài Gòn đã kiệt quệ.",
      historicalContent: "Sau 3 ngày đêm chiến đấu ngoan cường, ta thu giữ hàng trăm khẩu súng các loại, đạn dược và khí tài tối tân do Mỹ viện trợ, khẳng định bước trưởng thành vượt bậc về vũ khí trang bị của Quân giải phóng."
    },
    {
      id: "exhibit-west-9",
      hasPhoto: true,
      slot: 22,
      wall: "west",
      title: "Đánh chiếm chi khu Đồng Xoài 06/1965",
      year: "06/1965",
      campaign: "Đột Kích Đồng Xoài",
      author: "Đội Ấp Bắc • Khu 3",
      imageUrl: "./media/khu3/khu3_dong_xoai_1.jpg",
      shortDescription: "Bộ đội ta xung phong đánh chiếm chi khu quân sự Đồng Xoài, đập tan cứ điểm chốt chặn hiểm yếu ở miền Đông.",
      historicalContent: "Hình ảnh lịch sử ghi lại khoảnh khắc các chiến sĩ xung kích dũng mãnh đột phá cửa mở, đánh chiếm sở chỉ huy chi khu Đồng Xoài, giải phóng hàng ngàn đồng bào và củng cố căn cứ cách mạng Đông Nam Bộ."
    }
  ];

  // --- R1. 17 SEQUENTIAL PRESENTATION STEPS ---
  const PRESENTATION_STEPS = [
  {
    "id": 1,
    "zoneTitle": "I. GIỚI THIỆU – CỔNG BẢO TÀNG",
    "speaker": "👤 HỌC SINH 1",
    "title": "1. Lời Chào & Giới Thiệu Bảo Tàng Lịch Sử Số",
    "subtitle": "Kính chào quý thầy cô và các bạn! Chào mừng mọi người đến với Bảo tàng Lịch sử số của Đội Ấp Bắc. Không gian bảo tàng được thiết kế như một phòng tranh lịch sử, nơi những hình ảnh, tư liệu và hiện vật số giúp chúng ta tìm hiểu một giai đoạn đấu tranh quan trọng của dân tộc. Qua từng khu trưng bày, chúng ta sẽ lần lượt khám phá âm mưu, thủ đoạn của Mỹ trong chiến lược “Chiến tranh đặc biệt”, chiến thắng Ấp Bắc và những thắng lợi góp phần làm thất bại chiến lược này.",
    "thumbnail": "./media/saban/saban_toan_canh_3d.png",
    "durationSec": 25,
    "camPos": [
      0,
      1.85,
      24.2
    ],
    "lookAt": [
      0,
      2.4,
      18
    ],
    "exhibitId": "gate"
  },
  {
    "id": 2,
    "zoneTitle": "I. GIỚI THIỆU – QUAN SÁT SA BÀN",
    "speaker": "👤 HỌC SINH 1",
    "title": "2. Lời Mời Quan Sát Mô Hình Sa Bàn",
    "subtitle": "Trước khi tham quan các khu trưng bày, kính mời quý thầy cô và các bạn cùng quan sát mô hình sa bàn “Chiến tranh đặc biệt”.",
    "thumbnail": "./media/saban/saban_dong_khoi_3d.jpg",
    "durationSec": 10,
    "camPos": [
      0,
      1.85,
      14.8
    ],
    "lookAt": [
      0,
      1,
      9.5
    ],
    "exhibitId": "diorama"
  },
  {
    "id": 3,
    "zoneTitle": "II. MÔ HÌNH SA BÀN CHIẾN TRANH ĐẶC BIỆT",
    "speaker": "👤 HỌC SINH 2",
    "title": "3. Toàn Cảnh Sa Bàn 'Chiến Tranh Đặc Biệt' (1961–1965)",
    "subtitle": "Sa bàn khái quát chiến lược “Chiến tranh đặc biệt” của Mỹ ở miền Nam Việt Nam (1961–1965): quân đội Sài Gòn là lực lượng chủ yếu, được Mỹ trang bị, huấn luyện và hỗ trợ bởi hệ thống cố vấn quân sự cùng các phương tiện chiến tranh hiện đại.",
    "thumbnail": "./media/saban/saban_toan_canh_3d.png",
    "durationSec": 22,
    "camPos": [
      0,
      1.85,
      14
    ],
    "lookAt": [
      0,
      0.85,
      9.5
    ],
    "exhibitId": "diorama"
  },
  {
    "id": 4,
    "zoneTitle": "II. CHUYỂN TIẾP SANG KHU 1",
    "speaker": "👤 HỌC SINH 2",
    "title": "4. Lời Mời Đến Với Khu Trưng Bày Số 1",
    "subtitle": "Sau đây, kính mời quý thầy cô và các bạn đến với Khu trưng bày số 1.",
    "thumbnail": "./media/khu1/khu1_02_chien_tranh_dac_biet.jpg",
    "durationSec": 8,
    "camPos": [
      -10.5,
      1.85,
      11.5
    ],
    "lookAt": [
      -18,
      2,
      11.5
    ],
    "exhibitId": "khu1_corridor"
  },
  {
    "id": 5,
    "zoneTitle": "KHU 1: ÂM MƯU & THỦ ĐOẠN CTĐB",
    "speaker": "👤 HỌC SINH 1",
    "title": "Ảnh 1. Cố Vấn Quân Sự Mỹ Và Quân Đội Sài Gòn",
    "subtitle": "Lực lượng quân đội Sài Gòn giữ vai trò chủ yếu; Mỹ cung cấp cố vấn quân sự, trang bị, huấn luyện và hỗ trợ.",
    "thumbnail": "public/assets/doi-ap-bac/anh-khu-1/1. CỐ VẤN MỸ VÀ QUÂN ĐỘI SÀI GÒN.jpg",
    "durationSec": 15,
    "camPos": [
      -16,
      2,
      7.5
    ],
    "lookAt": [
      -14,
      2.4,
      3.18
    ],
    "exhibitId": "k1_art2"
  },
  {
    "id": 6,
    "zoneTitle": "KHU 1: ÂM MƯU & THỦ ĐOẠN CTĐB",
    "speaker": "👤 HỌC SINH 1",
    "title": "Ảnh 2. Chiến Thuật “Trực Thăng Vận”",
    "subtitle": "Trực thăng giúp quân đội Sài Gòn nhanh chóng tiếp cận địa bàn, tạo ưu thế cơ động trên chiến trường.",
    "thumbnail": "./media/khu1/khu1_chuyen_truc_thang_van_1920.jpg",
    "durationSec": 15,
    "camPos": [
      -24,
      2,
      12
    ],
    "lookAt": [
      -27.82,
      2.4,
      12.2
    ],
    "exhibitId": "k1_art4"
  },
  {
    "id": 7,
    "zoneTitle": "KHU 1: ÂM MƯU & THỦ ĐOẠN CTĐB",
    "speaker": "👤 HỌC SINH 2",
    "title": "Ảnh 3. Chiến Thuật “Thiết Xa Vận”",
    "subtitle": "Cùng với trực thăng vận, thiết xa vận là thủ đoạn quân sự quan trọng của chiến lược “Chiến tranh đặc biệt”.",
    "thumbnail": "public/assets/doi-ap-bac/hien-vat-khu-1/THIẾT XA VẬN.jfif",
    "durationSec": 15,
    "camPos": [
      -16,
      2,
      11.5
    ],
    "lookAt": [
      -14,
      2.4,
      15.82
    ],
    "exhibitId": "k1_art5"
  },
  {
    "id": 8,
    "zoneTitle": "KHU 1: ÂM MƯU & THỦ ĐOẠN CTĐB",
    "speaker": "👤 HỌC SINH 1",
    "title": "Ảnh 4. Chính Sách “Ấp Chiến Lược” & Chuyển Sang Khu 2",
    "subtitle": "Đây là một biện pháp trọng tâm nhằm bình định miền Nam, nhưng đã vấp phải sự đấu tranh quyết liệt của nhân dân. Những thủ đoạn trên không khuất phục được quân dân miền Nam. Tiếp theo, xin mời đến Khu trưng bày số 2 – nơi ghi dấu chiến thắng Ấp Bắc.",
    "thumbnail": "public/assets/doi-ap-bac/anh-khu-1/5. TỘI ÁC DỒN DÂN.jfif",
    "durationSec": 22,
    "camPos": [
      -18.5,
      2,
      11.5
    ],
    "lookAt": [
      -20,
      2.4,
      15.82
    ],
    "exhibitId": "k1_art6"
  },
  {
    "id": 9,
    "zoneTitle": "KHU 2: CHIẾN THẮNG ẤP BẮC",
    "speaker": "👤 HỌC SINH 2",
    "title": "IV. Khu Trưng Bày Số 2 – Chiến Thắng Ấp Bắc (2/1/1963)",
    "subtitle": "Chiến thắng Ấp Bắc khẳng định quân dân miền Nam có khả năng đánh bại chiến lược “chiến tranh đặc biệt” của Mĩ, tạo tiếng vang lớn.",
    "thumbnail": "./media/chienthang_apbac_poster.jpg",
    "durationSec": 16,
    "camPos": [
      14,
      1.95,
      9.5
    ],
    "lookAt": [
      27.84,
      2.85,
      9.5
    ],
    "exhibitId": "cinema_screen"
  },
  {
    "id": 10,
    "zoneTitle": "KHU 2: CHIẾU PHIM TƯ LIỆU",
    "speaker": "👤 HỌC SINH 2",
    "title": "Chiếu Phim Tư Liệu Trận Ấp Bắc Ngày 2/1/1963",
    "subtitle": "Để hiểu rõ hơn về diễn biến và ý nghĩa của chiến thắng lịch sử này, kính mời quý thầy cô và các bạn cùng theo dõi một đoạn phim tư liệu về trận Ấp Bắc ngày 2/1/1963.",
    "thumbnail": "./media/khu1/khu1_quan_my_chien_dich_ap_bac.jpg",
    "durationSec": 45,
    "camPos": [
      17.2,
      1.95,
      9.5
    ],
    "lookAt": [
      27.84,
      2.85,
      9.5
    ],
    "exhibitId": "cinema_video"
  },
  {
    "id": 11,
    "zoneTitle": "KHU 2: Ý NGHĨA ẤP BẮC",
    "speaker": "👤 HỌC SINH 1",
    "title": "Thất Bại Của Phương Tiện Chiến Tranh Hiện Đại",
    "subtitle": "Những thước phim vừa rồi cho thấy, dù được trang bị phương tiện chiến tranh hiện đại, quân đội Sài Gòn vẫn phải chịu thất bại trước tinh thần chiến đấu kiên cường của quân dân miền Nam.",
    "thumbnail": "./media/khu1/khu1_truc_thang_ap_bac_bi_ban_roi.jpg",
    "durationSec": 18,
    "camPos": [
      15.5,
      1.95,
      7
    ],
    "lookAt": [
      24,
      2.4,
      3.18
    ],
    "exhibitId": "cinema_video"
  },
  {
    "id": 12,
    "zoneTitle": "KHU 2: PHONG TRÀO THI ĐUA",
    "speaker": "👤 HỌC SINH 1",
    "title": "Phong Trào 'Thi Đua Ấp Bắc, Giết Giặc Lập Công'",
    "subtitle": "Chiến thắng Ấp Bắc đã cổ vũ phong trào ‘Thi đua Ấp Bắc, giết giặc lập công’, mở đầu cho những thắng lợi tiếp theo trên chiến trường miền Nam.",
    "thumbnail": "./media/khu3/khu3_ap_bac_7.jpg",
    "durationSec": 16,
    "camPos": [
      18.5,
      1.95,
      11.5
    ],
    "lookAt": [
      20,
      2.4,
      15.82
    ],
    "exhibitId": "cinema_screen"
  },
  {
    "id": 13,
    "zoneTitle": "KHU 3: CÁC THẮNG LỢI 1964–1965",
    "speaker": "👤 HỌC SINH 2",
    "title": "Ảnh 1. Chiến Thắng An Lão (Cuối Năm 1964)",
    "subtitle": "Chiến thắng An Lão góp phần mở rộng vùng giải phóng và làm suy yếu hệ thống kìm kẹp của đối phương.",
    "thumbnail": "./media/khu3/khu3_an_lao_2.jpg",
    "durationSec": 15,
    "camPos": [
      3.8,
      2,
      -7
    ],
    "lookAt": [
      3.8,
      2.4,
      -10.19
    ],
    "exhibitId": "k3_art2"
  },
  {
    "id": 14,
    "zoneTitle": "KHU 3: CÁC THẮNG LỢI 1964–1965",
    "speaker": "👤 HỌC SINH 1",
    "title": "Ảnh 2. Chiến Thắng Bình Giã (Cuối 1964 – Đầu 1965)",
    "subtitle": "Bình Giã đánh dấu bước phát triển của lực lượng vũ trang cách mạng, làm cho chiến lược của Mỹ thêm lúng túng.",
    "thumbnail": "public/assets/doi-ap-bac/anh-khu-3/1. CHIẾN THẮNG BÌNH GIÃ.jpg",
    "durationSec": 16,
    "camPos": [
      -3.8,
      2,
      -7
    ],
    "lookAt": [
      -3.8,
      2.4,
      -10.19
    ],
    "exhibitId": "k3_art1"
  },
  {
    "id": 15,
    "zoneTitle": "KHU 3: CÁC THẮNG LỢI 1964–1965",
    "speaker": "👤 HỌC SINH 2",
    "title": "Ảnh 3. Chiến Thắng Ba Gia (Tháng 5/1965)",
    "subtitle": "Thắng lợi Ba Gia tiếp tục chứng minh sự trưởng thành và khả năng tác chiến của lực lượng cách mạng.",
    "thumbnail": "./media/khu3/khu3_chien_dich_ba_gia.jpg",
    "durationSec": 15,
    "camPos": [
      -10.88,
      2,
      0
    ],
    "lookAt": [
      -10.88,
      2.4,
      -1.6
    ],
    "exhibitId": "k3_art3"
  },
  {
    "id": 16,
    "zoneTitle": "KHU 3: CÁC THẮNG LỢI 1964–1965",
    "speaker": "👤 HỌC SINH 1",
    "title": "Ảnh 4. Chiến Thắng Đồng Xoài (Tháng 6/1965)",
    "subtitle": "Cùng với An Lão, Bình Giã và Ba Gia, Đồng Xoài góp phần quyết định làm phá sản chiến lược “Chiến tranh đặc biệt” vào năm 1965.",
    "thumbnail": "./media/khu3/khu3_dong_xoai_1.jpg",
    "durationSec": 17,
    "camPos": [
      -22,
      2.4,
      -20.5
    ],
    "lookAt": [
      -27.84,
      2.85,
      -20.5
    ],
    "exhibitId": "artK3_w1"
  },
  {
    "id": 17,
    "zoneTitle": "VI. KẾT THÚC HÀNH TRÌNH",
    "speaker": "👤 HỌC SINH 1",
    "title": "VI. Kết Thúc Hành Trình – Lời Tri Ân & Đúc Kết Lịch Sử",
    "subtitle": "Hành trình tham quan Bảo tàng Lịch sử số của Đội Ấp Bắc xin được khép lại. Từ những âm mưu, thủ đoạn của chiến lược “Chiến tranh đặc biệt” đến chiến thắng Ấp Bắc và các thắng lợi tiêu biểu giai đoạn 1964–1965, lịch sử đã cho thấy ý chí chiến đấu kiên cường và sức mạnh đoàn kết của quân dân miền Nam. Những dấu mốc ấy góp phần làm thất bại chiến lược “Chiến tranh đặc biệt”, tạo tiền đề cho cách mạng miền Nam tiếp tục phát triển. Xin trân trọng cảm ơn quý thầy cô và các bạn đã tham quan!",
    "thumbnail": "./media/khu1/khu1_xe_tang_843_dinh_doc_lap.jpg",
    "durationSec": 32,
    "camPos": [
      0,
      1.85,
      -18.5
    ],
    "lookAt": [
      0,
      3.2,
      -23.5
    ],
    "exhibitId": "summary"
  }
];

  // Global state
  let currentStepIndex = 0;
  let isAutoPlaying = false;
  let isVoiceActive = true;
  let isMinimized = false;
  let durationTimer = null;
  let advanceTimer = null;
  let currentUtterance = null;
  let cachedVoices = [];

  function loadVoices() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      } catch (e) {}
    }
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function clearTimers() {
    if (durationTimer) {
      clearTimeout(durationTimer);
      durationTimer = null;
    }
    if (advanceTimer) {
      clearTimeout(advanceTimer);
      advanceTimer = null;
    }
  }

  // DOM creation
  function initDOM() {
    if (document.getElementById('apBacAutoDirectorBar')) return;

    // 1. Inject Styles
    const style = document.createElement('style');
    style.id = 'apbac-director-styles';
    style.textContent = `
      #apBacAutoDirectorBar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.94) 0%, rgba(10, 15, 29, 0.98) 100%);
        border-top: 2px solid #d4af37;
        box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(212, 175, 55, 0.25);
        backdrop-filter: blur(12px);
        color: #f8fafc;
        font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, sans-serif;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
      }
      #apBacAutoDirectorBar.minimized {
        transform: translateY(calc(100% - 38px));
      }
      .dir-header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 16px;
        background: rgba(0, 0, 0, 0.45);
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      }
      .dir-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      #dirSpeakerBadge {
        background: linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%);
        border: 1px solid #fbbf24;
        color: #fef08a;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 20px;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      }
      #dirZoneTitle {
        color: #e2e8f0;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .dir-header-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dir-btn-icon {
        background: rgba(30, 41, 59, 0.8);
        border: 1px solid rgba(212, 175, 55, 0.4);
        color: #f8fafc;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.2s;
      }
      .dir-btn-icon:hover {
        background: #1e293b;
        border-color: #fbbf24;
        color: #fbbf24;
      }
      #btnOpenKhu3Big {
        background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
        border: 1.5px solid #38bdf8;
        color: #ffffff;
        font-weight: 700;
        box-shadow: 0 2px 10px rgba(2, 132, 199, 0.4);
      }
      #btnOpenKhu3Big:hover {
        background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
        box-shadow: 0 4px 15px rgba(56, 189, 248, 0.6);
        transform: translateY(-1px);
      }
      .dir-body-content {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        gap: 16px;
      }
      #dirPreviewFrame {
        width: 82px;
        height: 54px;
        min-width: 82px;
        border-radius: 6px;
        overflow: hidden;
        border: 1.5px solid #d4af37;
        background: #000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.6);
        position: relative;
      }
      #dirPreviewImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .dir-text-wrap {
        flex: 1;
        min-width: 0;
      }
      #dirExhibitTitle {
        font-size: 14px;
        font-weight: 800;
        color: #fef08a;
        margin: 0 0 3px 0;
        font-family: 'Cinzel', serif, -apple-system;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #dirSubtitleText {
        font-size: 12px;
        line-height: 1.45;
        color: #cbd5e1;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .dir-controls-wrap {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }
      .dir-ctrl-btn {
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        border: 1.5px solid #d4af37;
        color: #f8fafc;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .dir-ctrl-btn:hover {
        background: #334155;
        border-color: #fbbf24;
        color: #fef08a;
      }
      #btnToggleAutoPlay {
        background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
        border-color: #fbbf24;
        color: #ffffff;
        box-shadow: 0 2px 10px rgba(185, 28, 28, 0.4);
      }
      #btnToggleAutoPlay:hover {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        box-shadow: 0 4px 15px rgba(251, 191, 36, 0.5);
      }
      #dirProgressBar {
        width: 100%;
        height: 5px;
        background: rgba(255, 255, 255, 0.15);
        cursor: pointer;
        position: relative;
      }
      #dirProgressFill {
        height: 100%;
        background: linear-gradient(90deg, #d4af37 0%, #fbbf24 100%);
        width: 0%;
        transition: width 0.3s ease;
      }

      /* ZONE 3 EXPANDED SHOWCASE MODAL */
      #khu3ExpandedShowcaseModal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        background: rgba(8, 12, 22, 0.92);
        backdrop-filter: blur(16px);
        display: none;
        flex-direction: column;
        color: #f8fafc;
        overflow-y: auto;
        padding: 24px 32px 60px 32px;
        box-sizing: border-box;
      }
      .khu3-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #d4af37;
        padding-bottom: 16px;
        margin-bottom: 24px;
      }
      .khu3-modal-title-wrap h2 {
        margin: 0 0 6px 0;
        font-family: 'Cinzel', serif;
        font-size: 22px;
        font-weight: 800;
        color: #fef08a;
        letter-spacing: 0.5px;
      }
      .khu3-modal-title-wrap p {
        margin: 0;
        font-size: 13px;
        color: #94a3b8;
      }
      #btnCloseKhu3Modal {
        background: #1e293b;
        border: 1.5px solid #d4af37;
        color: #f8fafc;
        font-size: 18px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      #btnCloseKhu3Modal:hover {
        background: #991b1b;
        color: #fff;
        border-color: #fbbf24;
      }
      .khu3-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }
      .khu3-jumbo-frame {
        background: #0f172a;
        border: 2px solid #d4af37;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        position: relative;
      }
      .khu3-jumbo-frame:hover {
        transform: translateY(-6px);
        box-shadow: 0 14px 35px rgba(212, 175, 55, 0.35);
        border-color: #fef08a;
      }
      .khu3-jumbo-frame.active-exhibit {
        border-color: #38bdf8;
        box-shadow: 0 0 25px rgba(56, 189, 248, 0.7);
      }
      .khu3-img-container {
        width: 100%;
        height: 200px;
        background: #000;
        overflow: hidden;
        position: relative;
      }
      .khu3-img-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
      .khu3-jumbo-frame:hover .khu3-img-container img {
        transform: scale(1.04);
      }
      .khu3-badges {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        gap: 6px;
      }
      .khu3-badge-campaign {
        background: rgba(153, 27, 27, 0.9);
        border: 1px solid #fbbf24;
        color: #fef08a;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 12px;
      }
      .khu3-badge-year {
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid #94a3b8;
        color: #f8fafc;
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 12px;
      }
      .khu3-card-body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .khu3-card-title {
        font-family: 'Cinzel', serif;
        font-size: 15px;
        font-weight: 800;
        color: #fef08a;
        margin: 0 0 8px 0;
        line-height: 1.35;
      }
      .khu3-card-desc {
        font-size: 12px;
        line-height: 1.5;
        color: #cbd5e1;
        margin: 0 0 12px 0;
        flex: 1;
      }
      .khu3-card-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 8px;
        font-size: 12px;
        font-weight: 700;
        color: #38bdf8;
      }

      /* HISTORICAL DETAIL VIEW MODAL */
      #exhibitDetailModal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10001;
        background: rgba(5, 8, 15, 0.94);
        backdrop-filter: blur(18px);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      }
      .detail-modal-box {
        background: #0f172a;
        border: 2px solid #d4af37;
        border-radius: 12px;
        width: 100%;
        max-width: 780px;
        max-height: 90vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.3);
      }
      .detail-modal-img {
        width: 100%;
        max-height: 380px;
        object-fit: cover;
        background: #000;
        border-bottom: 2px solid #d4af37;
      }
      .detail-modal-body {
        padding: 24px;
        color: #f8fafc;
      }
      .detail-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      .detail-modal-title {
        font-family: 'Cinzel', serif;
        font-size: 20px;
        font-weight: 800;
        color: #fef08a;
        margin: 0;
      }
      .detail-modal-meta {
        display: flex;
        gap: 10px;
        margin: 12px 0 16px 0;
      }
      .detail-modal-content {
        font-size: 14px;
        line-height: 1.65;
        color: #e2e8f0;
      }
      .detail-modal-close-btn {
        background: #991b1b;
        border: 1px solid #fbbf24;
        color: #fff;
        padding: 8px 24px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        align-self: flex-end;
        margin: 16px 24px 24px auto;
      }

      /* RESPONSIVE STYLES FOR TABLET & MOBILE (< 768px, < 480px) */
      @media (max-width: 768px) {
        .dir-header-bar {
          padding: 6px 12px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .dir-header-left {
          gap: 6px;
          flex-wrap: wrap;
        }
        #dirSpeakerBadge {
          font-size: 10px;
          padding: 2px 8px;
        }
        #dirZoneTitle {
          font-size: 11px;
        }
        .dir-btn-icon {
          padding: 3px 8px;
          font-size: 10px;
        }
        .dir-body-content {
          padding: 8px 12px;
          gap: 10px;
        }
        #dirPreviewFrame {
          width: 68px;
          height: 46px;
          min-width: 68px;
        }
        #dirExhibitTitle {
          font-size: 13px;
        }
        #dirSubtitleText {
          font-size: 11px;
        }
        .dir-ctrl-btn {
          padding: 6px 10px;
          font-size: 11px;
        }
        .khu3-grid {
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }
      }
      @media (max-width: 480px) {
        .dir-body-content {
          flex-wrap: wrap;
          padding: 8px 10px;
        }
        #dirPreviewFrame {
          display: none;
        }
        .dir-text-wrap {
          width: 100%;
          order: 1;
          margin-bottom: 6px;
        }
        .dir-controls-wrap {
          width: 100%;
          order: 2;
          margin-left: 0;
          justify-content: space-between;
        }
        .dir-ctrl-btn {
          flex: 1;
          justify-content: center;
          padding: 7px 6px;
          font-size: 11px;
        }
        #khu3ExpandedShowcaseModal {
          padding: 16px 12px 60px 12px;
        }
        .khu3-modal-title-wrap h2 {
          font-size: 17px;
        }
        .khu3-grid {
          grid-template-columns: 1fr;
          gap: 14px;
        }
        .detail-modal-body {
          padding: 16px;
        }
        .detail-modal-title {
          font-size: 17px;
        }
      }
    `;
    document.head.appendChild(style);

    // 2. Inject Director Bar HTML
    const bar = document.createElement('div');
    bar.id = 'apBacAutoDirectorBar';
    bar.innerHTML = `
      <div id="dirProgressBar" title="Bấm để chuyển nhanh tới phân đoạn kịch bản"><div id="dirProgressFill"></div></div>
      <div class="dir-header-bar">
        <div class="dir-header-left">
          <span id="dirSpeakerBadge">👤 Học sinh 1 (Bạn Thảo) • Bước 1/17</span>
          <span id="dirZoneTitle">🏛️ CỔNG TRIỂN LÃM</span>
        </div>
        <div class="dir-header-right">
          <button id="btnOpenKhu3Big" class="dir-btn-icon" title="Xem trọn bộ 9 tranh cỡ đại Khu 3">🖼️ Phóng to Khu 3</button>
          <button id="btnToggleVoice" class="dir-btn-icon" title="Bật/Tắt thuyết minh tiếng Việt">🔊 Giọng đọc: BẬT</button>
          <button id="btnMinimizeDirector" class="dir-btn-icon" title="Thu nhỏ/Mở rộng">🔽 Thu nhỏ</button>
        </div>
      </div>
      <div class="dir-body-content">
        <div id="dirPreviewFrame">
          <img id="dirPreviewImg" src="" alt="Thumbnail" />
        </div>
        <div class="dir-text-wrap">
          <h4 id="dirExhibitTitle">Đang nạp dữ liệu thuyết minh...</h4>
          <p id="dirSubtitleText">...</p>
        </div>
        <div class="dir-controls-wrap">
          <button id="btnPrevStep" class="dir-ctrl-btn" title="Phân đoạn trước">⏮️ Trước</button>
          <button id="btnToggleAutoPlay" class="dir-ctrl-btn" title="Phát/Dừng tự động thuyết minh">▶ Bắt đầu</button>
          <button id="btnNextStep" class="dir-ctrl-btn" title="Phân đoạn tiếp">Tiếp ⏭️</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);

    // 3. Inject Zone 3 Expanded Showcase Modal HTML
    const showcase = document.createElement('div');
    showcase.id = 'khu3ExpandedShowcaseModal';
    showcase.innerHTML = `
      <div class="khu3-modal-header">
        <div class="khu3-modal-title-wrap">
          <h2>KHU TRƯNG BÀY SỐ 3 • TỪ ẤP BẮC ĐẾN THẤT BẠI CỦA 'CHIẾN TRANH ĐẶC BIỆT'</h2>
          <p>Trưng bày toàn cảnh 9 tác phẩm lịch sử khổ lớn tường tây • Bấm vào tranh để xem chi tiết lịch sử</p>
        </div>
        <button id="btnCloseKhu3Modal" title="Đóng và quay lại phòng tranh 3D">✕</button>
      </div>
      <div class="khu3-grid"></div>
    `;
    document.body.appendChild(showcase);

    // Populate Zone 3 Grid
    const grid = showcase.querySelector('.khu3-grid');
    ZONE_3_EXHIBITS.forEach((ex, idx) => {
      const card = document.createElement('div');
      card.className = 'khu3-jumbo-frame';
      card.setAttribute('data-id', ex.id);
      card.innerHTML = `
        <div class="khu3-img-container">
          <img src="${resolveImgUrl(ex.imageUrl)}" alt="${ex.title}" loading="lazy" />
          <div class="khu3-badges">
            <span class="khu3-badge-campaign">${ex.campaign || 'Chiến dịch'}</span>
            <span class="khu3-badge-year">${ex.year}</span>
          </div>
        </div>
        <div class="khu3-card-body">
          <h3 class="khu3-card-title">${ex.title}</h3>
          <p class="khu3-card-desc">${ex.shortDescription}</p>
          <div class="khu3-card-footer">
            <span>🔍 Xem chi tiết lịch sử &rarr;</span>
          </div>
        </div>
      `;
      const cardImg = card.querySelector('img');
      if (cardImg) {
        cardImg.onerror = () => {
          if (typeof window !== 'undefined' && window.__EMBEDDED_MUSEUM_IMAGES__) {
            const store = window.__EMBEDDED_MUSEUM_IMAGES__;
            for (const k in store) {
              if (k.includes('khu3')) {
                cardImg.src = store[k];
                break;
              }
            }
          }
        };
      }
      card.addEventListener('click', () => {
        openExhibitDetail(ex);
      });
      grid.appendChild(card);
    });

    showcase.addEventListener('click', (e) => {
      if (e.target === showcase) closeKhu3Modal();
    });

    // 4. Inject Detail View Modal HTML
    const detailModal = document.createElement('div');
    detailModal.id = 'exhibitDetailModal';
    detailModal.innerHTML = `
      <div class="detail-modal-box">
        <img id="detailModalImg" class="detail-modal-img" src="" alt="Exhibit" />
        <div class="detail-modal-body">
          <div class="detail-modal-header">
            <h3 id="detailModalTitle" class="detail-modal-title"></h3>
          </div>
          <div class="detail-modal-meta">
            <span id="detailModalCampaign" class="khu3-badge-campaign"></span>
            <span id="detailModalYear" class="khu3-badge-year"></span>
          </div>
          <p id="detailModalDesc" style="font-weight: 600; color: #fef08a; margin-bottom: 12px;"></p>
          <div id="detailModalContent" class="detail-modal-content"></div>
        </div>
        <button id="btnCloseDetailModal" class="detail-modal-close-btn">Đóng Chi Tiết</button>
      </div>
    `;
    document.body.appendChild(detailModal);

    // Detail modal close
    detailModal.querySelector('#btnCloseDetailModal').addEventListener('click', closeDetailModal);
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });

    // 5. Wire Button Events
    document.getElementById('btnToggleAutoPlay').addEventListener('click', toggleAutoPlay);
    document.getElementById('btnPrevStep').addEventListener('click', prevStep);
    document.getElementById('btnNextStep').addEventListener('click', () => nextStep(false));
    document.getElementById('btnToggleVoice').addEventListener('click', toggleVoice);
    document.getElementById('btnMinimizeDirector').addEventListener('click', toggleMinimize);
    document.getElementById('btnOpenKhu3Big').addEventListener('click', openKhu3Modal);
    document.getElementById('btnCloseKhu3Modal').addEventListener('click', closeKhu3Modal);

    // Click on progress bar
    document.getElementById('dirProgressBar').addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (!rect.width) return;
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (isNaN(pct)) return;
      const targetStep = Math.min(PRESENTATION_STEPS.length - 1, Math.floor(pct * PRESENTATION_STEPS.length));
      goToStep(targetStep);
    });

    // Escape key modal dismiss
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const detailModal = document.getElementById('exhibitDetailModal');
        if (detailModal && detailModal.style.display === 'flex') {
          closeDetailModal();
          e.stopPropagation();
          return;
        }
        const khu3Modal = document.getElementById('khu3ExpandedShowcaseModal');
        if (khu3Modal && khu3Modal.style.display === 'flex') {
          closeKhu3Modal();
          e.stopPropagation();
          return;
        }
      }
    });

    // Initial render
    updateDirectorUI();
  }

  function closeDetailModal() {
    window.__IS_MODAL_OPEN__ = false;
    if (typeof window.restorePlayerTransform === 'function') {
      window.restorePlayerTransform();
    }
    const detailModal = document.getElementById('exhibitDetailModal');
    if (detailModal) {
      detailModal.style.display = 'none';
    }
    if (typeof window.__ON_OPEN_ARTIFACT__ === 'function') {
      try {
        window.__ON_OPEN_ARTIFACT__(null);
      } catch (e) {}
    } else if (window.__MUSEUM_3D_CTX__ && typeof window.__MUSEUM_3D_CTX__.openModalArtifact === 'function') {
      try {
        window.__MUSEUM_3D_CTX__.openModalArtifact(null);
      } catch (e) {}
    }
    // Giữ nguyên tọa độ camera tại chỗ, không bao giờ reset về sảnh đón khách
    window.__LAST_PLAYER_POSITION__ = null;
  }
  window.closeDetailModal = closeDetailModal;

  // Open Historical Detail Modal
  function openExhibitDetail(ex) {
    // PAUSE AUTO TOUR ON MODAL OPEN
    if (isAutoPlaying) { toggleAutoPlay(); }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    const modal = document.getElementById('exhibitDetailModal');
    if (!modal) return;
    const img = modal.querySelector('#detailModalImg');
    const title = modal.querySelector('#detailModalTitle');
    const camp = modal.querySelector('#detailModalCampaign');
    const year = modal.querySelector('#detailModalYear');
    const desc = modal.querySelector('#detailModalDesc');
    const content = modal.querySelector('#detailModalContent');

    const resolvedUrl = resolveImgUrl(ex.imageUrl || ex.mediaUrl);
    img.src = resolvedUrl;
    img.alt = ex.title || 'Hiện vật lịch sử';
    img.onerror = () => {
      if (typeof window !== 'undefined' && window.__EMBEDDED_MUSEUM_IMAGES__) {
        const store = window.__EMBEDDED_MUSEUM_IMAGES__;
        for (const k in store) {
          if (k.includes('khu3') || k.includes('ap_bac')) {
            img.src = store[k];
            break;
          }
        }
      }
    };

    title.textContent = ex.title;
    camp.textContent = ex.campaign || 'Chiến dịch lịch sử';
    year.textContent = ex.year || '';
    desc.textContent = ex.shortDescription || '';
    content.innerHTML = (ex.historicalContent || ex.description || '').replace(/\n/g, '<br><br>');

    modal.style.display = 'flex';
    modal.style.zIndex = '10001';

    const artifactPayload = {
      ...ex,
      hasPhoto: true,
      imageUrl: resolvedUrl,
      mediaUrl: resolvedUrl,
      description: ex.historicalContent || ex.shortDescription || ex.description
    };

    // Also trigger 3D openModalArtifact if available with complete resolved data
    if (typeof window.__ON_OPEN_ARTIFACT__ === 'function') {
      try {
        window.__ON_OPEN_ARTIFACT__(artifactPayload);
      } catch (e) {}
    } else if (window.__MUSEUM_3D_CTX__ && typeof window.__MUSEUM_3D_CTX__.openModalArtifact === 'function') {
      try {
        window.__MUSEUM_3D_CTX__.openModalArtifact(artifactPayload);
      } catch (e) {}
    }

    // Lưu vị trí camera hiện tại trước khi mở modal để đảm bảo tuyệt đối không bị reset
    if (typeof window.savePlayerTransform === 'function') {
      window.savePlayerTransform();
    }
    window.__IS_MODAL_OPEN__ = true;
    if (window.__THREE_CAMERA__ && !window.__LAST_PLAYER_POSITION__) {
      window.__LAST_PLAYER_POSITION__ = window.__THREE_CAMERA__.position.clone();
    }
  }
  window.openExhibitDetail = openExhibitDetail;

  function openKhu3Modal() {
    // PAUSE AUTO TOUR ON MODAL OPEN
    if (isAutoPlaying) { toggleAutoPlay(); }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    const modal = document.getElementById('khu3ExpandedShowcaseModal');
    if (modal) {
      modal.style.display = 'flex';
      highlightActiveExhibitInModal();
    }
  }
  window.openKhu3Modal = openKhu3Modal;

  function closeKhu3Modal() {
    const modal = document.getElementById('khu3ExpandedShowcaseModal');
    if (modal) modal.style.display = 'none';
  }
  window.closeKhu3Modal = closeKhu3Modal;

  const STEP_TO_ZONE3_EXHIBIT_MAP = {
    "k3_art1": ["exhibit-10"],
    "k3_art2": ["exhibit-11", "exhibit-west-6"],
    "k3_art3": ["exhibit-12", "exhibit-west-7", "exhibit-west-8"],
    "k3_art4": ["exhibit-13", "exhibit-west-9"],
    "k3_art5": ["exhibit-9"],
    "k3_art7": []
  };

  function highlightActiveExhibitInModal() {
    const step = PRESENTATION_STEPS[currentStepIndex];
    if (!step) return;
    const cards = document.querySelectorAll('.khu3-jumbo-frame');
    const mapped = (step.exhibitId && STEP_TO_ZONE3_EXHIBIT_MAP[step.exhibitId]) || [];
    cards.forEach(card => {
      const id = card.getAttribute('data-id');
      const isMatch = mapped.includes(id) ||
                      id === step.exhibitId ||
                      (step.exhibitId && step.exhibitId.includes(id));
      if (isMatch) {
        card.classList.add('active-exhibit');
      } else {
        card.classList.remove('active-exhibit');
      }
    });
  }

  function toggleMinimize() {
    isMinimized = !isMinimized;
    const bar = document.getElementById('apBacAutoDirectorBar');
    const btn = document.getElementById('btnMinimizeDirector');
    if (bar) {
      if (isMinimized) {
        bar.classList.add('minimized');
        if (btn) btn.textContent = '🔼 Mở rộng';
      } else {
        bar.classList.remove('minimized');
        if (btn) btn.textContent = '🔽 Thu nhỏ';
      }
    }
  }

  function toggleVoice() {
    isVoiceActive = !isVoiceActive;
    const btn = document.getElementById('btnToggleVoice');
    if (btn) {
      btn.textContent = isVoiceActive ? '🔊 Giọng đọc: BẬT' : '🔇 Giọng đọc: TẮT';
    }
    if (!isVoiceActive && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  function toggleAutoPlay() {
    const btn = document.getElementById('btnToggleAutoPlay');
    // If starting again from the last step, reset to step 0
    if (!isAutoPlaying && currentStepIndex >= PRESENTATION_STEPS.length - 1) {
      currentStepIndex = 0;
      updateDirectorUI();
    }
    isAutoPlaying = !isAutoPlaying;
    if (btn) {
      btn.textContent = isAutoPlaying ? '⏸ Tạm dừng' : '▶ Tiếp tục';
    }
    if (isAutoPlaying) {
      if (currentStepIndex === 0 && typeof window.__START_SABAN_ORBIT_5S__ === 'function') {
        window.__START_SABAN_ORBIT_5S__(() => {
          playCurrentStep();
        });
      } else {
        playCurrentStep();
      }
    } else {
      clearTimers();
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  }

  function nextStep(isAutoAdvance = false) {
    if (isAutoAdvance && !isAutoPlaying) return;
    if (currentStepIndex < PRESENTATION_STEPS.length - 1) {
      goToStep(currentStepIndex + 1);
    } else {
      if (isAutoPlaying) {
        isAutoPlaying = false;
        clearTimers();
        const btn = document.getElementById('btnToggleAutoPlay');
        if (btn) btn.textContent = '▶ Bắt đầu lại';
      }
    }
  }

  function goToStep(idx) {
    if (typeof idx !== 'number' || isNaN(idx) || idx < 0 || idx >= PRESENTATION_STEPS.length) return;
    clearTimers();
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    currentStepIndex = idx;
    updateDirectorUI();
    if (isAutoPlaying) {
      playCurrentStep();
    } else {
      moveCameraToStep(PRESENTATION_STEPS[currentStepIndex]);
    }
  }

  function updateDirectorUI() {
    const step = PRESENTATION_STEPS[currentStepIndex];
    if (!step) return;

    const badge = document.getElementById('dirSpeakerBadge');
    if (badge) badge.textContent = `${step.speaker} • Bước ${step.id}/${PRESENTATION_STEPS.length}`;

    const zone = document.getElementById('dirZoneTitle');
    if (zone) zone.textContent = step.zoneTitle;

    const title = document.getElementById('dirExhibitTitle');
    if (title) title.textContent = step.title;

    const sub = document.getElementById('dirSubtitleText');
    if (sub) sub.textContent = step.subtitle;

    const img = document.getElementById('dirPreviewImg');
    if (img) {
      img.src = resolveImgUrl(step.thumbnail);
      img.onerror = () => {
        if (typeof window !== 'undefined' && window.__EMBEDDED_MUSEUM_IMAGES__) {
          img.src = window.__EMBEDDED_MUSEUM_IMAGES__['./media/saban/saban_toan_canh_3d.png'] || '';
        }
      };
    }

    const fill = document.getElementById('dirProgressFill');
    if (fill) {
      const pct = ((currentStepIndex + 1) / PRESENTATION_STEPS.length) * 100;
      fill.style.width = pct + '%';
    }

    highlightActiveExhibitInModal();
  }

  function playCurrentStep() {
    const step = PRESENTATION_STEPS[currentStepIndex];
    if (!step) return;

    // Tự động chiếu phim tư liệu tại Step 10 (Trận Ấp Bắc 2/1/1963)
    if (step.id === 10 && typeof window.toggleCinemaPlay === 'function') {
      try {
        window.toggleCinemaPlay();
      } catch (e) {}
    }

    // Tự động bay quanh Sa Bàn 360 độ từ trên cao tại Step 3
    if (step.id === 3 && typeof window.__START_SABAN_ORBIT_5S__ === 'function') {
      window.__START_SABAN_ORBIT_5S__(() => {
        playStepVoice(step);
      });
      return;
    }

    moveCameraToStep(step);
    playStepVoice(step);
  }

  function playStepVoice(step) {
    clearTimers();
    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    const durationSec = step.durationSec || 15;

    if (isVoiceActive && ('speechSynthesis' in window)) {
      const plainText = (step.subtitle || '').replace(/[“”]/g, '').replace(/\n/g, ' ');
      const utter = new SpeechSynthesisUtterance(plainText);
      utter.lang = 'vi-VN';
      utter.rate = 1.0;

      const voices = (cachedVoices && cachedVoices.length) ? cachedVoices : (window.speechSynthesis.getVoices() || []);
      const viVoice = voices.find(v => v.lang && (v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn')));
      if (viVoice) utter.voice = viVoice;

      let hasAdvanced = false;
      utter.onend = () => {
        if (hasAdvanced) return;
        hasAdvanced = true;
        if (isAutoPlaying) {
          advanceTimer = setTimeout(() => {
            if (isAutoPlaying) nextStep(true);
          }, 1200);
        }
      };
      utter.onerror = (e) => {
        if (e && (e.error === 'canceled' || e.error === 'interrupted')) {
          return;
        }
        // If speech fails or is blocked by browser, preserve the durationTimer so viewer has full time to read
        if (durationTimer) {
          return;
        }
        if (hasAdvanced) return;
        hasAdvanced = true;
        if (isAutoPlaying) {
          advanceTimer = setTimeout(() => {
            if (isAutoPlaying) nextStep(true);
          }, 1200);
        }
      };

      try {
        window.speechSynthesis.speak(utter);
        currentUtterance = utter;
      } catch (e) {}

      // Fallback timer
      durationTimer = setTimeout(() => {
        if (!hasAdvanced) {
          hasAdvanced = true;
          if (isAutoPlaying) {
            nextStep(true);
          }
        }
      }, (durationSec + 4) * 1000);
    } else {
      if (isAutoPlaying) {
        durationTimer = setTimeout(() => {
          if (isAutoPlaying) nextStep(true);
        }, durationSec * 1000);
      }
    }
  }

  function moveCameraToStep(step) {
    if (!step || !step.camPos || !step.lookAt) return;
    const cx = step.camPos[0], cy = step.camPos[1], cz = step.camPos[2];
    const lx = step.lookAt[0], ly = step.lookAt[1], lz = step.lookAt[2];

    const dx = lx - cx, dy = ly - cy, dz = lz - cz;
    const hDist = Math.hypot(dx, dz);
    const yaw = Math.atan2(-dx, -dz);
    const pitch = Math.atan2(dy, hDist);

    if (window.__MUSEUM_3D_CTX__) {
      const ctx = window.__MUSEUM_3D_CTX__;
      if (ctx.constructors && ctx.constructors.Vector3 && ctx.targetPos) {
        ctx.targetPos.current = new ctx.constructors.Vector3(cx, cy, cz);
      } else if (ctx.camera) {
        ctx.camera.position.set(cx, cy, cz);
      }
      if (ctx.targetYaw) ctx.targetYaw.current = yaw;
      if (ctx.targetPitch) ctx.targetPitch.current = pitch;
      if (ctx.cameraOrientation && ctx.cameraOrientation.current) {
        if (ctx.cameraOrientation.current.targetRot) {
          ctx.cameraOrientation.current.targetRot.yaw = yaw;
          ctx.cameraOrientation.current.targetRot.pitch = pitch;
        } else {
          ctx.cameraOrientation.current.yaw = yaw;
          ctx.cameraOrientation.current.pitch = pitch;
        }
      }
    }

    try {
      window.dispatchEvent(new CustomEvent('museum:focus-exhibit', {
        detail: {
          stepIndex: currentStepIndex,
          step: step,
          camPos: step.camPos,
          lookAt: step.lookAt,
          exhibitId: step.exhibitId
        }
      }));
    } catch (e) {}

    if (!isNavigatingStep && window.timelineMuseumSystem && typeof window.timelineMuseumSystem.focusExhibit === 'function' && window.timelineMuseumSystem.focusExhibit !== timelineFocusFallback) {
      try {
        isNavigatingStep = true;
        window.timelineMuseumSystem.focusExhibit(step);
      } catch (e) {
      } finally {
        isNavigatingStep = false;
      }
    }
  }

  let isNavigatingStep = false;
  function timelineFocusFallback(step) {
    if (isNavigatingStep) return;
    isNavigatingStep = true;
    try {
      moveCameraToStep(step);
    } finally {
      isNavigatingStep = false;
    }
  }

  // Fallback for timelineMuseumSystem
  window.timelineMuseumSystem = window.timelineMuseumSystem || {};
  if (!window.timelineMuseumSystem.focusExhibit) {
    window.timelineMuseumSystem.focusExhibit = timelineFocusFallback;
  }

  // Auto-init on DOMContentLoaded or immediate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDOM);
  } else {
    initDOM();
  }

  // Exports for testing / external calls
  window.__AP_BAC_PRESENTATION_STEPS__ = PRESENTATION_STEPS;
  window.__ZONE_3_EXHIBITS__ = ZONE_3_EXHIBITS;
  window.__goToPresentationStep__ = goToStep;

})();
