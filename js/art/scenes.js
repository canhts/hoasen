/**
 * ============================================================================
 * BỘ VẼ SƠ ĐỒ TỔNG THỂ FLAT ISOMETRIC ILLUSTRATION (GÓC CHUẨN 30 ĐỘ)
 * ============================================================================
 * Phép chiếu Isometric chuẩn 30 độ:
 *   X(u, v) = OX + (u - v) * cos(30°)
 *   Y(u, v, z) = OY + (u + v) * sin(30°) - z
 * Phong cách tối giản dễ thương, góc bo tròn mềm mại, màu sắc trẻ thơ,
 * liên kết liền mạch toàn bộ khu vực tầng trệt & lầu 2.
 */

const COS30 = 0.8660254;
const SIN30 = 0.5;
const OX = 860;
const OY = 520;

export function iso(u, v, z = 0) {
  return [+(OX + (u - v) * COS30).toFixed(1), +(OY + (u + v) * SIN30 - z).toFixed(1)];
}

function pts(arr) {
  return arr.map(([x, y]) => `${x},${y}`).join(" ");
}

/**
 * Khối hộp 30° Flat Isometric (3 mặt sáng-trung-tối dịu mắt)
 */
function isoBox(u, v, du, dv, z0, dz, topCol, leftCol, rightCol, extra = "") {
  const p001 = iso(u, v, z0 + dz);
  const p101 = iso(u + du, v, z0 + dz);
  const p111 = iso(u + du, v + dv, z0 + dz);
  const p011 = iso(u, v + dv, z0 + dz);

  const p010 = iso(u, v + dv, z0);
  const p110 = iso(u + du, v + dv, z0);
  const p100 = iso(u + du, v, z0);

  return `
    <g ${extra}>
      <polygon points="${pts([p011, p111, p110, p010])}" fill="${leftCol}" stroke="${leftCol}" stroke-width="1" stroke-linejoin="round"/>
      <polygon points="${pts([p111, p101, p100, p110])}" fill="${rightCol}" stroke="${rightCol}" stroke-width="1" stroke-linejoin="round"/>
      <polygon points="${pts([p001, p101, p111, p011])}" fill="${topCol}" stroke="${topCol}" stroke-width="1" stroke-linejoin="round"/>
    </g>
  `;
}

/**
 * Mặt sàn phẳng 30°
 */
function isoFloor(u, v, du, dv, z, fillCol, extra = "") {
  const p = [iso(u, v, z), iso(u + du, v, z), iso(u + du, v + dv, z), iso(u, v + dv, z)];
  return `<polygon points="${pts(p)}" fill="${fillCol}" stroke="${fillCol}" stroke-width="1.5" stroke-linejoin="round" ${extra}/>`;
}

/**
 * Căn phòng Cutaway Isometric (tường hậu thấp phía sau mở thoáng góc nhìn từ trên xuống 30°)
 */
function isoCutawayRoom(u, v, du, dv, z0, wallH, floorCol, wallBackLeftCol, wallBackRightCol, trimCol) {
  const floor = isoFloor(u, v, du, dv, z0, floorCol);
  // Tường sau dọc cạnh v (u .. u+du)
  const backU = isoBox(u, v, du, 14, z0, wallH, trimCol, wallBackLeftCol, wallBackRightCol);
  // Tường trái dọc cạnh u (v .. v+dv)
  const backV = isoBox(u, v, 14, dv, z0, wallH, trimCol, wallBackLeftCol, wallBackRightCol);
  return `${floor}${backU}${backV}`;
}

/**
 * Cây xanh tối giản dạng kẹo bông Isometric dễ thương
 */
function isoCuteTree(u, v, z = 0, scale = 1) {
  const [cx, cy] = iso(u, v, z);
  const r = 34 * scale;
  return `
    <g transform="translate(${cx}, ${cy})">
      <ellipse cx="0" cy="4" rx="${26 * scale}" ry="${13 * scale}" fill="#3D875E" opacity="0.18"/>
      <rect x="${-6 * scale}" y="${-34 * scale}" width="${12 * scale}" height="${36 * scale}" rx="${6 * scale}" fill="#B08463"/>
      <circle cx="0" cy="${-52 * scale}" r="${r}" fill="#68BD8A"/>
      <circle cx="${-16 * scale}" cy="${-42 * scale}" r="${22 * scale}" fill="#52A877"/>
      <circle cx="${16 * scale}" cy="${-44 * scale}" r="${20 * scale}" fill="#7FD09E"/>
    </g>
  `;
}

/**
 * Cột hồng phấn Isometric
 */
function isoPinkPillar(u, v, z0 = 0, h = 76) {
  const [x, y] = iso(u, v, z0);
  return `
    <g transform="translate(${x}, ${y})">
      <ellipse cx="0" cy="2" rx="11" ry="5.5" fill="#D495A7" opacity="0.3"/>
      <rect x="-7" y="${-h}" width="14" height="${h}" rx="7" fill="url(#pinkColumnGrad)"/>
      <ellipse cx="0" cy="${-h}" rx="7.5" ry="4" fill="#FCE5EC"/>
    </g>
  `;
}

/**
 * Bộ bàn ghế nhỏ nhiều màu Isometric
 */
