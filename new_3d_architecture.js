// =========================================================================
// KIẾN TRÚC BẢO TÀNG LỊCH SỬ QUỐC GIA CAO CẤP — PHONG CÁCH TÔNG BE SÁNG
// TƯỜNG BE KEM #F3EBDD • TRẦN TRẮNG NGÀ #FFF9EF • SÀN GREIGE MARBLE #D7D0C4
// KHUNG CỬA BE GỖ #D8C4A5 • PHÀO VÀNG CHAMPAGNE #C6A56B • CHÂN TỦ ÓC CHÓ #806044
// =========================================================================

const yt = 56, Xt = 52, ie = 5.4;
const ma = new c3; u.current = ma;

// 1. SÀN ĐÁ MARBLE GREIGE SÁNG (#D7D0C4) CÓ ĐỘ BÓNG & PHẢN CHIẾU NHẸ
const je = new Yt(yt, Xt);
const Be = createGreigeMarbleFloorTexture();
Be.repeat.set(14, 13);
const wn = new X({ map: Be, roughness: 0.18, metalness: 0.08 });
const Ht = new I(je, wn);
Ht.rotation.x = -Math.PI / 2;
Ht.position.y = 0;
Ht.receiveShadow = true;
$.add(Ht);

// Đường viền hoa văn dẫn lối tham quan trên sàn (Inlaid Light Marble Borders)
const floorBorderMat = new X({ color: "#EDE7DC", roughness: 0.35, metalness: 0.06 });
const floorGoldMat = new X({ color: "#C6A56B", roughness: 0.22, metalness: 0.88 });

// Trục đi chính từ Cổng Triển Lãm vào Đại Sảnh
const mainRunner = new I(new Yt(3.4, 18), floorBorderMat);
mainRunner.rotation.x = -Math.PI / 2;
mainRunner.position.set(0, 0.005, 16.5);
$.add(mainRunner);

[-1.72, 1.72].forEach(rx => {
  const goldStripe = new I(new Yt(0.08, 18), floorGoldMat);
  goldStripe.rotation.x = -Math.PI / 2;
  goldStripe.position.set(rx, 0.006, 16.5);
  $.add(goldStripe);
});

// Vành đai đá bao quanh Sa Bàn Trung Tâm (x: 0, z: 9.5)
const dioramaFloorRing = new I(new Yt(7.6, 6.8), floorBorderMat);
dioramaFloorRing.rotation.x = -Math.PI / 2;
dioramaFloorRing.position.set(0, 0.004, 9.5);
$.add(dioramaFloorRing);

// Nhánh đi sang Khu 1 (Phía Tây: x: -10 to -24, z: 9.5)
const westRunner = new I(new Yt(14, 2.6), floorBorderMat);
westRunner.rotation.x = -Math.PI / 2;
westRunner.position.set(-15, 0.005, 9.5);
$.add(westRunner);

// Nhánh đi sang Khu 2 (Phía Đông: x: 10 to 22, z: 9.5)
const eastRunner = new I(new Yt(12, 2.6), floorBorderMat);
eastRunner.rotation.x = -Math.PI / 2;
eastRunner.position.set(15, 0.005, 9.5);
$.add(eastRunner);

// Nhánh đi vào Khu 3 (Phía Bắc: z: 3 to -18)
const northRunner = new I(new Yt(3.6, 22), floorBorderMat);
northRunner.rotation.x = -Math.PI / 2;
northRunner.position.set(0, 0.005, -7.5);
$.add(northRunner);

[-1.82, 1.82].forEach(rx => {
  const goldStripeN = new I(new Yt(0.08, 22), floorGoldMat);
  goldStripeN.rotation.x = -Math.PI / 2;
  goldStripeN.position.set(rx, 0.006, -7.5);
  $.add(goldStripeN);
});

// TRẦN NHÀ THIẾT KẾ HIỆN ĐẠI: TRẮNG NGÀ #FFF9EF, Ô TRẦN GỖ BE #D8C4A5 & VÀNG CHAMPAGNE #C6A56B
const An = new Yt(yt, Xt);
const Ne = new X({ color: "#FFF9EF", roughness: 0.65 });
const Un = new I(An, Ne);
Un.rotation.x = Math.PI / 2;
Un.position.y = ie;
$.add(Un);

const ceilingGroup = new It();
const beamMat = new X({ color: "#D8C4A5", roughness: 0.48, metalness: 0.05 });
const goldTrimBeamMat = new X({ color: "#C6A56B", metalness: 0.88, roughness: 0.22 });

// Dầm dọc theo trục Z (cách nhau mỗi 7m)
for (let bx = -yt / 2 + 7; bx < yt / 2; bx += 7) {
  const beamZ = new I(new Z(0.35, 0.22, Xt), beamMat);
  beamZ.position.set(bx, ie - 0.11, 0);
  ceilingGroup.add(beamZ);
  const trimZ = new I(new Z(0.38, 0.03, Xt), goldTrimBeamMat);
  trimZ.position.set(bx, ie - 0.22, 0);
  ceilingGroup.add(trimZ);
}

// Dầm ngang theo trục X (cách nhau mỗi 6.5m)
for (let bz = -Xt / 2 + 6.5; bz < Xt / 2; bz += 6.5) {
  const beamX = new I(new Z(yt, 0.35, 0.22), beamMat);
  beamX.position.set(0, ie - 0.11, bz);
  ceilingGroup.add(beamX);
  const trimX = new I(new Z(yt, 0.03, 0.38), goldTrimBeamMat);
  trimX.position.set(0, ie - 0.22, bz);
  ceilingGroup.add(trimX);
}

// Hệ thống đèn âm trần LED (recessed downlights) viền vàng champagne
const downlightBezelMat = new X({ color: "#C6A56B", metalness: 0.90, roughness: 0.20 });
const downlightLensMat = new Se({ color: "#FFFDF5" });

