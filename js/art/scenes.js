/**
 * ============================================================================
 * BỘ VẼ SƠ ĐỒ TỔNG THỂ FLAT ISOMETRIC ILLUSTRATION (GÓC CHUẨN 30 ĐỘ)
 * ============================================================================
 * - Cổng 2 cánh nằm trực tiếp trong không gian 30° và đẩy ra 2 bên trụ khi mở
 * - Bảng Nội quy, Thông báo, Biển hiệu đặt nghiêng 30° chuẩn Isometric
 * - Hàng rào xi măng sơn nhiều màu bao trọn 3 cạnh: TRƯỚC, TRÁI, PHẢI tầng trệt
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

function isoFloor(u, v, du, dv, z, fillCol, extra = "") {
  const p = [iso(u, v, z), iso(u + du, v, z), iso(u + du, v + dv, z), iso(u, v + dv, z)];
  return `<polygon points="${pts(p)}" fill="${fillCol}" stroke="${fillCol}" stroke-width="1.5" stroke-linejoin="round" ${extra}/>`;
}

function isoCutawayRoom(u, v, du, dv, z0, wallH, floorCol, wallBackLeftCol, wallBackRightCol, trimCol) {
  const floor = isoFloor(u, v, du, dv, z0, floorCol);
  const backU = isoBox(u, v, du, 14, z0, wallH, trimCol, wallBackLeftCol, wallBackRightCol);
  const backV = isoBox(u, v, 14, dv, z0, wallH, trimCol, wallBackLeftCol, wallBackRightCol);
  return `${floor}${backU}${backV}`;
}

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

const FENCE_PALETTE = [
  ["#F7D37A", "#E5BC5E", "#CFA448"],
  ["#F08CA0", "#DC7187", "#C45D73"],
  ["#4EB3C1", "#389FAD", "#2B8491"],
  ["#B89FE6", "#9D82CE", "#856BB5"],
  ["#68BD8A", "#52A877", "#3F8E61"],
  ["#F5A48B", "#E28B72", "#C9755C"],
];

/**
 * Hàng rào xi măng sơn nhiều màu dọc trục U (cạnh trước)
 */
export function renderCementColorFenceAlongU(startU, v, count, stepU = 26, height = 42, z0 = 0) {
  const len = count * stepU;
  let html = isoBox(startU - 6, v - 6, len + 10, 16, z0, 16, "#F5EFE6", "#E2D7C8", "#D0C3B2");
  for (let i = 0; i < count; i++) {
    const [top, left, right] = FENCE_PALETTE[i % FENCE_PALETTE.length];
    const u = startU + i * stepU;
    html += isoBox(u, v - 3, 18, 12, z0 + 16, height, top, left, right);
  }
  return `<g class="cement-color-fence-u">${html}</g>`;
}

/**
 * Hàng rào xi măng sơn nhiều màu dọc trục V (cạnh trái & cạnh phải tầng trệt)
 */
export function renderCementColorFenceAlongV(u, startV, count, stepV = 26, height = 42, z0 = 0) {
  const len = count * stepV;
  let html = isoBox(u - 6, startV - 6, 16, len + 10, z0, 16, "#F5EFE6", "#E2D7C8", "#D0C3B2");
  for (let i = 0; i < count; i++) {
    const [top, left, right] = FENCE_PALETTE[(i + 2) % FENCE_PALETTE.length];
    const v = startV + i * stepV;
    html += isoBox(u - 3, v, 12, 18, z0 + 16, height, top, left, right);
  }
  return `<g class="cement-color-fence-v">${html}</g>`;
}

/**
 * Hàng rào sắt thanh mảnh bao quanh 3 cạnh Lầu 2 (dọc trục U)
 */
function renderIronFenceAlongU(startU, endU, v, z0 = 145, h = 34, step = 28) {
  let html = "";
  const count = Math.floor((endU - startU) / step);
  for (let i = 0; i <= count; i++) {
    const u = Math.min(endU, startU + i * step);
    const [bx, by] = iso(u, v, z0);
    const [tx, ty] = iso(u, v, z0 + h);
    const isPost = i % 3 === 0 || i === count;
    html += `<line x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}" stroke="#395B64" stroke-width="${isPost ? 3.2 : 1.7}" stroke-linecap="round"/>`;
  }
  const [lx1, ly1] = iso(startU, v, z0 + h);
  const [lx2, ly2] = iso(endU, v, z0 + h);
  const [mx1, my1] = iso(startU, v, z0 + 10);
  const [mx2, my2] = iso(endU, v, z0 + 10);
  html += `<line x1="${mx1}" y1="${my1}" x2="${mx2}" y2="${my2}" stroke="#4E7C87" stroke-width="2" stroke-linecap="round"/>`;
  html += `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="#2D7B87" stroke-width="3.6" stroke-linecap="round"/>`;
  return `<g class="iron-fence-u">${html}</g>`;
}

/**
 * Hàng rào sắt thanh mảnh dọc trục V (cạnh trái & phải Lầu 2)
 */
function renderIronFenceAlongV(u, startV, endV, z0 = 145, h = 34, step = 28) {
  let html = "";
  const count = Math.floor((endV - startV) / step);
  for (let i = 0; i <= count; i++) {
    const v = Math.min(endV, startV + i * step);
    const [bx, by] = iso(u, v, z0);
    const [tx, ty] = iso(u, v, z0 + h);
    const isPost = i % 3 === 0 || i === count;
    html += `<line x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}" stroke="#395B64" stroke-width="${isPost ? 3.2 : 1.7}" stroke-linecap="round"/>`;
  }
  const [lx1, ly1] = iso(u, startV, z0 + h);
  const [lx2, ly2] = iso(u, endV, z0 + h);
  const [mx1, my1] = iso(u, startV, z0 + 10);
  const [mx2, my2] = iso(u, endV, z0 + 10);
  html += `<line x1="${mx1}" y1="${my1}" x2="${mx2}" y2="${my2}" stroke="#4E7C87" stroke-width="2" stroke-linecap="round"/>`;
  html += `<line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="#2D7B87" stroke-width="3.6" stroke-linecap="round"/>`;
  return `<g class="iron-fence-v">${html}</g>`;
}

/**
 * Hàng rào sắt thấp nhiều màu sắc rực rỡ phía trước các lớp học (chừa khoảng cửa ra vào)
 */
