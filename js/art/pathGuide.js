/**
 * ============================================================================
 * ĐƯỜNG NÉT NGHỆ THUẬT & CÁNH HOA SEN DẪN CHUYỆN LIÊN TỤC (PATH GUIDE)
 * ============================================================================
 * Kết nối dòng chảy không đứt gãy từ Cổng trường → Tầng trệt → Cầu thang →
 * Lầu 2 → Dây cờ ảnh → Vườn cô giáo → Bưu thiếp liên hệ.
 */

import { renderPastelPicketFence } from "./scenes.js";

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

    <!-- Đường nét mảnh uyển chuyển dẫn chuyện xuyên suốt khuôn viên (đi theo lối hiên, thảm cỏ & bậc thang) -->
    <path
      id="campus-story-path-bg"
      d="M 2130 1630
         C 2145 1575, 2440 1575, 2660 1565
         C 2760 1560, 2640 1588, 2320 1588
         C 1980 1588, 1840 1588, 1695 1586
         C 1480 1584, 1300 1586, 1115 1584
         C 890 1582, 620 1584, 450 1578
         C 370 1575, 880 1605, 1480 1605
         C 2020 1605, 2350 1580, 2405 1485
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
         C 2145 1575, 2440 1575, 2660 1565
         C 2760 1560, 2640 1588, 2320 1588
         C 1980 1588, 1840 1588, 1695 1586
         C 1480 1584, 1300 1586, 1115 1584
         C 890 1582, 620 1584, 450 1578
         C 370 1575, 880 1605, 1480 1605
         C 2020 1605, 2350 1580, 2405 1485
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

    <!-- Cánh hoa sen nhỏ dẫn đường trôi dọc đường nét -->
    <g id="floating-lotus-lead" filter="url(#petalGlow)" transform="translate(2130, 1640)">
      <path d="M 0 -16 C -11 -4 -10 10 0 16 C 10 10 11 -4 0 -16 Z" fill="#E87A90"/>
      <path d="M 0 -10 C -5 -2 -5 6 0 11 C 5 6 5 -2 0 -10 Z" fill="#F9DCE4"/>
    </g>

    <!-- Hai cánh hoa nhỏ bay phụ họa -->
    <g id="floating-petal-a" opacity="0.85" transform="translate(1700, 1360)">
      <path d="M 0 -10 C -7 -2 -6 7 0 10 C 6 7 7 -2 0 -10 Z" fill="#F29FB1"/>
    </g>
    <g id="floating-petal-b" opacity="0.8" transform="translate(2420, 960)">
      <path d="M 0 -9 C -6 -2 -5 6 0 9 C 5 6 6 -2 0 -9 Z" fill="#E87A90"/>
    </g>
  </svg>
  `;
}

/**
 * Đường dẫn chuyện liên tục cho Chặng 8 (nối thẳng từ sân khấu xuống dây ảnh, vườn cô giáo & bưu thiếp)
 */
export function renderEpilogueVineSvg(hostEl) {
  hostEl.innerHTML = `
  <svg class="epilogue-vine-svg" viewBox="0 0 1200 1800" preserveAspectRatio="none" aria-hidden="true">
    <path
      id="epilogue-vine-path"
      d="M 600 0
         C 600 140, 210 150, 160 320
         C 110 490, 1020 430, 1010 660
         C 1000 890, 220 880, 210 1120
         C 200 1360, 860 1340, 620 1680"
      fill="none"
      stroke="#E87A90"
      stroke-opacity="0.35"
      stroke-width="3.2"
      stroke-dasharray="10 9"
      stroke-linecap="round"
    />
    <!-- Những cánh hoa sen rơi nhẹ dọc đường nối -->
    <path d="M 215 270 C 206 280 207 292 216 297 C 225 292 226 280 215 270 Z" fill="#F29FB1" opacity="0.75"/>
    <path d="M 960 620 C 950 631 951 644 961 650 C 971 644 972 631 960 620 Z" fill="#E87A90" opacity="0.7"/>
    <path d="M 250 1070 C 240 1080 241 1093 251 1098 C 261 1093 262 1080 250 1070 Z" fill="#F29FB1" opacity="0.75"/>
  </svg>
  `;
}

/**
 * Họa tiết Vườn Hoa Sen nền cho mục Đội ngũ Cô giáo
 */
export function renderLotusGardenDecor(backHost, frontHost) {
  backHost.innerHTML = `
  <svg viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
    <path d="M -20 190 Q 220 90 480 155 T 960 125 T 1220 175 L 1220 220 L -20 220 Z" fill="#EAF4ED" opacity="0.65"/>
    <!-- Lá sen nền dịu -->
    <ellipse cx="140" cy="175" rx="68" ry="18" fill="#A6D9B8" opacity="0.6"/>
    <ellipse cx="1050" cy="168" rx="74" ry="20" fill="#A6D9B8" opacity="0.55"/>
    <!-- Búp sen nhỏ nền -->
    <path d="M 160 168 C 148 145 150 125 162 115 C 174 125 176 145 160 168 Z" fill="#F7C7D2"/>
    <path d="M 1030 162 C 1018 139 1020 119 1032 109 C 1044 119 1046 139 1030 162 Z" fill="#F7C7D2"/>
  </svg>
  `;

  frontHost.innerHTML = `
  <svg viewBox="0 0 1200 130" preserveAspectRatio="none" aria-hidden="true">
    <ellipse cx="190" cy="96" rx="85" ry="20" fill="#77C696" opacity="0.38"/>
    <ellipse cx="990" cy="94" rx="92" ry="22" fill="#77C696" opacity="0.35"/>
    <path d="M 80 115 Q 600 68 1120 115" fill="none" stroke="#389FAD" stroke-opacity="0.18" stroke-width="2.5" stroke-dasharray="12 10"/>
  </svg>
  `;
}

/**
 * Tranh minh họa Cổng Hoa Sen thu nhỏ trong ánh nắng chiều ấm (bên cạnh Bưu thiếp liên hệ)
 */
export function renderMiniSunsetGateSvg(hostEl) {
  hostEl.innerHTML = `
  <svg viewBox="0 0 420 340" width="100%" role="img" aria-label="Cổng Hoa Sen trong nắng chiều ấm áp">
    <defs>
      <linearGradient id="sunsetGateSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FCE4CC"/>
        <stop offset="100%" stop-color="#F7EFE4"/>
      </linearGradient>
    </defs>
    <!-- Nền nắng chiều dịu ấm bo hữu cơ -->
    <circle cx="210" cy="166" r="152" fill="url(#sunsetGateSky)"/>
    <circle cx="305" cy="88" r="34" fill="#F8CE78" opacity="0.85"/>
    <!-- Đồi cây mềm -->
    <path d="M 35 235 Q 115 170 215 215 T 385 220 L 385 275 L 35 275 Z" fill="#C4DFC7"/>
    <!-- Mặt sân nắng chiều -->
    <ellipse cx="210" cy="272" rx="166" ry="24" fill="#E8D2BB"/>

    <!-- Hàng rào nan gỗ pastel hai bên -->
    ${renderPastelPicketFence(46, 4, 210, 56, 17)}
    ${renderPastelPicketFence(304, 4, 210, 56, 17)}

    <!-- Hai trụ cổng xanh ngọc -->
    <rect x="122" y="138" width="28" height="128" rx="4" fill="#389FAD"/>
    <rect x="118" y="130" width="36" height="11" rx="4" fill="#FFFDF9"/>
    <rect x="270" y="138" width="28" height="128" rx="4" fill="#389FAD"/>
    <rect x="266" y="130" width="36" height="11" rx="4" fill="#FFFDF9"/>

    <!-- Cánh cổng sắt xanh dương viền hồng hé mở thân thương -->
    <g fill="#48B8D9">
      <rect x="155" y="158" width="6" height="106" rx="2"/>
      <rect x="169" y="158" width="6" height="106" rx="2"/>
      <rect x="183" y="158" width="6" height="106" rx="2"/>
      <rect x="197" y="158" width="6" height="106" rx="2"/>
      <rect x="217" y="158" width="6" height="106" rx="2"/>
      <rect x="231" y="158" width="6" height="106" rx="2"/>
      <rect x="245" y="158" width="6" height="106" rx="2"/>
      <rect x="259" y="158" width="6" height="106" rx="2"/>
    </g>
    <rect x="152" y="226" width="54" height="38" rx="2" fill="none" stroke="#E87A90" stroke-width="4"/>
    <rect x="214" y="226" width="54" height="38" rx="2" fill="none" stroke="#E87A90" stroke-width="4"/>

    <!-- Biển hiệu Hoa Sen thu nhỏ -->
    <rect x="112" y="76" width="196" height="54" rx="8" fill="#FFFDF9" stroke="#E87A90" stroke-width="2.5"/>
    <text x="210" y="96" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="9.5" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
    <text x="210" y="119" text-anchor="middle" font-family="Fraunces, serif" font-size="22" font-weight="700" fill="#E87A90">HOA SEN</text>

    <!-- Lá cờ đỏ sao vàng nhỏ trên trụ trái -->
    <line x1="130" y1="130" x2="112" y2="74" stroke="#8E867E" stroke-width="3"/>
    <path d="M 112 74 Q 90 68 72 76 L 78 102 Q 96 96 118 102 Z" fill="#D9383A"/>
    <polygon points="94,81 96,87 102,87 97,91 99,97 94,93 89,97 91,91 86,87 92,87" fill="#FFE15A"/>

    <!-- Đóa sen nở dịu bên góc cổng -->
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
 * Tạo chân dung SVG 2D minh họa dịu dàng làm fallback nếu chưa có ảnh thật của cô giáo
 */
