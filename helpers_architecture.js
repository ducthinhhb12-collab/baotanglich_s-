
// --- 0b. TRỢ THỦ SA BÀN 3D DỰ PHÒNG (TRÁNH REFERENCE ERROR) ---
function createDioramaApron(w = 5.4, d = 4.6, callbacks = {}) {
  try {
    const Hb = typeof KN === "function" ? KN(typeof e !== "undefined" && e && e.id ? e.id : "lesson-1") : null;
    if (Hb && typeof XN === "function") {
      const texLoader = typeof u !== "undefined" && u ? u.current : null;
      const xa = XN(Hb, texLoader);
      if (callbacks.onRegisterInteractive && xa && xa.interactiveMarkers) {
        xa.interactiveMarkers.forEach(Q => {
          callbacks.onRegisterInteractive(Q.mesh, `Mốc sự kiện: ${Q.marker.title} (${Q.marker.year})`, Q.marker);
        });
      }
      return xa ? xa.group : new It();
    }
  } catch (err) {
    console.warn("createDioramaApron fallback:", err);
  }
  return new It();
}

// =========================================================================
// HỆ THỐNG TRỢ THỦ KIẾN TRÚC BẢO TÀNG LỊCH SỬ QUỐC GIA CAO CẤP & HIỆN VẬT 3D
// =========================================================================

// --- 1. HÀM TẠO MÔ HÌNH HIỆN VẬT 3D THẬT SỰ (KHÔNG DÙNG ẢNH 2D PHẲNG) ---