for (let lx = -21; lx <= 21; lx += 7) {
  for (let lz = -19.5; lz <= 19.5; lz += 6.5) {
    const bezel = new I(new Rt(0.32, 0.35, 0.04, 24), downlightBezelMat);
    bezel.position.set(lx, ie - 0.02, lz);
    ceilingGroup.add(bezel);
    const lens = new I(new Xi(0, 0.28, 24), downlightLensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(lx, ie - 0.025, lz);
    ceilingGroup.add(lens);
  }
}
$.add(ceilingGroup);

// ÁNH SÁNG TRẮNG ẤM TỰ NHIÊN SÁNG SỦA, THOÁNG ĐÃNG (~3800K)
const ambLight = new eb(0xFFFAF0, 1.25);
$.add(ambLight);

const dirLight = new tb(0xFFF7EB, 1.30);
dirLight.position.set(10, 20, 15);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.bias = -0.0005;
$.add(dirLight);

// Ánh sáng chiếu phụ giúp góc phòng luôn sáng đẹp, không bị tối
const fillLight = new eb(0xF7EFE4, 0.55);
$.add(fillLight);

// 2. TƯỜNG BAO NGOÀI BẢO TÀNG (Đá cẩm thạch màu be kem sáng #F3EBDD & Khung be gỗ #D8C4A5)
// Tường Bắc (z = -Xt/2 = -26)
$.add(createSolidMuseumWall({ x: 0, y: 0, z: -Xt / 2, length: yt, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));
// Tường Nam (z = +Xt/2 = +26)
$.add(createSolidMuseumWall({ x: 0, y: 0, z: Xt / 2, length: yt, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));
// Tường Tây (x = -yt/2 = -28)
$.add(createSolidMuseumWall({ x: -yt / 2, y: 0, z: 0, length: Xt, height: ie, rotY: Math.PI / 2, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));
// Tường Đông (x = +yt/2 = +28)
$.add(createSolidMuseumWall({ x: yt / 2, y: 0, z: 0, length: Xt, height: ie, rotY: -Math.PI / 2, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));

// =========================================================================
// PHÂN KHU 1: CỔNG TRIỂN LÃM 3D (Z = 16 ĐẾN 26)
// =========================================================================
const gateWall = createMuseumWallWithDoor({
  x: 0, y: 0, z: 20.0, length: yt, height: ie, thickness: 0.38,
  doorWidth: 5.2, doorHeight: 4.0, rotY: 0,
  wallColor: "#F3EBDD", trimColor: "#C6A56B",
  signText: "PHÒNG TRANH LỊCH SỬ – DẤU ẤN MIỀN NAM 1961–1965"
});
$.add(gateWall);

// Đôi cột cổ điển La Mã - Hy Lạp đón khách tại cổng
$.add(createClassicalColumn({ x: -3.4, y: 0, z: 21.2, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: 3.4, y: 0, z: 21.2, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: -3.4, y: 0, z: 18.8, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: 3.4, y: 0, z: 18.8, height: ie, radius: 0.34 }));

// Thảm đỏ danh dự dẫn vào cổng
const redCarpet = new I(new Yt(3.2, 8.5), new X({ color: "#8c1d18", roughness: 0.88 }));
redCarpet.rotation.x = -Math.PI / 2;
redCarpet.position.set(0, 0.008, 22.5);
$.add(redCarpet);

// 2 Đèn rọi đỉnh cổng vàng champagne
const gateSpotL = new sa("#FFF1D6", 2.2, 10, Math.PI / 4, 0.3);
gateSpotL.position.set(-2.5, ie - 0.4, 23.5);
gateSpotL.target.position.set(0, 2.5, 20);
$.add(gateSpotL);
$.add(gateSpotL.target);

const gateSpotR = new sa("#FFF1D6", 2.2, 10, Math.PI / 4, 0.3);
gateSpotR.position.set(2.5, ie - 0.4, 23.5);
gateSpotR.target.position.set(0, 2.5, 20);
$.add(gateSpotR);
$.add(gateSpotR.target);

// Tranh dẫn nhập hai bên sảnh đón
const introPhotos = [
  { img: "public/assets/doi-ap-bac/anh-khu-1/1. DIỆM - TỔNG THỐNG CON RỐI.jpg", title: "Bối Cảnh Lịch Sử: Chính Quyền Ngô Đình Diệm", pos: [-8.5, 2.4, 22.8], rotY: 0 },
  { img: "public/assets/doi-ap-bac/anh-khu-1/3. QUÂN ĐỘI SÀI GÒN CÀN QUÉT.jpg", title: "Quân Đội Sài Gòn Mở Các Cuộc Hành Quân Càn Quét", pos: [8.5, 2.4, 22.8], rotY: 0 }
];
introPhotos.forEach(pData => {
  const frame = createMuseumWallFrame({
    x: pData.pos[0], y: pData.pos[1], z: pData.pos[2], rotY: pData.rotY,
    width: 2.4, height: 1.55, imageUrl: pData.img, title: pData.title,
    onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
    artifact: {
      id: "art-gate-" + pData.title,
      title: pData.title,
      year: "1961",
      description: "Tư liệu mở đầu phản ánh âm mưu của Mỹ khi dựng lên chính quyền tay sai Ngô Đình Diệm nhằm chia cắt lâu dài đất nước ta.",
      imageUrl: pData.img,
      category: "Ảnh tư liệu",
      verified: true
    }
  });
  $.add(frame);
});

// =========================================================================
// PHÂN KHU 2: BÀN SA BÀN HOLOGRAM CHẠM TAY TƯƠNG TÁC 3D (Center: X = 0, Z = 9.5)
// =========================================================================
const dioramaDaisW = 5.8, dioramaDaisD = 4.8, dioramaDaisH = 0.74;
const dioramaGroup = new It();
dioramaGroup.position.set(0, 0, 9.5);

// 1. Khối bệ sa bàn chính: Nâu gỗ óc chó cao cấp (#261a12 & #806044)
const daisBase = new I(new Z(dioramaDaisW, dioramaDaisH, dioramaDaisD), new X({ color: "#261a12", roughness: 0.38, metalness: 0.12 }));
daisBase.position.y = dioramaDaisH / 2;
daisBase.castShadow = true; daisBase.receiveShadow = true;
dioramaGroup.add(daisBase);

// Chân đế mạ vàng champagne (#C6A56B)
const daisFoot = new I(new Z(dioramaDaisW + 0.12, 0.08, dioramaDaisD + 0.12), new X({ color: "#C6A56B", metalness: 0.90, roughness: 0.18 }));
daisFoot.position.y = 0.04;
dioramaGroup.add(daisFoot);

// 2. Viền phát sáng Neon Cyan quanh mặt bàn (#00f0ff)
const tableGlowMat = new X({ color: "#00f0ff", emissive: new re("#00f0ff"), emissiveIntensity: 2.5, roughness: 0.1, metalness: 0.5 });
const stripH = 0.035, stripThick = 0.04;

const ledFront = new I(new Z(dioramaDaisW + 0.02, stripH, stripThick), tableGlowMat);
ledFront.position.set(0, dioramaDaisH, dioramaDaisD / 2);
dioramaGroup.add(ledFront);

const ledBack = new I(new Z(dioramaDaisW + 0.02, stripH, stripThick), tableGlowMat);
ledBack.position.set(0, dioramaDaisH, -dioramaDaisD / 2);
dioramaGroup.add(ledBack);

const ledLeft = new I(new Z(stripThick, stripH, dioramaDaisD + 0.02), tableGlowMat);
ledLeft.position.set(-dioramaDaisW / 2, dioramaDaisH, 0);
dioramaGroup.add(ledLeft);

const ledRight = new I(new Z(stripThick, stripH, dioramaDaisD + 0.02), tableGlowMat);
ledRight.position.set(dioramaDaisW / 2, dioramaDaisH, 0);
dioramaGroup.add(ledRight);

// 3. Mặt kính cường lực trong suốt phản chiếu nhẹ
const glassTopMat = new X({ color: "#e0f7fa", transparent: true, opacity: 0.20, roughness: 0.05, metalness: 0.15 });
const glassTop = new I(new Z(dioramaDaisW, 0.02, dioramaDaisD), glassTopMat);
glassTop.position.y = dioramaDaisH + 0.015;
dioramaGroup.add(glassTop);

// 4. Lưới tọa độ chiến trường & Mạch Hologram dưới kính
const holoGridCanvas = document.createElement("canvas");
holoGridCanvas.width = 1024; holoGridCanvas.height = 1024;
const hgctx = holoGridCanvas.getContext("2d");
if (hgctx) {
  hgctx.fillStyle = "#020814"; hgctx.fillRect(0, 0, 1024, 1024);
  hgctx.strokeStyle = "rgba(0, 240, 255, 0.25)"; hgctx.lineWidth = 1.5;
  for (let i = 40; i < 1024; i += 60) {
    hgctx.beginPath(); hgctx.moveTo(i, 0); hgctx.lineTo(i, 1024); hgctx.stroke();
    hgctx.beginPath(); hgctx.moveTo(0, i); hgctx.lineTo(1024, i); hgctx.stroke();
  }
  hgctx.strokeStyle = "rgba(0, 240, 255, 0.4)"; hgctx.lineWidth = 2.5;
  hgctx.beginPath(); hgctx.arc(512, 512, 420, 0, Math.PI * 2); hgctx.stroke();
  hgctx.beginPath(); hgctx.arc(512, 512, 260, 0, Math.PI * 2); hgctx.stroke();
  hgctx.beginPath(); hgctx.arc(512, 512, 120, 0, Math.PI * 2); hgctx.stroke();
  hgctx.strokeStyle = "#00f0ff"; hgctx.lineWidth = 5;
  hgctx.strokeRect(30, 30, 964, 964);
  hgctx.fillStyle = "#00f0ff"; hgctx.font = 'bold 24px "Be Vietnam Pro", monospace';
  hgctx.fillText("TACTICAL GRID // TỌA ĐỘ CHIẾN TRƯỜNG ẤP BẮC: 10°24'N 106°10'E", 60, 70);
  hgctx.fillText("VĨ TUYẾN 17: 17°00'N 107°06'E // HỆ THỐNG HOLOGRAM ĐỘI ẤP BẮC", 60, 980);
}
const holoGridTex = new Pe(holoGridCanvas);
const holoGridPlane = new I(new Yt(dioramaDaisW - 0.08, dioramaDaisD - 0.08), new Se({ map: holoGridTex, side: Xe, transparent: true, opacity: 0.65 }));
holoGridPlane.rotation.x = -Math.PI / 2;
holoGridPlane.position.y = dioramaDaisH + 0.005;
dioramaGroup.add(holoGridPlane);

// 5. Bảng đồng khắc tên sa bàn phía trước đón khách
const dioramaPlaqueCanvas = document.createElement("canvas");
dioramaPlaqueCanvas.width = 1024; dioramaPlaqueCanvas.height = 256;
const dpctx = dioramaPlaqueCanvas.getContext("2d");
if (dpctx) {
  dpctx.fillStyle = "#030c1e"; dpctx.fillRect(0, 0, 1024, 256);
  dpctx.strokeStyle = "#00f0ff"; dpctx.lineWidth = 6; dpctx.strokeRect(10, 10, 1004, 236);
  dpctx.fillStyle = "#38bdf8"; dpctx.font = 'bold 42px "Cinzel", serif'; dpctx.textAlign = "center";
  dpctx.fillText("BÀN SA BÀN HOLOGRAM 3D TƯƠNG TÁC ĐỘC LẬP", 512, 85);
  dpctx.fillStyle = "#00f0ff"; dpctx.font = 'bold 28px "Be Vietnam Pro", sans-serif';
  dpctx.fillText("CHẠM TAY VÀO CÁC ĐIỂM SỰ KIỆN ĐỂ BẬT BẢNG HOLOGRAM NỔI", 512, 155);
  dpctx.fillStyle = "#e2e8f0"; dpctx.font = 'italic 22px "Be Vietnam Pro", sans-serif';
  dpctx.fillText("Tái hiện Diễn biến Trận Ấp Bắc & Phong trào Kháng chiến Miền Nam", 512, 210);
}
const dpTex = new Pe(dioramaPlaqueCanvas);
const dPlaqueMesh = new I(new Yt(3.6, 0.9), new Se({ map: dpTex, side: Xe }));
dPlaqueMesh.position.set(0, dioramaDaisH * 0.52, dioramaDaisD / 2 + 0.02);
dioramaGroup.add(dPlaqueMesh);

// 6. Lan can kính bảo vệ quanh sa bàn với 4 trụ góc vàng champagne
const railMat = new X({ color: "#ffffff", transparent: true, opacity: 0.20, roughness: 0.04, metalness: 0.1 });
const postMat = new X({ color: "#C6A56B", metalness: 0.90, roughness: 0.20 });

const rZ1 = new I(new Z(dioramaDaisW + 0.04, 0.45, 0.02), railMat);
rZ1.position.set(0, dioramaDaisH + 0.225, dioramaDaisD / 2 + 0.02);
dioramaGroup.add(rZ1);

const rZ2 = new I(new Z(dioramaDaisW + 0.04, 0.45, 0.02), railMat);
rZ2.position.set(0, dioramaDaisH + 0.225, -dioramaDaisD / 2 - 0.02);
dioramaGroup.add(rZ2);

const rX1 = new I(new Z(0.02, 0.45, dioramaDaisD + 0.04), railMat);
rX1.position.set(-dioramaDaisW / 2 - 0.02, dioramaDaisH + 0.225, 0);
dioramaGroup.add(rX1);

const rX2 = new I(new Z(0.02, 0.45, dioramaDaisD + 0.04), railMat);
rX2.position.set(dioramaDaisW / 2 + 0.02, dioramaDaisH + 0.225, 0);
dioramaGroup.add(rX2);

[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
  const post = new I(new Rt(0.025, 0.025, 0.48, 16), postMat);
  post.position.set(sx * (dioramaDaisW / 2 + 0.02), dioramaDaisH + 0.24, sz * (dioramaDaisD / 2 + 0.02));
  dioramaGroup.add(post);
});

// =========================================================================
// 7. HAI BẢNG ĐIỀU KHIỂN CẢM ỨNG CẠNH BÀN (DUAL CONTROL CONSOLES)
// =========================================================================
// Console bên trái: Điều khiển Âm Thanh & Lời Dẫn
const leftConsoleGroup = new It();
leftConsoleGroup.position.set(-3.7, 0, 0);
const leftConsoleBase = new I(new Z(0.72, 0.85, 0.48), new X({ color: "#261a12", roughness: 0.4 }));
leftConsoleBase.position.y = 0.425;
leftConsoleGroup.add(leftConsoleBase);
const leftConsoleTrim = new I(new Z(0.76, 0.04, 0.52), new X({ color: "#C6A56B", metalness: 0.9 }));
leftConsoleTrim.position.y = 0.85;
leftConsoleGroup.add(leftConsoleTrim);

const leftConsoleCanvas = document.createElement("canvas");
leftConsoleCanvas.width = 512; leftConsoleCanvas.height = 360;
const lcctx = leftConsoleCanvas.getContext("2d");
if (lcctx) {
  lcctx.fillStyle = "#030c1e"; lcctx.fillRect(0, 0, 512, 360);
  lcctx.strokeStyle = "#00f0ff"; lcctx.lineWidth = 4; lcctx.strokeRect(6, 6, 500, 348);
  lcctx.fillStyle = "#00f0ff"; lcctx.font = 'bold 24px "Be Vietnam Pro", sans-serif'; lcctx.textAlign = "center";
  lcctx.fillText("🎧 ĐIỀU KHIỂN ÂM THANH & LỜI DẪN", 256, 45);

  lcctx.fillStyle = "rgba(2, 132, 199, 0.6)"; lcctx.fillRect(20, 75, 472, 60);
  lcctx.strokeStyle = "#38bdf8"; lcctx.strokeRect(20, 75, 472, 60);
  lcctx.fillStyle = "#ffffff"; lcctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
  lcctx.fillText("▶ PHÁT LỜI DẪN TỰ ĐỘNG", 256, 112);

  lcctx.fillStyle = "rgba(220, 38, 38, 0.5)"; lcctx.fillRect(20, 150, 472, 60);
  lcctx.strokeStyle = "#f87171"; lcctx.strokeRect(20, 150, 472, 60);
  lcctx.fillStyle = "#ffffff";
  lcctx.fillText("⏸ TẠM DỪNG THUYẾT MINH", 256, 187);

  lcctx.fillStyle = "rgba(16, 185, 129, 0.5)"; lcctx.fillRect(20, 225, 472, 60);
  lcctx.strokeStyle = "#34d399"; lcctx.strokeRect(20, 225, 472, 60);
  lcctx.fillStyle = "#ffffff";
  lcctx.fillText("📱 MÃ QR ĐỒNG BỘ ĐIỆN THOẠI", 256, 262);

  lcctx.fillStyle = "#94a3b8"; lcctx.font = 'italic 16px "Be Vietnam Pro", sans-serif';
  lcctx.fillText("Nhấn vào bảng để điều khiển âm thanh", 256, 325);
}
const leftConsoleTex = new Pe(leftConsoleCanvas);
const leftConsoleScreen = new I(new Yt(0.68, 0.44), new Se({ map: leftConsoleTex, side: Xe }));
leftConsoleScreen.rotation.x = -Math.PI / 4;
leftConsoleScreen.position.set(0, 0.98, 0.05);
leftConsoleGroup.add(leftConsoleScreen);

cn.current.push({
  mesh: leftConsoleScreen,
  type: "console-audio",
  label: "🎧 Bảng Điều Khiển Âm Thanh & Lời Dẫn"
});
dioramaGroup.add(leftConsoleGroup);

// Console bên phải: Điều khiển Đa Phương Tiện & Video Tư Liệu
const rightConsoleGroup = new It();
rightConsoleGroup.position.set(3.7, 0, 0);
const rightConsoleBase = new I(new Z(0.72, 0.85, 0.48), new X({ color: "#261a12", roughness: 0.4 }));
rightConsoleBase.position.y = 0.425;
rightConsoleGroup.add(rightConsoleBase);
const rightConsoleTrim = new I(new Z(0.76, 0.04, 0.52), new X({ color: "#C6A56B", metalness: 0.9 }));
rightConsoleTrim.position.y = 0.85;
rightConsoleGroup.add(rightConsoleTrim);

const rightConsoleCanvas = document.createElement("canvas");
rightConsoleCanvas.width = 512; rightConsoleCanvas.height = 360;
const rcctx = rightConsoleCanvas.getContext("2d");
if (rcctx) {
  rcctx.fillStyle = "#030c1e"; rcctx.fillRect(0, 0, 512, 360);
  rcctx.strokeStyle = "#00f0ff"; rcctx.lineWidth = 4; rcctx.strokeRect(6, 6, 500, 348);
  rcctx.fillStyle = "#00f0ff"; rcctx.font = 'bold 24px "Be Vietnam Pro", sans-serif'; rcctx.textAlign = "center";
  rcctx.fillText("🎬 ĐA PHƯƠNG TIỆN & TƯ LIỆU SA BÀN", 256, 45);

  rcctx.fillStyle = "rgba(185, 28, 28, 0.6)"; rcctx.fillRect(20, 75, 472, 60);
  rcctx.strokeStyle = "#ef4444"; rcctx.strokeRect(20, 75, 472, 60);
  rcctx.fillStyle = "#ffffff"; rcctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
  rcctx.fillText("🎬 PHIM TƯ LIỆU ẤP BẮC (03:13)", 256, 112);

  rcctx.fillStyle = "rgba(217, 119, 6, 0.6)"; rcctx.fillRect(20, 150, 472, 60);
  rcctx.strokeStyle = "#f59e0b"; rcctx.strokeRect(20, 150, 472, 60);
  rcctx.fillStyle = "#ffffff";
  rcctx.fillText("🖼️ THƯ VIỆN ẢNH CHIẾN TRƯỜNG", 256, 187);

  rcctx.fillStyle = "rgba(14, 165, 233, 0.4)"; rcctx.fillRect(20, 225, 472, 85);
  rcctx.strokeStyle = "#00f0ff"; rcctx.strokeRect(20, 225, 472, 85);
  rcctx.fillStyle = "#e0faff"; rcctx.font = 'bold 16px "Be Vietnam Pro", sans-serif';
  rcctx.fillText("💡 HƯỚNG DẪN TƯƠNG TÁC:", 256, 252);
  rcctx.fillStyle = "#38bdf8"; rcctx.font = '15px "Be Vietnam Pro", sans-serif';
  rcctx.fillText("Chạm vào các điểm sáng trên sa bàn", 256, 276);
  rcctx.fillText("để kích hoạt Hologram 3D!", 256, 298);
}
const rightConsoleTex = new Pe(rightConsoleCanvas);
const rightConsoleScreen = new I(new Yt(0.68, 0.44), new Se({ map: rightConsoleTex, side: Xe }));
rightConsoleScreen.rotation.x = -Math.PI / 4;
rightConsoleScreen.position.set(0, 0.98, 0.05);
rightConsoleGroup.add(rightConsoleScreen);

cn.current.push({
  mesh: rightConsoleScreen,
  type: "console-media",
  label: "🎬 Bảng Điều Khiển Tư Liệu: Phim & Ảnh Sa Bàn"
});
dioramaGroup.add(rightConsoleGroup);

// =========================================================================
// 8. KHỞI TẠO NỘI DUNG SA BÀN 3D & HỆ THỐNG VÒNG SÓNG SONAR
// =========================================================================
const hologramPulsingRings = [];
const hologramRipples = [];

window.__triggerHoloRipple = function(wx, wz) {
  try {
    const ripMat = new Se({ color: "#00f0ff", transparent: true, opacity: 0.9, side: Xe });
    const ripGeom = new Xi(0.04, 0.09, 32);
    const ripMesh = new I(ripGeom, ripMat);
    ripMesh.rotation.x = -Math.PI / 2;
    ripMesh.position.set(wx, dioramaDaisH + 0.025, wz - 9.5);
    dioramaGroup.add(ripMesh);
    hologramRipples.push({ mesh: ripMesh, startR: 0.1, endR: 1.2, age: 0, maxAge: 1.1 });
  } catch (e) {
    console.warn("Lỗi hiệu ứng sóng Hologram:", e);
  }
};

try {
  const Hb = typeof KN === "function" ? KN(e.id) : null;
  const xa = Hb && typeof XN === "function" ? XN(Hb, u.current) : null;
  if (xa && xa.group) {
    xa.group.position.set(0, dioramaDaisH + 0.02, 0);
    dioramaGroup.add(xa.group);
    Rn.current = xa;

    // Bổ sung vòng sáng Sonar Radar cho từng mốc sự kiện
    if (xa.interactiveMarkers) {
      xa.interactiveMarkers.forEach(Q => {
        cn.current.push({
          mesh: Q.mesh,
          type: "diorama-marker",
          label: `Mốc sự kiện: ${Q.marker.title} (${Q.marker.year})`,
          dioramaMarker: Q.marker
        });

        if (Q.marker && Q.marker.position) {
          const [mx, my, mz] = Q.marker.position;
          const ringMat = new Se({ color: "#00f0ff", transparent: true, opacity: 0.75, side: Xe });
          const ringGeom = new Xi(0.09, 0.13, 24);
          const ringMesh = new I(ringGeom, ringMat);
          ringMesh.rotation.x = -Math.PI / 2;
          ringMesh.position.set(mx, my + 0.01, mz);
          xa.group.add(ringMesh);
          hologramPulsingRings.push({ mesh: ringMesh, phase: Math.random() * Math.PI * 2 });
        }
      });
    }
  }
} catch (err) {
  console.warn("Khởi tạo sa bàn 3D:", err);
}

$.add(dioramaGroup);

// Hệ đèn rọi ấm áp cho sa bàn độc lập từ trần
const dioramaSpot1 = new sa("#FFF5E4", 2.8, 12, Math.PI / 4, 0.4);
dioramaSpot1.position.set(0, ie - 0.2, 9.5);
dioramaSpot1.target.position.set(0, dioramaDaisH, 9.5);
$.add(dioramaSpot1);
$.add(dioramaSpot1.target);

const dioramaSpot2 = new sa("#00f0ff", 1.2, 10, Math.PI / 3.5, 0.6);
dioramaSpot2.position.set(-2.0, ie - 0.3, 11.5);
dioramaSpot2.target.position.set(0, dioramaDaisH, 9.5);
$.add(dioramaSpot2);
$.add(dioramaSpot2.target);

// Cột trang trí hành lang 2 bên sa bàn (Đá be kem #F3EBDD & Vàng champagne #C6A56B)
$.add(createClassicalColumn({ x: -4.8, y: 0, z: 14.5, height: ie, radius: 0.32 }));
$.add(createClassicalColumn({ x: 4.8, y: 0, z: 14.5, height: ie, radius: 0.32 }));
$.add(createClassicalColumn({ x: -4.8, y: 0, z: 4.5, height: ie, radius: 0.32 }));
$.add(createClassicalColumn({ x: 4.8, y: 0, z: 4.5, height: ie, radius: 0.32 }));

// Đăng ký hiệu ứng hoạt họa thời gian thực vào ga.current
const prevGa = ga.current;
ga.current = (time) => {
  if (prevGa) prevGa(time);
  if (tableGlowMat) {
    tableGlowMat.emissiveIntensity = 2.0 + Math.sin(time * 3.5) * 0.8;
  }
  for (let i = 0; i < hologramPulsingRings.length; i++) {
    const item = hologramPulsingRings[i];
    const s = 1.0 + Math.sin(time * 3.2 + item.phase) * 0.25;
    item.mesh.scale.set(s, s, 1);
    if (item.mesh.material) {
      item.mesh.material.opacity = 0.45 + Math.cos(time * 3.2 + item.phase) * 0.35;
    }
  }
  for (let j = hologramRipples.length - 1; j >= 0; j--) {
    const rip = hologramRipples[j];
    rip.age += 0.016;
    const progress = rip.age / rip.maxAge;
    if (progress >= 1.0) {
      if (rip.mesh.parent) rip.mesh.parent.remove(rip.mesh);
      hologramRipples.splice(j, 1);
    } else {
      const curScale = rip.startR + (rip.endR - rip.startR) * progress;
      rip.mesh.scale.set(curScale, curScale, 1);
      if (rip.mesh.material) {
        rip.mesh.material.opacity = (1.0 - progress) * 0.85;
      }
    }
  }
};
// =========================================================================
// PHÂN KHU 3: KHU TRƯNG BÀY SỐ 1 (Phòng Tây: X in [-28, -10], Z in [3, 16])
// TÊN: ÂM MƯU VÀ THỦ ĐOẠN CỦA MỸ TRONG CHIẾN LƯỢC CHIẾN TRANH ĐẶC BIỆT
// =========================================================================
const khu1EastWall = createMuseumWallWithDoor({
  x: -10, y: 0, z: 9.5, length: 13, height: ie, thickness: 0.32,
  doorWidth: 3.2, doorHeight: 3.6, rotY: Math.PI / 2,
  wallColor: "#F3EBDD", trimColor: "#C6A56B",
  signText: "KHU TRƯNG BÀY SỐ 1: ÂM MƯU & THỦ ĐOẠN CỦA MỸ"
});
$.add(khu1EastWall);

// Tường ngăn Bắc & Nam Khu 1
$.add(createSolidMuseumWall({ x: -19, y: 0, z: 3, length: 18, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));
$.add(createSolidMuseumWall({ x: -19, y: 0, z: 16, length: 18, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));

// Bảng tiêu đề đỏ chữ vàng trang trọng trong Khu 1 (Tường Bắc)
const khu1TitleCanvas = document.createElement("canvas");
khu1TitleCanvas.width = 1024; khu1TitleCanvas.height = 180;
const k1ctx = khu1TitleCanvas.getContext("2d");
if (k1ctx) {
  k1ctx.fillStyle = "#8c1d18"; k1ctx.fillRect(0, 0, 1024, 180);
  k1ctx.strokeStyle = "#C6A56B"; k1ctx.lineWidth = 6; k1ctx.strokeRect(8, 8, 1008, 164);
  k1ctx.fillStyle = "#fef08a"; k1ctx.font = 'bold 36px "Cinzel", serif'; k1ctx.textAlign = "center";
  k1ctx.fillText("KHU TRƯNG BÀY SỐ 1", 512, 65);
  k1ctx.fillStyle = "#ffffff"; k1ctx.font = 'bold 26px "Be Vietnam Pro", sans-serif';
  k1ctx.fillText("ÂM MƯU & THỦ ĐOẠN CỦA ĐẾ QUỐC MỸ (1961–1965)", 512, 125);
}
const k1Tex = new Pe(khu1TitleCanvas);
const k1TitleMesh = new I(new Yt(6.2, 1.1), new Se({ map: k1Tex, side: Xe }));
k1TitleMesh.position.set(-19, 4.3, 3.2);
$.add(k1TitleMesh);

// --- 4 TỦ KÍNH KHÍ TÀI: CHÂN NÂU GỖ ÓC CHÓ #806044, VIỀN VÀNG CHAMPAGNE #C6A56B ---
// Tủ 1: Trực thăng vận (CH-21 Shawnee)
$.add(createMuseumVitrine({
  x: -23.0, y: 0.08, z: 12.5, rotY: Math.PI / 6, width: 1.25, depth: 1.25, height: 2.1,
  title: "Trực thăng vận (CH-21 Shawnee)",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/TRỰC THĂNG VẬN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-tructhangvan",
    title: "Chiến thuật Trực thăng vận & Mô hình CH-21 Shawnee",
    year: "1962",
    description: "Chiến thuật cơ động đường không hiện đại bậc nhất của quân đội Mỹ thời bấy giờ, dùng trực thăng chở quân đổ thẳng xuống phía sau trận địa đối phương.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/TRỰC THĂNG VẬN.jfif",
    category: "Vũ khí & Chiến thuật",
    verified: true
  }
}));

// Tủ 2: Thiết xa vận (M113 APC)
$.add(createMuseumVitrine({
  x: -19.0, y: 0.08, z: 13.5, rotY: 0, width: 1.25, depth: 1.25, height: 2.1,
  title: "Thiết xa vận (Mô hình M113)",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/THIẾT XA VẬN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-thietxavan",
    title: "Chiến thuật Thiết xa vận & Xe bọc thép M113",
    year: "1962",
    description: "Xe bọc thép lội nước M113 được trang bị đại liên, có khả năng vượt đầm lầy sông rạch miền Tây, từng được coi là nỗi khiếp sợ trước khi bị bắn cháy hàng loạt tại Ấp Bắc.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/THIẾT XA VẬN.jfif",
    category: "Vũ khí & Chiến thuật",
    verified: true
  }
}));

// Tủ 3: Xe tăng M48 Patton
$.add(createMuseumVitrine({
  x: -15.0, y: 0.08, z: 12.5, rotY: -Math.PI / 6, width: 1.25, depth: 1.25, height: 2.1,
  title: "Mô hình xe tăng M48 Patton",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/Mô hình xe tăng M48 Patton trưng bày.png",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-m48-patton",
    title: "Mô hình Xe Tăng Hạng Trung M48 Patton Trưng Bày",
    year: "1962",
    description: "Xe tăng chiến đấu chủ lực với hỏa lực pháo hạng nặng do Mỹ viện trợ cho quân đội Sài Gòn nhằm yểm trợ các chiến dịch càn quét quy mô lớn.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/Mô hình xe tăng M48 Patton trưng bày.png",
    category: "Khí tài quân sự",
    verified: true
  }
}));

// Tủ 4: Sa bàn Ấp chiến lược thu nhỏ
$.add(createMuseumVitrine({
  x: -14.5, y: 0.08, z: 7.2, rotY: -Math.PI / 4, width: 1.35, depth: 1.35, height: 2.1,
  title: "Sa bàn Ấp chiến lược",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/SA BÀN ẤP CHIẾN LƯỢC.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-ap-chien-luoc",
    title: "Mô hình Hiện vật Sa Bàn Ấp Chiến Lược",
    year: "1961–1963",
    description: "Ấp chiến lược được coi là 'xương sống' của Chiến tranh đặc biệt, nhằm dồn dân, tách nhân dân ra khỏi lực lượng cách mạng, biến miền Nam thành trại tập trung khổng lồ.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-1/SA BÀN ẤP CHIẾN LƯỢC.jfif",
    category: "Hiện vật chiến thuật",
    verified: true
  }
}));

// Ảnh tư liệu tường Tây Khu 1
const westFrames = [
  { img: "public/assets/doi-ap-bac/anh-khu-1/4. CỐ VẤN QUÂN SỰ MỸ.jpg", title: "Cố Vấn Quân Sự Mỹ Huấn Luyện", pos: [-27.84, 2.5, 6.5], rotY: Math.PI / 2 },
  { img: "public/assets/doi-ap-bac/anh-khu-1/5. ĐẠI SỨ MỸ TAYLOR.jpg", title: "Đại Sứ Maxwell Taylor", pos: [-27.84, 2.5, 10.2], rotY: Math.PI / 2 },
  { img: "public/assets/doi-ap-bac/anh-khu-1/6. QUÂN ĐỘI SÀI GÒN HUẤN LUYỆN.jfif", title: "Quân Đội Sài Gòn Tập Trận Càn Quét", pos: [-27.84, 2.5, 13.8], rotY: Math.PI / 2 }
];
westFrames.forEach(pData => {
  const frame = createMuseumWallFrame({
    x: pData.pos[0], y: pData.pos[1], z: pData.pos[2], rotY: pData.rotY,
    width: 2.2, height: 1.45, imageUrl: pData.img, title: pData.title,
    onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
    artifact: {
      id: "art-photo-" + pData.title,
      title: pData.title,
      year: "1961–1963",
      description: "Tư liệu ảnh lịch sử gốc chứng minh âm mưu và sự can thiệp trực tiếp của Mỹ trong chiến lược Chiến tranh đặc biệt.",
      imageUrl: pData.img,
      category: "Ảnh tư liệu",
      verified: true
    }
  });
  $.add(frame);
});

// Bàn kính trung tâm trưng bày Kế hoạch Staley - Taylor (Gỗ óc chó #806044 viền vàng champagne #C6A56B)
const tableStaley = createFramedMuseumTable({
  x: -20.5, y: 0, z: 8.5, width: 2.4, depth: 1.2, height: 0.82,
  title: "Tài liệu Kế hoạch Staley - Taylor (1961–1963)",
  docImage: "public/assets/doi-ap-bac/anh-khu-1/2. CHIẾN TRANH ĐẶC BIỆT CỦA MỸ.jpg",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  docArtifact: {
    id: "art-staley-taylor",
    title: "Kế hoạch Staley - Taylor (Bình định miền Nam trong 18 tháng)",
    year: "1961",
    description: "Kế hoạch quân sự do tiến sĩ kinh tế Staley và Tướng Taylor soạn thảo, chia làm 3 giai đoạn nhằm bình định miền Nam, thiết lập ấp chiến lược và phong tỏa biên giới.",
    imageUrl: "public/assets/doi-ap-bac/anh-khu-1/2. CHIẾN TRANH ĐẶC BIỆT CỦA MỸ.jpg",
    category: "Văn kiện lịch sử",
    verified: true
  }
});
$.add(tableStaley.group);

// =========================================================================
// PHÂN KHU 4: HÀNH LANG CHUYỂN TIẾP 1 -> 2 (Lối đi ngắm cảnh)
// =========================================================================
const signMesh12 = new I(
  new Yt(3.2, 0.45),
  new Se({
    map: (() => {
      const cv = document.createElement("canvas"); cv.width = 512; cv.height = 96;
      const cx = cv.getContext("2d");
      if (cx) {
        cx.fillStyle = "#1e180d"; cx.fillRect(0, 0, 512, 96);
        cx.strokeStyle = "#C6A56B"; cx.lineWidth = 4; cx.strokeRect(4, 4, 504, 88);
        cx.fillStyle = "#FEF08A"; cx.font = 'bold 26px "Be Vietnam Pro", sans-serif'; cx.textAlign = "center";
        cx.fillText("HÀNH LANG SANG KHU 2: PHÒNG CHIẾU PHIM ➜", 256, 56);
      }
      return new Pe(cv);
    })(),
    side: Xe
  })
);
signMesh12.position.set(-2.5, 3.2, 9.5);
signMesh12.rotation.y = -Math.PI / 2;
$.add(signMesh12);

// =========================================================================
// PHÂN KHU 5: KHU TRƯNG BÀY SỐ 2 – PHÒNG CHIẾU PHIM TƯ LIỆU
// (Phòng Đông: X in [10, 28], Z in [3, 16] - Tường Be Kem Sáng & Tiêu Âm Sang Trọng)
// =========================================================================
const khu2WestWall = createMuseumWallWithDoor({
  x: 10, y: 0, z: 9.5, length: 13, height: ie, thickness: 0.32,
  doorWidth: 3.2, doorHeight: 3.6, rotY: -Math.PI / 2,
  wallColor: "#F3EBDD", trimColor: "#C6A56B",
  signText: "KHU TRƯNG BÀY SỐ 2: PHÒNG CHIẾU PHIM TƯ LIỆU"
});
$.add(khu2WestWall);

// Tường ngăn cách âm rạp chiếu phim (Be kem sáng #F3EBDD & Phào chỉ vàng champagne #C6A56B)
$.add(createSolidMuseumWall({ x: 19, y: 0, z: 3, length: 18, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));
$.add(createSolidMuseumWall({ x: 19, y: 0, z: 16, length: 18, height: ie, wallColor: "#F3EBDD", trimColor: "#C6A56B" }));

// Mảng ốp gỗ tiêu âm màu be sẫm ấm áp (#CBB89B) viền vàng champagne trên tường Bắc & Nam
const acousticMat = new X({ color: "#CBB89B", roughness: 0.55, metalness: 0.05 });
[-1, 1].forEach(side => {
  const panelZ = 9.5 + side * 6.3;
  for (let px = 13; px <= 25; px += 4) {
    const acPanel = new I(new Z(3.2, 2.6, 0.08), acousticMat);
    acPanel.position.set(px, 2.8, panelZ);
    $.add(acPanel);

    const acTrim = new I(new Z(3.24, 2.64, 0.02), new X({ color: "#C6A56B", metalness: 0.88, roughness: 0.22 }));
    acTrim.position.set(px, 2.8, panelZ - side * 0.04);
    $.add(acTrim);
  }
});

// Sàn rạp chiếu phim đá greige marble kết hợp thảm sảnh
const floorKhu2Mat = new X({ color: "#C9C2B5", roughness: 0.65, metalness: 0.08 });
const floorKhu2 = new I(new Yt(17.8, 12.8), floorKhu2Mat);
floorKhu2.rotation.x = -Math.PI / 2;
floorKhu2.position.set(19, 0.018, 9.5);
$.add(floorKhu2);

// BÀN ĐIỀU KHIỂN & TÍCH HỢP VIDEO (oI) ĐẶT GỌN GÀNG Ở GÓC PHÍA BẮC (x: 21, z: 4.2)
const i0 = oI({
  x: 21.0, y: 0.02, z: 4.2, rotY: 0,
  onRegisterInteractive: (Q, bt, zt) => {
    cn.current.push({
      mesh: Q,
      type: zt === "table-toggle" ? "table-elevate" : "screen-video",
      label: bt
    });
  },
  onStateChange: Q => {
    q(Q);
  }
});
$.add(i0.group);
qe.current = i0;

// MÀN HÌNH CHIẾU PHIM TƯ LIỆU KHỔNG LỒ TRÊN TƯỜNG ĐÔNG (x = 27.84, Z = 9.5)
const cinemaProj = createWallCinemaProjection({
  x: 27.84, y: 2.7, z: 9.5, width: 7.6, height: 4.3, rotY: -Math.PI / 2,
  videoTexture: i0.videoTexture,
  title: "CHIẾN THẮNG ẤP BẮC (02/01/1963)",
  onRegisterInteractive: (mesh, lbl, typ) => {
    cn.current.push({ mesh, type: typ, label: lbl });
  }
});
$.add(cinemaProj.group);

// 2 HÀNG GHẾ RẠP CHIẾU PHIM MÀU MẬN CHÍN SANG TRỌNG QUAY VỀ MÀN HÌNH TƯỜNG ĐÔNG
const cinemaSeats1 = pI();
cinemaSeats1.position.set(16.5, 0.02, 9.5);
cinemaSeats1.rotation.y = -Math.PI / 2;
$.add(cinemaSeats1);

const cinemaSeats2 = pI();
cinemaSeats2.position.set(13.8, 0.02, 9.5);
cinemaSeats2.rotation.y = -Math.PI / 2;
$.add(cinemaSeats2);

// Đèn rọi trần rạp chiếu phim (Ánh sáng ấm êm dịu)
[14, 18, 22, 26].forEach(lx => {
  const cSpot = new sa("#FFE4B5", 1.4, 9, Math.PI / 4, 0.5);
  cSpot.position.set(lx, ie - 0.2, 9.5);
  cSpot.target.position.set(lx, 0, 9.5);
  $.add(cSpot);
  $.add(cSpot.target);
});

// =========================================================================
// PHÂN KHU 6: HÀNH LANG CHUYỂN TIẾP 2 -> 3 (Tiến vào Khu 3 Phía Bắc)
// =========================================================================
const portalKhu3 = createMuseumWallWithDoor({
  x: 0, y: 0, z: 1.5, length: yt, height: ie, thickness: 0.38,
  doorWidth: 5.6, doorHeight: 4.0, rotY: 0,
  wallColor: "#F3EBDD", trimColor: "#C6A56B",
  signText: "KHU TRƯNG BÀY SỐ 3: TỪ ẤP BẮC ĐẾN THẤT BẠI CỦA CHIẾN TRANH ĐẶC BIỆT"
});
$.add(portalKhu3);

$.add(createClassicalColumn({ x: -3.6, y: 0, z: 2.8, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: 3.6, y: 0, z: 2.8, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: -3.6, y: 0, z: 0.2, height: ie, radius: 0.34 }));
$.add(createClassicalColumn({ x: 3.6, y: 0, z: 0.2, height: ie, radius: 0.34 }));

// =========================================================================
// PHÂN KHU 7: KHU TRƯNG BÀY SỐ 3 (Đại sảnh Phía Bắc: Z in [-1.5, -26])
// TỪ ẤP BẮC ĐẾN THẤT BẠI HOÀN TOÀN CỦA CHIẾN TRANH ĐẶC BIỆT
// =========================================================================
// Bảng tiêu đề lớn của Khu 3
const khu3TitleCanvas = document.createElement("canvas");
khu3TitleCanvas.width = 1200; khu3TitleCanvas.height = 180;
const k3ctx = khu3TitleCanvas.getContext("2d");
if (k3ctx) {
  k3ctx.fillStyle = "#8c1d18"; k3ctx.fillRect(0, 0, 1200, 180);
  k3ctx.strokeStyle = "#C6A56B"; k3ctx.lineWidth = 6; k3ctx.strokeRect(8, 8, 1184, 164);
  k3ctx.fillStyle = "#fef08a"; k3ctx.font = 'bold 36px "Cinzel", serif'; k3ctx.textAlign = "center";
  k3ctx.fillText("KHU TRƯNG BÀY SỐ 3", 600, 65);
  k3ctx.fillStyle = "#ffffff"; k3ctx.font = 'bold 26px "Be Vietnam Pro", sans-serif';
  k3ctx.fillText("TỪ ẤP BẮC ĐẾN THẤT BẠI CỦA CHIẾN TRANH ĐẶC BIỆT (1963–1965)", 600, 125);
}
const k3Tex = new Pe(khu3TitleCanvas);
const k3TitleMesh = new I(new Yt(8.2, 1.25), new Se({ map: k3Tex, side: Xe }));
k3TitleMesh.position.set(0, 4.3, 1.2);
k3TitleMesh.rotation.y = Math.PI;
$.add(k3TitleMesh);

// 12 TỦ KÍNH CAO CẤP: CHÂN NÂU GỖ ÓC CHÓ #806044, VIỀN VÀNG CHAMPAGNE #C6A56B
// Tủ 1: Hòm đạn Mỹ và đạn đồng
$.add(createMuseumVitrine({
  x: -15.5, y: 0.08, z: -5.0, rotY: Math.PI / 4, width: 1.2, depth: 1.2, height: 2.05,
  title: "Hòm đạn quân dụng và vỏ đạn đồng",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HÒM ĐẠN MỸ VÀ ĐẠN ĐỒNG.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-hom-dan-dong",
    title: "Hòm Đạn Quân Dụng & Vỏ Đạn Đồng Trưng Bày",
    year: "1963",
    description: "Hòm đạn quân dụng bằng gỗ thông kiên cố và các vỏ đạn pháo chiến trường của quân giải phóng.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HÒM ĐẠN MỸ VÀ ĐẠN ĐỒNG.jfif",
    category: "Vũ khí & Đạn dược",
    verified: true
  }
}));

// Tủ 2: Hòm đạn quân dụng dã chiến
$.add(createMuseumVitrine({
  x: -19.5, y: 0.08, z: -9.5, rotY: Math.PI / 2, width: 1.2, depth: 1.2, height: 2.05,
  title: "Hòm đạn quân dụng dã chiến",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HÒM ĐẠN QUÂN DỤNG.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-hom-dan-quan-dung",
    title: "Hòm Đạn Dã Chiến Tiếp Tế Chiến Dịch",
    year: "1964",
    description: "Hòm đạn được các chiến sĩ dân công hỏa tuyến gùi bộ chi viện qua đường Trường Sơn.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HÒM ĐẠN QUÂN DỤNG.jfif",
    category: "Hậu cần & Chi viện",
    verified: true
  }
}));

// Tủ 3: Súng cối và đạn pháo lịch sử
$.add(createMuseumVitrine({
  x: -19.5, y: 0.08, z: -14.5, rotY: Math.PI / 2, width: 1.2, depth: 1.2, height: 2.05,
  title: "Súng cối và đạn pháo lịch sử",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/SÚNG CỐI VÀ ĐẠN PHÁO.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-sung-coi",
    title: "Súng Cối Dã Chiến & Đạn Pháo Chiến Đấu",
    year: "1963–1965",
    description: "Hỏa lực pháo binh tầm gần của các đội đặc công và bộ đội chủ lực giải phóng trong các trận đánh cứ điểm địch.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/SÚNG CỐI VÀ ĐẠN PHÁO.jfif",
    category: "Vũ khí hạng nặng",
    verified: true
  }
}));

