/**
 * ============================================================================
 * BỘ MODULE VẼ TRANH SVG 2D HOẠT HÌNH CÓ CHIỀU SÂU (2.5D LAYERED SVG)
 * Phong cách: Editorial Cartoon / Soft Paper-Cutout
 * Tỉ lệ tọa độ thế giới: 3200 x 1850 (Hỗ trợ zoom/pan thông minh trên mọi thiết bị)
 * ============================================================================
 */

/**
 * Tạo chuỗi hoa treo trần nhiều màu đặc trưng của Hiên chính Hoa Sen
 */
function renderFlowerGarland(startX, endX, y, count = 14) {
  const colors = ["#E87A90", "#F4C96B", "#52A877", "#48B5C4", "#F28B72", "#B59CE8"];
  const step = (endX - startX) / (count - 1);
  let items = "";
  for (let i = 0; i < count; i++) {
    const cx = startX + i * step;
    const sag = Math.sin((i / (count - 1)) * Math.PI) * 14;
    const cy = y + 26 + sag;
    const col = colors[i % colors.length];
    items += `
      <g class="anim-bunting-flower" style="transform-origin:${cx}px ${y}px;">
        <line x1="${cx}" y1="${y}" x2="${cx}" y2="${cy - 8}" stroke="#D9B79C" stroke-width="1.6" stroke-dasharray="2 2"/>
        <g transform="translate(${cx}, ${cy})">
          <circle cx="0" cy="-7" r="5" fill="${col}"/>
          <circle cx="6.7" cy="-2.2" r="5" fill="${col}"/>
          <circle cx="4.1" cy="5.7" r="5" fill="${col}"/>
          <circle cx="-4.1" cy="5.7" r="5" fill="${col}"/>
          <circle cx="-6.7" cy="-2.2" r="5" fill="${col}"/>
          <circle cx="0" cy="0" r="3.4" fill="#FFF7D6"/>
        </g>
      </g>`;
  }
  return `<g class="flower-garland">${items}</g>`;
}

/**
 * Tạo dây cờ tam giác nhiều màu tung bay
 */
function renderBuntingFlags(startX, endX, y, sagDepth = 18, count = 18) {
  const colors = ["#E87A90", "#F4C96B", "#389FAD", "#52A877", "#F28B72", "#9D8BE2"];
  const midX = (startX + endX) / 2;
  let flags = `<path d="M ${startX} ${y} Q ${midX} ${y + sagDepth * 1.4} ${endX} ${y}" fill="none" stroke="#9B8E85" stroke-width="2"/>`;
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const x = startX + (endX - startX) * t;
    const curveY = y + Math.sin(t * Math.PI) * sagDepth * 0.72;
    const col = colors[i % colors.length];
    flags += `
      <polygon class="anim-bunting-flag" points="${x - 10},${curveY} ${x + 10},${curveY} ${x},${curveY + 24}"
        fill="${col}" stroke="#FFFDF9" stroke-width="0.9" stroke-linejoin="round"
        style="transform-origin:${x}px ${curveY}px;"/>`;
  }
  return `<g class="bunting-flags">${flags}</g>`;
}

/**
 * Tạo hàng rào nan gỗ nhiều màu pastel (dùng bên trái và phải cổng trường)
 */
export function renderPastelPicketFence(startX, count, topY, height = 132, pitch = 24) {
  const palette = ["#F4C96B", "#E87A90", "#389FAD", "#A68AD9", "#52A877", "#F39278", "#5FB8D9"];
  const endX = startX + count * pitch;
  let pickets = `
    <rect x="${startX - 4}" y="${topY + 26}" width="${endX - startX + 8}" height="12" rx="3" fill="#FAF6F0" stroke="#DDD2C5" stroke-width="1.2"/>
    <rect x="${startX - 4}" y="${topY + 78}" width="${endX - startX + 8}" height="12" rx="3" fill="#FAF6F0" stroke="#DDD2C5" stroke-width="1.2"/>
  `;
  for (let i = 0; i < count; i++) {
    const x = startX + i * pitch;
    const c = palette[i % palette.length];
    pickets += `
      <path d="M ${x} ${topY + height} L ${x} ${topY + 14} L ${x + 9} ${topY} L ${x + 18} ${topY + 14} L ${x + 18} ${topY + height} Z"
        fill="${c}" stroke="#2C2A29" stroke-opacity="0.14" stroke-width="1"/>
      <line x1="${x + 5}" y1="${topY + 18}" x2="${x + 5}" y2="${topY + height - 6}" stroke="#FFFFFF" stroke-opacity="0.32" stroke-width="2" stroke-linecap="round"/>
    `;
  }
  return `<g class="pastel-fence">${pickets}</g>`;
}

/**
 * Tạo bộ bàn ghế nhựa nhỏ nhiều màu dọc Hiên chính
 */
function renderMiniVerandaTableSet(cx, baseY, tableColor, chairLeftColor, chairRightColor) {
  return `
    <g class="veranda-tableset" filter="url(#softShadow)">
      <!-- Ghế trái -->
      <rect x="${cx - 56}" y="${baseY - 40}" width="24" height="19" rx="5" fill="${chairLeftColor}"/>
      <rect x="${cx - 57}" y="${baseY - 22}" width="26" height="7" rx="3" fill="${chairLeftColor}"/>
      <rect x="${cx - 54}" y="${baseY - 15}" width="5" height="15" rx="2" fill="${chairLeftColor}"/>
      <rect x="${cx - 38}" y="${baseY - 15}" width="5" height="15" rx="2" fill="${chairLeftColor}"/>
      <!-- Ghế phải -->
      <rect x="${cx + 32}" y="${baseY - 40}" width="24" height="19" rx="5" fill="${chairRightColor}"/>
      <rect x="${cx + 31}" y="${baseY - 22}" width="26" height="7" rx="3" fill="${chairRightColor}"/>
      <rect x="${cx + 33}" y="${baseY - 15}" width="5" height="15" rx="2" fill="${chairRightColor}"/>
      <rect x="${cx + 49}" y="${baseY - 15}" width="5" height="15" rx="2" fill="${chairRightColor}"/>
      <!-- Bàn nhựa nhỏ -->
      <rect x="${cx - 26}" y="${baseY - 31}" width="52" height="9" rx="4.5" fill="${tableColor}"/>
      <rect x="${cx - 20}" y="${baseY - 22}" width="7" height="22" rx="2.5" fill="${tableColor}" opacity="0.9"/>
      <rect x="${cx + 13}" y="${baseY - 22}" width="7" height="22" rx="2.5" fill="${tableColor}" opacity="0.9"/>
      <!-- Cốc nước / hộp màu xinh -->
      <rect x="${cx - 8}" y="${baseY - 39}" width="16" height="8" rx="3" fill="#FFFDF9"/>
      <circle cx="${cx + 12}" cy="${baseY - 35}" r="4" fill="#E87A90"/>
    </g>
  `;
}

/**
 * Tạo cột tròn màu hồng phấn đặc trưng của Hoa Sen
 */
function renderPinkColumn(x, topY, height, width = 26) {
  return `
    <g class="pink-column" filter="url(#softShadow)">
      <rect x="${x - 5}" y="${topY}" width="${width + 10}" height="12" rx="4" fill="#F9DCE4" stroke="#E2B7C3" stroke-width="1"/>
      <rect x="${x}" y="${topY + 12}" width="${width}" height="${height - 26}" rx="4" fill="url(#pinkColumnGrad)"/>
      <rect x="${x + 4}" y="${topY + 16}" width="5" height="${height - 34}" rx="2.5" fill="#FFFFFF" opacity="0.35"/>
      <rect x="${x - 5}" y="${topY + height - 14}" width="${width + 10}" height="14" rx="4" fill="#F2B9C8" stroke="#D99DAE" stroke-width="1"/>
    </g>
  `;
}

/**
 * Tạo rèm sọc xanh ngọc che mát ở Lầu 2 (đặc trưng mặt tiền thực tế)
 */
function renderTealStripedAwning(x, y, width, height) {
  const stripeCount = Math.floor(width / 16);
  let stripes = "";
  for (let i = 0; i < stripeCount; i++) {
    const sx = x + i * 16;
    stripes += `<rect x="${sx}" y="${y}" width="8" height="${height}" fill="${i % 2 === 0 ? "#2E97A6" : "#BCE5EB"}" opacity="0.88"/>`;
  }
  return `
    <g class="floor2-striped-curtain">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" fill="#D5F0F4"/>
      <g clip-path="inset(0 round 6px)">${stripes}</g>
      <path d="M ${x} ${y + height} Q ${x + width * 0.25} ${y + height + 10} ${x + width * 0.5} ${y + height} T ${x + width} ${y + height}"
        fill="#2E97A6" opacity="0.85"/>
    </g>
  `;
}

/**
 * Tạo biểu tượng Hoa Sen tròn (logo bảng hiệu trường)
 */
function renderLotusCrest(cx, cy, r = 34) {
  return `
    <g transform="translate(${cx}, ${cy})">
      <circle cx="0" cy="0" r="${r}" fill="#FFFDF9" stroke="#E87A90" stroke-width="2.2"/>
      <circle cx="0" cy="0" r="${r - 4}" fill="none" stroke="#389FAD" stroke-width="0.9" stroke-dasharray="3 2"/>
      <!-- Cánh sen hồng -->
      <path d="M 0 -18 C -6 -9 -6 2 0 10 C 6 2 6 -9 0 -18 Z" fill="#E87A90"/>
      <path d="M 0 10 C -9 8 -16 0 -18 -9 C -10 -7 -4 -1 0 10 Z" fill="#F29FB1"/>
      <path d="M 0 10 C 9 8 16 0 18 -9 C 10 -7 4 -1 0 10 Z" fill="#F29FB1"/>
      <path d="M 0 11 C -12 11 -21 6 -23 0 C -15 0 -8 4 0 11 Z" fill="#F7C7D2"/>
      <path d="M 0 11 C 12 11 21 6 23 0 C 15 0 8 4 0 11 Z" fill="#F7C7D2"/>
      <text x="0" y="23" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="8.2" font-weight="700" fill="#B53D59">HOA SEN</text>
    </g>
  `;
}