// --- 0. TẠO HOA VĂN ĐÁ GRANITE ĐEN NÂU SANG TRỌNG CHO BẢO TÀNG LỊCH SỬ ---
// --- 0. TẠO HOA VĂN ĐÁ MARBLE GREIGE SÁNG CHO BẢO TÀNG LỊCH SỬ CAO CẤP (#D7D0C4) ---
function createGreigeMarbleFloorTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024; canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Pe(canvas);

  // Sàn đá marble màu greige sáng (#D7D0C4)
  ctx.fillStyle = "#D7D0C4";
  ctx.fillRect(0, 0, 1024, 1024);

  // Các tấm đá marble lớn với sắc thái greige kem tự nhiên
  const tileSize = 256;
  const shades = ["#D9D2C6", "#D5CEC2", "#D8D1C5", "#D3CCC0"];
  for (let y = 0; y < 1024; y += tileSize) {
    for (let x = 0; x < 1024; x += tileSize) {
      const idx = ((x / tileSize) * 3 + (y / tileSize) * 5) % shades.length;
      ctx.fillStyle = shades[idx];
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

      // Hạt khoáng thạch marble tự nhiên li ti
      ctx.fillStyle = "rgba(255, 250, 240, 0.45)";
      for (let k = 0; k < 12; k++) {
        const sx = x + (k * 37 + 13) % (tileSize - 10);
        const sy = y + (k * 43 + 17) % (tileSize - 10);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Vân đá marble mềm mại màu kem trắng và champagne nhẹ
      ctx.strokeStyle = "rgba(255, 252, 245, 0.55)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(x + 15, y + 30);
      ctx.bezierCurveTo(x + 75, y + 125, x + 165, y + 85, x + 240, y + 215);
      ctx.stroke();

      ctx.strokeStyle = "rgba(198, 165, 107, 0.22)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(x + 30, y + 10);
      ctx.bezierCurveTo(x + 110, y + 70, x + 150, y + 160, x + 225, y + 240);
      ctx.stroke();

      // Ron chỉ đá màu be xám ấm nhẹ nhàng
      ctx.strokeStyle = "rgba(180, 168, 150, 0.40)";
      ctx.lineWidth = 2.0;
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  const tex = new Pe(canvas);
  tex.wrapS = 1000;
  tex.wrapT = 1000;
  return tex;
}
function createGraniteMuseumFloorTexture() {
  return createGreigeMarbleFloorTexture();
}
function createArtifact3DModel(artifact = {}, modelType = "") {
  const g = new It();
  g.userData.is3DArtifact = true;

  // Xác định loại hiện vật tự động
  let type = (modelType || "").toLowerCase();
  const id = (artifact.id || "").toLowerCase();
  const title = (artifact.title || "").toLowerCase();
  const cat = (artifact.category || "").toLowerCase();

  if (!type) {
    if (id.includes("tructhang") || title.includes("trực thăng") || title.includes("ch-21") || title.includes("uh-1")) type = "helicopter";
    else if (id.includes("thietxavan") || title.includes("thiết xa") || title.includes("m113")) type = "m113";
    else if (id.includes("m48") || id.includes("tank") || title.includes("xe tăng") || title.includes("patton") || title.includes("t-54")) type = "tank";
    else if (id.includes("ap-chien-luoc") || title.includes("ấp chiến lược") || title.includes("sa bàn")) type = "ap_chien_luoc";
    else if (id.includes("hom-dan") || id.includes("can-canh-dan") || title.includes("hòm đạn") || title.includes("đạn")) type = "hom_dan";
    else if (id.includes("sung-coi") || title.includes("súng cối") || title.includes("đạn pháo")) type = "sung_coi";
    else if (id.includes("thep-gai") || title.includes("thép gai") || title.includes("rào")) type = "thep_gai";
    else if (id.includes("ak") || title.includes("tiểu liên") || title.includes("súng ak")) type = "ak47";
    else if (id.includes("thong-tin") || title.includes("vô tuyến") || title.includes("radio")) type = "radio";
    else if (id.includes("dien-thoai") || title.includes("điện thoại")) type = "dien_thoai";
    else if (id.includes("mu-tai-beo") || id.includes("mu-coi") || title.includes("mũ") || title.includes("khăn rằn")) type = "mu_coi";
    else if (id.includes("balo") || id.includes("bidong") || title.includes("ba lô") || title.includes("ca mèn")) type = "balo_bidong";
    else if (id.includes("trang-phuc") || title.includes("bà ba") || title.includes("quân phục")) type = "trang_phuc";
    else if (id.includes("loa") || title.includes("loa") || title.includes("truyền đơn")) type = "loa";
    else if (id.includes("hien-luong") || title.includes("hiền lương") || title.includes("vĩ tuyến 17") || id.includes("cau")) type = "cau_hien_luong";
    else if (id.includes("hien-vat-kc") || title.includes("kỷ vật")) type = "hien_vat_kc";
    else type = "generic_dossier";
  }

  // Bảng vật liệu cao cấp chuẩn PBR (Kim loại quân sự, gỗ óc chó, da, vải bạt, cao su, đồng)
  const oliveMetal = new X({ color: "#3f4c32", roughness: 0.42, metalness: 0.45 });
  const darkOlive = new X({ color: "#28331f", roughness: 0.52, metalness: 0.35 });
  const steelMetal = new X({ color: "#25282f", roughness: 0.28, metalness: 0.85 });
  const darkGunMetal = new X({ color: "#16181d", roughness: 0.35, metalness: 0.90 });
  const brassMetal = new X({ color: "#d4af37", roughness: 0.18, metalness: 0.95 });
  const polishedCopper = new X({ color: "#c87d4a", roughness: 0.22, metalness: 0.92 });
  const walnutWood = new X({ color: "#342013", roughness: 0.42, metalness: 0.05 });
  const lightWood = new X({ color: "#7c5a3b", roughness: 0.48, metalness: 0.02 });
  const oliveCanvas = new X({ color: "#475438", roughness: 0.78, metalness: 0.02 });
  const leatherBrown = new X({ color: "#452715", roughness: 0.45, metalness: 0.08 });
  const rubberBlack = new X({ color: "#161618", roughness: 0.88, metalness: 0.05 });
  const glassMat = new X({ color: "#a5f3fc", transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.12 });
  const redEnamel = new X({ color: "#991b1b", roughness: 0.2, metalness: 0.35 });

  // 1. TRỰC THĂNG CH-21 SHAWNEE ("Quả chuối bay")
  if (type === "helicopter") {
    const heli = new It();
    const fwdBody = new I(new Z(0.24, 0.20, 0.32), oliveMetal);
    fwdBody.position.set(0, 0.22, 0.12);
    heli.add(fwdBody);

    const aftBody = new I(new Z(0.20, 0.18, 0.36), oliveMetal);
    aftBody.position.set(0, 0.27, -0.18);
    aftBody.rotation.x = 0.22;
    heli.add(aftBody);

    const nose = new I(new sr(0.11, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), glassMat);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.21, 0.28);
    heli.add(nose);

    // Cánh quạt trước
    const fRotorMast = new I(new Rt(0.015, 0.02, 0.08, 12), steelMetal);
    fRotorMast.position.set(0, 0.35, 0.18);
    heli.add(fRotorMast);

    const fRotorHead = new It();
    fRotorHead.position.set(0, 0.39, 0.18);
    for (let b = 0; b < 3; b++) {
      const blade = new I(new Z(0.04, 0.005, 0.44), steelMetal);
      blade.position.set(0, 0, 0.21);
      const bGroup = new It();
      bGroup.rotation.y = (b * Math.PI * 2) / 3;
      bGroup.add(blade);
      fRotorHead.add(bGroup);
    }
    heli.add(fRotorHead);

    // Cánh quạt sau trên trụ đứng
    const rPylon = new I(new Z(0.06, 0.18, 0.12), darkOlive);
    rPylon.position.set(0, 0.42, -0.34);
    heli.add(rPylon);

    const rRotorHead = new It();
    rRotorHead.position.set(0, 0.52, -0.34);
    for (let b = 0; b < 3; b++) {
      const blade = new I(new Z(0.04, 0.005, 0.44), steelMetal);
      blade.position.set(0, 0, 0.21);
      const bGroup = new It();
      bGroup.rotation.y = (b * Math.PI * 2) / 3 + 0.3;
      bGroup.add(blade);
      rRotorHead.add(bGroup);
    }
    heli.add(rRotorHead);

    // Càng đáp 3 bánh cao
    const legF = new I(new Rt(0.008, 0.008, 0.15, 8), steelMetal);
    legF.position.set(0, 0.08, 0.20);
    heli.add(legF);
    const wheelF = new I(new Rt(0.03, 0.03, 0.02, 12), rubberBlack);
    wheelF.rotation.z = Math.PI / 2;
    wheelF.position.set(0, 0.03, 0.20);
    heli.add(wheelF);

    [-0.14, 0.14].forEach(xOff => {
      const legR = new I(new Rt(0.008, 0.008, 0.22, 8), steelMetal);
      legR.position.set(xOff * 0.7, 0.11, -0.12);
      legR.rotation.z = xOff > 0 ? -0.35 : 0.35;
      heli.add(legR);
      const wheelR = new I(new Rt(0.04, 0.04, 0.025, 12), rubberBlack);
      wheelR.rotation.z = Math.PI / 2;
      wheelR.position.set(xOff, 0.04, -0.12);
      heli.add(wheelR);
    });

    // Decal chữ ARMY
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 128; starCanvas.height = 64;
    const sctx = starCanvas.getContext("2d");
    if (sctx) {
      sctx.fillStyle = "#3f4c32"; sctx.fillRect(0, 0, 128, 64);
      sctx.fillStyle = "#f8fafc"; sctx.font = "bold 26px sans-serif"; sctx.textAlign = "center";
      sctx.fillText("ARMY", 64, 44);
    }
    const starTex = new Pe(starCanvas);
    const starPlane = new I(new Yt(0.12, 0.06), new Se({ map: starTex, side: Xe }));
    starPlane.position.set(0.122, 0.22, 0.08);
    starPlane.rotation.y = Math.PI / 2;
    heli.add(starPlane);

    heli.scale.set(1.15, 1.15, 1.15);
    g.add(heli);
  }

  // 2. XE BỌC THÉP M113 (Thiết xa vận)
  else if (type === "m113") {
    const apc = new It();
    const mainHull = new I(new Z(0.32, 0.18, 0.50), oliveMetal);
    mainHull.position.set(0, 0.18, 0);
    apc.add(mainHull);

    const frontSlope = new I(new Z(0.318, 0.16, 0.16), oliveMetal);
    frontSlope.position.set(0, 0.20, 0.26);
    frontSlope.rotation.x = -Math.PI / 4;
    apc.add(frontSlope);

    const trimVane = new I(new Z(0.30, 0.08, 0.015), darkOlive);
    trimVane.position.set(0, 0.19, 0.32);
    trimVane.rotation.x = -Math.PI / 4;
    apc.add(trimVane);

    const cupola = new I(new Rt(0.06, 0.065, 0.04, 16), steelMetal);
    cupola.position.set(-0.04, 0.29, 0.02);
    apc.add(cupola);

    // Súng 12.7mm M2 Browning có tấm chắn đạn
    const m2Group = new It();
    m2Group.position.set(-0.04, 0.33, 0.02);
    const shield = new I(new Z(0.10, 0.08, 0.008), darkOlive);
    shield.position.set(0, 0.04, 0.05);
    m2Group.add(shield);
    const gunBody = new I(new Z(0.03, 0.035, 0.12), darkGunMetal);
    gunBody.position.set(0, 0.04, 0);
    m2Group.add(gunBody);
    const barrel = new I(new Rt(0.006, 0.006, 0.18, 12), darkGunMetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.045, 0.14);
    m2Group.add(barrel);
    const ammoBox = new I(new Z(0.04, 0.035, 0.025), oliveMetal);
    ammoBox.position.set(-0.03, 0.04, 0.01);
    m2Group.add(ammoBox);
    apc.add(m2Group);

    // Bánh xích & 5 cặp bánh chịu lực mỗi bên
    [-0.17, 0.17].forEach(sideX => {
      const trackBand = new I(new Z(0.04, 0.11, 0.52), rubberBlack);
      trackBand.position.set(sideX, 0.06, 0);
      apc.add(trackBand);

      for (let w = -2; w <= 2; w++) {
        const wheel = new I(new Rt(0.045, 0.045, 0.035, 16), steelMetal);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(sideX, 0.055, w * 0.11);
        apc.add(wheel);
        const hub = new I(new Rt(0.015, 0.015, 0.04, 12), oliveMetal);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(sideX, 0.055, w * 0.11);
        apc.add(hub);
      }
    });

    // Decal Ngôi Sao Trắng
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 128; starCanvas.height = 128;
    const stx = starCanvas.getContext("2d");
    if (stx) {
      stx.fillStyle = "#3f4c32"; stx.fillRect(0, 0, 128, 128);
      stx.fillStyle = "#ffffff"; stx.font = "bold 64px sans-serif"; stx.textAlign = "center";
      stx.fillText("★", 64, 88);
    }
    const starTex = new Pe(starCanvas);
    const starPlane = new I(new Yt(0.09, 0.09), new Se({ map: starTex, side: Xe }));
    starPlane.position.set(0.162, 0.18, 0);
    starPlane.rotation.y = Math.PI / 2;
    apc.add(starPlane);

    apc.scale.set(1.2, 1.2, 1.2);
    g.add(apc);
  }

  // 3. XE TĂNG T-54B (#843) / M48 PATTON
  else if (type === "tank") {
    const tank = new It();
    const hull = new I(new Z(0.36, 0.12, 0.58), oliveMetal);
    hull.position.set(0, 0.13, 0);
    tank.add(hull);

    const glacis = new I(new Z(0.358, 0.12, 0.16), oliveMetal);
    glacis.position.set(0, 0.15, 0.28);
    glacis.rotation.x = -Math.PI / 3.5;
    tank.add(glacis);

    [-0.19, 0.19].forEach(sideX => {
      const fender = new I(new Z(0.06, 0.02, 0.62), darkOlive);
      fender.position.set(sideX, 0.16, 0);
      tank.add(fender);
      const box1 = new I(new Z(0.04, 0.035, 0.10), steelMetal);
      box1.position.set(sideX, 0.18, 0.05);
      tank.add(box1);
    });

    // Tháp pháo hình vòm bo tròn đặc trưng T-54
    const turretDome = new I(new sr(0.14, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), oliveMetal);
    turretDome.position.set(0, 0.19, 0.02);
    tank.add(turretDome);

    const turretRing = new I(new Rt(0.14, 0.145, 0.03, 20), darkOlive);
    turretRing.position.set(0, 0.195, 0.02);
    tank.add(turretRing);

    // Nòng pháo 100mm dài có ống bọc thải khói
    const gunMantlet = new I(new Z(0.09, 0.06, 0.06), steelMetal);
    gunMantlet.position.set(0, 0.23, 0.16);
    tank.add(gunMantlet);

    const barrel = new I(new Rt(0.012, 0.015, 0.44, 16), steelMetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.23, 0.38);
    tank.add(barrel);

    const evacuator = new I(new Rt(0.019, 0.019, 0.07, 16), darkOlive);
    evacuator.rotation.x = Math.PI / 2;
    evacuator.position.set(0, 0.23, 0.45);
    tank.add(evacuator);

    const muzzle = new I(new Rt(0.016, 0.016, 0.03, 16), steelMetal);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, 0.23, 0.60);
    tank.add(muzzle);

    // Cửa nắp tháp pháo & súng phòng không 12.7mm
    const cupola = new I(new Rt(0.045, 0.045, 0.025, 14), darkOlive);
    cupola.position.set(-0.06, 0.29, -0.02);
    tank.add(cupola);

    const aaGun = new I(new Z(0.02, 0.025, 0.14), darkGunMetal);
    aaGun.position.set(-0.06, 0.32, -0.01);
    tank.add(aaGun);

    // Thùng nhiên liệu phụ phía sau đuôi
    [-0.08, 0.08].forEach(xOff => {
      const drum = new I(new Rt(0.04, 0.04, 0.12, 14), darkOlive);
      drum.rotation.z = Math.PI / 2;
      drum.position.set(xOff, 0.18, -0.32);
      tank.add(drum);
    });

    // 5 Bánh chịu lực mỗi bên + xích
    [-0.19, 0.19].forEach(sideX => {
      const track = new I(new Z(0.05, 0.09, 0.60), rubberBlack);
      track.position.set(sideX, 0.055, 0);
      tank.add(track);

      for (let w = -2; w <= 2; w++) {
        const wheel = new I(new Rt(0.042, 0.042, 0.04, 16), steelMetal);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(sideX, 0.055, w * 0.13);
        tank.add(wheel);
        const rim = new I(new Rt(0.02, 0.02, 0.045, 12), oliveMetal);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(sideX, 0.055, w * 0.13);
        tank.add(rim);
      }
    });

    // Decal Số Hiệu "843"
    const numCanvas = document.createElement("canvas");
    numCanvas.width = 128; numCanvas.height = 64;
    const nctx = numCanvas.getContext("2d");
    if (nctx) {
      nctx.fillStyle = "#3f4c32"; nctx.fillRect(0, 0, 128, 64);
      nctx.fillStyle = "#fef08a"; nctx.font = "bold 44px sans-serif"; nctx.textAlign = "center";
      nctx.fillText("843", 64, 46);
    }
    const numTex = new Pe(numCanvas);
    const numPlane = new I(new Yt(0.10, 0.05), new Se({ map: numTex, side: Xe }));
    numPlane.position.set(0.142, 0.22, 0.02);
    numPlane.rotation.y = Math.PI / 2;
    tank.add(numPlane);

    tank.scale.set(1.15, 1.15, 1.15);
    g.add(tank);
  }

  // 4. SA BÀN ẤP CHIẾN LƯỢC THU NHỎ
  else if (type === "ap_chien_luoc") {
    const dio = new It();
    const terrain = new I(new Rt(0.36, 0.38, 0.04, 24), new X({ color: "#544632", roughness: 0.9 }));
    terrain.position.y = 0.02;
    dio.add(terrain);

    // Chòi gác canh mái lá
    const towerGroup = new It();
    towerGroup.position.set(-0.12, 0.04, -0.08);
    [[-0.04,-0.04], [0.04,-0.04], [-0.04,0.04], [0.04,0.04]].forEach(([lx, lz]) => {
      const leg = new I(new Rt(0.005, 0.006, 0.28, 8), lightWood);
      leg.position.set(lx, 0.14, lz);
      towerGroup.add(leg);
    });
    const plat = new I(new Z(0.11, 0.012, 0.11), walnutWood);
    plat.position.set(0, 0.28, 0);
    towerGroup.add(plat);
    const roof = new I(new cr(0.09, 0.07, 4), new X({ color: "#85653b", roughness: 0.95 }));
    roof.position.set(0, 0.36, 0);
    roof.rotation.y = Math.PI / 4;
    towerGroup.add(roof);
    dio.add(towerGroup);

    // Hàng rào kẽm gai co-axial
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      const rx = Math.cos(angle) * 0.28;
      const rz = Math.sin(angle) * 0.28;
      const stake = new I(new Rt(0.005, 0.005, 0.09, 6), lightWood);
      stake.position.set(rx, 0.065, rz);
      dio.add(stake);
      const coil = new I(new Mm(0.035, 0.004, 8, 16), steelMetal);
      coil.position.set(rx, 0.06, rz);
      dio.add(coil);
    }

    // Cổng làng kiên cố
    const gatePostL = new I(new Rt(0.01, 0.01, 0.14, 8), walnutWood);
    gatePostL.position.set(-0.06, 0.09, 0.28);
    dio.add(gatePostL);
    const gatePostR = new I(new Rt(0.01, 0.01, 0.14, 8), walnutWood);
    gatePostR.position.set(0.06, 0.09, 0.28);
    dio.add(gatePostR);
    const gateBeam = new I(new Rt(0.008, 0.008, 0.15, 8), walnutWood);
    gateBeam.rotation.z = Math.PI / 2;
    gateBeam.position.set(0, 0.15, 0.28);
    dio.add(gateBeam);

    dio.scale.set(1.1, 1.1, 1.1);
    g.add(dio);
  }

  // 5. HÒM ĐẠN QUÂN DỤNG & VỎ ĐẠN ĐỒNG
  else if (type === "hom_dan") {
    const ammoGroup = new It();
    const crate = new I(new Z(0.34, 0.18, 0.22), oliveCanvas);
    crate.position.set(-0.04, 0.09, 0);
    ammoGroup.add(crate);

    [[-0.21, -0.04], [0.13, -0.04], [-0.21, 0.04], [0.13, 0.04]].forEach(([bx, bz]) => {
      const brace = new I(new Z(0.02, 0.182, 0.02), steelMetal);
      brace.position.set(bx, 0.09, bz);
      ammoGroup.add(brace);
    });

    const stCanvas = document.createElement("canvas");
    stCanvas.width = 256; stCanvas.height = 128;
    const stx = stCanvas.getContext("2d");
    if (stx) {
      stx.fillStyle = "#3d4732"; stx.fillRect(0, 0, 256, 128);
      stx.fillStyle = "#fef08a"; stx.font = "bold 28px sans-serif"; stx.textAlign = "center";
      stx.fillText("7.62 x 39mm", 128, 50);
      stx.font = "18px sans-serif";
      stx.fillText("LOT 63-B / AP BAC", 128, 90);
    }
    const stTex = new Pe(stCanvas);
    const stPlane = new I(new Yt(0.24, 0.12), new Se({ map: stTex, side: Xe }));
    stPlane.position.set(-0.04, 0.09, 0.112);
    ammoGroup.add(stPlane);

    // Các vỏ đạn đồng vàng đứng cạnh hòm
    const shellPositions = [[0.17, 0.06], [0.15, -0.03], [0.19, -0.06], [0.22, 0.02]];
    shellPositions.forEach(([sx, sz]) => {
      const shell = new I(new Rt(0.016, 0.019, 0.16, 16), brassMetal);
      shell.position.set(sx, 0.08, sz);
      ammoGroup.add(shell);
      const tip = new I(new cr(0.015, 0.04, 16), polishedCopper);
      tip.position.set(sx, 0.18, sz);
      ammoGroup.add(tip);
    });

    ammoGroup.scale.set(1.15, 1.15, 1.15);
    g.add(ammoGroup);
  }

  // 6. SÚNG CỐI & ĐẠN PHÁO
  else if (type === "sung_coi") {
    const mortar = new It();
    const plate = new I(new Rt(0.18, 0.19, 0.025, 20), steelMetal);
    plate.position.set(0, 0.015, -0.08);
    mortar.add(plate);

    const barrelGroup = new It();
    barrelGroup.position.set(0, 0.03, -0.08);
    barrelGroup.rotation.x = Math.PI / 3;

    const tube = new I(new Rt(0.032, 0.036, 0.48, 16), steelMetal);
    tube.position.set(0, 0.24, 0);
    barrelGroup.add(tube);

    const collar = new I(new Rt(0.038, 0.038, 0.03, 16), darkGunMetal);
    collar.position.set(0, 0.46, 0);
    barrelGroup.add(collar);
    mortar.add(barrelGroup);

    [-0.09, 0.09].forEach(bx => {
      const bLeg = new I(new Rt(0.007, 0.007, 0.32, 8), darkOlive);
      bLeg.position.set(bx, 0.16, 0.04);
      bLeg.rotation.x = -0.32;
      bLeg.rotation.z = bx > 0 ? -0.22 : 0.22;
      mortar.add(bLeg);
    });

    [-0.14, 0.14].forEach((mx) => {
      const bomb = new It();
      bomb.position.set(mx, 0.05, 0.14);
      bomb.rotation.z = Math.PI / 2;
      const bBody = new I(new sr(0.032, 14, 10), oliveMetal);
      bBody.scale.set(1, 2.2, 1);
      bomb.add(bBody);
      const bTail = new I(new Rt(0.012, 0.012, 0.08, 12), steelMetal);
      bTail.position.y = -0.08;
      bomb.add(bTail);
      mortar.add(bomb);
    });

    mortar.scale.set(1.15, 1.15, 1.15);
    g.add(mortar);
  }

  // 7. DÂY THÉP GAI & CHÔNG TRE
  else if (type === "thep_gai") {
    const fence = new It();
    [-0.16, 0.16].forEach(xOff => {
      const post1 = new I(new Rt(0.012, 0.012, 0.36, 8), walnutWood);
      post1.position.set(xOff, 0.18, 0);
      post1.rotation.z = 0.38;
      fence.add(post1);

      const post2 = new I(new Rt(0.012, 0.012, 0.36, 8), walnutWood);
      post2.position.set(xOff, 0.18, 0);
      post2.rotation.z = -0.38;
      fence.add(post2);
    });

    const rail = new I(new Rt(0.01, 0.01, 0.38, 8), walnutWood);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, 0.18, 0);
    fence.add(rail);

    for (let c = -3; c <= 3; c++) {
      const coil = new I(new Mm(0.08, 0.005, 8, 24), steelMetal);
      coil.position.set(c * 0.055, 0.18, 0);
      coil.rotation.y = Math.PI / 2;
      fence.add(coil);
    }

    for (let p = 0; p < 6; p++) {
      const stake = new I(new cr(0.008, 0.12, 6), lightWood);
      stake.position.set(-0.15 + p * 0.06, 0.06, 0.12);
      stake.rotation.x = 0.25;
      fence.add(stake);
    }

    fence.scale.set(1.15, 1.15, 1.15);
    g.add(fence);
  }

  // 8. SÚNG TIỂU LIÊN AK-47
  else if (type === "ak47") {
    const ak = new It();
    [-0.14, 0.14].forEach(px => {
      const stand = new I(new Z(0.04, 0.12, 0.08), walnutWood);
      stand.position.set(px, 0.06, 0);
      ak.add(stand);
      const cradle = new I(new Z(0.042, 0.02, 0.06), brassMetal);
      cradle.position.set(px, 0.125, 0);
      ak.add(cradle);
    });

    const gun = new It();
    gun.position.set(0, 0.14, 0);

    const rec = new I(new Z(0.24, 0.05, 0.035), darkGunMetal);
    gun.add(rec);

    const stock = new I(new Z(0.18, 0.07, 0.032), walnutWood);
    stock.position.set(-0.20, -0.015, 0);
    stock.rotation.z = 0.12;
    gun.add(stock);

    const grip = new I(new Z(0.03, 0.07, 0.025), walnutWood);
    grip.position.set(-0.06, -0.05, 0);
    grip.rotation.z = -0.35;
    gun.add(grip);

    const mag = new I(new Mm(0.12, 0.018, 8, 16, Math.PI / 2.5), steelMetal);
    mag.position.set(0.06, -0.11, 0);
    mag.rotation.z = Math.PI * 0.9;
    gun.add(mag);

    const handguard = new I(new Z(0.14, 0.045, 0.036), walnutWood);
    handguard.position.set(0.17, 0.005, 0);
    gun.add(handguard);

    const barrel = new I(new Rt(0.008, 0.008, 0.26, 12), darkGunMetal);
    barrel.rotation.z = -Math.PI / 2;
    barrel.position.set(0.36, 0, 0);
    gun.add(barrel);

    const gasTube = new I(new Rt(0.007, 0.007, 0.18, 12), darkGunMetal);
    gasTube.rotation.z = -Math.PI / 2;
    gasTube.position.set(0.28, 0.025, 0);
    gun.add(gasTube);

    const fSight = new I(new Z(0.01, 0.035, 0.015), darkGunMetal);
    fSight.position.set(0.46, 0.025, 0);
    gun.add(fSight);

    ak.add(gun);
    ak.scale.set(1.15, 1.15, 1.15);
    g.add(ak);
  }

  // 9. MÁY THÔNG TIN VÔ TUYẾN QUÂN SỰ PRC-25
  else if (type === "radio") {
    const radio = new It();
    const caseMesh = new I(new Z(0.20, 0.36, 0.14), oliveMetal);
    caseMesh.position.set(0, 0.18, 0);
    radio.add(caseMesh);

    [-0.105, 0.105].forEach(rx => {
      const rib = new I(new Z(0.015, 0.362, 0.04), steelMetal);
      rib.position.set(rx, 0.18, 0);
      radio.add(rib);
    });

    const antBase = new I(new Mm(0.018, 0.005, 8, 16), steelMetal);
    antBase.position.set(0.06, 0.37, 0);
    radio.add(antBase);
    const antenna = new I(new Rt(0.004, 0.002, 0.55, 8), steelMetal);
    antenna.position.set(0.06, 0.65, 0);
    radio.add(antenna);

    for (let k = -1; k <= 1; k++) {
      const knob = new I(new Rt(0.016, 0.016, 0.018, 12), steelMetal);
      knob.position.set(k * 0.05, 0.37, 0.02);
      radio.add(knob);
    }

    const handset = new It();
    handset.position.set(-0.13, 0.20, 0);
    const hBar = new I(new Z(0.025, 0.18, 0.035), rubberBlack);
    handset.add(hBar);
    const hEar = new I(new Rt(0.03, 0.025, 0.04, 12), rubberBlack);
    hEar.position.set(0, 0.08, 0);
    handset.add(hEar);
    const hMic = new I(new Rt(0.025, 0.03, 0.04, 12), rubberBlack);
    hMic.position.set(0, -0.08, 0);
    handset.add(hMic);
    radio.add(handset);

    const dpCanvas = document.createElement("canvas");
    dpCanvas.width = 128; dpCanvas.height = 64;
    const dpctx = dpCanvas.getContext("2d");
    if (dpctx) {
      dpctx.fillStyle = "#1e1b14"; dpctx.fillRect(0, 0, 128, 64);
      dpctx.strokeStyle = "#d4af37"; dpctx.lineWidth = 4; dpctx.strokeRect(4, 4, 120, 56);
      dpctx.fillStyle = "#fde68a"; dpctx.font = "bold 16px sans-serif"; dpctx.textAlign = "center";
      dpctx.fillText("RADIO PRC-25", 64, 28);
      dpctx.font = "12px sans-serif"; dpctx.fillText("MIL-STD SIGNAL", 64, 48);
    }
    const dpTex = new Pe(dpCanvas);
    const dpPlane = new I(new Yt(0.12, 0.06), new Se({ map: dpTex, side: Xe }));
    dpPlane.position.set(0, 0.12, 0.072);
    radio.add(dpPlane);

    radio.scale.set(1.15, 1.15, 1.15);
    g.add(radio);
  }

  // 10. ĐIỆN THOẠI HỮU TUYẾN DÃ CHIẾN
  else if (type === "dien_thoai") {
    const phone = new It();
    const body = new I(new Z(0.24, 0.18, 0.18), oliveCanvas);
    body.position.set(0, 0.09, 0);
    phone.add(body);

    [[-0.12,-0.09], [0.12,-0.09], [-0.12,0.09], [0.12,0.09]].forEach(([cx, cz]) => {
      const corner = new I(new Z(0.02, 0.182, 0.02), brassMetal);
      corner.position.set(cx, 0.09, cz);
      phone.add(corner);
    });

    const hs = new It();
    hs.position.set(0, 0.22, 0);
    const handle = new I(new Z(0.03, 0.03, 0.22), rubberBlack);
    hs.add(handle);
    const earpiece = new I(new Rt(0.035, 0.03, 0.04, 14), rubberBlack);
    earpiece.position.set(0, 0, -0.09);
    hs.add(earpiece);
    const mouthpiece = new I(new Rt(0.03, 0.035, 0.04, 14), rubberBlack);
    mouthpiece.position.set(0, 0, 0.09);
    hs.add(mouthpiece);
    phone.add(hs);

    const crankStem = new I(new Rt(0.006, 0.006, 0.04, 8), steelMetal);
    crankStem.rotation.z = Math.PI / 2;
    crankStem.position.set(0.14, 0.09, 0);
    phone.add(crankStem);
    const crankHandle = new I(new Rt(0.012, 0.012, 0.05, 8), walnutWood);
    crankHandle.position.set(0.16, 0.09, 0.03);
    phone.add(crankHandle);

    [-0.04, 0.04].forEach(px => {
      const post = new I(new Rt(0.01, 0.01, 0.025, 12), brassMetal);
      post.position.set(px, 0.19, -0.06);
      phone.add(post);
    });

    phone.scale.set(1.2, 1.2, 1.2);
    g.add(phone);
  }

  // 11. MŨ CỐI BỘ ĐỘI & KHĂN RẰN
  else if (type === "mu_coi") {
    const helmetGroup = new It();
    const scarf = new I(new Z(0.32, 0.025, 0.32), new X({ color: "#e2e8f0", roughness: 0.85 }));
    scarf.position.set(0, 0.012, 0);
    helmetGroup.add(scarf);

    const crown = new I(new sr(0.14, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), oliveCanvas);
    crown.position.set(0, 0.03, 0);
    helmetGroup.add(crown);

    const brim = new I(new Rt(0.24, 0.25, 0.015, 32), oliveCanvas);
    brim.position.set(0, 0.03, 0);
    helmetGroup.add(brim);

    const topBtn = new I(new sr(0.022, 12, 8), darkOlive);
    topBtn.position.set(0, 0.17, 0);
    helmetGroup.add(topBtn);

    const strap = new I(new Mm(0.142, 0.008, 6, 24, Math.PI), leatherBrown);
    strap.position.set(0, 0.035, 0);
    strap.rotation.x = Math.PI / 2;
    helmetGroup.add(strap);

    const badgeDisc = new I(new Rt(0.022, 0.022, 0.005, 16), redEnamel);
    badgeDisc.rotation.x = Math.PI / 3;
    badgeDisc.position.set(0, 0.08, 0.138);
    helmetGroup.add(badgeDisc);

    const star = new I(new cr(0.012, 0.008, 5), brassMetal);
    star.rotation.x = Math.PI / 3;
    star.position.set(0, 0.08, 0.142);
    helmetGroup.add(star);

    helmetGroup.scale.set(1.2, 1.2, 1.2);
    g.add(helmetGroup);
  }

  // 12. BA LÔ CON CÓC, BI ĐÔNG & CA MÈN
  else if (type === "balo_bidong") {
    const kit = new It();
    const pack = new I(new Z(0.24, 0.32, 0.18), oliveCanvas);
    pack.position.set(-0.06, 0.16, 0);
    kit.add(pack);

    const pFront = new I(new Z(0.14, 0.12, 0.06), darkOlive);
    pFront.position.set(-0.06, 0.12, 0.11);
    kit.add(pFront);

    [-0.19, 0.07].forEach(px => {
      const pSide = new I(new Z(0.05, 0.12, 0.12), darkOlive);
      pSide.position.set(px, 0.12, 0);
      kit.add(pSide);
    });

    const roll = new I(new Rt(0.045, 0.045, 0.26, 14), darkOlive);
    roll.rotation.z = Math.PI / 2;
    roll.position.set(-0.06, 0.34, 0);
    kit.add(roll);

    const canteen = new It();
    canteen.position.set(0.16, 0.09, -0.04);
    const cBody = new I(new sr(0.055, 14, 12), oliveCanvas);
    cBody.scale.set(1, 1.4, 0.7);
    canteen.add(cBody);
    const cCap = new I(new Rt(0.014, 0.014, 0.025, 12), steelMetal);
    cCap.position.set(0, 0.09, 0);
    canteen.add(cCap);
    kit.add(canteen);

    const messTin = new I(new Z(0.12, 0.09, 0.08), steelMetal);
    messTin.position.set(0.16, 0.045, 0.08);
    kit.add(messTin);

    kit.scale.set(1.15, 1.15, 1.15);
    g.add(kit);
  }

  // 13. QUÂN PHỤC CHIẾN SĨ & DÉP LỐP CAO SU
  else if (type === "trang_phuc") {
    const uni = new It();
    const shirt = new I(new Z(0.28, 0.06, 0.24), new X({ color: "#111317", roughness: 0.9 }));
    shirt.position.set(0, 0.03, -0.04);
    uni.add(shirt);

    const pants = new I(new Z(0.26, 0.04, 0.22), new X({ color: "#181a1f", roughness: 0.92 }));
    pants.position.set(0, 0.07, -0.04);
    uni.add(pants);

    const belt = new I(new Z(0.30, 0.015, 0.04), darkOlive);
    belt.position.set(0, 0.095, -0.04);
    uni.add(belt);
    const buckle = new I(new Z(0.04, 0.018, 0.045), brassMetal);
    buckle.position.set(0, 0.098, -0.04);
    uni.add(buckle);

    [-0.07, 0.07].forEach(sx => {
      const sole = new I(new Z(0.065, 0.012, 0.16), rubberBlack);
      sole.position.set(sx, 0.006, 0.12);
      uni.add(sole);
      const strap1 = new I(new Mm(0.03, 0.004, 6, 12, Math.PI), rubberBlack);
      strap1.position.set(sx, 0.02, 0.11);
      strap1.rotation.x = Math.PI / 2;
      uni.add(strap1);
    });

    uni.scale.set(1.15, 1.15, 1.15);
    g.add(uni);
  }

  // 14. LOA TUYÊN TRUYỀN & TRUYỀN ĐƠN
  else if (type === "loa") {
    const loaGroup = new It();
    const horn = new I(new cr(0.13, 0.32, 16, 1, true), steelMetal);
    horn.rotation.x = Math.PI / 2.3;
    horn.position.set(0, 0.22, 0);
    loaGroup.add(horn);

    const driver = new I(new Rt(0.04, 0.04, 0.08, 14), darkOlive);
    driver.rotation.x = Math.PI / 2.3;
    driver.position.set(0, 0.12, -0.16);
    loaGroup.add(driver);

    for (let t = 0; t < 3; t++) {
      const leg = new I(new Rt(0.006, 0.006, 0.22, 8), steelMetal);
      leg.position.set(Math.cos(t * 2.1) * 0.09, 0.09, Math.sin(t * 2.1) * 0.09);
      leg.rotation.z = Math.cos(t * 2.1) * 0.3;
      leg.rotation.x = Math.sin(t * 2.1) * 0.3;
      loaGroup.add(leg);
    }

    [-0.10, 0.08].forEach((lx, idx) => {
      const lf = new I(new Z(0.09, 0.004, 0.13), new X({ color: "#fef3c7", roughness: 0.9 }));
      lf.position.set(lx, 0.004, 0.10);
      lf.rotation.y = idx * 0.5 - 0.2;
      loaGroup.add(lf);
    });

    loaGroup.scale.set(1.15, 1.15, 1.15);
    g.add(loaGroup);
  }

  // 15. KỶ VẬT KHÁNG CHIẾN BA GIA
  
  // 17. MÔ HÌNH CẦU HIỀN LƯƠNG — VĨ TUYẾN 17 (1954–1975)
  else if (type === "cau_hien_luong") {
    const bridge = new It();
    
    // Mặt nước sông Bến Hải bên dưới cầu
    const waterMat = new X({ color: "#0c4a6e", roughness: 0.12, metalness: 0.75 });
    const river = new I(new Yt(0.72, 0.44), waterMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.02, 0);
    bridge.add(river);

    // Mố cầu bê tông 2 đầu bờ Bắc - bờ Nam
    const pierMat = new X({ color: "#e2e8f0", roughness: 0.65, metalness: 0.05 });
    [-0.32, 0.32].forEach(px => {
      const pier = new I(new Z(0.08, 0.12, 0.38), pierMat);
      pier.position.set(px, 0.06, 0);
      bridge.add(pier);
    });

    // Trụ cầu giữa sông
    const centerPier = new I(new Z(0.06, 0.10, 0.34), pierMat);
    centerPier.position.set(0, 0.05, 0);
    bridge.add(centerPier);

    // Nửa cầu phía Bắc (Màu Vàng đặc trưng lịch sử)
    const northDeckMat = new X({ color: "#eab308", roughness: 0.35, metalness: 0.1 });
    const northDeck = new I(new Z(0.31, 0.025, 0.20), northDeckMat);
    northDeck.position.set(-0.155, 0.11, 0);
    bridge.add(northDeck);

    // Nửa cầu phía Nam (Màu Xanh lơ / Cyan đặc trưng lịch sử)
    const southDeckMat = new X({ color: "#0284c7", roughness: 0.35, metalness: 0.1 });
    const southDeck = new I(new Z(0.31, 0.025, 0.20), southDeckMat);
    southDeck.position.set(0.155, 0.11, 0);
    bridge.add(southDeck);

    // Vạch sơn trắng phân định vĩ tuyến 17 ở chính giữa cầu
    const lineMat = new Se({ color: "#ffffff" });
    const demarkLine = new I(new Z(0.015, 0.028, 0.20), lineMat);
    demarkLine.position.set(0, 0.115, 0);
    bridge.add(demarkLine);

    // Dàn thép vòm (steel truss) chạy dọc hai bên thành cầu
    const steelTrussMat = new X({ color: "#475569", roughness: 0.3, metalness: 0.8 });
    [-0.095, 0.095].forEach(sideZ => {
      const topGirder = new I(new Z(0.64, 0.015, 0.015), steelTrussMat);
      topGirder.position.set(0, 0.19, sideZ);
      bridge.add(topGirder);

      for (let tx = -0.30; tx <= 0.30; tx += 0.10) {
        const post = new I(new Z(0.012, 0.075, 0.012), steelTrussMat);
        post.position.set(tx, 0.15, sideZ);
        bridge.add(post);
      }

      for (let bx = -0.25; bx <= 0.25; bx += 0.10) {
        const diag1 = new I(new Z(0.12, 0.008, 0.008), steelTrussMat);
        diag1.position.set(bx, 0.15, sideZ);
        diag1.rotation.z = Math.PI / 4.8;
        bridge.add(diag1);

        const diag2 = new I(new Z(0.12, 0.008, 0.008), steelTrussMat);
        diag2.position.set(bx, 0.15, sideZ);
        diag2.rotation.z = -Math.PI / 4.8;
        bridge.add(diag2);
      }
    });

    // Cột cờ giới tuyến ở đầu cầu phía Bắc
    const flagPole = new I(new Rt(0.005, 0.006, 0.22, 12), steelMetal);
    flagPole.position.set(-0.28, 0.22, 0.08);
    bridge.add(flagPole);

    const flagMesh = new I(new Yt(0.07, 0.045), new Se({ color: "#dc2626", side: Xe }));
    flagMesh.position.set(-0.24, 0.30, 0.08);
    bridge.add(flagMesh);

    bridge.scale.set(1.4, 1.4, 1.4);
    g.add(bridge);
  }

  else if (type === "hien_vat_kc") {
    const kit = new It();
    const mapCase = new I(new Z(0.24, 0.18, 0.05), leatherBrown);
    mapCase.position.set(-0.06, 0.08, -0.04);
    kit.add(mapCase);

    const belt = new I(new Mm(0.16, 0.015, 8, 24), leatherBrown);
    belt.rotation.x = Math.PI / 2;
    belt.position.set(0, 0.03, 0);
    kit.add(belt);

    const knife = new I(new Z(0.035, 0.015, 0.24), darkGunMetal);
    knife.position.set(0.14, 0.02, 0.04);
    kit.add(knife);

    kit.scale.set(1.15, 1.15, 1.15);
    g.add(kit);
  }

  // 16. TẬP HỒ SƠ TƯ LIỆU VÀ BẢN ĐỒ
  else {
    const dos = new It();
    const binder = new I(new Z(0.28, 0.025, 0.20), leatherBrown);
    binder.position.set(-0.04, 0.015, -0.02);
    dos.add(binder);

    const mapRoll = new I(new Rt(0.022, 0.022, 0.26, 16), new X({ color: "#fde68a", roughness: 0.85 }));
    mapRoll.rotation.z = Math.PI / 2;
    mapRoll.position.set(0.02, 0.045, 0.08);
    dos.add(mapRoll);

    const pen = new I(new Rt(0.004, 0.004, 0.14, 10), brassMetal);
    pen.rotation.z = Math.PI / 3;
    pen.position.set(-0.04, 0.035, 0.08);
    dos.add(pen);

    dos.scale.set(1.15, 1.15, 1.15);
    g.add(dos);
  }

  // Bật bóng đổ cho tất cả các chi tiết 3D
  g.traverse(obj => {
    if (obj.geometry) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return g;
}

// --- 2. TỦ KÍNH TRƯNG BÀY CAO CẤP (CRYSTAL VITRINE) CÓ HIỆN VẬT 3D ---
function createMuseumVitrine({
  x = 0, y = 0.08, z = 0, rotY = 0, width = 1.15, depth = 1.15, height = 2.05,
  title = "Hiện vật", artifact = null, onRegisterInteractive = null, onRegisterRotating = null
}) {
  const group = new It();
  group.position.set(x, y, z);
  group.rotation.y = rotY;

  const pedH = 0.78;
  const glassH = height - pedH;

  // Chân bệ nâu gỗ óc chó cao cấp (#806044)
  const pedMat = new X({ color: "#806044", roughness: 0.42, metalness: 0.08 });
  const pedMesh = new I(new Z(width, pedH, depth), pedMat);
  pedMesh.position.y = pedH / 2;
  pedMesh.castShadow = true; pedMesh.receiveShadow = true;
  group.add(pedMesh);

  // Viền tủ kính: vàng champagne (#C6A56B)
  const trimMat = new X({ color: "#C6A56B", metalness: 0.90, roughness: 0.20 });
  const trimTop = new I(new Z(width + 0.04, 0.04, depth + 0.04), trimMat);
  trimTop.position.y = pedH;
  group.add(trimTop);

  const trimBase = new I(new Z(width + 0.06, 0.06, depth + 0.06), trimMat);
  trimBase.position.y = 0.03;
  group.add(trimBase);

  // Bục nhỏ đặt hiện vật (interior display dais) bọc nhung hoàng gia
  const daisMat = new X({ color: "#18202c", roughness: 0.85, metalness: 0.05 });
  const dais = new I(new Z(width * 0.76, 0.06, depth * 0.76), daisMat);
  dais.position.y = pedH + 0.03;
  dais.receiveShadow = true;
  group.add(dais);

  const daisTrim = new I(new Z(width * 0.78, 0.015, depth * 0.78), trimMat);
  daisTrim.position.y = pedH + 0.06;
  group.add(daisTrim);

  // Bảng đồng khắc tên tác phẩm trên chân bệ
  const plaqueCanvas = document.createElement("canvas");
  plaqueCanvas.width = 512; plaqueCanvas.height = 128;
  const pctx = plaqueCanvas.getContext("2d");
  if (pctx) {
    pctx.fillStyle = "#1e180d"; pctx.fillRect(0, 0, 512, 128);
    pctx.strokeStyle = "#d4af37"; pctx.lineWidth = 4; pctx.strokeRect(6, 6, 500, 116);
    pctx.fillStyle = "#fde68a"; pctx.font = 'bold 22px "Be Vietnam Pro", sans-serif'; pctx.textAlign = "center";
    pctx.fillText(title.length > 30 ? title.slice(0, 28) + "..." : title, 256, 48);
    pctx.fillStyle = "#38bdf8"; pctx.font = 'bold 15px "Be Vietnam Pro", sans-serif';
    pctx.fillText("🏛️ HIỆN VẬT 3D • BẤM ĐỂ XEM CHI TIẾT", 256, 90);
  }
  const plaqueTex = new Pe(plaqueCanvas);
  const plaqueMesh = new I(new Yt(width * 0.78, 0.18), new Se({ map: plaqueTex, side: Xe }));
  plaqueMesh.position.set(0, pedH * 0.65, depth / 2 + 0.015);
  group.add(plaqueMesh);

  // Kính pha lê cường lực trong suốt, phản chiếu nhẹ
  const glassMat = new X({ color: "#ffffff", transparent: true, opacity: 0.22, roughness: 0.04, metalness: 0.12, depthWrite: false, side: Xe });
  const glassMesh = new I(new Z(width * 0.94, glassH, depth * 0.94), glassMat);
  glassMesh.position.y = pedH + glassH / 2;
  group.add(glassMesh);

  // Khung mui đỉnh tủ kính bằng đồng mạ vàng
  const glassCap = new I(new Z(width * 0.96, 0.03, depth * 0.96), trimMat);
  glassCap.position.y = pedH + glassH;
  group.add(glassCap);

  // Trụ viền 4 góc tủ kính
  const cornerMat = trimMat;
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([cx, cz]) => {
    const cPost = new I(new Z(0.025, glassH, 0.025), cornerMat);
    cPost.position.set(cx * (width * 0.47), pedH + glassH / 2, cz * (depth * 0.47));
    group.add(cPost);
  });

  // TẠO MÔ HÌNH HIỆN VẬT 3D THẬT SỰ BÊN TRONG TỦ KÍNH
  const model3D = createArtifact3DModel(artifact || { title });
  model3D.position.set(0, pedH + 0.06, 0);
  group.add(model3D);

  // Đăng ký xoay chậm nếu được hỗ trợ
  if (onRegisterRotating) {
    onRegisterRotating(model3D);
  }

  // Đèn LED vàng ấm hắt từ trần tủ kính xuống hiện vật (3000K-3500K)
  const vitrineLight = new qi("#FFF9EF", 2.2, 4.2, 1.2);
  vitrineLight.position.set(0, pedH + glassH - 0.06, 0);
  group.add(vitrineLight);

  // Đăng ký tương tác
  if (onRegisterInteractive && artifact) {
    onRegisterInteractive(glassMesh, "🏛️ Hiện vật: " + title, artifact);
    onRegisterInteractive(pedMesh, "🏛️ Hiện vật: " + title, artifact);
    model3D.traverse(obj => {
      if (obj.geometry) onRegisterInteractive(obj, "🏛️ Hiện vật: " + title, artifact);
    });
  }

  return group;
}

