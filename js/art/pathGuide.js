/**
 * ============================================================================
 * ĐƯỜNG NÉT NGHỆ THUẬT, CÁNH HOA SEN DẪN CHUYỆN (ISOMETRIC 30°) & CHÂN DUNG CÔ GIÁO
 * ============================================================================
 */

import { iso } from "./scenes.js";

/**
 * Đường dẫn chuyện liên kết toàn bộ bản đồ Isometric 30 độ theo đúng hành trình:
 * Cổng -> Văn phòng (Camera 24/7) -> Kho -> Bếp nấu chữ L -> Sân chơi chính -> Nhà trẻ -> Mẫu giáo bé -> Cầu thang -> Lầu 2 -> Khoảnh khắc
 */
export function renderCampusGuideSvg(hostEl) {
  const pts = [
    iso(1120, 785, 4),   // 0: Chặng 1 - Cổng Hoa Sen
    iso(1120, 625, 4),   // 1: Qua cổng vào hành lang trước Văn phòng
    iso(1515, 635, 4),   // 2: Ngang trước Kho dụng cụ
    iso(1665, 655, 4),   // 3: Chặng 2 - Trước cửa Bếp chữ L
    iso(1120, 635, 4),   // 4: Trở ra giữa hành lang
    iso(240, 635, 4),    // 5: Chặng 3 - Sân chơi chính
    iso(580, 625, 4),    // 6: Chặng 4 - Lớp Nhà trẻ
    iso(860, 625, 4),    // 7: Chặng 5 - Lớp Mẫu giáo bé
    iso(1340, 586, 6),   // 8: Chân cầu thang chữ U (vế phải bắt đầu từ hành lang dưới)
    iso(1340, 386, 76),  // 9: Chặng 6 - Chiếu nghỉ chữ U phía sau
    iso(1280, 386, 76),  // 10: Quay 180° sang vế 2 bên trái
    iso(1280, 586, 146), // 11: Lên đỉnh cầu thang quay ra đối diện hành lang
    iso(1280, 672, 148), // 12: Bước ra hành lang Lầu 2 (ngang hàng trệt, v = 152 + 520 = 672)
    iso(1550, 672, 148), // 13: Chặng 7 - Trước Lớp Mẫu giáo nhỡ (Lầu 2 phía trước)
    iso(970, 672, 148),  // 14: Chặng 8 - Dừng trước Lớp Mẫu giáo lớn (Lầu 2 phía trước)
  ];

  const cumDist = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    cumDist.push(cumDist[i - 1] + Math.hypot(dx, dy));
  }
  const totalPolyLen = cumDist[cumDist.length - 1] || 1;
  const stopRatios = [0, 3, 5, 6, 7, 9, 13, 14].map((idx) => +(cumDist[idx] / totalPolyLen).toFixed(5));

  const toPathD = (arr) => arr.map(([x, y], idx) => (idx === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(" ");
  const d = toPathD(pts);

  const [startX, startY] = pts[0];

  hostEl.innerHTML = `
  <svg
    id="guide-svg"
    class="guide-svg"
    viewBox="0 0 3200 2100"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="petalGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" flood-color="#E87A90" flood-opacity="0.32"/>
      </filter>
    </defs>

    <!-- Đường hình học ẩn dùng để nội suy tọa độ chấm hành trình, không vẽ đường liền hay đường gạch nối -->
    <path
      id="campus-story-path"
      d="${d}"
      data-stop-ratios='${JSON.stringify(stopRatios)}'
      fill="none"
      stroke="none"
    />

    <g id="floating-lotus-lead" filter="url(#petalGlow)" transform="translate(${startX}, ${startY})">
      <circle class="anim-cursor-ring" cx="0" cy="0" r="14" fill="#E87A90" opacity="0.28"/>
      <circle cx="0" cy="0" r="9.5" fill="#FFFDF9"/>
      <circle cx="0" cy="0" r="6.5" fill="#E87A90"/>
      <circle cx="0" cy="0" r="2.6" fill="#FFFDF9"/>
    </g>
  </svg>
  `;
}

/**
 * Đường dẫn chuyện liên tục nối liền Khoảnh khắc -> Giáo viên -> Liên hệ
 */
export function renderEpilogueVineSvg(hostEl) {
  hostEl.innerHTML = `
  <svg class="epilogue-vine-svg" viewBox="0 0 1200 1200" preserveAspectRatio="none" aria-hidden="true">
    <path
      id="epilogue-vine-path"
      d="M 600 0
         C 600 140, 210 170, 180 340
         C 150 510, 1020 460, 1000 660
         C 980 860, 240 890, 560 1160"
      fill="none"
      stroke="#E87A90"
      stroke-opacity="0.28"
      stroke-width="2"
      stroke-dasharray="7 7"
      stroke-linecap="round"
    />
  </svg>
  `;
}

function renderPondLilyPad(cx, cy, rx, ry, notchSide = 1, opacity = 0.9) {
  const nX = notchSide * rx * 0.88;
  const nY = -ry * 0.25;
  const nX2 = notchSide * rx * 0.96;
  const nY2 = ry * 0.16;
  const veins = [0, 38, 82, 130, 178, 226, 276, 318]
    .map((deg) => {
      const r = (deg * Math.PI) / 180;
      const vx = (Math.cos(r) * rx * 0.78).toFixed(1);
      const vy = (Math.sin(r) * ry * 0.76).toFixed(1);
      return `<path d="M 0 0 Q ${(vx * 0.5).toFixed(1)} ${(vy * 0.45 - 1.5).toFixed(1)} ${vx} ${vy}" stroke="#59A374" stroke-width="1.2" fill="none" opacity="0.55" stroke-linecap="round"/>`;
    })
    .join("");
  return `
    <g transform="translate(${cx}, ${cy})" opacity="${opacity}">
      <ellipse cx="0" cy="${(ry * 0.42).toFixed(1)}" rx="${(rx * 1.12).toFixed(1)}" ry="${(ry * 0.92).toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.55"/>
      <ellipse cx="0" cy="4" rx="${rx}" ry="${ry}" fill="#539A6C" opacity="0.22"/>
      <path d="M 0 0 L ${nX.toFixed(1)} ${nY.toFixed(1)} A ${rx} ${ry} 0 1 0 ${nX2.toFixed(1)} ${nY2.toFixed(1)} Z" fill="#82C99A"/>
      <path d="M 0 0 L ${(nX * 0.96).toFixed(1)} ${(nY * 0.96).toFixed(1)} A ${(rx * 0.94).toFixed(1)} ${(ry * 0.94).toFixed(1)} 0 1 0 ${(nX2 * 0.96).toFixed(1)} ${(nY2 * 0.96).toFixed(1)} Z" fill="#95D5AA" opacity="0.65"/>
      ${veins}
      <ellipse cx="0" cy="0" rx="5.5" ry="2.2" fill="#D5F2DC"/>
    </g>
  `;
}

function renderCuppedLotusLeaf(stemX, baseY, topX, topY, rx = 46, ry = 18, tiltDeg = -8, scale = 1) {
  const midX = (stemX + topX) * 0.5 + (stemX > topX ? -8 : 8);
  const midY = (baseY + topY) * 0.55;
  return `
    <g>
      <path d="M ${stemX} ${baseY} Q ${midX} ${midY} ${topX} ${topY}" fill="none" stroke="#5FA77A" stroke-width="${(3.8 * scale).toFixed(1)}" stroke-linecap="round"/>
      <g transform="translate(${topX}, ${topY}) rotate(${tiltDeg}) scale(${scale})">
        <path d="M ${-rx} 0 C ${-rx * 0.72} ${ry * 1.45}, ${rx * 0.72} ${ry * 1.45}, ${rx} 0 C ${rx * 0.5} ${ry * 0.75}, ${-rx * 0.5} ${ry * 0.75}, ${-rx} 0 Z" fill="#579F71"/>
        <ellipse cx="0" cy="${-ry * 0.16}" rx="${rx}" ry="${ry}" fill="#85CC9D"/>
        <path d="M ${-rx * 0.95} ${-ry * 0.12} Q ${-rx * 0.45} ${-ry * 1.1} 0 ${-ry * 0.75} Q ${rx * 0.48} ${-ry * 1.12} ${rx * 0.95} ${-ry * 0.12}" fill="none" stroke="#A7DFB9" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M 0 ${ry * 0.1} L ${-rx * 0.65} ${-ry * 0.45} M 0 ${ry * 0.1} L ${-rx * 0.25} ${-ry * 0.68} M 0 ${ry * 0.1} L ${rx * 0.28} ${-ry * 0.66} M 0 ${ry * 0.1} L ${rx * 0.68} ${-ry * 0.42}" stroke="#579F71" stroke-width="1.2" opacity="0.65" stroke-linecap="round"/>
        <circle cx="0" cy="${ry * 0.1}" r="3.4" fill="#D5F2DC"/>
      </g>
    </g>
  `;
}

function renderBotanicalLotusBud(stemX, baseY, tipX, tipY, scale = 1, tiltDeg = 0) {
  const cX = (stemX + tipX) * 0.5 + (tipX - stemX) * 0.25;
  const cY = (baseY + tipY) * 0.55;
  return `
    <g>
      <path d="M ${stemX} ${baseY} Q ${cX} ${cY} ${tipX} ${tipY}" fill="none" stroke="#5FA77A" stroke-width="${(3.4 * scale).toFixed(1)}" stroke-linecap="round"/>
      <g transform="translate(${tipX}, ${tipY}) rotate(${tiltDeg}) scale(${scale})">
        <!-- Đài sen xanh non ôm sát gốc búp -->
        <path d="M 0 2 C -12 0, -15 -14, -7 -24 C -2 -16, -2 -6, 0 2 Z" fill="#77B88A"/>
        <path d="M 0 2 C 12 0, 15 -14, 7 -24 C 2 -16, 2 -6, 0 2 Z" fill="#68AA7C"/>
        <!-- Lớp cánh ngoài hồng dịu -->
        <path d="M 0 0 C -17 -6, -18 -30, 0 -42 C 18 -30, 17 -6, 0 0 Z" fill="#F6B8C6"/>
        <!-- Hai cánh bên hé ôm -->
        <path d="M -2 -1 C -15 -10, -12 -32, 0 -46 C -4 -26, -3 -10, -2 -1 Z" fill="#F08EA4"/>
        <path d="M 2 -1 C 15 -10, 12 -32, 0 -46 C 4 -26, 3 -10, 2 -1 Z" fill="#E87A90"/>
        <!-- Đỉnh búp sen chúm chím -->
        <path d="M 0 -2 C -9 -14, -7 -36, 0 -50 C 7 -36, 9 -14, 0 -2 Z" fill="#F9D5DF"/>
        <path d="M 0 -5 C -5 -16, -4 -35, 0 -49 C 4 -35, 5 -16, 0 -5 Z" fill="#E87A90" opacity="0.72"/>
      </g>
    </g>
  `;
}

function renderBotanicalLotusFlower(stemX, baseY, cx, cy, scale = 1, tiltDeg = 0) {
  const cX = (stemX + cx) * 0.5;
  const cY = (baseY + cy) * 0.56;
  return `
    <g>
      <path d="M ${stemX} ${baseY} Q ${cX} ${cY} ${cx} ${cy + 6}" fill="none" stroke="#5FA77A" stroke-width="${(3.8 * scale).toFixed(1)}" stroke-linecap="round"/>
      <g transform="translate(${cx}, ${cy}) rotate(${tiltDeg}) scale(${scale})">
        <!-- Đài xanh đáy hoa -->
        <path d="M -14 4 Q 0 12 14 4 Q 0 2 -14 4 Z" fill="#6FB384"/>
        <!-- Cánh ngoài xòe rộng -->
        <path d="M -4 4 C -30 4, -38 -14, -28 -26 C -16 -18, -8 -6, -4 4 Z" fill="#F7C2CF"/>
        <path d="M 4 4 C 30 4, 38 -14, 28 -26 C 16 -18, 8 -6, 4 4 Z" fill="#F29FB1"/>
        <!-- Lớp cánh giữa -->
        <path d="M -2 4 C -22 -2, -24 -28, -12 -38 C -4 -24, -2 -8, -2 4 Z" fill="#EE879E"/>
        <path d="M 2 4 C 22 -2, 24 -28, 12 -38 C 4 -24, 2 -8, 2 4 Z" fill="#E26D87"/>
        <!-- Gương nhụy sen vàng rực rỡ bên trong -->
        <ellipse cx="0" cy="-18" rx="9.5" ry="5.5" fill="#F4C96B"/>
        <circle cx="-4" cy="-18" r="1.2" fill="#C98C2B"/>
        <circle cx="0" cy="-19" r="1.2" fill="#C98C2B"/>
        <circle cx="4" cy="-18" r="1.2" fill="#C98C2B"/>
        <!-- Cánh trung tâm trước -->
        <path d="M 0 5 C -11 -4, -10 -28, 0 -42 C 10 -28, 11 -4, 0 5 Z" fill="#F8D2DC"/>
        <path d="M 0 3 C -7 -6, -6 -25, 0 -38 C 6 -25, 7 -6, 0 3 Z" fill="#EA7B93" opacity="0.78"/>
      </g>
    </g>
  `;
}

/**
 * Họa tiết Đầm Hoa Sen chân thực cho Cảnh 10 (Đội ngũ Giáo viên)
 */
export function renderLotusGardenDecor(backHost, frontHost) {
  backHost.innerHTML = `
  <svg viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <!-- Mặt nước đầm sen dịu mát hai bên -->
    <ellipse cx="185" cy="212" rx="195" ry="34" fill="#CBE7D8" opacity="0.55"/>
    <ellipse cx="1015" cy="212" rx="195" ry="34" fill="#CBE7D8" opacity="0.55"/>
    <path d="M 60 226 Q 170 214 295 228" fill="none" stroke="#FFFDF9" stroke-width="2" opacity="0.65" stroke-linecap="round"/>
    <path d="M 905 228 Q 1030 214 1140 226" fill="none" stroke="#FFFDF9" stroke-width="2" opacity="0.65" stroke-linecap="round"/>

    <!-- Cụm đầm sen bên TRÁI: lá sen xòe, lá vươn cao, búp sen & hoa sen hé nở -->
    ${renderPondLilyPad(136, 206, 62, 17, 1, 0.92)}
    ${renderPondLilyPad(248, 220, 44, 13, -1, 0.85)}
    ${renderCuppedLotusLeaf(102, 214, 72, 108, 48, 17, -9, 1)}
    ${renderCuppedLotusLeaf(224, 218, 250, 140, 38, 14, 7, 0.86)}
    ${renderBotanicalLotusFlower(168, 214, 154, 128, 0.95, -5)}
    ${renderBotanicalLotusBud(204, 218, 212, 142, 0.9, 9)}
    ${renderBotanicalLotusBud(120, 210, 108, 152, 0.72, -12)}

    <!-- Cụm đầm sen bên PHẢI: lá sen xòe, lá vươn cao, búp sen & hoa sen hé nở -->
    ${renderPondLilyPad(1064, 206, 62, 17, -1, 0.92)}
    ${renderPondLilyPad(952, 220, 44, 13, 1, 0.85)}
    ${renderCuppedLotusLeaf(1098, 214, 1128, 108, 48, 17, 9, 1)}
    ${renderCuppedLotusLeaf(976, 218, 950, 140, 38, 14, -7, 0.86)}
    ${renderBotanicalLotusFlower(1032, 214, 1046, 128, 0.95, 5)}
    ${renderBotanicalLotusBud(996, 218, 988, 142, 0.9, -9)}
    ${renderBotanicalLotusBud(1080, 210, 1092, 152, 0.72, 12)}
  </svg>
  `;

  frontHost.innerHTML = `
  <svg viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <ellipse cx="600" cy="108" rx="460" ry="18" fill="#BCE1CE" opacity="0.28"/>
    ${renderPondLilyPad(306, 94, 48, 12, 1, 0.55)}
    ${renderPondLilyPad(894, 94, 48, 12, -1, 0.55)}
  </svg>
  `;
}

function renderPostcardCementFence(startX, count, topY, height = 56, pitch = 22) {
  const palette = ["#F4C96B", "#E87A90", "#389FAD", "#A68AD9", "#52A877"];
  const endX = startX + count * pitch;
  let posts = `<rect x="${startX - 4}" y="${topY + 34}" width="${endX - startX + 8}" height="22" rx="6" fill="#EAE1D6"/>`;
  for (let i = 0; i < count; i++) {
    const x = startX + i * pitch;
    posts += `<rect x="${x}" y="${topY}" width="16" height="${height}" rx="8" fill="${palette[i % palette.length]}"/>`;
  }
  return posts;
}

/**
 * Tranh minh họa Cổng Hoa Sen thu nhỏ trong nắng chiều ấm (dùng logo thật & hàng rào xi măng sơn màu)
 */
export function renderMiniSunsetGateSvg(hostEl) {
  hostEl.innerHTML = `
  <svg viewBox="0 0 420 340" width="100%" role="img" aria-label="Cổng Hoa Sen trong nắng chiều ấm áp">
    <defs>
      <linearGradient id="sunsetGateSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCE4CC"/>
        <stop offset="100%" stop-color="#F7EFE4"/>
      </linearGradient>
      <clipPath id="miniLogoClip">
        <circle cx="148" cy="105" r="17"/>
      </clipPath>
    </defs>
    <circle cx="210" cy="166" r="154" fill="url(#sunsetGateSky)"/>
    <circle cx="305" cy="88" r="34" fill="#F8CE78" opacity="0.85"/>
    <path d="M 35 235 Q 115 170 215 215 T 385 220 L 385 275 L 35 275 Z" fill="#C4DFC7"/>
    <ellipse cx="210" cy="272" rx="166" ry="24" fill="#E8D2BB"/>

    ${renderPostcardCementFence(46, 3, 210, 56, 22)}
    ${renderPostcardCementFence(304, 3, 210, 56, 22)}

    <rect x="122" y="138" width="28" height="128" rx="10" fill="#389FAD"/>
    <rect x="118" y="130" width="36" height="12" rx="6" fill="#FFFDF9"/>
    <rect x="270" y="138" width="28" height="128" rx="10" fill="#389FAD"/>
    <rect x="266" y="130" width="36" height="12" rx="6" fill="#FFFDF9"/>

    <g fill="#48B8D9">
      <rect x="155" y="158" width="7" height="106" rx="3.5"/>
      <rect x="169" y="158" width="7" height="106" rx="3.5"/>
      <rect x="183" y="158" width="7" height="106" rx="3.5"/>
      <rect x="229" y="158" width="7" height="106" rx="3.5"/>
      <rect x="243" y="158" width="7" height="106" rx="3.5"/>
      <rect x="257" y="158" width="7" height="106" rx="3.5"/>
    </g>
    <rect x="152" y="226" width="42" height="38" rx="8" fill="none" stroke="#E87A90" stroke-width="4"/>
    <rect x="226" y="226" width="42" height="38" rx="8" fill="none" stroke="#E87A90" stroke-width="4"/>

    <rect x="112" y="76" width="196" height="56" rx="14" fill="#FFFDF9"/>
    <image href="assets/images/logo-hoa-sen.png" x="131" y="88" width="34" height="34" clip-path="url(#miniLogoClip)"/>
    <text x="232" y="96" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="9" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
    <text x="232" y="119" text-anchor="middle" font-family="Fraunces, serif" font-size="21" font-weight="700" fill="#E87A90">HOA SEN</text>

    <line x1="130" y1="130" x2="112" y2="74" stroke="#8E867E" stroke-width="3" stroke-linecap="round"/>
    <path d="M 112 74 Q 90 68 72 76 L 78 102 Q 96 96 118 102 Z" fill="#D9383A"/>
    <polygon points="94,81 96,87 102,87 97,91 99,97 94,93 89,97 91,91 86,87 92,87" fill="#FFE15A"/>

    <g transform="translate(88, 266)">
      <ellipse cx="0" cy="6" rx="26" ry="7" fill="#52A877"/>
      <path d="M 0 4 C -14 0 -22 -10 -22 -22 C -12 -18 -5 -8 0 4 Z" fill="#F29FB1"/>
      <path d="M 0 4 C 14 0 22 -10 22 -22 C 12 -18 5 -8 0 4 Z" fill="#F29FB1"/>
      <path d="M 0 -26 C -6 -14 -6 -4 0 4 C 6 -4 6 -14 0 -26 Z" fill="#E87A90"/>
    </g>
  </svg>
  `;
}

/**
 * Tạo chân dung SVG 2D hoạt hình bo tròn dịu dàng cho từng cô giáo
 */
export function createTeacherFallbackDataUri(teacher) {
  const p = teacher.avatarPalette || {
    hair: "#3B2F2F",
    skin: "#FCE0CD",
    dress: "#F4A3B4",
    collar: "#FFFDF9",
    hairStyle: "long",
  };

  let hairBack = `<path d="M 76 110 C 76 58 184 58 184 110 L 188 182 C 165 190 95 190 72 182 Z" fill="${p.hair}"/>`;
  if (p.hairStyle === "bun") {
    hairBack = `
      <circle cx="130" cy="54" r="24" fill="${p.hair}"/>
      <path d="M 80 112 C 80 62 180 62 180 112 L 176 150 C 155 158 105 158 84 150 Z" fill="${p.hair}"/>
    `;
  } else if (p.hairStyle === "bob") {
    hairBack = `<path d="M 74 110 C 74 58 186 58 186 110 L 184 158 C 162 164 98 164 76 158 Z" fill="${p.hair}"/>`;
  }

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 280">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFF7F2"/>
        <stop offset="100%" stop-color="#FBE8EB"/>
      </linearGradient>
    </defs>
    <rect width="260" height="280" fill="url(#bg)"/>
    <circle cx="130" cy="108" r="64" fill="#FFFDF9" opacity="0.72"/>
    ${hairBack}
    <path d="M 48 280 C 52 206 90 184 130 184 C 170 184 208 206 212 280 Z" fill="${p.dress}"/>
    <path d="M 105 186 L 130 212 L 155 186 Z" fill="${p.collar}"/>
    <rect x="116" y="150" width="28" height="40" rx="14" fill="${p.skin}"/>
    <ellipse cx="130" cy="116" rx="44" ry="50" fill="${p.skin}"/>
    <path d="M 86 102 C 92 64 168 64 174 102 C 154 88 124 84 86 102 Z" fill="${p.hair}"/>
    <circle cx="112" cy="118" r="4.2" fill="#2C2A29"/>
    <circle cx="148" cy="118" r="4.2" fill="#2C2A29"/>
    <ellipse cx="102" cy="129" rx="8.5" ry="4.8" fill="#F29FB1" opacity="0.6"/>
    <ellipse cx="158" cy="129" rx="8.5" ry="4.8" fill="#F29FB1" opacity="0.6"/>
    <path d="M 118 136 Q 130 147 142 136" fill="none" stroke="#C45368" stroke-width="3.6" stroke-linecap="round"/>
    <circle cx="164" cy="82" r="7" fill="#E87A90"/>
    <circle cx="171" cy="88" r="6" fill="#F7D1DA"/>
    <circle cx="165" cy="86" r="3" fill="#F4C96B"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
