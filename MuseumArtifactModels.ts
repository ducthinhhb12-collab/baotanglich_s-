import * as THREE from 'three';
import { Artifact } from '../../types/exhibition';

// ============================================================================
// HỆ THỐNG MÔ HÌNH 3D HIỆN VẬT LỊCH SỬ & NỘI THẤT BẢO TÀNG SỐ (1954 - 1975)
// ============================================================================

// 1. Tạo Canvas Texture cho Bảng Tên Tường / Khẩu Hiệu Lịch Sử (Wall Banners)
export function createWallBannerTexture(
  title: string,
  subtitle: string = '',
  bgColor: string = '#991b1b',
  textColor: string = '#fef08a'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Nền đỏ cờ truyền thống có dải gradient trang trọng
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#2b0404');
  grad.addColorStop(0.15, '#7f1d1d');
  grad.addColorStop(0.5, bgColor);
  grad.addColorStop(0.85, '#7f1d1d');
  grad.addColorStop(1, '#2b0404');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Viền kép mạ vàng hoàng gia
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(22, 22, canvas.width - 44, canvas.height - 44);

  // Ngôi sao vàng năm cánh bên trái và bên phải
  function drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = '#fde047';
    ctx.fill();
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  const starY = canvas.height / 2;
  drawStar(90, starY, 5, 46, 20);
  drawStar(canvas.width - 90, starY, 5, 46, 20);

  const hasSubtitle = Boolean(subtitle && subtitle.trim());

  // Auto-fit tiêu đề: nếu không có chữ nhỏ bên dưới thì tăng cỡ chữ to đẹp hơn (64px) và căn đúng giữa
  const maxTextWidth = canvas.width - 340; // ~1708px
  let titleFontSize = hasSubtitle ? 52 : 64;
  ctx.font = `900 ${titleFontSize}px "Playfair Display", "Cinzel", "Montserrat", "Be Vietnam Pro", Georgia, serif`;
  while (ctx.measureText(title).width > maxTextWidth && titleFontSize > 22) {
    titleFontSize -= 2;
    ctx.font = `900 ${titleFontSize}px "Playfair Display", "Cinzel", "Montserrat", "Be Vietnam Pro", Georgia, serif`;
  }

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;

  const titleY = hasSubtitle ? 100 : canvas.height / 2;
  ctx.fillText(title, canvas.width / 2, titleY);

  if (hasSubtitle) {
    // Phụ đề nhỏ bên dưới (chỉ vẽ khi có nội dung)
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#f3f4f6';
    let subFontSize = 26;
    ctx.font = `bold ${subFontSize}px "Be Vietnam Pro", sans-serif`;
    while (ctx.measureText(subtitle).width > maxTextWidth && subFontSize > 16) {
      subFontSize -= 1;
      ctx.font = `bold ${subFontSize}px "Be Vietnam Pro", sans-serif`;
    }
    ctx.fillText(subtitle, canvas.width / 2, 182);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 2. Tạo Header Badge phía trên khung tranh (nền tối chữ sáng)
export function createExhibitHeaderTexture(title: string, year?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 90;
  const ctx = canvas.getContext('2d')!;

  // Nền xanh đen bảo tàng
  ctx.fillStyle = '#0a0f1d';
  ctx.fillRect(0, 0, 600, 90);

  // Viền vàng kim
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 592, 82);

  // Tag huy hiệu đỏ bên trái
  if (year) {
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(16, 20, 110, 50);
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(16, 20, 110, 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(year, 71, 46);
  }

  // Tiêu đề
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 26px "Be Vietnam Pro", sans-serif';
  ctx.textAlign = year ? 'left' : 'center';
  ctx.textBaseline = 'middle';
  const displayTitle = title.length > 34 ? title.substring(0, 32) + '...' : title;
  ctx.fillText(displayTitle, year ? 145 : 300, 46);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 3. Tạo Bảng mô tả tóm tắt phía dưới khung tranh (nền trắng chữ đen rõ nét)
export function createExhibitCaptionTexture(description: string, sourceNotes?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 120;
  const ctx = canvas.getContext('2d')!;

  // Nền trắng tinh khiết
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 600, 120);

  // Viền mỏng trang nhã
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.strokeRect(3, 3, 594, 114);

  // Đường line vàng trang trí phía trên
  ctx.fillStyle = '#d4af37';
  ctx.fillRect(3, 3, 594, 5);

  // Chữ đen rõ nét, phân dòng mượt mà
  ctx.fillStyle = '#0f172a';
  ctx.font = '500 22px "Be Vietnam Pro", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Cắt dòng tự động
  const words = description.split(' ');
  let line1 = '';
  let line2 = '';
  for (const w of words) {
    if ((line1 + ' ' + w).length <= 42) {
      line1 += (line1 ? ' ' : '') + w;
    } else if ((line2 + ' ' + w).length <= 45) {
      line2 += (line2 ? ' ' : '') + w;
    }
  }
  if (!line2 && words.length > 8) {
    line2 = sourceNotes ? `Nguồn: ${sourceNotes}` : 'Tư liệu lịch sử 1954 - 1975';
  }

  ctx.fillText(line1, 300, 45);
  if (line2) {
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 18px "Be Vietnam Pro", sans-serif';
    ctx.fillText(line2.length > 48 ? line2.substring(0, 46) + '...' : line2, 300, 85);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 4. Bảng thông tin nhỏ mạ đồng (Brass Plaque) gắn trước bục hiện vật
export function createBrassPlaqueTexture(title: string, year: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  // Gradient đồng vàng cổ điển
  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#3a2e19');
  grad.addColorStop(0.3, '#785b28');
  grad.addColorStop(0.7, '#a37e38');
  grad.addColorStop(1, '#3a2e19');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 144);

  // Tên hiện vật
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  const displayTitle = title.length > 24 ? title.substring(0, 22) + '...' : title;
  ctx.fillText(displayTitle, 256, 60);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(`NIÊN ĐẠI: ${year}`, 256, 110);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ============================================================================
// 5 MÔ HÌNH HIỆN VẬT LỊCH SỬ 3D CHI TIẾT (PROCEDURAL DETAILED 3D MODELS)
// ============================================================================

// Model 1: Xe Tăng 390 Húc Đổ Cổng Dinh Độc Lập
export function createTank390Group(): THREE.Group {
  const tank = new THREE.Group();

  const armyGreen = new THREE.MeshStandardMaterial({ color: '#2b4421', roughness: 0.65, metalness: 0.2 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.7, metalness: 0.6 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.8, metalness: 0.4 });

  // 1. Thân xe chính (Chassis)
  const hull = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 1.1), armyGreen);
  hull.position.y = 0.22;
  tank.add(hull);

  // Mũi xe vát nghiêng
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 0.28), armyGreen);
  nose.position.set(0, 0.2, -0.6);
  nose.rotation.x = 0.35;
  tank.add(nose);

  // Đuôi xe
  const rear = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 0.2), armyGreen);
  rear.position.set(0, 0.2, 0.6);
  rear.rotation.x = -0.3;
  tank.add(rear);

  // 2. Hai dải bánh xích hai bên
  for (const side of [-0.42, 0.42]) {
    // Dải xích ngoài
    const track = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 1.3), darkMetal);
    track.position.set(side, 0.14, 0);
    tank.add(track);

    // 5 bánh lăn tròn
    for (let z = -0.48; z <= 0.48; z += 0.24) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(side, 0.12, z);
      tank.add(wheel);
    }
  }

  // 3. Tháp pháo tròn elip (Turret)
  const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.16, 20), armyGreen);
  turret.position.set(0, 0.38, -0.05);
  tank.add(turret);

  // Cửa mở nóc tháp pháo
  const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16), darkMetal);
  hatch.position.set(0.08, 0.47, 0.02);
  tank.add(hatch);

  // 4. Nòng pháo vươn dài về phía trước (Cannon barrel)
  const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.028, 0.82, 16), darkMetal);
  cannon.rotation.x = -Math.PI / 2;
  cannon.position.set(0, 0.38, -0.55);
  tank.add(cannon);

  // Loa giảm giật ở đầu nòng pháo
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.08, 16), darkMetal);
  muzzle.rotation.x = -Math.PI / 2;
  muzzle.position.set(0, 0.38, -0.96);
  tank.add(muzzle);

  // 5. Thùng nhiên liệu phụ hình trụ gắn đuôi xe
  for (const tx of [-0.18, 0.18]) {
    const fuelDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.28, 12), armyGreen);
    fuelDrum.rotation.z = Math.PI / 2;
    fuelDrum.position.set(tx, 0.32, 0.68);
    tank.add(fuelDrum);
  }

  // 6. Số hiệu "390" hai bên tháp pháo
  const numCanvas = document.createElement('canvas');
  numCanvas.width = 256;
  numCanvas.height = 128;
  const nctx = numCanvas.getContext('2d')!;
  nctx.fillStyle = '#2b4421';
  nctx.fillRect(0, 0, 256, 128);
  nctx.fillStyle = '#ffffff';
  nctx.font = '900 90px sans-serif';
  nctx.textAlign = 'center';
  nctx.textBaseline = 'middle';
  nctx.fillText('390', 128, 64);
  const numTex = new THREE.CanvasTexture(numCanvas);

  for (const s of [-1, 1]) {
    const numPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(0.22, 0.11),
      new THREE.MeshBasicMaterial({ map: numTex })
    );
    numPlate.position.set(s * 0.29, 0.38, -0.05);
    numPlate.rotation.y = s * (Math.PI / 2);
    tank.add(numPlate);
  }

  // 7. Cờ Mặt trận Dân tộc Giải phóng miền Nam trên tháp pháo
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.45, 8), darkMetal);
  pole.position.set(-0.12, 0.65, 0.08);
  tank.add(pole);

  // Lá cờ nửa đỏ nửa xanh sao vàng
  const flagCanvas = document.createElement('canvas');
  flagCanvas.width = 300;
  flagCanvas.height = 200;
  const fctx = flagCanvas.getContext('2d')!;
  fctx.fillStyle = '#dc2626'; // Nửa trên đỏ
  fctx.fillRect(0, 0, 300, 100);
  fctx.fillStyle = '#2563eb'; // Nửa dưới xanh
  fctx.fillRect(0, 100, 300, 100);

  // Ngôi sao vàng ở giữa
  let r = (Math.PI / 2) * 3;
  fctx.beginPath();
  fctx.moveTo(150, 100 - 45);
  for (let i = 0; i < 5; i++) {
    fctx.lineTo(150 + Math.cos(r) * 45, 100 + Math.sin(r) * 45);
    r += Math.PI / 5;
    fctx.lineTo(150 + Math.cos(r) * 20, 100 + Math.sin(r) * 20);
    r += Math.PI / 5;
  }
  fctx.closePath();
  fctx.fillStyle = '#fde047';
  fctx.fill();

  const flagTex = new THREE.CanvasTexture(flagCanvas);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.24, 0.16),
    new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide })
  );
  flag.position.set(-0.12 + 0.12, 0.8, 0.08);
  tank.add(flag);

  // Cổng sắt tượng trưng bị húc nghiêng phía trước
  const gateMat = new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.8, roughness: 0.3 });
  const gateFrame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.03), gateMat);
  gateFrame.position.set(0, 0.18, -0.85);
  gateFrame.rotation.x = -0.55;
  tank.add(gateFrame);

  tank.scale.set(0.65, 0.65, 0.65);
  return tank;
}