// --- 3. TƯỜNG BẢO TÀNG KIẾN TRÚC CAO CẤP: ĐÁ CẨM THẠCH KEM & GỖ ÓC CHÓ NÂU TRẦM ---
function createSolidMuseumWall({ x = 0, y = 0, z = 0, length = 10, height = 5.2, thickness = 0.28, rotY = 0, wallColor = "#F3EBDD", trimColor = "#C6A56B" }) {
  const wallGroup = new It();
  wallGroup.position.set(x, y, z);
  wallGroup.rotation.y = rotY;

  const wainscotH = 1.2;
  const upperH = height - wainscotH;

  // 1. Chân tường màu be gỗ sang trọng (#D8C4A5)
  const woodBeigeMat = new X({ color: "#D8C4A5", roughness: 0.46, metalness: 0.04 });
  const wainscotMesh = new I(new Z(length, wainscotH, thickness), woodBeigeMat);
  wainscotMesh.position.y = wainscotH / 2;
  wainscotMesh.castShadow = true; wainscotMesh.receiveShadow = true;
  wallGroup.add(wainscotMesh);

  // Len chân tường gỗ óc chó nâu ấm (#806044)
  const baseboard = new I(new Z(length + 0.02, 0.16, thickness + 0.02), new X({ color: "#806044", roughness: 0.42, metalness: 0.08 }));
  baseboard.position.y = 0.08;
  wallGroup.add(baseboard);

  // 2. Nẹp phào chỉ vàng champagne kết hợp trắng kem ở cao độ 1.2m
  const trimMat = new X({ color: trimColor, metalness: 0.88, roughness: 0.22 });
  const chairRail = new I(new Z(length + 0.04, 0.08, thickness + 0.04), trimMat);
  chairRail.position.y = wainscotH;
  wallGroup.add(chairRail);

  const mouldingTrim = new I(new Z(length + 0.05, 0.03, thickness + 0.05), new X({ color: "#FAF5EC", roughness: 0.5, metalness: 0.05 }));
  mouldingTrim.position.y = wainscotH + 0.045;
  wallGroup.add(mouldingTrim);

  // 3. Tường đá cẩm thạch màu be kem sáng (#F3EBDD)
  const marbleMat = new X({ color: wallColor, roughness: 0.45, metalness: 0.05 });
  const upperMesh = new I(new Z(length, upperH, thickness), marbleMat);
  upperMesh.position.y = wainscotH + upperH / 2;
  upperMesh.castShadow = true; upperMesh.receiveShadow = true;
  wallGroup.add(upperMesh);

  // 4. Phào chỉ trần nhà vàng champagne
  const crownTrim = new I(new Z(length + 0.04, 0.14, thickness + 0.04), trimMat);
  crownTrim.position.y = height - 0.07;
  wallGroup.add(crownTrim);

  // 5. Khung trang trí tân cổ điển nổi trên mảng tường đá
  const panelCount = Math.max(1, Math.floor(length / 4));
  const panelW = (length - 0.6) / panelCount - 0.4;
  if (panelW > 1.2 && upperH > 2.0) {
    for (let p = 0; p < panelCount; p++) {
      const px = -length / 2 + 0.5 + p * (panelW + 0.4) + panelW / 2;
      const fGold = new I(new Z(panelW, upperH * 0.72, 0.015), trimMat);
      fGold.position.set(px, wainscotH + upperH * 0.5, thickness / 2 + 0.008);
      wallGroup.add(fGold);
    }
  }

  return wallGroup;
}

