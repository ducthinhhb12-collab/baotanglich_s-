/**
 * =========================================================================
 * BẢO TÀNG LỊCH SỬ SỐ (1954 – 1975) - ĐỘI ẤP BẮC
 * HỆ THỐNG QUẢN LÝ ĐA PHƯƠNG TIỆN: THÊM ẢNH, THÊM VIDEO & LƯU DỮ LIỆU 3D
 * =========================================================================
 * Cung cấp giải pháp toàn diện:
 * 1. Thêm / Thay thế ảnh cho toàn bộ 14 bức tranh lịch sử trong 3 khu triển lãm
 * 2. Thêm / Thay thế video cho Màn hình rạp chiếu phim khổng lồ 11.2m x 4.9m tại Khu 2
 * 3. Lưu trữ vĩnh viễn dữ liệu (Persistence):
 *    - Lưu vào máy chủ Node.js (/api/exhibits -> museum-data.json)
 *    - Lưu vào bộ nhớ trình duyệt (localStorage) để bảo toàn 100% khi chạy offline
 *    - Xuất tệp sao lưu (.json) và nạp lại bất kỳ lúc nào
 * 4. Giao diện Modal trực quan chuẩn bảo tàng hoàng gia, xem trước tức thời
 */

(function () {
  "use strict";

  // Danh mục đầy đủ tranh mặc định theo kịch bản Đội Ấp Bắc & Sa Bàn
  const DEFAULT_PAINTINGS = [
    // =========================================================================
    // KHU 1: ÂM MƯU VÀ THỦ ĐOẠN CỦA MỸ TRONG CHIẾN LƯỢC CHIẾN TRANH ĐẶC BIỆT (6 TRANH)
    // =========================================================================
    {
      id: "k1_art1", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Bắc Khu 1 (Trái)",
      title: "PHONG TRÀO ĐỒNG KHỞI (1959–1960) – BƯỚC NGOẶT CHUYỂN THẾ CÁCH MẠNG", year: "1959–1960",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-1/1. CỐ VẤN MỸ VÀ QUÂN ĐỘI SÀI GÒN.jpg",
      description: "Khởi đầu từ Mỏ Cày (Bến Tre) ngày 17/1/1960 dưới sự lãnh đạo của Tỉnh ủy và nữ tướng Nguyễn Thị Định, phong trào 'Đồng khởi' lan rộng như triều dâng bão cuốn khắp miền Nam, phá tan từng mảng lớn chính quyền địch ở cơ sở, đưa cách mạng từ thế giữ gìn lực lượng chuyển hẳn sang thế tiến công."
    },
    {
      id: "k1_art2", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Bắc Khu 1 (Phải)",
      title: "KẾ HOẠCH STALEY - TAYLOR: MỸ TRIỂN KHAI 'CHIẾN TRANH ĐẶC BIỆT'", year: "1961–1963",
      imageUrl: "./media/khu1/khu1_02_chien_tranh_dac_biet.jpg",
      description: "Sau thất bại của thực dân mới cổ điển, từ năm 1961 Mỹ thông qua kế hoạch Staley - Taylor, triển khai chiến lược 'Chiến tranh đặc biệt' với công thức: Quân đội Sài Gòn + Tiền của, vũ khí tối tân và Cố vấn Mỹ, mưu đồ dùng người Việt đánh người Việt nhằm bình định miền Nam trong 18 tháng."
    },
    {
      id: "k1_art3", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Tây Khu 1 (Phía Bắc)",
      title: "QUÂN ĐỘI SÀI GÒN VÀ BỘ CHỈ HUY VIỆN TRỢ QUÂN SỰ MỸ (MACV)", year: "1962",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-1/1. CỐ VẤN MỸ VÀ QUÂN ĐỘI SÀI GÒN.jpg",
      description: "Ngày 8/2/1962, Mỹ lập Bộ Chỉ huy Viện trợ Quân sự Mỹ tại Việt Nam (MACV) do Đại tướng Paul D. Harkins đứng đầu. Hệ thống cố vấn quân sự Mỹ được cài cắm tới tận cấp tiểu đoàn, nắm quyền chỉ huy tác chiến trực tiếp và huấn luyện quân đội Sài Gòn thực hiện các cuộc càn quét đẫm máu."
    },
    {
      id: "k1_art4", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Tây Khu 1 (Phía Nam)",
      title: "CHIẾN THUẬT 'TRỰC THĂNG VẬN' – HỎA LỰC VÀ ĐỔ QUÂN CƠ ĐỘNG ĐƯỜNG KHÔNG", year: "1962",
      imageUrl: "./media/khu1/khu1_chuyen_truc_thang_van_1920.jpg",
      description: "Mỹ ồ ạt đưa các phi đoàn trực thăng CH-21 Shawnee và UH-1 Iroquois vào chiến trường miền Nam. Chiến thuật 'Trực thăng vận' tạo ưu thế cơ động chớp nhoáng, đổ quân bao vây bất ngờ từ trên không hòng triệt tiêu lối đánh du kích và địa hình sông nước chia cắt của ta."
    },
    {
      id: "k1_art5", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Nam Khu 1 (Trái)",
      title: "CHIẾN THUẬT 'THIẾT XA VẬN' – XE BỌC THÉP M113 CÀN QUÉT ĐỒNG BẰNG", year: "1962",
      imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/THIẾT XA VẬN.jfif",
      description: "Thiết xa vận sử dụng xe thiết giáp bọc thép lội nước M113 trang bị hỏa lực súng máy hạng nặng 12.7mm. Với khả năng vượt sình lầy vượt trội, M113 được ví như những pháo đài thép di động dập tắt hỏa lực đối phương và càn quét các căn cứ kháng chiến giải phóng."
    },
    {
      id: "k1_art6", zone: 1, zoneName: "Khu Trưng Bày 1 (1961–1963)",
      location: "Tường Nam Khu 1 (Phải)",
      title: "QUỐC SÁCH 'ẤP CHIẾN LƯỢC' – HÀNG RÀO KÌM KẸP VÀ TỘI ÁC DỒN DÂN", year: "1961–1963",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-1/5. TỘI ÁC DỒN DÂN.jfif",
      description: "Mỹ – Diệm coi ấp chiến lược là 'xương sống' và 'quốc sách' hàng đầu. Địch dùng bom đạn đốt phá làng xóm, cưỡng bức hàng triệu đồng bào vào các trại tập trung trá hình bao quanh bởi hào sâu, dây thép gai và chông bẫy nhằm thực hiện mưu đồ thâm độc 'tát nước bắt cá'."
    },

    // =========================================================================
    // KHU 2: CHIẾN THẮNG ẤP BẮC NGÀY 02/01/1963 (6 TRANH + RẠP CHIẾU PHIM)
    // =========================================================================
    {
      id: "k2_art1", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Tây Khu 2 (Cửa Vòm Nam)",
      title: "TRẬN ĐỊA ẤP BẮC (MỸ THO) – ĐIỂM HẸN LỊCH SỬ NGÀY 02/01/1963", year: "02/01/1963",
      imageUrl: "./media/chienthang_apbac_poster.jpg",
      description: "Ấp Bắc thuộc xã Tân Phú, huyện Cai Lậy, tỉnh Mỹ Tho. Nơi đây đã diễn ra cuộc đọ sức lịch sử giữa lòng quả cảm của quân dân miền Nam với các chiến thuật tân kỳ tối tân nhất của đế quốc Mỹ, mở đầu cho chuỗi ngày sụp đổ của Chiến tranh đặc biệt."
    },
    {
      id: "k2_art2", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Tây Khu 2 (Cửa Vòm Bắc)",
      title: "CUỘC HÀNH QUÂN 'ĐỨC THẮNG 1/63' – ĐỊCH MỞ MÀN CÀN QUÉT ẤP BẮC", year: "02/01/1963",
      imageUrl: "./media/khu1/khu1_quan_my_chien_dich_ap_bac.jpg",
      description: "Rạng sáng 2/1/1963, địch mở cuộc hành quân quy mô lớn mang mật danh 'Đức Thắng 1/63' đánh vào Ấp Bắc theo 3 mũi: thủy, bộ và đường không, hòng bao vây bắt sống lực lượng vũ trang giải phóng và đài phát thanh cách mạng trong một đòn chớp nhoáng."
    },
    {
      id: "k2_art3", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Bắc Khu 2 (Trái)",
      title: "ĐỊCH HUY ĐỘNG PHƯƠNG TIỆN TỐI TÂN DƯỚI SỰ CHỈ HUY CỦA CỐ VẤN MỸ", year: "02/01/1963",
      imageUrl: "./media/khu3/khu3_ap_bac_2.png",
      description: "Gần 2.000 lính thiện chiến ngụy được trang bị 13 xe bọc thép M113, hàng chục máy bay chiến đấu và trực thăng vũ trang yểm trợ tối đa. Trung tá cố vấn Mỹ John Paul Vann trực tiếp bay chỉ huy điều phối toàn bộ các đợt tiến công."
    },
    {
      id: "k2_art4", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Bắc Khu 2 (Phải)",
      title: "QUÂN GIẢI PHÓNG ĐẬP TAN 5 ĐỢT TẤN CÔNG – BẮN RƠI 14 MÁY BAY", year: "02/01/1963",
      imageUrl: "./media/khu1/khu1_truc_thang_ap_bac_bi_ban_roi.jpg",
      description: "Khoảng 350 chiến sĩ Tiểu đoàn 261, 514 và du kích địa phương đã kiên cường bám chắc công sự, bẻ gãy 5 đợt tiến công của địch; bắn rơi và làm hư hỏng 14 máy bay trực thăng, bắn cháy 3 xe M113, loại khỏi vòng chiến đấu hơn 450 tên địch."
    },
    {
      id: "k2_art5", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Nam Khu 2 (Trái)",
      title: "Ý NGHĨA LỊCH SỬ ẤP BẮC – ĐÒN CHÍ MẠNG VÀO HỌC THUYẾT QUÂN SỰ MỸ", year: "1963",
      imageUrl: "./media/TI_T_1_B_I_8-image16.png",
      description: "Chiến thắng Ấp Bắc chứng minh quân và dân miền Nam hoàn toàn có khả năng đánh bại quân đội Sài Gòn dù được trang bị vũ khí tối tân của Mỹ, làm lung lay tận gốc niềm tin của Lầu Năm Góc vào trực thăng vận và thiết xa vận, mở ra cao trào đánh Mỹ - ngụy trên khắp miền Nam."
    },
    {
      id: "k2_art6", zone: 2, zoneName: "Khu Trưng Bày 2: Chiến Thắng Ấp Bắc",
      location: "Tường Nam Khu 2 (Phải)",
      title: "PHONG TRÀO 'THI ĐUA ẤP BẮC, GIẾT GIẶC LẬP CÔNG' LAN RỘNG TOÀN MIỀN", year: "1963",
      imageUrl: "./media/khu3/khu3_ap_bac_7.jpg",
      description: "Khí thế hào hùng Ấp Bắc đã thắp sáng phong trào 'Thi đua Ấp Bắc, giết giặc lập công' trên khắp các chiến trường miền Nam. Hàng vạn thanh niên tòng quân giết giặc, du kích thi đua bắn tỉa máy bay, tiêu diệt xe cơ giới, đẩy địch lún sâu vào thế bị động phòng ngự lúng túng."
    },

    // =========================================================================
    // KHU 3: TỪ ẤP BẮC ĐẾN THẤT BẠI CỦA 'CHIẾN TRANH ĐẶC BIỆT' (7 TRANH)
    // =========================================================================
    {
      id: "k3_art1", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Vách Độc Lập Mặt Nam (Trái)",
      title: "CHIẾN THẮNG BÌNH GIÃ (12/1964) – ĐÒN SẤM SÉT TIÊU DIỆT CHỦ LỰC NGỤY", year: "12/1964 – 01/1965",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-3/1. CHIẾN THẮNG BÌNH GIÃ.jpg",
      description: "Diễn ra tại Bà Rịa, Quân giải phóng đã tiêu diệt gọn 2 tiểu đoàn thiện chiến thuộc lực lượng trù bị chiến lược ngụy (Thủy quân lục chiến và Biệt động quân), đánh thiệt hại nặng trung đoàn thiết giáp. Chiến thắng Bình Giã đánh dấu sự phá sản về cơ bản của chiến lược 'Chiến tranh đặc biệt'."
    },
    {
      id: "k3_art2", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Vách Độc Lập Mặt Nam (Phải)",
      title: "CHIẾN THẮNG AN LÃO (12/1964) – GIẢI PHÓNG CĂN CỨ MIỀN TRUNG", year: "12/1964",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-3/2. CHIẾN THẮNG AN LÃO.jpg",
      description: "Lực lượng vũ trang Quân khu 5 tập kích tiêu diệt chi khu quân sự và các cứ điểm kiên cố của địch tại thung lũng An Lão (Bình Định), giải phóng hoàn toàn vùng đất rộng lớn với hơn 10.000 dân, tạo thế uy hiếp trực tiếp hệ thống phòng tuyến ven biển của địch."
    },
    {
      id: "k3_art3", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Vách Độc Lập Mặt Bắc (Phải)",
      title: "CHIẾN THẮNG BA GIA (05/1965) – XÓA SỔ HOÀN TOÀN CHIẾN ĐOÀN CƠ ĐỘNG", year: "05/1965",
      imageUrl: "public/assets/doi-ap-bac/anh-khu-3/3. CHIẾN THẮNG BA GIA.jpg",
      description: "Tại Sơn Tịnh (Quảng Ngãi), bằng nghệ thuật 'đánh điểm diệt viện' điêu luyện, bộ đội chủ lực Quân khu 5 đã xóa sổ hoàn toàn một chiến đoàn cơ động hỗn hợp gồm 4 tiểu đoàn ngụy, chứng minh quân đội tay sai Sài Gòn đã mất hoàn toàn khả năng đương đầu với các đòn đánh tập trung của ta."
    },
    {
      id: "k3_art4", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Vách Độc Lập Mặt Bắc (Trái)",
      title: "CHIẾN THẮNG ĐỒNG XOÀI (06/1965) – ĐÁNH SẬP CĂN CỨ BIỆT KÍCH MIỀN ĐÔNG", year: "06/1965",
      imageUrl: "./media/khu3/khu3_dong_xoai_2.jpg",
      description: "Quân giải phóng mở đợt công kiên quy mô lớn đánh sập hoàn toàn chi khu quân sự Đồng Xoài (Bình Phước), tiêu diệt 4 tiểu đoàn ngụy và các cố vấn Mỹ. Thắng lợi vang dội Đồng Xoài đã chôn vùi dứt điểm hy vọng xoay chuyển cục diện của Mỹ bằng lực lượng quân đội tay sai."
    },
    {
      id: "k3_art5", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Tường Tây Khu 3 (Phía Nam)",
      title: "PHONG TRÀO ĐẤU TRANH CHÍNH TRỊ ĐÔ THỊ VÀ 'ĐỘI QUÂN TÓC DÀI'", year: "1961–1965",
      imageUrl: "./media/TI_T_1_B_I_8-image11.png",
      description: "Song song với mặt trận quân sự, hàng triệu lượt quần chúng ở nông thôn và các đô thị lớn như Sài Gòn, Huế, Đà Nẵng đã biểu tình rầm rộ đòi dân sinh dân chủ, chống áp bức độc tài. Phong trào của Phật tử, học sinh, sinh viên và Đội quân tóc dài đã làm rung chuyển tận gốc bộ máy thống trị ngụy quyền."
    },
    {
      id: "k3_art6", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Tường Tây Khu 3 (Trung tâm)",
      title: "QUÂN VÀ DÂN MIỀN NAM NỔI DẬY PHÁ TAN HỆ THỐNG 'ẤP CHIẾN LƯỢC'", year: "1963–1965",
      imageUrl: "./media/TI_T_1_B_I_8-image8.png",
      description: "Với phương châm 'bám đất giữ làng', quần chúng nhân dân phối hợp du kích vũ trang nổi dậy phá dỡ hàng ngàn ấp chiến lược, phá tan hàng rào thép gai và biến các khu dồn dân thành làng chiến đấu kiên cường. Đến năm 1965, 'xương sống' của Chiến tranh đặc biệt hoàn toàn bị gãy vụn."
    },
    {
      id: "k3_art7", zone: 3, zoneName: "Khu Trưng Bày 3 (1964–1965)",
      location: "Tường Bắc Trung Tâm Khu 3",
      title: "CHIẾN LƯỢC 'CHIẾN TRANH ĐẶC BIỆT' CỦA ĐẾ QUỐC MỸ HOÀN TOÀN PHÁ SẢN", year: "1965",
      imageUrl: "./media/khu1/khu1_linh_my_be_tac.jpg",
      description: "Trước chuỗi đòn sấm sét từ Ấp Bắc, Bình Giã, An Lão, Ba Gia, Đồng Xoài và sự sụp đổ của quốc sách ấp chiến lược, chiến lược 'Chiến tranh đặc biệt' của Mỹ hoàn toàn phá sản. Thất bại không thể cứu vãn này đã buộc Lầu Năm Góc phải trực tiếp đưa quân viễn chinh Mỹ đổ bộ vào miền Nam, chuyển sang 'Chiến tranh cục bộ'."
    }
  ];

  const DEFAULT_VIDEO = {
    id: "k2_cinema",
    title: "CHIẾN THẮNG ẤP BẮC (02/01/1963)",
    videoUrl: "./media/doi-ap-bac/video/chienthang_apbac_1963.mp4",
    posterUrl: "./media/chienthang_apbac_poster.jpg",
    duration: "01:30 (90 GIÂY)"
  };

  // Registry toàn cục
  window.__MUSEUM_PAINTINGS_REGISTRY__ = window.__MUSEUM_PAINTINGS_REGISTRY__ || {};
  window.__MUSEUM_CINEMA_STATE__ = window.__MUSEUM_CINEMA_STATE__ || { ...DEFAULT_VIDEO };

  // Helper nạp từ localStorage
  function getStoredCustomPaintings() {
    try {
      const saved = localStorage.getItem("museum_custom_paintings");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  function getStoredCustomVideo() {
    try {
      const saved = localStorage.getItem("museum_custom_video");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  // Đăng ký tranh từ Three.js runtime
  window.__registerMuseumPainting = function (id, frameObj, meta) {
    const customData = getStoredCustomPaintings();
    const effectiveMeta = Object.assign({}, meta, customData[id] || {});

    window.__MUSEUM_PAINTINGS_REGISTRY__[id] = {
      id,
      frame: frameObj,
      meta: effectiveMeta,
      defaultMeta: { ...meta }
    };

    // Nếu đã có dữ liệu lưu trữ từ trước khác mặc định, cập nhật ngay lên 3D
    if (customData[id]) {
      setTimeout(() => {
        window.__applyPaintingChange(id, customData[id], false);
      }, 100);
    }
  };

  // Đăng ký rạp chiếu phim từ Three.js runtime
  window.__registerMuseumCinema = function (cinemaObj, videoElement, videoTexture) {
    window.__MUSEUM_CINEMA_STATE__.cinemaObj = cinemaObj;
    window.__MUSEUM_CINEMA_STATE__.videoElement = videoElement;
    window.__MUSEUM_CINEMA_STATE__.videoTexture = videoTexture;

    const savedVideo = getStoredCustomVideo();
    if (savedVideo && savedVideo.videoUrl) {
      setTimeout(() => {
        window.__applyVideoChange(savedVideo.videoUrl, savedVideo.title, false);
      }, 150);
    }
  };

  // Áp dụng cập nhật tranh vào không gian 3D Three.js tức thời
  window.__applyPaintingChange = function (id, newMeta, shouldSave = true) {
    const item = window.__MUSEUM_PAINTINGS_REGISTRY__[id];
    if (!item) {
      console.warn("[MEDIA MANAGER] Không tìm thấy tranh với ID:", id);
      return false;
    }

    Object.assign(item.meta, newMeta);
    const { artMesh, plaqueMesh } = item.frame;

    // 1. Cập nhật tranh Canvas Texture
    if (newMeta.imageUrl && artMesh) {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 680;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, 1024, 680);
        ctx.fillStyle = "#cbd5e1";
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText("Đang tải tranh lịch sử...", 512, 340);
      }

      let CanvasTextureCons = window.THREE ? window.THREE.CanvasTexture : (window.__MUSEUM_3D_CTX__ ? window.__MUSEUM_3D_CTX__.constructors.CanvasTexture : null);
      if (artMesh.material && artMesh.material.map && artMesh.material.map.constructor) {
        CanvasTextureCons = artMesh.material.map.constructor;
      }

      if (CanvasTextureCons) {
        const tex = new CanvasTextureCons(canvas);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = newMeta.imageUrl;
        img.onload = () => {
          if (ctx) {
            ctx.drawImage(img, 0, 0, 1024, 680);
            tex.needsUpdate = true;
          }
        };

        if (artMesh.material) {
          if (artMesh.material.map && artMesh.material.map.dispose) {
            artMesh.material.map.dispose();
          }
          artMesh.material.map = tex;
          artMesh.material.needsUpdate = true;
        }
      }
    }

    // 2. Cập nhật Bảng tên kim loại đồng thau bên dưới tranh
    if (plaqueMesh && (newMeta.title || newMeta.year)) {
      const pcv = document.createElement("canvas");
      pcv.width = 512;
      pcv.height = 120;
      const pctx = pcv.getContext("2d");
      if (pctx) {
        const grad = pctx.createLinearGradient(0, 0, 512, 120);
        grad.addColorStop(0, "#2c1c0e");
        grad.addColorStop(0.5, "#422814");
        grad.addColorStop(1, "#2c1c0e");
        pctx.fillStyle = grad;
        pctx.fillRect(0, 0, 512, 120);
        pctx.strokeStyle = "#d4af37";
        pctx.lineWidth = 4;
        pctx.strokeRect(6, 6, 500, 108);
        pctx.fillStyle = "#fef08a";
        pctx.font = 'bold 22px "Cinzel", Georgia, serif';
        pctx.textAlign = "center";
        pctx.fillText(item.meta.year || "1961–1965", 256, 38);
        pctx.fillStyle = "#ffffff";
        pctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
        const dispTitle = item.meta.title || "";
        pctx.fillText(dispTitle.length > 32 ? dispTitle.slice(0, 30) + "..." : dispTitle, 256, 76);
      }

      let CanvasTextureCons = window.THREE ? window.THREE.CanvasTexture : (window.__MUSEUM_3D_CTX__ ? window.__MUSEUM_3D_CTX__.constructors.CanvasTexture : null);
      if (plaqueMesh.material && plaqueMesh.material.map && plaqueMesh.material.map.constructor) {
        CanvasTextureCons = plaqueMesh.material.map.constructor;
      }

      if (CanvasTextureCons) {
        const ptex = new CanvasTextureCons(pcv);
        if (plaqueMesh.material) {
          if (plaqueMesh.material.map && plaqueMesh.material.map.dispose) {
            plaqueMesh.material.map.dispose();
          }
          plaqueMesh.material.map = ptex;
          plaqueMesh.material.needsUpdate = true;
        }
      }
    }

    // 3. Cập nhật dữ liệu tương tác khi người dùng click vào tranh
    if (window.__THREE_INTERACTABLES__) {
      window.__THREE_INTERACTABLES__.forEach(entry => {
        if ((entry.mesh === artMesh || entry.mesh === plaqueMesh) && entry.artifact) {
          entry.artifact.title = item.meta.title;
          entry.artifact.year = item.meta.year;
          entry.artifact.imageUrl = item.meta.imageUrl;
          entry.artifact.description = item.meta.description;
          entry.artifact.shortDescription = item.meta.description;
          entry.label = "🖼️ " + item.meta.title + " (" + item.meta.year + ")";
        }
      });
    }

    // 4. Lưu vào localStorage nếu yêu cầu
    if (shouldSave) {
      try {
        const currentData = getStoredCustomPaintings();
        currentData[id] = item.meta;
        localStorage.setItem("museum_custom_paintings", JSON.stringify(currentData));
      } catch (e) {
        console.warn("[MEDIA MANAGER] Lỗi ghi localStorage:", e);
      }
    }

    console.log(`[MEDIA MANAGER] Đã áp dụng tranh [${id}]:`, item.meta.title);
    return true;
  };

  // Áp dụng cập nhật video vào rạp chiếu phim 3D tức thời
  window.__applyVideoChange = function (newVideoUrl, newTitle = "", shouldSave = true) {
    if (!newVideoUrl) return false;

    window.__MUSEUM_CINEMA_STATE__.videoUrl = newVideoUrl;
    if (newTitle) window.__MUSEUM_CINEMA_STATE__.title = newTitle;

    const vElem = window.__MUSEUM_CINEMA_STATE__.videoElement;
    if (vElem) {
      vElem.src = newVideoUrl;
      vElem.load();
      vElem.play().catch(() => {
        console.log("[MEDIA MANAGER] Tự động phát video bị chặn, cần tương tác chuột.");
      });
    }

    const cinemaObj = window.__MUSEUM_CINEMA_STATE__.cinemaObj;
    const vTex = window.__MUSEUM_CINEMA_STATE__.videoTexture;
    if (cinemaObj && cinemaObj.screenMesh && vTex) {
      cinemaObj.screenMesh.material.map = vTex;
      cinemaObj.screenMesh.material.needsUpdate = true;
    }

    if (shouldSave) {
      try {
        localStorage.setItem("museum_custom_video", JSON.stringify({
          videoUrl: newVideoUrl,
          title: window.__MUSEUM_CINEMA_STATE__.title
        }));
      } catch (e) {
        console.warn("[MEDIA MANAGER] Lỗi ghi localStorage video:", e);
      }
    }

    console.log("[MEDIA MANAGER] Đã cập nhật video rạp chiếu phim 3D:", newVideoUrl);
    return true;
  };

  // Xử lý upload tệp đa phương tiện (ảnh hoặc video)
  window.__uploadMediaFile = async function (file) {
    if (!file) return null;

    // Thử tải lên API máy chủ /api/upload
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-filename": encodeURIComponent(file.name)
        },
        body: file
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.url) {
          console.log("[MEDIA MANAGER] Tải file lên máy chủ thành công:", data.url);
          return data.url;
        }
      }
    } catch (err) {
      console.warn("[MEDIA MANAGER] Máy chủ không phản hồi upload, chuyển sang nạp cục bộ DataURL/Blob:", err);
    }

    // Nếu không có máy chủ hoặc lỗi mạng, đọc thành Blob URL hoặc DataURL (Base64)
    if (file.type.startsWith("video/")) {
      return URL.createObjectURL(file);
    } else {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  };

  // Lưu toàn bộ dữ liệu lên máy chủ và trình duyệt
  window.__saveMuseumDataToServer = async function () {
    const customPaintings = getStoredCustomPaintings();
    const customVideo = getStoredCustomVideo();

    let serverSuccess = false;
    let message = "";

    try {
      const res = await fetch("/api/exhibits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customPaintings,
          customVideo,
          lastUpdated: Date.now()
        })
      });
      if (res.ok) {
        serverSuccess = true;
        message = "✅ ĐÃ LƯU THÀNH CÔNG VÀO MÁY CHỦ (museum-data.json) & BỘ NHỚ TRÌNH DUYỆT!";
      } else {
        message = "⚠️ Đã lưu vĩnh viễn vào Bộ nhớ trình duyệt (LocalStorage).";
      }
    } catch (err) {
      message = "⚠️ Đã lưu an toàn vào Bộ nhớ trình duyệt (Chế độ ngoại tuyến).";
    }

    showToast(message, serverSuccess ? "success" : "info");
    return { success: true, serverSuccess, message };
  };

  // Xuất file sao lưu cấu hình (.json)
  window.__exportMuseumBackupJson = function () {
    const backupData = {
      version: "apbac_v9",
      exportDate: new Date().toISOString(),
      customPaintings: getStoredCustomPaintings(),
      customVideo: getStoredCustomVideo()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    a.href = url;
    a.download = `bao_tang_lich_su_so_backup_${dStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📥 Đã tải tệp sao lưu dữ liệu bảo tàng về máy tính!", "success");
  };

  // Nhập dữ liệu phục hồi từ file JSON
  window.__importMuseumBackupJson = function (file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.customPaintings) {
          localStorage.setItem("museum_custom_paintings", JSON.stringify(data.customPaintings));
          Object.keys(data.customPaintings).forEach(id => {
            window.__applyPaintingChange(id, data.customPaintings[id], false);
          });
        }
        if (data.customVideo) {
          localStorage.setItem("museum_custom_video", JSON.stringify(data.customVideo));
          window.__applyVideoChange(data.customVideo.videoUrl, data.customVideo.title, false);
        }
        showToast("🎉 ĐÃ PHỤC HỒI DỮ LIỆU TỪ TỆP SAO LƯU THÀNH CÔNG!", "success");
        renderCurrentSettings();
      } catch (err) {
        showToast("❌ Tệp dữ liệu không hợp lệ: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  };

  // Khôi phục mặc định ban đầu của Đội Ấp Bắc
  window.__resetMuseumToDefault = function () {
    if (!confirm("Bạn có chắc chắn muốn khôi phục lại toàn bộ ảnh, video và tiêu đề mặc định của Đội Ấp Bắc không?")) {
      return;
    }

    localStorage.removeItem("museum_custom_paintings");
    localStorage.removeItem("museum_custom_video");

    DEFAULT_PAINTINGS.forEach(p => {
      window.__applyPaintingChange(p.id, p, false);
    });

    window.__applyVideoChange(DEFAULT_VIDEO.videoUrl, DEFAULT_VIDEO.title, false);

    // Đồng bộ lên server nếu có
    fetch("/api/exhibits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customPaintings: {},
        customVideo: DEFAULT_VIDEO,
        lastUpdated: Date.now()
      })
    }).catch(() => {});

    showToast("↺ Đã khôi phục dữ liệu gốc Đội Ấp Bắc thành công!", "success");
    renderCurrentSettings();
  };

  // Toast thông báo nổi
  function showToast(text, type = "info") {
    let container = document.getElementById("museum-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "museum-toast-container";
      container.style.cssText = "position:fixed;bottom:80px;right:24px;z-index:999999;display:flex;flex-direction:column;gap:10px;pointer-events:none;font-family:'Be Vietnam Pro',sans-serif;";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const colors = {
      success: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
      error: "linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)",
      info: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
    };
    const borders = {
      success: "#34d399",
      error: "#f87171",
      info: "#d4af37"
    };

    toast.style.cssText = `background:${colors[type] || colors.info};border:1.5px solid ${borders[type] || borders.info};color:#ffffff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 10px 25px rgba(0,0,0,0.6);display:flex;align-items:center;gap:10px;pointer-events:auto;animation:slideInRight 0.3s ease-out;`;
    toast.innerHTML = `<span>${text}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.4s ease-out";
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Khởi tạo Modal DOM
  function createModalDOM() {
    if (document.getElementById("museum-media-modal-backdrop")) return;

    const modalHTML = `
      <div id="museum-media-modal-backdrop" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);z-index:99999;align-items:center;justify-content:center;font-family:'Be Vietnam Pro',sans-serif;box-sizing:border-box;">
        <div id="museum-media-modal" style="width:94vw;max-width:1080px;height:90vh;max-height:850px;background:linear-gradient(145deg, #0f172a 0%, #1e293b 100%);border:2px solid #d4af37;border-radius:20px;box-shadow:0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.3);display:flex;flex-direction:column;overflow:hidden;color:#f8fafc;">
          
          <!-- Header -->
          <div style="padding:18px 26px;border-bottom:1px solid rgba(212,175,55,0.3);background:linear-gradient(90deg, #1e1b18 0%, #2b1f14 100%);display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:14px;">
              <span style="font-size:30px;">📷</span>
              <div>
                <h2 style="margin:0;font-size:20px;font-weight:800;color:#fef08a;letter-spacing:0.5px;">QUẢN LÝ ĐA PHƯƠNG TIỆN & LƯU DỮ LIỆU BẢO TÀNG 3D</h2>
                <p style="margin:2px 0 0 0;font-size:12px;color:#cbd5e1;">Thêm / Đổi Ảnh Tranh 3D • Thay Video Rạp Phim Khổ Lớn • Lưu Dữ Liệu Vĩnh Viễn</p>
              </div>
            </div>
            <button id="btn-close-media-modal" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#ffffff;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
          </div>

          <!-- Navigation Tabs -->
          <div style="display:flex;background:#090d16;border-bottom:1px solid rgba(255,255,255,0.1);padding:0 20px;">
            <button class="mmm-tab-btn active" data-tab="tab-paintings" style="padding:14px 22px;background:none;border:none;border-bottom:3px solid #d4af37;color:#fef08a;font-weight:800;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;">
              <span>🖼️</span> <span>Quản Lý & Thêm Ảnh Tranh 3D (14 Tranh)</span>
            </button>
            <button class="mmm-tab-btn" data-tab="tab-video" style="padding:14px 22px;background:none;border:none;border-bottom:3px solid transparent;color:#94a3b8;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;">
              <span>🎬</span> <span>Quản Lý Video Rạp Chiếu Phim 3D</span>
            </button>
            <button class="mmm-tab-btn" data-tab="tab-persistence" style="padding:14px 22px;background:none;border:none;border-bottom:3px solid transparent;color:#94a3b8;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:8px;">
              <span>💾</span> <span>Lưu Dữ Liệu & Sao Lưu Hệ Thống</span>
            </button>
          </div>

          <!-- Tab Contents -->
          <div style="flex:1;overflow-y:auto;padding:22px 26px;position:relative;" id="mmm-tab-content-container">
            
            <!-- TAB 1: QUẢN LÝ TRANH 3D -->
            <div id="tab-paintings" class="mmm-tab-panel">
              <div style="display:grid;grid-template-columns:320px 1fr;gap:24px;height:100%;">
                
                <!-- Cột trái: Chọn Tranh theo Khu Vực -->
                <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:12px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;">
                    <label style="font-size:12px;font-weight:800;color:#94a3b8;text-transform:uppercase;">1. Chọn Khu Triển Lãm</label>
                    <span id="mmm-painting-badge" style="background:#b45309;color:#fff;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700;">14 Vị Trí</span>
                  </div>
                  
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
                    <button class="mmm-zone-filter active" data-zone="all" style="padding:8px 4px;font-size:11px;font-weight:700;background:#d4af37;color:#000;border:none;border-radius:8px;cursor:pointer;">Tất Cả (14)</button>
                    <button class="mmm-zone-filter" data-zone="1" style="padding:8px 4px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.06);color:#cbd5e1;border:none;border-radius:8px;cursor:pointer;">Khu 1 (6)</button>
                    <button class="mmm-zone-filter" data-zone="2" style="padding:8px 4px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.06);color:#cbd5e1;border:none;border-radius:8px;cursor:pointer;">Khu 2 (2)</button>
                    <button class="mmm-zone-filter" data-zone="3" style="padding:8px 4px;font-size:11px;font-weight:700;background:rgba(255,255,255,0.06);color:#cbd5e1;border:none;border-radius:8px;cursor:pointer;">Khu 3 (6)</button>
                  </div>

                  <label style="font-size:12px;font-weight:800;color:#94a3b8;text-transform:uppercase;margin-top:6px;">2. Danh Sách Khung Tranh 3D</label>
                  <div id="mmm-painting-list" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;max-height:450px;padding-right:4px;">
                    <!-- JS sẽ render danh sách tranh tại đây -->
                  </div>
                </div>

                <!-- Cột phải: Form Tải Ảnh & Chỉnh Sửa Nội Dung -->
                <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:16px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:10px;">
                    <div>
                      <h3 id="mmm-selected-title" style="margin:0;font-size:16px;color:#fef08a;font-weight:800;">Chưa chọn tranh</h3>
                      <p id="mmm-selected-loc" style="margin:2px 0 0 0;font-size:12px;color:#94a3b8;">Vui lòng chọn 1 vị trí tranh từ cột bên trái</p>
                    </div>
                    <span id="mmm-custom-indicator" style="display:none;background:#059669;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">Đã tùy biến ảnh</span>
                  </div>

                  <!-- Tải ảnh mới -->
                  <div style="display:grid;grid-template-columns:220px 1fr;gap:18px;">
                    <!-- Preview ảnh -->
                    <div style="display:flex;flex-direction:column;gap:8px;">
                      <label style="font-size:12px;font-weight:700;color:#cbd5e1;">Ảnh Trưng Bày Hiện Tại</label>
                      <div style="width:220px;height:140px;background:#000;border:1.5px solid #d4af37;border-radius:10px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;">
                        <img id="mmm-img-preview" src="" style="width:100%;height:100%;object-fit:cover;" alt="Xem trước">
                        <div id="mmm-img-loading" style="display:none;position:absolute;background:rgba(0,0,0,0.7);width:100%;height:100%;color:#fef08a;font-size:11px;display:flex;align-items:center;justify-content:center;">Đang tải...</div>
                      </div>
                    </div>

                    <!-- Chọn file tải lên & nhập link -->
                    <div style="display:flex;flex-direction:column;gap:12px;justify-content:center;">
                      <div>
                        <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">📤 Tải Ảnh Lên Từ Máy Tính (JPG, PNG, WEBP, GIF)</label>
                        <input type="file" id="mmm-file-input" accept="image/*" style="display:none;">
                        <button id="mmm-btn-choose-file" style="padding:8px 16px;background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%);border:1px solid #38bdf8;color:#fff;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                          <span>📁</span> <span>Chọn ảnh từ máy tính...</span>
                        </button>
                        <span id="mmm-file-name-label" style="margin-left:10px;font-size:11px;color:#94a3b8;">Chưa chọn tệp</span>
                      </div>

                      <div>
                        <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">🔗 Hoặc Nhập Đường Dẫn Ảnh Trực Tiếp (URL / Path)</label>
                        <input type="text" id="mmm-img-url-input" placeholder="Ví dụ: ./media/khu1/anh_moi.jpg hoặc https://..." style="width:100%;box-sizing:border-box;padding:8px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;">
                      </div>
                    </div>
                  </div>

                  <!-- Chỉnh sửa thông tin tranh -->
                  <div style="display:grid;grid-template-columns:3fr 1fr;gap:12px;">
                    <div>
                      <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:4px;">Tiêu Đề Tranh Lịch Sử</label>
                      <input type="text" id="mmm-title-input" placeholder="Nhập tên sự kiện / tư liệu..." style="width:100%;box-sizing:border-box;padding:8px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;font-weight:600;">
                    </div>
                    <div>
                      <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:4px;">Niên Đại (Năm)</label>
                      <input type="text" id="mmm-year-input" placeholder="VD: 1961–1963" style="width:100%;box-sizing:border-box;padding:8px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;">
                    </div>
                  </div>

                  <div>
                    <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:4px;">Nội Dung Thuyết Minh / Chú Thích Lịch Sử</label>
                    <textarea id="mmm-desc-input" rows="3" placeholder="Nhập diễn giải bối cảnh, ý nghĩa lịch sử của bức tranh..." style="width:100%;box-sizing:border-box;padding:8px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;resize:vertical;"></textarea>
                  </div>

                  <!-- Nút Áp dụng -->
                  <div style="display:flex;gap:12px;margin-top:auto;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);">
                    <button id="mmm-btn-apply-painting" style="flex:1;padding:12px 24px;background:linear-gradient(135deg, #d97706 0%, #b45309 100%);border:1.5px solid #f59e0b;color:#fff;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 0 15px rgba(245,158,11,0.3);">
                      <span>✨</span> <span>ÁP DỤNG VÀO TRANH 3D NGAY LẬP TỨC</span>
                    </button>
                    <button id="mmm-btn-reset-single-painting" style="padding:12px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;">
                      ↺ Tranh Gốc
                    </button>
                  </div>

                </div>

              </div>
            </div>

            <!-- TAB 2: QUẢN LÝ VIDEO RẠP PHIM 3D -->
            <div id="tab-video" class="mmm-tab-panel" style="display:none;">
              <div style="max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:20px;">
                
                <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:16px;">
                  <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px;">
                    <div>
                      <h3 style="margin:0;font-size:16px;color:#fef08a;font-weight:800;">MÀN HÌNH CHIẾU PHIM TƯ LIỆU RẠP PHIM KHỔNG LỒ (KHU 2)</h3>
                      <p style="margin:2px 0 0 0;font-size:12px;color:#94a3b8;">Kích thước hiển thị 11.2m × 4.9m trên Tường Đông rạp chiếu phim với âm thanh vòm</p>
                    </div>
                    <span style="background:#0284c7;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">Khu 2: Ấp Bắc</span>
                  </div>

                  <!-- Video Preview Player -->
                  <div style="background:#000;border:2px solid #d4af37;border-radius:12px;overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:16/9;max-height:300px;">
                    <video id="mmm-video-preview" controls playsinline style="width:100%;height:100%;object-fit:contain;background:#000;"></video>
                  </div>

                  <!-- Tải video từ máy tính -->
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;background:rgba(0,0,0,0.3);padding:16px;border-radius:10px;">
                    <div>
                      <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">📤 Tải Video Lên Từ Máy Tính (MP4, WEBM)</label>
                      <input type="file" id="mmm-video-file-input" accept="video/mp4,video/webm" style="display:none;">
                      <button id="mmm-btn-choose-video-file" style="padding:10px 18px;background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%);border:1px solid #38bdf8;color:#fff;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                        <span>🎬</span> <span>Chọn tệp video MP4...</span>
                      </button>
                      <div id="mmm-video-file-name" style="margin-top:6px;font-size:11px;color:#94a3b8;">Chưa chọn tệp video mới</div>
                    </div>

                    <div>
                      <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:6px;">🔗 Hoặc Nhập URL / File Video MP4</label>
                      <input type="text" id="mmm-video-url-input" placeholder="./media/ref1.mp4" style="width:100%;box-sizing:border-box;padding:10px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;">
                      <span style="font-size:11px;color:#64748b;margin-top:4px;display:block;">Gợi ý: ./media/ref1.mp4 hoặc ./media/doi-ap-bac/video/chienthang_apbac_1963.mp4</span>
                    </div>
                  </div>

                  <div>
                    <label style="font-size:12px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:4px;">Tiêu Đề Phim Chiếu Rạp</label>
                    <input type="text" id="mmm-video-title-input" placeholder="CHIẾN THẮNG ẤP BẮC (02/01/1963)" style="width:100%;box-sizing:border-box;padding:8px 12px;background:#090d16;border:1px solid #334155;border-radius:8px;color:#fff;font-size:12px;font-weight:700;">
                  </div>

                  <div style="display:flex;gap:12px;margin-top:8px;">
                    <button id="mmm-btn-apply-video" style="flex:1;padding:12px 24px;background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%);border:1.5px solid #38bdf8;color:#fff;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 0 15px rgba(56,189,248,0.3);">
                      <span>🎬</span> <span>ÁP DỤNG VIDEO LÊN MÀN CHIẾU 3D</span>
                    </button>
                    <button id="mmm-btn-reset-video" style="padding:12px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;">
                      ↺ Video Gốc
                    </button>
                  </div>

                </div>

              </div>
            </div>

            <!-- TAB 3: LƯU DỮ LIỆU & SAO LƯU HỆ THỐNG -->
            <div id="tab-persistence" class="mmm-tab-panel" style="display:none;">
              <div style="max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:20px;">
                
                <!-- Bảng trạng thái -->
                <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:16px;">
                  <h3 style="margin:0;font-size:16px;color:#fef08a;font-weight:800;">TRẠNG THÁI LƯU TRỮ VĨNH VIỄN (DATA PERSISTENCE)</h3>
                  
                  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;">
                    <div style="background:#090d16;padding:14px;border-radius:10px;border:1px solid #334155;">
                      <div style="font-size:11px;color:#94a3b8;font-weight:700;">TRANH TÙY BIẾN</div>
                      <div id="mmm-stat-paintings" style="font-size:22px;font-weight:900;color:#38bdf8;margin-top:4px;">0 / 14</div>
                      <div style="font-size:10px;color:#64748b;margin-top:2px;">Đã ghi nhớ trên trình duyệt</div>
                    </div>
                    <div style="background:#090d16;padding:14px;border-radius:10px;border:1px solid #334155;">
                      <div style="font-size:11px;color:#94a3b8;font-weight:700;">VIDEO RẠP PHIM</div>
                      <div id="mmm-stat-video" style="font-size:18px;font-weight:800;color:#34d399;margin-top:6px;">Mặc định</div>
                      <div style="font-size:10px;color:#64748b;margin-top:2px;">Rạp phim Ấp Bắc Khu 2</div>
                    </div>
                    <div style="background:#090d16;padding:14px;border-radius:10px;border:1px solid #334155;">
                      <div style="font-size:11px;color:#94a3b8;font-weight:700;">ĐỒNG BỘ MÁY CHỦ</div>
                      <div id="mmm-stat-server" style="font-size:18px;font-weight:800;color:#f59e0b;margin-top:6px;">Sẵn Sàng</div>
                      <div style="font-size:10px;color:#64748b;margin-top:2px;">/api/exhibits • SSE</div>
                    </div>
                  </div>

                  <!-- Nút Lưu vĩnh viễn -->
                  <div style="background:linear-gradient(135deg, rgba(180,83,9,0.2) 0%, rgba(30,41,59,0.5) 100%);border:1.5px solid #d4af37;border-radius:12px;padding:18px;display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
                    <div>
                      <h4 style="margin:0;font-size:15px;color:#fde047;font-weight:800;">💾 LƯU TOÀN BỘ THAY ĐỔI VÀO MÁY CHỦ & TRÌNH DUYỆT</h4>
                      <p style="margin:4px 0 0 0;font-size:12px;color:#cbd5e1;">Lưu tất cả ảnh, video, tiêu đề mới vào <code>museum-data.json</code> và <code>localStorage</code> để không bao giờ bị mất khi tải lại trang.</p>
                    </div>
                    <button id="mmm-btn-save-all-server" style="padding:14px 28px;background:linear-gradient(135deg, #16a34a 0%, #15803d 100%);border:1.5px solid #4ade80;color:#fff;border-radius:10px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;box-shadow:0 0 20px rgba(34,197,94,0.4);">
                      💾 LƯU DỮ LIỆU NGAY
                    </button>
                  </div>

                  <!-- Tùy chọn Sao lưu & Phục hồi JSON -->
                  <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;display:flex;flex-direction:column;gap:12px;">
                    <label style="font-size:12px;font-weight:800;color:#94a3b8;text-transform:uppercase;">Sao Lưu Dự Phòng (Backup & Restore)</label>
                    <div style="display:flex;gap:12px;">
                      <button id="mmm-btn-export-backup" style="flex:1;padding:12px 18px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
                        <span>📥</span> <span>Tải Tệp Sao Lưu (.json) Về Máy</span>
                      </button>
                      <input type="file" id="mmm-import-file-input" accept=".json" style="display:none;">
                      <button id="mmm-btn-import-backup" style="flex:1;padding:12px 18px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
                        <span>📤</span> <span>Phục Hồi Từ Tệp Sao Lưu (.json)</span>
                      </button>
                    </div>
                  </div>

                  <!-- Nút Khôi phục mặc định -->
                  <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;display:flex;align-items:center;justify-content:space-between;">
                    <div>
                      <div style="font-size:13px;font-weight:700;color:#ef4444;">Khôi Phục Cài Đặt Ban Đầu</div>
                      <div style="font-size:11px;color:#94a3b8;">Xóa bỏ mọi tùy biến và đưa tất cả 14 tranh cùng video về nguyên bản Đội Ấp Bắc</div>
                    </div>
                    <button id="mmm-btn-reset-all" style="padding:10px 18px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#fca5a5;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;">
                      ↺ Khôi Phục Mặc Định Đội Ấp Bắc
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    bindModalEvents();
  }

  // Khởi tạo nút nổi Floating Button trên màn hình 3D
  function createFloatingButton() {
    if (document.getElementById("museum-floating-media-btn")) return;

    const btn = document.createElement("button");
    btn.id = "museum-floating-media-btn";
    btn.title = "Thêm & Quản lý Ảnh, Video và Lưu Dữ Liệu Bảo Tàng";
    btn.style.cssText = `
      position: fixed;
      top: 64px;
      right: 18px;
      z-index: 40;
      background: linear-gradient(135deg, #b45309 0%, #78350f 100%);
      color: #fef08a;
      border: 1.5px solid #f59e0b;
      border-radius: 24px;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(245, 158, 11, 0.4);
      font-family: 'Be Vietnam Pro', sans-serif;
      transition: all 0.2s ease-in-out;
    `;
    btn.innerHTML = `<span>📷</span> <span>Thêm Ảnh/Video & Lưu</span>`;
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 6px 22px rgba(0, 0, 0, 0.8), 0 0 20px rgba(245, 158, 11, 0.6)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
      btn.style.boxShadow = "0 4px 18px rgba(0, 0, 0, 0.6), 0 0 12px rgba(245, 158, 11, 0.4)";
    });
    btn.addEventListener("click", () => {
      window.__openMediaManager();
    });

    document.body.appendChild(btn);
  }

  let selectedPaintingId = null;

  // Gắn sự kiện giao diện
  function bindModalEvents() {
    const backdrop = document.getElementById("museum-media-modal-backdrop");
    const closeBtn = document.getElementById("btn-close-media-modal");

    closeBtn.addEventListener("click", () => {
      backdrop.style.display = "none";
    });

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.style.display = "none";
    });

    // Chuyển Tab
    const tabBtns = document.querySelectorAll(".mmm-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => {
          b.classList.remove("active");
          b.style.borderBottomColor = "transparent";
          b.style.color = "#94a3b8";
        });
        btn.classList.add("active");
        btn.style.borderBottomColor = "#d4af37";
        btn.style.color = "#fef08a";

        const targetTab = btn.getAttribute("data-tab");
        document.querySelectorAll(".mmm-tab-panel").forEach(p => p.style.display = "none");
        const panel = document.getElementById(targetTab);
        if (panel) panel.style.display = "block";

        if (targetTab === "tab-persistence") {
          renderCurrentSettings();
        }
      });
    });

    // Lọc theo Khu Vực
    const zoneFilters = document.querySelectorAll(".mmm-zone-filter");
    zoneFilters.forEach(zf => {
      zf.addEventListener("click", () => {
        zoneFilters.forEach(f => {
          f.style.background = "rgba(255,255,255,0.06)";
          f.style.color = "#cbd5e1";
        });
        zf.style.background = "#d4af37";
        zf.style.color = "#000";

        const z = zf.getAttribute("data-zone");
        renderPaintingList(z);
      });
    });

    // Chọn ảnh từ máy tính
    const fileInput = document.getElementById("mmm-file-input");
    const chooseFileBtn = document.getElementById("mmm-btn-choose-file");
    const fileNameLabel = document.getElementById("mmm-file-name-label");
    const imgPreview = document.getElementById("mmm-img-preview");
    const imgUrlInput = document.getElementById("mmm-img-url-input");

    chooseFileBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      fileNameLabel.textContent = file.name;

      const loadingDiv = document.getElementById("mmm-img-loading");
      if (loadingDiv) loadingDiv.style.display = "flex";

      const uploadedUrl = await window.__uploadMediaFile(file);
      if (loadingDiv) loadingDiv.style.display = "none";

      if (uploadedUrl) {
        imgUrlInput.value = uploadedUrl;
        imgPreview.src = uploadedUrl;
        showToast("📷 Đã tải ảnh lên thành công!", "success");
      }
    });

    imgUrlInput.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val) imgPreview.src = val;
    });

    // Nút áp dụng tranh 3D
    const applyPaintingBtn = document.getElementById("mmm-btn-apply-painting");
    applyPaintingBtn.addEventListener("click", () => {
      if (!selectedPaintingId) {
        alert("Vui lòng chọn một bức tranh từ danh sách bên trái!");
        return;
      }

      const newTitle = document.getElementById("mmm-title-input").value.trim();
      const newYear = document.getElementById("mmm-year-input").value.trim();
      const newImg = document.getElementById("mmm-img-url-input").value.trim();
      const newDesc = document.getElementById("mmm-desc-input").value.trim();

      if (!newImg) {
        alert("Vui lòng tải ảnh lên hoặc nhập đường dẫn ảnh!");
        return;
      }

      const updateData = {
        title: newTitle || "Tranh tư liệu lịch sử",
        year: newYear || "1961–1965",
        imageUrl: newImg,
        description: newDesc
      };

      const success = window.__applyPaintingChange(selectedPaintingId, updateData, true);
      if (success) {
        showToast("✨ ĐÃ CẬP NHẬT TRANH 3D VÀ GHI NHỚ VÀO BỘ NHỚ!", "success");
        renderPaintingList();
        selectPainting(selectedPaintingId);
      }
    });

    // Nút khôi phục tranh đơn lẻ
    const resetSingleBtn = document.getElementById("mmm-btn-reset-single-painting");
    resetSingleBtn.addEventListener("click", () => {
      if (!selectedPaintingId) return;
      const defaultItem = DEFAULT_PAINTINGS.find(p => p.id === selectedPaintingId);
      if (defaultItem) {
        const saved = getStoredCustomPaintings();
        delete saved[selectedPaintingId];
        localStorage.setItem("museum_custom_paintings", JSON.stringify(saved));
        window.__applyPaintingChange(selectedPaintingId, defaultItem, false);
        showToast("↺ Đã đưa tranh về bản gốc Đội Ấp Bắc!", "info");
        selectPainting(selectedPaintingId);
        renderPaintingList();
      }
    });

    // TAB VIDEO: Tải video từ máy tính
    const videoFileInput = document.getElementById("mmm-video-file-input");
    const chooseVideoBtn = document.getElementById("mmm-btn-choose-video-file");
    const videoFileNameLabel = document.getElementById("mmm-video-file-name");
    const videoUrlInput = document.getElementById("mmm-video-url-input");
    const videoPreview = document.getElementById("mmm-video-preview");

    chooseVideoBtn.addEventListener("click", () => videoFileInput.click());

    videoFileInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      videoFileNameLabel.textContent = file.name;

      showToast("⏳ Đang tải video lên, vui lòng đợi...", "info");
      const videoUrl = await window.__uploadMediaFile(file);
      if (videoUrl) {
        videoUrlInput.value = videoUrl;
        videoPreview.src = videoUrl;
        videoPreview.load();
        showToast("🎬 Đã tải video lên thành công!", "success");
      }
    });

    videoUrlInput.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      if (val) {
        videoPreview.src = val;
        videoPreview.load();
      }
    });

    // Nút áp dụng video rạp chiếu phim
    const applyVideoBtn = document.getElementById("mmm-btn-apply-video");
    applyVideoBtn.addEventListener("click", () => {
      const vUrl = videoUrlInput.value.trim();
      const vTitle = document.getElementById("mmm-video-title-input").value.trim();
      if (!vUrl) {
        alert("Vui lòng tải tệp video hoặc nhập đường dẫn video MP4!");
        return;
      }

      window.__applyVideoChange(vUrl, vTitle, true);
      showToast("🎬 ĐÃ PHÁT VIDEO MỚI LÊN MÀN CHIẾU 3D KHỔ LỚN!", "success");
    });

    // Nút khôi phục video gốc
    const resetVideoBtn = document.getElementById("mmm-btn-reset-video");
    resetVideoBtn.addEventListener("click", () => {
      localStorage.removeItem("museum_custom_video");
      window.__applyVideoChange(DEFAULT_VIDEO.videoUrl, DEFAULT_VIDEO.title, false);
      videoUrlInput.value = DEFAULT_VIDEO.videoUrl;
      videoPreview.src = DEFAULT_VIDEO.videoUrl;
      document.getElementById("mmm-video-title-input").value = DEFAULT_VIDEO.title;
      showToast("↺ Đã khôi phục video tài liệu gốc Ấp Bắc!", "info");
    });

    // TAB LƯU DỮ LIỆU: Nút lưu máy chủ
    const saveAllBtn = document.getElementById("mmm-btn-save-all-server");
    saveAllBtn.addEventListener("click", async () => {
      saveAllBtn.disabled = true;
      saveAllBtn.innerHTML = `<span>⏳</span> <span>ĐANG LƯU DỮ LIỆU...</span>`;
      await window.__saveMuseumDataToServer();
      saveAllBtn.disabled = false;
      saveAllBtn.innerHTML = `<span>💾</span> <span>LƯU DỮ LIỆU NGAY</span>`;
      renderCurrentSettings();
    });

    // Export backup JSON
    const exportBtn = document.getElementById("mmm-btn-export-backup");
    exportBtn.addEventListener("click", () => window.__exportMuseumBackupJson());

    // Import backup JSON
    const importInput = document.getElementById("mmm-import-file-input");
    const importBtn = document.getElementById("mmm-btn-import-backup");
    importBtn.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) window.__importMuseumBackupJson(file);
    });

    // Reset toàn bộ
    const resetAllBtn = document.getElementById("mmm-btn-reset-all");
    resetAllBtn.addEventListener("click", () => window.__resetMuseumToDefault());
  }

  // Render danh sách tranh ở cột trái
  function renderPaintingList(zoneFilter = "all") {
    const container = document.getElementById("mmm-painting-list");
    if (!container) return;

    const customData = getStoredCustomPaintings();
    container.innerHTML = "";

    DEFAULT_PAINTINGS.forEach((item, index) => {
      if (zoneFilter !== "all" && item.zone.toString() !== zoneFilter.toString()) {
        return;
      }

      const isCustomized = !!customData[item.id];
      const currentMeta = (window.__MUSEUM_PAINTINGS_REGISTRY__[item.id] && window.__MUSEUM_PAINTINGS_REGISTRY__[item.id].meta) || customData[item.id] || item;

      const card = document.createElement("div");
      card.className = "mmm-painting-card";
      card.setAttribute("data-id", item.id);
      const isSelected = selectedPaintingId === item.id;

      card.style.cssText = `
        padding: 10px 12px;
        background: ${isSelected ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)"};
        border: 1.5px solid ${isSelected ? "#d4af37" : (isCustomized ? "#059669" : "rgba(255,255,255,0.1)")};
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        gap: 10px;
        align-items: center;
        transition: all 0.2s ease;
      `;

      card.innerHTML = `
        <img src="${currentMeta.imageUrl}" style="width:50px;height:36px;object-fit:cover;border-radius:4px;border:1px solid #334155;background:#000;">
        <div style="flex:1;min-width:0;">
          <div style="font-size:11px;font-weight:700;color:${isSelected ? '#fef08a' : '#fff'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${index + 1}. ${currentMeta.title}</div>
          <div style="font-size:10px;color:#94a3b8;margin-top:2px;">Khu ${item.zone} • ${currentMeta.year} ${isCustomized ? '<span style="color:#34d399;font-weight:700;">(Đã đổi ảnh)</span>' : ''}</div>
        </div>
      `;

      card.addEventListener("click", () => selectPainting(item.id));
      container.appendChild(card);
    });

    if (!selectedPaintingId && DEFAULT_PAINTINGS.length > 0) {
      selectPainting(DEFAULT_PAINTINGS[0].id);
    }
  }

  // Chọn 1 bức tranh để sửa
  function selectPainting(id) {
    selectedPaintingId = id;
    const customData = getStoredCustomPaintings();
    const defaultItem = DEFAULT_PAINTINGS.find(p => p.id === id);
    const registryItem = window.__MUSEUM_PAINTINGS_REGISTRY__[id];
    const currentMeta = (registryItem && registryItem.meta) || customData[id] || defaultItem;

    if (!currentMeta) return;

    // Highlight card
    document.querySelectorAll(".mmm-painting-card").forEach(c => {
      const cid = c.getAttribute("data-id");
      const isSel = cid === id;
      const isCust = !!customData[cid];
      c.style.background = isSel ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.03)";
      c.style.borderColor = isSel ? "#d4af37" : (isCust ? "#059669" : "rgba(255,255,255,0.1)");
    });

    // Cập nhật Form
    document.getElementById("mmm-selected-title").textContent = currentMeta.title;
    document.getElementById("mmm-selected-loc").textContent = `${defaultItem.zoneName} • ${defaultItem.location}`;
    document.getElementById("mmm-img-preview").src = currentMeta.imageUrl;
    document.getElementById("mmm-img-url-input").value = currentMeta.imageUrl;
    document.getElementById("mmm-title-input").value = currentMeta.title;
    document.getElementById("mmm-year-input").value = currentMeta.year;
    document.getElementById("mmm-desc-input").value = currentMeta.description || "";
    document.getElementById("mmm-file-name-label").textContent = "Chưa chọn tệp mới";

    const customBadge = document.getElementById("mmm-custom-indicator");
    if (customBadge) {
      customBadge.style.display = customData[id] ? "inline-block" : "none";
    }
  }

  // Hiển thị dashboard trạng thái trong Tab 3
  function renderCurrentSettings() {
    const customData = getStoredCustomPaintings();
    const customVideo = getStoredCustomVideo();

    const statPaintings = document.getElementById("mmm-stat-paintings");
    if (statPaintings) {
      const count = Object.keys(customData).length;
      statPaintings.textContent = `${count} / 14`;
      statPaintings.style.color = count > 0 ? "#34d399" : "#38bdf8";
    }

    const statVideo = document.getElementById("mmm-stat-video");
    if (statVideo) {
      if (customVideo && customVideo.videoUrl && customVideo.videoUrl !== DEFAULT_VIDEO.videoUrl) {
        statVideo.textContent = "Tùy Biến";
        statVideo.style.color = "#34d399";
      } else {
        statVideo.textContent = "Mặc Định";
        statVideo.style.color = "#94a3b8";
      }
    }
  }

  // Mở Modal Quản Lý Đa Phương Tiện
  window.__openMediaManager = function (initialTab = "tab-paintings", targetPaintingId = null) {
    createModalDOM();
    const backdrop = document.getElementById("museum-media-modal-backdrop");
    if (!backdrop) return;

    backdrop.style.display = "flex";

    // Kích hoạt tab yêu cầu
    const tabBtn = document.querySelector(`.mmm-tab-btn[data-tab="${initialTab}"]`);
    if (tabBtn) tabBtn.click();

    renderPaintingList();

    if (targetPaintingId) {
      selectPainting(targetPaintingId);
    }

    // Nạp video preview
    const videoPreview = document.getElementById("mmm-video-preview");
    const videoUrlInput = document.getElementById("mmm-video-url-input");
    const currentVideo = getStoredCustomVideo() || DEFAULT_VIDEO;
    if (videoPreview && currentVideo.videoUrl) {
      videoPreview.src = currentVideo.videoUrl;
      if (videoUrlInput) videoUrlInput.value = currentVideo.videoUrl;
      const vTitleInput = document.getElementById("mmm-video-title-input");
      if (vTitleInput) vTitleInput.value = currentVideo.title || DEFAULT_VIDEO.title;
    }
  };

  // Mở sửa ngay cho artifact khi người dùng đang xem trong popup chi tiết
  window.__openMediaManagerForArtifact = function (artifact) {
    if (!artifact) {
      window.__openMediaManager();
      return;
    }

    // Tìm painting tương ứng
    let matchedId = null;
    const artTitle = (artifact.title || "").toLowerCase();

    for (const p of DEFAULT_PAINTINGS) {
      if (artTitle.includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(artTitle)) {
        matchedId = p.id;
        break;
      }
    }

    if (!matchedId) {
      // Tìm theo từ khóa
      if (artTitle.includes("bình giã")) matchedId = "k3_art1";
      else if (artTitle.includes("an lão")) matchedId = "k3_art2";
      else if (artTitle.includes("ba gia")) matchedId = "k3_art3";
      else if (artTitle.includes("đồng xoài")) matchedId = "k3_art4";
      else if (artTitle.includes("tóc dài")) matchedId = "k3_art5";
      else if (artTitle.includes("trực thăng")) matchedId = "k1_art3";
      else if (artTitle.includes("thiết xa") || artTitle.includes("m113")) matchedId = "k1_art4";
      else if (artTitle.includes("cố vấn")) matchedId = "k1_art2";
      else if (artTitle.includes("ấp chiến lược")) matchedId = "k1_art5";
      else if (artTitle.includes("chiến thắng ấp bắc")) matchedId = "k2_art1";
    }

    window.__openMediaManager("tab-paintings", matchedId || "k1_art1");
  };

  // Khởi chạy khi DOM sẵn sàng
  function init() {
    createModalDOM();
    createFloatingButton();
    console.log("[MEDIA MANAGER] Hệ thống Quản Lý Đa Phương Tiện & Lưu Dữ Liệu Bảo Tàng 3D đã sẵn sàng!");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