// Model 2: Mũ Cối Bộ Đội Giải Phóng
export function createPithHelmetGroup(): THREE.Group {
  const helmet = new THREE.Group();

  const oliveFabric = new THREE.MeshStandardMaterial({ color: '#3f4f2c', roughness: 0.85, metalness: 0.05 });
  const leatherMat = new THREE.MeshStandardMaterial({ color: '#543015', roughness: 0.6, metalness: 0.1 });
  const goldBadge = new THREE.MeshStandardMaterial({ color: '#eab308', roughness: 0.2, metalness: 0.85 });
  const redEnamel = new THREE.MeshStandardMaterial({ color: '#b91c1c', roughness: 0.3, metalness: 0.4 });

  // 1. Thân mũ vòm elip
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), oliveFabric);
  dome.scale.set(1.0, 0.9, 1.15);
  dome.position.y = 0.08;
  helmet.add(dome);

  // 2. Vành mũ cong nhẹ xoè ra
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.37, 0.02, 32), oliveFabric);
  brim.scale.set(1.0, 1.0, 1.18);
  brim.position.y = 0.08;
  helmet.add(brim);

  // 3. Đai da nâu bọc chân mũ
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.265, 0.27, 0.035, 24), leatherMat);
  band.scale.set(1.0, 1.0, 1.15);
  band.position.y = 0.095;
  helmet.add(band);

  // 4. Huy hiệu ngôi sao vàng năm cánh viền đỏ ở chính diện trán
  const badgeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 20), redEnamel);
  badgeBase.rotation.x = Math.PI / 2.3;
  badgeBase.position.set(0, 0.19, -0.265);
  helmet.add(badgeBase);

  // Viền vàng quanh huy hiệu
  const badgeRim = new THREE.Mesh(new THREE.RingGeometry(0.042, 0.048, 20), goldBadge);
  badgeRim.rotation.x = -Math.PI / 2.3;
  badgeRim.position.set(0, 0.191, -0.27);
  helmet.add(badgeRim);

  // Ngôi sao vàng 5 cánh
  const star = new THREE.Mesh(new THREE.CircleGeometry(0.03, 5), goldBadge);
  star.rotation.x = -Math.PI / 2.3;
  star.rotation.z = Math.PI / 5;
  star.position.set(0, 0.192, -0.275);
  helmet.add(star);

  // 5. Quai da mũ buông rủ phía dưới
  const strapCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.24, 0.08, 0),
    new THREE.Vector3(-0.16, -0.12, 0.02),
    new THREE.Vector3(0, -0.16, 0.04),
    new THREE.Vector3(0.16, -0.12, 0.02),
    new THREE.Vector3(0.24, 0.08, 0)
  ]);
  const strapGeo = new THREE.TubeGeometry(strapCurve, 20, 0.012, 8, false);
  const strap = new THREE.Mesh(strapGeo, leatherMat);
  helmet.add(strap);

  helmet.position.y = 0.05;
  return helmet;
}