// Tủ 4: Dây thép gai & Bàn chông tre
$.add(createMuseumVitrine({
  x: -15.5, y: 0.08, z: -19.0, rotY: Math.PI * 3 / 4, width: 1.2, depth: 1.2, height: 2.05,
  title: "Dây thép gai ấp chiến lược & Bàn chông",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/DÂY THÉP GAI.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-thep-gai",
    title: "Dây Thép Gai Phòng Tuyến Ấp Chiến Lược Bị Phá Bỏ",
    year: "1963–1964",
    description: "Hiện vật hàng rào kẽm gai bị quân dân ta cắt phá tan rã, đánh dấu sự thất bại của chiến lược dồn dân lập ấp.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/DÂY THÉP GAI.jfif",
    category: "Hiện vật chiến trường",
    verified: true
  }
}));

// Tủ 5 (Trung tâm Tây): Súng AK-47 lịch sử
$.add(createMuseumVitrine({
  x: -7.5, y: 0.08, z: -9.5, rotY: 0, width: 1.25, depth: 1.25, height: 2.1,
  title: "Súng AK-47 lịch sử",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/SÚNG AK.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-sung-ak",
    title: "Súng Tiểu Liên AK-47 Của Quân Giải Phóng",
    year: "1964",
    description: "Khẩu súng huyền thoại đã đồng hành cùng các chiến sĩ giải phóng trên mọi chiến trường khốc liệt.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/SÚNG AK.jfif",
    category: "Vũ khí bộ binh",
    verified: true
  }
}));