function renderColorfulClassroomRail(uStart, uEnd, v, z0 = 2, h = 24, step = 18, doorGap = null) {
  const colors = ["#E87A90", "#F4C96B", "#52A877", "#389FAD", "#A68AD9", "#F28C6A"];
  const spans = doorGap ? [[uStart, doorGap[0]], [doorGap[1], uEnd]] : [[uStart, uEnd]];
  let html = "";
  spans.forEach(([s, e]) => {
    if (e - s < 10) return;
    const count = Math.max(1, Math.floor((e - s) / step));
    for (let i = 0; i <= count; i++) {
      const u = Math.min(e, s + i * step);
      const [bx, by] = iso(u, v, z0);
      const [tx, ty] = iso(u, v, z0 + h);
      const col = colors[i % colors.length];
      html += `<line x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    const [tx1, ty1] = iso(s, v, z0 + h);
    const [tx2, ty2] = iso(e, v, z0 + h);
    const [mx1, my1] = iso(s, v, z0 + 7);
    const [mx2, my2] = iso(e, v, z0 + 7);
    html += `<line x1="${mx1}" y1="${my1}" x2="${mx2}" y2="${my2}" stroke="#4E7C87" stroke-width="1.8" stroke-linecap="round"/>`;
    html += `<line x1="${tx1}" y1="${ty1}" x2="${tx2}" y2="${ty2}" stroke="#389FAD" stroke-width="3.2" stroke-linecap="round"/>`;
  });
  return `<g class="classroom-color-rail">${html}</g>`;
}

/**
 * Cánh cổng 30° Flat Isometric (vẽ chuẩn hệ tọa độ iso(u,v,z) để trượt đúng theo 2 trụ)
 */
function renderIsoGateWing(startU, endU, v, zBottom = 2, zTop = 98) {
  const du = endU - startU;
  const barCount = 5;
  const step = du / barCount;
  let bars = "";
  // Khung ngang hồng phía dưới (đặc trưng cổng trường Hoa Sen)
  bars += isoBox(startU + 2, v - 3, du - 4, 8, zBottom, 6, "#F29FB1", "#E87A90", "#CE6278");
  bars += isoBox(startU + 2, v - 3, du - 4, 8, zBottom + 28, 6, "#F29FB1", "#E87A90", "#CE6278");
  // Khung ngang xanh trên cùng
  bars += isoBox(startU + 2, v - 3, du - 4, 8, zTop - 8, 6, "#7CD3E2", "#4EB3C1", "#389FAD");
  // Các song sắt đứng theo góc 30°
  for (let i = 0; i <= barCount; i++) {
    const bu = startU + i * step - 3;
    const isEdge = i === 0 || i === barCount;
    const colTop = isEdge ? "#F29FB1" : "#7CD3E2";
    const colLeft = isEdge ? "#E87A90" : "#42B2D4";
    const colRight = isEdge ? "#CE6278" : "#2D8AA6";
    bars += isoBox(bu, v - 2, 6, 6, zBottom, zTop - zBottom, colTop, colLeft, colRight);
  }
  return bars;
}

const BADGE_ICONS = {
  playground: `<path d="M -5 5 L -5 -3 L 0 -3 L 5 5 M -6 -5 C -2 -7 2 -7 6 -5" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  baby: `<circle cx="0" cy="-2" r="3.4" fill="none" stroke-width="1.8"/><path d="M -5.2 5.5 C -4 2.3 4 2.3 5.2 5.5 M -1.6 -5.5 C -1 -7.2 1 -7.2 1.6 -5.5" fill="none" stroke-width="1.8" stroke-linecap="round"/>`,
  blocks: `<rect x="-6.2" y="-1" width="5.6" height="5.6" rx="1.2" fill="none" stroke-width="1.7"/><rect x="0.6" y="-1" width="5.6" height="5.6" rx="1.2" fill="none" stroke-width="1.7"/><rect x="-2.8" y="-6.6" width="5.6" height="5.2" rx="1.2" fill="none" stroke-width="1.7"/>`,
  camera: `<rect x="-6.2" y="-4" width="9" height="6.2" rx="1.6" fill="none" stroke-width="1.8"/><path d="M 2.8 -2 L 6.5 -4 L 6.5 2 L 2.8 0 Z M -2 2.2 L -2 5.5 M -4.5 5.5 L 1 5.5" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  box: `<path d="M -6 -2.5 L 0 -6 L 6 -2.5 L 6 4 L 0 7 L -6 4 Z M -6 -2.5 L 0 0.8 L 6 -2.5 M 0 0.8 L 0 7" fill="none" stroke-width="1.7" stroke-linejoin="round"/>`,
  menu: `<rect x="-5.5" y="-5.5" width="11" height="12" rx="2" fill="none" stroke-width="1.7"/><path d="M -2.5 -2 L 2.5 -2 M -2.5 1 L 2.5 1 M -2.5 4 L 1 4" fill="none" stroke-width="1.7" stroke-linecap="round"/>`,
  pot: `<rect x="-6" y="-1.2" width="12" height="6.5" rx="2" fill="none" stroke-width="1.8"/><path d="M -7.5 -1.2 L 7.5 -1.2 M -2.5 -4.2 Q -3.5 -6 -2 -7.2 M 2 -4.2 Q 1 -6 2.5 -7.2" fill="none" stroke-width="1.6" stroke-linecap="round"/>`,
  stairs: `<path d="M -6.5 5.5 L -2.5 5.5 L -2.5 1.8 L 1.8 1.8 L 1.8 -2 L 6 -2 L 6 -5.8" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  book: `<path d="M -6.5 -4.5 C -3.5 -5.5 -1 -4.5 0 -3.2 C 1 -4.5 3.5 -5.5 6.5 -4.5 L 6.5 4.8 C 3.5 3.8 1 4.8 0 5.8 C -1 4.8 -3.5 3.8 -6.5 4.8 Z M 0 -3.2 L 0 5.8" fill="none" stroke-width="1.7" stroke-linejoin="round"/>`,
  palette: `<circle cx="0" cy="0" r="6" fill="none" stroke-width="1.7"/><circle cx="-2.2" cy="-2" r="1" fill="currentColor" stroke="none"/><circle cx="2" cy="-2" r="1" fill="currentColor" stroke="none"/><circle cx="-2" cy="2" r="1" fill="currentColor" stroke="none"/>`,
  leaf: `<path d="M -5 5 C -5 -3 1 -6.5 6 -6 C 6 -1 3 5 -5 5 Z M -5 5 L 1.5 -1.5" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
};

function renderIsoRoomLabel(u, v, z, text, bgColor, textColor = "#FFFDF9", width = 225, roomStep = "", iconKey = "leaf") {
  const [x, y] = iso(u, v, z);
  const iconMarkup = BADGE_ICONS[iconKey] || BADGE_ICONS.leaf;
  return `
    <g
      class="iso-room-badge"
      data-room-step="${roomStep}"
      data-full-width="${width}"
      transform="translate(${x}, ${y})"
      filter="url(#badgeShadow)"
    >
      <line x1="0" y1="18" x2="0" y2="38" stroke="${bgColor}" stroke-width="2.5" stroke-dasharray="3 3" stroke-linecap="round"/>
      <circle cx="0" cy="40" r="4.5" fill="${bgColor}"/>
      <rect class="iso-badge-rect" x="-19" y="-19" width="38" height="38" rx="19" fill="${bgColor}"/>
      <g class="iso-badge-icon" stroke="${textColor}" color="${textColor}">
        ${iconMarkup}
      </g>
      <text
        class="iso-badge-text"
        x="${-width / 2 + 38}"
        y="4.5"
        text-anchor="start"
        font-family="Quicksand, sans-serif"
        font-size="13.5"
        font-weight="700"
        fill="${textColor}"
        opacity="0"
      >${text}</text>
    </g>
  `;
}

export function renderCampusScene(hostEl) {
  // Tọa độ chính xác cho 3 bảng đặt nghiêng 30° chuẩn Isometric áp sát hoàn toàn mặt trước khối nền (pad = 3)
  const [nqX, nqY] = iso(717, 752, 101);
  const [tbX, tbY] = iso(1323, 752, 101);
  const [sbX, sbY] = iso(962, 752, 229);

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
        <circle cx="38" cy="47" r="24"/>
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

    <!-- LỚP 1: HẬU CẢNH BẦU TRỜI & MÂY TỐI GIẢN -->
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

    <!-- LỚP 2: SƠ ĐỒ BẢN ĐỒ TỔNG THỂ FLAT ISOMETRIC 30° -->
    <g id="layer-midground" class="parallax-layer-mid">

      <g id="ground-stage-group">
      <!-- ĐẾ ĐẢO KHUÔN VIÊN & CON ĐƯỜNG RỘNG CHIA LÀN TRƯỚC CỔNG -->
      <g id="campus-base-island" filter="url(#paperShadow)">
        ${isoBox(-40, -240, 2060, 1020, -38, 38, "#F4EDE2", "#E4D8C7", "#D5C6B2")}
        ${isoFloor(0, 610, 1960, 150, 1, "#EFE5D8")}
        ${isoFloor(1050, 620, 140, 145, 2, "#F9E9EE")}
        ${isoFloor(240, 610, 1620, 56, 2, "#F5E9DC")}
      </g>

      <!-- CON ĐƯỜNG RỘNG CÓ VỈA HÈ, CHIA LÀN & VẠCH QUA ĐƯỜNG TRƯỚC CỔNG TRƯỜNG -->
      <g id="front-wide-road">
        ${isoBox(-180, 756, 2360, 12, -2, 5, "#EAE0D3", "#D8CCBC", "#C7B9A7")}
        ${isoFloor(-180, 768, 2360, 265, -1, "#E3DCD4")}
        ${(() => {
          let lane = "";
          for (let u = -120; u < 2120; u += 72) {
            const [x1, y1] = iso(u, 898, 0);
            const [x2, y2] = iso(u + 40, 898, 0);
            lane += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFFDF9" stroke-width="5" stroke-linecap="round" opacity="0.92"/>`;
          }
          for (let u = 1046; u <= 1188; u += 28) {
            lane += isoFloor(u, 782, 16, 78, 0, "#FFFDF9", 'opacity="0.82"');
          }
          return lane;
        })()}
      </g>

      <!-- HÀNG RÀO BÊN TRÁI TẦNG TRỆT (u = -6, v = 310 .. 752) -->
      ${renderCementColorFenceAlongV(-6, 310, 17, 26, 40, 0)}

      <!-- ==================== TẦNG TRỆT (TRÁI -> PHẢI) ==================== -->
      <g id="ground-floor-iso">

        <!-- 1. SÂN CHƠI CHÍNH (2 CÂY XANH GẦN HÀNG RÀO + ĐÚNG 4 TRÒ CHƠI CHUẨN DÁNG) -->
        <g id="room-san-choi-chinh">
          ${isoFloor(40, 320, 400, 320, 2, "#6EC28F")}
          ${isoFloor(64, 344, 352, 272, 3, "#58B07C")}
          ${renderCementColorFenceAlongU(52, 322, 14, 27, 28, 3)}

          <!-- Chỉ 2 cây xanh mát gần hàng rào trong Sân chính -->
          ${isoCuteTree(76, 360, 4, 0.92)}
          ${isoCuteTree(76, 600, 4, 0.88)}

          <!-- 1) CẦU TRƯỢT (thang leo phía sau, chòi mái che, máng trượt cong xuống thảm cỏ) -->
          <g id="prop-slide">
            ${isoBox(118, 372, 42, 12, 3, 44, "#E4C193", "#CFA774", "#B8905E")}
            ${isoBox(122, 386, 34, 8, 16, 4, "#FFFDF9", "#E5DDD0", "#D0C6B8")}
            ${isoBox(122, 382, 34, 8, 32, 4, "#FFFDF9", "#E5DDD0", "#D0C6B8")}
            ${isoBox(114, 392, 52, 52, 3, 52, "#F7D37A", "#E5BC5E", "#CFA448")}
            ${isoBox(110, 388, 60, 60, 55, 14, "#E87A90", "#CE6278", "#B64F64")}
            <polygon points="${pts([iso(166, 404, 52), iso(166, 432, 52), iso(248, 432, 6), iso(248, 404, 6)])}" fill="#4DB8C6"/>
            <polygon points="${pts([iso(166, 432, 52), iso(248, 432, 6), iso(248, 432, 3), iso(166, 432, 47)])}" fill="#2E97A6"/>
            <line x1="${iso(166, 404, 56)[0]}" y1="${iso(166, 404, 56)[1]}" x2="${iso(248, 404, 10)[0]}" y2="${iso(248, 404, 10)[1]}" stroke="#F29FB1" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="${iso(166, 432, 56)[0]}" y1="${iso(166, 432, 56)[1]}" x2="${iso(248, 432, 10)[0]}" y2="${iso(248, 432, 10)[1]}" stroke="#F29FB1" stroke-width="3.5" stroke-linecap="round"/>
          </g>

          <!-- 2) XÍCH ĐU (khung chữ A, thanh ngang, dây treo rõ và 2 ghế đu) -->
          <g id="prop-swing">
            ${isoBox(264, 376, 8, 8, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(264, 412, 8, 8, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(350, 376, 8, 8, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(350, 412, 8, 8, 3, 66, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(262, 394, 96, 10, 69, 9, "#E87A90", "#CE6278", "#B64F64")}
            <g class="anim-swing" style="transform-origin:${iso(310, 399, 69)[0]}px ${iso(310, 399, 69)[1]}px;">
              <line x1="${iso(284, 399, 69)[0]}" y1="${iso(284, 399, 69)[1]}" x2="${iso(284, 399, 22)[0]}" y2="${iso(284, 399, 22)[1]}" stroke="#557A82" stroke-width="2"/>
              <line x1="${iso(300, 399, 69)[0]}" y1="${iso(300, 399, 69)[1]}" x2="${iso(300, 399, 22)[0]}" y2="${iso(300, 399, 22)[1]}" stroke="#557A82" stroke-width="2"/>
              <line x1="${iso(318, 399, 69)[0]}" y1="${iso(318, 399, 69)[1]}" x2="${iso(318, 399, 22)[0]}" y2="${iso(318, 399, 22)[1]}" stroke="#557A82" stroke-width="2"/>
              <line x1="${iso(334, 399, 69)[0]}" y1="${iso(334, 399, 69)[1]}" x2="${iso(334, 399, 22)[0]}" y2="${iso(334, 399, 22)[1]}" stroke="#557A82" stroke-width="2"/>
              ${isoBox(280, 391, 24, 16, 18, 5, "#F4C96B", "#DDA946", "#C79234")}
              ${isoBox(314, 391, 24, 16, 18, 5, "#F08CA0", "#DC7187", "#C45D73")}
            </g>
          </g>

          <!-- 3) VÒNG XOAY DẠNG NẰM (mâm tròn nằm thấp sát cỏ, chia múi màu và tay vịn vòng) -->
          <g id="prop-spinner">
            ${(() => {
              const [cx0, cy0] = iso(176, 548, 4);
              const [cx1, cy1] = iso(176, 548, 12);
              const [cxTop, cyTop] = iso(176, 548, 28);
              const spokes = [0, 60, 120, 180, 240, 300]
                .map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const u = 176 + 34 * Math.cos(rad);
                  const v = 548 + 34 * Math.sin(rad);
                  const [px, py] = iso(u, v, 12);
                  return `<line x1="${cx1}" y1="${cy1}" x2="${px}" y2="${py}" stroke="#FFFDF9" stroke-width="2"/>`;
                })
                .join("");
              const rails = [30, 120, 210, 300]
                .map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  const u = 176 + 24 * Math.cos(rad);
                  const v = 548 + 24 * Math.sin(rad);
                  const [p1x, p1y] = iso(u, v, 12);
                  const [p2x, p2y] = iso(u, v, 27);
                  return `<line x1="${p1x}" y1="${p1y}" x2="${p2x}" y2="${p2y}" stroke="#389FAD" stroke-width="2.6" stroke-linecap="round"/>`;
                })
                .join("");
              return `
                <ellipse cx="${cx0}" cy="${cy0}" rx="46" ry="26" fill="#3C8D5F" opacity="0.28"/>
                <ellipse cx="${cx1}" cy="${cy1 + 4}" rx="42" ry="24" fill="#CE6278"/>
                <ellipse cx="${cx1}" cy="${cy1}" rx="42" ry="24" fill="#F7D37A"/>
                ${spokes}
                <ellipse cx="${cx1}" cy="${cy1}" rx="12" ry="7" fill="#E87A90"/>
                <line x1="${cx1}" y1="${cy1}" x2="${cxTop}" y2="${cyTop}" stroke="#389FAD" stroke-width="4" stroke-linecap="round"/>
                ${rails}
                <ellipse cx="${cxTop}" cy="${cyTop}" rx="28" ry="16" fill="none" stroke="#389FAD" stroke-width="3.2"/>
              `;
            })()}
          </g>

          <!-- 4) BÓNG ĐÁ MINI (khung thành có lưới, vạch vôi sân & quả bóng) -->
          <g id="prop-soccer">
            <polygon points="${pts([iso(270, 505, 4), iso(358, 505, 4), iso(358, 578, 4), iso(270, 578, 4)])}" fill="none" stroke="#FFFDF9" stroke-width="2.2" opacity="0.72"/>
            ${isoBox(318, 502, 52, 58, 4, 34, "#DDF2F5", "#BFE3E8", "#A5D4DB", 'opacity="0.32"')}
            <line x1="${iso(318, 502, 38)[0]}" y1="${iso(318, 502, 38)[1]}" x2="${iso(318, 560, 38)[0]}" y2="${iso(318, 560, 38)[1]}" stroke="#FFFDF9" stroke-width="4" stroke-linecap="round"/>
            <line x1="${iso(318, 502, 4)[0]}" y1="${iso(318, 502, 4)[1]}" x2="${iso(318, 502, 38)[0]}" y2="${iso(318, 502, 38)[1]}" stroke="#FFFDF9" stroke-width="4" stroke-linecap="round"/>
            <line x1="${iso(318, 560, 4)[0]}" y1="${iso(318, 560, 4)[1]}" x2="${iso(318, 560, 38)[0]}" y2="${iso(318, 560, 38)[1]}" stroke="#FFFDF9" stroke-width="4" stroke-linecap="round"/>
            <line x1="${iso(318, 516, 38)[0]}" y1="${iso(318, 516, 38)[1]}" x2="${iso(368, 516, 34)[0]}" y2="${iso(368, 516, 34)[1]}" stroke="#FFFDF9" stroke-width="1.5" opacity="0.7"/>
            <line x1="${iso(318, 536, 38)[0]}" y1="${iso(318, 536, 38)[1]}" x2="${iso(368, 536, 34)[0]}" y2="${iso(368, 536, 34)[1]}" stroke="#FFFDF9" stroke-width="1.5" opacity="0.7"/>
            <line x1="${iso(368, 504, 18)[0]}" y1="${iso(368, 504, 18)[1]}" x2="${iso(368, 558, 18)[0]}" y2="${iso(368, 558, 18)[1]}" stroke="#FFFDF9" stroke-width="1.5" opacity="0.7"/>
            <g class="anim-ball">
              <circle cx="${iso(288, 540, 12)[0]}" cy="${iso(288, 540, 12)[1]}" r="10.5" fill="#FFFDF9"/>
              <circle cx="${iso(288, 540, 12)[0]}" cy="${iso(288, 540, 12)[1]}" r="4" fill="#2C2A29"/>
              <circle cx="${iso(288, 540, 12)[0] - 5}" cy="${iso(288, 540, 12)[1] - 3}" r="2" fill="#2C2A29"/>
              <circle cx="${iso(288, 540, 12)[0] + 5}" cy="${iso(288, 540, 12)[1] + 2}" r="2" fill="#2C2A29"/>
            </g>
          </g>

          <g opacity="0.88">
            ${isoBox(44, 324, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(424, 324, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(44, 624, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoBox(424, 624, 12, 12, 3, 112, "#4EB3C1", "#389FAD", "#2B8491")}
            ${isoFloor(44, 324, 392, 312, 116, "#DDF3F6", 'opacity="0.42"')}
          </g>
        </g>

        <!-- TƯỜNG HẬU LIỀN MẠCH TOÀN DÃY PHÒNG TẦNG TRỆT (u = 440 .. 1920, v = 340..354) -->
        <g id="ground-shared-back-wall">
          ${isoBox(440, 340, 1480, 14, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
        </g>

        <!-- 2. LỚP NHÀ TRẺ (5 – 36 THÁNG) — SÀN, TƯỜNG NGĂN LIỀN MẠCH & HÀNG RÀO SẮT MÀU THẤP PHÍA TRƯỚC -->
        <g id="room-nha-tre">
          ${isoFloor(440, 354, 280, 246, 2, "#FFF7F8")}
          <!-- Tường trái giáp Sân chơi chính nối khít tường hậu -->
          ${isoBox(440, 354, 14, 246, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
          ${isoFloor(440, 342, 14, 18, 56, "#FFFDF9")}
          <ellipse id="lamp-nt-cone" cx="${iso(580, 470, 5)[0]}" cy="${iso(580, 470, 5)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Dãy nệm ngủ pastel + gối gọn gàng dọc tường sau -->
          ${isoBox(468, 366, 72, 38, 4, 10, "#FFFDF9", "#F3E6E8", "#E6D5D8")}
          ${isoBox(473, 371, 20, 28, 14, 6, "#F7D1DA", "#E6B8C4", "#D4A3B0")}
          ${isoBox(552, 366, 72, 38, 4, 10, "#FFFDF9", "#E5EFF2", "#D5E4E8")}
          ${isoBox(557, 371, 20, 28, 14, 6, "#BCE5EB", "#9ED2DA", "#88BFC8")}
          ${isoBox(636, 366, 66, 38, 4, 10, "#FFFDF9", "#F7EEDB", "#EAE0CA")}
          ${isoBox(641, 371, 18, 28, 14, 6, "#FFE79E", "#ECD07C", "#D4B662")}
          <!-- Thảm xốp 4 ô ở giữa phòng -->
          ${isoFloor(506, 432, 64, 64, 4, "#BCE5EB")}
          ${isoFloor(574, 432, 64, 64, 4, "#F7D1DA")}
          ${isoFloor(506, 500, 64, 64, 4, "#FFE79E")}
          ${isoFloor(574, 500, 64, 64, 4, "#C4E8D1")}
          <!-- Kệ đồ chơi khối mềm góc trái & bàn pha sữa bên phải -->
          ${isoBox(462, 456, 26, 92, 4, 28, "#F5DEBE", "#E3C59B", "#D0B084")}
          ${isoBox(466, 466, 16, 18, 32, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(466, 496, 16, 18, 32, 12, "#4EB3C1", "#389FAD", "#2B8491")}
          ${isoBox(656, 514, 42, 42, 4, 22, "#F4A3B4", "#E28B9E", "#CC7589")}
          ${isoBox(668, 526, 16, 16, 26, 10, "#FFFDF9", "#BCE5EB", "#96CDD6")}
          <!-- Hàng rào sắt thấp rực rỡ phía trước Lớp Nhà trẻ (chừa lối vào bên phải) -->
          ${renderColorfulClassroomRail(456, 718, 598, 2, 24, 18, [652, 712])}
        </g>

        <!-- 3. LỚP MẪU GIÁO BÉ (3 – 4 TUỔI) — TƯỜNG NGĂN LIỀN MẠCH & HÀNG RÀO SẮT MÀU THẤP PHÍA TRƯỚC -->
        <g id="room-mau-giao-be">
          ${isoFloor(720, 354, 280, 246, 2, "#F5FBF7")}
          ${isoBox(720, 354, 14, 246, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
          ${isoFloor(720, 342, 14, 18, 56, "#FFFDF9")}
          <ellipse id="lamp-mgb-cone" cx="${iso(860, 470, 5)[0]}" cy="${iso(860, 470, 5)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng Hoa Bé Ngoan treo tường sau -->
          ${isoBox(794, 354, 120, 8, 18, 30, "#FFFDF9", "#E87A90", "#D16379")}
          ${isoFloor(812, 363, 22, 2, 34, "#F4C96B")}
          ${isoFloor(844, 363, 22, 2, 34, "#BCE5EB")}
          ${isoFloor(876, 363, 22, 2, 34, "#C4E8D1")}
          <!-- Tủ để ba lô & xếp dép dọc tường trái -->
          ${isoBox(740, 380, 32, 118, 4, 30, "#F5DEBE", "#E3C59B", "#D0B084")}
          ${isoBox(746, 392, 18, 20, 34, 14, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(746, 424, 18, 20, 34, 14, "#4EB3C1", "#389FAD", "#2B8491")}
          ${isoBox(746, 456, 18, 20, 34, 14, "#F7D37A", "#E5BC5E", "#CFA448")}
          <!-- 2 cụm bàn học mầm non kèm ghế 4 phía gọn gàng -->
          ${isoMiniTable(835, 428, 4, "#FFE599", "#E87A90", "#52A877")}
          ${isoMiniTable(895, 506, 4, "#4EB3C1", "#F4C96B", "#E87A90")}
          <!-- Hàng rào sắt thấp rực rỡ phía trước Lớp Mẫu giáo bé (chừa lối vào bên phải) -->
          ${renderColorfulClassroomRail(736, 998, 598, 2, 24, 18, [932, 992])}
        </g>

        <!-- 4. VĂN PHÒNG & CAMERA GIÁM SÁT 24/7 -->
        <g id="room-van-phong">
          ${isoFloor(1000, 354, 240, 246, 2, "#FFFDF8")}
          ${isoBox(1000, 354, 14, 246, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
          ${isoFloor(1000, 342, 14, 18, 56, "#FFFDF9")}
          <g id="office-cctv-camera">
            ${isoBox(1180, 354, 26, 18, 42, 16, "#FFFDF9", "#389FAD", "#297E8A")}
            <circle cx="${iso(1193, 370, 48)[0]}" cy="${iso(1193, 370, 48)[1]}" r="5" fill="#52A877"/>
          </g>
          <!-- Tủ hồ sơ sau bàn làm việc -->
          ${isoBox(1025, 368, 92, 26, 4, 38, "#EFE3D3", "#DFCEBA", "#CEB9A2")}
          <!-- Bàn làm việc & màn hình camera giám sát 24/7 -->
          ${isoBox(1062, 420, 118, 58, 20, 10, "#DFBE97", "#C79E6E", "#B28758")}
          ${isoBox(1070, 426, 102, 46, 2, 18, "#EBD6BA", "#D5BA96", "#C0A27D")}
          ${isoBox(1086, 428, 56, 14, 30, 32, "#2C2A29", "#3F3C3A", "#22201F")}
          ${isoFloor(1092, 444, 20, 2, 48, "#A6E3E9")}
          ${isoFloor(1116, 444, 20, 2, 48, "#C4E8D1")}
          ${isoBox(1188, 434, 18, 18, 30, 16, "#F7D1DA", "#E87A90", "#C95E75")}
          <!-- Ghế tiếp phụ huynh phía trước -->
          ${isoBox(1096, 514, 24, 24, 4, 16, "#4EB3C1", "#389FAD", "#2B8491")}
          <!-- Tường ngăn bên phải Văn phòng sát khu cầu thang -->
          ${isoBox(1228, 354, 14, 246, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
          ${isoFloor(1228, 342, 14, 18, 56, "#FFFDF9")}
        </g>

        <!-- 5. CẦU THANG CHỮ U LƠ LỬNG BẬC MỎNG, KHÔNG CHÂN ĐẾ, LAN CAN CẢ 2 BÊN -->
        <g id="room-cau-thang">
          ${(() => {
            let steps = "";
            const railCols = ["#E87A90", "#F4C96B", "#52A877", "#389FAD"];
            const slabThick = 6.5;

            // 1) Lan can phía sau chiếu nghỉ (trải từ u=1255 sang u=1365)
            for (let u = 1255; u <= 1365; u += 27.5) {
              steps += isoBox(u, 363, 3.5, 3.5, 74, 22, "#4EB3C1", "#389FAD", "#297E8A");
            }
            const [rl1x, rl1y] = iso(1257, 365, 96);
            const [rl2x, rl2y] = iso(1367, 365, 96);
            steps += `<line x1="${rl1x}" y1="${rl1y}" x2="${rl2x}" y2="${rl2y}" stroke="#389FAD" stroke-width="3.6" stroke-linecap="round"/>`;

            // 2) Tấm chiếu nghỉ mỏng lơ lửng phía sau (z = 67.5..74, không bệ đỡ dưới)
            steps += isoBox(1254, 362, 112, 52, 74 - slabThick, slabThick, "#FFFDF9", "#D8E2E8", "#C3D0D8");

            // 3) Vế lên 2 bên trái (u=1254..1304, v=414->584, z=74->144) — lan can CẢ 2 BÊN & bậc mỏng lơ lửng
            // 3a) Lan can bên trái (cạnh xa u=1255)
            for (let r = 0; r < 4; r++) {
              const vr2 = 426 + r * 48;
              const zr2 = 84 + r * 19;
              steps += isoBox(1255, vr2, 3.5, 3.5, zr2, 22, railCols[r], railCols[r], railCols[r]);
            }
            const [f2Lx1, f2Ly1] = iso(1257, 426, 106);
            const [f2Lx2, f2Ly2] = iso(1257, 570, 163);
            steps += `<line x1="${f2Lx1}" y1="${f2Ly1}" x2="${f2Lx2}" y2="${f2Ly2}" stroke="#E87A90" stroke-width="3.8" stroke-linecap="round"/>`;

            // 3b) 6 bậc thang mỏng lơ lửng của vế 2 (quay ra đối diện hành lang dưới)
            const n2 = 6;
            const dv2 = 170 / n2;
            const dz2 = 70 / n2;
            for (let s = 0; s < n2; s++) {
              const vs = 414 + s * dv2;
              const zTop = 74 + (s + 1) * dz2;
              steps += isoBox(1254, vs, 50, dv2 - 1, zTop - slabThick, slabThick, "#FFFDF9", "#D8E2E8", "#C3D0D8");
            }

            // 3c) Lan can bên phải của vế 2 (cạnh giữa u=1301)
            for (let r = 0; r < 4; r++) {
              const vr2 = 426 + r * 48;
              const zr2 = 84 + r * 19;
              steps += isoBox(1301, vr2, 3.5, 3.5, zr2, 22, railCols[r], railCols[r], railCols[r]);
            }
            const [f2Rx1, f2Ry1] = iso(1303, 426, 106);
            const [f2Rx2, f2Ry2] = iso(1303, 570, 163);
            steps += `<line x1="${f2Rx1}" y1="${f2Ry1}" x2="${f2Rx2}" y2="${f2Ry2}" stroke="#E87A90" stroke-width="3.8" stroke-linecap="round"/>`;

            // 4) Vế lên 1 bên phải (u=1316..1366, v=584->414, z=12->74) — lan can CẢ 2 BÊN & bậc mỏng lơ lửng
            // 4a) Lan can bên trái của vế 1 (cạnh giữa u=1317)
            for (let r = 0; r < 4; r++) {
              const vr1 = 572 - r * 48;
              const zr1 = 14 + r * 19;
              steps += isoBox(1317, vr1, 3.5, 3.5, zr1, 22, railCols[3 - r], railCols[3 - r], railCols[3 - r]);
            }
            const [f1Lx1, f1Ly1] = iso(1319, 572, 36);
            const [f1Lx2, f1Ly2] = iso(1319, 428, 93);
            steps += `<line x1="${f1Lx1}" y1="${f1Ly1}" x2="${f1Lx2}" y2="${f1Ly2}" stroke="#389FAD" stroke-width="3.8" stroke-linecap="round"/>`;

            // 4b) 6 bậc thang mỏng lơ lửng của vế 1
            const n1 = 6;
            const dv1 = 170 / n1;
            const dz1 = 70 / n1;
            for (let s = n1 - 1; s >= 0; s--) {
              const vs = 584 - (s + 1) * dv1;
              const zTop = 4 + (s + 1) * dz1;
              steps += isoBox(1316, vs, 50, dv1 - 1, zTop - slabThick, slabThick, "#FFFDF9", "#D8E2E8", "#C3D0D8");
            }

            // 4c) Lan can bên phải của vế 1 (cạnh ngoài u=1363)
            for (let r = 0; r < 4; r++) {
              const vr1 = 572 - r * 48;
              const zr1 = 14 + r * 19;
              steps += isoBox(1363, vr1, 3.5, 3.5, zr1, 22, railCols[3 - r], railCols[3 - r], railCols[3 - r]);
            }
            const [f1Rx1, f1Ry1] = iso(1365, 572, 36);
            const [f1Rx2, f1Ry2] = iso(1365, 428, 93);
            steps += `<line x1="${f1Rx1}" y1="${f1Ry1}" x2="${f1Rx2}" y2="${f1Ry2}" stroke="#389FAD" stroke-width="3.8" stroke-linecap="round"/>`;

            return steps;
          })()}
        </g>

        <!-- 6. KHO DỤNG CỤ (CÓ TƯỜNG TRƯỚC CHỪA CỬA BÊN PHẢI) + BẾP NẤU XOAY 90° HÌNH CHỮ L -->
        <g id="room-bep-kho">
          <!-- Nền L-shape: nhánh Kho (1380..1676, v=354..600) + nhánh Bếp xoay 90° (1676..1920, v=354..724) -->
          ${isoFloor(1380, 354, 296, 246, 2, "#FFFDF9")}
          ${isoFloor(1676, 354, 244, 370, 2, "#FDF8F0")}

          <!-- Tường trái Kho giáp cầu thang nối liền mạch với tường hậu -->
          ${isoBox(1380, 354, 14, 246, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
          ${isoFloor(1380, 342, 14, 18, 56, "#FFFDF9")}

          <g id="area-kho-dung-cu">
            ${isoBox(1414, 368, 138, 44, 4, 42, "#EFE3D3", "#DFCEBA", "#CEB9A2")}
            ${isoBox(1422, 374, 34, 30, 46, 16, "#BCE5EB", "#96CDD6", "#7EB8C2")}
            ${isoBox(1464, 374, 34, 30, 46, 14, "#F7D1DA", "#E6B4C0", "#D39CAC")}
            ${isoBox(1506, 374, 34, 30, 46, 18, "#FFE79E", "#ECD07C", "#D4B662")}
            ${isoBox(1432, 470, 66, 46, 4, 20, "#F5DEBE", "#E3C59B", "#D0B084")}
          </g>

          <!-- Bức tường phía trước Kho (u=1394..1612, v=588..602) CHỪA 1 CỬA RA VÀO BÊN PHẢI (u=1612..1676) -->
          <g id="wall-kho-front">
            ${isoBox(1394, 588, 218, 14, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
            ${isoFloor(1380, 588, 18, 14, 56, "#FFFDF9")}
            ${isoFloor(1614, 586, 60, 22, 3, "#FCE8D5")}
          </g>

          <!-- Bức tường ngăn cách liền mạch giữa Kho dụng cụ & Bếp nấu + vách cửa hướng ra hành lang -->
          <g id="wall-kho-bep-divider">
            ${isoBox(1676, 354, 14, 272, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
            ${isoFloor(1676, 342, 14, 18, 56, "#FFFDF9")}
            ${isoBox(1676, 682, 14, 42, 2, 54, "#FFFDF9", "#F2EAE0", "#E5DACB")}
            ${isoFloor(1652, 628, 40, 52, 3, "#BCE5EB")}
            ${isoBox(1690, 626, 36, 7, 3, 45, "#6EC2CE", "#389FAD", "#297E8A")}
          </g>

          <!-- Gờ thấp bao nét chữ L ngoài cùng bên phải & mặt trước gần hàng rào -->
          ${isoBox(1906, 354, 14, 370, 2, 18, "#FFFDF9", "#EFE6DA", "#DDD1C1")}
          ${isoBox(1676, 710, 244, 14, 2, 18, "#FFFDF9", "#EFE6DA", "#DDD1C1")}

          <g id="area-bep-nau">
            <!-- Bệ bếp dài xoay dọc theo trục V (từ cạnh sau v=375 ra gần hàng rào v=655) -->
            ${isoBox(1822, 376, 68, 250, 4, 28, "#389FAD", "#EDE5DC", "#DFD4C8")}
            ${isoBox(1836, 405, 36, 36, 32, 16, "#E5989B", "#CC7C80", "#B56468")}
            ${isoBox(1836, 475, 34, 34, 32, 14, "#F4C96B", "#DDA946", "#C79234")}
            ${isoBox(1838, 545, 32, 42, 32, 10, "#BCE5EB", "#96CDD6", "#7EB8C2")}
            <!-- Bàn soạn đồ ăn ngay cạnh cửa hướng ra hành lang -->
            ${isoBox(1726, 560, 56, 86, 4, 24, "#E9F7F1", "#C6E8D8", "#AED7C4")}
            ${isoBox(1742, 576, 22, 22, 28, 7, "#F4C96B", "#DDA946", "#C79234")}
            ${isoBox(1742, 608, 22, 22, 28, 7, "#E87A90", "#CE6278", "#B64F64")}
            <path class="anim-steam" d="M ${iso(1854, 422, 52)[0]} ${iso(1854, 422, 52)[1]} q -8 -16 4 -30 t -2 -26" fill="none" stroke="#E2C8B8" stroke-width="4" stroke-linecap="round"/>
            <path class="anim-steam-delay" d="M ${iso(1854, 492, 50)[0]} ${iso(1854, 492, 50)[1]} q 8 -16 -4 -30 t 2 -26" fill="none" stroke="#E2C8B8" stroke-width="3.5" stroke-linecap="round"/>
          </g>
        </g>

        <!-- HIÊN CHÍNH -->
        <g id="veranda-foreground">
          ${isoFloor(440, 600, 940, 65, 3, "#EFE4D6")}
          ${isoMiniTable(565, 622, 3, "#48B5C4", "#E87A90", "#52A877")}
          ${isoMiniTable(835, 622, 3, "#F4C96B", "#389FAD", "#E87A90")}
          ${isoMiniTable(1105, 622, 3, "#52A877", "#F4C96B", "#48B5C4")}
          ${isoPinkPillar(455, 652, 3, 74)}
          ${isoPinkPillar(720, 652, 3, 74)}
          ${isoPinkPillar(995, 652, 3, 74)}
          ${isoPinkPillar(1235, 652, 3, 74)}
        </g>
      </g>

      <!-- HÀNG RÀO BÊN PHẢI TẦNG TRỆT (u = 1958, v = 310 .. 752) -->
      ${renderCementColorFenceAlongV(1958, 310, 17, 26, 40, 0)}
      </g>

      <!-- ==================== LẦU 2 (HÀNH LANG TRƯỚC NỐI 2 SÂN & HÀNG RÀO SẮT BAO QUANH 4 MẶT GỒM SAU LƯNG, KHÔNG CÂY) ==================== -->
      <g id="floor-2-iso" filter="url(#paperShadow)">
        ${isoBox(580, -180, 1320, 376, 128, 16, "#F5EDE3", "#E2D4C4", "#CFC0AE")}

        <!-- Hàng rào sắt phía sau lưng tầng trên (v=-174, u=584..1894) -->
        <g id="floor2-iron-railings-back">
          ${renderIronFenceAlongU(584, 1894, -174, 145, 34, 28)}
        </g>

        <!-- Hành lang Lầu 2 chạy suốt phía trước các phòng nối liền 2 sân chơi hai đầu -->
        <g id="floor2-front-corridor">
          ${isoFloor(760, 112, 960, 78, 145, "#EFE5D8")}
          ${isoFloor(760, 112, 960, 10, 145, "#E8DACC")}
        </g>

        <g id="room-san-nho-trai">
          ${isoFloor(586, -172, 174, 362, 145, "#D9F2E4")}
          ${isoBox(635, -70, 56, 56, 156, 8, "#F4C96B", "#DDA946", "#C79234")}
          ${isoBox(655, -50, 16, 16, 145, 11, "#E4C193", "#CFA774", "#B8905E")}
          ${isoBox(608, -60, 20, 20, 145, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(688, 20, 34, 34, 145, 14, "#4EB3C1", "#389FAD", "#2B8491")}
        </g>

        <g id="room-mau-giao-lon">
          ${isoFloor(760, -172, 420, 284, 145, "#FFFDF8")}
          ${isoBox(760, -172, 420, 14, 145, 52, "#FFFDF9", "#EFE4D6", "#E2D5C5")}
          ${isoBox(760, -158, 14, 270, 145, 52, "#FFFDF9", "#EFE4D6", "#E2D5C5")}
          ${isoFloor(760, -168, 14, 18, 197, "#FFFDF9")}
          <ellipse id="lamp-mgl" cx="${iso(970, -30, 147)[0]}" cy="${iso(970, -30, 147)[1]}" rx="120" ry="68" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng chữ cái lớp 1 & kệ sách gọn gàng -->
          ${isoBox(895, -166, 148, 10, 162, 30, "#E4C193", "#3B8D70", "#2F755C")}
          ${isoBox(785, -142, 74, 34, 146, 36, "#F5DEBE", "#E3C59B", "#D0B084")}
          ${isoBox(794, -135, 16, 22, 182, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(816, -135, 16, 22, 182, 14, "#4EB3C1", "#389FAD", "#2B8491")}
          ${isoBox(836, -135, 16, 22, 182, 10, "#F7D37A", "#E5BC5E", "#CFA448")}
          <!-- 2 dãy bàn học chữ cái & ghế -->
          ${isoBox(875, -55, 86, 48, 157, 9, "#F8D889", "#E2BD63", "#C9A44D")}
          ${isoBox(1015, -55, 86, 48, 157, 9, "#A9DFBF", "#80C89E", "#66AF85")}
          ${isoBox(890, 5, 22, 22, 146, 12, "#389FAD", "#2A8390", "#226F7A")}
          ${isoBox(1030, 5, 22, 22, 146, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(890, -86, 22, 22, 146, 12, "#52A877", "#3F8E61", "#31774F")}
          ${isoBox(1030, -86, 22, 22, 146, 12, "#F4C96B", "#DDA946", "#C79234")}
          <!-- Bức tường bên phải liền mạch với tường hậu Lớp Mẫu giáo lớn -->
          <g id="wall-mgl-right">
            ${isoBox(1166, -158, 14, 270, 145, 52, "#FFFDF9", "#EFE4D6", "#E2D5C5")}
            ${isoFloor(1166, -168, 14, 18, 197, "#FFFDF9")}
          </g>
          <!-- Hàng rào sắt thấp đủ màu sắc rực rỡ phía trước Lớp Mẫu giáo lớn -->
          ${renderColorfulClassroomRail(776, 1164, 112, 145, 24, 18, [1096, 1160])}
        </g>

        <g id="room-loi-cau-thang-l2">
          ${isoFloor(1180, -172, 200, 284, 145, "#F6EFE7")}
          ${isoBox(1196, -148, 164, 12, 146, 22, "#4EB3C1", "#389FAD", "#2B8491")}
          <!-- Miệng ô cầu thang chữ U Lầu 2 (vế lên quay thẳng ra đối diện hành lang trước) -->
          ${isoFloor(1252, -108, 116, 174, 146, "#D6E2E8")}
          ${renderIronFenceAlongU(1252, 1368, -108, 146, 24, 24)}
          ${renderIronFenceAlongV(1252, -108, 66, 146, 24, 24)}
          ${renderIronFenceAlongV(1368, -108, 66, 146, 24, 24)}
        </g>

        <g id="room-mau-giao-nho">
          ${isoFloor(1380, -172, 340, 284, 145, "#FFF8FA")}
          ${isoBox(1380, -172, 340, 14, 145, 52, "#FFFDF9", "#F8E3E8", "#ECD2D9")}
          ${isoBox(1380, -158, 14, 270, 145, 52, "#FFFDF9", "#F8E3E8", "#ECD2D9")}
          ${isoFloor(1380, -168, 14, 18, 197, "#FFFDF9")}
          <ellipse id="lamp-mgn" cx="${iso(1550, -30, 147)[0]}" cy="${iso(1550, -30, 147)[1]}" rx="115" ry="66" fill="url(#lampSpotGrad)" opacity="0.25"/>
          <!-- Bảng trưng bày tranh, giá vẽ sáng tạo & bàn học nhóm -->
          ${isoBox(1425, -166, 112, 10, 162, 30, "#FFFDF9", "#E87A90", "#CE6278")}
          ${isoBox(1614, -125, 36, 24, 146, 36, "#FFFDF9", "#D9A875", "#C2905D")}
          ${isoBox(1620, -120, 22, 12, 182, 14, "#BCE5EB", "#96CDD6", "#7EB8C2")}
          ${isoBox(1490, -55, 104, 64, 157, 10, "#6EC2CE", "#4CA6B3", "#38919E")}
          ${isoBox(1464, -36, 22, 22, 146, 12, "#F4C96B", "#DDA946", "#C79234")}
          ${isoBox(1604, -36, 22, 22, 146, 12, "#E87A90", "#CE6278", "#B64F64")}
          ${isoBox(1532, 16, 22, 22, 146, 12, "#52A877", "#3F8E61", "#31774F")}
          <!-- Bức tường bên phải liền mạch với tường hậu Lớp Mẫu giáo nhỡ -->
          <g id="wall-mgn-right">
            ${isoBox(1706, -158, 14, 270, 145, 52, "#FFFDF9", "#F8E3E8", "#ECD2D9")}
            ${isoFloor(1706, -168, 14, 18, 197, "#FFFDF9")}
          </g>
          <!-- Hàng rào sắt thấp đủ màu sắc rực rỡ phía trước Lớp Mẫu giáo nhỡ -->
          ${renderColorfulClassroomRail(1396, 1704, 112, 145, 24, 18, [1396, 1454])}
        </g>

        <g id="room-san-nho-phai">
          ${isoFloor(1720, -172, 174, 362, 145, "#D9F2E4")}
          ${isoBox(1770, -70, 56, 56, 156, 8, "#F7D1DA", "#E6B4C0", "#D39CAC")}
          ${isoBox(1790, -50, 16, 16, 145, 11, "#E4C193", "#CFA774", "#B8905E")}
          ${isoBox(1834, -55, 20, 20, 145, 12, "#52A877", "#3F8E61", "#31774F")}
          ${isoBox(1752, 24, 34, 34, 145, 14, "#F4C96B", "#DDA946", "#C79234")}
        </g>

        <!-- Hàng rào sắt an toàn vây khép kín Lầu 2 (Trái, Trước hành lang liền mạch, Phải) -->
        <g id="floor2-iron-railings">
          ${renderIronFenceAlongV(584, -174, 188, 145, 34, 28)}
          ${renderIronFenceAlongU(584, 1894, 188, 145, 34, 28)}
          ${renderIronFenceAlongV(1894, -174, 188, 145, 34, 28)}
        </g>
      </g>

      <!-- ================================================================= -->
      <!-- MẶT TIỀN: 2 CÁNH CỔNG NẰM SAU HÀNG RÀO KHI KÉO RA + BẢNG 30° -->
      <!-- ================================================================= -->
      <g id="facade-curtain">
        <!-- HAI CÁNH CỔNG CHÍNH ISOMETRIC 30° (Đặt v=732 và vẽ TRƯỚC hàng rào để khi kéo ra lùi gọn phía sau hàng rào) -->
        <g id="gate-doors-iso">
          <g id="gate-leaf-left">
            ${renderIsoGateWing(1040, 1122, 732, 2, 98)}
          </g>
          <g id="gate-leaf-right">
            ${renderIsoGateWing(1122, 1204, 732, 2, 98)}
          </g>
        </g>

        <!-- HÀNG RÀO XI MĂNG SƠN MÀU KÉO DÀI HẾT CẠNH TRƯỚC (u = -6 .. 1966) NẰM PHÍA TRƯỚC CÁNH CỔNG KÉO RA -->
        <g id="facade-outer-walls">
          ${renderCementColorFenceAlongU(-6, 750, 39, 26, 40, 0)}
          ${renderCementColorFenceAlongU(1240, 750, 28, 26, 40, 0)}

          <!-- Bảng NỘI QUY PHỤ HUYNH đặt nghiêng đúng góc 30° Isometric (v_front = 752) -->
          <g id="sign-noi-quy-iso">
            ${isoBox(714, 738, 178, 14, 16, 88, "#F0E9DF", "#E5DDD1", "#D4C9BA")}
            <g transform="matrix(0.866025, 0.5, 0, 1, ${nqX}, ${nqY})">
              <rect x="0" y="0" width="172" height="82" rx="12" fill="#FFFDF9"/>
              <text x="86" y="25" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="12" font-weight="700" fill="#B82C3E">NỘI QUY PHỤ HUYNH</text>
              <rect x="18" y="36" width="136" height="5" rx="2.5" fill="#E8DDD0"/>
              <rect x="18" y="48" width="116" height="5" rx="2.5" fill="#F0E7DC"/>
              <rect x="18" y="60" width="126" height="5" rx="2.5" fill="#E8DDD0"/>
            </g>
          </g>

          <!-- Bảng THÔNG BÁO đặt nghiêng đúng góc 30° Isometric (v_front = 752) -->
          <g id="sign-thong-bao-iso">
            ${isoBox(1320, 738, 174, 14, 16, 88, "#F0E9DF", "#E5DDD1", "#D4C9BA")}
            <g transform="matrix(0.866025, 0.5, 0, 1, ${tbX}, ${tbY})">
              <rect x="0" y="0" width="168" height="82" rx="12" fill="#FFFDF9"/>
              <text x="84" y="25" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="12.5" font-weight="700" fill="#B82C3E">THÔNG BÁO</text>
              <rect x="18" y="35" width="60" height="34" rx="8" fill="#FFF4DC"/>
              <rect x="88" y="35" width="62" height="34" rx="8" fill="#EBF8FA"/>
            </g>
          </g>
        </g>

        <!-- HAI TRỤ CỔNG XANH NGỌC ISOMETRIC -->
        <g id="gate-pillars" filter="url(#paperShadow)">
          ${isoBox(1008, 728, 32, 32, 0, 108, "#4EB3C1", "#389FAD", "#297E8A")}
          ${isoBox(1004, 724, 40, 40, 108, 12, "#FFFDF9", "#EAE3DA", "#D8CFC4")}
          ${isoBox(1204, 728, 32, 32, 0, 108, "#4EB3C1", "#389FAD", "#297E8A")}
          ${isoBox(1200, 724, 40, 40, 108, 12, "#FFFDF9", "#EAE3DA", "#D8CFC4")}
        </g>

        <!-- LÁ CỜ MỀM MẠI BAY PHẤT PHƠI & BIỂN HIỆU TRƯỜNG ĐẶT NGHIÊNG 30° -->
        <g id="gate-sign-group">
          <g id="national-flag" transform="translate(${iso(952, 744, 118)[0]}, ${iso(952, 744, 118)[1]})">
            <line x1="0" y1="2" x2="-22" y2="-82" stroke="#8C979E" stroke-width="4.5" stroke-linecap="round"/>
            <circle cx="-22" cy="-83" r="3.6" fill="#F4C96B"/>
            <g class="anim-flag" style="transform-origin:-22px -82px;">
              <path
                d="M -22 -82 C -38 -89 -54 -75 -74 -83 C -80 -85 -84 -81 -86 -76 C -81 -62 -79 -50 -78 -36 C -64 -34 -48 -46 -32 -37 C -24 -33 -17 -37 -14 -41 Z"
                fill="#E23D40"
                filter="url(#softShadow)"
              />
              <path d="M -46 -80 C -44 -64 -43 -52 -42 -40" stroke="#C52B2E" stroke-width="4" stroke-linecap="round" opacity="0.28"/>
              <path d="M -66 -81 C -64 -66 -63 -54 -62 -39" stroke="#F46669" stroke-width="3" stroke-linecap="round" opacity="0.24"/>
              <polygon points="-50,-68 -47,-61 -40,-61 -45.5,-56.5 -43.5,-49.5 -50,-53.8 -56.5,-49.5 -54.5,-56.5 -60,-61 -53,-61" fill="#FFE35C"/>
            </g>
          </g>

          <g id="main-signboard-iso">
            ${isoBox(959, 736, 326, 16, 120, 112, "#F5EFE6", "#E5DDD1", "#D4C9BA")}
            <g id="main-signboard" transform="matrix(0.866025, 0.5, 0, 1, ${sbX}, ${sbY})">
              <rect x="0" y="0" width="320" height="106" rx="14" fill="#FFFDF9"/>
              <text x="14" y="18" font-family="Be Vietnam Pro, sans-serif" font-size="8.2" font-weight="600" fill="#4B4440">UBND XÃ SƠN TỊNH</text>
              <text x="194" y="21" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13.5" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
              <image href="assets/images/logo-hoa-sen.png" x="14" y="23" width="48" height="48" clip-path="url(#isoSignLogoClip)"/>
              <text x="196" y="59" text-anchor="middle" font-family="Fraunces, serif" font-size="33" font-weight="700" letter-spacing="1.5">
                <tspan fill="#D94854">H</tspan><tspan fill="#2E7D5B">O</tspan><tspan fill="#2E3A67">A </tspan><tspan fill="#E85A77">S</tspan><tspan fill="#2D4A8C">E</tspan><tspan fill="#C94E87">N</tspan>
              </text>
              <rect x="10" y="73" width="210" height="25" rx="8" fill="#2E9D5C"/>
              <rect x="224" y="73" width="86" height="25" rx="8" fill="#F4D35E"/>
              <text x="17" y="84" font-family="Be Vietnam Pro, sans-serif" font-size="7.6" font-weight="500" fill="#FFFDF9">5P5Q+5G8, Lâm Lộc, Sơn Tịnh</text>
              <text x="17" y="94" font-family="Quicksand, sans-serif" font-size="8.4" font-weight="700" fill="#FFFDF9">0868.474.194 • 0975.551.545</text>
              <text x="267" y="84" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="7.2" font-weight="700" fill="#2C2A29">QĐ 1815/QĐ-UBND</text>
              <text x="267" y="94" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="6.8" font-weight="500" fill="#2C2A29">08/12/2025</text>
            </g>
          </g>
        </g>
      </g>
    </g>

    <!-- LỚP 3: NHÃN KHU VỰC (ICON TRÒN KHI CHƯA TỚI -> VIÊN NHỘNG TÊN ĐẦY ĐỦ KHI TỚI) -->
    <g id="layer-foreground">
      <g id="scene-room-badges">
        <g id="ground-room-badges">
          ${renderIsoRoomLabel(240, 480, 148, "SÂN CHƠI CHÍNH", "#2D8E9B", "#FFFDF9", 206, "playground", "playground")}
          ${renderIsoRoomLabel(580, 470, 96, "LỚP NHÀ TRẺ (5–36TH)", "#F4C96B", "#3D2A06", 242, "nursery", "baby")}
          ${renderIsoRoomLabel(860, 470, 96, "LỚP MẪU GIÁO BÉ (3–4T)", "#E87A90", "#FFFDF9", 250, "preschool-small", "blocks")}
          ${renderIsoRoomLabel(1120, 470, 96, "VĂN PHÒNG • CAMERA 24/7", "#389FAD", "#FFFDF9", 264, "veranda-kitchen", "camera")}
          ${renderIsoRoomLabel(1310, 480, 122, "CẦU THANG LẦU 2", "#6F635B", "#FFFDF9", 198, "stairs", "stairs")}
          ${renderIsoRoomLabel(1515, 470, 92, "KHO DỤNG CỤ", "#C8955A", "#FFFDF9", 176, "veranda-kitchen", "box")}
          ${renderIsoRoomLabel(1805, 535, 92, "BẾP NẤU", "#E07A5F", "#FFFDF9", 148, "veranda-kitchen", "pot")}
        </g>

        <g id="floor2-room-badges">
          ${renderIsoRoomLabel(670, -30, 224, "SÂN CHƠI NHỎ TRÁI", "#52A877", "#FFFDF9", 214, "floor2-lon", "leaf")}
          ${renderIsoRoomLabel(970, -30, 232, "LỚP MẪU GIÁO LỚN (5–6T)", "#D95D78", "#FFFDF9", 260, "floor2-lon", "book")}
          ${renderIsoRoomLabel(1550, -30, 232, "LỚP MẪU GIÁO NHỠ (4–5T)", "#F4C96B", "#3D2A06", 260, "floor2-nho", "palette")}
          ${renderIsoRoomLabel(1810, -30, 224, "SÂN CHƠI NHỎ PHẢI", "#389FAD", "#FFFDF9", 214, "floor2-nho", "leaf")}
        </g>
      </g>
    </g>
  </svg>
  `;
}