// Model 3: Đài Radio Bán Dẫn Cổ Thời Chiến
export function createVintageRadioGroup(): THREE.Group {
  const radio = new THREE.Group();

  const woodCase = new THREE.MeshStandardMaterial({ color: '#451a03', roughness: 0.35, metalness: 0.15 });
  const fabricGrille = new THREE.MeshStandardMaterial({ color: '#d6c7a1', roughness: 0.9, metalness: 0.05 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.15, metalness: 0.9 });
  const darkGlass = new THREE.MeshStandardMaterial({ color: '#090d16', roughness: 0.1, metalness: 0.3 });

  // 1. Thân hộp radio gỗ
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.22), woodCase);
  body.position.y = 0.2;
  radio.add(body);

  // Viền chỉ mạ đồng bo mép
  const trim = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.36, 0.02), chromeMat);
  trim.position.set(0, 0.2, 0.105);
  radio.add(trim);

  // 2. Màng loa bọc lưới vải vintage bên trái
  const speaker = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.02), fabricGrille);
  speaker.position.set(-0.12, 0.2, 0.115);
  radio.add(speaker);

  // Nan gỗ trang trí trước màng loa
  for (let y = -0.1; y <= 0.1; y += 0.05) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.015, 0.015), woodCase);
    bar.position.set(-0.12, 0.2 + y, 0.125);
    radio.add(bar);
  }

  // 3. Mặt kính đồng hồ dò sóng radio bên phải
  const dial = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.16), darkGlass);
  dial.position.set(0.14, 0.24, 0.115);
  radio.add(dial);

  // Vẽ vạch tần số phát thanh (AM/SW)
  const dialCanvas = document.createElement('canvas');
  dialCanvas.width = 256;
  dialCanvas.height = 160;
  const dctx = dialCanvas.getContext('2d')!;
  dctx.fillStyle = '#0f172a';
  dctx.fillRect(0, 0, 256, 160);
  dctx.fillStyle = '#f59e0b';
  dctx.font = 'bold 20px monospace';
  dctx.fillText('ĐÀI TNVN • 550 - 1600 KHz', 15, 35);
  dctx.fillStyle = '#38bdf8';
  dctx.font = 'bold 18px monospace';
  dctx.fillText('GIẢI PHÓNG • 7.2 MHz', 15, 70);

  // Vạch kim tần số đỏ
  dctx.strokeStyle = '#ef4444';
  dctx.lineWidth = 4;
  dctx.beginPath();
  dctx.moveTo(140, 20);
  dctx.lineTo(140, 90);
  dctx.stroke();

  // Đèn hiển thị màu hổ phách
  dctx.fillStyle = '#fbbf24';
  dctx.beginPath();
  dctx.arc(220, 130, 8, 0, Math.PI * 2);
  dctx.fill();

  const dialTex = new THREE.CanvasTexture(dialCanvas);
  const dialScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.15), new THREE.MeshBasicMaterial({ map: dialTex }));
  dialScreen.position.set(0.14, 0.24, 0.12);
  radio.add(dialScreen);

  // 4. Hai núm xoay kim loại (Tuning & Volume)
  for (const kx of [0.08, 0.2]) {
    const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.025, 16), chromeMat);
    knob.rotation.x = Math.PI / 2;
    knob.position.set(kx, 0.1, 0.125);
    radio.add(knob);
  }

  // 5. Cần ăng-ten kim loại vươn chéo
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.65, 8), chromeMat);
  antenna.rotation.z = -0.35;
  antenna.position.set(0.24, 0.6, -0.05);
  radio.add(antenna);

  // 6. Quai xách da ở nóc máy
  const handleMat = new THREE.MeshStandardMaterial({ color: '#543015', roughness: 0.6 });
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.03, 0.04), handleMat);
  handle.position.set(0, 0.39, 0);
  radio.add(handle);

  return radio;
}