// Tủ 6 (Trung tâm Tây-Bắc): Mô hình Cầu Hiền Lương vĩ tuyến 17
$.add(createMuseumVitrine({
  x: -7.5, y: 0.08, z: -15.5, rotY: 0, width: 1.35, depth: 1.35, height: 2.1,
  title: "Mô hình Cầu Hiền Lương — Vĩ tuyến 17",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HIỆN VẬT KHÁNG CHIẾN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-cau-hien-luong",
    title: "Mô Hình Cầu Hiền Lương — Giới Tuyến Quân Sự Vĩ Tuyến 17",
    year: "1954–1975",
    description: "Cầu Hiền Lương bắc qua sông Bến Hải, chia đôi hai miền Nam - Bắc trong suốt hơn 20 năm kháng chiến.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/HIỆN VẬT KHÁNG CHIẾN.jfif",
    category: "Di tích lịch sử",
    verified: true
  }
}));

// Dãy Đông
// Tủ 7: Máy thông tin liên lạc PRC-25
$.add(createMuseumVitrine({
  x: 7.5, y: 0.08, z: -9.5, rotY: 0, width: 1.25, depth: 1.25, height: 2.1,
  title: "Máy thông tin liên lạc PRC-25",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/MÁY THÔNG TIN LIÊN LẠC.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-thong-tin",
    title: "Máy Bộ Đàm Vô Tuyến Điện Dã Chiến PRC-25",
    year: "1963",
    description: "Thiết bị thông tin liên lạc chỉ huy chiến dịch, đảm bảo mạch máu liên lạc giữa sở chỉ huy và tiền tuyến.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/MÁY THÔNG TIN LIÊN LẠC.jfif",
    category: "Khí tài thông tin",
    verified: true
  }
}));

