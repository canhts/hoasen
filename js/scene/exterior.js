/**
 * ===================================================================
 * KHÔNG GIAN NGOẠI THẤT: CỔNG, HÀNG RÀO, SÂN CHƠI CHÍNH & CẢNH QUAN
 * ===================================================================
 * Xây dựng các thành phần:
 * - Nền đế diorama, lòng đường, vỉa hè
 * - Trụ cổng xanh ngọc, cánh cổng sắt xanh - hồng mở hé
 * - Bảng hiệu Hoa Sen, Cờ Tổ quốc, Bảng Nội quy, Bảng Thông báo
 * - Hàng rào nan gỗ đa sắc pastel
 * - Sân chơi chính ngoài cùng bên trái: Mái che, cờ tam giác, cầu trượt, xích đu, mâm quay, khung thành mini, cây xanh
 * - Mây hoạt hình trôi bồng bềnh
 */

const THREE = window.THREE;

export function buildExterior(scene, mats) {
  const exteriorGroup = new THREE.Group();
  exteriorGroup.name = "ExteriorGroup";

  // --- 1. ĐẾ DIORAMA & MẶT ĐẤT ---
  // Đế diorama hình khối bo tròn ấm áp
  const baseGeo = new THREE.BoxGeometry(36, 1.2, 28);
  const baseMesh = new THREE.Mesh(baseGeo, mats.curbStone);
  baseMesh.position.set(0, -0.6, 0);
  baseMesh.receiveShadow = true;
  exteriorGroup.add(baseMesh);

  // Lòng đường phía trước cổng (Z > 9.5)
  const streetGeo = new THREE.PlaneGeometry(36, 8);
  const streetMesh = new THREE.Mesh(streetGeo, mats.streetGround);
  streetMesh.rotation.x = -Math.PI / 2;
  streetMesh.position.set(0, 0.01, 12);
  streetMesh.receiveShadow = true;
  exteriorGroup.add(streetMesh);

  // Vạch kẻ đường đứt đoạn màu vàng
  for (let i = -14; i <= 14; i += 5) {
    const dashGeo = new THREE.PlaneGeometry(2.5, 0.25);
    const dashMat = new THREE.MeshBasicMaterial({ color: 0xFDE047 });
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(i, 0.02, 12);
    exteriorGroup.add(dash);
  }

  // Vỉa hè / Lối đi trước cổng
  const walkGeo = new THREE.PlaneGeometry(36, 3.5);
  const walkMesh = new THREE.Mesh(walkGeo, mats.floorGround);
  walkMesh.rotation.x = -Math.PI / 2;
  walkMesh.position.set(0, 0.02, 7.8);
  walkMesh.receiveShadow = true;
  exteriorGroup.add(walkMesh);

  // --- 2. CỔNG TRƯỜNG & HÀNG RÀO ĐA SẮC ---
  // Vị trí cổng chính: X = 3.5 (đối diện trực tiếp Văn phòng tầng trệt X = 2 -> 6)
  const gateCenterX = 3.5;
  const gateWidth = 3.6;
  const pillarW = 0.7;
  const pillarH = 3.4;
  const gateZ = 6.2;

  // Hai trụ cổng vuông màu xanh ngọc
  const pillarGeo = new THREE.BoxGeometry(pillarW, pillarH, pillarW);

  // Trụ trái (cắm cờ & treo bảng Nội quy)
  const leftPillar = new THREE.Mesh(pillarGeo, mats.cyanPillar);
  leftPillar.position.set(gateCenterX - gateWidth / 2 - pillarW / 2, pillarH / 2, gateZ);
  leftPillar.castShadow = true;
  leftPillar.receiveShadow = true;
  exteriorGroup.add(leftPillar);

  // Mũ trụ trái
  const capGeo = new THREE.BoxGeometry(pillarW + 0.2, 0.25, pillarW + 0.2);
  const leftCap = new THREE.Mesh(capGeo, mats.wallWhite);
  leftCap.position.set(leftPillar.position.x, pillarH + 0.12, gateZ);
  exteriorGroup.add(leftCap);

  // Trụ phải (treo bảng Thông báo)
  const rightPillar = new THREE.Mesh(pillarGeo, mats.cyanPillar);
  rightPillar.position.set(gateCenterX + gateWidth / 2 + pillarW / 2, pillarH / 2, gateZ);
  rightPillar.castShadow = true;
  rightPillar.receiveShadow = true;
  exteriorGroup.add(rightPillar);

  const rightCap = new THREE.Mesh(capGeo, mats.wallWhite);
  rightCap.position.set(rightPillar.position.x, pillarH + 0.12, gateZ);
  exteriorGroup.add(rightCap);

  // Cột cờ Tổ quốc & Lá cờ trên trụ trái (Đặt nổi bật phía trước trụ, vẫy tự do)
  const flagPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.9, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0xD1D5DB, metalness: 0.8, roughness: 0.3 });
  const flagPole = new THREE.Mesh(flagPoleGeo, poleMat);
  flagPole.position.set(leftPillar.position.x - 0.35, pillarH + 1.0, gateZ + 0.45);
  flagPole.rotation.z = -0.22; // Nghiêng ra phía ngoài
  flagPole.rotation.y = 0.3;
  exteriorGroup.add(flagPole);

  const flagGeo = new THREE.PlaneGeometry(1.1, 0.72);
  const flagMesh = new THREE.Mesh(flagGeo, mats.flagMaterial);
  flagMesh.position.set(flagPole.position.x + 0.48, flagPole.position.y + 0.35, gateZ + 0.55);
  flagMesh.rotation.y = 0.25;
  flagMesh.castShadow = true;
  exteriorGroup.add(flagMesh);

  // Bảng hiệu chính "LỚP MẦM NON ĐỘC LẬP HOA SEN" trên cổng
  const signBoardGeo = new THREE.BoxGeometry(4.8, 1.5, 0.12);
  const signMesh = new THREE.Mesh(signBoardGeo, mats.signMaterial);
  signMesh.position.set(gateCenterX, pillarH + 0.95, gateZ);
  signMesh.castShadow = true;
  exteriorGroup.add(signMesh);

  // Mái ngói nhỏ che mưa trên bảng hiệu
  const signRoofGeo = new THREE.ConeGeometry(3.0, 0.6, 4);
  const signRoof = new THREE.Mesh(signRoofGeo, mats.roofCyan);
  signRoof.rotation.y = Math.PI / 4;
  signRoof.scale.set(1.2, 0.6, 0.25);
  signRoof.position.set(gateCenterX, pillarH + 1.85, gateZ);
  exteriorGroup.add(signRoof);

  // Cánh cổng sắt màu xanh dương có khung viền hồng ở chân (Cánh trái & phải mở hé được)
  const gateLeftPivot = new THREE.Group();
  gateLeftPivot.position.set(gateCenterX - gateWidth / 2, 0, gateZ);

  const gateRightPivot = new THREE.Group();
  gateRightPivot.position.set(gateCenterX + gateWidth / 2, 0, gateZ);

  // Khung cánh cổng
  const leafW = gateWidth / 2 - 0.05;
  const leafH = 2.4;

  function createGateLeaf(isLeft) {
    const leaf = new THREE.Group();
    // Viền hồng ở chân cổng
    const botFrameGeo = new THREE.BoxGeometry(leafW, 0.65, 0.06);
    const botMesh = new THREE.Mesh(botFrameGeo, mats.gatePinkFrame);
    botMesh.position.set(leafW / 2, 0.35, 0);
    leaf.add(botMesh);

    // Khung sắt đứng & ngang trên
    const topBarGeo = new THREE.BoxGeometry(leafW, 0.08, 0.06);
    const topBar = new THREE.Mesh(topBarGeo, mats.gateBlue);
    topBar.position.set(leafW / 2, leafH, 0);
    leaf.add(topBar);

    // Nan sắt đứng màu xanh
    const barsCount = 7;
    const barGeo = new THREE.BoxGeometry(0.05, leafH - 0.7, 0.05);
    for (let i = 0; i < barsCount; i++) {
      const bar = new THREE.Mesh(barGeo, mats.gateBlue);
      bar.position.set(0.12 + (i / (barsCount - 1)) * (leafW - 0.24), 0.7 + (leafH - 0.7) / 2, 0);
      leaf.add(bar);
    }

    if (!isLeft) {
      leaf.scale.x = -1; // lật cánh phải
    }
    return leaf;
  }

  const leftLeaf = createGateLeaf(true);
  gateLeftPivot.add(leftLeaf);
  const rightLeaf = createGateLeaf(false);
  gateRightPivot.add(rightLeaf);

  // Mở hé góc ban đầu (~20 độ)
  gateLeftPivot.rotation.y = 0.35;
  gateRightPivot.rotation.y = -0.35;

  exteriorGroup.add(gateLeftPivot);
  exteriorGroup.add(gateRightPivot);

  // Lưu reference để timeline xoay cổng mở rộng khi cuộn
  exteriorGroup.userData.gateLeft = gateLeftPivot;
  exteriorGroup.userData.gateRight = gateRightPivot;

  // Bảng Nội quy bên trái cổng
  const rulesGeo = new THREE.PlaneGeometry(1.2, 1.6);
  const rulesMesh = new THREE.Mesh(rulesGeo, mats.rulesMaterial);
  rulesMesh.position.set(gateCenterX - gateWidth / 2 - pillarW - 1.0, 1.4, gateZ + 0.02);
  exteriorGroup.add(rulesMesh);

  // Bảng Thông báo bên phải cổng
  const noticeGeo = new THREE.PlaneGeometry(1.2, 1.6);
  const noticeMesh = new THREE.Mesh(noticeGeo, mats.noticeMaterial);
  noticeMesh.position.set(gateCenterX + gateWidth / 2 + pillarW + 1.0, 1.4, gateZ + 0.02);
  exteriorGroup.add(noticeMesh);

  // Hàng rào nan gỗ đứng sơn xen kẽ nhiều màu pastel hai bên cổng
  const fencePicketGeo = new THREE.BoxGeometry(0.16, 1.8, 0.05);
  const fenceColors = [
    mats.fencePink,
    mats.fenceYellow,
    mats.fenceCyan,
    mats.fencePurple,
    mats.fenceOrange,
    mats.fenceWhite
  ];

  // Hàng rào bên trái (chạy từ mép trái diorama X = -16 đến cổng)
  const leftFenceEnd = gateCenterX - gateWidth / 2 - pillarW - 1.7;
  let colorIdx = 0;
  for (let x = -16; x <= leftFenceEnd; x += 0.32) {
    const picket = new THREE.Mesh(fencePicketGeo, fenceColors[colorIdx % fenceColors.length]);
    picket.position.set(x, 0.9, gateZ);
    picket.castShadow = true;
    exteriorGroup.add(picket);
    colorIdx++;
  }
  // Thanh ngang giữ nan rào trái
  const leftRailGeo = new THREE.BoxGeometry(Math.abs(leftFenceEnd - (-16)), 0.08, 0.04);
  const leftRail1 = new THREE.Mesh(leftRailGeo, mats.wallWhite);
  leftRail1.position.set((-16 + leftFenceEnd) / 2, 0.45, gateZ - 0.03);
  const leftRail2 = new THREE.Mesh(leftRailGeo, mats.wallWhite);
  leftRail2.position.set((-16 + leftFenceEnd) / 2, 1.45, gateZ - 0.03);
  exteriorGroup.add(leftRail1);
  exteriorGroup.add(leftRail2);

  // Hàng rào bên phải (chạy từ phải cổng đến mép phải diorama X = 16)
  const rightFenceStart = gateCenterX + gateWidth / 2 + pillarW + 1.7;
  for (let x = rightFenceStart; x <= 16; x += 0.32) {
    const picket = new THREE.Mesh(fencePicketGeo, fenceColors[colorIdx % fenceColors.length]);
    picket.position.set(x, 0.9, gateZ);
    picket.castShadow = true;
    exteriorGroup.add(picket);
    colorIdx++;
  }
  const rightRailGeo = new THREE.BoxGeometry(16 - rightFenceStart, 0.08, 0.04);
  const rightRail1 = new THREE.Mesh(rightRailGeo, mats.wallWhite);
  rightRail1.position.set((rightFenceStart + 16) / 2, 0.45, gateZ - 0.03);
  const rightRail2 = new THREE.Mesh(rightRailGeo, mats.wallWhite);
  rightRail2.position.set((rightFenceStart + 16) / 2, 1.45, gateZ - 0.03);
  exteriorGroup.add(rightRail1);
  exteriorGroup.add(rightRail2);


  // --- 3. SÂN CHƠI CHÍNH (NGOÀI CÙNG BÊN TRÁI: X từ -16.5 đến -8.5) ---
  const playgroundGroup = new THREE.Group();
  playgroundGroup.position.set(-12.5, 0, 0);

  // Thảm cỏ nhân tạo xanh mướt
  const grassGeo = new THREE.PlaneGeometry(7.8, 11.5);
  const grassMesh = new THREE.Mesh(grassGeo, mats.grassGround);
  grassMesh.rotation.x = -Math.PI / 2;
  grassMesh.position.set(0, 0.03, 0);
  grassMesh.receiveShadow = true;
  playgroundGroup.add(grassMesh);

  // Viền gạch lát xung quanh thảm cỏ
  const borderGeo = new THREE.BoxGeometry(8.1, 0.06, 11.8);
  const borderMesh = new THREE.Mesh(borderGeo, mats.curbStone);
  borderMesh.position.set(0, 0.015, 0);
  playgroundGroup.add(borderMesh);

  // Mái che khung sắt vòm cao ráo (Màu xanh ngọc / xám)
  const roofW = 8.2;
  const roofL = 12.0;
  const roofH = 4.2;

  // 4 cột sắt đỡ mái che
  const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, roofH, 12);
  const corners = [
    [-roofW / 2 + 0.3, -roofL / 2 + 0.3],
    [roofW / 2 - 0.3, -roofL / 2 + 0.3],
    [-roofW / 2 + 0.3, roofL / 2 - 0.3],
    [roofW / 2 - 0.3, roofL / 2 - 0.3]
  ];
  corners.forEach(([cx, cz]) => {
    const pole = new THREE.Mesh(poleGeo, mats.cyanMetal);
    pole.position.set(cx, roofH / 2, cz);
    pole.castShadow = true;
    playgroundGroup.add(pole);
  });

  // Tấm mái che dạng vòm nhẹ
  const roofCurveGeo = new THREE.CylinderGeometry(roofW / 1.7, roofW / 1.7, roofL, 24, 1, false, -Math.PI / 3, (2 * Math.PI) / 3);
  const canopy = new THREE.Mesh(roofCurveGeo, mats.roofCyan);
  canopy.rotation.z = Math.PI / 2;
  canopy.rotation.x = Math.PI / 2;
  canopy.position.set(0, roofH + 0.4, 0);
  canopy.castShadow = true;
  playgroundGroup.add(canopy);

  // Cờ dây tam giác nhiều màu treo dưới mái che (Bunting flags rực rỡ)
  const buntingColors = [0xEF4444, 0xF59E0B, 0x10B981, 0x3B82F6, 0xEC4899, 0x8B5CF6];
  for (let row = -3; row <= 3; row += 3) {
    const flagCount = 12;
    for (let f = 0; f < flagCount; f++) {
      const triGeo = new THREE.ConeGeometry(0.18, 0.28, 3);
      const triMat = new THREE.MeshBasicMaterial({
        color: buntingColors[f % buntingColors.length],
        side: THREE.DoubleSide
      });
      const tri = new THREE.Mesh(triGeo, triMat);
      tri.rotation.x = Math.PI; // quay chóp xuống
      const fx = -roofW / 2 + 0.8 + (f / (flagCount - 1)) * (roofW - 1.6);
      // Uốn võng nhẹ hình parabol
      const sag = Math.sin((f / (flagCount - 1)) * Math.PI) * 0.25;
      tri.position.set(fx, roofH - 0.2 - sag, row);
      playgroundGroup.add(tri);
    }
  }

  // --- CÁC MÔ HÌNH ĐỒ CHƠI HOẠT HÌNH TRÊN SÂN CHƠI ---
  // 1. Cầu trượt (Slide) đa sắc
  const slideGroup = new THREE.Group();
  slideGroup.position.set(-1.8, 0, 2.2);

  // Tháp cầu trượt
  const towerGeo = new THREE.BoxGeometry(1.2, 1.8, 1.2);
  const tower = new THREE.Mesh(towerGeo, mats.toyYellow);
  tower.position.set(0, 0.9, 0);
  tower.castShadow = true;
  slideGroup.add(tower);

  // Mái tháp cầu trượt hình chóp
  const towerRoofGeo = new THREE.ConeGeometry(0.9, 0.7, 4);
  const towerRoof = new THREE.Mesh(towerRoofGeo, mats.toyRed);
  towerRoof.rotation.y = Math.PI / 4;
  towerRoof.position.set(0, 2.15, 0);
  slideGroup.add(towerRoof);

  // Máng trượt nghiêng màu xanh dương
  const chuteGeo = new THREE.BoxGeometry(0.7, 0.1, 2.4);
  const chute = new THREE.Mesh(chuteGeo, mats.toyBlue);
  chute.rotation.x = 0.55;
  chute.position.set(0, 0.65, 1.2);
  chute.castShadow = true;
  slideGroup.add(chute);

  // Bậc thang trèo sau
  for (let s = 1; s <= 4; s++) {
    const stepGeo = new THREE.BoxGeometry(0.6, 0.06, 0.18);
    const step = new THREE.Mesh(stepGeo, mats.toyGreen);
    step.position.set(0, s * 0.35, -0.65 - s * 0.1);
    slideGroup.add(step);
  }
  playgroundGroup.add(slideGroup);

  // 2. Xích đu đôi (Swing)
  const swingGroup = new THREE.Group();
  swingGroup.position.set(2.0, 0, -2.5);

  // Khung chữ A
  const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 8);
  const leg1 = new THREE.Mesh(legGeo, mats.cyanMetal);
  leg1.rotation.z = 0.25;
  leg1.position.set(-1.3, 1.15, 0);
  const leg2 = new THREE.Mesh(legGeo, mats.cyanMetal);
  leg2.rotation.z = -0.25;
  leg2.position.set(1.3, 1.15, 0);
  swingGroup.add(leg1);
  swingGroup.add(leg2);

  // Xà ngang trên
  const topBarGeo = new THREE.CylinderGeometry(0.06, 0.06, 3.0, 8);
  const topBar = new THREE.Mesh(topBarGeo, mats.cyanMetal);
  topBar.rotation.z = Math.PI / 2;
  topBar.position.set(0, 2.25, 0);
  swingGroup.add(topBar);

  // 2 ghế ngồi xích đu màu hồng & vàng
  [-0.6, 0.6].forEach((gx, idx) => {
    // Dây xích đu
    const ropeGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.6, 6);
    const ropeMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    const ropeL = new THREE.Mesh(ropeGeo, ropeMat);
    ropeL.position.set(gx - 0.2, 1.45, 0);
    const ropeR = new THREE.Mesh(ropeGeo, ropeMat);
    ropeR.position.set(gx + 0.2, 1.45, 0);
    swingGroup.add(ropeL);
    swingGroup.add(ropeR);

    // Ghế ngồi
    const seatGeo = new THREE.BoxGeometry(0.5, 0.06, 0.25);
    const seatMat = idx === 0 ? mats.toyPink : mats.toyYellow;
    const seat = new THREE.Mesh(seatGeo, seatMat);
    seat.position.set(gx, 0.65, 0);
    seat.castShadow = true;
    swingGroup.add(seat);
  });
  playgroundGroup.add(swingGroup);

  // 3. Vòng quay / Mâm quay tròn (Carousel / Roundabout)
  const carouselGroup = new THREE.Group();
  carouselGroup.position.set(-1.5, 0, -2.5);

  const roundPlatGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 16);
  const roundPlat = new THREE.Mesh(roundPlatGeo, mats.toyGreen);
  roundPlat.position.set(0, 0.15, 0);
  roundPlat.receiveShadow = true;
  carouselGroup.add(roundPlat);

  // Trục xoay giữa
  const axisGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 8);
  const axis = new THREE.Mesh(axisGeo, mats.toyYellow);
  axis.position.set(0, 0.6, 0);
  carouselGroup.add(axis);

  // Tay nắm vòng tròn
  const ringGeo = new THREE.TorusGeometry(0.8, 0.04, 8, 16);
  const ring = new THREE.Mesh(ringGeo, mats.toyRed);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(0, 0.75, 0);
  carouselGroup.add(ring);

  playgroundGroup.add(carouselGroup);
  // Lưu để animate xoay nhẹ
  exteriorGroup.userData.carousel = carouselGroup;

  // 4. Khung thành bóng đá mini có lưới & quả bóng
  const goalGroup = new THREE.Group();
  goalGroup.position.set(1.8, 0, 2.5);

  const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
  const postL = new THREE.Mesh(postGeo, mats.wallWhite);
  postL.position.set(-1.0, 0.6, 0);
  const postR = new THREE.Mesh(postGeo, mats.wallWhite);
  postR.position.set(1.0, 0.6, 0);
  goalGroup.add(postL);
  goalGroup.add(postR);

  const crossbarGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.08, 8);
  const crossbar = new THREE.Mesh(crossbarGeo, mats.wallWhite);
  crossbar.rotation.z = Math.PI / 2;
  crossbar.position.set(0, 1.2, 0);
  goalGroup.add(crossbar);

  // Lưới khung thành
  const netGeo = new THREE.BoxGeometry(2.0, 1.15, 0.6);
  const netMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.35 });
  const net = new THREE.Mesh(netGeo, netMat);
  net.position.set(0, 0.6, 0.3);
  goalGroup.add(net);

  // Quả bóng mini
  const ballGeo = new THREE.SphereGeometry(0.2, 12, 12);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.4 });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  ball.position.set(0.2, 0.2, -0.6);
  ball.castShadow = true;
  goalGroup.add(ball);

  playgroundGroup.add(goalGroup);

  // Cây bóng mát hoạt hình cạnh sân chơi
  const treeGroup = new THREE.Group();
  treeGroup.position.set(-3.2, 0, 4.5);

  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.35, 2.8, 8);
  const trunk = new THREE.Mesh(trunkGeo, mats.treeTrunk);
  trunk.position.set(0, 1.4, 0);
  trunk.castShadow = true;
  treeGroup.add(trunk);

  // Tán lá phồng xốp hoạt hình
  const leaf1Geo = new THREE.SphereGeometry(1.4, 10, 10);
  const leaf1 = new THREE.Mesh(leaf1Geo, mats.treeLeaves);
  leaf1.position.set(0, 3.2, 0);
  leaf1.castShadow = true;
  treeGroup.add(leaf1);

  const leaf2Geo = new THREE.SphereGeometry(1.0, 8, 8);
  const leaf2 = new THREE.Mesh(leaf2Geo, mats.treeLeavesDark);
  leaf2.position.set(0.6, 3.8, 0.4);
  leaf2.castShadow = true;
  treeGroup.add(leaf2);

  const leaf3 = new THREE.Mesh(leaf2Geo, mats.treeLeaves);
  leaf3.position.set(-0.7, 3.5, -0.3);
  leaf3.castShadow = true;
  treeGroup.add(leaf3);

  playgroundGroup.add(treeGroup);
  exteriorGroup.userData.treeGroup = treeGroup;

  exteriorGroup.add(playgroundGroup);

  // --- 4. MÂY HOẠT HÌNH TRÊN CAO ---
  const cloudsGroup = new THREE.Group();
  function createCloud(x, y, z, scale = 1) {
    const cloud = new THREE.Group();
    const puffGeo = new THREE.SphereGeometry(1.0, 8, 8);

    const p1 = new THREE.Mesh(puffGeo, mats.cloudWhite);
    p1.scale.set(1.5, 0.8, 1.0);
    cloud.add(p1);

    const p2 = new THREE.Mesh(puffGeo, mats.cloudWhite);
    p2.scale.set(1.0, 1.0, 0.9);
    p2.position.set(-0.9, 0.3, 0.1);
    cloud.add(p2);

    const p3 = new THREE.Mesh(puffGeo, mats.cloudWhite);
    p3.scale.set(1.1, 0.9, 0.9);
    p3.position.set(0.9, 0.2, -0.1);
    cloud.add(p3);

    cloud.position.set(x, y, z);
    cloud.scale.setScalar(scale);
    return cloud;
  }

  const cloud1 = createCloud(-12, 11, -5, 1.3);
  const cloud2 = createCloud(4, 13, -12, 1.6);
  const cloud3 = createCloud(14, 10, -2, 1.2);
  const cloud4 = createCloud(-4, 12, 6, 1.0);
  cloudsGroup.add(cloud1, cloud2, cloud3, cloud4);
  exteriorGroup.add(cloudsGroup);
  exteriorGroup.userData.cloudsGroup = cloudsGroup;

  scene.add(exteriorGroup);
  return exteriorGroup;
}