// --- 4. CỔNG VÒM BẢO TÀNG CÓ CỬA VÀ PHÀO CHỈ HOÀNG GIA ---
function createMuseumWallWithDoor({
  x = 0, y = 0, z = 0, length = 10, height = 5.2, thickness = 0.28, doorWidth = 3.2, doorHeight = 3.6, rotY = 0,
  wallColor = "#F3EBDD", trimColor = "#C6A56B", signText = ""
}) {
  const wallGroup = new It();
  wallGroup.position.set(x, y, z);
  wallGroup.rotation.y = rotY;

  const wainscotH = 1.2;
  const upperH = height - wainscotH;
  const sideWidth = (length - doorWidth) / 2;

  // Màu be gỗ #D8C4A5 cho khung cửa và chân tường, đá be kem #F3EBDD cho tường, vàng champagne #C6A56B cho phào chỉ
  const woodBeigeMat = new X({ color: "#D8C4A5", roughness: 0.46, metalness: 0.04 });
  const marbleMat = new X({ color: wallColor, roughness: 0.45, metalness: 0.05 });
  const trimMat = new X({ color: trimColor, metalness: 0.88, roughness: 0.22 });

  if (sideWidth > 0.05) {
    [-1, 1].forEach(side => {
      const cx = side * (length / 2 - sideWidth / 2);
      // Gỗ óc chó dưới
      const wMesh = new I(new Z(sideWidth, wainscotH, thickness), woodBeigeMat);
      wMesh.position.set(cx, wainscotH / 2, 0);
      wallGroup.add(wMesh);

      // Phào chỉ nẹp giữa
      const cRail = new I(new Z(sideWidth + 0.02, 0.08, thickness + 0.02), trimMat);
      cRail.position.set(cx, wainscotH, 0);
      wallGroup.add(cRail);

      // Đá cẩm thạch trên
      const uMesh = new I(new Z(sideWidth, upperH, thickness), marbleMat);
      uMesh.position.set(cx, wainscotH + upperH / 2, 0);
      wallGroup.add(uMesh);

      // Phào trần
      const crTrim = new I(new Z(sideWidth + 0.02, 0.14, thickness + 0.02), trimMat);
      crTrim.position.set(cx, height - 0.07, 0);
      wallGroup.add(crTrim);
    });
  }

  // Khối tường trên vòm cửa
  const topLintelHeight = height - doorHeight;
  if (topLintelHeight > 0.05) {
    const lintelMesh = new I(new Z(doorWidth, topLintelHeight, thickness), marbleMat);
    lintelMesh.position.set(0, doorHeight + topLintelHeight / 2, 0);
    wallGroup.add(lintelMesh);

    const lintelTrim = new I(new Z(doorWidth + 0.04, 0.14, thickness + 0.04), trimMat);
    lintelTrim.position.set(0, height - 0.07, 0);
    wallGroup.add(lintelTrim);
  }

  // Cột nẹp viền vòm cửa bằng đồng đúc
  const colMat = trimMat;
  const leftCol = new I(new Z(0.12, doorHeight + 0.08, thickness + 0.08), colMat);
  leftCol.position.set(-doorWidth / 2 - 0.06, (doorHeight + 0.08) / 2, 0);
  wallGroup.add(leftCol);

  const rightCol = new I(new Z(0.12, doorHeight + 0.08, thickness + 0.08), colMat);
  rightCol.position.set(doorWidth / 2 + 0.06, (doorHeight + 0.08) / 2, 0);
  wallGroup.add(rightCol);

  const topArch = new I(new Z(doorWidth + 0.24, 0.14, thickness + 0.1), colMat);
  topArch.position.set(0, doorHeight + 0.07, 0);
  wallGroup.add(topArch);

  // Biển hiệu bảo tàng trang trọng mạ đồng
  if (signText) {
    const canvas = document.createElement("canvas");
    canvas.width = 1536; canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1e180d"; ctx.fillRect(0, 0, 1536, 200);
      ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 8; ctx.strokeRect(10, 10, 1516, 180);
      ctx.strokeStyle = "#b45309"; ctx.lineWidth = 2; ctx.strokeRect(20, 20, 1496, 160);
      ctx.fillStyle = "#fde68a"; ctx.font = 'bold 44px "Cinzel", "Playfair Display", serif'; ctx.textAlign = "center";
      ctx.shadowColor = "rgba(212, 175, 55, 0.7)"; ctx.shadowBlur = 12;
      ctx.fillText(signText, 768, 90);
      ctx.shadowBlur = 0; ctx.fillStyle = "#38bdf8"; ctx.font = 'bold 24px "Be Vietnam Pro", sans-serif';
      ctx.fillText("BẢO TÀNG LỊCH SỬ SỐ • ĐỘI ẤP BẮC THUYẾT MINH", 768, 148);
    }
    const texture = new Pe(canvas);
    const signW = Math.min(doorWidth * 1.5, length * 0.75);
    const signH = 0.65;
    const signMeshFront = new I(new Yt(signW, signH), new Se({ map: texture }));
    signMeshFront.position.set(0, doorHeight + topLintelHeight / 2, thickness / 2 + 0.02);
    wallGroup.add(signMeshFront);

    const signMeshBack = new I(new Yt(signW, signH), new Se({ map: texture }));
    signMeshBack.position.set(0, doorHeight + topLintelHeight / 2, -thickness / 2 - 0.02);
    signMeshBack.rotation.y = Math.PI;
    wallGroup.add(signMeshBack);
  }

  return wallGroup;
}