// Tủ 8: Điện thoại hữu tuyến TA-312
$.add(createMuseumVitrine({
  x: 7.5, y: 0.08, z: -15.5, rotY: 0, width: 1.25, depth: 1.25, height: 2.1,
  title: "Điện thoại dã chiến trưng bày",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/ĐIỆN THOẠI DÃ CHIẾN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-dien-thoai",
    title: "Điện Thoại Hữu Tuyến Dã Chiến Tay Quay TA-312",
    year: "1962",
    description: "Phương tiện thông tin bí mật qua đường dây chôn ngầm hoặc vắt trên ngọn cây xuyên rừng sâu.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/ĐIỆN THOẠI DÃ CHIẾN.jfif",
    category: "Khí tài thông tin",
    verified: true
  }
}));

// Tủ 9: Mũ cối và khăn rằn Nam Bộ
$.add(createMuseumVitrine({
  x: 15.5, y: 0.08, z: -5.0, rotY: -Math.PI / 4, width: 1.2, depth: 1.2, height: 2.05,
  title: "Mũ tai bèo và khăn rằn",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/MŨ TAI BÈO VÀ KHĂN RẰN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-mu-khan",
    title: "Mũ Cối Ngôi Sao Vàng & Khăn Rằn Giải Phóng",
    year: "1961–1965",
    description: "Biểu tượng bất hủ của người chiến sĩ giải phóng quân miền Nam trên chiến trường đánh Mỹ.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/MŨ TAI BÈO VÀ KHĂN RẰN.jfif",
    category: "Quân trang & Kỷ vật",
    verified: true
  }
}));

