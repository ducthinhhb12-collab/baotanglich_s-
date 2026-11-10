
function createArtifact3DModel(artifact = {}, modelType = "") {
  const g = new It();
  g.userData.is3DArtifact = true;

  // Determine model type from parameters or artifact data
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
    else if (id.includes("hien-vat-kc") || title.includes("kỷ vật")) type = "hien_vat_kc";
    else type = "generic_dossier";
  }

  // Common high quality PBR materials
  const oliveMetal = new X({ color: "#424d35", roughness: 0.42, metalness: 0.45 });
  const darkOlive = new X({ color: "#2d3524", roughness: 0.5, metalness: 0.35 });
  const steelMetal = new X({ color: "#22252a", roughness: 0.28, metalness: 0.85 });
  const darkGunMetal = new X({ color: "#14161a", roughness: 0.35, metalness: 0.88 });
  const brassMetal = new X({ color: "#d4af37", roughness: 0.18, metalness: 0.95 });
  const polishedCopper = new X({ color: "#c87d4a", roughness: 0.22, metalness: 0.9 });
  const walnutWood = new X({ color: "#362115", roughness: 0.4, metalness: 0.05 });
  const lightWood = new X({ color: "#7a5839", roughness: 0.48, metalness: 0.02 });
  const oliveCanvas = new X({ color: "#48533b", roughness: 0.75, metalness: 0.02 });
  const leatherBrown = new X({ color: "#4a2a18", roughness: 0.45, metalness: 0.08 });
  const rubberBlack = new X({ color: "#18181b", roughness: 0.85, metalness: 0.05 });
  const glassMat = new X({ color: "#a5f3fc", transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.1 });
  const redEnamel = new X({ color: "#991b1b", roughness: 0.2, metalness: 0.3 });

  // 1. HELICOPTER: CH-21 Shawnee ("Flying Banana")
  if (type === "helicopter") {
    const heli = new It();
    // Forward fuselage
    const fwdBody = new I(new Z(0.24, 0.20, 0.32), oliveMetal);
    fwdBody.position.set(0, 0.22, 0.12);
    heli.add(fwdBody);

    // Curved rear fuselage (angled upward)
    const aftBody = new I(new Z(0.20, 0.18, 0.36), oliveMetal);
    aftBody.position.set(0, 0.27, -0.18);
    aftBody.rotation.x = 0.22;
    heli.add(aftBody);

    // Nose cockpit (glass bubble)
    const nose = new I(new sr(0.11, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), glassMat);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.21, 0.28);
    heli.add(nose);

    // Front rotor pylon & 3 blades
    const fRotorMast = new I(new Rt(0.015, 0.02, 0.08, 12), steelMetal);
    fRotorMast.position.set(0, 0.35, 0.18);
    heli.add(fRotorMast);

    const fRotorHead = new It();
    fRotorHead.position.set(0, 0.39, 0.18);
    for (let b = 0; b < 3; b++) {
      const blade = new I(new Z(0.04, 0.005, 0.42), steelMetal);
      blade.position.set(0, 0, 0.2);
      const bGroup = new It();
      bGroup.rotation.y = (b * Math.PI * 2) / 3;
      bGroup.add(blade);
      fRotorHead.add(bGroup);
    }
    heli.add(fRotorHead);

    // Rear vertical pylon & 3 blades
    const rPylon = new I(new Z(0.06, 0.18, 0.12), darkOlive);
    rPylon.position.set(0, 0.42, -0.34);
    heli.add(rPylon);

    const rRotorHead = new It();
    rRotorHead.position.set(0, 0.52, -0.34);
    for (let b = 0; b < 3; b++) {
      const blade = new I(new Z(0.04, 0.005, 0.42), steelMetal);
      blade.position.set(0, 0, 0.2);
      const bGroup = new It();
      bGroup.rotation.y = (b * Math.PI * 2) / 3 + 0.3;
      bGroup.add(blade);
      rRotorHead.add(bGroup);
    }
    heli.add(rRotorHead);

    // Landing gear (fixed outriggers with wheels)
    const gearMat = steelMetal;
    const legF = new I(new Rt(0.008, 0.008, 0.15, 8), gearMat);
    legF.position.set(0, 0.08, 0.20);
    heli.add(legF);
    const wheelF = new I(new Rt(0.03, 0.03, 0.02, 12), rubberBlack);
    wheelF.rotation.z = Math.PI / 2;
    wheelF.position.set(0, 0.03, 0.20);
    heli.add(wheelF);

    [-0.14, 0.14].forEach(xOff => {
      const legR = new I(new Rt(0.008, 0.008, 0.22, 8), gearMat);
      legR.position.set(xOff * 0.7, 0.11, -0.12);
      legR.rotation.z = xOff > 0 ? -0.35 : 0.35;
      heli.add(legR);
      const wheelR = new I(new Rt(0.04, 0.04, 0.025, 12), rubberBlack);
      wheelR.rotation.z = Math.PI / 2;
      wheelR.position.set(xOff, 0.04, -0.12);
      heli.add(wheelR);
    });

    // Decals: Star & ARMY
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 128; starCanvas.height = 64;
    const sctx = starCanvas.getContext("2d");
    if (sctx) {
      sctx.fillStyle = "#424d35"; sctx.fillRect(0, 0, 128, 64);
      sctx.fillStyle = "#f8fafc"; sctx.font = "bold 24px sans-serif"; sctx.textAlign = "center";
      sctx.fillText("ARMY", 64, 42);
    }
    const starTex = new Pe(starCanvas);
    const starPlane = new I(new Yt(0.12, 0.06), new Se({ map: starTex, side: Xe }));
    starPlane.position.set(0.122, 0.22, 0.08);
    starPlane.rotation.y = Math.PI / 2;
    heli.add(starPlane);

    heli.scale.set(1.15, 1.15, 1.15);
    g.add(heli);
  }

  // 2. ARMORED PERSONNEL CARRIER: M113 (Thiết xa vận)
  else if (type === "m113") {
    const apc = new It();
    // Boxy hull
    const mainHull = new I(new Z(0.32, 0.18, 0.50), oliveMetal);
    mainHull.position.set(0, 0.18, 0);
    apc.add(mainHull);

    // Front sloped plate
    const frontSlope = new I(new Z(0.318, 0.16, 0.16), oliveMetal);
    frontSlope.position.set(0, 0.20, 0.26);
    frontSlope.rotation.x = -Math.PI / 4;
    apc.add(frontSlope);

    // Trim vane (tấm chắn sóng)
    const trimVane = new I(new Z(0.30, 0.08, 0.015), darkOlive);
    trimVane.position.set(0, 0.19, 0.32);
    trimVane.rotation.x = -Math.PI / 4;
    apc.add(trimVane);

    // Commander cupola & hatch
    const cupola = new I(new Rt(0.06, 0.065, 0.04, 16), steelMetal);
    cupola.position.set(-0.04, 0.29, 0.02);
    apc.add(cupola);

    // .50 Cal M2 Browning Machine Gun with gun shield
    const m2Group = new It();
    m2Group.position.set(-0.04, 0.33, 0.02);
    // Shield
    const shield = new I(new Z(0.10, 0.08, 0.008), darkOlive);
    shield.position.set(0, 0.04, 0.05);
    m2Group.add(shield);
    // Receiver
    const gunBody = new I(new Z(0.03, 0.035, 0.12), darkGunMetal);
    gunBody.position.set(0, 0.04, 0);
    m2Group.add(gunBody);
    // Long barrel
    const barrel = new I(new Rt(0.006, 0.006, 0.18, 12), darkGunMetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.045, 0.14);
    m2Group.add(barrel);
    // Ammo box
    const ammoBox = new I(new Z(0.04, 0.035, 0.025), oliveMetal);
    ammoBox.position.set(-0.03, 0.04, 0.01);
    m2Group.add(ammoBox);
    apc.add(m2Group);

    // Running gear: 5 road wheels per side + continuous track band
    [-0.17, 0.17].forEach(sideX => {
      // Track band
      const trackBand = new I(new Z(0.04, 0.11, 0.52), rubberBlack);
      trackBand.position.set(sideX, 0.06, 0);
      apc.add(trackBand);

      for (let w = -2; w <= 2; w++) {
        const wheel = new I(new Rt(0.045, 0.045, 0.035, 16), steelMetal);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(sideX, 0.055, w * 0.11);
        apc.add(wheel);
        // Wheel hub cap
        const hub = new I(new Rt(0.015, 0.015, 0.04, 12), oliveMetal);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(sideX, 0.055, w * 0.11);
        apc.add(hub);
      }
    });

    // Decal: White Star
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 128; starCanvas.height = 128;
    const stx = starCanvas.getContext("2d");
    if (stx) {
      stx.fillStyle = "#424d35"; stx.fillRect(0, 0, 128, 128);
      stx.fillStyle = "#ffffff"; stx.font = "bold 56px sans-serif"; stx.textAlign = "center";
      stx.fillText("★", 64, 82);
    }
    const starTex = new Pe(starCanvas);
    const starPlane = new I(new Yt(0.09, 0.09), new Se({ map: starTex, side: Xe }));
    starPlane.position.set(0.162, 0.18, 0);
    starPlane.rotation.y = Math.PI / 2;
    apc.add(starPlane);

    apc.scale.set(1.2, 1.2, 1.2);
    g.add(apc);
  }

  // 3. TANK: T-54B (#843) or M48 Patton
  else if (type === "tank") {
    const tank = new It();
    // Lower hull
    const hull = new I(new Z(0.36, 0.12, 0.58), oliveMetal);
    hull.position.set(0, 0.13, 0);
    tank.add(hull);

    // Front glacis sloped plate
    const glacis = new I(new Z(0.358, 0.12, 0.16), oliveMetal);
    glacis.position.set(0, 0.15, 0.28);
    glacis.rotation.x = -Math.PI / 3.5;
    tank.add(glacis);

    // Fenders
    [-0.19, 0.19].forEach(sideX => {
      const fender = new I(new Z(0.06, 0.02, 0.62), darkOlive);
      fender.position.set(sideX, 0.16, 0);
      tank.add(fender);
      // Toolboxes on fender
      const box1 = new I(new Z(0.04, 0.035, 0.10), steelMetal);
      box1.position.set(sideX, 0.18, 0.05);
      tank.add(box1);
    });

    // Hemispherical cast turret (characteristic T-54 / M48 dome)
    const turretDome = new I(new sr(0.14, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), oliveMetal);
    turretDome.position.set(0, 0.19, 0.02);
    tank.add(turretDome);

    // Turret base ring
    const turretRing = new I(new Rt(0.14, 0.145, 0.03, 20), darkOlive);
    turretRing.position.set(0, 0.195, 0.02);
    tank.add(turretRing);

    // Main 100mm / 90mm cannon barrel
    const gunMantlet = new I(new Z(0.09, 0.06, 0.06), steelMetal);
    gunMantlet.position.set(0, 0.23, 0.16);
    tank.add(gunMantlet);

    const barrel = new I(new Rt(0.012, 0.015, 0.44, 16), steelMetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.23, 0.38);
    tank.add(barrel);

    // Bore evacuator (bầu giảm khói đặc trưng)
    const evacuator = new I(new Rt(0.019, 0.019, 0.07, 16), darkOlive);
    evacuator.rotation.x = Math.PI / 2;
    evacuator.position.set(0, 0.23, 0.45);
    tank.add(evacuator);

    // Muzzle brake
    const muzzle = new I(new Rt(0.016, 0.016, 0.03, 16), steelMetal);
    muzzle.rotation.x = Math.PI / 2;
    muzzle.position.set(0, 0.23, 0.60);
    tank.add(muzzle);

    // Commander Cupola & DShK anti-aircraft gun
    const cupola = new I(new Rt(0.045, 0.045, 0.025, 14), darkOlive);
    cupola.position.set(-0.06, 0.29, -0.02);
    tank.add(cupola);

    const aaGun = new I(new Z(0.02, 0.025, 0.14), darkGunMetal);
    aaGun.position.set(-0.06, 0.32, -0.01);
    tank.add(aaGun);

    // 2 Auxiliary fuel drums at rear
    [-0.08, 0.08].forEach(xOff => {
      const drum = new I(new Rt(0.04, 0.04, 0.12, 14), darkOlive);
      drum.rotation.z = Math.PI / 2;
      drum.position.set(xOff, 0.18, -0.32);
      tank.add(drum);
    });

    // 5 Road wheels per side + tracks
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

    // Decal: "843" on turret sides
    const numCanvas = document.createElement("canvas");
    numCanvas.width = 128; numCanvas.height = 64;
    const nctx = numCanvas.getContext("2d");
    if (nctx) {
      nctx.fillStyle = "#424d35"; nctx.fillRect(0, 0, 128, 64);
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

  // 4. STRATEGIC HAMLET DIORAMA (Sa bàn Ấp chiến lược thu nhỏ)
  else if (type === "ap_chien_luoc") {
    const dio = new It();
    // Terrain mound base
    const terrain = new I(new Rt(0.36, 0.38, 0.04, 24), new X({ color: "#544632", roughness: 0.9 }));
    terrain.position.y = 0.02;
    dio.add(terrain);

    // Watchtower (chòi canh mái lá)
    const towerGroup = new It();
    towerGroup.position.set(-0.12, 0.04, -0.08);
    // 4 legs
    [[-0.04,-0.04], [0.04,-0.04], [-0.04,0.04], [0.04,0.04]].forEach(([lx, lz]) => {
      const leg = new I(new Rt(0.005, 0.006, 0.28, 8), lightWood);
      leg.position.set(lx, 0.14, lz);
      towerGroup.add(leg);
    });
    // Platform
    const plat = new I(new Z(0.11, 0.012, 0.11), walnutWood);
    plat.position.set(0, 0.28, 0);
    towerGroup.add(plat);
    // Thatched roof
    const roof = new I(new cr(0.09, 0.07, 4), new X({ color: "#85653b", roughness: 0.95 }));
    roof.position.set(0, 0.36, 0);
    roof.rotation.y = Math.PI / 4;
    towerGroup.add(roof);
    dio.add(towerGroup);

    // Barbed wire perimeter coils
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

    // Fortified bamboo stockade gate
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

  // 5. AMMO CRATE & SHELLS (Hòm đạn quân dụng & Vỏ đạn đồng)
  else if (type === "hom_dan") {
    const ammoGroup = new It();
    // Military wooden/metal ammo box
    const crate = new I(new Z(0.34, 0.18, 0.22), oliveCanvas);
    crate.position.set(-0.04, 0.09, 0);
    ammoGroup.add(crate);

    // Box corner metal braces & latches
    const braceMat = steelMetal;
    [[-0.21, -0.04], [0.13, -0.04], [-0.21, 0.04], [0.13, 0.04]].forEach(([bx, bz]) => {
      const brace = new I(new Z(0.02, 0.182, 0.02), braceMat);
      brace.position.set(bx, 0.09, bz);
      ammoGroup.add(brace);
    });

    // Stencil text on crate lid
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

    // Gleaming brass shell casings standing beside crate
    const shellPositions = [
      [0.17, 0.06], [0.15, -0.03], [0.19, -0.06], [0.22, 0.02]
    ];
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

  // 6. MORTAR & SHELLS (Súng cối & Đạn pháo)
  else if (type === "sung_coi") {
    const mortar = new It();
    // Heavy circular baseplate
    const plate = new I(new Rt(0.18, 0.19, 0.025, 20), steelMetal);
    plate.position.set(0, 0.015, -0.08);
    mortar.add(plate);

    // Barrel angled at 60 deg
    const barrelGroup = new It();
    barrelGroup.position.set(0, 0.03, -0.08);
    barrelGroup.rotation.x = Math.PI / 3;

    const tube = new I(new Rt(0.032, 0.036, 0.48, 16), steelMetal);
    tube.position.set(0, 0.24, 0);
    barrelGroup.add(tube);

    // Muzzle collar
    const collar = new I(new Rt(0.038, 0.038, 0.03, 16), darkGunMetal);
    collar.position.set(0, 0.46, 0);
    barrelGroup.add(collar);
    mortar.add(barrelGroup);

    // Bipod legs
    [-0.09, 0.09].forEach(bx => {
      const bLeg = new I(new Rt(0.007, 0.007, 0.32, 8), darkOlive);
      bLeg.position.set(bx, 0.16, 0.04);
      bLeg.rotation.x = -0.32;
      bLeg.rotation.z = bx > 0 ? -0.22 : 0.22;
      mortar.add(bLeg);
    });

    // 2 Finned mortar bombs on rack
    [-0.14, 0.14].forEach((mx, idx) => {
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

  // 7. BARBED WIRE & PUNJI STAKES (Dây thép gai & Chông tre)
  else if (type === "thep_gai") {
    const fence = new It();
    // Crossed wooden X-posts
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

    // Center connecting horizontal rail
    const rail = new I(new Rt(0.01, 0.01, 0.38, 8), walnutWood);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(0, 0.18, 0);
    fence.add(rail);

    // Coiled barbed wire loops
    for (let c = -3; c <= 3; c++) {
      const coil = new I(new Mm(0.08, 0.005, 8, 24), steelMetal);
      coil.position.set(c * 0.055, 0.18, 0);
      coil.rotation.y = Math.PI / 2;
      fence.add(coil);
    }

    // Sharpened bamboo stakes in ground
    for (let p = 0; p < 6; p++) {
      const stake = new I(new cr(0.008, 0.12, 6), lightWood);
      stake.position.set(-0.15 + p * 0.06, 0.06, 0.12);
      stake.rotation.x = 0.25;
      fence.add(stake);
    }

    fence.scale.set(1.15, 1.15, 1.15);
    g.add(fence);
  }

  // 8. AK-47 RIFLE (Súng tiểu liên AK-47)
  else if (type === "ak47") {
    const ak = new It();
    // Dual walnut wood display pedestals
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

    // Receiver (thân kim loại đen)
    const rec = new I(new Z(0.24, 0.05, 0.035), darkGunMetal);
    gun.add(rec);

    // Wooden buttstock (báng súng)
    const stock = new I(new Z(0.18, 0.07, 0.032), walnutWood);
    stock.position.set(-0.20, -0.015, 0);
    stock.rotation.z = 0.12;
    gun.add(stock);

    // Pistol grip
    const grip = new I(new Z(0.03, 0.07, 0.025), walnutWood);
    grip.position.set(-0.06, -0.05, 0);
    grip.rotation.z = -0.35;
    gun.add(grip);

    // Curved banana magazine (băng đạn cong 30 viên)
    const mag = new I(new Mm(0.12, 0.018, 8, 16, Math.PI / 2.5), steelMetal);
    mag.position.set(0.06, -0.11, 0);
    mag.rotation.z = Math.PI * 0.9;
    gun.add(mag);

    // Handguard (ốp lót tay gỗ)
    const handguard = new I(new Z(0.14, 0.045, 0.036), walnutWood);
    handguard.position.set(0.17, 0.005, 0);
    gun.add(handguard);

    // Barrel & gas tube
    const barrel = new I(new Rt(0.008, 0.008, 0.26, 12), darkGunMetal);
    barrel.rotation.z = -Math.PI / 2;
    barrel.position.set(0.36, 0, 0);
    gun.add(barrel);

    const gasTube = new I(new Rt(0.007, 0.007, 0.18, 12), darkGunMetal);
    gasTube.rotation.z = -Math.PI / 2;
    gasTube.position.set(0.28, 0.025, 0);
    gun.add(gasTube);

    // Front sight post
    const fSight = new I(new Z(0.01, 0.035, 0.015), darkGunMetal);
    fSight.position.set(0.46, 0.025, 0);
    gun.add(fSight);

    ak.add(gun);
    ak.scale.set(1.15, 1.15, 1.15);
    g.add(ak);
  }

  // 9. FIELD RADIO TRANSCEIVER: PRC-10 / PRC-25 (Máy thông tin vô tuyến)
  else if (type === "radio") {
    const radio = new It();
    // Heavy metal case
    const caseMesh = new I(new Z(0.20, 0.36, 0.14), oliveMetal);
    caseMesh.position.set(0, 0.18, 0);
    radio.add(caseMesh);

    // Side protective metal ribs
    [-0.105, 0.105].forEach(rx => {
      const rib = new I(new Z(0.015, 0.362, 0.04), steelMetal);
      rib.position.set(rx, 0.18, 0);
      radio.add(rib);
    });

    // Tall whip antenna with base spring
    const antBase = new I(new Mm(0.018, 0.005, 8, 16), steelMetal);
    antBase.position.set(0.06, 0.37, 0);
    radio.add(antBase);
    const antenna = new I(new Rt(0.004, 0.002, 0.55, 8), steelMetal);
    antenna.position.set(0.06, 0.65, 0);
    radio.add(antenna);

    // Top control panel with rotary switches
    for (let k = -1; k <= 1; k++) {
      const knob = new I(new Rt(0.016, 0.016, 0.018, 12), steelMetal);
      knob.position.set(k * 0.05, 0.37, 0.02);
      radio.add(knob);
    }

    // Handset (ống nghe H-138) resting on side
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

    // Stamped brass spec data plate
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

  // 10. FIELD TELEPHONE (Điện thoại dã chiến)
  else if (type === "dien_thoai") {
    const phone = new It();
    // Olive wooden/metal body
    const body = new I(new Z(0.24, 0.18, 0.18), oliveCanvas);
    body.position.set(0, 0.09, 0);
    phone.add(body);

    // Metal corner protectors
    [[-0.12,-0.09], [0.12,-0.09], [-0.12,0.09], [0.12,0.09]].forEach(([cx, cz]) => {
      const corner = new I(new Z(0.02, 0.182, 0.02), brassMetal);
      corner.position.set(cx, 0.09, cz);
      phone.add(corner);
    });

    // Handset resting on top cradle
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

    // Hand crank on right side
    const crankStem = new I(new Rt(0.006, 0.006, 0.04, 8), steelMetal);
    crankStem.rotation.z = Math.PI / 2;
    crankStem.position.set(0.14, 0.09, 0);
    phone.add(crankStem);
    const crankHandle = new I(new Rt(0.012, 0.012, 0.05, 8), walnutWood);
    crankHandle.position.set(0.16, 0.09, 0.03);
    phone.add(crankHandle);

    // Dual brass wire binding posts
    [-0.04, 0.04].forEach(px => {
      const post = new I(new Rt(0.01, 0.01, 0.025, 12), brassMetal);
      post.position.set(px, 0.19, -0.06);
      phone.add(post);
    });

    phone.scale.set(1.2, 1.2, 1.2);
    g.add(phone);
  }

  // 11. PITH HELMET & JUNGLE HAT (Mũ cối bộ đội & Khăn rằn)
  else if (type === "mu_coi") {
    const helmetGroup = new It();

    // Checkered Nam Bộ scarf folded underneath
    const scarf = new I(new Z(0.32, 0.025, 0.32), new X({ color: "#e2e8f0", roughness: 0.85 }));
    scarf.position.set(0, 0.012, 0);
    helmetGroup.add(scarf);

    // Helmet dome (crown)
    const crown = new I(new sr(0.14, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), oliveCanvas);
    crown.position.set(0, 0.03, 0);
    helmetGroup.add(crown);

    // Wide brim (vành mũ)
    const brim = new I(new Rt(0.24, 0.25, 0.015, 32), oliveCanvas);
    brim.position.set(0, 0.03, 0);
    helmetGroup.add(brim);

    // Top button
    const topBtn = new I(new sr(0.022, 12, 8), darkOlive);
    topBtn.position.set(0, 0.17, 0);
    helmetGroup.add(topBtn);

    // Brown leather chin strap
    const strap = new I(new Mm(0.142, 0.008, 6, 24, Math.PI), leatherBrown);
    strap.position.set(0, 0.035, 0);
    strap.rotation.x = Math.PI / 2;
    helmetGroup.add(strap);

    // Red & Gold Star emblem at front
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

  // 12. RUCKSACK, CANTEEN & MESS TIN (Ba lô con cóc, Bi đông & Ca mèn)
  else if (type === "balo_bidong") {
    const kit = new It();
    // Canvas rucksack main body
    const pack = new I(new Z(0.24, 0.32, 0.18), oliveCanvas);
    pack.position.set(-0.06, 0.16, 0);
    kit.add(pack);

    // 3 Front & side flap pockets
    const pFront = new I(new Z(0.14, 0.12, 0.06), darkOlive);
    pFront.position.set(-0.06, 0.12, 0.11);
    kit.add(pFront);

    [-0.19, 0.07].forEach(px => {
      const pSide = new I(new Z(0.05, 0.12, 0.12), darkOlive);
      pSide.position.set(px, 0.12, 0);
      kit.add(pSide);
    });

    // Rolled blanket/poncho on top
    const roll = new I(new Rt(0.045, 0.045, 0.26, 14), darkOlive);
    roll.rotation.z = Math.PI / 2;
    roll.position.set(-0.06, 0.34, 0);
    kit.add(roll);

    // Aluminum Canteen (Bi đông) beside pack
    const canteen = new It();
    canteen.position.set(0.16, 0.09, -0.04);
    const cBody = new I(new sr(0.055, 14, 12), oliveCanvas);
    cBody.scale.set(1, 1.4, 0.7);
    canteen.add(cBody);
    const cCap = new I(new Rt(0.014, 0.014, 0.025, 12), steelMetal);
    cCap.position.set(0, 0.09, 0);
    canteen.add(cCap);
    kit.add(canteen);

    // Aluminum Mess tin (Ca mèn)
    const messTin = new I(new Z(0.12, 0.09, 0.08), steelMetal);
    messTin.position.set(0.16, 0.045, 0.08);
    kit.add(messTin);

    kit.scale.set(1.15, 1.15, 1.15);
    g.add(kit);
  }

  // 13. GUERRILLA UNIFORM & RUBBER SANDALS (Bộ bà ba & Dép cao su)
  else if (type === "trang_phuc") {
    const uni = new It();
    // Folded black fabric shirt
    const shirt = new I(new Z(0.28, 0.06, 0.24), new X({ color: "#111317", roughness: 0.9 }));
    shirt.position.set(0, 0.03, -0.04);
    uni.add(shirt);

    // Folded black trousers
    const pants = new I(new Z(0.26, 0.04, 0.22), new X({ color: "#181a1f", roughness: 0.92 }));
    pants.position.set(0, 0.07, -0.04);
    uni.add(pants);

    // Olive web belt with brass star buckle across top
    const belt = new I(new Z(0.30, 0.015, 0.04), darkOlive);
    belt.position.set(0, 0.095, -0.04);
    uni.add(belt);
    const buckle = new I(new Z(0.04, 0.018, 0.045), brassMetal);
    buckle.position.set(0, 0.098, -0.04);
    uni.add(buckle);

    // Pair of rubber tire sandals (Dép lốp cao su Bác Hồ)
    [-0.07, 0.07].forEach(sx => {
      const sole = new I(new Z(0.065, 0.012, 0.16), rubberBlack);
      sole.position.set(sx, 0.006, 0.12);
      uni.add(sole);
      // Cross straps
      const strap1 = new I(new Mm(0.03, 0.004, 6, 12, Math.PI), rubberBlack);
      strap1.position.set(sx, 0.02, 0.11);
      strap1.rotation.x = Math.PI / 2;
      uni.add(strap1);
    });

    uni.scale.set(1.15, 1.15, 1.15);
    g.add(uni);
  }

  // 14. MEGAPHONE & LEAFLETS (Loa pin địch vận & Truyền đơn)
  else if (type === "loa") {
    const loaGroup = new It();
    // Metal megaphone conical horn
    const horn = new I(new cr(0.13, 0.32, 16, 1, true), steelMetal);
    horn.rotation.x = Math.PI / 2.3;
    horn.position.set(0, 0.22, 0);
    loaGroup.add(horn);

    // Driver housing
    const driver = new I(new Rt(0.04, 0.04, 0.08, 14), darkOlive);
    driver.rotation.x = Math.PI / 2.3;
    driver.position.set(0, 0.12, -0.16);
    loaGroup.add(driver);

    // Tripod stand
    for (let t = 0; t < 3; t++) {
      const leg = new I(new Rt(0.006, 0.006, 0.22, 8), steelMetal);
      leg.position.set(Math.cos(t * 2.1) * 0.09, 0.09, Math.sin(t * 2.1) * 0.09);
      leg.rotation.z = Math.cos(t * 2.1) * 0.3;
      leg.rotation.x = Math.sin(t * 2.1) * 0.3;
      loaGroup.add(leg);
    }

    // Historical bilingual leaflets on base
    [-0.10, 0.08].forEach((lx, idx) => {
      const lf = new I(new Z(0.09, 0.004, 0.13), new X({ color: "#fef3c7", roughness: 0.9 }));
      lf.position.set(lx, 0.004, 0.10);
      lf.rotation.y = idx * 0.5 - 0.2;
      loaGroup.add(lf);
    });

    loaGroup.scale.set(1.15, 1.15, 1.15);
    g.add(loaGroup);
  }

  // 15. RESISTANCE FIGHTER KIT (Kỷ vật Ba Gia)
  else if (type === "hien_vat_kc") {
    const kit = new It();
    // Leather officer map case
    const mapCase = new I(new Z(0.24, 0.18, 0.05), leatherBrown);
    mapCase.position.set(-0.06, 0.08, -0.04);
    kit.add(mapCase);

    // Leather belt with buckle
    const belt = new I(new Mm(0.16, 0.015, 8, 24), leatherBrown);
    belt.rotation.x = Math.PI / 2;
    belt.position.set(0, 0.03, 0);
    kit.add(belt);

    // Combat knife in scabbard
    const knife = new I(new Z(0.035, 0.015, 0.24), darkGunMetal);
    knife.position.set(0.14, 0.02, 0.04);
    kit.add(knife);

    kit.scale.set(1.15, 1.15, 1.15);
    g.add(kit);
  }

  // 16. GENERIC DOSSIER & MAP (Tài liệu chỉ thị & Bản đồ)
  else {
    const dos = new It();
    // Leather binder portfolio
    const binder = new I(new Z(0.28, 0.025, 0.20), leatherBrown);
    binder.position.set(-0.04, 0.015, -0.02);
    dos.add(binder);

    // Rolled operational map
    const mapRoll = new I(new Rt(0.022, 0.022, 0.26, 16), new X({ color: "#fde68a", roughness: 0.85 }));
    mapRoll.rotation.z = Math.PI / 2;
    mapRoll.position.set(0.02, 0.045, 0.08);
    dos.add(mapRoll);

    // Classic fountain pen
    const pen = new I(new Rt(0.004, 0.004, 0.14, 10), brassMetal);
    pen.rotation.z = Math.PI / 3;
    pen.position.set(-0.04, 0.035, 0.08);
    dos.add(pen);

    dos.scale.set(1.15, 1.15, 1.15);
    g.add(dos);
  }

  // Enable shadow casting and receiving for all meshes inside the model
  g.traverse(obj => {
    if (obj.geometry) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return g;
}
