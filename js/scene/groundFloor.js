/**
 * ===================================================================
 * MẶT BẰNG TẦNG TRỆT (GROUND FLOOR) - SẮP XẾP CHÍNH XÁC TỪ TRÁI SANG PHẢI:
 * [ Sân chơi chính ] | [ Lớp Mẫu giáo bé (3-4t) ] | [ Lớp Nhà trẻ (5-36th) ] | [ Văn phòng ] [ Cầu thang ] | [ Bếp nấu + Thực đơn + Kho ]
 * (Chạy dọc phía trước các lớp và Văn phòng là Hiên chính cột hồng)
 * ===================================================================
 */

const THREE = window.THREE;

export function buildGroundFloor(scene, mats) {
  const groundFloorGroup = new THREE.Group();
  groundFloorGroup.name = "GroundFloorGroup";

  const roomHeight = 3.6;
  const backZ = -6.5;
  const divideZ = 0.8; // ranh giới giữa phòng trong và hiên trước
  const frontZ = 4.0;  // mép ngoài của hiên chính

  // --- SÀN TẦNG TRỆT TỔNG THỂ (X: -8.5 -> 14.5, Z: -6.5 -> 4.2) ---
  const floorGeo = new THREE.PlaneGeometry(23.2, 10.8);
  const floorMesh = new THREE.Mesh(floorGeo, mats.floorGround);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(3.0, 0.02, -1.1);
  floorMesh.receiveShadow = true;
  groundFloorGroup.add(floorMesh);

  // Tường sau cùng (Back Wall: Z = -6.5, X: -8.5 -> 14.5)
  const backWallGeo = new THREE.BoxGeometry(23.2, roomHeight, 0.25);
  const backWall = new THREE.Mesh(backWallGeo, mats.wallPink);
  backWall.position.set(3.0, roomHeight / 2, backZ);
  backWall.receiveShadow = true;
  groundFloorGroup.add(backWall);

  // Tường hông trái (Left Wall giáp Sân chơi chính: X = -8.5, Z: -6.5 -> 4.0)
  const leftWallGeo = new THREE.BoxGeometry(0.25, roomHeight, 10.6);
  const leftWall = new THREE.Mesh(leftWallGeo, mats.wallPink);
  leftWall.position.set(-8.5, roomHeight / 2, -1.2);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  groundFloorGroup.add(leftWall);

  // Tường hông phải (Right Wall: X = 14.5, Z: -6.5 -> 4.0)
  const rightWallGeo = new THREE.BoxGeometry(0.25, roomHeight, 10.6);
  const rightWall = new THREE.Mesh(rightWallGeo, mats.wallPink);
  rightWall.position.set(14.5, roomHeight / 2, -1.2);
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  groundFloorGroup.add(rightWall);

  // Vách ngăn ngăn cách phòng trong và hiên trước (chạy dọc Z = divideZ)
  // Có các ô cửa kính khung trắng và thanh chắn an toàn
  function createFrontRoomFacade(xStart, xEnd) {
    const width = xEnd - xStart;
    const facadeGroup = new THREE.Group();
    facadeGroup.position.set((xStart + xEnd) / 2, 0, divideZ);

    // Bức tường lửng dưới
    const lowWallGeo = new THREE.BoxGeometry(width, 1.0, 0.15);
    const lowWall = new THREE.Mesh(lowWallGeo, mats.verandaWall);
    lowWall.position.set(0, 0.5, 0);
    facadeGroup.add(lowWall);

    // Khung kính trên
    const glassGeo = new THREE.PlaneGeometry(width - 0.4, 1.8);
    const glass = new THREE.Mesh(glassGeo, mats.glassMaterial);
    glass.position.set(0, 2.0, 0);
    facadeGroup.add(glass);

    // Khung cửa trắng
    const frameBorder = new THREE.BoxGeometry(width, 0.08, 0.16);
    const topFrame = new THREE.Mesh(frameBorder, mats.windowFrame);
    topFrame.position.set(0, 2.9, 0);
    facadeGroup.add(topFrame);

    const midFrame = new THREE.Mesh(frameBorder, mats.windowFrame);
    midFrame.position.set(0, 1.0, 0);
    facadeGroup.add(midFrame);

    // Thanh chắn an toàn bằng gỗ
    for (let r = 0; r < 4; r++) {
      const railGeo = new THREE.BoxGeometry(width - 0.3, 0.04, 0.04);
      const rail = new THREE.Mesh(railGeo, mats.woodFurniture);
      rail.position.set(0, 1.25 + r * 0.35, 0.05);
      facadeGroup.add(rail);
    }

    return facadeGroup;
  }

  // Mặt tiền ngăn phòng Nhà trẻ & Mẫu giáo bé
  groundFloorGroup.add(createFrontRoomFacade(-8.5, -3.5));
  groundFloorGroup.add(createFrontRoomFacade(-3.5, 1.5));
  groundFloorGroup.add(createFrontRoomFacade(1.5, 5.5)); // Văn phòng

  // --- HIÊN CHÍNH (VERANDA) VỚI HÀNG CỘT HỒNG NỔI BẬT ---
  const verandaGroup = new THREE.Group();
  verandaGroup.name = "Veranda";

  // Dãy cột tròn màu hồng phấn nổi bật chạy dọc mặt trước hiên (Z = frontZ)
  const colRadius = 0.22;
  const colHeight = roomHeight;
  const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, colHeight, 16);
  const columnX = [-8.3, -4.8, -1.4, 1.8, 5.3, 8.4, 11.5, 14.3];

  columnX.forEach(x => {
    const col = new THREE.Mesh(colGeo, mats.pinkColumn);
    col.position.set(x, colHeight / 2, frontZ);
    col.castShadow = true;
    col.receiveShadow = true;
    verandaGroup.add(col);

    // Chân đế & mũ cột vuông bo nhẹ
    const baseCapGeo = new THREE.BoxGeometry(0.55, 0.12, 0.55);
    const baseCap = new THREE.Mesh(baseCapGeo, mats.wallWhite);
    baseCap.position.set(x, 0.06, frontZ);
    verandaGroup.add(baseCap);

    const topCap = new THREE.Mesh(baseCapGeo, mats.wallWhite);
    topCap.position.set(x, colHeight - 0.06, frontZ);
    verandaGroup.add(topCap);
  });

  // Dầm ngang nối đỉnh các cột hiên
  const beamGeo = new THREE.BoxGeometry(23.0, 0.25, 0.4);
  const beam = new THREE.Mesh(beamGeo, mats.wallPink);
  beam.position.set(3.0, roomHeight - 0.12, frontZ);
  beam.castShadow = true;
  verandaGroup.add(beam);

  // Dây hoa trang trí nhiều màu & chong chóng rực rỡ treo dọc trần hiên
  const garlandColors = [0xEC4899, 0xF59E0B, 0x10B981, 0x3B82F6, 0x8B5CF6, 0xEF4444];
  for (let gx = -7.5; gx <= 13.5; gx += 0.8) {
    const pinwheelGroup = new THREE.Group();
    pinwheelGroup.position.set(gx, roomHeight - 0.45, (frontZ + divideZ) / 2);

    // Dây cước treo
    const stringGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.45, 4);
    const string = new THREE.Mesh(stringGeo, new THREE.MeshBasicMaterial({ color: 0x94A3B8 }));
    string.position.y = 0.2;
    pinwheelGroup.add(string);

    // Hoa / chong chóng 4 cánh
    const c1 = garlandColors[Math.floor(Math.random() * garlandColors.length)];
    for (let p = 0; p < 4; p++) {
      const petalGeo = new THREE.ConeGeometry(0.08, 0.16, 4);
      const petalMat = new THREE.MeshStandardMaterial({ color: c1, roughness: 0.5 });
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.rotation.z = (p * Math.PI) / 2;
      petal.position.set(Math.cos(p * Math.PI / 2) * 0.08, Math.sin(p * Math.PI / 2) * 0.08, 0);
      pinwheelGroup.add(petal);
    }
    verandaGroup.add(pinwheelGroup);
  }

  // Bộ bàn ghế nhựa nhỏ nhiều màu cho bé sinh hoạt và ăn uống ngoài hiên
  const chairMatColors = [mats.toyRed, mats.toyYellow, mats.toyBlue, mats.toyGreen, mats.toyPink];
  function createKidTableSet(x, z) {
    const set = new THREE.Group();
    set.position.set(x, 0, z);

    // Bàn tròn nhựa
    const tableTopGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 16);
    const tableTop = new THREE.Mesh(tableTopGeo, mats.toyYellow);
    tableTop.position.set(0, 0.65, 0);
    tableTop.castShadow = true;
    set.add(tableTop);

    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8);
    for (let i = 0; i < 4; i++) {
      const leg = new THREE.Mesh(legGeo, mats.wallWhite);
      const a = (i * Math.PI) / 2;
      leg.position.set(Math.cos(a) * 0.35, 0.325, Math.sin(a) * 0.35);
      set.add(leg);
    }

    // 4 ghế nhựa nhỏ xung quanh
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + Math.PI / 4;
      const chair = new THREE.Group();
      chair.position.set(Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65);

      const seatGeo = new THREE.BoxGeometry(0.28, 0.04, 0.28);
      const chairMat = chairMatColors[i % chairMatColors.length];
      const seat = new THREE.Mesh(seatGeo, chairMat);
      seat.position.set(0, 0.35, 0);
      chair.add(seat);

      // Tựa lưng ghế
      const backGeo = new THREE.BoxGeometry(0.28, 0.3, 0.04);
      const back = new THREE.Mesh(backGeo, chairMat);
      back.position.set(0, 0.52, -0.12);
      chair.add(back);

      // Chân ghế
      const cLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 6);
      [[-0.1, -0.1], [0.1, -0.1], [-0.1, 0.1], [0.1, 0.1]].forEach(([cx, cz]) => {
        const cLeg = new THREE.Mesh(cLegGeo, mats.wallWhite);
        cLeg.position.set(cx, 0.175, cz);
        chair.add(cLeg);
      });

      chair.lookAt(set.position);
      set.add(chair);
    }
    return set;
  }

  verandaGroup.add(createKidTableSet(-6.0, 2.4));
  verandaGroup.add(createKidTableSet(-1.0, 2.4));
  verandaGroup.add(createKidTableSet(3.6, 2.4));

  groundFloorGroup.add(verandaGroup);

  // --- ĐÈN ẤM NỘI THẤT TỪNG PHÒNG (ROOM LIGHTS) ---
  const roomLights = {};

  // --- 1. LỚP MẪU GIÁO BÉ (3 - 4 TUỔI) (X: -8.5 -> -3.5, SÁT SÂN CHƠI CHÍNH) ---
  const mauGiaoBeGroup = new THREE.Group();
  mauGiaoBeGroup.position.set(-6.0, 0, (divideZ + backZ) / 2);

  // Vách ngăn với phòng Nhà trẻ (X = -3.5)
  const wallBe_Tre_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallBe_Tre = new THREE.Mesh(wallBe_Tre_Geo, mats.wallPink);
  wallBe_Tre.position.set(2.5, roomHeight / 2, 0);
  mauGiaoBeGroup.add(wallBe_Tre);

  // Bảng "Hoa Bé Ngoan" treo trên tường sau
  const goodBabyBoard = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), mats.goodBabyMaterial);
  goodBabyBoard.position.set(0, 2.0, -Math.abs(backZ - divideZ) / 2 + 0.15);
  mauGiaoBeGroup.add(goodBabyBoard);

  // Góc xếp hình thông minh: Kệ đồ chơi nhiều ngăn & các khối lego
  const toyShelfGeo = new THREE.BoxGeometry(2.4, 1.4, 0.45);
  const toyShelf = new THREE.Mesh(toyShelfGeo, mats.woodFurniture);
  toyShelf.position.set(-1.1, 0.7, -Math.abs(backZ - divideZ) / 2 + 0.35);
  mauGiaoBeGroup.add(toyShelf);

  // Các khối đồ chơi màu sắc trên kệ
  for (let b = 0; b < 6; b++) {
    const blockGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    const bMat = [mats.toyRed, mats.toyBlue, mats.toyYellow, mats.toyGreen][b % 4];
    const block = new THREE.Mesh(blockGeo, bMat);
    block.position.set(-1.8 + b * 0.3, 1.55, -Math.abs(backZ - divideZ) / 2 + 0.35);
    mauGiaoBeGroup.add(block);
  }

  // Bàn tô màu nhỏ & ghế cho bé
  const colorTableGeo = new THREE.BoxGeometry(1.6, 0.06, 1.0);
  const colorTable = new THREE.Mesh(colorTableGeo, mats.toyPink);
  colorTable.position.set(0, 0.65, 0.5);
  mauGiaoBeGroup.add(colorTable);

  const tLegGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8);
  [[-0.7, -0.4], [0.7, -0.4], [-0.7, 0.4], [0.7, 0.4]].forEach(([cx, cz]) => {
    const leg = new THREE.Mesh(tLegGeo, mats.wallWhite);
    leg.position.set(cx, 0.325, cz);
    colorTable.add(leg);
  });

  // Hộp bút sáp màu trên bàn
  const crayonGeo = new THREE.BoxGeometry(0.3, 0.12, 0.2);
  const crayon = new THREE.Mesh(crayonGeo, mats.toyYellow);
  crayon.position.set(0.2, 0.72, 0.5);
  mauGiaoBeGroup.add(crayon);

  // Đèn trần ấm áp Lớp Mẫu giáo bé
  const lightBe = new THREE.PointLight(0xFDE68A, 0.2, 8);
  lightBe.position.set(0, roomHeight - 0.5, 0);
  mauGiaoBeGroup.add(lightBe);
  roomLights.mauGiaoBe = lightBe;

  groundFloorGroup.add(mauGiaoBeGroup);

  // --- 2. LỚP NHÀ TRẺ (5 - 36 THÁNG) (X: -3.5 -> 1.5, Ở GIỮA) ---
  const nhaTreGroup = new THREE.Group();
  nhaTreGroup.position.set(-1.0, 0, (divideZ + backZ) / 2);

  // Thảm xốp ghép êm dịu nhiều màu sắc phủ sàn
  const foamSize = 1.0;
  const foamMats = [mats.foamMatMat, mats.foamMatPink, mats.foamMatBlue];
  for (let fx = -2.0; fx <= 2.0; fx += foamSize) {
    for (let fz = -2.5; fz <= 2.5; fz += foamSize) {
      const foamGeo = new THREE.PlaneGeometry(foamSize * 0.95, foamSize * 0.95);
      const fMat = foamMats[Math.floor(Math.abs(fx * 3 + fz * 5)) % foamMats.length];
      const foam = new THREE.Mesh(foamGeo, fMat);
      foam.rotation.x = -Math.PI / 2;
      foam.position.set(fx, 0.03, fz);
      foam.receiveShadow = true;
      nhaTreGroup.add(foam);
    }
  }

  // 2 Nôi cũi & nệm ngủ gọn gàng cho bé sơ sinh
  function createCrib(cx, cz) {
    const crib = new THREE.Group();
    crib.position.set(cx, 0, cz);

    // Khung nôi gỗ trắng
    const cribBoxGeo = new THREE.BoxGeometry(1.4, 0.7, 0.85);
    const cribBox = new THREE.Mesh(cribBoxGeo, mats.wallWhite);
    cribBox.position.set(0, 0.45, 0);
    crib.add(cribBox);

    // Nệm êm dịu hồng/xanh
    const matGeo = new THREE.BoxGeometry(1.3, 0.15, 0.75);
    const mat = new THREE.Mesh(matGeo, mats.toyPink);
    mat.position.set(0, 0.55, 0);
    crib.add(mat);

    // Gối nhỏ
    const pillowGeo = new THREE.BoxGeometry(0.35, 0.08, 0.25);
    const pillow = new THREE.Mesh(pillowGeo, mats.cloudWhite);
    pillow.position.set(-0.4, 0.65, 0);
    crib.add(pillow);

    return crib;
  }

  nhaTreGroup.add(createCrib(-1.2, -1.8));
  nhaTreGroup.add(createCrib(1.2, -1.8));

  // Đồ chơi khối mềm silicon an toàn
  const softPyramid = new THREE.Group();
  softPyramid.position.set(0, 0, 1.2);
  for (let r = 0; r < 4; r++) {
    const ringGeo = new THREE.TorusGeometry(0.4 - r * 0.08, 0.08, 8, 16);
    const rMat = [mats.toyRed, mats.toyYellow, mats.toyGreen, mats.toyBlue][r];
    const ring = new THREE.Mesh(ringGeo, rMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.1 + r * 0.15;
    softPyramid.add(ring);
  }
  nhaTreGroup.add(softPyramid);

  // Đèn ấm Nhà trẻ
  const lightTre = new THREE.PointLight(0xFDE68A, 0.2, 8);
  lightTre.position.set(0, roomHeight - 0.5, 0);
  nhaTreGroup.add(lightTre);
  roomLights.nhaTre = lightTre;

  groundFloorGroup.add(nhaTreGroup);

  // --- 3. VĂN PHÒNG (ĐỐI DIỆN TRỰC TIẾP CỔNG CHÍNH: X = 1.5 -> 5.5) ---
  const officeGroup = new THREE.Group();
  officeGroup.position.set(3.5, 0, (divideZ + backZ) / 2);

  // Vách ngăn giữa Nhà trẻ và Văn phòng (X = 1.5)
  const wallTre_Of_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallTre_Of = new THREE.Mesh(wallTre_Of_Geo, mats.wallPink);
  wallTre_Of.position.set(-2.0, roomHeight / 2, 0);
  officeGroup.add(wallTre_Of);

  // Bàn làm việc hiệu trưởng & tiếp phụ huynh
  const deskGeo = new THREE.BoxGeometry(1.6, 0.75, 0.9);
  const desk = new THREE.Mesh(deskGeo, mats.woodFurniture);
  desk.position.set(0, 0.375, -1.2);
  officeGroup.add(desk);

  // Ghế làm việc & ghế tiếp phụ huynh
  const chairGeo = new THREE.BoxGeometry(0.45, 0.8, 0.45);
  const bossChair = new THREE.Mesh(chairGeo, mats.cyanMetal);
  bossChair.position.set(0, 0.4, -2.0);
  officeGroup.add(bossChair);

  const guestChair = new THREE.Mesh(chairGeo, mats.cyanMetal);
  guestChair.position.set(0, 0.4, -0.3);
  guestChair.rotation.y = Math.PI;
  officeGroup.add(guestChair);

  // Máy tính xách tay & bình hoa sen nhỏ trên bàn
  const laptopGeo = new THREE.BoxGeometry(0.35, 0.03, 0.25);
  const laptop = new THREE.Mesh(laptopGeo, mats.curbStone);
  laptop.position.set(-0.35, 0.765, -1.2);
  officeGroup.add(laptop);

  const vaseGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.2, 8);
  const vase = new THREE.Mesh(vaseGeo, mats.toyPink);
  vase.position.set(0.4, 0.85, -1.2);
  officeGroup.add(vase);

  // Kệ hồ sơ ngăn nắp
  const fileCabinetGeo = new THREE.BoxGeometry(0.6, 1.8, 1.4);
  const fileCabinet = new THREE.Mesh(fileCabinetGeo, mats.wallWhite);
  fileCabinet.position.set(-1.5, 0.9, 0.5);
  officeGroup.add(fileCabinet);

  // Đèn ấm Văn phòng
  const lightOf = new THREE.PointLight(0xFDE68A, 0.3, 8);
  lightOf.position.set(0, roomHeight - 0.5, 0);
  officeGroup.add(lightOf);
  roomLights.vanPhong = lightOf;

  groundFloorGroup.add(officeGroup);

  // --- 4. CẦU THANG LÊN LẦU 2 (X: 5.5 -> 8.5) ---
  const stairGroup = new THREE.Group();
  stairGroup.position.set(7.0, 0, (divideZ + backZ) / 2);

  // Bậc thang màu xám (12 bậc dẫn lên tầng 2)
  const stepCount = 10;
  const stairWidth = 1.8;
  const totalRise = roomHeight;
  const totalRun = Math.abs(backZ - divideZ) - 1.0;

  for (let s = 0; s < stepCount; s++) {
    const stepH = (s + 1) * (totalRise / stepCount);
    const stepGeo = new THREE.BoxGeometry(stairWidth, totalRise / stepCount, totalRun / stepCount);
    const stepMesh = new THREE.Mesh(stepGeo, mats.stairSteps);
    stepMesh.position.set(
      0,
      stepH - (totalRise / stepCount) / 2,
      divideZ - 0.5 - s * (totalRun / stepCount)
    );
    stepMesh.receiveShadow = true;
    stairGroup.add(stepMesh);
  }

  // Tay vịn sắt phối nhiều màu sắc nổi bật
  const railGeo = new THREE.CylinderGeometry(0.03, 0.03, totalRun * 1.25, 8);
  const handrail = new THREE.Mesh(railGeo, mats.handrailMetal);
  handrail.rotation.x = -0.58;
  handrail.position.set(stairWidth / 2 - 0.05, totalRise / 2 + 0.6, (divideZ + backZ) / 2);
  stairGroup.add(handrail);

  // Mảng tường chiếu nghỉ phía sau vẽ BỨC TRANH HOA SEN HỒNG NỞ RỘ
  const lotusMuralGeo = new THREE.PlaneGeometry(2.2, 2.2);
  const lotusMural = new THREE.Mesh(lotusMuralGeo, mats.lotusMuralMaterial);
  lotusMural.position.set(0, roomHeight / 2 + 0.3, backZ + 0.15);
  stairGroup.add(lotusMural);

  // Dải hoa treo trang trí trên đỉnh tranh sen
  for (let h = -0.9; h <= 0.9; h += 0.3) {
    const hangFlowerGeo = new THREE.SphereGeometry(0.08, 6, 6);
    const hangFlowerMat = new THREE.MeshBasicMaterial({ color: 0xF472B6 });
    const hangFlower = new THREE.Mesh(hangFlowerGeo, hangFlowerMat);
    hangFlower.position.set(h, roomHeight / 2 + 1.5, backZ + 0.2);
    stairGroup.add(hangFlower);
  }

  groundFloorGroup.add(stairGroup);

  // --- 5. BẾP NẤU, BẢNG THỰC ĐƠN TUẦN & KHO (X: 8.5 -> 14.5) ---
  const kitchenGroup = new THREE.Group();
  kitchenGroup.position.set(11.5, 0, (divideZ + backZ) / 2);

  // Vách ngăn giữa Cầu thang và Bếp (X = 8.5)
  const wallStair_Kitchen_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallStair_Kitchen = new THREE.Mesh(wallStair_Kitchen_Geo, mats.wallPink);
  wallStair_Kitchen.position.set(-3.0, roomHeight / 2, 0);
  kitchenGroup.add(wallStair_Kitchen);

  // Kệ bếp nấu ăn bán trú sạch sẽ hình chữ L (inox / đá sáng)
  const kitchenCounterGeo = new THREE.BoxGeometry(3.6, 0.85, 0.9);
  const kitchenCounter = new THREE.Mesh(kitchenCounterGeo, mats.wallWhite);
  kitchenCounter.position.set(0.6, 0.425, backZ + 0.8);
  kitchenGroup.add(kitchenCounter);

  // Bếp gas / từ hoạt hình & các nồi chảo inox nhỏ
  const potGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.22, 10);
  const potMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.6, roughness: 0.3 });
  const pot1 = new THREE.Mesh(potGeo, potMat);
  pot1.position.set(0, 0.96, backZ + 0.8);
  kitchenGroup.add(pot1);

  const pot2 = new THREE.Mesh(potGeo, mats.toyRed);
  pot2.position.set(0.7, 0.96, backZ + 0.8);
  kitchenGroup.add(pot2);

  // Bảng THỰC ĐƠN TUẦN treo trên tường bếp
  const menuBoard = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.6), mats.menuMaterial);
  menuBoard.position.set(0.6, 2.2, backZ + 0.15);
  kitchenGroup.add(menuBoard);

  // Góc kho ngăn nắp: Kệ chứa khay cơm & đồ gia vị
  const shelfGeo = new THREE.BoxGeometry(0.6, 1.8, 1.8);
  const shelf = new THREE.Mesh(shelfGeo, mats.woodFurniture);
  shelf.position.set(2.4, 0.9, 0.5);
  kitchenGroup.add(shelf);

  // Đèn ấm Bếp
  const lightKitchen = new THREE.PointLight(0xFDE68A, 0.3, 8);
  lightKitchen.position.set(0.6, roomHeight - 0.5, 0);
  kitchenGroup.add(lightKitchen);
  roomLights.bep = lightKitchen;

  groundFloorGroup.add(kitchenGroup);

  // Lưu roomLights để scene3d / timeline bật tắt mượt mà
  groundFloorGroup.userData.roomLights = roomLights;

  scene.add(groundFloorGroup);
  return groundFloorGroup;
}