function isoMiniTable(u, v, z0, tableCol, chairColA, chairColB) {
  return `
    <g>
      ${isoBox(u - 16, v - 14, 18, 18, z0, 14, chairColA, "#C8677B", "#B35568")}
      ${isoBox(u + 26, v + 8, 18, 18, z0, 14, chairColB, "#428E63", "#367A54")}
      ${isoBox(u, v - 4, 28, 28, z0 + 14, 8, tableCol, "#318B97", "#277681")}
      ${isoBox(u + 8, v + 4, 10, 10, z0, 14, "#EADCCF", "#D4C4B4", "#C2B1A0")}
    </g>
  `;
}

/**
 * Hàng rào xi măng được sơn màu tươi sáng theo góc 30° Isometric
 */
export function renderCementColorFenceIso(startU, v, count, stepU = 26, height = 44, z0 = 0) {
  const palette = [
    ["#F7D37A", "#E5BC5E", "#CFA448"],
    ["#F08CA0", "#DC7187", "#C45D73"],
    ["#4EB3C1", "#389FAD", "#2B8491"],
    ["#B89FE6", "#9D82CE", "#856BB5"],
    ["#68BD8A", "#52A877", "#3F8E61"],
    ["#F5A48B", "#E28B72", "#C9755C"],
  ];
  const len = count * stepU;
  // Bệ tường xi măng bên dưới + thanh giằng ngang
  let html = isoBox(startU - 8, v - 6, len + 12, 16, z0, 16, "#F5EFE6", "#E2D7C8", "#D0C3B2");
  for (let i = 0; i < count; i++) {
    const [top, left, right] = palette[i % palette.length];
    const u = startU + i * stepU;
    html += isoBox(u, v - 3, 18, 12, z0 + 16, height, top, left, right);
  }
  return `<g class="cement-color-fence-iso">${html}</g>`;
}

/**
 * Nhãn tên khu vực / lớp học nổi bật ở tầng trên cùng (không bị che bởi kiến trúc)
 */
function renderIsoRoomLabel(u, v, z, text, bgColor, textColor = "#FFFDF9", width = 205) {
  const [x, y] = iso(u, v, z);
  return `
    <g class="iso-room-badge" transform="translate(${x}, ${y})" filter="url(#badgeShadow)">
      <line x1="0" y1="16" x2="0" y2="38" stroke="${bgColor}" stroke-width="2.5" stroke-dasharray="3 3" stroke-linecap="round"/>
      <circle cx="0" cy="40" r="4.5" fill="${bgColor}"/>
      <rect x="${-width / 2}" y="-20" width="${width}" height="36" rx="18" fill="${bgColor}"/>
      <text x="0" y="3" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="${textColor}">${text}</text>
    </g>
  `;
}

/**
 * Dựng toàn bộ sơ đồ tổng thể 30° Flat Isometric vào container
 */