// Tủ 10: Ba lô con cóc, bi đông và ca mèn
$.add(createMuseumVitrine({
  x: 19.5, y: 0.08, z: -9.5, rotY: -Math.PI / 2, width: 1.2, depth: 1.2, height: 2.05,
  title: "Ba lô, bi đông và ca mèn",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/BA LÔ VÀ BI ĐÔNG NƯỚC.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-balo-bidong",
    title: "Ba Lô Con Cóc, Bi Đông Nước & Ca Mèn Hành Quân",
    year: "1962",
    description: "Hành trang mộc mạc theo chân bộ đội giải phóng xẻ dọc Trường Sơn đi cứu nước.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/BA LÔ VÀ BI ĐÔNG NƯỚC.jfif",
    category: "Quân trang & Kỷ vật",
    verified: true
  }
}));

// Tủ 11: Bộ bà ba đen & Dép cao su
$.add(createMuseumVitrine({
  x: 19.5, y: 0.08, z: -14.5, rotY: -Math.PI / 2, width: 1.2, depth: 1.2, height: 2.05,
  title: "Trang phục chiến sĩ kháng chiến",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/TRANG PHỤC KHÁNG CHIẾN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-trang-phuc",
    title: "Bộ Bà Ba Đen & Đôi Dép Cao Su Lốp Xe Bác Hồ",
    year: "1960–1965",
    description: "Bộ quần áo bà ba giản dị và đôi dép lốp cao su gắn liền với các trận càn quét đầm lầy sông nước Nam Bộ.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/TRANG PHỤC KHÁNG CHIẾN.jfif",
    category: "Quân trang & Kỷ vật",
    verified: true
  }
}));