// Model 4: Sa Bàn Cầu Hiền Lương Vĩ Tuyến 17
export function createHienLuongBridgeGroup(): THREE.Group {
  const diorama = new THREE.Group();

  const waterMat = new THREE.MeshStandardMaterial({ color: '#0284c7', roughness: 0.15, metalness: 0.2, transparent: true, opacity: 0.85 });
  const bankMat = new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.85, metalness: 0.05 });
  const northBlue = new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.4, metalness: 0.3 });
  const southYellow = new THREE.MeshStandardMaterial({ color: '#eab308', roughness: 0.4, metalness: 0.3 });
  const whiteLineMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const pillarMat = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.7, metalness: 0.2 });

  // 1. Dòng sông Bến Hải
  const river = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), waterMat);
  river.rotation.x = -Math.PI / 2;
  river.position.y = 0.02;
  diorama.add(river);

  // 2. Hai bờ sông đất bồi phù sa
  const northBank = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.22), bankMat);
  northBank.position.set(0, 0.04, -0.38);
  diorama.add(northBank);

  const southBank = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.22), bankMat);
  southBank.position.set(0, 0.04, 0.38);
  diorama.add(southBank);

  // 3. Trụ cầu bằng bê tông cốt thép
  for (const pz of [-0.2, 0, 0.2]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.08), pillarMat);
    pillar.position.set(0, 0.08, pz);
    diorama.add(pillar);
  }

  // 4. Mặt cầu Hiền Lương chia 2 nửa màu sơn lịch sử
  // Nửa bờ Bắc sơn màu xanh hòa bình (dài 0.38m)
  const northDeck = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.38), northBlue);
  northDeck.position.set(0, 0.16, -0.19);
  diorama.add(northDeck);

  // Nửa bờ Nam sơn màu vàng (dài 0.38m)
  const southDeck = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.38), southYellow);
  southDeck.position.set(0, 0.16, 0.19);
  diorama.add(southDeck);

  // Vạch phân giới vĩ tuyến 17 màu trắng ở giữa cầu
  const line = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.015), whiteLineMat);
  line.rotation.x = -Math.PI / 2;
  line.position.set(0, 0.175, 0);
  diorama.add(line);

  // Lan can và dàn dầm thép hai bên cầu
  const trussMat = new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.6, roughness: 0.4 });
  for (const side of [-0.08, 0.08]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.06, 0.76), trussMat);
    rail.position.set(side, 0.2, 0);
    diorama.add(rail);
  }

  // 5. Cột cờ Giới tuyến bờ Bắc cao vút
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.55, 8), pillarMat);
  flagPole.position.set(-0.25, 0.32, -0.38);
  diorama.add(flagPole);

  // Lá cờ Tổ quốc đỏ sao vàng trên cột cờ bờ Bắc
  const flagCanvas = document.createElement('canvas');
  flagCanvas.width = 180;
  flagCanvas.height = 120;
  const fctx = flagCanvas.getContext('2d')!;
  fctx.fillStyle = '#dc2626';
  fctx.fillRect(0, 0, 180, 120);

  let r = (Math.PI / 2) * 3;
  fctx.beginPath();
  fctx.moveTo(90, 60 - 32);
  for (let i = 0; i < 5; i++) {
    fctx.lineTo(90 + Math.cos(r) * 32, 60 + Math.sin(r) * 32);
    r += Math.PI / 5;
    fctx.lineTo(90 + Math.cos(r) * 14, 60 + Math.sin(r) * 14);
    r += Math.PI / 5;
  }
  fctx.closePath();
  fctx.fillStyle = '#fde047';
  fctx.fill();

  const flagTex = new THREE.CanvasTexture(flagCanvas);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.11),
    new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide })
  );
  flag.position.set(-0.25 + 0.08, 0.52, -0.38);
  diorama.add(flag);

  return diorama;
}

