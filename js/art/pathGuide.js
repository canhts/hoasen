/**
 * ============================================================================
 * ĐƯỜNG NÉT NGHỆ THUẬT, CÁNH HOA SEN DẪN CHUYỆN & CHÂN DUNG CÔ GIÁO
 * ============================================================================
 */

import { renderCementColorFence } from "./scenes.js";

/**
 * Đường dẫn chuyện xuyên suốt khuôn viên theo thứ tự mới:
 * Cổng -> Văn phòng (Camera 24/7) -> Kho -> Thực đơn -> Bếp
 * -> Chuyển thẳng sang Sân chơi chính -> Nhà trẻ -> Mẫu giáo bé -> Cầu thang -> Lầu 2 -> Khoảnh khắc
 */
export function renderCampusGuideSvg(hostEl) {
  hostEl.innerHTML = `
  <svg
    id="guide-svg"
    class="guide-svg"
    viewBox="0 0 3200 1850"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <filter id="petalGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#E87A90" flood-opacity="0.35"/>
      </filter>
    </defs>

    <path
      id="campus-story-path-bg"
      d="M 2130 1630
         C 2145 1575, 2400 1575, 2650 1570
         C 2880 1565, 3060 1565, 3060 1592
         C 3060 1618, 1460 1618, 450 1582
         C 360 1578, 720 1582, 1110 1582
         C 1420 1582, 1690 1582, 1980 1578
         C 2240 1575, 2370 1545, 2405 1475
         C 2450 1370, 2445 1130, 2395 1015
         C 2345 900, 2215 760, 2245 705
         C 2280 655, 2640 704, 2860 704
         C 2950 704, 2600 714, 2140 714
         C 1780 714, 1500 714, 1280 714
         C 1040 714, 960 900, 1020 1180
         C 1085 1470, 1380 1690, 1600 1850"
      fill="none"
      stroke="#E87A90"
      stroke-opacity="0.18"
      stroke-width="3"
      stroke-dasharray="9 9"
      stroke-linecap="round"
    />

    <path
      id="campus-story-path"
      d="M 2130 1630
         C 2145 1575, 2400 1575, 2650 1570
         C 2880 1565, 3060 1565, 3060 1592
         C 3060 1618, 1460 1618, 450 1582
         C 360 1578, 720 1582, 1110 1582
         C 1420 1582, 1690 1582, 1980 1578
         C 2240 1575, 2370 1545, 2405 1475
         C 2450 1370, 2445 1130, 2395 1015
         C 2345 900, 2215 760, 2245 705
         C 2280 655, 2640 704, 2860 704
         C 2950 704, 2600 714, 2140 714
         C 1780 714, 1500 714, 1280 714
         C 1040 714, 960 900, 1020 1180
         C 1085 1470, 1380 1690, 1600 1850"
      fill="none"
      stroke="#E87A90"
      stroke-opacity="0.72"
      stroke-width="3.2"
      stroke-linecap="round"
    />

    <g id="floating-lotus-lead" filter="url(#petalGlow)" transform="translate(2130, 1630)">
      <path d="M 0 -16 C -11 -4 -10 10 0 16 C 10 10 11 -4 0 -16 Z" fill="#E87A90"/>
      <path d="M 0 -10 C -5 -2 -5 6 0 11 C 5 6 5 -2 0 -10 Z" fill="#F9DCE4"/>
    </g>

    <g id="floating-petal-a" opacity="0.85" transform="translate(1110, 1360)">
      <path d="M 0 -10 C -7 -2 -6 7 0 10 C 6 7 7 -2 0 -10 Z" fill="#F29FB1"/>
    </g>
    <g id="floating-petal-b" opacity="0.8" transform="translate(2420, 960)">
      <path d="M 0 -9 C -6 -2 -5 6 0 9 C 5 6 6 -2 0 -9 Z" fill="#E87A90"/>
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
      stroke-opacity="0.32"
      stroke-width="3"
      stroke-dasharray="9 9"
      stroke-linecap="round"
    />
    <path d="M 215 280 C 206 290 207 302 216 307 C 225 302 226 290 215 280 Z" fill="#F29FB1" opacity="0.72"/>
    <path d="M 960 620 C 950 631 951 644 961 650 C 971 644 972 631 960 620 Z" fill="#E87A90" opacity="0.68"/>
  </svg>
  `;
}

/**
 * Họa tiết Vườn Hoa Sen nền cho Cảnh 9 (Đội ngũ Giáo viên)
 */
export function renderLotusGardenDecor(backHost, frontHost) {
  backHost.innerHTML = `
  <svg viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
    <path d="M -20 145 Q 220 75 480 120 T 960 95 T 1220 135 L 1220 160 L -20 160 Z" fill="#E8F4EC" opacity="0.7"/>
    <ellipse cx="145" cy="136" rx="68" ry="16" fill="#A6D9B8" opacity="0.62"/>
    <ellipse cx="1055" cy="130" rx="74" ry="18" fill="#A6D9B8" opacity="0.58"/>
    <path d="M 160 130 C 148 109 150 92 162 82 C 174 92 176 109 160 130 Z" fill="#F7C7D2"/>
    <path d="M 1030 124 C 1018 104 1020 86 1032 76 C 1044 86 1046 104 1030 124 Z" fill="#F7C7D2"/>
  </svg>
  `;

  frontHost.innerHTML = `
  <svg viewBox="0 0 1200 95" preserveAspectRatio="none" aria-hidden="true">
    <ellipse cx="195" cy="68" rx="85" ry="18" fill="#77C696" opacity="0.34"/>
    <ellipse cx="995" cy="64" rx="92" ry="20" fill="#77C696" opacity="0.32"/>
  </svg>
  `;
}

/**
 * Tranh minh họa Cổng Hoa Sen thu nhỏ trong nắng chiều ấm (dùng logo ảnh đính kèm & hàng rào xi măng sơn màu)
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

    <!-- Hàng rào xi măng sơn màu bo tròn -->
    ${renderCementColorFence(46, 3, 210, 56, 22)}
    ${renderCementColorFence(304, 3, 210, 56, 22)}

    <!-- Hai trụ cổng xanh ngọc bo tròn -->
    <rect x="122" y="138" width="28" height="128" rx="10" fill="#389FAD"/>
    <rect x="118" y="130" width="36" height="12" rx="6" fill="#FFFDF9"/>
    <rect x="270" y="138" width="28" height="128" rx="10" fill="#389FAD"/>
    <rect x="266" y="130" width="36" height="12" rx="6" fill="#FFFDF9"/>

    <!-- Cánh cổng bo tròn mở nhẹ sang hai bên -->
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

    <!-- Biển hiệu Hoa Sen kèm logo thật -->
    <rect x="112" y="76" width="196" height="56" rx="14" fill="#FFFDF9"/>
    <image href="assets/images/logo-hoa-sen.png" x="131" y="88" width="34" height="34" clip-path="url(#miniLogoClip)"/>
    <text x="232" y="96" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="9" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
    <text x="232" y="119" text-anchor="middle" font-family="Fraunces, serif" font-size="21" font-weight="700" fill="#E87A90">HOA SEN</text>

    <!-- Lá cờ đỏ sao vàng -->
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