// --- 5. BÀN TRƯNG BÀY KÍNH TÀI LIỆU KẾ HOẠCH TÁC CHIẾN CAO CẤP ---
function createFramedMuseumTable({
  x = 0, y = 0, z = 0, rotY = 0, width = 2.4, depth = 1.2, height = 0.82,
  title = "Tài liệu", docImage = "", docArtifact = null, onRegisterInteractive = null
}) {
  const g = new It();
  g.position.set(x, y, z);
  g.rotation.y = rotY;

  const legH = height - 0.12;
  const legMat = new X({ color: "#2d1e15", roughness: 0.38, metalness: 0.1 });
  const goldTrim = new X({ color: "#d4af37", roughness: 0.18, metalness: 0.92 });

  // 4 Chân bàn gỗ óc chó bịt đồng
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([lx, lz]) => {
    const legMesh = new I(new Z(0.08, legH, 0.08), legMat);
    legMesh.position.set(lx * (width / 2 - 0.08), legH / 2, lz * (depth / 2 - 0.08));
    legMesh.castShadow = true;
    g.add(legMesh);

    // Đế đồng chân bàn
    const footFerrule = new I(new Z(0.09, 0.06, 0.09), goldTrim);
    footFerrule.position.set(lx * (width / 2 - 0.08), 0.03, lz * (depth / 2 - 0.08));
    g.add(footFerrule);
  });

  // Hộp bàn gỗ óc chó
  const boxMat = legMat;
  const boxMesh = new I(new Z(width, 0.10, depth), boxMat);
  boxMesh.position.y = legH + 0.05;
  boxMesh.castShadow = true;
  g.add(boxMesh);

  // Khung viền mạ đồng vàng
  const trimMesh = new I(new Z(width + 0.04, 0.02, depth + 0.04), goldTrim);
  trimMesh.position.y = legH + 0.10;
  g.add(trimMesh);

  // Kính bảo vệ mặt bàn trong suốt
  const glassTopMat = new X({ color: "#ffffff", transparent: true, opacity: 0.28, roughness: 0.04, metalness: 0.12, depthWrite: false });
  const glassTop = new I(new Z(width - 0.06, 0.02, depth - 0.06), glassTopMat);
  glassTop.position.y = legH + 0.12;
  g.add(glassTop);

  // Mô hình 3D tập hồ sơ, bản đồ tác chiến và bút ký bên trong mặt bàn
  const doc3DGroup = new It();
  doc3DGroup.position.set(0, legH + 0.105, 0);

  // Bìa hồ sơ da nâu
  const folder = new I(new Z(width * 0.45, 0.015, depth * 0.65), new X({ color: "#452715", roughness: 0.45, metalness: 0.08 }));
  folder.position.set(-width * 0.2, 0, 0);
  doc3DGroup.add(folder);

  // Bản đồ tác chiến mở rộng có ký hiệu quân sự
  const mapMesh = new I(new Yt(width * 0.42, depth * 0.62), new X({ color: "#fef3c7", roughness: 0.9 }));
  mapMesh.rotation.x = -Math.PI / 2;
  mapMesh.position.set(width * 0.2, 0.008, 0);
  doc3DGroup.add(mapMesh);

  // Bút ký ngoại giao bằng đồng
  const pen = new I(new Rt(0.006, 0.006, 0.22, 10), goldTrim);
  pen.rotation.z = Math.PI / 4;
  pen.rotation.x = -Math.PI / 2;
  pen.position.set(0, 0.012, 0.12);
  doc3DGroup.add(pen);

  g.add(doc3DGroup);

  // Bảng đồng trên bàn
  const plaqueCanvas = document.createElement("canvas");
  plaqueCanvas.width = 512; plaqueCanvas.height = 128;
  const pctx = plaqueCanvas.getContext("2d");
  if (pctx) {
    pctx.fillStyle = "#1e180d"; pctx.fillRect(0, 0, 512, 128);
    pctx.strokeStyle = "#d4af37"; pctx.lineWidth = 4; pctx.strokeRect(6, 6, 500, 116);
    pctx.fillStyle = "#fde68a"; pctx.font = 'bold 22px "Be Vietnam Pro", sans-serif'; pctx.textAlign = "center";
    pctx.fillText(title.length > 30 ? title.slice(0, 28) + "..." : title, 256, 50);
    pctx.fillStyle = "#38bdf8"; pctx.font = 'bold 15px "Be Vietnam Pro", sans-serif';
    pctx.fillText("🏛️ BÀN TRƯNG BÀY TƯ LIỆU GỐC", 256, 92);
  }
  const plaqueTex = new Pe(plaqueCanvas);
  const plaqueMesh = new I(new Yt(width * 0.6, 0.14), new Se({ map: plaqueTex }));
  plaqueMesh.position.set(0, legH + 0.05, depth / 2 + 0.005);
  g.add(plaqueMesh);

  if (onRegisterInteractive && docArtifact) {
    onRegisterInteractive(glassTop, "🏛️ Tư liệu: " + title, docArtifact);
  }

  return { group: g, displayMesh: glassTop };
}