// Model 5: Tập Tài Liệu Mật & Sách Chỉ Thị Chiến Dịch
export function createSecretDossierGroup(): THREE.Group {
  const dossier = new THREE.Group();

  const redLeather = new THREE.MeshStandardMaterial({ color: '#7f1d1d', roughness: 0.5, metalness: 0.1 });
  const goldFoil = new THREE.MeshStandardMaterial({ color: '#eab308', roughness: 0.2, metalness: 0.85 });

  // 1. Tập tài liệu bìa cứng đỏ mở góc 15 độ
  const coverLeft = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.38), redLeather);
  coverLeft.position.set(-0.14, 0.06, 0);
  coverLeft.rotation.z = 0.08;
  dossier.add(coverLeft);

  const coverRight = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.38), redLeather);
  coverRight.position.set(0.14, 0.06, 0);
  coverRight.rotation.z = -0.08;
  dossier.add(coverRight);

  // Gáy sách
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.38, 12), redLeather);
  spine.position.set(0, 0.045, 0);
  dossier.add(spine);

  // 2. Các trang giấy tài liệu ngả vàng thời gian
  const pageCanvas = document.createElement('canvas');
  pageCanvas.width = 512;
  pageCanvas.height = 360;
  const pctx = pageCanvas.getContext('2d')!;
  pctx.fillStyle = '#fef3c7';
  pctx.fillRect(0, 0, 512, 360);

  // Đường kẻ sách
  pctx.strokeStyle = '#e2e8f0';
  pctx.lineWidth = 1;
  pctx.beginPath();
  pctx.moveTo(256, 10);
  pctx.lineTo(256, 350);
  pctx.stroke();

  // Dấu mộc tròn đỏ TUYỆT MẬT
  pctx.strokeStyle = '#dc2626';
  pctx.lineWidth = 4;
  pctx.beginPath();
  pctx.arc(120, 80, 48, 0, Math.PI * 2);
  pctx.stroke();

  pctx.fillStyle = '#dc2626';
  pctx.font = 'bold 16px sans-serif';
  pctx.textAlign = 'center';
  pctx.fillText('QUÂN ĐỘI NDVN', 120, 65);
  pctx.font = '900 22px sans-serif';
  pctx.fillText('TUYỆT MẬT', 120, 92);

  // Tiêu đề chỉ thị
  pctx.fillStyle = '#78350f';
  pctx.font = 'bold 20px "Cinzel", Georgia, serif';
  pctx.textAlign = 'center';
  pctx.fillText('CHỈ THỊ CHIẾN DỊCH HỒ CHÍ MINH', 380, 60);

  pctx.fillStyle = '#0f172a';
  pctx.font = 'bold 16px sans-serif';
  pctx.fillText('"Thần tốc, thần tốc hơn nữa,', 380, 105);
  pctx.fillText('táo bạo, táo bạo hơn nữa..."', 380, 135);

  pctx.fillStyle = '#475569';
  pctx.font = 'italic 14px sans-serif';
  pctx.fillText('Đại tướng Võ Nguyên Giáp', 380, 185);

  const pageTex = new THREE.CanvasTexture(pageCanvas);
  const openPages = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.36),
    new THREE.MeshBasicMaterial({ map: pageTex })
  );
  openPages.rotation.x = -Math.PI / 2;
  openPages.position.set(0, 0.08, 0);
  dossier.add(openPages);

  // 3. Cây bút máy kim loại cổ mạ vàng đặt chéo
  const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 12), goldFoil);
  pen.rotation.z = Math.PI / 3;
  pen.rotation.x = 0.2;
  pen.position.set(0.12, 0.1, 0.05);
  dossier.add(pen);

  return dossier;
}

// ============================================================================
// BỤC TRƯNG BÀY HIỆN VẬT HOÀNG GIA (ROYAL GLASS PEDESTAL)
// ============================================================================

export interface PedestalSpec {
  x: number;
  z: number;
  title: string;
  year: string;
  subtitle: string;
  modelGroup: THREE.Group;
  artifact: Artifact;
  onRegisterInteractive: (mesh: THREE.Mesh, label: string, artifact: Artifact) => void;
}