export function renderCampusScene(hostEl) {
  hostEl.innerHTML = `
  <svg
    id="campus-svg"
    class="campus-svg"
    viewBox="0 0 3200 2100"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    aria-label="Bản đồ tổng thể Flat Isometric 30 độ Lớp Mầm Non Độc Lập Hoa Sen"
  >
    <defs>
      <filter id="paperShadow" x="-12%" y="-12%" width="128%" height="132%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#5E4638" flood-opacity="0.11"/>
      </filter>
      <filter id="softShadow" x="-12%" y="-12%" width="128%" height="132%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#4A3A32" flood-opacity="0.10"/>
      </filter>
      <filter id="badgeShadow" x="-15%" y="-15%" width="135%" height="145%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#3C2D26" flood-opacity="0.18"/>
      </filter>

      <clipPath id="isoSignLogoClip">
        <circle cx="42" cy="48" r="26"/>
      </clipPath>

      <linearGradient id="skyWashGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCF9F4"/>
        <stop offset="55%" stop-color="#FBF3E7"/>
        <stop offset="100%" stop-color="#F5EBDE"/>
      </linearGradient>

      <linearGradient id="pinkColumnGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#FBE3EA"/>
        <stop offset="40%" stop-color="#F4C2CF"/>
        <stop offset="100%" stop-color="#DF95A9"/>
      </linearGradient>

      <radialGradient id="lampSpotGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFE89E" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#FFE89E" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- ===================================================================== -->
    <!-- LỚP 1: HẬU CẢNH BẦU TRỜI & MÂY TỐI GIẢN                               -->
    <!-- ===================================================================== -->
    <g id="layer-sky" class="parallax-layer-sky">
      <rect x="-400" y="-300" width="4000" height="2700" fill="url(#skyWashGrad)"/>

      <g class="sun-orb" transform="translate(680, 320)">
        <circle cx="0" cy="0" r="130" fill="#FCEAC2" opacity="0.45"/>
        <circle cx="0" cy="0" r="82" fill="#F8D889" opacity="0.65"/>
        <circle cx="0" cy="0" r="48" fill="#F4C96B"/>
      </g>

      <g class="anim-cloud-slow" transform="translate(340, 420)">
        <path d="M 10 50 C -12 50 -14 22 18 16 C 36 -12 86 -10 106 14 C 138 -6 184 14 174 44 C 172 50 160 50 152 50 Z" fill="#FFFFFF" opacity="0.9"/>
      </g>
      <g class="anim-cloud-mid" transform="translate(2120, 340)">
        <path d="M 10 54 C -14 54 -16 24 22 18 C 44 -14 102 -12 126 14 C 164 -6 212 16 200 46 C 198 54 184 54 174 54 Z" fill="#FFFFFF" opacity="0.88"/>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 2: SƠ ĐỒ BẢN ĐỒ TỔNG THỂ FLAT ISOMETRIC 30°                       -->
    <!-- ===================================================================== -->
    <g id="layer-midground" class="parallax-layer-mid">

      <!-- ĐẾ ĐẢO KHUÔN VIÊN LIÊN KẾT TOÀN TRƯỜNG (z = -38 .. 0) -->
      <g id="campus-base-island" filter="url(#paperShadow)">
        ${isoBox(-40, -240, 2060, 1080, -38, 38, "#F4EDE2", "#E4D8C7", "#D5C6B2")}
        <!-- Thảm sân trước nối liền từ Cổng vào các khu vực -->
        ${isoFloor(0, 610, 1960, 180, 1, "#EFE5D8")}
        <!-- Lối đi bộ liên kết pastel trên bản đồ -->
        ${isoFloor(1050, 620, 140, 190, 2, "#F9E9EE")}
        ${isoFloor(240, 610, 1620, 56, 2, "#F5E9DC")}
      </g>

      <!-- Cây xanh tròn mềm bao quanh bản đồ -->
      <g id="campus-yard-trees">
        ${isoCuteTree(20, 220, 0, 1.15)}
        ${isoCuteTree(40, 680, 0, 1.0)}
        ${isoCuteTree(320, 740, 0, 0.92)}
        ${isoCuteTree(1950, 220, 0, 1.05)}
        ${isoCuteTree(1960, 660, 0, 0.95)}
        ${isoCuteTree(500, -160, 0, 1.0)}
      </g>

      <!-- ==================== TẦNG TRỆT (TRÁI -> PHẢI: u = 40 .. 1920) ==================== -->
      <!-- [Sân chơi chính] — [Nhà trẻ (5-36th)] — [Mẫu giáo bé (3-4t)] — [Văn phòng] — [Kho -> Thực đơn -> Bếp] -->
      <g id="ground-floor-iso">

        <!-- 1. SÂN CHƠI CHÍNH (u: 40..440, v: 320..640) -->
        <g id="room-san-choi-chinh">
          ${isoFloor(40, 320, 400, 320, 2, "#6EC28F")}
          ${isoFloor(64, 344, 352, 272, 3, "#58B07C")}
          <!-- Hàng rào xi măng sơn màu quanh sân chơi -->
          ${renderCementColorFenceIso(52, 322, 14, 27, 28, 3)}

          <!-- Cầu trượt tối giản bo tròn -->
          <g id="prop-slide">
            ${isoBox(105, 385, 58, 58, 3, 56, "#F7D37A", "#E5BC5E", "#CFA448")}
            ${isoBox(100, 380, 68, 68, 59, 14, "#E87A90", "#CE6278", "#B64F64")}
            <!-- Máng trượt nghiêng xuống thảm cỏ -->
            <polygon points="${pts([iso(163, 402, 54), iso(163, 428, 54), iso(245, 428, 5), iso(245, 402, 5)])}" fill="#4DB8C6"/>
          </g>

          <!-- Xích đu tối giản dễ thương -->
          <g id="prop-swing">
            ${isoBox(255, 380, 10, 10, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(335, 380, 10, 10, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(255, 380, 90, 10, 69, 9, "#E87A90", "#CE6278", "#B64F64")}
            <g class="anim-swing" style="transform-origin:${iso(295, 385, 69)[0]}px ${iso(295, 385, 69)[1]}px;">
              ${isoBox(276, 382, 22, 16, 20, 6, "#F4C96B", "#DDA946", "#C79234")}
              ${isoBox(306, 382, 22, 16, 20, 6, "#F08CA0", "#DC7187", "#C45D73")}
            </g>
          </g>

          <!-- Vòng quay pastel -->
          <g id="prop-spinner">
            ${isoFloor(140, 520, 68, 68, 4, "#F08CA0")}
            ${isoBox(168, 548, 12, 12, 4, 26, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(152, 532, 44, 44, 30, 8, "#F7D37A", "#E5BC5E", "#CFA448")}
          </g>

          <!-- Góc đá bóng mini -->
          <g id="prop-soccer">
            ${isoBox(310, 505, 10, 58, 3, 34, "#FFFFFF", "#E6EFF0", "#D1E2E4")}
            ${isoBox(310, 505, 58, 8, 3, 34, "#FFFFFF", "#E6EFF0", "#D1E2E4")}
            <g class="anim-ball">
              <circle cx="${iso(285, 540, 12)[0]}" cy="${iso(285, 540, 12)[1]}" r="11" fill="#FFFDF9"/>
              <circle cx="${iso(285, 540, 12)[0]}" cy="${iso(285, 540, 12)[1]}" r="4.5" fill="#2C2A29"/>
            </g>
          </g>

          <!-- Khung mái che xanh ngọc thoáng nhìn toàn bộ bên dưới -->
          <g opacity="0.88">
            ${isoBox(44, 324, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(424, 324, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(44, 624, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(424, 624, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoFloor(44, 324, 392, 312, 116, "#DDF3F6", 'opacity="0.45"')}
          </g>
        </g>

        <!-- 2. LỚP NHÀ TRẺ (5 – 36 THÁNG) (u: 440..720, v: 340..600) — SÁT SÂN CHƠI CHÍNH (Không vẽ WC) -->
        <g id="room-nha-tre">
          ${isoCutawayRoom(440, 340, 280, 260, 2, 54, "#FFF7F8", "#FCE6EA", "#F3D3DA", "#FFFDF9")}
          <!-- Ánh đèn ấm dịu bật sáng khi ghé thăm -->
          <ellipse id="lamp-nt-cone" cx="${iso(580, 470, 5)[0]}" cy="${iso(580, 470, 5)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Thảm xốp pastel 4 ô -->
          ${isoFloor(490, 420, 74, 74, 4, "#BCE5EB")}
          ${isoFloor(568, 420, 74, 74, 4, "#F7D1DA")}
          ${isoFloor(490, 498, 74, 74, 4, "#FFE79E")}
          ${isoFloor(568, 498, 74, 74, 4, "#C4E8D1")}
          <!-- 2 Nệm & gối nhỏ êm ái -->
          ${isoBox(470, 368, 86, 42, 4, 12, "#FFFDF9", "#F3E6E8", "#E6D5D8")}
          ${isoBox(476, 374, 24, 28, 16, 7, "#F7D1DA", "#E6B8C4", "#D4A3B0")}
          ${isoBox(574, 368, 86, 42, 4, 12, "#FFFDF9", "#E5EFF2", "#D5E4E8")}
          ${isoBox(580, 374, 24, 28, 16, 7, "#BCE5EB", "#9ED2DA", "#88BFC8")}
          <!-- Khối đồ chơi mềm bo tròn -->
          ${isoBox(656, 515, 32, 32, 4, 24, "#F4A3B4", "#E28B9E", "#CC7589")}
          ${isoBox(634, 534, 22, 22, 4, 18, "#F7D37A", "#E5BC5E", "#CFA448")}
        </g>

        <!-- 3. LỚP MẪU GIÁO BÉ (3 – 4 TUỔI) (u: 720..1000, v: 340..600) — GIỮA NHÀ TRẺ & VĂN PHÒNG (Không vẽ WC) -->
        <g id="room-mau-giao-be">
          ${isoCutawayRoom(720, 340, 280, 260, 2, 54, "#F5FBF7", "#E4F2E9", "#D3E8DA", "#FFFDF9")}
          <ellipse id="lamp-mgb-cone" cx="${iso(860, 470, 5)[0]}" cy="${iso(860, 470, 5)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng Hoa Bé Ngoan treo tường sau -->
          ${isoBox(800, 344, 110, 10, 18, 30, "#FFFDF9", "#E87A90", "#D16379")}
          <!-- Góc xếp hình khối màu -->
          ${isoBox(752, 375, 58, 34, 4, 26, "#F5DEBE", "#E3C59B", "#D0B084")}
          ${isoBox(762, 382, 18, 18, 30, 14, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(784, 382, 18, 18, 30, 18, "#4EB3C1", "#389FAD", "#2B8491")}
          <!-- Bàn tô màu cùng ghế nhỏ -->
          ${isoBox(838, 455, 86, 68, 14, 10, "#FFE599", "#ECCB72", "#D5B156")}
          ${isoBox(870, 478, 22, 22, 4, 10, "#E4C193", "#CFA774", "#B8905E")}
          ${isoBox(808, 474, 22, 22, 4, 14, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(936, 474, 22, 22, 4, 14, "#389FAD", "#2A8390", "#226F7A")}
        </g>

        <!-- 4. VĂN PHÒNG & CAMERA GIÁM SÁT 24/7 (u: 1000..1240, v: 340..600) -->
        <g id="room-van-phong">
          ${isoCutawayRoom(1000, 340, 240, 260, 2, 54, "#FFFDF8", "#F4ECE0", "#E8DDD0", "#FFFDF9")}
          <!-- Camera giám sát 24/7 gắn góc tường -->
          <g id="office-cctv-camera">
            ${isoBox(1180, 346, 26, 18, 42, 16, "#FFFDF9", "#389FAD", "#297E8A")}
            <circle cx="${iso(1193, 362, 48)[0]}" cy="${iso(1193, 362, 48)[1]}" r="5" fill="#52A877"/>
          </g>
          <!-- Bàn Văn phòng + Màn hình Camera 24/7 4 góc lớp -->
          ${isoBox(1062, 420, 118, 58, 20, 10, "#DFBE97", "#C79E6E", "#B28758")}
          ${isoBox(1070, 426, 102, 46, 2, 18, "#EBD6BA", "#D5BA96", "#C0A27D")}
          ${isoBox(1086, 428, 52, 14, 30, 30, "#2C2A29", "#3F3C3A", "#22201F")}
          ${isoFloor(1092, 444, 40, 2, 46, "#A6E3E9")}
          <!-- Ghế & lọ hoa sen -->
          ${isoBox(1188, 434, 16, 16, 30, 16, "#F7D1DA", "#E87A90", "#C95E75")}
        </g>

        <!-- 5. CẦU THANG LÊN LẦU 2 (u: 1240..1380, v: 120..340, leo từ z=2 lên z=142) — ĐÃ XÓA TRANH HOA SEN CHIẾU NGHỈ -->
        <g id="room-cau-thang">
          <!-- Bệ cầu thang nối Ground Floor (v=340, z=2) lên Lầu 2 (v=120, z=142) -->
          ${(() => {
            let steps = "";
            const stepCount = 8;
            const dv = 220 / stepCount;
            const dz = 140 / stepCount;
            for (let s = 0; s < stepCount; s++) {
              const vs = 340 - (s + 1) * dv;
              const zs = s * dz;
              steps += isoBox(1250, vs, 120, dv + 2, 0, zs + dz, "#E0E6EA", "#CBD4D9", "#B4C0C7");
            }
            // Tay vịn nhiều màu bo tròn dọc bên trái cầu thang
            const railPalette = ["#E87A90", "#F4C96B", "#52A877", "#389FAD", "#A68AD9"];
            for (let r = 0; r < 5; r++) {
              const vr = 325 - r * 46;
              const zr = 14 + r * 28;
              steps += isoBox(1252, vr, 8, 8, zr, 28, railPalette[r], railPalette[r], railPalette[r]);
            }
            const [rx1, ry1] = iso(1256, 325, 42);
            const [rx2, ry2] = iso(1256, 140, 154);
            steps += `<line x1="${rx1}" y1="${ry1}" x2="${rx2}" y2="${ry2}" stroke="#389FAD" stroke-width="6" stroke-linecap="round"/>`;
            return steps;
          })()}
        </g>

        <!-- 6. BÊN PHẢI VĂN PHÒNG THEO ĐÚNG THỨ TỰ: KHO DỤNG CỤ -> THỰC ĐƠN TUẦN -> BẾP NẤU -->
        <g id="room-bep-kho">
          ${isoCutawayRoom(1380, 340, 540, 260, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB", "#FFFDF9")}

          <!-- 6.1 KHO DỤNG CỤ (u: 1390..1540) -->
          <g id="area-kho-dung-cu">
            ${isoBox(1408, 366, 108, 42, 4, 42, "#EFE3D3", "#DFCEBA", "#CEB9A2")}
            ${isoBox(1414, 372, 28, 28, 46, 16, "#BCE5EB", "#96CDD6", "#7EB8C2")}
            ${isoBox(1448, 372, 28, 28, 46, 14, "#F7D1DA", "#E6B4C0", "#D39CAC")}
            ${isoBox(1482, 372, 28, 28, 46, 18, "#FFE79E", "#ECD07C", "#D4B662")}
          </g>

          <!-- 6.2 THỰC ĐƠN TUẦN (u: 1550..1720) -->
          <g id="area-thuc-don-tuan">
            ${isoBox(1585, 344, 105, 10, 18, 32, "#FFFDF9", "#52A877", "#3D895E")}
            <!-- Xe đẩy chia khay gọn gàng -->
            ${isoBox(1600, 445, 72, 48, 4, 24, "#E9F7F1", "#C6E8D8", "#AED7C4")}
            ${isoBox(1612, 455, 20, 20, 28, 6, "#F4C96B", "#DDA946", "#C79234")}
            ${isoBox(1640, 455, 20, 20, 28, 6, "#E87A90", "#CE6278", "#B64F64")}
          </g>

          <!-- 6.3 BẾP NẤU (u: 1730..1910) -->
          <g id="area-bep-nau">
            ${isoBox(1748, 390, 138, 68, 4, 28, "#389FAD", "#EDE5DC", "#DFD4C8")}
            ${isoBox(1768, 405, 34, 34, 32, 16, "#E5989B", "#CC7C80", "#B56468")}
            ${isoBox(1820, 405, 32, 32, 32, 14, "#F4C96B", "#DDA946", "#C79234")}
            <!-- Hơi ấm thơm bay nhẹ từ nồi bếp -->
            <path class="anim-steam" d="M ${iso(1785, 422, 52)[0]} ${iso(1785, 422, 52)[1]} q -8 -16 4 -30 t -2 -26" fill="none" stroke="#E2C8B8" stroke-width="4" stroke-linecap="round"/>
            <path class="anim-steam-delay" d="M ${iso(1836, 422, 50)[0]} ${iso(1836, 422, 50)[1]} q 8 -16 -4 -30 t 2 -26" fill="none" stroke="#E2C8B8" stroke-width="3.5" stroke-linecap="round"/>
          </g>
        </g>

        <!-- HIÊN CHÍNH chạy dọc mặt trước với cột hồng phấn & bàn ghế nhựa nhiều màu -->
        <g id="veranda-foreground">
          ${isoFloor(440, 600, 800, 65, 3, "#EFE4D6")}
          ${isoMiniTable(565, 622, 3, "#48B5C4", "#E87A90", "#52A877")}
          ${isoMiniTable(835, 622, 3, "#F4C96B", "#389FAD", "#E87A90")}
          ${isoMiniTable(1105, 622, 3, "#52A877", "#F4C96B", "#48B5C4")}
          ${isoPinkPillar(455, 652, 3, 74)}
          ${isoPinkPillar(720, 652, 3, 74)}
          ${isoPinkPillar(995, 652, 3, 74)}
          ${isoPinkPillar(1235, 652, 3, 74)}
        </g>
      </g>

      <!-- ==================== LẦU 2 (NÂNG CAO PHÍA TRÊN, LIÊN KẾT QUA CẦU THANG) ==================== -->
      <!-- Đúng thứ tự Trái -> Phải: [Sân chơi nhỏ trái] — [Mẫu giáo lớn (5-6t)] — [Lối lên Cầu thang] — [Mẫu giáo nhỡ (4-5t)] — [Sân chơi nhỏ phải] -->
      <g id="floor-2-iso" filter="url(#paperShadow)">
        <!-- Đế sàn nâng Lầu 2 (z = 128 .. 144) -->
        ${isoBox(580, -180, 1320, 300, 128, 16, "#F5EDE3", "#E2D4C4", "#CFC0AE")}

        <!-- 2.1 SÂN CHƠI NHỎ TRÁI (u: 580..760) — Gọn sạch, KHÔNG vẽ đồ chơi lớn -->
        <g id="room-san-nho-trai">
          ${isoFloor(586, -172, 174, 284, 145, "#D9F2E4")}
          ${isoBox(635, -70, 56, 56, 156, 8, "#F4C96B", "#DDA946", "#C79234")}
          ${isoBox(655, -50, 16, 16, 145, 11, "#E4C193", "#CFA774", "#B8905E")}
          ${isoBox(608, -60, 20, 20, 145, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoCuteTree(615, -145, 145, 0.55)}
        </g>

        <!-- 2.2 LỚP MẪU GIÁO LỚN (5 – 6 TUỔI) (u: 760..1180) — Không vẽ WC -->
        <g id="room-mau-giao-lon">
          ${isoCutawayRoom(760, -172, 420, 284, 145, 52, "#FFFDF8", "#EFE4D6", "#E2D5C5", "#FFFDF9")}
          <ellipse id="lamp-mgl" cx="${iso(970, -30, 147)[0]}" cy="${iso(970, -30, 147)[1]}" rx="120" ry="68" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng chữ cái A Ă Â trên tường sau -->
          ${isoBox(895, -166, 148, 10, 162, 30, "#E4C193", "#3B8D70", "#2F755C")}
          <!-- Góc sách bên trái -->
          ${isoBox(785, -142, 74, 34, 146, 32, "#F5DEBE", "#E3C59B", "#D0B084")}
          <!-- 2 bàn học gọn chuẩn bị vào Lớp 1 -->
          ${isoBox(875, -55, 86, 48, 157, 9, "#F8D889", "#E2BD63", "#C9A44D")}
          ${isoBox(1015, -55, 86, 48, 157, 9, "#A9DFBF", "#80C89E", "#66AF85")}
          ${isoBox(890, 5, 22, 22, 146, 12, "#389FAD", "#2A8390", "#226F7A")}
          ${isoBox(1030, 5, 22, 22, 146, 12, "#E87A90", "#CE6278", "#B64F64")}
        </g>

        <!-- 2.3 LỐI LÊN CẦU THANG LẦU 2 (u: 1180..1380) -->
        <g id="room-loi-cau-thang-l2">
          ${isoFloor(1180, -172, 200, 284, 145, "#F6EFE7")}
          <!-- Lan can an toàn nhiều màu quanh chiếu nghỉ Lầu 2 -->
          ${isoBox(1196, -110, 164, 12, 146, 22, "#4EB3C1", "#389FAD", "#2B8491")}
        </g>

        <!-- 2.4 LỚP MẪU GIÁO NHỠ (4 – 5 TUỔI) (u: 1380..1720) — Không vẽ WC -->
        <g id="room-mau-giao-nho">
          ${isoCutawayRoom(1380, -172, 340, 284, 145, 52, "#FFF8FA", "#F8E3E8", "#ECD2D9", "#FFFDF9")}
          <ellipse id="lamp-mgn" cx="${iso(1550, -30, 147)[0]}" cy="${iso(1550, -30, 147)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng góc vẽ nghệ thuật & giá vẽ -->
          ${isoBox(1425, -166, 112, 10, 162, 30, "#FFFDF9", "#E87A90", "#CE6278")}
          ${isoBox(1640, -125, 36, 24, 146, 36, "#FFFDF9", "#D9A875", "#C2905D")}
          <!-- Bàn học nhóm + ghế màu pastel -->
          ${isoBox(1490, -55, 104, 64, 157, 10, "#6EC2CE", "#4CA6B3", "#38919E")}
          ${isoBox(1464, -36, 22, 22, 146, 12, "#F4C96B", "#DDA946", "#C79234")}
          ${isoBox(1604, -36, 22, 22, 146, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(1532, 16, 22, 22, 146, 12, "#52A877", "#3F8E61", "#31774F")}
        </g>

        <!-- 2.5 SÂN CHƠI NHỎ PHẢI (u: 1720..1900) — Gọn sạch, KHÔNG vẽ đồ chơi lớn -->
        <g id="room-san-nho-phai">
          ${isoFloor(1720, -172, 174, 284, 145, "#D9F2E4")}
          ${isoBox(1770, -70, 56, 56, 156, 8, "#F7D1DA", "#E6B4C0", "#D39CAC")}
          ${isoBox(1790, -50, 16, 16, 145, 11, "#E4C193", "#CFA774", "#B8905E")}
          ${isoBox(1834, -55, 20, 20, 145, 12, "#52A877", "#3F8E61", "#31774F")}
          ${isoCuteTree(1840, -145, 145, 0.55)}
        </g>

        <!-- Hàng cột hồng & viền rèm sọc xanh ngọc mặt trước Lầu 2 -->
        <g id="floor2-front-trim">
          ${isoPinkPillar(760, 114, 145, 62)}
          ${isoPinkPillar(1176, 114, 145, 62)}
          ${isoPinkPillar(1380, 114, 145, 62)}
          ${isoPinkPillar(1716, 114, 145, 62)}
          <!-- Dải rèm sọc xanh ngọc gọn đẹp phía trên mặt trước -->
          ${isoBox(760, 108, 416, 10, 198, 12, "#BCE5EB", "#2E97A6", "#257D8A")}
          ${isoBox(1380, 108, 336, 10, 198, 12, "#BCE5EB", "#2E97A6", "#257D8A")}
        </g>
      </g>

      <!-- ================================================================= -->
      <!-- MẶT TIỀN CỔNG TRƯỜNG & HÀNG RÀO XI MĂNG SƠN MÀU                   -->
      <!-- ================================================================= -->
      <g id="facade-curtain">
        <!-- Rèm che mặt trước khu sân (cuộn lên khi mở cổng) -->
        <g id="facade-green-curtains" opacity="0.92">
          ${isoBox(680, 680, 310, 12, 6, 62, "#74BD74", "#5BA45B", "#498C49")}
          ${isoBox(1260, 680, 320, 12, 6, 62, "#74BD74", "#5BA45B", "#498C49")}
        </g>

        <!-- Hàng rào xi măng sơn màu + Bảng Nội Quy & Thông Báo -->
        <g id="facade-outer-walls">
          ${renderCementColorFenceIso(700, 740, 12, 26, 40, 0)}
          ${renderCementColorFenceIso(1245, 740, 12, 26, 40, 0)}

          <!-- Bảng Nội quy phụ huynh (trái cổng) -->
          <g id="sign-noi-quy" transform="translate(${iso(800, 750, 34)[0] - 80}, ${iso(800, 750, 34)[1] - 42})" filter="url(#paperShadow)">
            <rect x="0" y="0" width="150" height="86" rx="16" fill="#FFFDF9"/>
            <text x="75" y="24" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="11.5" font-weight="700" fill="#B82C3E">NỘI QUY PHỤ HUYNH</text>
            <rect x="18" y="34" width="114" height="5" rx="2.5" fill="#E8DDD0"/>
            <rect x="18" y="46" width="98" height="5" rx="2.5" fill="#F0E7DC"/>
            <rect x="18" y="58" width="108" height="5" rx="2.5" fill="#E8DDD0"/>
          </g>

          <!-- Bảng Thông báo (phải cổng) -->
          <g id="sign-thong-bao" transform="translate(${iso(1390, 748, 34)[0] - 70}, ${iso(1390, 748, 34)[1] - 42})" filter="url(#paperShadow)">
            <rect x="0" y="0" width="144" height="86" rx="16" fill="#FFFDF9"/>
            <text x="72" y="24" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="12" font-weight="700" fill="#B82C3E">THÔNG BÁO</text>
            <rect x="16" y="34" width="48" height="36" rx="8" fill="#FFF4DC"/>
            <rect x="76" y="34" width="50" height="36" rx="8" fill="#EBF8FA"/>
          </g>
        </g>

        <!-- Hai trụ cổng xanh ngọc Isometric -->
        <g id="gate-pillars" filter="url(#paperShadow)">
          ${isoBox(1008, 728, 32, 32, 0, 108, "#4EB3C1", "#389FAD", "#297E8A")}
          ${isoBox(1004, 724, 40, 40, 108, 12, "#FFFDF9", "#EAE3DA", "#D8CFC4")}
          ${isoBox(1204, 728, 32, 32, 0, 108, "#4EB3C1", "#389FAD", "#297E8A")}
          ${isoBox(1200, 724, 40, 40, 108, 12, "#FFFDF9", "#EAE3DA", "#D8CFC4")}
        </g>

        <!-- Nhóm Lá cờ & Biển hiệu có ảnh logo thật đính kèm -->
        <g id="gate-sign-group">
          <g id="national-flag" transform="translate(${iso(1020, 740, 120)[0]}, ${iso(1020, 740, 120)[1]})">
            <line x1="0" y1="2" x2="-26" y2="-84" stroke="#9B9B9B" stroke-width="4.5" stroke-linecap="round"/>
            <g class="anim-flag" style="transform-origin:-26px -84px;">
              <path d="M -26 -84 Q -58 -94 -88 -80 L -78 -38 Q -50 -48 -18 -40 Z" fill="#D9383A" filter="url(#softShadow)"/>
              <polygon points="-53,-75 -49,-66 -40,-66 -47,-60 -45,-51 -53,-56 -61,-51 -59,-60 -66,-66 -57,-66" fill="#FFE15A"/>
            </g>
          </g>

          <g id="main-signboard" transform="translate(${iso(1122, 744, 192)[0] - 188}, ${iso(1122, 744, 192)[1] - 60})" filter="url(#paperShadow)">
            <rect x="0" y="0" width="376" height="122" rx="20" fill="#FFFDF9"/>
            <text x="16" y="20" font-family="Be Vietnam Pro, sans-serif" font-size="9" font-weight="600" fill="#4B4440">UBND XÃ SƠN TỊNH</text>
            <text x="226" y="24" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15.5" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
            <image href="assets/images/logo-hoa-sen.png" x="16" y="22" width="52" height="52" clip-path="url(#isoSignLogoClip)"/>
            <text x="228" y="66" text-anchor="middle" font-family="Fraunces, serif" font-size="38" font-weight="700" letter-spacing="2">
              <tspan fill="#D94854">H</tspan><tspan fill="#2E7D5B">O</tspan><tspan fill="#2E3A67">A </tspan><tspan fill="#E85A77">S</tspan><tspan fill="#2D4A8C">E</tspan><tspan fill="#C94E87">N</tspan>
            </text>
            <rect x="12" y="84" width="248" height="28" rx="10" fill="#2E9D5C"/>
            <rect x="264" y="84" width="100" height="28" rx="10" fill="#F4D35E"/>
            <text x="20" y="96" font-family="Be Vietnam Pro, sans-serif" font-size="8.6" font-weight="500" fill="#FFFDF9">5P5Q+5G8, Lâm Lộc, Sơn Tịnh</text>
            <text x="20" y="108" font-family="Quicksand, sans-serif" font-size="9.4" font-weight="700" fill="#FFFDF9">0868.474.194 • 0975.551.545</text>
            <text x="314" y="96" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="8" font-weight="700" fill="#2C2A29">QĐ 1815/QĐ-UBND</text>
            <text x="314" y="107" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="7.5" font-weight="500" fill="#2C2A29">08/12/2025</text>
          </g>
        </g>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 3: NHÃN TÊN KHU VỰC & LỚP HỌC NỔI BẬT (KHÔNG BAO GIỜ BỊ CHE)     -->
    <!-- ===================================================================== -->
    <g id="layer-foreground">
      <g id="scene-room-badges">
        ${renderIsoRoomLabel(240, 480, 148, "SÂN CHƠI CHÍNH", "#2D8E9B", "#FFFDF9", 175)}
        ${renderIsoRoomLabel(580, 470, 96, "LỚP NHÀ TRẺ (5–36TH)", "#F4C96B", "#3D2A06", 204)}
        ${renderIsoRoomLabel(860, 470, 96, "LỚP MẪU GIÁO BÉ (3–4T)", "#E87A90", "#FFFDF9", 214)}
        ${renderIsoRoomLabel(1120, 470, 96, "VĂN PHÒNG • CAMERA 24/7", "#389FAD", "#FFFDF9", 224)}
        ${renderIsoRoomLabel(1465, 470, 92, "KHO DỤNG CỤ", "#C8955A", "#FFFDF9", 150)}
        ${renderIsoRoomLabel(1640, 470, 92, "THỰC ĐƠN TUẦN", "#52A877", "#FFFDF9", 164)}
        ${renderIsoRoomLabel(1825, 470, 92, "BẾP NẤU", "#E07A5F", "#FFFDF9", 132)}

        ${renderIsoRoomLabel(670, -30, 224, "SÂN CHƠI NHỎ TRÁI", "#52A877", "#FFFDF9", 174)}
        ${renderIsoRoomLabel(970, -30, 232, "LỚP MẪU GIÁO LỚN (5–6T)", "#D95D78", "#FFFDF9", 224)}
        ${renderIsoRoomLabel(1280, -30, 220, "CẦU THANG LẦU 2", "#6F635B", "#FFFDF9", 166)}
        ${renderIsoRoomLabel(1550, -30, 232, "LỚP MẪU GIÁO NHỠ (4–5T)", "#F4C96B", "#3D2A06", 224)}
        ${renderIsoRoomLabel(1810, -30, 224, "SÂN CHƠI NHỎ PHẢI", "#389FAD", "#FFFDF9", 174)}
      </g>
    </g>
  </svg>
  `;

  // Gắn 2 cánh cổng rời vào lớp tiền cảnh màn hình để mở đều sang hai bên khung hình
  const stageViewport = document.getElementById("stage-viewport");
  if (stageViewport && !document.getElementById("gate-doors-portal")) {
    const portal = document.createElement("div");
    portal.id = "gate-doors-portal";
    portal.className = "gate-doors-portal";
    portal.setAttribute("aria-hidden", "true");
    portal.innerHTML = `
      <svg id="gate-leaf-left" class="gate-door-wing is-left" viewBox="0 0 220 420" preserveAspectRatio="none">
        <rect x="8" y="10" width="204" height="400" rx="18" fill="#46B8DA" opacity="0.22"/>
        <g fill="#42B2D4">
          <rect x="18" y="10" width="14" height="400" rx="7"/>
          <rect x="48" y="10" width="14" height="400" rx="7"/>
          <rect x="78" y="10" width="14" height="400" rx="7"/>
          <rect x="108" y="10" width="14" height="400" rx="7"/>
          <rect x="138" y="10" width="14" height="400" rx="7"/>
          <rect x="168" y="10" width="14" height="400" rx="7"/>
          <rect x="196" y="10" width="14" height="400" rx="7"/>
        </g>
        <rect x="10" y="272" width="202" height="12" rx="6" fill="#E87A90"/>
        <rect x="10" y="392" width="202" height="14" rx="7" fill="#E87A90"/>
        <rect x="10" y="272" width="12" height="134" rx="6" fill="#E87A90"/>
        <rect x="200" y="272" width="12" height="134" rx="6" fill="#E87A90"/>
      </svg>

      <svg id="gate-leaf-right" class="gate-door-wing is-right" viewBox="0 0 220 420" preserveAspectRatio="none">
        <rect x="8" y="10" width="204" height="400" rx="18" fill="#46B8DA" opacity="0.22"/>
        <g fill="#42B2D4">
          <rect x="10" y="10" width="14" height="400" rx="7"/>
          <rect x="40" y="10" width="14" height="400" rx="7"/>
          <rect x="70" y="10" width="14" height="400" rx="7"/>
          <rect x="100" y="10" width="14" height="400" rx="7"/>
          <rect x="130" y="10" width="14" height="400" rx="7"/>
          <rect x="160" y="10" width="14" height="400" rx="7"/>
          <rect x="190" y="10" width="14" height="400" rx="7"/>
        </g>
        <rect x="8" y="272" width="202" height="12" rx="6" fill="#E87A90"/>
        <rect x="8" y="392" width="202" height="14" rx="7" fill="#E87A90"/>
        <rect x="8" y="272" width="12" height="134" rx="6" fill="#E87A90"/>
        <rect x="198" y="272" width="12" height="134" rx="6" fill="#E87A90"/>
      </svg>
    `;
    stageViewport.appendChild(portal);
  }
}