// --- 6. CỘT TRỤ TÂN CỔ ĐIỂN ĐÁ CẨM THẠCH ĐẦU CỘT MẠ VÀNG ---
function createClassicalColumn({ x = 0, y = 0, z = 0, height = 5.2, radius = 0.28 }) {
  const g = new It();
  g.position.set(x, y, z);

  const marbleMat = new X({ color: "#F3EBDD", roughness: 0.38, metalness: 0.05 });
  const goldTrim = new X({ color: "#C6A56B", roughness: 0.22, metalness: 0.88 });
  const baseMat = new X({ color: "#D8C4A5", roughness: 0.45, metalness: 0.06 });

  // Đế cột vuông đá granite tối màu
  const plinth = new I(new Z(radius * 2.8, 0.22, radius * 2.8), baseMat);
  plinth.position.y = 0.11;
  plinth.castShadow = true; plinth.receiveShadow = true;
  g.add(plinth);

  // Vành đồng chân cột
  const baseTorus = new I(new Rt(radius * 1.35, radius * 1.4, 0.10, 24), goldTrim);
  baseTorus.position.y = 0.27;
  g.add(baseTorus);

  // Thân cột đá cẩm thạch trắng ngà
  const shaftH = height - 0.75;
  const shaft = new I(new Rt(radius * 0.92, radius, shaftH, 24), marbleMat);
  shaft.position.y = 0.32 + shaftH / 2;
  shaft.castShadow = true; shaft.receiveShadow = true;
  g.add(shaft);

  // Đầu cột Corinthian/Doric mạ vàng
  const capTorus = new I(new Rt(radius * 1.35, radius * 1.1, 0.14, 24), goldTrim);
  capTorus.position.y = height - 0.28;
  g.add(capTorus);

  const abacus = new I(new Z(radius * 2.6, 0.18, radius * 2.6), goldTrim);
  abacus.position.y = height - 0.10;
  g.add(abacus);

  return g;
}