export function createPedestalWithArtifact(spec: PedestalSpec): { group: THREE.Group; rotatingGroup: THREE.Group } {
  const pedestalGroup = new THREE.Group();
  pedestalGroup.position.set(spec.x, 0, spec.z);

  const baseH = 0.95;
  const baseW = 0.9;
  const baseD = 0.9;
  const glassH = 0.72;

  // 1. Thân bục bằng đá cẩm thạch / gỗ mun đen viền vàng
  const baseMat = new THREE.MeshStandardMaterial({ color: '#161922', roughness: 0.35, metalness: 0.1 });
  const goldMat = new THREE.MeshStandardMaterial({ color: '#d4af37', metalness: 0.88, roughness: 0.22 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(baseW, baseH, baseD), baseMat);
  base.position.y = baseH / 2;
  base.castShadow = true;
  base.receiveShadow = true;
  pedestalGroup.add(base);

  // Viền chỉ vàng chân bục và mặt bục
  const footTrim = new THREE.Mesh(new THREE.BoxGeometry(baseW + 0.05, 0.04, baseD + 0.05), goldMat);
  footTrim.position.y = 0.02;
  pedestalGroup.add(footTrim);

  const topTrim = new THREE.Mesh(new THREE.BoxGeometry(baseW + 0.05, 0.035, baseD + 0.05), goldMat);
  topTrim.position.y = baseH - 0.02;
  pedestalGroup.add(topTrim);

  // Vòng sáng LED hắt sàn dưới chân bục
  const haloGeo = new THREE.RingGeometry(0.5, 0.68, 32);
  const haloMat = new THREE.MeshBasicMaterial({ color: '#f59e0b', side: THREE.DoubleSide, transparent: true, opacity: 0.65 });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = 0.01;
  pedestalGroup.add(halo);

  // 2. Lồng kính trong suốt
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.28,
    roughness: 0.05,
    transmission: 0.92,
    thickness: 0.02,
    depthWrite: false
  });

  const glassCase = new THREE.Mesh(new THREE.BoxGeometry(baseW - 0.06, glassH, baseD - 0.06), glassMat);
  glassCase.position.y = baseH + glassH / 2 + 0.01;
  pedestalGroup.add(glassCase);

  // Nắp chụp kim loại vàng trên nóc kính
  const glassTop = new THREE.Mesh(new THREE.BoxGeometry(baseW - 0.04, 0.03, baseD - 0.04), goldMat);
  glassTop.position.y = baseH + glassH + 0.015;
  pedestalGroup.add(glassTop);

  // 3. Đèn LED rọi từ đỉnh lồng kính rọi xuống hiện vật
  const spot = new THREE.PointLight(0xfff3d6, 1.2, 2.5, 1.2);
  spot.position.set(0, baseH + glassH - 0.05, 0);
  pedestalGroup.add(spot);

  // 4. Biển thông tin mạ đồng (Brass Plaque) gắn mặt trước bục
  const plaqueTex = createBrassPlaqueTexture(spec.title, spec.year);
  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(0.48, 0.16),
    new THREE.MeshStandardMaterial({ map: plaqueTex, roughness: 0.35, metalness: 0.3 })
  );
  plaque.position.set(0, baseH - 0.25, baseD / 2 + 0.008);
  pedestalGroup.add(plaque);

  // 5. Nhóm hiện vật xoay tròn
  const rotatingGroup = new THREE.Group();
  rotatingGroup.position.set(0, baseH + 0.08, 0);
  rotatingGroup.add(spec.modelGroup);
  pedestalGroup.add(rotatingGroup);

  // 6. Mesh trong suốt để click tương tác
  const hitBox = new THREE.Mesh(
    new THREE.BoxGeometry(baseW, glassH + 0.2, baseD),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitBox.position.set(0, baseH + glassH / 2, 0);
  pedestalGroup.add(hitBox);

  spec.onRegisterInteractive(hitBox, `Hiện vật: ${spec.title} (${spec.year})`, spec.artifact);

  return { group: pedestalGroup, rotatingGroup };
}

// ============================================================================
// KHUNG TRANH LỊCH SỬ NỔI KHỐI (3D WALL EXHIBIT WITH BADGE & CAPTION)
// ============================================================================

export interface WallExhibitSpec {
  x: number;
  y: number;
  z: number;
  rotY: number;
  width?: number;
  height?: number;
  artifact: Artifact;
  onRegisterInteractive: (mesh: THREE.Mesh, label: string, artifact: Artifact, outlineMesh: any) => void;
}

export function createWallExhibitGroup(spec: WallExhibitSpec, textureLoader: THREE.TextureLoader): THREE.Group {
  const group = new THREE.Group();
  group.position.set(spec.x, spec.y, spec.z);
  group.rotation.y = spec.rotY;

  const w = spec.width || 1.85;
  const h = spec.height || 1.25;

  // 1. Khung tranh viền gỗ mun mạ vàng nổi khối (3D Outer Frame)
  const outerFrameMat = new THREE.MeshStandardMaterial({
    color: '#2a1b0e',
    roughness: 0.35,
    metalness: 0.2
  });
  const goldRimMat = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.25,
    metalness: 0.85
  });

  const frameDepth = 0.08;
  const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.16, h + 0.16, frameDepth), outerFrameMat);
  group.add(outerFrame);

  // Nẹp vàng sáng mặt ngoài
  const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(w + 0.18, h + 0.18, 0.02), goldRimMat);
  goldTrim.position.z = frameDepth / 2 - 0.01;
  group.add(goldTrim);

  // Viền pas-partout trắng bên trong
  const innerMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.9 });
  const innerBorder = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, h + 0.04, frameDepth + 0.005), innerMat);
  group.add(innerBorder);

  // 2. Mặt tranh (Texture ảnh lịch sử)
  let photoTex: THREE.Texture;
  if (spec.artifact.hasPhoto && spec.artifact.imageUrl) {
    photoTex = textureLoader.load(spec.artifact.imageUrl, undefined, undefined, () => {});
  } else {
    // Fallback sang canvas nếu chưa tải ảnh
    const fbCanvas = document.createElement('canvas');
    fbCanvas.width = 512;
    fbCanvas.height = 360;
    const fbCtx = fbCanvas.getContext('2d')!;
    fbCtx.fillStyle = '#1e293b';
    fbCtx.fillRect(0, 0, 512, 360);
    fbCtx.fillStyle = '#fde68a';
    fbCtx.font = 'bold 28px sans-serif';
    fbCtx.textAlign = 'center';
    fbCtx.fillText(spec.artifact.title.substring(0, 22), 256, 170);
    photoTex = new THREE.CanvasTexture(fbCanvas);
  }

  const picMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ map: photoTex, roughness: 0.45 })
  );
  picMesh.position.z = frameDepth / 2 + 0.01;
  group.add(picMesh);

  // Kính bảo vệ phản chiếu nhẹ phía trước
  const glassReflect = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.18,
      roughness: 0.05,
      metalness: 0.25
    })
  );
  glassReflect.position.z = frameDepth / 2 + 0.015;
  group.add(glassReflect);

  // 3. Header badge phía trên khung tranh (nền tối chữ sáng)
  const headerTex = createExhibitHeaderTexture(spec.artifact.title, spec.artifact.year);
  const headerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, 0.24),
    new THREE.MeshBasicMaterial({ map: headerTex })
  );
  headerMesh.position.set(0, h / 2 + 0.2, frameDepth / 2 + 0.01);
  group.add(headerMesh);

  // 4. Bảng mô tả tóm tắt phía dưới khung tranh (nền trắng chữ đen rõ nét)
  const capTex = createExhibitCaptionTexture(spec.artifact.shortDescription, spec.artifact.source?.title);
  const capMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, 0.32),
    new THREE.MeshBasicMaterial({ map: capTex })
  );
  capMesh.position.set(0, -h / 2 - 0.24, frameDepth / 2 + 0.01);
  group.add(capMesh);

  // 5. Viền highlight khi hover
  const outGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w + 0.2, h + 0.2, frameDepth + 0.03));
  const outMat = new THREE.LineBasicMaterial({ color: '#fde68a', linewidth: 2, transparent: true, opacity: 0 });
  const outlineMesh = new THREE.LineSegments(outGeo, outMat);
  group.add(outlineMesh);

  // Gắn metadata hỗ trợ Real-time Hot-Swap Zero-Reload
  group.userData = {
    slot: (spec.artifact as any).slot,
    id: spec.artifact.id,
    picMesh,
    headerMesh,
    capMesh,
    artifact: spec.artifact
  };

  // Đăng ký tương tác click
  spec.onRegisterInteractive(picMesh, spec.artifact.title, spec.artifact, outlineMesh);

  return group;
}