/**
 * Hàm chính dựng toàn bộ thế giới SVG 2.5D vào container
 */
export function renderCampusScene(hostEl) {
  hostEl.innerHTML = `
  <svg
    id="campus-svg"
    class="campus-svg"
    viewBox="0 0 3200 1850"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label="Tranh minh họa 2D tương tác toàn cảnh Lớp Mầm Non Độc Lập Hoa Sen"
  >
    <defs>
      <!-- Bóng đổ giấy mềm tạo khối 2.5D -->
      <filter id="paperShadow" x="-10%" y="-10%" width="125%" height="128%">
        <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#5E4638" flood-opacity="0.11"/>
      </filter>
      <filter id="softShadow" x="-12%" y="-12%" width="128%" height="132%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#4A3A32" flood-opacity="0.10"/>
      </filter>
      <filter id="warmGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="24" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <!-- Gradients kiến trúc mềm mại -->
      <linearGradient id="skyWashGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCF9F4"/>
        <stop offset="55%" stop-color="#FBF3E7"/>
        <stop offset="100%" stop-color="#F5EBDE"/>
      </linearGradient>

      <linearGradient id="wallCreamGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFDF9"/>
        <stop offset="100%" stop-color="#F8EFE4"/>
      </linearGradient>

      <linearGradient id="wallBlushGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFF9FA"/>
        <stop offset="100%" stop-color="#FCEAED"/>
      </linearGradient>

      <linearGradient id="wallMintGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8FCF9"/>
        <stop offset="100%" stop-color="#EAF5EE"/>
      </linearGradient>

      <linearGradient id="pinkColumnGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#FBE3EA"/>
        <stop offset="35%" stop-color="#F4C2CF"/>
        <stop offset="85%" stop-color="#E79FB2"/>
        <stop offset="100%" stop-color="#DB8DA3"/>
      </linearGradient>

      <linearGradient id="tealPillarGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#4EB3C1"/>
        <stop offset="65%" stop-color="#389FAD"/>
        <stop offset="100%" stop-color="#297E8A"/>
      </linearGradient>

      <linearGradient id="turfGrassGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#69BF8B"/>
        <stop offset="50%" stop-color="#52A877"/>
        <stop offset="100%" stop-color="#419164"/>
      </linearGradient>

      <linearGradient id="terracottaRoofGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#C88B72"/>
        <stop offset="100%" stop-color="#A66A54"/>
      </linearGradient>

      <linearGradient id="roomLampGlowGrad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#FFE79E" stop-opacity="0.72"/>
        <stop offset="65%" stop-color="#FFF2C6" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#FFF2C6" stop-opacity="0"/>
      </linearGradient>

      <linearGradient id="verandaFloorGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F3EAE0"/>
        <stop offset="100%" stop-color="#E4D7C8"/>
      </linearGradient>
    </defs>

    <!-- ===================================================================== -->
    <!-- LỚP 1: HẬU CẢNH XA (Bầu trời, mặt trời, mây trôi, đồi & cây xa)       -->
    <!-- ===================================================================== -->
    <g id="layer-sky" class="parallax-layer-sky">
      <rect x="-300" y="-200" width="3800" height="2250" fill="url(#skyWashGrad)"/>

      <!-- Mặt trời ấm áp -->
      <g class="sun-orb" transform="translate(880, 210)">
        <circle cx="0" cy="0" r="145" fill="#FCEAC2" opacity="0.45"/>
        <circle cx="0" cy="0" r="95" fill="#F8D889" opacity="0.65"/>
        <circle cx="0" cy="0" r="56" fill="#F4C96B"/>
      </g>

      <!-- Đồi xa Sơn Tịnh giấy cắt mềm -->
      <path d="M -300 1440 Q 250 1180 860 1320 T 2120 1240 T 3500 1360 L 3500 1950 L -300 1950 Z" fill="#EAEFE6"/>
      <path d="M -300 1520 Q 420 1290 1080 1410 T 2480 1340 T 3500 1450 L 3500 1950 L -300 1950 Z" fill="#DCE8DC"/>

      <!-- Cụm mây bồng bềnh trôi chậm -->
      <g class="anim-cloud-slow" transform="translate(260, 150)">
        <path d="M 0 54 Q -12 24 22 18 Q 42 -12 88 2 Q 124 -8 148 22 Q 186 24 182 54 Z" fill="#FFFFFF" opacity="0.92"/>
      </g>
      <g class="anim-cloud-mid" transform="translate(1280, 115)">
        <path d="M 0 60 Q -16 26 26 20 Q 52 -16 106 0 Q 152 -12 180 24 Q 228 28 220 60 Z" fill="#FFFFFF" opacity="0.9"/>
      </g>
      <g class="anim-cloud-slow" transform="translate(2260, 130)">
        <path d="M 0 56 Q -14 25 24 19 Q 46 -12 94 2 Q 134 -8 160 22 Q 204 26 196 56 Z" fill="#FFFFFF" opacity="0.88"/>
      </g>
      <g class="anim-cloud-mid" transform="translate(2840, 210)">
        <path d="M 0 46 Q -10 20 20 14 Q 38 -10 78 2 Q 110 -6 132 18 Q 168 20 162 46 Z" fill="#FFFFFF" opacity="0.85"/>
      </g>

      <!-- Tán cây xanh mềm phía hậu cảnh bên trái & phải -->
      <g class="distant-trees" opacity="0.85">
        <circle cx="140" cy="880" r="140" fill="#9ED1AF"/>
        <circle cx="240" cy="940" r="120" fill="#82C299"/>
        <circle cx="70" cy="1020" r="130" fill="#6BB686"/>
        <circle cx="3120" cy="860" r="130" fill="#9ED1AF"/>
        <circle cx="3010" cy="960" r="110" fill="#82C299"/>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 2: TRUNG CẢNH KIẾN TRÚC (Lầu 2, Cầu thang Hoa Sen, Tầng trệt)     -->
    <!-- ===================================================================== -->
    <g id="layer-midground" class="parallax-layer-mid">

      <!-- Nền sân chung dưới tầng trệt -->
      <rect x="-200" y="1595" width="3600" height="320" fill="#EFE4D6"/>
      <rect x="-200" y="1645" width="3600" height="270" fill="#E6D8C7"/>

      <!-- ==================== LẦU 2 (TRÊN GÁC) ==================== -->
      <!-- Thứ tự từ TRÁI sang PHẢI:
           [Sân chơi nhỏ trái] — [Lớp Mẫu giáo lớn (5-6t)] — [Lối lên Cầu thang] — [Lớp Mẫu giáo nhỡ (4-5t)] — [Sân chơi nhỏ phải] -->
      <g id="floor-2-group">
        <!-- Mái tôn/ngói Lầu 2 & Mái hiên -->
        <path d="M 810 250 L 1060 175 L 2960 175 L 3210 250 Z" fill="url(#terracottaRoofGrad)" filter="url(#paperShadow)"/>
        <rect x="820" y="246" width="2380" height="20" rx="5" fill="#8C5947"/>

        <!-- Khung tường nền tổng Lầu 2 -->
        <rect x="860" y="266" width="2300" height="456" rx="12" fill="url(#wallCreamGrad)" stroke="#DFD2C3" stroke-width="2" filter="url(#paperShadow)"/>

        <!-- 2.1 SÂN CHƠI NHỎ TRÁI (x = 860 .. 1150) — Gọn sạch, học tập, ăn uống (KHÔNG vẽ đồ chơi lớn) -->
        <g id="room-san-nho-trai">
          <rect x="860" y="266" width="290" height="456" fill="#F2FBF6"/>
          <!-- Cửa sổ trời & dây lá xanh -->
          <path d="M 885 280 Q 1005 320 1125 280" fill="none" stroke="#52A877" stroke-width="3" stroke-linecap="round"/>
          <circle cx="930" cy="296" r="8" fill="#77C696"/>
          <circle cx="1005" cy="303" r="9" fill="#52A877"/>
          <circle cx="1080" cy="295" r="8" fill="#77C696"/>
          <!-- Lan can ban công an toàn -->
          <rect x="860" y="618" width="290" height="10" rx="3" fill="#389FAD"/>
          <rect x="860" y="700" width="290" height="22" fill="#8CC5A3"/>
          <!-- Song lan can dọc -->
          <g stroke="#52A877" stroke-width="4" opacity="0.7">
            <line x1="890" y1="628" x2="890" y2="700"/>
            <line x1="930" y1="628" x2="930" y2="700"/>
            <line x1="970" y1="628" x2="970" y2="700"/>
            <line x1="1010" y1="628" x2="1010" y2="700"/>
            <line x1="1050" y1="628" x2="1050" y2="700"/>
            <line x1="1090" y1="628" x2="1090" y2="700"/>
            <line x1="1130" y1="628" x2="1130" y2="700"/>
          </g>
          <!-- Chậu cây xinh & bàn ăn/học nhỏ gọn ngoài trời -->
          <rect x="886" y="655" width="38" height="45" rx="6" fill="#E87A90"/>
          <circle cx="905" cy="638" r="22" fill="#52A877"/>
          <circle cx="894" cy="630" r="14" fill="#6EC28F"/>
          <!-- Bàn tròn gọn cho bé ăn xế & đọc sách -->
          <rect x="975" y="646" width="110" height="12" rx="6" fill="#F4C96B"/>
          <rect x="1024" y="658" width="12" height="42" rx="4" fill="#E1AF47"/>
          <rect x="955" y="665" width="24" height="35" rx="5" fill="#E87A90"/>
          <rect x="1082" y="665" width="24" height="35" rx="5" fill="#389FAD"/>
          <!-- Đĩa trái cây nhỏ trên bàn -->
          <ellipse cx="1030" cy="642" rx="18" ry="5" fill="#FFFDF9"/>
          <circle cx="1024" cy="637" r="5.5" fill="#E87A90"/>
          <circle cx="1035" cy="637" r="5.5" fill="#52A877"/>
          <text x="1005" y="346" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#3E8861">SÂN CHƠI NHỎ TRÁI</text>
        </g>

        <!-- 2.2 LỚP MẪU GIÁO LỚN (5 – 6 TUỔI) (x = 1150 .. 1960) — Không vẽ WC -->
        <g id="room-mau-giao-lon">
          <rect x="1150" y="266" width="810" height="456" fill="url(#wallCreamGrad)" stroke="#E3D7C9" stroke-width="2"/>
          <!-- Ánh đèn ấm bật sáng khi ghé lớp -->
          <polygon id="lamp-mgl" class="room-lamp-cone" points="1555,274 1280,715 1830,715" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1505" y="266" width="100" height="12" rx="6" fill="#F4C96B"/>

          <!-- Trang trí tường hoa lá mềm -->
          <path d="M 1170 620 Q 1340 565 1550 610 T 1940 595 L 1940 722 L 1170 722 Z" fill="#E9F3EC" opacity="0.65"/>
          <rect x="1150" y="704" width="810" height="18" fill="#E6D7C5"/>

          <!-- Góc Sách chuẩn bị vào Lớp 1 (bên trái phòng) -->
          <g transform="translate(1180, 440)" filter="url(#softShadow)">
            <rect x="0" y="0" width="146" height="254" rx="10" fill="#F5DEBE" stroke="#DFBD91" stroke-width="2"/>
            <rect x="10" y="18" width="126" height="14" rx="4" fill="#D9A76E"/>
            <rect x="10" y="92" width="126" height="14" rx="4" fill="#D9A76E"/>
            <rect x="10" y="166" width="126" height="14" rx="4" fill="#D9A76E"/>
            <!-- Sách đủ màu trên kệ -->
            <rect x="18" y="42" width="18" height="50" rx="3" fill="#E87A90"/>
            <rect x="40" y="46" width="16" height="46" rx="3" fill="#389FAD"/>
            <rect x="60" y="38" width="20" height="54" rx="3" fill="#F4C96B"/>
            <rect x="84" y="48" width="18" height="44" rx="3" fill="#52A877"/>
            <rect x="106" y="42" width="22" height="50" rx="3" fill="#A68AD9"/>
            <!-- Hàng 2 -->
            <rect x="20" y="114" width="24" height="52" rx="3" fill="#5FB8D9"/>
            <rect x="48" y="120" width="18" height="46" rx="3" fill="#F28B72"/>
            <rect x="70" y="116" width="22" height="50" rx="3" fill="#E87A90"/>
            <rect x="98" y="124" width="28" height="42" rx="3" fill="#52A877"/>
            <!-- Gối đọc sách êm ở dưới -->
            <ellipse cx="73" cy="236" rx="56" ry="18" fill="#F7D1DA"/>
            <text x="73" y="-12" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#7D583F">GÓC SÁCH</text>
          </g>

          <!-- Bảng Chữ Cái chuẩn bị vào Lớp 1 -->
          <g transform="translate(1395, 345)" filter="url(#softShadow)">
            <rect x="0" y="0" width="330" height="160" rx="14" fill="#347D63" stroke="#E0B684" stroke-width="8"/>
            <rect x="14" y="14" width="302" height="132" rx="8" fill="#3B8D70"/>
            <text x="165" y="44" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#FFE79E">BẢNG CHỮ CÁI — CHUẨN BỊ VÀO LỚP 1</text>
            <text x="165" y="84" text-anchor="middle" font-family="Fraunces, serif" font-size="30" font-weight="700" fill="#FFFDF9" letter-spacing="4">A Ă Â B C D Đ</text>
            <text x="165" y="122" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="22" font-weight="700" fill="#FAD2DC" letter-spacing="3">1  2  3  4  5  +</text>
          </g>

          <!-- 2 bộ bàn ghế học gọn gàng cho bé 5-6 tuổi -->
          <g transform="translate(1410, 560)" filter="url(#softShadow)">
            <!-- Bàn 1 -->
            <rect x="0" y="28" width="160" height="14" rx="6" fill="#F8D889"/>
            <rect x="16" y="42" width="12" height="102" rx="4" fill="#D59F58"/>
            <rect x="132" y="42" width="12" height="102" rx="4" fill="#D59F58"/>
            <rect x="26" y="18" width="36" height="10" rx="2" fill="#FFFDF9"/>
            <rect x="92" y="16" width="34" height="12" rx="3" fill="#E87A90"/>
            <!-- Ghế -->
            <rect x="18" y="68" width="44" height="12" rx="5" fill="#389FAD"/>
            <rect x="22" y="80" width="8" height="64" rx="3" fill="#2A7F8B"/>
            <rect x="50" y="80" width="8" height="64" rx="3" fill="#2A7F8B"/>
            <rect x="98" y="68" width="44" height="12" rx="5" fill="#E87A90"/>
            <rect x="102" y="80" width="8" height="64" rx="3" fill="#C95E75"/>
            <rect x="130" y="80" width="8" height="64" rx="3" fill="#C95E75"/>

            <!-- Bàn 2 -->
            <g transform="translate(220, 0)">
              <rect x="0" y="28" width="160" height="14" rx="6" fill="#A9DFBF"/>
              <rect x="16" y="42" width="12" height="102" rx="4" fill="#52A877"/>
              <rect x="132" y="42" width="12" height="102" rx="4" fill="#52A877"/>
              <!-- Bàn tính học số mini -->
              <rect x="34" y="6" width="42" height="22" rx="4" fill="#FFFDF9" stroke="#C58B58" stroke-width="2.5"/>
              <circle cx="44" cy="14" r="3" fill="#E87A90"/><circle cx="52" cy="14" r="3" fill="#F4C96B"/><circle cx="62" cy="20" r="3" fill="#389FAD"/>
              <rect x="22" y="68" width="44" height="12" rx="5" fill="#F4C96B"/>
              <rect x="26" y="80" width="8" height="64" rx="3" fill="#D2A445"/>
              <rect x="54" y="80" width="8" height="64" rx="3" fill="#D2A445"/>
              <rect x="98" y="68" width="44" height="12" rx="5" fill="#A68AD9"/>
              <rect x="102" y="80" width="8" height="64" rx="3" fill="#8267B8"/>
              <rect x="130" y="80" width="8" height="64" rx="3" fill="#8267B8"/>
            </g>
          </g>

          <!-- Biển tên lớp -->
          <rect x="1760" y="300" width="175" height="36" rx="18" fill="#F7D1DA"/>
          <text x="1847" y="323" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#9E314C">MẪU GIÁO LỚN (5–6T)</text>
        </g>

        <!-- 2.3 LỐI LÊN CẦU THANG (x = 1960 .. 2320) -->
        <g id="room-loi-cau-thang-l2">
          <rect x="1960" y="266" width="360" height="456" fill="#F8F3EC" stroke="#E0D4C6" stroke-width="2"/>
          <!-- Cửa sổ tròn đón sáng tự nhiên -->
          <circle cx="2140" cy="395" r="76" fill="#E7F6F9" stroke="#389FAD" stroke-width="8"/>
          <line x1="2140" y1="319" x2="2140" y2="471" stroke="#389FAD" stroke-width="4"/>
          <line x1="2064" y1="395" x2="2216" y2="395" stroke="#389FAD" stroke-width="4"/>
          <!-- Lan can an toàn Lầu 2 nhiều màu -->
          <rect x="1975" y="608" width="330" height="12" rx="6" fill="#389FAD"/>
          <g stroke-width="6" stroke-linecap="round">
            <line x1="2005" y1="620" x2="2005" y2="718" stroke="#E87A90"/>
            <line x1="2045" y1="620" x2="2045" y2="718" stroke="#F4C96B"/>
            <line x1="2085" y1="620" x2="2085" y2="718" stroke="#52A877"/>
            <line x1="2125" y1="620" x2="2125" y2="718" stroke="#389FAD"/>
            <line x1="2165" y1="620" x2="2165" y2="718" stroke="#A68AD9"/>
            <line x1="2205" y1="620" x2="2205" y2="718" stroke="#E87A90"/>
            <line x1="2245" y1="620" x2="2245" y2="718" stroke="#F4C96B"/>
            <line x1="2285" y1="620" x2="2285" y2="718" stroke="#52A877"/>
          </g>
          <text x="2140" y="535" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#6F635B">LỐI LÊN CẦU THANG</text>
        </g>

        <!-- 2.4 LỚP MẪU GIÁO NHỠ (4 – 5 TUỔI) (x = 2320 .. 2880) — Không vẽ WC -->
        <g id="room-mau-giao-nho">
          <rect x="2320" y="266" width="560" height="456" fill="url(#wallBlushGrad)" stroke="#E4D4D7" stroke-width="2"/>
          <!-- Ánh đèn ấm bật sáng khi ghé lớp -->
          <polygon id="lamp-mgn" class="room-lamp-cone" points="2600,274 2370,715 2830,715" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="2550" y="266" width="100" height="12" rx="6" fill="#F4C96B"/>
          <rect x="2320" y="704" width="560" height="18" fill="#EBDCD9"/>

          <!-- Bảng góc vẽ nghệ thuật trên tường -->
          <g transform="translate(2355, 342)" filter="url(#softShadow)">
            <rect x="0" y="0" width="210" height="132" rx="12" fill="#FFFDF9" stroke="#E87A90" stroke-width="4"/>
            <text x="105" y="28" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#C24764">GÓC VẼ NGHỆ THUẬT</text>
            <!-- Tranh vẽ bông hoa & cầu vồng nhỏ -->
            <rect x="20" y="42" width="76" height="72" rx="6" fill="#FFF4E2"/>
            <path d="M 30 98 A 28 28 0 0 1 86 98" fill="none" stroke="#E87A90" stroke-width="5"/>
            <path d="M 38 98 A 20 20 0 0 1 78 98" fill="none" stroke="#F4C96B" stroke-width="5"/>
            <rect x="114" y="42" width="76" height="72" rx="6" fill="#EAF7F4"/>
            <circle cx="152" cy="72" r="14" fill="#E87A90"/>
            <circle cx="152" cy="72" r="6" fill="#F4C96B"/>
            <line x1="152" y1="86" x2="152" y2="106" stroke="#52A877" stroke-width="4"/>
          </g>

          <!-- Giá vẽ đứng (Easel) xinh xắn -->
          <g transform="translate(2740, 465)" filter="url(#softShadow)">
            <line x1="42" y1="10" x2="10" y2="235" stroke="#C5905B" stroke-width="8" stroke-linecap="round"/>
            <line x1="42" y1="10" x2="74" y2="235" stroke="#C5905B" stroke-width="8" stroke-linecap="round"/>
            <rect x="6" y="34" width="72" height="94" rx="6" fill="#FFFDF9" stroke="#D9A875" stroke-width="4"/>
            <circle cx="42" cy="78" r="18" fill="#F7D1DA"/>
            <path d="M 28 96 Q 42 74 56 96" fill="#52A877"/>
          </g>

          <!-- Bàn học nhóm hình tròn hoa sen cho bé 4-5 tuổi -->
          <g transform="translate(2455, 570)" filter="url(#softShadow)">
            <rect x="0" y="36" width="215" height="16" rx="8" fill="#6EC2CE"/>
            <rect x="34" y="52" width="12" height="86" rx="4" fill="#389FAD"/>
            <rect x="169" y="52" width="12" height="86" rx="4" fill="#389FAD"/>
            <!-- Hộp bút màu & giấy vẽ -->
            <rect x="38" y="20" width="24" height="16" rx="4" fill="#E87A90"/>
            <line x1="44" y1="10" x2="44" y2="20" stroke="#F4C96B" stroke-width="3"/>
            <line x1="50" y1="8" x2="50" y2="20" stroke="#52A877" stroke-width="3"/>
            <line x1="56" y1="11" x2="56" y2="20" stroke="#389FAD" stroke-width="3"/>
            <rect x="88" y="28" width="54" height="8" rx="2" fill="#FFFDF9"/>
            <!-- Ghế nhỏ quanh bàn nhóm -->
            <rect x="18" y="72" width="42" height="12" rx="5" fill="#F4C96B"/>
            <rect x="22" y="84" width="8" height="54" rx="3" fill="#D5A644"/>
            <rect x="48" y="84" width="8" height="54" rx="3" fill="#D5A644"/>
            <rect x="92" y="72" width="42" height="12" rx="5" fill="#E87A90"/>
            <rect x="96" y="84" width="8" height="54" rx="3" fill="#C95E75"/>
            <rect x="122" y="84" width="8" height="54" rx="3" fill="#C95E75"/>
            <rect x="160" y="72" width="42" height="12" rx="5" fill="#52A877"/>
            <rect x="164" y="84" width="8" height="54" rx="3" fill="#3D895E"/>
            <rect x="190" y="84" width="8" height="54" rx="3" fill="#3D895E"/>
          </g>

          <rect x="2675" y="300" width="175" height="36" rx="18" fill="#FFE6AD"/>
          <text x="2762" y="323" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#8C5F11">MẪU GIÁO NHỠ (4–5T)</text>
        </g>

        <!-- 2.5 SÂN CHƠI NHỎ PHẢI (x = 2880 .. 3160) — Gọn sạch cho học tập, ăn uống (KHÔNG vẽ đồ chơi lớn) -->
        <g id="room-san-nho-phai">
          <rect x="2880" y="266" width="280" height="456" fill="#F2FBF6"/>
          <!-- Dây hoa trang trí -->
          <path d="M 2905 280 Q 3020 318 3135 280" fill="none" stroke="#52A877" stroke-width="3" stroke-linecap="round"/>
          <circle cx="2960" cy="296" r="8" fill="#E87A90"/>
          <circle cx="3020" cy="302" r="8" fill="#F4C96B"/>
          <circle cx="3080" cy="296" r="8" fill="#389FAD"/>
          <!-- Lan can ban công an toàn -->
          <rect x="2880" y="618" width="280" height="10" rx="3" fill="#389FAD"/>
          <rect x="2880" y="700" width="280" height="22" fill="#8CC5A3"/>
          <g stroke="#52A877" stroke-width="4" opacity="0.7">
            <line x1="2910" y1="628" x2="2910" y2="700"/>
            <line x1="2950" y1="628" x2="2950" y2="700"/>
            <line x1="2990" y1="628" x2="2990" y2="700"/>
            <line x1="3030" y1="628" x2="3030" y2="700"/>
            <line x1="3070" y1="628" x2="3070" y2="700"/>
            <line x1="3110" y1="628" x2="3110" y2="700"/>
          </g>
          <!-- Bàn nhỏ sinh hoạt/ăn nhẹ + chậu hoa -->
          <rect x="2915" y="646" width="110" height="12" rx="6" fill="#F7D1DA"/>
          <rect x="2964" y="658" width="12" height="42" rx="4" fill="#E87A90"/>
          <rect x="2896" y="665" width="24" height="35" rx="5" fill="#F4C96B"/>
          <rect x="3022" y="665" width="24" height="35" rx="5" fill="#52A877"/>
          <rect x="3085" y="655" width="38" height="45" rx="6" fill="#389FAD"/>
          <circle cx="3104" cy="638" r="22" fill="#52A877"/>
          <text x="3020" y="346" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#3E8861">SÂN CHƠI NHỎ PHẢI</text>
        </g>
      </g>

      <!-- Sàn bê tông phân tách sạch giữa Lầu 2 và Tầng trệt -->
      <rect x="820" y="722" width="2360" height="42" rx="6" fill="#E5D8CA" stroke="#D1C2B1" stroke-width="1.5"/>
      <rect x="80" y="880" width="3080" height="48" rx="8" fill="url(#terracottaRoofGrad)" filter="url(#softShadow)"/>

      <!-- ==================== TẦNG TRỆT ==================== -->
      <!-- Thứ tự từ TRÁI sang PHẢI khi nhìn từ cổng vào:
           [Sân chơi chính] — [Lớp Mẫu giáo bé (3-4t)] — [Lớp Nhà trẻ (5-36th)] — [Văn phòng & Cầu thang] — [Bếp nấu + Thực đơn + Kho] -->
      <g id="ground-floor-group">

        <!-- 1. SÂN CHƠI CHÍNH (NGOÀI CÙNG BÊN TRÁI: x = 80 .. 820) -->
        <g id="room-san-choi-chinh">
          <!-- Mái che khung sắt xanh ngọc cao ráo -->
          <path d="M 70 910 L 450 820 L 825 910 Z" fill="#DDF3F6" stroke="#2D8E9B" stroke-width="6" stroke-linejoin="round" filter="url(#paperShadow)"/>
          <line x1="210" y1="875" x2="210" y2="910" stroke="#2D8E9B" stroke-width="4"/>
          <line x1="450" y1="820" x2="450" y2="910" stroke="#2D8E9B" stroke-width="4"/>
          <line x1="680" y1="875" x2="680" y2="910" stroke="#2D8E9B" stroke-width="4"/>
          <!-- Cột khung sắt xanh ngọc -->
          <rect x="92" y="910" width="14" height="635" fill="#2D8E9B"/>
          <rect x="802" y="910" width="14" height="635" fill="#2D8E9B"/>
          <!-- Cờ dây tam giác nhiều màu dưới mái che -->
          ${renderBuntingFlags(110, 795, 922, 22, 16)}

          <!-- Tán cây xanh rợp bóng phía sau sân chơi -->
          <g transform="translate(155, 1180)">
            <rect x="-16" y="130" width="32" height="220" rx="8" fill="#9D7254"/>
            <circle cx="0" cy="40" r="115" fill="#6EC28F"/>
            <circle cx="-65" cy="80" r="78" fill="#52A877"/>
            <circle cx="65" cy="85" r="75" fill="#7FD09E"/>
          </g>

          <!-- Hàng rào bảo vệ sân chơi phía sau -->
          ${renderPastelPicketFence(120, 26, 1365, 120, 26)}

          <!-- Thảm cỏ nhân tạo xanh mướt -->
          <path d="M 70 1485 Q 450 1470 820 1485 L 820 1605 L 70 1605 Z" fill="url(#turfGrassGrad)" filter="url(#softShadow)"/>
          <ellipse cx="450" cy="1548" rx="320" ry="30" fill="#72C994" opacity="0.45"/>

          <!-- CẦU TRƯỢT (x = 165 .. 335) -->
          <g id="prop-slide" transform="translate(160, 1275)" filter="url(#softShadow)">
            <!-- Tháp leo & bậc thang -->
            <rect x="14" y="55" width="76" height="190" rx="8" fill="#F4C96B"/>
            <polygon points="4,58 52,14 100,58" fill="#E87A90"/>
            <rect x="26" y="88" width="52" height="52" rx="10" fill="#FFFDF9"/>
            <!-- Thanh bậc thang -->
            <line x1="14" y1="168" x2="0" y2="245" stroke="#389FAD" stroke-width="6" stroke-linecap="round"/>
            <line x1="12" y1="190" x2="28" y2="190" stroke="#389FAD" stroke-width="5"/>
            <line x1="7" y1="215" x2="25" y2="215" stroke="#389FAD" stroke-width="5"/>
            <!-- Máng trượt lượn sóng mềm -->
            <path d="M 88 122 C 130 124 146 218 208 232 L 208 248 C 134 240 120 148 88 144 Z" fill="#4DB8C6"/>
            <path d="M 88 116 C 134 118 152 210 210 226" fill="none" stroke="#F7D1DA" stroke-width="7" stroke-linecap="round"/>
          </g>

          <!-- XÍCH ĐU (x = 380 .. 525) -->
          <g id="prop-swing" transform="translate(385, 1240)" filter="url(#softShadow)">
            <!-- Khung chữ A -->
            <line x1="18" y1="22" x2="0" y2="262" stroke="#389FAD" stroke-width="8" stroke-linecap="round"/>
            <line x1="18" y1="22" x2="38" y2="262" stroke="#2D8591" stroke-width="8" stroke-linecap="round"/>
            <line x1="126" y1="22" x2="108" y2="262" stroke="#2D8591" stroke-width="8" stroke-linecap="round"/>
            <line x1="126" y1="22" x2="144" y2="262" stroke="#389FAD" stroke-width="8" stroke-linecap="round"/>
            <rect x="10" y="14" width="124" height="12" rx="6" fill="#E87A90"/>
            <!-- Dây & ghế xích đu nhún nhẹ -->
            <g class="anim-swing" style="transform-origin:52px 26px;">
              <line x1="42" y1="26" x2="42" y2="188" stroke="#9B8E85" stroke-width="2.5"/>
              <line x1="66" y1="26" x2="66" y2="188" stroke="#9B8E85" stroke-width="2.5"/>
              <rect x="35" y="186" width="38" height="10" rx="5" fill="#F4C96B"/>
            </g>
            <g class="anim-swing-delay" style="transform-origin:100px 26px;">
              <line x1="88" y1="26" x2="88" y2="188" stroke="#9B8E85" stroke-width="2.5"/>
              <line x1="112" y1="26" x2="112" y2="188" stroke="#9B8E95" stroke-width="2.5"/>
              <rect x="81" y="186" width="38" height="10" rx="5" fill="#E87A90"/>
            </g>
          </g>

          <!-- VÒNG QUAY (x = 548 .. 668) -->
          <g id="prop-spinner" transform="translate(555, 1345)" filter="url(#softShadow)">
            <ellipse cx="55" cy="158" rx="52" ry="12" fill="#E87A90"/>
            <rect x="49" y="64" width="12" height="94" rx="5" fill="#389FAD"/>
            <g class="anim-spinner" style="transform-origin:55px 84px;">
              <circle cx="55" cy="84" r="38" fill="none" stroke="#F4C96B" stroke-width="7"/>
              <line x1="17" y1="84" x2="93" y2="84" stroke="#52A877" stroke-width="5"/>
              <line x1="55" y1="46" x2="55" y2="122" stroke="#E87A90" stroke-width="5"/>
              <circle cx="55" cy="84" r="10" fill="#FFFDF9"/>
            </g>
          </g>

          <!-- GÓC ĐÁ BÓNG MINI (x = 678 .. 800) -->
          <g id="prop-soccer" transform="translate(675, 1370)" filter="url(#softShadow)">
            <!-- Khung thành mini -->
            <path d="M 18 124 L 18 40 L 114 40 L 114 124" fill="none" stroke="#FFFDF9" stroke-width="7" stroke-linejoin="round"/>
            <path d="M 18 40 L 38 22 L 128 22 L 114 40" fill="none" stroke="#D5EAE8" stroke-width="4"/>
            <path d="M 24 44 L 110 44 L 110 120 L 24 120 Z" fill="none" stroke="#FFFDF9" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.8"/>
            <!-- Quả bóng đá hoạt hình -->
            <g class="anim-ball" transform="translate(12, 128)">
              <circle cx="0" cy="0" r="15" fill="#FFFDF9" stroke="#2C2A29" stroke-width="2"/>
              <polygon points="0,-7 6,-2 4,6 -4,6 -6,-2" fill="#2C2A29"/>
            </g>
          </g>
        </g>

        <!-- 2. LỚP MẪU GIÁO BÉ (3 – 4 TUỔI) (x = 820 .. 1410) — Giữa Nhà trẻ và Sân chơi chính — Không vẽ WC -->
        <g id="room-mau-giao-be">
          <rect x="820" y="928" width="590" height="618" fill="url(#wallMintGrad)" stroke="#D8E5DC" stroke-width="2"/>
          <!-- Ánh đèn vàng ấm bật sáng khi ghé lớp -->
          <polygon id="lamp-mgb-cone" class="room-lamp-cone" points="1115,936 855,1535 1375,1535" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1070" y="928" width="90" height="12" rx="6" fill="#F4C96B"/>

          <!-- Tranh tường đồi cỏ & cây nở hoa vàng giống ảnh lớp thật -->
          <path d="M 822 1350 Q 980 1280 1160 1335 T 1408 1310 L 1408 1545 L 822 1545 Z" fill="#D9EDE0" opacity="0.65"/>
          <rect x="860" y="1140" width="14" height="230" rx="6" fill="#A67C58"/>
          <circle cx="867" cy="1120" r="46" fill="#82C69B"/>
          <circle cx="848" cy="1110" r="8" fill="#F4C96B"/>
          <circle cx="882" cy="1130" r="7" fill="#E87A90"/>

          <!-- Bảng "HOA BÉ NGOAN" -->
          <g transform="translate(960, 1020)" filter="url(#softShadow)">
            <rect x="0" y="0" width="220" height="135" rx="14" fill="#FFFDF9" stroke="#E87A90" stroke-width="4"/>
            <text x="110" y="30" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#52A877">HOA BÉ NGOAN</text>
            <!-- Các bông hoa thành tích -->
            <circle cx="48" cy="72" r="14" fill="#F4C96B"/><circle cx="48" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="92" cy="72" r="14" fill="#E87A90"/><circle cx="92" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="136" cy="72" r="14" fill="#389FAD"/><circle cx="136" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="180" cy="72" r="14" fill="#52A877"/><circle cx="180" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="70" cy="108" r="11" fill="#F7D1DA"/>
            <circle cx="114" cy="108" r="11" fill="#FFE79E"/>
            <circle cx="158" cy="108" r="11" fill="#BCE5EB"/>
          </g>

          <!-- Góc xếp hình (kệ thấp & lâu đài khối gỗ) -->
          <g transform="translate(865, 1345)" filter="url(#softShadow)">
            <rect x="0" y="55" width="160" height="125" rx="8" fill="#F4DCBA" stroke="#D4AF7E" stroke-width="2"/>
            <rect x="10" y="102" width="140" height="10" rx="3" fill="#CE9F66"/>
            <!-- Khối xếp hình tòa tháp trên kệ -->
            <rect x="22" y="15" width="28" height="40" rx="4" fill="#E87A90"/>
            <rect x="54" y="25" width="32" height="30" rx="4" fill="#389FAD"/>
            <polygon points="54,25 70,4 86,25" fill="#F4C96B"/>
            <rect x="94" y="20" width="34" height="35" rx="4" fill="#52A877"/>
            <text x="80" y="-12" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#7D583F">GÓC XẾP HÌNH</text>
          </g>

          <!-- Bàn tô màu cho bé 3-4 tuổi -->
          <g transform="translate(1110, 1375)" filter="url(#softShadow)">
            <ellipse cx="115" cy="40" rx="108" ry="20" fill="#FFE599"/>
            <rect x="65" y="58" width="14" height="84" rx="4" fill="#DDA946"/>
            <rect x="155" y="58" width="14" height="84" rx="4" fill="#DDA946"/>
            <!-- Giấy tô màu & hộp sáp -->
            <rect x="58" y="30" width="44" height="14" rx="3" fill="#FFFDF9"/>
            <rect x="122" y="24" width="24" height="16" rx="4" fill="#E87A90"/>
            <!-- Ghế màu pastel -->
            <rect x="8" y="70" width="38" height="12" rx="5" fill="#E87A90"/>
            <rect x="12" y="82" width="7" height="58" rx="3" fill="#C95E75"/>
            <rect x="34" y="82" width="7" height="58" rx="3" fill="#C95E75"/>
            <rect x="180" y="70" width="38" height="12" rx="5" fill="#389FAD"/>
            <rect x="184" y="82" width="7" height="58" rx="3" fill="#2A7F8B"/>
            <rect x="206" y="82" width="7" height="58" rx="3" fill="#2A7F8B"/>
          </g>

          <rect x="1220" y="960" width="170" height="34" rx="17" fill="#E87A90"/>
          <text x="1305" y="982" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#FFFDF9">MẪU GIÁO BÉ (3–4T)</text>
        </g>

        <!-- 3. LỚP NHÀ TRẺ (5 – 36 THÁNG) (x = 1410 .. 1980) — Sát Văn phòng — Không vẽ WC -->
        <g id="room-nha-tre">
          <rect x="1410" y="928" width="570" height="618" fill="url(#wallBlushGrad)" stroke="#E5D3D6" stroke-width="2"/>
          <!-- Ánh đèn vàng dịu bật sáng khi ghé lớp -->
          <polygon id="lamp-nt-cone" class="room-lamp-cone" points="1695,936 1445,1535 1945,1535" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1650" y="928" width="90" height="12" rx="6" fill="#F4C96B"/>

          <!-- Trang trí tường đám mây & mặt trăng dịu êm -->
          <path d="M 1500 1080 Q 1490 1052 1525 1046 Q 1545 1020 1585 1034 Q 1622 1030 1632 1060 Q 1656 1064 1650 1084 Z" fill="#FFFDF9" opacity="0.9"/>
          <circle cx="1775" cy="1055" r="24" fill="#FFE79E"/>
          <circle cx="1786" cy="1050" r="20" fill="#FFF9FA"/>

          <!-- Thảm xốp êm dịu nhiều ô pastel -->
          <g transform="translate(1442, 1468)" filter="url(#softShadow)">
            <rect x="0" y="0" width="126" height="58" rx="8" fill="#BCE5EB"/>
            <rect x="128" y="0" width="126" height="58" rx="8" fill="#F7D1DA"/>
            <rect x="256" y="0" width="126" height="58" rx="8" fill="#FFE79E"/>
            <rect x="384" y="0" width="126" height="58" rx="8" fill="#C4E8D1"/>
          </g>

          <!-- Nệm & Gối nhỏ êm ái cho giấc ngủ trưa -->
          <g transform="translate(1456, 1385)" filter="url(#softShadow)">
            <rect x="0" y="34" width="160" height="44" rx="14" fill="#FFFDF9" stroke="#F2B9C8" stroke-width="3"/>
            <rect x="10" y="18" width="50" height="24" rx="12" fill="#F7D1DA"/>
            <rect x="180" y="34" width="150" height="44" rx="14" fill="#FFFDF9" stroke="#BCE5EB" stroke-width="3"/>
            <rect x="190" y="18" width="50" height="24" rx="12" fill="#BCE5EB"/>
          </g>

          <!-- Đồ chơi khối mềm an toàn tông pastel & tháp vòng gỗ -->
          <g transform="translate(1800, 1345)" filter="url(#softShadow)">
            <!-- Cầu vồng khối mềm pastel -->
            <path d="M 10 120 A 56 56 0 0 1 122 120" fill="none" stroke="#F4A3B4" stroke-width="16" stroke-linecap="round"/>
            <path d="M 28 120 A 38 38 0 0 1 104 120" fill="none" stroke="#FFE29A" stroke-width="14" stroke-linecap="round"/>
            <path d="M 46 120 A 20 20 0 0 1 86 120" fill="none" stroke="#9FD9C0" stroke-width="12" stroke-linecap="round"/>
            <!-- Thỏ bông pastel đáng yêu -->
            <ellipse cx="145" cy="100" rx="16" ry="20" fill="#FFFDF9"/>
            <circle cx="145" cy="76" r="13" fill="#FFFDF9"/>
            <ellipse cx="140" cy="58" rx="4" ry="12" fill="#F7D1DA"/>
            <ellipse cx="150" cy="58" rx="4" ry="12" fill="#F7D1DA"/>
          </g>

          <rect x="1785" y="960" width="175" height="34" rx="17" fill="#F4C96B"/>
          <text x="1872" y="982" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#5F420B">NHÀ TRẺ (5–36TH)</text>
        </g>

        <!-- 4. VĂN PHÒNG (x = 1980 .. 2290) — Đối diện cổng chính -->
        <g id="room-van-phong">
          <rect x="1980" y="928" width="310" height="618" fill="#FFFBF4" stroke="#E2D5C5" stroke-width="2"/>
          <!-- Đồng hồ treo tường & Khung Quyết định thành lập -->
          <circle cx="2135" cy="1025" r="26" fill="#FFFDF9" stroke="#389FAD" stroke-width="4"/>
          <line x1="2135" y1="1025" x2="2135" y2="1008" stroke="#2C2A29" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="2135" y1="1025" x2="2148" y2="1025" stroke="#E87A90" stroke-width="2.5" stroke-linecap="round"/>

          <rect x="2020" y="1090" width="110" height="78" rx="8" fill="#FFFDF9" stroke="#E1B883" stroke-width="3"/>
          <text x="2075" y="1122" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="11" font-weight="700" fill="#389FAD">QĐ 1815/QĐ-UBND</text>
          <text x="2075" y="1142" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9.5" fill="#6D635C">VĂN PHÒNG</text>

          <!-- Bàn làm việc Văn phòng & lọ hoa sen -->
          <g transform="translate(2020, 1365)" filter="url(#softShadow)">
            <rect x="0" y="42" width="220" height="118" rx="8" fill="#DFBE97"/>
            <rect x="-6" y="34" width="232" height="14" rx="5" fill="#C79E6E"/>
            <!-- Sổ đón trả trẻ & Lọ hoa sen -->
            <rect x="28" y="22" width="54" height="12" rx="3" fill="#389FAD"/>
            <rect x="155" y="4" width="22" height="30" rx="6" fill="#F7D1DA"/>
            <circle cx="166" cy="-4" r="9" fill="#E87A90"/>
          </g>

          <rect x="2050" y="960" width="170" height="34" rx="17" fill="#389FAD"/>
          <text x="2135" y="982" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#FFFDF9">VĂN PHÒNG</text>
        </g>

        <!-- 5. CẦU THANG LÊN LẦU 2 (x = 2280 .. 2520, nối thẳng từ Tầng trệt lên chiếu nghỉ & Lầu 2) -->
        <g id="room-cau-thang">
          <rect x="2290" y="764" width="230" height="782" fill="#F8F2EA" stroke="#DFD2C3" stroke-width="2"/>

          <!-- Dải hoa treo trang trí phía trên bức tranh Hoa Sen chiếu nghỉ -->
          ${renderFlowerGarland(2310, 2500, 815, 6)}

          <!-- BỨC TRANH HOA SEN HỒNG NỞ RỘ TRÊN TƯỜNG CHIẾU NGHỈ -->
          <g id="lotus-landing-mural" transform="translate(2405, 965)" filter="url(#softShadow)">
            <rect x="-82" y="-92" width="164" height="145" rx="14" fill="#FFFDF9" stroke="#E3BC8E" stroke-width="5"/>
            <rect x="-72" y="-82" width="144" height="125" rx="9" fill="#FDF3F5"/>
            <!-- Lá sen xanh phía dưới -->
            <ellipse cx="0" cy="24" rx="48" ry="12" fill="#52A877"/>
            <!-- Bông Hoa Sen hồng nở rộ (animation mở cánh khi cuộn qua Chặng 6) -->
            <g id="mural-lotus-flower" transform="translate(0, 12)">
              <path class="anim-lotus-petal-left" d="M 0 8 C -26 4 -42 -12 -46 -32 C -26 -26 -10 -12 0 8 Z" fill="#F7B8C8" style="transform-origin:0px 8px;"/>
              <path class="anim-lotus-petal-right" d="M 0 8 C 26 4 42 -12 46 -32 C 26 -26 10 -12 0 8 Z" fill="#F7B8C8" style="transform-origin:0px 8px;"/>
              <path class="anim-lotus-petal-left" d="M 0 6 C -16 -2 -26 -22 -24 -44 C -10 -34 -2 -16 0 6 Z" fill="#EF92A8" style="transform-origin:0px 6px;"/>
              <path class="anim-lotus-petal-right" d="M 0 6 C 16 -2 26 -22 24 -44 C 10 -34 2 -16 0 6 Z" fill="#EF92A8" style="transform-origin:0px 6px;"/>
              <path d="M 0 -54 C -10 -32 -10 -10 0 8 C 10 -10 10 -32 0 -54 Z" fill="#E87A90"/>
              <circle cx="0" cy="-2" r="6" fill="#F4C96B"/>
            </g>
          </g>

          <!-- Chiếu nghỉ & Các bậc thang màu xám -->
          <g id="stairs-steps" filter="url(#softShadow)">
            <!-- Nhánh dưới: đi lên chiếu nghỉ từ Tầng trệt -->
            <rect x="2300" y="1490" width="210" height="32" rx="4" fill="#CBD4D9"/>
            <rect x="2305" y="1450" width="195" height="32" rx="4" fill="#D5DEE2"/>
            <rect x="2310" y="1410" width="180" height="32" rx="4" fill="#CBD4D9"/>
            <rect x="2315" y="1370" width="165" height="32" rx="4" fill="#D5DEE2"/>
            <rect x="2320" y="1330" width="150" height="32" rx="4" fill="#CBD4D9"/>
            <rect x="2325" y="1290" width="135" height="32" rx="4" fill="#D5DEE2"/>
            <rect x="2330" y="1250" width="120" height="32" rx="4" fill="#CBD4D9"/>
            <rect x="2335" y="1210" width="105" height="32" rx="4" fill="#D5DEE2"/>
            <rect x="2310" y="1140" width="195" height="36" rx="6" fill="#BFC9CF"/>
            <!-- Nhánh trên nối lên Lầu 2 -->
            <rect x="2295" y="1085" width="160" height="30" rx="4" fill="#CBD4D9"/>
            <rect x="2275" y="1030" width="140" height="30" rx="4" fill="#D5DEE2"/>
            <rect x="2245" y="975" width="130" height="30" rx="4" fill="#CBD4D9"/>
            <rect x="2215" y="920" width="120" height="30" rx="4" fill="#D5DEE2"/>
            <rect x="2190" y="865" width="110" height="30" rx="4" fill="#CBD4D9"/>
            <rect x="2165" y="810" width="100" height="30" rx="4" fill="#D5DEE2"/>
          </g>

          <!-- Tay vịn sắt phối nhiều màu nổi bật -->
          <g id="stairs-colorful-handrail" stroke-linecap="round">
            <line x1="2308" y1="1420" x2="2308" y2="1490" stroke="#E87A90" stroke-width="6"/>
            <line x1="2338" y1="1340" x2="2338" y2="1410" stroke="#F4C96B" stroke-width="6"/>
            <line x1="2368" y1="1260" x2="2368" y2="1330" stroke="#52A877" stroke-width="6"/>
            <line x1="2398" y1="1180" x2="2398" y2="1250" stroke="#389FAD" stroke-width="6"/>
            <line x1="2428" y1="1100" x2="2428" y2="1170" stroke="#A68AD9" stroke-width="6"/>
            <line x1="2295" y1="1010" x2="2295" y2="1080" stroke="#E87A90" stroke-width="6"/>
            <line x1="2250" y1="900" x2="2250" y2="970" stroke="#F4C96B" stroke-width="6"/>
            <line x1="2205" y1="790" x2="2205" y2="860" stroke="#52A877" stroke-width="6"/>
            <path d="M 2295 1420 L 2450 1095 L 2195 780" fill="none" stroke="#389FAD" stroke-width="8" stroke-linejoin="round"/>
          </g>
        </g>

        <!-- 6. KHU BẾP NẤU + THỰC ĐƠN TUẦN + KHO (x = 2520 .. 3140) — Bên phải Văn phòng -->
        <g id="room-bep-kho">
          <rect x="2520" y="928" width="620" height="618" fill="#FFFDF8" stroke="#E2D7C7" stroke-width="2"/>
          <!-- Gạch men bếp sáng bóng -->
          <rect x="2524" y="1210" width="376" height="145" fill="#EBF6F7"/>
          <line x1="2524" y1="1258" x2="2900" y2="1258" stroke="#D5EAEB" stroke-width="2"/>
          <line x1="2524" y1="1306" x2="2900" y2="1306" stroke="#D5EAEB" stroke-width="2"/>

          <!-- Quầy bếp nấu sạch sẽ ấm cúng -->
          <g transform="translate(2545, 1345)" filter="url(#softShadow)">
            <rect x="0" y="25" width="320" height="170" rx="10" fill="#F2ECE4" stroke="#D5C8B8" stroke-width="2"/>
            <rect x="-6" y="16" width="332" height="16" rx="5" fill="#389FAD"/>
            <!-- Nồi súp ấm & Làn hơi thơm bay nhẹ -->
            <rect x="44" y="-14" width="62" height="30" rx="6" fill="#E5989B"/>
            <rect x="52" y="-22" width="46" height="8" rx="4" fill="#C97C80"/>
            <rect x="140" y="-18" width="54" height="34" rx="6" fill="#F4C96B"/>
            <!-- Hơi nóng ấm nhẹ bay lên -->
            <path class="anim-steam" d="M 65 -30 Q 55 -48 68 -64 T 64 -92" fill="none" stroke="#E5CFC0" stroke-width="4" stroke-linecap="round"/>
            <path class="anim-steam-delay" d="M 88 -28 Q 98 -46 84 -62 T 90 -90" fill="none" stroke="#E5CFC0" stroke-width="3.5" stroke-linecap="round"/>
            <path class="anim-steam" d="M 166 -26 Q 154 -44 168 -62 T 164 -88" fill="none" stroke="#E5CFC0" stroke-width="3.8" stroke-linecap="round"/>
            <!-- Rổ rau củ tươi ngon -->
            <rect x="225" y="-4" width="64" height="20" rx="6" fill="#D5A66E"/>
            <circle cx="242" cy="-8" r="9" fill="#52A877"/>
            <circle cx="258" cy="-10" r="8" fill="#E87A90"/>
            <circle cx="272" cy="-7" r="7" fill="#F28B72"/>
          </g>

          <!-- BẢNG THỰC ĐƠN TUẦN -->
          <g transform="translate(2630, 1020)" filter="url(#softShadow)">
            <rect x="0" y="0" width="210" height="150" rx="14" fill="#FFFDF9" stroke="#52A877" stroke-width="4"/>
            <rect x="0" y="0" width="210" height="34" rx="12" fill="#52A877"/>
            <text x="105" y="23" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#FFFDF9">THỰC ĐƠN TUẦN</text>
            <!-- Lưới các ngày T2 -> T6 -->
            <line x1="20" y1="60" x2="190" y2="60" stroke="#E8E1D6" stroke-width="2"/>
            <line x1="20" y1="86" x2="190" y2="86" stroke="#E8E1D6" stroke-width="2"/>
            <line x1="20" y1="112" x2="190" y2="112" stroke="#E8E1D6" stroke-width="2"/>
            <circle cx="34" cy="48" r="6" fill="#E87A90"/><rect x="52" y="44" width="120" height="8" rx="4" fill="#EAE2D7"/>
            <circle cx="34" cy="74" r="6" fill="#F4C96B"/><rect x="52" y="70" width="108" height="8" rx="4" fill="#EAE2D7"/>
            <circle cx="34" cy="100" r="6" fill="#389FAD"/><rect x="52" y="96" width="125" height="8" rx="4" fill="#EAE2D7"/>
            <circle cx="34" cy="126" r="6" fill="#52A877"/><rect x="52" y="122" width="114" height="8" rx="4" fill="#EAE2D7"/>
          </g>

          <!-- KHO GỌN GÀNG (x = 2905 .. 3130) -->
          <g transform="translate(2915, 1070)" filter="url(#softShadow)">
            <rect x="0" y="0" width="198" height="456" rx="10" fill="#F4EDE3" stroke="#D8C9B8" stroke-width="2"/>
            <rect x="14" y="16" width="170" height="30" rx="15" fill="#E8C79B"/>
            <text x="99" y="36" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#634525">KHO THỰC PHẨM</text>
            <!-- Kệ đồ gọn gàng -->
            <rect x="16" y="125" width="166" height="10" rx="3" fill="#C79F70"/>
            <rect x="16" y="240" width="166" height="10" rx="3" fill="#C79F70"/>
            <rect x="16" y="355" width="166" height="10" rx="3" fill="#C79F70"/>
            <!-- Hộp, bình lưu mẫu, khay sữa -->
            <rect x="28" y="80" width="44" height="45" rx="6" fill="#BCE5EB"/>
            <rect x="82" y="88" width="46" height="37" rx="6" fill="#F7D1DA"/>
            <rect x="136" y="76" width="32" height="49" rx="6" fill="#FFE79E"/>
            <rect x="30" y="190" width="60" height="50" rx="6" fill="#C4E8D1"/>
            <rect x="102" y="196" width="64" height="44" rx="6" fill="#FFE29A"/>
            <rect x="36" y="305" width="52" height="50" rx="6" fill="#D5EAE8"/>
            <rect x="98" y="300" width="66" height="55" rx="6" fill="#F5CFA8"/>
          </g>

          <rect x="2535" y="960" width="150" height="34" rx="17" fill="#52A877"/>
          <text x="2610" y="982" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#FFFDF9">BẾP BÁN TRÚ</text>
        </g>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 3: TIỀN CẢNH CHIỀU SÂU 2.5D                                      -->
    <!-- (Hàng cột hồng phấn, dây hoa, bàn ghế hiên, Lầu 2 rèm sọc & Cổng mở)  -->
    <!-- ===================================================================== -->
    <g id="layer-foreground" class="parallax-layer-front">

      <!-- Tiền cảnh Lầu 2: Cột hồng phấn & Rèm sọc xanh ngọc che mát -->
      <g id="floor2-front-trim">
        ${renderPinkColumn(1140, 266, 456, 22)}
        ${renderPinkColumn(1770, 266, 456, 22)}
        ${renderPinkColumn(1945, 266, 456, 22)}
        ${renderPinkColumn(2310, 266, 456, 22)}
        ${renderPinkColumn(2865, 266, 456, 22)}
        <!-- Rèm sọc xanh ngọc treo cao thoáng tầm nhìn vào lớp -->
        ${renderTealStripedAwning(1168, 266, 595, 58)}
        ${renderTealStripedAwning(2338, 266, 522, 58)}
      </g>

      <!-- HIÊN CHÍNH (chạy dọc phía trước các lớp và Văn phòng: x = 820 .. 2520) -->
      <g id="veranda-foreground">
        <!-- Nền gạch hiên chính -->
        <rect x="815" y="1526" width="1715" height="68" fill="url(#verandaFloorGrad)"/>
        <!-- Thanh chắn gỗ an toàn trước cửa lớp học -->
        <g id="safety-wood-rails" opacity="0.92">
          <rect x="845" y="1425" width="215" height="104" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          <line x1="880" y1="1450" x2="880" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="910" y1="1450" x2="910" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="940" y1="1450" x2="940" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="970" y1="1450" x2="970" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1000" y1="1450" x2="1000" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1030" y1="1450" x2="1030" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>

          <rect x="1435" y="1425" width="215" height="104" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          <line x1="1470" y1="1450" x2="1470" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1500" y1="1450" x2="1500" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1530" y1="1450" x2="1530" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1560" y1="1450" x2="1560" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1590" y1="1450" x2="1590" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1620" y1="1450" x2="1620" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
        </g>

        <!-- Dây hoa nhiều màu treo dọc trần Hiên chính -->
        ${renderFlowerGarland(850, 2490, 926, 26)}

        <!-- Dãy cột tròn màu hồng phấn chạy dọc Hiên chính -->
        ${renderPinkColumn(840, 928, 616, 28)}
        ${renderPinkColumn(1260, 928, 616, 28)}
        ${renderPinkColumn(1680, 928, 616, 28)}
        ${renderPinkColumn(1985, 928, 616, 28)}
        ${renderPinkColumn(2285, 928, 616, 28)}

        <!-- Những bộ bàn ghế nhựa nhỏ nhiều màu phục vụ sinh hoạt, ăn uống -->
        ${renderMiniVerandaTableSet(1055, 1584, "#48B5C4", "#E87A90", "#52A877")}
        ${renderMiniVerandaTableSet(1530, 1584, "#F4C96B", "#389FAD", "#E87A90")}
        ${renderMiniVerandaTableSet(1840, 1584, "#52A877", "#F4C96B", "#48B5C4")}
      </g>

      <!-- ================================================================= -->
      <!-- MẶT TIỀN & CỔNG TRƯỜNG HOA SEN (Mở ra khi bước vào Chặng 2)        -->
      <!-- ================================================================= -->
      <g id="facade-curtain">
        <!-- Rèm che nắng xanh lá dịu hai bên mặt tiền (kín đẹp tự nhiên trước khi bước vào hiên) -->
        <path d="M 1265 924 L 1852 924 L 1852 1326 Q 1705 1344 1560 1326 T 1265 1326 Z" fill="#63AD63" opacity="0.98" filter="url(#softShadow)"/>
        <path d="M 1265 924 L 1852 924 L 1852 960 Q 1705 975 1560 960 T 1265 960 Z" fill="#4D954D"/>
        <path d="M 2408 924 L 2995 924 L 2995 1326 Q 2850 1344 2705 1326 T 2408 1326 Z" fill="#63AD63" opacity="0.98" filter="url(#softShadow)"/>
        <path d="M 2408 924 L 2995 924 L 2995 960 Q 2850 975 2705 960 T 2408 960 Z" fill="#4D954D"/>
        <!-- Dải diềm mờ sáng phía sau giữa 2 trụ cổng -->
        <rect x="1860" y="926" width="540" height="220" fill="#FCF9F4" opacity="0.28"/>

        <!-- Chân tường & Hàng rào nan gỗ pastel hai bên cổng -->
        <rect x="1260" y="1530" width="600" height="86" fill="#EAE0D4" stroke="#C5B6A5" stroke-width="2"/>
        <rect x="2400" y="1530" width="600" height="86" fill="#EAE0D4" stroke="#C5B6A5" stroke-width="2"/>
        ${renderPastelPicketFence(1270, 8, 1340, 190, 25)}
        ${renderPastelPicketFence(1778, 3, 1340, 190, 25)}
        ${renderPastelPicketFence(2408, 3, 1340, 190, 25)}
        ${renderPastelPicketFence(2798, 8, 1340, 190, 25)}

        <!-- Bảng BÊN TRÁI: "NỘI QUY DÀNH CHO PHỤ HUYNH" -->
        <g id="sign-noi-quy" transform="translate(1480, 1322)" filter="url(#paperShadow)">
          <rect x="0" y="0" width="286" height="205" rx="6" fill="#FFFDF9" stroke="#C94B5C" stroke-width="4"/>
          <rect x="8" y="8" width="270" height="189" rx="3" fill="none" stroke="#C94B5C" stroke-width="1.5" stroke-dasharray="6 3"/>
          <text x="143" y="34" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#B82C3E">NỘI QUY</text>
          <text x="143" y="53" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" font-weight="700" fill="#B82C3E">DÀNH CHO PHỤ HUYNH</text>
          <rect x="24" y="70" width="210" height="7" rx="3.5" fill="#E3D9CE"/>
          <rect x="24" y="90" width="234" height="7" rx="3.5" fill="#EDE5DB"/>
          <rect x="24" y="110" width="196" height="7" rx="3.5" fill="#E3D9CE"/>
          <rect x="24" y="130" width="224" height="7" rx="3.5" fill="#EDE5DB"/>
          <rect x="24" y="150" width="175" height="7" rx="3.5" fill="#E3D9CE"/>
          <text x="143" y="182" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="10.5" font-weight="700" fill="#B82C3E">ĐỀ NGHỊ PHỤ HUYNH QUAN TÂM, PHỐI HỢP</text>
        </g>

        <!-- Bảng BÊN PHẢI: "THÔNG BÁO" -->
        <g id="sign-thong-bao" transform="translate(2495, 1322)" filter="url(#paperShadow)">
          <rect x="0" y="0" width="286" height="205" rx="6" fill="#FFFDF9" stroke="#D8CEC2" stroke-width="4"/>
          <text x="143" y="36" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#B82C3E">THÔNG BÁO</text>
          <!-- Giấy ghim thông báo nhỏ -->
          <rect x="28" y="60" width="102" height="96" rx="8" fill="#FFF4DC" stroke="#F4C96B" stroke-width="1.5" transform="rotate(-2 79 108)"/>
          <circle cx="79" cy="66" r="5" fill="#E87A90"/>
          <rect x="150" y="64" width="104" height="86" rx="8" fill="#EBF8FA" stroke="#389FAD" stroke-width="1.5" transform="rotate(2 202 107)"/>
          <circle cx="202" cy="70" r="5" fill="#52A877"/>
        </g>

        <!-- CÁNH CỔNG SẮT XANH DƯƠNG VIỀN HỒNG PHÍA DƯỚI (Mở 2 cánh sang hai bên khi cuộn) -->
        <g id="gate-leaves-frame">
          <!-- Cánh cổng trái -->
          <g id="gate-leaf-left" style="transform-origin:1922px 1410px;">
            <rect x="1922" y="1210" width="208" height="404" rx="4" fill="#46B8DA" opacity="0.22"/>
            <!-- Thanh sắt dọc xanh dương -->
            <g fill="#42B2D4" stroke="#2D8AA6" stroke-width="1">
              <rect x="1932" y="1205" width="12" height="408" rx="4"/>
              <rect x="1956" y="1205" width="12" height="408" rx="4"/>
              <rect x="1980" y="1205" width="12" height="408" rx="4"/>
              <rect x="2004" y="1205" width="12" height="408" rx="4"/>
              <rect x="2028" y="1205" width="12" height="408" rx="4"/>
              <rect x="2052" y="1205" width="12" height="408" rx="4"/>
              <rect x="2076" y="1205" width="12" height="408" rx="4"/>
              <rect x="2100" y="1205" width="12" height="408" rx="4"/>
            </g>
            <!-- Khung viền hồng phía dưới cánh cổng (đặc trưng cổng thật Hoa Sen!) -->
            <rect x="1922" y="1474" width="208" height="10" rx="3" fill="#E87A90"/>
            <rect x="1922" y="1596" width="208" height="12" rx="3" fill="#E87A90"/>
            <rect x="1922" y="1474" width="10" height="134" rx="3" fill="#E87A90"/>
            <rect x="2120" y="1474" width="10" height="134" rx="3" fill="#E87A90"/>
          </g>

          <!-- Cánh cổng phải -->
          <g id="gate-leaf-right" style="transform-origin:2338px 1410px;">
            <rect x="2130" y="1210" width="208" height="404" rx="4" fill="#46B8DA" opacity="0.22"/>
            <g fill="#42B2D4" stroke="#2D8AA6" stroke-width="1">
              <rect x="2144" y="1205" width="12" height="408" rx="4"/>
              <rect x="2168" y="1205" width="12" height="408" rx="4"/>
              <rect x="2192" y="1205" width="12" height="408" rx="4"/>
              <rect x="2216" y="1205" width="12" height="408" rx="4"/>
              <rect x="2240" y="1205" width="12" height="408" rx="4"/>
              <rect x="2264" y="1205" width="12" height="408" rx="4"/>
              <rect x="2288" y="1205" width="12" height="408" rx="4"/>
              <rect x="2312" y="1205" width="12" height="408" rx="4"/>
            </g>
            <!-- Khung viền hồng phía dưới -->
            <rect x="2130" y="1474" width="208" height="10" rx="3" fill="#E87A90"/>
            <rect x="2130" y="1596" width="208" height="12" rx="3" fill="#E87A90"/>
            <rect x="2130" y="1474" width="10" height="134" rx="3" fill="#E87A90"/>
            <rect x="2328" y="1474" width="10" height="134" rx="3" fill="#E87A90"/>
          </g>
        </g>

        <!-- HAI TRỤ CỔNG XANH NGỌC -->
        <g id="gate-pillars" filter="url(#paperShadow)">
          <!-- Trụ trái -->
          <rect x="1844" y="1142" width="78" height="474" rx="6" fill="url(#tealPillarGrad)"/>
          <rect x="1834" y="1126" width="98" height="22" rx="6" fill="#FFFDF9" stroke="#D7E7E9" stroke-width="2"/>
          <!-- Trụ phải -->
          <rect x="2338" y="1142" width="78" height="474" rx="6" fill="url(#tealPillarGrad)"/>
          <rect x="2328" y="1126" width="98" height="22" rx="6" fill="#FFFDF9" stroke="#D7E7E9" stroke-width="2"/>
        </g>

        <!-- LÁ CỜ TỔ QUỐC BÊN TRÁI TRỤ CỔNG -->
        <g id="national-flag" transform="translate(1878, 1126)">
          <line x1="0" y1="4" x2="-46" y2="-134" stroke="#9B9B9B" stroke-width="6" stroke-linecap="round"/>
          <g class="anim-flag" style="transform-origin:-46px -134px;">
            <path d="M -46 -134 Q -92 -146 -134 -128 L -120 -66 Q -78 -80 -34 -68 Z" fill="#D9383A" filter="url(#softShadow)"/>
            <polygon points="-84,-120 -79,-106 -65,-106 -76,-98 -72,-84 -84,-92 -96,-84 -92,-98 -103,-106 -89,-106" fill="#FFE15A"/>
          </g>
        </g>

        <!-- BIỂN HIỆU "LỚP MẦM NON ĐỘC LẬP HOA SEN" -->
        <g id="main-signboard" transform="translate(1855, 932)" filter="url(#paperShadow)">
          <rect x="0" y="0" width="550" height="194" rx="12" fill="#FFFDF9" stroke="#E87A90" stroke-width="3.5"/>
          <text x="18" y="25" font-family="Be Vietnam Pro, sans-serif" font-size="11.5" font-weight="600" fill="#4B4440">UBND XÃ SƠN TỊNH</text>
          <text x="312" y="34" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="22" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
          <!-- Logo Hoa Sen tròn bên trái -->
          ${renderLotusCrest(62, 86, 39)}
          <!-- Chữ HOA SEN nhiều màu sinh động như bảng hiệu thật -->
          <text x="318" y="106" text-anchor="middle" font-family="Fraunces, serif" font-size="56" font-weight="700" letter-spacing="3">
            <tspan fill="#D94854">H</tspan><tspan fill="#2E7D5B">O</tspan><tspan fill="#2E3A67">A </tspan><tspan fill="#E85A77">S</tspan><tspan fill="#2D4A8C">E</tspan><tspan fill="#C94E87">N</tspan>
          </text>
          <!-- Dải thông tin xanh lá & vàng phía dưới bảng hiệu -->
          <path d="M 10 144 L 385 144 L 404 166 L 385 186 L 10 186 Z" fill="#2E9D5C"/>
          <path d="M 385 144 L 540 144 L 540 186 L 385 186 L 404 166 Z" fill="#F4D35E"/>
          <text x="20" y="162" font-family="Be Vietnam Pro, sans-serif" font-size="11.2" font-weight="500" fill="#FFFDF9">Địa chỉ: Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh</text>
          <text x="20" y="179" font-family="Quicksand, sans-serif" font-size="12.5" font-weight="700" fill="#FFFDF9">Điện thoại: 0919.040317</text>
          <text x="470" y="162" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9.2" font-weight="600" fill="#2C2A29">QĐ Số: 1815/QĐ-UBND</text>
          <text x="470" y="177" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="8.8" font-weight="500" fill="#2C2A29">ngày 08/12/2025</text>
        </g>
      </g>

      <!-- Cành lá tiền cảnh ở góc viền ngoài cùng tạo cảm giác chiều sâu tự nhiên -->
      <g class="foreground-foliage" opacity="0.9">
        <path d="M -80 1580 Q 45 1420 135 1515 Q 50 1630 -80 1660 Z" fill="#469668"/>
        <path d="M 3260 1540 Q 3120 1410 3045 1510 Q 3130 1640 3260 1660 Z" fill="#469668"/>
      </g>
    </g>
  </svg>
  `;
}