// Tủ 12: Loa tuyên truyền và truyền đơn
$.add(createMuseumVitrine({
  x: 15.5, y: 0.08, z: -19.0, rotY: -Math.PI * 3 / 4, width: 1.2, depth: 1.2, height: 2.05,
  title: "Loa tuyên truyền và truyền đơn",
  imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/LOA TUYÊN TRUYỀN.jfif",
  onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
  onRegisterRotating: m => Bn.current.push(m),
  artifact: {
    id: "art-loa",
    title: "Loa Phóng Thanh Binh Vận & Truyền Đơn Cách Mạng",
    year: "1963",
    description: "Vũ khí sắc bén trong công tác binh vận, kêu gọi binh lính Sài Gòn quay súng trở về với nhân dân.",
    imageUrl: "public/assets/doi-ap-bac/hien-vat-khu-3/LOA TUYÊN TRUYỀN.jfif",
    category: "Binh vận & Tuyên truyền",
    verified: true
  }
}));

// Dãy tranh tường tôn vinh 4 Thắng lợi quân sự lớn: Bình Giã, An Lão, Ba Gia, Đồng Xoài
const victoryFrames = [
  { img: "public/assets/doi-ap-bac/anh-khu-3/1. CHIẾN THẮNG BÌNH GIÃ.jpg", title: "Chiến Thắng Bình Giã (12/1964)", pos: [-27.84, 2.5, -6.5], rotY: Math.PI / 2 },
  { img: "public/assets/doi-ap-bac/anh-khu-3/2. CHIẾN THẮNG AN LÃO.jpg", title: "Chiến Thắng An Lão (12/1964)", pos: [-27.84, 2.5, -12.5], rotY: Math.PI / 2 },
  { img: "public/assets/doi-ap-bac/anh-khu-3/3. CHIẾN THẮNG BA GIA.jpg", title: "Chiến Thắng Ba Gia (05/1965)", pos: [27.84, 2.5, -6.5], rotY: -Math.PI / 2 },
  { img: "public/assets/doi-ap-bac/anh-khu-3/4. CHIẾN THẮNG ĐỒNG XOÀI.jpg", title: "Chiến Thắng Đồng Xoài (06/1965)", pos: [27.84, 2.5, -12.5], rotY: -Math.PI / 2 }
];
victoryFrames.forEach(pData => {
  const frame = createMuseumWallFrame({
    x: pData.pos[0], y: pData.pos[1], z: pData.pos[2], rotY: pData.rotY,
    width: 2.4, height: 1.55, imageUrl: pData.img, title: pData.title,
    onRegisterInteractive: (mesh, lbl, art) => cn.current.push({ mesh, type: "artifact", label: lbl, artifact: art }),
    artifact: {
      id: "art-victory-" + pData.title,
      title: pData.title,
      year: "1964–1965",
      description: "Thắng lợi quân sự giòn giã chứng minh sự trưởng thành vượt bậc của quân giải phóng, giáng đòn quyết định làm phá sản hoàn toàn chiến lược Chiến tranh đặc biệt của Mỹ.",
      imageUrl: pData.img,
      category: "Chiến dịch lịch sử",
      verified: true
    }
  });
  $.add(frame);
});