// Hàm Hot-Swap trực tiếp không gián đoạn camera (Zero-Reload Update)
export function updateWallExhibitGroup(
  group: THREE.Group,
  updatedData: any,
  textureLoader: THREE.TextureLoader
) {
  if (!group || !group.userData) return;
  const { picMesh, headerMesh, capMesh, artifact } = group.userData;
  if (!artifact) return;

  // 1. Cập nhật Texture ảnh/tư liệu
  if (updatedData.mediaUrl && updatedData.mediaUrl !== artifact.imageUrl) {
    if (picMesh && picMesh.material && (picMesh.material as THREE.MeshStandardMaterial).map) {
      (picMesh.material as THREE.MeshStandardMaterial).map!.dispose();
    }
    const newTex = textureLoader.load(updatedData.mediaUrl, () => {
      newTex.needsUpdate = true;
    });
    if (picMesh && picMesh.material) {
      (picMesh.material as THREE.MeshStandardMaterial).map = newTex;
      (picMesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
    artifact.imageUrl = updatedData.mediaUrl;
  }

  // 2. Cập nhật Bảng tiêu đề (Header badge)
  if (headerMesh && (updatedData.title !== artifact.title || updatedData.year !== artifact.year)) {
    if ((headerMesh.material as THREE.MeshBasicMaterial).map) {
      (headerMesh.material as THREE.MeshBasicMaterial).map!.dispose();
    }
    const newHeaderTex = createExhibitHeaderTexture(updatedData.title, updatedData.year);
    (headerMesh.material as THREE.MeshBasicMaterial).map = newHeaderTex;
    (headerMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
  }

  // 3. Cập nhật Bảng tóm tắt (Caption plaque)
  if (capMesh && (updatedData.shortDescription !== artifact.shortDescription || updatedData.title !== artifact.title)) {
    if ((capMesh.material as THREE.MeshBasicMaterial).map) {
      (capMesh.material as THREE.MeshBasicMaterial).map!.dispose();
    }
    const newCapTex = createExhibitCaptionTexture(updatedData.shortDescription, updatedData.author || artifact.source?.title);
    (capMesh.material as THREE.MeshBasicMaterial).map = newCapTex;
    (capMesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
  }

  // 4. Cập nhật dữ liệu artifact
  artifact.title = updatedData.title || artifact.title;
  artifact.year = updatedData.year || artifact.year;
  artifact.shortDescription = updatedData.shortDescription || artifact.shortDescription;
  artifact.historicalContent = updatedData.historicalContent || artifact.historicalContent;
  artifact.voiceoverUrl = updatedData.voiceoverUrl || '';
  artifact.mediaType = updatedData.mediaType || artifact.type || 'image';
  if (updatedData.author) {
    if (!artifact.source) artifact.source = { title: updatedData.author };
    else artifact.source.title = updatedData.author;
  }
}

// ============================================================================
// TRẠM MÀN HÌNH CHIẾU PHIM TƯ LIỆU 3D (DOCUMENTARY TV STATION)
// ============================================================================

export function createDocumentaryTVGroup(spec: {
  x: number;
  y: number;
  z: number;
  rotY: number;
  onRegisterInteractive: (mesh: THREE.Mesh, label: string) => void;
}): { group: THREE.Group; updateScreen: (time: number) => void } {
  const tvGroup = new THREE.Group();
  tvGroup.position.set(spec.x, spec.y, spec.z);
  tvGroup.rotation.y = spec.rotY;

  const screenW = 3.6;
  const screenH = 2.05;

  // 1. Khung vỏ TV viền kim loại đen mờ siêu mỏng
  const tvCaseMat = new THREE.MeshStandardMaterial({ color: '#090d16', roughness: 0.3, metalness: 0.8 });
  const tvCase = new THREE.Mesh(new THREE.BoxGeometry(screenW + 0.08, screenH + 0.08, 0.06), tvCaseMat);
  tvCase.castShadow = true;
  tvGroup.add(tvCase);

  // Chân đế kim loại TV
  const standMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.4, metalness: 0.9 });
  const standStem = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.05), standMat);
  standStem.position.set(0, -screenH / 2 - 0.4, 0);
  tvGroup.add(standStem);

  const standBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.55), standMat);
  standBase.position.set(0, -screenH / 2 - 0.8, 0);
  tvGroup.add(standBase);

  // 2. Màn hình động chạy Canvas 60 FPS
  const tvCanvas = document.createElement('canvas');
  tvCanvas.width = 1024;
  tvCanvas.height = 576;
  const tctx = tvCanvas.getContext('2d')!;

  const tvTex = new THREE.CanvasTexture(tvCanvas);
  const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(screenW, screenH), new THREE.MeshBasicMaterial({ map: tvTex }));
  screenMesh.position.z = 0.035;
  tvGroup.add(screenMesh);

  // Đăng ký tương tác click mở Video Modal
  spec.onRegisterInteractive(screenMesh, '🎬 Trạm chiếu phim tư liệu lịch sử 1954 - 1975 (Nhấp để xem toàn màn hình)');

  // Hàm update màn hình động mượt mà
  const updateScreen = (time: number) => {
    tctx.fillStyle = '#0a0d16';
    tctx.fillRect(0, 0, 1024, 576);

    // Header TV
    tctx.fillStyle = '#991b1b';
    tctx.fillRect(0, 0, 1024, 65);
    tctx.fillStyle = '#fde68a';
    tctx.font = 'bold 26px "Be Vietnam Pro", sans-serif';
    tctx.textAlign = 'center';
    tctx.fillText('🔴 ĐANG PHÁT: TOÀN CẢNH KHÁNG CHIẾN CHỐNG MỸ (1954 – 1975)', 512, 42);

    // Hiệu ứng sóng âm thanh Audio Visualizer
    const bars = 24;
    const barW = 24;
    const startX = 220;
    for (let i = 0; i < bars; i++) {
      const h = Math.abs(Math.sin(time * 4 + i * 0.4)) * 140 + 20;
      const grad = tctx.createLinearGradient(0, 360 - h, 0, 360);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(1, '#ef4444');
      tctx.fillStyle = grad;
      tctx.fillRect(startX + i * (barW + 8), 360 - h, barW, h);
    }

    // Thanh thời lượng phát sóng
    const totalSec = 345;
    const curSec = Math.floor((time * 1.5) % totalSec);
    const curMin = String(Math.floor(curSec / 60)).padStart(2, '0');
    const curS = String(curSec % 60).padStart(2, '0');

    tctx.fillStyle = '#1e293b';
    tctx.fillRect(80, 480, 864, 12);
    tctx.fillStyle = '#ef4444';
    tctx.fillRect(80, 480, (curSec / totalSec) * 864, 12);

    tctx.fillStyle = '#f3f4f6';
    tctx.font = 'bold 22px monospace';
    tctx.textAlign = 'left';
    tctx.fillText(`▶ 00:${curMin}:${curS} / 00:05:45`, 80, 530);

    tctx.fillStyle = '#38bdf8';
    tctx.textAlign = 'right';
    tctx.font = 'bold 20px "Be Vietnam Pro", sans-serif';
    tctx.fillText('⚡ Nhấp vào màn hình để BẬT TOÀN MÀN HÌNH', 944, 530);

    tvTex.needsUpdate = true;
  };

  return { group: tvGroup, updateScreen };
}