// --- 7. MÀN CHIẾU PHIM TƯ LIỆU RẠP CHIẾU CAO CẤP ---
function createWallCinemaProjection({
  x = 27.8, y = 2.8, z = 9.5, width = 6.8, height = 3.9, rotY = -Math.PI / 2,
  videoTexture = null, title = "CHIẾN THẮNG ẤP BẮC (02/01/1963)", onRegisterInteractive = null
}) {
  const group = new It();
  group.position.set(x, y, z);
  group.rotation.y = rotY;

  const frameMat = new X({ color: "#1c140e", roughness: 0.4, metalness: 0.3, side: Xe });
  const goldBezelMat = new X({ color: "#d4af37", roughness: 0.18, metalness: 0.92, side: Xe });

  const outerFrame = new I(new Z(width + 0.36, height + 0.36, 0.12), frameMat);
  outerFrame.castShadow = true;
  group.add(outerFrame);

  const innerBezel = new I(new Z(width + 0.12, height + 0.12, 0.14), goldBezelMat);
  group.add(innerBezel);

  let screenMat;
  if (videoTexture) {
    screenMat = new Se({ map: videoTexture, side: Xe });
  } else {
    screenMat = new X({ color: "#000000", roughness: 0.1, side: Xe });
  }

  const screenMesh = new I(new Yt(width, height), screenMat);
  screenMesh.position.z = 0.08;
  group.add(screenMesh);

  // Bảng tên phim mạ đồng phía trên màn hình
  const bannerCanvas = document.createElement("canvas");
  bannerCanvas.width = 1024; bannerCanvas.height = 128;
  const bctx = bannerCanvas.getContext("2d");
  if (bctx) {
    bctx.fillStyle = "#1e180d"; bctx.fillRect(0, 0, 1024, 128);
    bctx.strokeStyle = "#d4af37"; bctx.lineWidth = 4; bctx.strokeRect(6, 6, 1012, 116);
    bctx.fillStyle = "#fde68a"; bctx.font = 'bold 30px "Cinzel", "Playfair Display", serif'; bctx.textAlign = "center";
    bctx.fillText("🎬 PHIM TƯ LIỆU: " + title, 512, 54);
    bctx.fillStyle = "#38bdf8"; bctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
    bctx.fillText("BẤM VÀO MÀN HÌNH ĐỂ PHÁT / TẠM DỪNG (THỜI LƯỢNG 03:13)", 512, 94);
  }
  const bannerTex = new Pe(bannerCanvas);
  const bannerMesh = new I(new Yt(width * 0.88, 0.36), new Se({ map: bannerTex, side: Xe }));
  bannerMesh.position.set(0, height / 2 + 0.36, 0.08);
  group.add(bannerMesh);

  if (onRegisterInteractive) {
    onRegisterInteractive(screenMesh, "🎬 " + title, "screen-video");
  }

  return { group, screenMesh };
}