export function createTeacherFallbackDataUri(teacher) {
  const p = teacher.avatarPalette || {
    hair: "#3B2F2F",
    skin: "#FCE0CD",
    dress: "#F4A3B4",
    collar: "#FFFDF9",
  };
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 280">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFF7F2"/>
        <stop offset="100%" stop-color="#FBE8EB"/>
      </linearGradient>
    </defs>
    <rect width="260" height="280" fill="url(#bg)"/>
    <circle cx="130" cy="108" r="64" fill="#FFFDF9" opacity="0.7"/>
    <!-- Tóc dài dịu dàng -->
    <path d="M 76 110 C 76 58 184 58 184 110 L 188 182 C 165 190 95 190 72 182 Z" fill="${p.hair}"/>
    <!-- Áo dài / đồng phục cô giáo -->
    <path d="M 48 280 C 52 206 90 184 130 184 C 170 184 208 206 212 280 Z" fill="${p.dress}"/>
    <path d="M 105 186 L 130 212 L 155 186 Z" fill="${p.collar}"/>
    <!-- Cổ & khuôn mặt ấm áp -->
    <rect x="116" y="150" width="28" height="40" rx="12" fill="${p.skin}"/>
    <ellipse cx="130" cy="116" rx="44" ry="50" fill="${p.skin}"/>
    <!-- Tóc mái mềm -->
    <path d="M 86 102 C 92 64 168 64 174 102 C 154 88 124 84 86 102 Z" fill="${p.hair}"/>
    <!-- Đôi mắt hiền & má hồng & nụ cười -->
    <circle cx="112" cy="118" r="4" fill="#2C2A29"/>
    <circle cx="148" cy="118" r="4" fill="#2C2A29"/>
    <ellipse cx="102" cy="129" rx="8" ry="4.5" fill="#F29FB1" opacity="0.6"/>
    <ellipse cx="158" cy="129" rx="8" ry="4.5" fill="#F29FB1" opacity="0.6"/>
    <path d="M 118 136 Q 130 147 142 136" fill="none" stroke="#C45368" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Bông sen cài tóc xinh -->
    <circle cx="164" cy="82" r="7" fill="#E87A90"/>
    <circle cx="171" cy="88" r="6" fill="#F7D1DA"/>
    <circle cx="165" cy="86" r="3" fill="#F4C96B"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
