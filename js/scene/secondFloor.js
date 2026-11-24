/**
 * ===================================================================
 * MẶT BẰNG LẦU 2 & MÁI NHÀ (SECOND FLOOR & ROOF)
 * SẮP XẾP CHÍNH XÁC TỪ TRÁI SANG PHẢI:
 * [ Sân chơi nhỏ trái ] | [ Lớp Mẫu giáo lớn (5-6t) ] | [ Lối lên Cầu thang ] | [ Lớp Mẫu giáo nhỡ (4-5t) ] | [ Sân chơi nhỏ phải ]
 * (Mặt tiền có hàng cột hồng và rèm sọc xanh ngọc che mát đặc trưng)
 * ===================================================================
 */

const THREE = window.THREE;

export function buildSecondFloor(scene, mats) {
  // Nhóm Lầu 2 bao gồm sàn, tường, nội thất và rèm
  const secondFloorGroup = new THREE.Group();
  secondFloorGroup.name = "SecondFloorGroup";

  const floorY = 3.6; // sàn lầu 2 nằm trên trần tầng trệt
  const roomHeight = 3.2;
  const backZ = -6.5;
  const divideZ = 0.8;
  const frontZ = 4.0;

  // --- 1. TẤM SÀN LẦU 2 (SLAB: X = -8.5 -> 15.0, Z = -6.5 -> 4.2) ---
  const slabGeo = new THREE.BoxGeometry(23.7, 0.28, 10.8);
  const slab = new THREE.Mesh(slabGeo, mats.wallWhite);
  slab.position.set(3.2, floorY + 0.14, -1.1);
  slab.receiveShadow = true;
  secondFloorGroup.add(slab);

  const tileGeo = new THREE.PlaneGeometry(23.5, 10.6);
  const tileMesh = new THREE.Mesh(tileGeo, mats.floorSecond);
  tileMesh.rotation.x = -Math.PI / 2;
  tileMesh.position.set(3.2, floorY + 0.29, -1.1);
  tileMesh.receiveShadow = true;
  secondFloorGroup.add(tileMesh);

  // Tường sau cùng Lầu 2
  const backWallGeo = new THREE.BoxGeometry(23.7, roomHeight, 0.25);
  const backWall = new THREE.Mesh(backWallGeo, mats.wallPink);
  backWall.position.set(3.2, floorY + roomHeight / 2, backZ);
  backWall.receiveShadow = true;
  secondFloorGroup.add(backWall);

  // Tường hông trái & phải
  const leftWallGeo = new THREE.BoxGeometry(0.25, roomHeight, 10.6);
  const leftWall = new THREE.Mesh(leftWallGeo, mats.wallPink);
  leftWall.position.set(-8.5, floorY + roomHeight / 2, -1.2);
  secondFloorGroup.add(leftWall);

  const rightWallGeo = new THREE.BoxGeometry(0.25, roomHeight, 10.6);
  const rightWall = new THREE.Mesh(rightWallGeo, mats.wallPink);
  rightWall.position.set(15.0, floorY + roomHeight / 2, -1.2);
  secondFloorGroup.add(rightWall);

  // --- 2. HÀNG CỘT HỒNG & RÈM SỌC XANH NGỌC MẶT TIỀN LẦU 2 ---
  const facadeGroup = new THREE.Group();
  facadeGroup.position.set(0, floorY, frontZ);

  // Dãy cột tròn hồng mặt tiền Lầu 2
  const colGeo = new THREE.CylinderGeometry(0.2, 0.2, roomHeight, 16);
  const colX = [-8.3, -4.5, -0.5, 3.5, 7.5, 11.5, 14.8];
  colX.forEach(x => {
    const col = new THREE.Mesh(colGeo, mats.pinkColumn);
    col.position.set(x, roomHeight / 2, 0);
    col.castShadow = true;
    facadeGroup.add(col);
  });

  // Dầm ngang dải trên
  const topBeamGeo = new THREE.BoxGeometry(23.7, 0.25, 0.35);
  const topBeam = new THREE.Mesh(topBeamGeo, mats.wallPink);
  topBeam.position.set(3.2, roomHeight - 0.125, 0);
  facadeGroup.add(topBeam);

  // Lan can ban công an toàn phía trước
  const railH = 1.0;
  const railGeo = new THREE.BoxGeometry(23.5, railH, 0.08);
  const railMesh = new THREE.Mesh(railGeo, mats.wallWhite);
  railMesh.position.set(3.2, railH / 2, 0);
  facadeGroup.add(railMesh);

  // LƯỚI / RÈM SỌC XANH NGỌC CHE MÁT ĐẶC TRƯNG CỦA LẦU 2
  // Thiết kế dạng các tấm rèm rủ từ trần xuống, có độ trong suốt và khe hé
  const blindW = 3.6;
  const blindH = 1.8;
  const blindGeo = new THREE.PlaneGeometry(blindW, blindH);
  const blindPositions = [-6.4, -2.5, 1.5, 5.5, 9.5, 13.1];

  blindPositions.forEach((bx, idx) => {
    const blind = new THREE.Mesh(blindGeo, mats.stripedBlinds);
    blind.position.set(bx, roomHeight - blindH / 2 - 0.2, 0.06);
    // Vài tấm cuộn nhẹ tạo cảm giác thoáng đãng thực tế
    if (idx % 2 === 1) {
      blind.scale.y = 0.7;
      blind.position.y += 0.25;
    }
    facadeGroup.add(blind);
  });

  secondFloorGroup.add(facadeGroup);

  // --- 3. NỘI THẤT CÁC PHÒNG TRÊN LẦU 2 ---
  const roomLights = {};

  // --- A. SÂN CHƠI NHỎ BÊN TRÁI (X: -8.5 -> -4.5) ---
  const leftSubPlayground = new THREE.Group();
  leftSubPlayground.position.set(-6.5, floorY, (divideZ + backZ) / 2);

  // Bàn ghế nhỏ phục vụ ăn uống & sinh hoạt trải nghiệm ngoài trời
  const subTableGeo = new THREE.BoxGeometry(1.4, 0.05, 0.8);
  const subTableL = new THREE.Mesh(subTableGeo, mats.toyYellow);
  subTableL.position.set(0, 0.65, 0);
  leftSubPlayground.add(subTableL);

  for (let c = 0; c < 2; c++) {
    const sChairGeo = new THREE.BoxGeometry(0.3, 0.35, 0.3);
    const sChair = new THREE.Mesh(sChairGeo, mats.toyBlue);
    sChair.position.set(-0.4 + c * 0.8, 0.35, 0.65);
    leftSubPlayground.add(sChair);
  }

  // Chậu cây cảnh nhỏ xanh mát
  const potGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.35, 8);
  const potL = new THREE.Mesh(potGeo, mats.wallWhite);
  potL.position.set(-1.2, 0.18, -1.5);
  const plantGeo = new THREE.SphereGeometry(0.3, 6, 6);
  const plantL = new THREE.Mesh(plantGeo, mats.treeLeaves);
  plantL.position.set(-1.2, 0.45, -1.5);
  leftSubPlayground.add(potL, plantL);

  secondFloorGroup.add(leftSubPlayground);

  // --- B. LỚP MẪU GIÁO LỚN (5 - 6 TUỔI) (X: -4.5 -> 5.5, BÊN TRÁI CẦU THANG) ---
  const mauGiaoLonGroup = new THREE.Group();
  mauGiaoLonGroup.position.set(0.5, floorY, (divideZ + backZ) / 2);

  // Vách ngăn với sân chơi nhỏ trái (X = -4.5)
  const wallSubL_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallSubL = new THREE.Mesh(wallSubL_Geo, mats.wallPink);
  wallSubL.position.set(-5.0, roomHeight / 2, 0);
  mauGiaoLonGroup.add(wallSubL);

  // Vách ngăn với lối cầu thang (X = 5.5)
  const wallLon_Stair_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallLon_Stair = new THREE.Mesh(wallLon_Stair_Geo, mats.wallPink);
  wallLon_Stair.position.set(5.0, roomHeight / 2, 0);
  mauGiaoLonGroup.add(wallLon_Stair);

  // Bảng chữ cái & con số chuẩn bị vào Lớp 1 treo trên tường sau
  const alphabetBoard = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), mats.alphabetMaterial);
  alphabetBoard.position.set(0, 1.8, -Math.abs(backZ - divideZ) / 2 + 0.15);
  mauGiaoLonGroup.add(alphabetBoard);

  // Bàn ghế học tập ngay ngắn (2 dãy bàn dài)
  for (let r = 0; r < 2; r++) {
    const studyDeskGeo = new THREE.BoxGeometry(3.6, 0.65, 0.6);
    const studyDesk = new THREE.Mesh(studyDeskGeo, mats.woodFurniture);
    studyDesk.position.set(0, 0.325, -0.6 + r * 1.5);
    mauGiaoLonGroup.add(studyDesk);

    // 4 ghế nhỏ ngồi học ngay ngắn
    for (let c = 0; c < 4; c++) {
      const chairGeo = new THREE.BoxGeometry(0.32, 0.6, 0.32);
      const chair = new THREE.Mesh(chairGeo, mats.toyBlue);
      chair.position.set(-1.3 + c * 0.85, 0.3, -0.1 + r * 1.5);
      mauGiaoLonGroup.add(chair);
    }
  }

  // Góc đọc sách & kệ sách chuẩn bị vào Lớp 1
  const bookShelfGeo = new THREE.BoxGeometry(0.5, 1.6, 1.6);
  const bookShelf = new THREE.Mesh(bookShelfGeo, mats.toyYellow);
  bookShelf.position.set(-4.5, 0.8, -1.0);
  mauGiaoLonGroup.add(bookShelf);

  // Đèn ấm Lớp Mẫu giáo lớn
  const lightLon = new THREE.PointLight(0xFDE68A, 0.2, 8);
  lightLon.position.set(0, roomHeight - 0.4, 0);
  mauGiaoLonGroup.add(lightLon);
  roomLights.mauGiaoLon = lightLon;

  secondFloorGroup.add(mauGiaoLonGroup);

  // --- C. LỐI LÊN CẦU THANG (X: 5.5 -> 7.5) ---
  const stairLandingGroup = new THREE.Group();
  stairLandingGroup.position.set(6.5, floorY, (divideZ + backZ) / 2);

  // Lan can giếng trời cầu thang
  const landingRailGeo = new THREE.BoxGeometry(1.8, 0.9, 0.06);
  const landingRail = new THREE.Mesh(landingRailGeo, mats.handrailMetal);
  landingRail.position.set(0, 0.45, 1.2);
  stairLandingGroup.add(landingRail);

  secondFloorGroup.add(stairLandingGroup);

  // --- D. LỚP MẪU GIÁO NHỠ (4 - 5 TUỔI) (X: 7.5 -> 12.0, BÊN PHẢI CẦU THANG) ---
  const mauGiaoNhoGroup = new THREE.Group();
  mauGiaoNhoGroup.position.set(9.8, floorY, (divideZ + backZ) / 2);

  // Vách ngăn với lối cầu thang (X = 7.5)
  const wallStair_Nho_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallStair_Nho = new THREE.Mesh(wallStair_Nho_Geo, mats.wallPink);
  wallStair_Nho.position.set(-2.3, roomHeight / 2, 0);
  mauGiaoNhoGroup.add(wallStair_Nho);

  // Vách ngăn với sân chơi nhỏ phải (X = 12.0)
  const wallNho_SubR_Geo = new THREE.BoxGeometry(0.2, roomHeight, Math.abs(backZ - divideZ));
  const wallNho_SubR = new THREE.Mesh(wallNho_SubR_Geo, mats.wallPink);
  wallNho_SubR.position.set(2.2, roomHeight / 2, 0);
  mauGiaoNhoGroup.add(wallNho_SubR);

  // Bàn sinh hoạt nhóm hình tròn lớn ở giữa
  const groupTableGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.06, 16);
  const groupTable = new THREE.Mesh(groupTableGeo, mats.toyGreen);
  groupTable.position.set(0, 0.65, 0.2);
  mauGiaoNhoGroup.add(groupTable);

  // Ghế đa sắc xung quanh bàn nhóm
  for (let i = 0; i < 5; i++) {
    const ang = (i * 2 * Math.PI) / 5;
    const gChairGeo = new THREE.BoxGeometry(0.28, 0.35, 0.28);
    const gMat = [mats.toyPink, mats.toyYellow, mats.toyBlue, mats.toyRed, mats.fencePurple][i];
    const gChair = new THREE.Mesh(gChairGeo, gMat);
    gChair.position.set(Math.cos(ang) * 1.35, 0.35, 0.2 + Math.sin(ang) * 1.35);
    mauGiaoNhoGroup.add(gChair);
  }

  // Góc nghệ thuật & giá vẽ tranh (Easel)
  const easelGroup = new THREE.Group();
  easelGroup.position.set(-1.2, 0, -1.8);
  const easelLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 6);
  const e1 = new THREE.Mesh(easelLegGeo, mats.woodFurniture);
  e1.position.set(-0.25, 0.7, 0);
  const e2 = new THREE.Mesh(easelLegGeo, mats.woodFurniture);
  e2.position.set(0.25, 0.7, 0);
  easelGroup.add(e1, e2);

  const canvasGeo = new THREE.PlaneGeometry(0.65, 0.5);
  const canvasMesh = new THREE.Mesh(canvasGeo, mats.lotusMuralMaterial);
  canvasMesh.position.set(0, 0.85, 0.05);
  easelGroup.add(canvasMesh);
  mauGiaoNhoGroup.add(easelGroup);

  // Giá sách nghệ thuật trên tường
  const artShelfGeo = new THREE.BoxGeometry(1.8, 0.1, 0.3);
  const artShelf = new THREE.Mesh(artShelfGeo, mats.woodFurniture);
  artShelf.position.set(0.6, 1.6, -Math.abs(backZ - divideZ) / 2 + 0.2);
  mauGiaoNhoGroup.add(artShelf);

  // Đèn ấm Lớp Mẫu giáo nhỡ
  const lightNho = new THREE.PointLight(0xFDE68A, 0.2, 8);
  lightNho.position.set(0, roomHeight - 0.4, 0);
  mauGiaoNhoGroup.add(lightNho);
  roomLights.mauGiaoNho = lightNho;

  secondFloorGroup.add(mauGiaoNhoGroup);

  // --- E. SÂN CHƠI NHỎ BÊN PHẢI (X: 12.0 -> 15.0) ---
  const rightSubPlayground = new THREE.Group();
  rightSubPlayground.position.set(13.5, floorY, (divideZ + backZ) / 2);

  const subTableR = new THREE.Mesh(subTableGeo, mats.toyPink);
  subTableR.position.set(0, 0.65, 0);
  rightSubPlayground.add(subTableR);

  for (let c = 0; c < 2; c++) {
    const sChair = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.3), mats.toyGreen);
    sChair.position.set(-0.35 + c * 0.7, 0.35, 0.65);
    rightSubPlayground.add(sChair);
  }

  secondFloorGroup.add(rightSubPlayground);

  // Lưu roomLights Lầu 2
  secondFloorGroup.userData.roomLights = roomLights;

  // --- 4. KHỐI MÁI NHÀ (ROOF GROUP: CÓ THỂ NHẤC LÊN / MỞ RA TRONG CUTAWAY) ---
  const roofGroup = new THREE.Group();
  roofGroup.name = "RoofGroup";
  roofGroup.position.set(3.2, floorY + roomHeight, -1.1);

  // Khối trần nhà
  const ceilingGeo = new THREE.BoxGeometry(24.2, 0.25, 11.2);
  const ceiling = new THREE.Mesh(ceilingGeo, mats.wallWhite);
  roofGroup.add(ceiling);

  // Mái dốc hai bên hoặc mái che lượn sóng màu ngọc
  const mainRoofGeo = new THREE.ConeGeometry(14.5, 2.2, 4);
  const mainRoof = new THREE.Mesh(mainRoofGeo, mats.roofCyan);
  mainRoof.rotation.y = Math.PI / 4;
  mainRoof.scale.set(1.2, 0.8, 0.58);
  mainRoof.position.set(0, 1.15, 0);
  mainRoof.castShadow = true;
  roofGroup.add(mainRoof);

  // Viền chỉ mái nổi bật
  const trimGeo = new THREE.BoxGeometry(24.6, 0.15, 11.6);
  const trim = new THREE.Mesh(trimGeo, mats.wallWhite);
  trim.position.set(0, 0.1, 0);
  roofGroup.add(trim);

  // Lưu reference để cutaway nhấc mái
  secondFloorGroup.userData.roofGroup = roofGroup;
  secondFloorGroup.add(roofGroup);

  scene.add(secondFloorGroup);
  return secondFloorGroup;
}