// --- 8. KHUNG TRANH TƯ LIỆU TREO TƯỜNG (MUSEUM WALL FRAME) ---
function createMuseumWallFrame({
  x = 0, y = 2.4, z = 0, rotY = 0, width = 2.4, height = 1.6,
  imageUrl = "", title = "", subtitle = "", onRegisterInteractive = null, artifact = null
}) {
  const g = new It();
  g.position.set(x, y, z);
  g.rotation.y = rotY;

  const frameMat = new X({ color: "#281b12", roughness: 0.45, metalness: 0.15 });
  const goldMat = new X({ color: "#d4af37", roughness: 0.20, metalness: 0.90 });

  const outer = new I(new Z(width + 0.22, height + 0.22, 0.08), frameMat);
  outer.castShadow = true;
  g.add(outer);

  const bezel = new I(new Z(width + 0.06, height + 0.06, 0.09), goldMat);
  g.add(bezel);

  const loader = new c3();
  const tex = loader.load(imageUrl, ut => {
    if (ut && ut.image && ut.image.width && ut.image.height) {
      const ia = ut.image.width / ut.image.height, pa = width / height;
      ia > pa ? (ut.repeat.set(1, pa / ia), ut.offset.set(0, (1 - pa / ia) / 2)) : (ut.repeat.set(ia / pa, 1), ut.offset.set((1 - ia / pa) / 2, 0));
      ut.needsUpdate = true;
    }
  });
  const picMat = new X({ map: tex, roughness: 0.25, metalness: 0.02, side: Xe, emissive: new re("#fffbeb"), emissiveIntensity: 0.16 });
  const picMesh = new I(new Yt(width, height), picMat);
  picMesh.position.z = 0.05;
  g.add(picMesh);

  // Bảng đồng chú thích tranh
  const plaqueCanvas = document.createElement("canvas");
  plaqueCanvas.width = 512; plaqueCanvas.height = 128;
  const pctx = plaqueCanvas.getContext("2d");
  if (pctx) {
    pctx.fillStyle = "#1e180d"; pctx.fillRect(0, 0, 512, 128);
    pctx.strokeStyle = "#d4af37"; pctx.lineWidth = 4; pctx.strokeRect(6, 6, 500, 116);
    pctx.fillStyle = "#fde68a"; pctx.font = 'bold 22px "Be Vietnam Pro", sans-serif'; pctx.textAlign = "center";
    pctx.fillText(title.length > 32 ? title.slice(0, 30) + "..." : title, 256, 48);
    pctx.fillStyle = "#94a3b8"; pctx.font = '16px "Be Vietnam Pro", sans-serif';
    pctx.fillText(subtitle || "ẢNH TƯ LIỆU LỊCH SỬ (1961–1965)", 256, 90);
  }
  const plaqueTex = new Pe(plaqueCanvas);
  const plaqueMesh = new I(new Yt(width * 0.72, 0.22), new Se({ map: plaqueTex, side: Xe }));
  plaqueMesh.position.set(0, -height / 2 - 0.2, 0.05);
  g.add(plaqueMesh);

  // Đèn spotlight riêng cho bức tranh
  const spot = new sa("#fff8eb", 1.2, 5.5, Math.PI / 4, 0.4);
  spot.position.set(0, height / 2 + 0.6, 0.8);
  spot.target = picMesh;
  g.add(spot);
  g.add(spot.target);

  if (onRegisterInteractive && artifact) {
    onRegisterInteractive(picMesh, "🖼️ " + title, artifact);
  }

  return g;
}

// --- 9. HÀNH LANG CHUYỂN TIẾP (CORRIDOR TUNNEL) ---
function createCorridorTunnel({ x = 0, y = 0, z = 0, length = 12, width = 4, height = 5.2, rotY = 0, signText = "" }) {
  const g = new It();
  g.position.set(x, y, z);
  g.rotation.y = rotY;

  const marbleMat = new X({ color: "#f5efe6", roughness: 0.45, metalness: 0.05 });
  const woodBeigeMat = new X({ color: "#2d1e15", roughness: 0.42, metalness: 0.08 });
  const trimMat = new X({ color: "#d4af37", metalness: 0.90, roughness: 0.20 });

  [-1, 1].forEach(side => {
    // Tường 2 bên hành lang
    const sideWall = createSolidMuseumWall({
      x: side * (width / 2 + 0.14), y: 0, z: 0,
      length: length, height: height, thickness: 0.28, rotY: 0,
      wallColor: "#f5efe6", trimColor: "#d4af37"
    });
    g.add(sideWall);
  });

  // Trần hành lang
  const ceiling = new I(new Z(width + 0.6, 0.12, length), woodBeigeMat);
  ceiling.position.y = height - 0.06;
  g.add(ceiling);

  // Dãy đèn rọi trần hành lang
  const lightCount = Math.floor(length / 3);
  for (let i = 0; i < lightCount; i++) {
    const lz = -length / 2 + 1.5 + i * 3;
    const cLight = new qi("#fff6e5", 1.8, 6.0, 1.2);
    cLight.position.set(0, height - 0.35, lz);
    g.add(cLight);

    const fixture = new I(new Rt(0.12, 0.12, 0.04, 16), trimMat);
    fixture.position.set(0, height - 0.15, lz);
    g.add(fixture);
  }

  return g;
}
