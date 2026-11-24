/**
 * ===================================================================
 * BẢNG MÀU PASTEL & VẬT LIỆU 3D HOẠT HÌNH (CARTOON DIORAMA MATERIALS)
 * ===================================================================
 * Định nghĩa toàn bộ vật liệu tái sử dụng và tạo CanvasTexture sắc nét:
 * - Biển hiệu trường, Nội quy, Thông báo
 * - Cờ đỏ sao vàng
 * - Tranh Hoa Sen cầu thang, Bảng Hoa Bé Ngoan, Bảng Thực Đơn, Bảng Chữ Cái
 * - Bảng màu pastel thân thiện chuẩn trường mầm non
 */

const THREE = window.THREE;

// --- HÀM HELPER TẠO CANVAS TEXTURE SẮC NÉT ---
function createSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // Nền trắng viền đỏ hồng
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 12;
  ctx.strokeStyle = '#E87A90';
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

  // Dải trên: UBND XÃ SƠN TỊNH
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 26px "Nunito", "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('UBND XÃ SƠN TỊNH', 40, 48);

  // Vẽ biểu tượng Hoa Sen nhỏ bên trái
  ctx.save();
  ctx.translate(90, 160);
  ctx.fillStyle = '#E87A90';
  ctx.beginPath();
  // Cánh sen giữa
  ctx.ellipse(0, -10, 22, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  // Cánh sen trái
  ctx.ellipse(-24, 0, 18, 42, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  // Cánh sen phải
  ctx.ellipse(24, 0, 18, 42, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  // Vòng tròn bảo vệ & chữ HOA SEN
  ctx.strokeStyle = '#E87A90';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MẦM NON', 0, 38);
  ctx.fillText('HOA SEN', 0, 52);
  ctx.restore();

  // Tiêu đề: LỚP MẦM NON ĐỘC LẬP
  ctx.fillStyle = '#D93850';
  ctx.font = 'bold 34px "Nunito", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LỚP MẦM NON ĐỘC LẬP', 580, 105);

  // Chữ to rực rỡ: HOA SEN
  ctx.font = '900 95px "Nunito", "Segoe UI", sans-serif';
  // Đổ bóng chữ
  ctx.fillStyle = 'rgba(232, 122, 144, 0.25)';
  ctx.fillText('HOA SEN', 583, 208);
  // Màu chính
  ctx.fillStyle = '#D92D57';
  ctx.fillText('HOA SEN', 580, 205);

  // Khung dải xanh bên dưới
  ctx.fillStyle = '#059669';
  ctx.fillRect(20, 250, canvas.width - 40, 90);

  // Mũi tên xanh trang trí
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.moveTo(canvas.width - 240, 250);
  ctx.lineTo(canvas.width - 200, 295);
  ctx.lineTo(canvas.width - 240, 340);
  ctx.closePath();
  ctx.fill();

  // Thông tin liên hệ
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px "Nunito", sans-serif';
  ctx.fillText('📍 Địa chỉ: Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh', 40, 285);
  ctx.fillText('📞 Điện thoại liên hệ: 0919.040317', 40, 323);

  ctx.font = 'italic 18px "Nunito", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('QĐ Số: 1815/QĐ-UBND', canvas.width - 50, 285);
  ctx.fillText('ngày 08/12/2025 UBND Xã Sơn Tịnh', canvas.width - 50, 318);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// Bảng Nội quy dành cho phụ huynh
function createRulesTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#D93850';
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  ctx.fillStyle = '#D93850';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NỘI QUY', canvas.width / 2, 50);
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('DÀNH CHO PHỤ HUYNH', canvas.width / 2, 85);

  ctx.strokeStyle = '#D93850';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 105);
  ctx.lineTo(canvas.width - 80, 105);
  ctx.stroke();

  ctx.fillStyle = '#333333';
  ctx.textAlign = 'left';
  ctx.font = '18px sans-serif';
  const rules = [
    '1. Đưa đón trẻ đúng giờ:',
    '   - Sáng đón: 6h30 – 7h30',
    '   - Chiều trả: 16h00 – 17h00',
    '2. Để xe ngay ngắn ngoài cổng.',
    '3. Trao đổi tình hình bé với cô giáo.',
    '4. Không hút thuốc trong khuôn viên.',
    '5. Báo trước khi có người lạ đón hộ.',
    '6. Chung tay giữ gìn vệ sinh sạch sẽ.'
  ];
  let y = 150;
  rules.forEach(line => {
    ctx.fillText(line, 40, y);
    y += 42;
  });

  ctx.fillStyle = '#D93850';
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ĐỀ NGHỊ PHỤ HUYNH QUAN TÂM PHỐI HỢP', canvas.width / 2, 640);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Bảng Thông báo
function createNoticeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#2FA4B8';
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  ctx.fillStyle = '#2FA4B8';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('THÔNG BÁO', canvas.width / 2, 60);

  ctx.fillStyle = '#555555';
  ctx.textAlign = 'left';
  ctx.font = '19px sans-serif';
  const notes = [
    '• Tuyển sinh liên tục từ 5 tháng',
    '  đến 6 tuổi các ngày trong tuần.',
    '• Thực đơn bán trú cập nhật thứ 2.',
    '• Khám sức khỏe định kỳ cho bé.',
    '• Phụ huynh liên hệ hotline:',
    '  0919.040317 để được tư vấn.'
  ];
  let y = 140;
  notes.forEach(line => {
    ctx.fillText(line, 45, y);
    y += 55;
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Cờ đỏ sao vàng
function createFlagTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 450;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  // Nền đỏ cờ
  ctx.fillStyle = '#DA251D';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Vẽ ngôi sao vàng 5 cánh ở tâm
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = '#FFFF00';
  ctx.beginPath();
  const spikes = 5;
  const outerRadius = 75;
  const innerRadius = 30;
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.moveTo(0, -outerRadius);
  for (let i = 0; i < spikes; i++) {
    let x = Math.cos(rot) * outerRadius;
    let y = Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = Math.cos(rot) * innerRadius;
    y = Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(0, -outerRadius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Bức tranh Hoa Sen nở rộ trên tường cầu thang
function createLotusMuralTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Nền trời xanh mây êm dịu
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#D4F0F7');
  grad.addColorStop(1, '#FFF5F8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lá sen xanh
  ctx.fillStyle = '#34D399';
  ctx.beginPath();
  ctx.ellipse(256, 380, 160, 60, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.ellipse(150, 410, 90, 40, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Đóa sen hồng rực rỡ ở giữa
  ctx.fillStyle = '#F472B6';
  ctx.beginPath();
  ctx.ellipse(256, 260, 45, 95, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#EC4899';
  ctx.beginPath();
  ctx.ellipse(210, 275, 38, 80, -0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#EC4899';
  ctx.beginPath();
  ctx.ellipse(302, 275, 38, 80, 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#DB2777';
  ctx.beginPath();
  ctx.ellipse(175, 305, 30, 65, -0.65, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#DB2777';
  ctx.beginPath();
  ctx.ellipse(337, 305, 30, 65, 0.65, 0, Math.PI * 2);
  ctx.fill();

  // Nhị sen vàng
  ctx.fillStyle = '#FBBF24';
  ctx.beginPath();
  ctx.arc(256, 280, 22, 0, Math.PI * 2);
  ctx.fill();

  // Chữ thư pháp nghệ thuật: HOA SEN
  ctx.fillStyle = '#9D174D';
  ctx.font = 'bold 36px "Nunito", cursive, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Đóa Sen Hồng Tuổi Thơ', 256, 80);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Bảng "Hoa Bé Ngoan" cho Lớp Mẫu giáo bé
function createGoodBabyTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 380;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FEF3C7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#F59E0B';
  ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

  ctx.fillStyle = '#D97706';
  ctx.font = '900 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌸 HOA BÉ NGOAN 🌸', canvas.width / 2, 55);

  // Vẽ các bông hoa nhiều màu
  const colors = ['#EF4444', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
  let colIdx = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      const cx = 65 + col * 75;
      const cy = 115 + row * 85;

      ctx.fillStyle = colors[(colIdx++) % colors.length];
      for (let p = 0; p < 5; p++) {
        const ang = (p * 2 * Math.PI) / 5;
        const px = cx + Math.cos(ang) * 16;
        const py = cy + Math.sin(ang) * 16;
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Bảng Thực đơn tuần cho Bếp
function createMenuTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 380;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ECFDF5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#059669';
  ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  ctx.fillStyle = '#065F46';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🥗 THỰC ĐƠN TUẦN BÁN TRÚ', canvas.width / 2, 45);

  ctx.font = '17px sans-serif';
  ctx.fillStyle = '#047857';
  const lines = [
    '• Thứ 2: Cháo bồ câu đậu xanh / Canh bí tôm thịt',
    '• Thứ 3: Cơm thịt bò hầm cà rốt / Súp gà ngô non',
    '• Thứ 4: Phở gà ta gia truyền / Sinh tố bơ sữa',
    '• Thứ 5: Cơm sườn non rim dứa / Canh cua mồng tơi',
    '• Thứ 6: Cháo lươn xứ Nghệ / Yaourt trái cây tươi'
  ];
  let y = 100;
  lines.forEach(l => {
    ctx.fillText(l, canvas.width / 2, y);
    y += 50;
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Bảng Chữ cái & Số cho Lớp Mẫu giáo lớn
function createAlphabetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 380;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#2FA4B8';
  ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  ctx.fillStyle = '#0891B2';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BÉ LÀM QUEN CHỮ CÁI & SỐ', canvas.width / 2, 45);

  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#E11D48';
  ctx.fillText('A  Ă  Â  B  C  D  Đ', canvas.width / 2, 115);

  ctx.fillStyle = '#2563EB';
  ctx.fillText('E  Ê  G  H  I  K  L', canvas.width / 2, 175);

  ctx.fillStyle = '#059669';
  ctx.fillText('M  N  O  Ô  Ơ  P  Q', canvas.width / 2, 235);

  ctx.fillStyle = '#D97706';
  ctx.fillText('⭐ 1   2   3   4   5   6   7   8   9   10 ⭐', canvas.width / 2, 310);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Rèm sọc xanh ngọc đặc trưng tầng 2
function createStripedBlindsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const stripeWidth = 16;
  for (let x = 0; x < canvas.width; x += stripeWidth * 2) {
    ctx.fillStyle = '#2FA4B8';
    ctx.fillRect(x, 0, stripeWidth, canvas.height);
    ctx.fillStyle = '#E6FFFA';
    ctx.fillRect(x + stripeWidth, 0, stripeWidth, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  return texture;
}

// Bảng gạch lát sàn
function createFloorTileTexture(color1 = '#FAF7F2', color2 = '#F0EBE1') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = color2;
  ctx.fillRect(64, 0, 64, 64);
  ctx.fillRect(0, 64, 64, 64);

  ctx.strokeStyle = 'rgba(0,0,0,0.06)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// --- VẬT LIỆU TÁI SỬ DỤNG (REUSABLE MATERIALS) ---
export function initMaterials() {
  const signTexture = createSignTexture();
  const rulesTexture = createRulesTexture();
  const noticeTexture = createNoticeTexture();
  const flagTexture = createFlagTexture();
  const lotusMuralTexture = createLotusMuralTexture();
  const goodBabyTexture = createGoodBabyTexture();
  const menuTexture = createMenuTexture();
  const alphabetTexture = createAlphabetTexture();
  const stripedBlindsTexture = createStripedBlindsTexture();
  const floorTileTexture = createFloorTileTexture();

  return {
    // Vật liệu kết cấu tường & sàn
    wallPink: new THREE.MeshStandardMaterial({ color: 0xFCE7EE, roughness: 0.8 }),
    wallWhite: new THREE.MeshStandardMaterial({ color: 0xFFFDF9, roughness: 0.8 }),
    verandaWall: new THREE.MeshStandardMaterial({ color: 0xFCDDEC, roughness: 0.75 }),
    pinkColumn: new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.6 }), // Cột tròn hồng phấn
    cyanPillar: new THREE.MeshStandardMaterial({ color: 0x2299A6, roughness: 0.6 }), // Cột cổng xanh ngọc
    cyanMetal: new THREE.MeshStandardMaterial({ color: 0x2FA4B8, roughness: 0.5, metalness: 0.1 }),
    gateBlue: new THREE.MeshStandardMaterial({ color: 0x2D72D2, roughness: 0.5 }), // Cánh cổng sắt xanh
    gatePinkFrame: new THREE.MeshStandardMaterial({ color: 0xE87A90, roughness: 0.5 }), // Viền hồng chân cổng

    // Sàn các khu vực
    floorGround: new THREE.MeshStandardMaterial({
      color: 0xFAF3E8,
      roughness: 0.7,
      map: floorTileTexture
    }),
    floorSecond: new THREE.MeshStandardMaterial({
      color: 0xFFFDF5,
      roughness: 0.7,
      map: floorTileTexture
    }),
    grassGround: new THREE.MeshStandardMaterial({ color: 0x4CAF78, roughness: 0.9 }), // Cỏ nhân tạo sân chơi
    streetGround: new THREE.MeshStandardMaterial({ color: 0xE5DFD5, roughness: 0.95 }),
    curbStone: new THREE.MeshStandardMaterial({ color: 0xC8BFB2, roughness: 0.8 }),
    foamMatMat: new THREE.MeshStandardMaterial({ color: 0xFDE047, roughness: 0.7 }), // Thảm xốp lớp Nhà trẻ
    foamMatPink: new THREE.MeshStandardMaterial({ color: 0xF9A8D4, roughness: 0.7 }),
    foamMatBlue: new THREE.MeshStandardMaterial({ color: 0x93C5FD, roughness: 0.7 }),

    // Mái ngói & che
    roofCyan: new THREE.MeshStandardMaterial({ color: 0x2A9D8F, roughness: 0.65 }),
    roofFrameMetal: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5, metalness: 0.2 }),
    stripedBlinds: new THREE.MeshStandardMaterial({
      map: stripedBlindsTexture,
      transparent: true,
      opacity: 0.78,
      roughness: 0.6
    }),

    // Hàng rào màu sắc pastel
    fenceYellow: new THREE.MeshStandardMaterial({ color: 0xFBBF24, roughness: 0.6 }),
    fencePink: new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.6 }),
    fencePurple: new THREE.MeshStandardMaterial({ color: 0xC084FC, roughness: 0.6 }),
    fenceCyan: new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.6 }),
    fenceOrange: new THREE.MeshStandardMaterial({ color: 0xFB923C, roughness: 0.6 }),
    fenceWhite: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.6 }),

    // Cây xanh & tự nhiên
    treeLeaves: new THREE.MeshStandardMaterial({ color: 0x34D399, roughness: 0.8 }),
    treeLeavesDark: new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.8 }),
    treeTrunk: new THREE.MeshStandardMaterial({ color: 0x8D6E63, roughness: 0.9 }),
    cloudWhite: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.6, transparent: true, opacity: 0.92 }),

    // Nội thất đồ chơi
    woodFurniture: new THREE.MeshStandardMaterial({ color: 0xE0B989, roughness: 0.7 }),
    toyRed: new THREE.MeshStandardMaterial({ color: 0xEF4444, roughness: 0.5 }),
    toyYellow: new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.5 }),
    toyBlue: new THREE.MeshStandardMaterial({ color: 0x3B82F6, roughness: 0.5 }),
    toyGreen: new THREE.MeshStandardMaterial({ color: 0x10B981, roughness: 0.5 }),
    toyPink: new THREE.MeshStandardMaterial({ color: 0xEC4899, roughness: 0.5 }),

    // Cầu thang xám & tay vịn đa sắc
    stairSteps: new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.8 }),
    handrailMetal: new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 }),

    // Bảng hiệu texture
    signMaterial: new THREE.MeshStandardMaterial({ map: signTexture, roughness: 0.5 }),
    rulesMaterial: new THREE.MeshStandardMaterial({ map: rulesTexture, roughness: 0.5 }),
    noticeMaterial: new THREE.MeshStandardMaterial({ map: noticeTexture, roughness: 0.5 }),
    flagMaterial: new THREE.MeshStandardMaterial({ map: flagTexture, roughness: 0.5, side: THREE.DoubleSide }),
    lotusMuralMaterial: new THREE.MeshStandardMaterial({ map: lotusMuralTexture, roughness: 0.6 }),
    goodBabyMaterial: new THREE.MeshStandardMaterial({ map: goodBabyTexture, roughness: 0.6 }),
    menuMaterial: new THREE.MeshStandardMaterial({ map: menuTexture, roughness: 0.6 }),
    alphabetMaterial: new THREE.MeshStandardMaterial({ map: alphabetTexture, roughness: 0.6 }),

    // Kính cửa sổ bán trong suốt
    glassMaterial: new THREE.MeshStandardMaterial({
      color: 0xE0F2FE,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1
    }),
    windowFrame: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.6 })
  };
}