// ============================================================================
// CHẬU CÂY CẢNH 3D & THẢM ĐỎ NỘI THẤT BẢO TÀNG (INTERIOR AMENITIES)
// ============================================================================

export function createDecorativePlantGroup(): THREE.Group {
  const plant = new THREE.Group();

  const potMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.2, metalness: 0.1 });
  const goldTrim = new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.25, metalness: 0.85 });
  const soilMat = new THREE.MeshStandardMaterial({ color: '#3f2212', roughness: 0.9 });
  const leafMat = new THREE.MeshStandardMaterial({ color: '#166534', roughness: 0.4, metalness: 0.05 });

  // Chậu cây hình trụ vát
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.65, 20), potMat);
  pot.position.y = 0.325;
  pot.castShadow = true;
  pot.receiveShadow = true;
  plant.add(pot);

  // Đai vàng trang trí quanh chậu
  const trim = new THREE.Mesh(new THREE.CylinderGeometry(0.325, 0.325, 0.04, 20), goldTrim);
  trim.position.y = 0.52;
  plant.add(trim);

  // Đất trong chậu
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16), soilMat);
  soil.position.y = 0.64;
  plant.add(soil);

  // Tán lá xanh nhiều lớp vươn tỏa tự nhiên
  for (let i = 0; i < 7; i++) {
    const angle = (i * Math.PI * 2) / 7;
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 5), leafMat);
    leaf.position.set(Math.cos(angle) * 0.14, 0.95, Math.sin(angle) * 0.14);
    leaf.rotation.x = Math.sin(angle) * 0.35;
    leaf.rotation.z = -Math.cos(angle) * 0.35;
    leaf.castShadow = true;
    plant.add(leaf);
  }

  // Búp lá non ở trung tâm
  const topLeaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.55, 5), leafMat);
  topLeaf.position.y = 1.15;
  plant.add(topLeaf);

  return plant;
}

// Thảm đỏ lối đi trung tâm (Red Carpet)
export function createRedCarpet(length: number, width: number = 3.2): THREE.Group {
  const carpet = new THREE.Group();

  const carpetMat = new THREE.MeshStandardMaterial({ color: '#881313', roughness: 0.85, metalness: 0.05 });
  const goldTrimMat = new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.3, metalness: 0.75 });

  // Thân thảm đỏ chính
  const mainCarpet = new THREE.Mesh(new THREE.BoxGeometry(width, 0.012, length), carpetMat);
  mainCarpet.position.y = 0.006;
  mainCarpet.receiveShadow = true;
  carpet.add(mainCarpet);

  // Dải chỉ vàng thêu viền hai bên mép thảm
  for (const s of [-width / 2 + 0.08, width / 2 - 0.08]) {
    const border = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.014, length), goldTrimMat);
    border.position.set(s, 0.007, 0);
    carpet.add(border);
  }

  return carpet;
}