// =========================================================================
// PHÂN KHU 8: KẾT THÚC HÀNH TRÌNH – ĐÀI TƯỞNG NIỆM & CỜ TỔ QUỐC THIÊNG LIÊNG
// VỊ TRÍ: TRUNG TÂM PHÍA BẮC (X = 0, Z = -23.5)
// =========================================================================
const monument = new It();
monument.position.set(0, 0, -23.5);

// Bệ đài tưởng niệm 3 tầng bằng đá hoa cương đỏ bordeaux và vàng champagne
const altar1 = new I(new Z(6.4, 0.28, 3.2), new X({ color: "#8c1d18", roughness: 0.35, metalness: 0.15 }));
altar1.position.y = 0.14;
altar1.receiveShadow = true;
monument.add(altar1);

const altar2 = new I(new Z(5.4, 0.24, 2.6), new X({ color: "#C6A56B", roughness: 0.22, metalness: 0.88 }));
altar2.position.y = 0.40;
altar2.receiveShadow = true;
monument.add(altar2);

const altar3 = new I(new Z(4.6, 0.22, 2.0), new X({ color: "#8c1d18", roughness: 0.35, metalness: 0.15 }));
altar3.position.y = 0.63;
altar3.receiveShadow = true;
monument.add(altar3);

// Tường đá bia tưởng niệm trang nghiêm phía sau (Be kem sáng #F3EBDD)
const steleWall = new I(new Z(5.2, 3.4, 0.35), new X({ color: "#F3EBDD", roughness: 0.42, metalness: 0.05 }));
steleWall.position.set(0, 2.34, -0.9);
monument.add(steleWall);

const steleTrim = new I(new Z(5.3, 0.12, 0.38), new X({ color: "#C6A56B", metalness: 0.90, roughness: 0.20 }));
steleTrim.position.set(0, 4.04, -0.9);
monument.add(steleTrim);

// Đại tự vàng chữ đồng khắc chân lý lịch sử của Chủ tịch Hồ Chí Minh
const inscriptionCanvas = document.createElement("canvas");
inscriptionCanvas.width = 1024; inscriptionCanvas.height = 360;
const ictx = inscriptionCanvas.getContext("2d");
if (ictx) {
  ictx.fillStyle = "#2A2118"; ictx.fillRect(0, 0, 1024, 360);
  ictx.strokeStyle = "#C6A56B"; ictx.lineWidth = 6; ictx.strokeRect(8, 8, 1008, 344);
  ictx.fillStyle = "#FEF08A"; ictx.font = 'bold 38px "Cinzel", serif'; ictx.textAlign = "center";
  ictx.fillText("HAI MIỀN – MỘT KHÁT VỌNG THỐNG NHẤT", 512, 75);
  ictx.fillStyle = "#ffffff"; ictx.font = 'bold 26px "Be Vietnam Pro", sans-serif';
  ictx.fillText("“Nước Việt Nam là một, dân tộc Việt Nam là một.", 512, 145);
  ictx.fillText("Sông có thể cạn, núi có thể mòn,", 512, 195);
  ictx.fillText("song chân lý ấy không bao giờ thay đổi!”", 512, 245);
  ictx.fillStyle = "#C6A56B"; ictx.font = 'italic bold 22px "Be Vietnam Pro", sans-serif';
  ictx.fillText("— CHỦ TỊCH HỒ CHÍ MINH —", 512, 305);
}
const insTex = new Pe(inscriptionCanvas);
const insMesh = new I(new Yt(4.6, 1.62), new Se({ map: insTex, side: Xe }));
insMesh.position.set(0, 2.4, -0.71);
monument.add(insMesh);

// Cột cờ Tổ quốc vươn cao 4.2m bằng vàng champagne
const flagPole = new I(new Rt(0.035, 0.045, 3.8, 20), new X({ color: "#C6A56B", metalness: 0.92, roughness: 0.18 }));
flagPole.position.set(0, 2.64, 0);
monument.add(flagPole);

// Quả cầu đỉnh cột cờ bằng vàng champagne
const finial = new I(new sr(0.08, 16, 16), new X({ color: "#C6A56B", metalness: 0.92, roughness: 0.18 }));
finial.position.set(0, 4.54, 0);
monument.add(finial);

// Lá cờ đỏ sao vàng thiêng liêng
const flagCanvas = document.createElement("canvas");
flagCanvas.width = 720; flagCanvas.height = 480;
const fctx = flagCanvas.getContext("2d");
if (fctx) {
  fctx.fillStyle = "#da251d"; fctx.fillRect(0, 0, 720, 480);
  fctx.fillStyle = "#ff0";
  fctx.beginPath();
  const cx = 360, cy = 240, rOuter = 110, rInner = 44;
  for (let i = 0; i < 5; i++) {
    const angleOut = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const angleIn = angleOut + Math.PI / 5;
    const xO = cx + Math.cos(angleOut) * rOuter;
    const yO = cy + Math.sin(angleOut) * rOuter;
    const xI = cx + Math.cos(angleIn) * rInner;
    const yI = cy + Math.sin(angleIn) * rInner;
    if (i === 0) fctx.moveTo(xO, yO);
    else fctx.lineTo(xO, yO);
    fctx.lineTo(xI, yI);
  }
  fctx.closePath();
  fctx.fill();
}
const flagTex = new Pe(flagCanvas);
const flagMesh = new I(new Yt(1.8, 1.2), new Se({ map: flagTex, side: Xe }));
flagMesh.position.set(0.92, 3.84, 0);
monument.add(flagMesh);

// 2 Đèn rọi hào quang vàng từ dưới hắt lên cờ Tổ quốc
const monumentSpot1 = new sa("#fde047", 2.8, 9, Math.PI / 4, 0.3);
monumentSpot1.position.set(-1.8, 0.2, -21.8);
monumentSpot1.target.position.set(0, 3.84, -23.5);
$.add(monumentSpot1);
$.add(monumentSpot1.target);

const monumentSpot2 = new sa("#fde047", 2.8, 9, Math.PI / 4, 0.3);
monumentSpot2.position.set(1.8, 0.2, -21.8);
monumentSpot2.target.position.set(0, 3.84, -23.5);
$.add(monumentSpot2);
$.add(monumentSpot2.target);

$.add(monument);

// Expose interactables to AI Hand Controller
window.__THREE_INTERACTABLES__ = cn.current;

