/**
 * ============================================================================
 * BỘ MODULE VẼ TRANH SVG 2D HOẠT HÌNH BO TRÒN MỀM MẠI (2.5D LAYERED SVG)
 * Phong cách: Soft Editorial Cartoon (góc bo tròn, đường cong thân thiện)
 * ============================================================================
 */

/**
 * Chuỗi hoa treo trần nhiều màu bo tròn mềm mại
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
          <circle cx="0" cy="-7" r="5.2" fill="${col}"/>
          <circle cx="6.7" cy="-2.2" r="5.2" fill="${col}"/>
          <circle cx="4.1" cy="5.7" r="5.2" fill="${col}"/>
          <circle cx="-4.1" cy="5.7" r="5.2" fill="${col}"/>
          <circle cx="-6.7" cy="-2.2" r="5.2" fill="${col}"/>
          <circle cx="0" cy="0" r="3.6" fill="#FFFDF9"/>
        </g>
      </g>`;
  }
  return `<g class="flower-garland">${items}</g>`;
}

/**
 * Dây cờ trang trí bo tròn đầu mềm mại (hạn chế góc nhọn)
 */
function renderSoftBuntingFlags(startX, endX, y, sagDepth = 18, count = 16) {
  const colors = ["#E87A90", "#F4C96B", "#389FAD", "#52A877", "#F28B72", "#9D8BE2"];
  const midX = (startX + endX) / 2;
  let flags = `<path d="M ${startX} ${y} Q ${midX} ${y + sagDepth * 1.35} ${endX} ${y}" fill="none" stroke="#9B8E85" stroke-width="2.2" stroke-linecap="round"/>`;
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const x = startX + (endX - startX) * t;
    const curveY = y + Math.sin(t * Math.PI) * sagDepth * 0.72;
    const col = colors[i % colors.length];
    flags += `
      <path class="anim-bunting-flag"
        d="M ${x - 11} ${curveY} L ${x + 11} ${curveY} Q ${x + 8} ${curveY + 23} ${x} ${curveY + 25} Q ${x - 8} ${curveY + 23} ${x - 11} ${curveY} Z"
        fill="${col}" style="transform-origin:${x}px ${curveY}px;"/>`;
  }
  return `<g class="bunting-flags">${flags}</g>`;
}

/**
 * Hàng rào xi măng được sơn màu tươi sáng (trụ xi măng bo đầu tròn, không viền sắc)
 */
export function renderCementColorFence(startX, count, topY, height = 132, pitch = 28) {
  const palette = ["#F4C96B", "#E87A90", "#389FAD", "#A68AD9", "#52A877", "#F39278", "#5FB8D9"];
  const endX = startX + count * pitch;
  let posts = `
    <!-- Thanh giằng xi măng ngang -->
    <rect x="${startX - 6}" y="${topY + 28}" width="${endX - startX + 12}" height="15" rx="7.5" fill="#F2ECE4"/>
    <rect x="${startX - 6}" y="${topY + 78}" width="${endX - startX + 12}" height="15" rx="7.5" fill="#EAE1D6"/>
  `;
  for (let i = 0; i < count; i++) {
    const x = startX + i * pitch;
    const c = palette[i % palette.length];
    posts += `
      <rect x="${x}" y="${topY}" width="21" height="${height}" rx="10.5" fill="${c}"/>
      <rect x="${x + 4}" y="${topY + 10}" width="5" height="${height - 20}" rx="2.5" fill="#FFFFFF" opacity="0.28"/>
    `;
  }
  return `<g class="cement-color-fence">${posts}</g>`;
}

/**
 * Bộ bàn ghế nhựa bo tròn mềm nhiều màu dọc Hiên chính
 */
function renderMiniVerandaTableSet(cx, baseY, tableColor, chairLeftColor, chairRightColor) {
  return `
    <g class="veranda-tableset" filter="url(#softShadow)">
      <rect x="${cx - 56}" y="${baseY - 40}" width="24" height="20" rx="9" fill="${chairLeftColor}"/>
      <rect x="${cx - 57}" y="${baseY - 22}" width="26" height="8" rx="4" fill="${chairLeftColor}"/>
      <rect x="${cx - 53}" y="${baseY - 15}" width="6" height="15" rx="3" fill="${chairLeftColor}"/>
      <rect x="${cx - 39}" y="${baseY - 15}" width="6" height="15" rx="3" fill="${chairLeftColor}"/>

      <rect x="${cx + 32}" y="${baseY - 40}" width="24" height="20" rx="9" fill="${chairRightColor}"/>
      <rect x="${cx + 31}" y="${baseY - 22}" width="26" height="8" rx="4" fill="${chairRightColor}"/>
      <rect x="${cx + 33}" y="${baseY - 15}" width="6" height="15" rx="3" fill="${chairRightColor}"/>
      <rect x="${cx + 47}" y="${baseY - 15}" width="6" height="15" rx="3" fill="${chairRightColor}"/>

      <rect x="${cx - 28}" y="${baseY - 32}" width="56" height="11" rx="5.5" fill="${tableColor}"/>
      <rect x="${cx - 20}" y="${baseY - 22}" width="8" height="22" rx="4" fill="${tableColor}" opacity="0.9"/>
      <rect x="${cx + 12}" y="${baseY - 22}" width="8" height="22" rx="4" fill="${tableColor}" opacity="0.9"/>
      <rect x="${cx - 8}" y="${baseY - 40}" width="16" height="8" rx="4" fill="#FFFDF9"/>
      <circle cx="${cx + 12}" cy="${baseY - 36}" r="4.5" fill="#E87A90"/>
    </g>
  `;
}

/**
 * Cột tròn màu hồng phấn mềm mại đặc trưng
 */
function renderPinkColumn(x, topY, height, width = 26) {
  return `
    <g class="pink-column" filter="url(#softShadow)">
      <rect x="${x - 5}" y="${topY}" width="${width + 10}" height="14" rx="7" fill="#F9DCE4"/>
      <rect x="${x}" y="${topY + 12}" width="${width}" height="${height - 26}" rx="8" fill="url(#pinkColumnGrad)"/>
      <rect x="${x + 4}" y="${topY + 18}" width="5" height="${height - 36}" rx="2.5" fill="#FFFFFF" opacity="0.35"/>
      <rect x="${x - 5}" y="${topY + height - 15}" width="${width + 10}" height="15" rx="7.5" fill="#F2B9C8"/>
    </g>
  `;
}

/**
 * Rèm sọc xanh ngọc che mát bo tròn ở Lầu 2
 */
function renderTealStripedAwning(x, y, width, height) {
  const stripeCount = Math.floor(width / 18);
  let stripes = "";
  for (let i = 0; i < stripeCount; i++) {
    const sx = x + i * 18;
    stripes += `<rect x="${sx}" y="${y}" width="9" height="${height}" rx="4" fill="${i % 2 === 0 ? "#2E97A6" : "#BCE5EB"}" opacity="0.9"/>`;
  }
  return `
    <g class="floor2-striped-curtain">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="12" fill="#D5F0F4"/>
      <g clip-path="inset(0 round 12px)">${stripes}</g>
      <path d="M ${x + 4} ${y + height - 2} Q ${x + width * 0.25} ${y + height + 10} ${x + width * 0.5} ${y + height - 2} T ${x + width - 4} ${y + height - 2}"
        fill="#2E97A6" opacity="0.82"/>
    </g>
  `;
}

/**
 * Nhãn tên khu vực / lớp học nổi bật, tương phản cao đặt ở tầng nổi trên cùng
 */
function renderRoomNamePill(cx, y, text, bgColor, textColor = "#FFFDF9", width = 228) {
  return `
    <g class="room-label-pill" transform="translate(${cx - width / 2}, ${y})" filter="url(#badgeShadow)">
      <rect x="0" y="0" width="${width}" height="38" rx="19" fill="${bgColor}"/>
      <text x="${width / 2}" y="24" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14.5" font-weight="700" fill="${textColor}">${text}</text>
    </g>
  `;
}

/**
 * Dựng toàn bộ thế giới SVG 2.5D vào container
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
      <filter id="paperShadow" x="-12%" y="-12%" width="128%" height="132%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#5E4638" flood-opacity="0.11"/>
      </filter>
      <filter id="softShadow" x="-12%" y="-12%" width="128%" height="132%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#4A3A32" flood-opacity="0.10"/>
      </filter>
      <filter id="badgeShadow" x="-15%" y="-15%" width="135%" height="145%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#3C2D26" flood-opacity="0.18"/>
      </filter>

      <clipPath id="signboardLogoClip">
        <circle cx="64" cy="88" r="41"/>
      </clipPath>

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
        <stop offset="0%" stop-color="#D09278"/>
        <stop offset="100%" stop-color="#AE725B"/>
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
    <!-- LỚP 1: HẬU CẢNH XA (Bầu trời, mặt trời, mây, đồi & cây tròn mềm)      -->
    <!-- ===================================================================== -->
    <g id="layer-sky" class="parallax-layer-sky">
      <rect x="-300" y="-200" width="3800" height="2250" fill="url(#skyWashGrad)"/>

      <g class="sun-orb" transform="translate(880, 210)">
        <circle cx="0" cy="0" r="145" fill="#FCEAC2" opacity="0.45"/>
        <circle cx="0" cy="0" r="95" fill="#F8D889" opacity="0.65"/>
        <circle cx="0" cy="0" r="56" fill="#F4C96B"/>
      </g>

      <path d="M -300 1440 Q 250 1180 860 1320 T 2120 1240 T 3500 1360 L 3500 1950 L -300 1950 Z" fill="#EAEFE6"/>
      <path d="M -300 1520 Q 420 1290 1080 1410 T 2480 1340 T 3500 1450 L 3500 1950 L -300 1950 Z" fill="#DCE8DC"/>

      <g class="anim-cloud-slow" transform="translate(260, 150)">
        <path d="M 10 56 C -14 56 -16 24 18 18 C 38 -14 92 -12 114 14 C 148 -6 196 14 186 48 C 184 56 172 56 164 56 Z" fill="#FFFFFF" opacity="0.92"/>
      </g>
      <g class="anim-cloud-mid" transform="translate(1280, 115)">
        <path d="M 12 62 C -16 62 -18 26 24 20 C 48 -18 112 -14 138 14 C 178 -8 232 16 220 52 C 218 62 204 62 194 62 Z" fill="#FFFFFF" opacity="0.9"/>
      </g>
      <g class="anim-cloud-slow" transform="translate(2260, 130)">
        <path d="M 10 56 C -14 56 -16 24 20 18 C 44 -14 98 -10 122 14 C 158 -6 208 16 196 48 C 194 56 180 56 172 56 Z" fill="#FFFFFF" opacity="0.88"/>
      </g>

      <g class="distant-trees" opacity="0.88">
        <circle cx="140" cy="880" r="140" fill="#9ED1AF"/>
        <circle cx="240" cy="940" r="120" fill="#82C299"/>
        <circle cx="70" cy="1020" r="130" fill="#6BB686"/>
        <circle cx="3120" cy="860" r="130" fill="#9ED1AF"/>
        <circle cx="3010" cy="960" r="110" fill="#82C299"/>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 2: TRUNG CẢNH KIẾN TRÚC                                           -->
    <!-- ===================================================================== -->
    <g id="layer-midground" class="parallax-layer-mid">

      <rect x="-200" y="1595" width="3600" height="320" fill="#EFE4D6"/>
      <rect x="-200" y="1645" width="3600" height="270" fill="#E6D8C7"/>

      <!-- ==================== LẦU 2 (TRÊN GÁC) ==================== -->
      <g id="floor-2-group">
        <!-- Mái Lầu 2 bo tròn mềm mại -->
        <path d="M 812 250 Q 930 176 1060 176 L 2960 176 Q 3090 176 3208 250 Z" fill="url(#terracottaRoofGrad)" filter="url(#paperShadow)"/>
        <rect x="820" y="246" width="2380" height="22" rx="11" fill="#8E5B49"/>

        <!-- Khung tường nền Lầu 2 không viền sắc -->
        <rect x="860" y="266" width="2300" height="456" rx="22" fill="url(#wallCreamGrad)" filter="url(#paperShadow)"/>

        <!-- 2.1 SÂN CHƠI NHỎ TRÁI -->
        <g id="room-san-nho-trai">
          <rect x="860" y="266" width="290" height="456" rx="18" fill="#F1FBF6"/>
          <path d="M 885 280 Q 1005 320 1125 280" fill="none" stroke="#52A877" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="930" cy="296" r="8" fill="#77C696"/>
          <circle cx="1005" cy="303" r="9" fill="#52A877"/>
          <circle cx="1080" cy="295" r="8" fill="#77C696"/>
          <rect x="860" y="618" width="290" height="12" rx="6" fill="#389FAD"/>
          <rect x="860" y="700" width="290" height="22" rx="8" fill="#8CC5A3"/>
          <g stroke="#52A877" stroke-width="5" stroke-linecap="round" opacity="0.72">
            <line x1="890" y1="628" x2="890" y2="700"/>
            <line x1="930" y1="628" x2="930" y2="700"/>
            <line x1="970" y1="628" x2="970" y2="700"/>
            <line x1="1010" y1="628" x2="1010" y2="700"/>
            <line x1="1050" y1="628" x2="1050" y2="700"/>
            <line x1="1090" y1="628" x2="1090" y2="700"/>
            <line x1="1130" y1="628" x2="1130" y2="700"/>
          </g>
          <rect x="886" y="655" width="38" height="45" rx="12" fill="#E87A90"/>
          <circle cx="905" cy="638" r="22" fill="#52A877"/>
          <circle cx="894" cy="630" r="14" fill="#6EC28F"/>
          <rect x="975" y="646" width="110" height="12" rx="6" fill="#F4C96B"/>
          <rect x="1024" y="658" width="12" height="42" rx="6" fill="#E1AF47"/>
          <rect x="955" y="665" width="24" height="35" rx="8" fill="#E87A90"/>
          <rect x="1082" y="665" width="24" height="35" rx="8" fill="#389FAD"/>
          <ellipse cx="1030" cy="642" rx="18" ry="5" fill="#FFFDF9"/>
          <circle cx="1024" cy="637" r="5.5" fill="#E87A90"/>
          <circle cx="1035" cy="637" r="5.5" fill="#52A877"/>
        </g>

        <!-- 2.2 LỚP MẪU GIÁO LỚN (5 – 6 TUỔI) -->
        <g id="room-mau-giao-lon">
          <rect x="1150" y="266" width="810" height="456" fill="url(#wallCreamGrad)"/>
          <polygon id="lamp-mgl" class="room-lamp-cone" points="1555,274 1280,715 1830,715" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1505" y="266" width="100" height="12" rx="6" fill="#F4C96B"/>
          <path d="M 1170 620 Q 1340 565 1550 610 T 1940 595 L 1940 722 L 1170 722 Z" fill="#E9F3EC" opacity="0.65"/>
          <rect x="1150" y="704" width="810" height="18" fill="#E6D7C5"/>

          <!-- Góc Sách bo tròn mềm mại -->
          <g transform="translate(1180, 448)" filter="url(#softShadow)">
            <rect x="0" y="0" width="146" height="248" rx="18" fill="#F5DEBE"/>
            <rect x="12" y="22" width="122" height="12" rx="6" fill="#D9A76E"/>
            <rect x="12" y="96" width="122" height="12" rx="6" fill="#D9A76E"/>
            <rect x="12" y="170" width="122" height="12" rx="6" fill="#D9A76E"/>
            <rect x="18" y="44" width="18" height="50" rx="6" fill="#E87A90"/>
            <rect x="40" y="48" width="16" height="46" rx="6" fill="#389FAD"/>
            <rect x="60" y="40" width="20" height="54" rx="6" fill="#F4C96B"/>
            <rect x="84" y="50" width="18" height="44" rx="6" fill="#52A877"/>
            <rect x="106" y="44" width="22" height="50" rx="6" fill="#A68AD9"/>
            <rect x="20" y="116" width="24" height="52" rx="6" fill="#5FB8D9"/>
            <rect x="48" y="122" width="18" height="46" rx="6" fill="#F28B72"/>
            <rect x="70" y="118" width="22" height="50" rx="6" fill="#E87A90"/>
            <rect x="98" y="126" width="28" height="42" rx="6" fill="#52A877"/>
            <ellipse cx="73" cy="228" rx="56" ry="18" fill="#F7D1DA"/>
            <text x="73" y="-12" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#7D583F">GÓC SÁCH</text>
          </g>

          <!-- Bảng Chữ Cái (không viền sắc) -->
          <g transform="translate(1395, 365)" filter="url(#softShadow)">
            <rect x="0" y="0" width="330" height="156" rx="22" fill="#E4C193"/>
            <rect x="12" y="12" width="306" height="132" rx="15" fill="#3B8D70"/>
            <text x="165" y="42" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15.5" font-weight="700" fill="#FFE79E">BẢNG CHỮ CÁI — VÀO LỚP 1</text>
            <text x="165" y="84" text-anchor="middle" font-family="Fraunces, serif" font-size="30" font-weight="700" fill="#FFFDF9" letter-spacing="4">A Ă Â B C D Đ</text>
            <text x="165" y="120" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="22" font-weight="700" fill="#FAD2DC" letter-spacing="3">1  2  3  4  5  +</text>
          </g>

          <!-- Bàn ghế học bo tròn -->
          <g transform="translate(1410, 560)" filter="url(#softShadow)">
            <rect x="0" y="28" width="160" height="16" rx="8" fill="#F8D889"/>
            <rect x="16" y="42" width="12" height="102" rx="6" fill="#D59F58"/>
            <rect x="132" y="42" width="12" height="102" rx="6" fill="#D59F58"/>
            <rect x="26" y="18" width="36" height="10" rx="5" fill="#FFFDF9"/>
            <rect x="92" y="16" width="34" height="12" rx="6" fill="#E87A90"/>
            <rect x="18" y="68" width="44" height="14" rx="7" fill="#389FAD"/>
            <rect x="22" y="80" width="9" height="64" rx="4.5" fill="#2A7F8B"/>
            <rect x="49" y="80" width="9" height="64" rx="4.5" fill="#2A7F8B"/>
            <rect x="98" y="68" width="44" height="14" rx="7" fill="#E87A90"/>
            <rect x="102" y="80" width="9" height="64" rx="4.5" fill="#C95E75"/>
            <rect x="129" y="80" width="9" height="64" rx="4.5" fill="#C95E75"/>

            <g transform="translate(220, 0)">
              <rect x="0" y="28" width="160" height="16" rx="8" fill="#A9DFBF"/>
              <rect x="16" y="42" width="12" height="102" rx="6" fill="#52A877"/>
              <rect x="132" y="42" width="12" height="102" rx="6" fill="#52A877"/>
              <rect x="34" y="6" width="42" height="22" rx="8" fill="#FFFDF9"/>
              <circle cx="44" cy="14" r="3.5" fill="#E87A90"/><circle cx="54" cy="14" r="3.5" fill="#F4C96B"/><circle cx="64" cy="20" r="3.5" fill="#389FAD"/>
              <rect x="22" y="68" width="44" height="14" rx="7" fill="#F4C96B"/>
              <rect x="26" y="80" width="9" height="64" rx="4.5" fill="#D2A445"/>
              <rect x="53" y="80" width="9" height="64" rx="4.5" fill="#D2A445"/>
              <rect x="98" y="68" width="44" height="14" rx="7" fill="#A68AD9"/>
              <rect x="102" y="80" width="9" height="64" rx="4.5" fill="#8267B8"/>
              <rect x="129" y="80" width="9" height="64" rx="4.5" fill="#8267B8"/>
            </g>
          </g>
        </g>

        <!-- 2.3 LỐI LÊN CẦU THANG -->
        <g id="room-loi-cau-thang-l2">
          <rect x="1960" y="266" width="360" height="456" fill="#F8F3EC"/>
          <circle cx="2140" cy="405" r="74" fill="#E7F6F9"/>
          <circle cx="2140" cy="405" r="64" fill="#F4FCFD"/>
          <line x1="2140" y1="331" x2="2140" y2="479" stroke="#389FAD" stroke-width="5" stroke-linecap="round"/>
          <line x1="2066" y1="405" x2="2214" y2="405" stroke="#389FAD" stroke-width="5" stroke-linecap="round"/>
          <rect x="1975" y="608" width="330" height="12" rx="6" fill="#389FAD"/>
          <g stroke-width="7" stroke-linecap="round">
            <line x1="2005" y1="620" x2="2005" y2="718" stroke="#E87A90"/>
            <line x1="2045" y1="620" x2="2045" y2="718" stroke="#F4C96B"/>
            <line x1="2085" y1="620" x2="2085" y2="718" stroke="#52A877"/>
            <line x1="2125" y1="620" x2="2125" y2="718" stroke="#389FAD"/>
            <line x1="2165" y1="620" x2="2165" y2="718" stroke="#A68AD9"/>
            <line x1="2205" y1="620" x2="2205" y2="718" stroke="#E87A90"/>
            <line x1="2245" y1="620" x2="2245" y2="718" stroke="#F4C96B"/>
            <line x1="2285" y1="620" x2="2285" y2="718" stroke="#52A877"/>
          </g>
        </g>

        <!-- 2.4 LỚP MẪU GIÁO NHỠ (4 – 5 TUỔI) -->
        <g id="room-mau-giao-nho">
          <rect x="2320" y="266" width="560" height="456" fill="url(#wallBlushGrad)"/>
          <polygon id="lamp-mgn" class="room-lamp-cone" points="2600,274 2370,715 2830,715" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="2550" y="266" width="100" height="12" rx="6" fill="#F4C96B"/>
          <rect x="2320" y="704" width="560" height="18" fill="#EBDCD9"/>

          <g transform="translate(2355, 365)" filter="url(#softShadow)">
            <rect x="0" y="0" width="210" height="132" rx="20" fill="#FFFDF9"/>
            <text x="105" y="28" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#C24764">GÓC VẼ NGHỆ THUẬT</text>
            <rect x="20" y="42" width="76" height="72" rx="14" fill="#FFF4E2"/>
            <path d="M 30 98 A 28 28 0 0 1 86 98" fill="none" stroke="#E87A90" stroke-width="6" stroke-linecap="round"/>
            <path d="M 38 98 A 20 20 0 0 1 78 98" fill="none" stroke="#F4C96B" stroke-width="6" stroke-linecap="round"/>
            <rect x="114" y="42" width="76" height="72" rx="14" fill="#EAF7F4"/>
            <circle cx="152" cy="72" r="14" fill="#E87A90"/>
            <circle cx="152" cy="72" r="6" fill="#F4C96B"/>
            <line x1="152" y1="86" x2="152" y2="106" stroke="#52A877" stroke-width="5" stroke-linecap="round"/>
          </g>

          <g transform="translate(2740, 465)" filter="url(#softShadow)">
            <line x1="42" y1="10" x2="10" y2="235" stroke="#C5905B" stroke-width="9" stroke-linecap="round"/>
            <line x1="42" y1="10" x2="74" y2="235" stroke="#C5905B" stroke-width="9" stroke-linecap="round"/>
            <rect x="4" y="34" width="76" height="96" rx="14" fill="#FFFDF9"/>
            <circle cx="42" cy="78" r="18" fill="#F7D1DA"/>
            <path d="M 28 96 Q 42 74 56 96" fill="#52A877"/>
          </g>

          <g transform="translate(2455, 570)" filter="url(#softShadow)">
            <rect x="0" y="36" width="215" height="16" rx="8" fill="#6EC2CE"/>
            <rect x="34" y="52" width="12" height="86" rx="6" fill="#389FAD"/>
            <rect x="169" y="52" width="12" height="86" rx="6" fill="#389FAD"/>
            <rect x="38" y="20" width="24" height="16" rx="6" fill="#E87A90"/>
            <line x1="44" y1="10" x2="44" y2="20" stroke="#F4C96B" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="50" y1="8" x2="50" y2="20" stroke="#52A877" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="56" y1="11" x2="56" y2="20" stroke="#389FAD" stroke-width="3.5" stroke-linecap="round"/>
            <rect x="88" y="28" width="54" height="8" rx="4" fill="#FFFDF9"/>
            <rect x="18" y="72" width="42" height="14" rx="7" fill="#F4C96B"/>
            <rect x="22" y="84" width="9" height="54" rx="4.5" fill="#D5A644"/>
            <rect x="47" y="84" width="9" height="54" rx="4.5" fill="#D5A644"/>
            <rect x="92" y="72" width="42" height="14" rx="7" fill="#E87A90"/>
            <rect x="96" y="84" width="9" height="54" rx="4.5" fill="#C95E75"/>
            <rect x="121" y="84" width="9" height="54" rx="4.5" fill="#C95E75"/>
            <rect x="160" y="72" width="42" height="14" rx="7" fill="#52A877"/>
            <rect x="164" y="84" width="9" height="54" rx="4.5" fill="#3D895E"/>
            <rect x="189" y="84" width="9" height="54" rx="4.5" fill="#3D895E"/>
          </g>
        </g>

        <!-- 2.5 SÂN CHƠI NHỎ PHẢI -->
        <g id="room-san-nho-phai">
          <rect x="2880" y="266" width="280" height="456" rx="18" fill="#F1FBF6"/>
          <path d="M 2905 280 Q 3020 318 3135 280" fill="none" stroke="#52A877" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="2960" cy="296" r="8" fill="#E87A90"/>
          <circle cx="3020" cy="302" r="8" fill="#F4C96B"/>
          <circle cx="3080" cy="296" r="8" fill="#389FAD"/>
          <rect x="2880" y="618" width="280" height="12" rx="6" fill="#389FAD"/>
          <rect x="2880" y="700" width="280" height="22" rx="8" fill="#8CC5A3"/>
          <g stroke="#52A877" stroke-width="5" stroke-linecap="round" opacity="0.72">
            <line x1="2910" y1="628" x2="2910" y2="700"/>
            <line x1="2950" y1="628" x2="2950" y2="700"/>
            <line x1="2990" y1="628" x2="2990" y2="700"/>
            <line x1="3030" y1="628" x2="3030" y2="700"/>
            <line x1="3070" y1="628" x2="3070" y2="700"/>
            <line x1="3110" y1="628" x2="3110" y2="700"/>
          </g>
          <rect x="2915" y="646" width="110" height="12" rx="6" fill="#F7D1DA"/>
          <rect x="2964" y="658" width="12" height="42" rx="6" fill="#E87A90"/>
          <rect x="2896" y="665" width="24" height="35" rx="8" fill="#F4C96B"/>
          <rect x="3022" y="665" width="24" height="35" rx="8" fill="#52A877"/>
          <rect x="3085" y="655" width="38" height="45" rx="12" fill="#389FAD"/>
          <circle cx="3104" cy="638" r="22" fill="#52A877"/>
        </g>
      </g>

      <!-- Sàn bê tông bo tròn giữa hai tầng -->
      <rect x="820" y="722" width="2360" height="42" rx="16" fill="#E5D8CA"/>
      <rect x="76" y="880" width="3096" height="48" rx="20" fill="url(#terracottaRoofGrad)" filter="url(#softShadow)"/>

      <!-- ==================== TẦNG TRỆT (ĐÚNG THỨ TỰ MỚI TRÁI -> PHẢI) ==================== -->
      <!-- [Sân chơi chính] — [Lớp Nhà trẻ (5-36th)] — [Lớp Mẫu giáo bé (3-4t)] — [Văn phòng & Cầu thang] — [Kho dụng cụ -> Thực đơn tuần -> Bếp nấu] -->
      <g id="ground-floor-group">

        <!-- 1. SÂN CHƠI CHÍNH (x = 80 .. 820) -->
        <g id="room-san-choi-chinh">
          <path d="M 74 910 Q 450 812 824 910 Z" fill="#DDF3F6" stroke="#2D8E9B" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" filter="url(#paperShadow)"/>
          <line x1="220" y1="875" x2="220" y2="910" stroke="#2D8E9B" stroke-width="4" stroke-linecap="round"/>
          <line x1="450" y1="860" x2="450" y2="910" stroke="#2D8E9B" stroke-width="4" stroke-linecap="round"/>
          <line x1="680" y1="875" x2="680" y2="910" stroke="#2D8E9B" stroke-width="4" stroke-linecap="round"/>
          <rect x="92" y="910" width="14" height="635" rx="7" fill="#2D8E9B"/>
          <rect x="802" y="910" width="14" height="635" rx="7" fill="#2D8E9B"/>
          ${renderSoftBuntingFlags(110, 795, 922, 20, 15)}

          <g transform="translate(155, 1180)">
            <rect x="-16" y="130" width="32" height="220" rx="14" fill="#9D7254"/>
            <circle cx="0" cy="40" r="115" fill="#6EC28F"/>
            <circle cx="-65" cy="80" r="78" fill="#52A877"/>
            <circle cx="65" cy="85" r="75" fill="#7FD09E"/>
          </g>

          <!-- Hàng rào xi măng sơn màu quanh sân chơi -->
          ${renderCementColorFence(120, 23, 1365, 120, 28)}

          <!-- Thảm cỏ nhân tạo -->
          <path d="M 70 1485 Q 450 1470 820 1485 L 820 1605 L 70 1605 Z" fill="url(#turfGrassGrad)" filter="url(#softShadow)"/>
          <ellipse cx="450" cy="1548" rx="320" ry="30" fill="#72C994" opacity="0.45"/>

          <!-- CẦU TRƯỢT BO TRÒN -->
          <g id="prop-slide" transform="translate(160, 1275)" filter="url(#softShadow)">
            <rect x="14" y="55" width="76" height="190" rx="18" fill="#F4C96B"/>
            <path d="M 8 58 Q 52 10 96 58 Z" fill="#E87A90"/>
            <rect x="26" y="88" width="52" height="52" rx="16" fill="#FFFDF9"/>
            <line x1="14" y1="168" x2="2" y2="245" stroke="#389FAD" stroke-width="7" stroke-linecap="round"/>
            <line x1="12" y1="190" x2="28" y2="190" stroke="#389FAD" stroke-width="6" stroke-linecap="round"/>
            <line x1="7" y1="215" x2="25" y2="215" stroke="#389FAD" stroke-width="6" stroke-linecap="round"/>
            <path d="M 88 122 C 130 124 146 218 208 232 L 208 248 C 134 240 120 148 88 144 Z" fill="#4DB8C6"/>
            <path d="M 88 116 C 134 118 152 210 210 226" fill="none" stroke="#F7D1DA" stroke-width="7" stroke-linecap="round"/>
          </g>

          <!-- XÍCH ĐU BO TRÒN -->
          <g id="prop-swing" transform="translate(385, 1240)" filter="url(#softShadow)">
            <line x1="18" y1="22" x2="0" y2="262" stroke="#389FAD" stroke-width="9" stroke-linecap="round"/>
            <line x1="18" y1="22" x2="38" y2="262" stroke="#2D8591" stroke-width="9" stroke-linecap="round"/>
            <line x1="126" y1="22" x2="108" y2="262" stroke="#2D8591" stroke-width="9" stroke-linecap="round"/>
            <line x1="126" y1="22" x2="144" y2="262" stroke="#389FAD" stroke-width="9" stroke-linecap="round"/>
            <rect x="10" y="14" width="124" height="14" rx="7" fill="#E87A90"/>
            <g class="anim-swing" style="transform-origin:52px 26px;">
              <line x1="42" y1="26" x2="42" y2="188" stroke="#9B8E85" stroke-width="3" stroke-linecap="round"/>
              <line x1="66" y1="26" x2="66" y2="188" stroke="#9B8E85" stroke-width="3" stroke-linecap="round"/>
              <rect x="34" y="185" width="40" height="12" rx="6" fill="#F4C96B"/>
            </g>
            <g class="anim-swing-delay" style="transform-origin:100px 26px;">
              <line x1="88" y1="26" x2="88" y2="188" stroke="#9B8E85" stroke-width="3" stroke-linecap="round"/>
              <line x1="112" y1="26" x2="112" y2="188" stroke="#9B8E85" stroke-width="3" stroke-linecap="round"/>
              <rect x="80" y="185" width="40" height="12" rx="6" fill="#E87A90"/>
            </g>
          </g>

          <!-- VÒNG QUAY -->
          <g id="prop-spinner" transform="translate(555, 1345)" filter="url(#softShadow)">
            <ellipse cx="55" cy="158" rx="52" ry="13" fill="#E87A90"/>
            <rect x="49" y="64" width="12" height="94" rx="6" fill="#389FAD"/>
            <g class="anim-spinner" style="transform-origin:55px 84px;">
              <circle cx="55" cy="84" r="38" fill="none" stroke="#F4C96B" stroke-width="8"/>
              <line x1="17" y1="84" x2="93" y2="84" stroke="#52A877" stroke-width="6" stroke-linecap="round"/>
              <line x1="55" y1="46" x2="55" y2="122" stroke="#E87A90" stroke-width="6" stroke-linecap="round"/>
              <circle cx="55" cy="84" r="11" fill="#FFFDF9"/>
            </g>
          </g>

          <!-- GÓC ĐÁ BÓNG MINI -->
          <g id="prop-soccer" transform="translate(675, 1370)" filter="url(#softShadow)">
            <path d="M 18 124 L 18 48 Q 18 40 26 40 L 106 40 Q 114 40 114 48 L 114 124" fill="none" stroke="#FFFDF9" stroke-width="8" stroke-linecap="round"/>
            <path d="M 24 44 L 110 44 L 110 120 L 24 120 Z" fill="none" stroke="#FFFDF9" stroke-width="1.8" stroke-dasharray="6 6" opacity="0.8"/>
            <g class="anim-ball" transform="translate(12, 128)">
              <circle cx="0" cy="0" r="15" fill="#FFFDF9"/>
              <circle cx="0" cy="0" r="6" fill="#2C2A29"/>
              <circle cx="9" cy="-4" r="3.5" fill="#2C2A29"/>
              <circle cx="-9" cy="-4" r="3.5" fill="#2C2A29"/>
              <circle cx="0" cy="10" r="3.5" fill="#2C2A29"/>
            </g>
          </g>
        </g>

        <!-- 2. LỚP NHÀ TRẺ (5 – 36 THÁNG) (x = 820 .. 1400) — SÁT SÂN CHƠI CHÍNH! -->
        <g id="room-nha-tre">
          <rect x="820" y="928" width="580" height="618" fill="url(#wallBlushGrad)"/>
          <polygon id="lamp-nt-cone" class="room-lamp-cone" points="1110,936 855,1535 1365,1535" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1065" y="928" width="90" height="12" rx="6" fill="#F4C96B"/>

          <!-- Đám mây & Trăng non bo tròn -->
          <path d="M 910 1090 C 885 1090 885 1056 916 1052 C 936 1022 986 1026 1004 1050 C 1034 1044 1062 1066 1052 1090 Z" fill="#FFFDF9" opacity="0.92"/>
          <circle cx="1220" cy="1065" r="24" fill="#FFE79E"/>
          <circle cx="1231" cy="1060" r="20" fill="#FFF9FA"/>

          <!-- Thảm xốp êm dịu nhiều ô bo tròn -->
          <g transform="translate(855, 1468)" filter="url(#softShadow)">
            <rect x="0" y="0" width="122" height="56" rx="14" fill="#BCE5EB"/>
            <rect x="128" y="0" width="122" height="56" rx="14" fill="#F7D1DA"/>
            <rect x="256" y="0" width="122" height="56" rx="14" fill="#FFE79E"/>
            <rect x="384" y="0" width="122" height="56" rx="14" fill="#C4E8D1"/>
          </g>

          <!-- Nệm & Gối nhỏ êm ái -->
          <g transform="translate(868, 1384)" filter="url(#softShadow)">
            <rect x="0" y="34" width="160" height="44" rx="20" fill="#FFFDF9"/>
            <rect x="12" y="18" width="52" height="24" rx="12" fill="#F7D1DA"/>
            <rect x="180" y="34" width="150" height="44" rx="20" fill="#FFFDF9"/>
            <rect x="192" y="18" width="52" height="24" rx="12" fill="#BCE5EB"/>
          </g>

          <!-- Đồ chơi khối mềm cầu vồng & thỏ bông -->
          <g transform="translate(1208, 1345)" filter="url(#softShadow)">
            <path d="M 10 120 A 56 56 0 0 1 122 120" fill="none" stroke="#F4A3B4" stroke-width="16" stroke-linecap="round"/>
            <path d="M 28 120 A 38 38 0 0 1 104 120" fill="none" stroke="#FFE29A" stroke-width="14" stroke-linecap="round"/>
            <path d="M 46 120 A 20 20 0 0 1 86 120" fill="none" stroke="#9FD9C0" stroke-width="12" stroke-linecap="round"/>
            <ellipse cx="145" cy="100" rx="16" ry="20" fill="#FFFDF9"/>
            <circle cx="145" cy="76" r="13" fill="#FFFDF9"/>
            <ellipse cx="140" cy="58" rx="4.5" ry="12" fill="#F7D1DA"/>
            <ellipse cx="150" cy="58" rx="4.5" ry="12" fill="#F7D1DA"/>
          </g>
        </g>

        <!-- 3. LỚP MẪU GIÁO BÉ (3 – 4 TUỔI) (x = 1400 .. 1980) — GIỮA NHÀ TRẺ VÀ VĂN PHÒNG! -->
        <g id="room-mau-giao-be">
          <rect x="1400" y="928" width="580" height="618" fill="url(#wallMintGrad)"/>
          <polygon id="lamp-mgb-cone" class="room-lamp-cone" points="1690,936 1435,1535 1945,1535" fill="url(#roomLampGlowGrad)" opacity="0.25"/>
          <rect x="1645" y="928" width="90" height="12" rx="6" fill="#F4C96B"/>

          <!-- Tranh tường đồi cỏ & cây hoa tròn -->
          <path d="M 1402 1350 Q 1560 1280 1740 1335 T 1978 1310 L 1978 1545 L 1402 1545 Z" fill="#D9EDE0" opacity="0.65"/>
          <rect x="1442" y="1140" width="14" height="230" rx="7" fill="#A67C58"/>
          <circle cx="1449" cy="1120" r="46" fill="#82C69B"/>
          <circle cx="1430" cy="1110" r="8" fill="#F4C96B"/>
          <circle cx="1464" cy="1130" r="7" fill="#E87A90"/>

          <!-- Bảng "HOA BÉ NGOAN" bo tròn không viền -->
          <g transform="translate(1550, 1045)" filter="url(#softShadow)">
            <rect x="0" y="0" width="224" height="135" rx="22" fill="#FFFDF9"/>
            <text x="112" y="32" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#52A877">HOA BÉ NGOAN</text>
            <circle cx="48" cy="72" r="14" fill="#F4C96B"/><circle cx="48" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="92" cy="72" r="14" fill="#E87A90"/><circle cx="92" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="136" cy="72" r="14" fill="#389FAD"/><circle cx="136" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="180" cy="72" r="14" fill="#52A877"/><circle cx="180" cy="72" r="5" fill="#FFFDF9"/>
            <circle cx="70" cy="108" r="11" fill="#F7D1DA"/>
            <circle cx="114" cy="108" r="11" fill="#FFE79E"/>
            <circle cx="158" cy="108" r="11" fill="#BCE5EB"/>
          </g>

          <!-- Góc xếp hình bo tròn -->
          <g transform="translate(1445, 1345)" filter="url(#softShadow)">
            <rect x="0" y="55" width="160" height="125" rx="16" fill="#F4DCBA"/>
            <rect x="12" y="102" width="136" height="10" rx="5" fill="#CE9F66"/>
            <rect x="22" y="15" width="28" height="40" rx="8" fill="#E87A90"/>
            <rect x="54" y="25" width="32" height="30" rx="8" fill="#389FAD"/>
            <path d="M 52 25 Q 70 2 88 25 Z" fill="#F4C96B"/>
            <rect x="94" y="20" width="34" height="35" rx="8" fill="#52A877"/>
            <text x="80" y="-12" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#7D583F">GÓC XẾP HÌNH</text>
          </g>

          <!-- Bàn tô màu bo tròn -->
          <g transform="translate(1690, 1375)" filter="url(#softShadow)">
            <ellipse cx="115" cy="40" rx="108" ry="20" fill="#FFE599"/>
            <rect x="65" y="58" width="14" height="84" rx="7" fill="#DDA946"/>
            <rect x="155" y="58" width="14" height="84" rx="7" fill="#DDA946"/>
            <rect x="58" y="30" width="44" height="14" rx="6" fill="#FFFDF9"/>
            <rect x="122" y="24" width="24" height="16" rx="6" fill="#E87A90"/>
            <rect x="8" y="70" width="38" height="14" rx="7" fill="#E87A90"/>
            <rect x="12" y="82" width="8" height="58" rx="4" fill="#C95E75"/>
            <rect x="33" y="82" width="8" height="58" rx="4" fill="#C95E75"/>
            <rect x="180" y="70" width="38" height="14" rx="7" fill="#389FAD"/>
            <rect x="184" y="82" width="8" height="58" rx="4" fill="#2A7F8B"/>
            <rect x="205" y="82" width="8" height="58" rx="4" fill="#2A7F8B"/>
          </g>
        </g>

        <!-- 4. VĂN PHÒNG & CAMERA GIÁM SÁT 24/7 (x = 1980 .. 2290) -->
        <g id="room-van-phong">
          <rect x="1980" y="928" width="310" height="618" fill="#FFFBF4"/>
          <circle cx="2070" cy="1058" r="24" fill="#FFFDF9" filter="url(#softShadow)"/>
          <line x1="2070" y1="1058" x2="2070" y2="1042" stroke="#2C2A29" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="2070" y1="1058" x2="2082" y2="1058" stroke="#E87A90" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Camera giám sát 24/7 dễ thương gắn góc trần Văn phòng -->
          <g id="office-cctv-camera" transform="translate(2215, 1020)" filter="url(#softShadow)">
            <rect x="-26" y="-12" width="52" height="24" rx="12" fill="#FFFDF9"/>
            <circle cx="-12" cy="0" r="8" fill="#389FAD"/>
            <circle cx="-12" cy="0" r="4" fill="#1F5861"/>
            <circle cx="14" cy="0" r="3.5" fill="#52A877"/>
            <path d="M 18 12 L 26 24" stroke="#B7A99A" stroke-width="5" stroke-linecap="round"/>
          </g>

          <!-- Bảng thông tin pháp lý QĐ 1815 -->
          <g transform="translate(2015, 1110)" filter="url(#softShadow)">
            <rect x="0" y="0" width="142" height="72" rx="16" fill="#FFFDF9"/>
            <text x="71" y="30" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="11.5" font-weight="700" fill="#389FAD">QĐ 1815/QĐ-UBND</text>
            <text x="71" y="50" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="10.5" font-weight="700" fill="#6D635C">CAMERA 24/7</text>
          </g>

          <!-- Bàn Văn phòng + Màn hình theo dõi Camera 24/7 -->
          <g transform="translate(2015, 1345)" filter="url(#softShadow)">
            <rect x="0" y="62" width="225" height="118" rx="16" fill="#DFBE97"/>
            <rect x="-6" y="52" width="237" height="16" rx="8" fill="#C79E6E"/>
            <!-- Màn hình Camera 24/7 hiển thị 4 góc lớp học -->
            <rect x="24" y="-8" width="92" height="58" rx="12" fill="#2C2A29"/>
            <rect x="30" y="-2" width="38" height="22" rx="5" fill="#EAF7F4"/>
            <rect x="72" y="-2" width="38" height="22" rx="5" fill="#FCEAED"/>
            <rect x="30" y="23" width="38" height="22" rx="5" fill="#FFF4DC"/>
            <rect x="72" y="23" width="38" height="22" rx="5" fill="#DCEEE4"/>
            <circle cx="104" cy="4" r="3" fill="#52A877"/>
            <rect x="64" y="50" width="12" height="8" rx="3" fill="#9E938A"/>
            <!-- Sổ đón trẻ & Lọ hoa sen -->
            <rect x="132" y="40" width="44" height="12" rx="6" fill="#389FAD"/>
            <rect x="188" y="22" width="22" height="30" rx="8" fill="#F7D1DA"/>
            <circle cx="199" cy="14" r="9" fill="#E87A90"/>
          </g>
        </g>

        <!-- 5. CẦU THANG LÊN LẦU 2 (x = 2290 .. 2520) — ĐÃ XÓA TRANH HOA SEN CHIẾU NGHỈ -->
        <g id="room-cau-thang">
          <rect x="2290" y="764" width="230" height="782" fill="#F8F2EA"/>
          ${renderFlowerGarland(2310, 2500, 815, 6)}

          <!-- Ô cửa sổ vòm chiếu nghỉ đón nắng ấm (thay thế Tranh Hoa Sen chiếu nghỉ) -->
          <g transform="translate(2405, 965)" filter="url(#softShadow)">
            <path d="M -52 38 L -52 -24 A 52 52 0 0 1 52 -24 L 52 38 Q 52 48 42 48 L -42 48 Q -52 48 -52 38 Z" fill="#E7F6F9"/>
            <path d="M -42 36 L -42 -22 A 42 42 0 0 1 42 -22 L 42 36 Z" fill="#F6FCFD"/>
            <line x1="0" y1="-64" x2="0" y2="36" stroke="#BCE5EB" stroke-width="4" stroke-linecap="round"/>
            <line x1="-42" y1="-4" x2="42" y2="-4" stroke="#BCE5EB" stroke-width="4" stroke-linecap="round"/>
          </g>

          <!-- Bậc thang màu xám bo tròn -->
          <g id="stairs-steps" filter="url(#softShadow)">
            <rect x="2300" y="1490" width="210" height="30" rx="10" fill="#CBD4D9"/>
            <rect x="2305" y="1450" width="195" height="30" rx="10" fill="#D5DEE2"/>
            <rect x="2310" y="1410" width="180" height="30" rx="10" fill="#CBD4D9"/>
            <rect x="2315" y="1370" width="165" height="30" rx="10" fill="#D5DEE2"/>
            <rect x="2320" y="1330" width="150" height="30" rx="10" fill="#CBD4D9"/>
            <rect x="2325" y="1290" width="135" height="30" rx="10" fill="#D5DEE2"/>
            <rect x="2330" y="1250" width="120" height="30" rx="10" fill="#CBD4D9"/>
            <rect x="2335" y="1210" width="105" height="30" rx="10" fill="#D5DEE2"/>
            <rect x="2310" y="1140" width="195" height="34" rx="12" fill="#BFC9CF"/>
            <rect x="2295" y="1085" width="160" height="28" rx="10" fill="#CBD4D9"/>
            <rect x="2275" y="1030" width="140" height="28" rx="10" fill="#D5DEE2"/>
            <rect x="2245" y="975" width="130" height="28" rx="10" fill="#CBD4D9"/>
            <rect x="2215" y="920" width="120" height="28" rx="10" fill="#D5DEE2"/>
            <rect x="2190" y="865" width="110" height="28" rx="10" fill="#CBD4D9"/>
            <rect x="2165" y="810" width="100" height="28" rx="10" fill="#D5DEE2"/>
          </g>

          <!-- Tay vịn sắt nhiều màu bo tròn -->
          <g id="stairs-colorful-handrail" stroke-linecap="round">
            <line x1="2308" y1="1420" x2="2308" y2="1490" stroke="#E87A90" stroke-width="7"/>
            <line x1="2338" y1="1340" x2="2338" y2="1410" stroke="#F4C96B" stroke-width="7"/>
            <line x1="2368" y1="1260" x2="2368" y2="1330" stroke="#52A877" stroke-width="7"/>
            <line x1="2398" y1="1180" x2="2398" y2="1250" stroke="#389FAD" stroke-width="7"/>
            <line x1="2428" y1="1100" x2="2428" y2="1170" stroke="#A68AD9" stroke-width="7"/>
            <line x1="2295" y1="1010" x2="2295" y2="1080" stroke="#E87A90" stroke-width="7"/>
            <line x1="2250" y1="900" x2="2250" y2="970" stroke="#F4C96B" stroke-width="7"/>
            <line x1="2205" y1="790" x2="2205" y2="860" stroke="#52A877" stroke-width="7"/>
            <path d="M 2295 1420 L 2450 1095 L 2195 780" fill="none" stroke="#389FAD" stroke-width="9" stroke-linejoin="round"/>
          </g>
        </g>

        <!-- 6. BÊN PHẢI VĂN PHÒNG THEO ĐÚNG THỨ TỰ: KHO DỤNG CỤ -> THỰC ĐƠN TUẦN -> BẾP NẤU (x = 2520 .. 3180) -->
        <g id="room-bep-kho">
          <rect x="2520" y="928" width="660" height="618" fill="#FFFDF8"/>

          <!-- 6.1 KHO DỤNG CỤ (x = 2528 .. 2728) -->
          <g id="area-kho-dung-cu" transform="translate(2534, 1085)" filter="url(#softShadow)">
            <rect x="0" y="0" width="192" height="442" rx="20" fill="#F4EDE3"/>
            <rect x="16" y="120" width="160" height="12" rx="6" fill="#C79F70"/>
            <rect x="16" y="235" width="160" height="12" rx="6" fill="#C79F70"/>
            <rect x="16" y="348" width="160" height="12" rx="6" fill="#C79F70"/>
            <rect x="26" y="72" width="44" height="46" rx="12" fill="#BCE5EB"/>
            <rect x="78" y="80" width="44" height="38" rx="12" fill="#F7D1DA"/>
            <rect x="130" y="68" width="34" height="50" rx="12" fill="#FFE79E"/>
            <rect x="28" y="182" width="60" height="50" rx="14" fill="#C4E8D1"/>
            <rect x="98" y="188" width="66" height="44" rx="14" fill="#FFE29A"/>
            <rect x="34" y="294" width="52" height="50" rx="14" fill="#D5EAE8"/>
            <rect x="96" y="288" width="66" height="56" rx="14" fill="#F5CFA8"/>
          </g>

          <!-- 6.2 THỰC ĐƠN TUẦN (x = 2742 .. 2948) -->
          <g id="area-thuc-don-tuan" transform="translate(2744, 1050)" filter="url(#softShadow)">
            <rect x="0" y="0" width="198" height="170" rx="22" fill="#FFFDF9"/>
            <rect x="0" y="0" width="198" height="38" rx="18" fill="#52A877"/>
            <text x="99" y="24" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="14" font-weight="700" fill="#FFFDF9">THỰC ĐƠN TUẦN</text>
            <circle cx="32" cy="64" r="7" fill="#E87A90"/><rect x="50" y="59" width="118" height="10" rx="5" fill="#EAE2D7"/>
            <circle cx="32" cy="92" r="7" fill="#F4C96B"/><rect x="50" y="87" width="106" height="10" rx="5" fill="#EAE2D7"/>
            <circle cx="32" cy="120" r="7" fill="#389FAD"/><rect x="50" y="115" width="122" height="10" rx="5" fill="#EAE2D7"/>
            <circle cx="32" cy="148" r="7" fill="#52A877"/><rect x="50" y="143" width="112" height="10" rx="5" fill="#EAE2D7"/>

            <!-- Bàn chia khay sạch bên dưới bảng Thực đơn -->
            <g transform="translate(14, 305)">
              <rect x="0" y="24" width="170" height="145" rx="16" fill="#EDF7F3"/>
              <rect x="-4" y="18" width="178" height="14" rx="7" fill="#52A877"/>
              <ellipse cx="48" cy="12" rx="22" ry="6" fill="#FFFDF9"/>
              <circle cx="48" cy="7" r="6" fill="#F4C96B"/>
              <ellipse cx="122" cy="12" rx="22" ry="6" fill="#FFFDF9"/>
              <circle cx="122" cy="7" r="6" fill="#E87A90"/>
            </g>
          </g>

          <!-- 6.3 BẾP NẤU ẤM CÚNG (x = 2956 .. 3180) -->
          <g id="area-bep-nau">
            <rect x="2958" y="1195" width="214" height="150" rx="18" fill="#EBF6F7"/>
            <line x1="2964" y1="1245" x2="3166" y2="1245" stroke="#D5EAEB" stroke-width="2"/>
            <line x1="2964" y1="1295" x2="3166" y2="1295" stroke="#D5EAEB" stroke-width="2"/>

            <g transform="translate(2958, 1345)" filter="url(#softShadow)">
              <rect x="0" y="25" width="212" height="170" rx="18" fill="#F2ECE4"/>
              <rect x="-4" y="16" width="220" height="16" rx="8" fill="#389FAD"/>
              <rect x="24" y="-14" width="56" height="30" rx="12" fill="#E5989B"/>
              <rect x="32" y="-22" width="40" height="9" rx="4.5" fill="#C97C80"/>
              <rect x="96" y="-18" width="50" height="34" rx="12" fill="#F4C96B"/>
              <path class="anim-steam" d="M 44 -30 Q 34 -48 47 -64 T 43 -92" fill="none" stroke="#E5CFC0" stroke-width="4" stroke-linecap="round"/>
              <path class="anim-steam-delay" d="M 62 -28 Q 72 -46 58 -62 T 64 -90" fill="none" stroke="#E5CFC0" stroke-width="3.5" stroke-linecap="round"/>
              <path class="anim-steam" d="M 120 -26 Q 108 -44 122 -62 T 118 -88" fill="none" stroke="#E5CFC0" stroke-width="3.8" stroke-linecap="round"/>
              <rect x="156" y="-4" width="48" height="20" rx="9" fill="#D5A66E"/>
              <circle cx="170" cy="-9" r="8" fill="#52A877"/>
              <circle cx="185" cy="-10" r="7" fill="#E87A90"/>
            </g>
          </g>
        </g>
      </g>
    </g>

    <!-- ===================================================================== -->
    <!-- LỚP 3: TIỀN CẢNH CHIỀU SÂU 2.5D & NHÃN TÊN LỚP NỔI BẬT               -->
    <!-- ===================================================================== -->
    <g id="layer-foreground" class="parallax-layer-front">

      <!-- Tiền cảnh Lầu 2 -->
      <g id="floor2-front-trim">
        ${renderPinkColumn(1140, 266, 456, 22)}
        ${renderPinkColumn(1770, 266, 456, 22)}
        ${renderPinkColumn(1945, 266, 456, 22)}
        ${renderPinkColumn(2310, 266, 456, 22)}
        ${renderPinkColumn(2865, 266, 456, 22)}
        ${renderTealStripedAwning(1168, 266, 595, 54)}
        ${renderTealStripedAwning(2338, 266, 522, 54)}
      </g>

      <!-- HIÊN CHÍNH -->
      <g id="veranda-foreground">
        <rect x="815" y="1526" width="1715" height="68" fill="url(#verandaFloorGrad)"/>
        <g id="safety-wood-rails" opacity="0.92">
          <rect x="845" y="1425" width="215" height="104" rx="12" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          <line x1="880" y1="1450" x2="880" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="910" y1="1450" x2="910" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="940" y1="1450" x2="940" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="970" y1="1450" x2="970" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1000" y1="1450" x2="1000" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1030" y1="1450" x2="1030" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>

          <rect x="1435" y="1425" width="215" height="104" rx="12" fill="none" stroke="#FFFFFF" stroke-width="5"/>
          <line x1="1470" y1="1450" x2="1470" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1500" y1="1450" x2="1500" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1530" y1="1450" x2="1530" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1560" y1="1450" x2="1560" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1590" y1="1450" x2="1590" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
          <line x1="1620" y1="1450" x2="1620" y2="1528" stroke="#C7925B" stroke-width="5" stroke-linecap="round"/>
        </g>

        ${renderFlowerGarland(850, 2490, 926, 26)}

        ${renderPinkColumn(840, 928, 616, 26)}
        ${renderPinkColumn(1260, 928, 616, 26)}
        ${renderPinkColumn(1680, 928, 616, 26)}
        ${renderPinkColumn(1985, 928, 616, 26)}
        ${renderPinkColumn(2285, 928, 616, 26)}

        ${renderMiniVerandaTableSet(1055, 1584, "#48B5C4", "#E87A90", "#52A877")}
        ${renderMiniVerandaTableSet(1530, 1584, "#F4C96B", "#389FAD", "#E87A90")}
        ${renderMiniVerandaTableSet(1840, 1584, "#52A877", "#F4C96B", "#48B5C4")}
      </g>

      <!-- TẦNG NHÃN TÊN KHU VỰC / LỚP HỌC (Đặt phía trên cột & rèm để KHÔNG BAO GIỜ BỊ CHE) -->
      <g id="scene-room-badges">
        <!-- Tầng trệt -->
        ${renderRoomNamePill(450, 954, "SÂN CHƠI CHÍNH", "#2D8E9B", "#FFFDF9", 190)}
        ${renderRoomNamePill(1110, 976, "LỚP NHÀ TRẺ (5–36TH)", "#F4C96B", "#3D2A06", 224)}
        ${renderRoomNamePill(1690, 976, "LỚP MẪU GIÁO BÉ (3–4T)", "#E87A90", "#FFFDF9", 232)}
        ${renderRoomNamePill(2135, 976, "VĂN PHÒNG • CAMERA 24/7", "#389FAD", "#FFFDF9", 242)}
        ${renderRoomNamePill(2630, 976, "KHO DỤNG CỤ", "#C8955A", "#FFFDF9", 160)}
        ${renderRoomNamePill(2843, 976, "THỰC ĐƠN TUẦN", "#52A877", "#FFFDF9", 174)}
        ${renderRoomNamePill(3065, 976, "BẾP NẤU", "#E07A5F", "#FFFDF9", 140)}

        <!-- Lầu 2 -->
        ${renderRoomNamePill(1005, 326, "SÂN CHƠI NHỎ TRÁI", "#52A877", "#FFFDF9", 188)}
        ${renderRoomNamePill(1555, 312, "LỚP MẪU GIÁO LỚN (5–6T)", "#D95D78", "#FFFDF9", 242)}
        ${renderRoomNamePill(2140, 526, "LỐI LÊN CẦU THANG", "#6F635B", "#FFFDF9", 196)}
        ${renderRoomNamePill(2600, 312, "LỚP MẪU GIÁO NHỠ (4–5T)", "#F4C96B", "#3D2A06", 242)}
        ${renderRoomNamePill(3020, 326, "SÂN CHƠI NHỎ PHẢI", "#389FAD", "#FFFDF9", 188)}
      </g>

      <!-- ================================================================= -->
      <!-- MẶT TIỀN, HÀNG RÀO XI MĂNG & HAI CÁNH CỔNG MỞ SANG HAI BÊN       -->
      <!-- ================================================================= -->
      <g id="facade-curtain">
        <!-- Rèm che nắng hai bên (cuộn gọn lên mái khi mở cổng) -->
        <g id="facade-green-curtains">
          <path d="M 1265 924 L 1852 924 L 1852 1326 Q 1705 1344 1560 1326 T 1265 1326 Z" fill="#63AD63" opacity="0.98" filter="url(#softShadow)"/>
          <path d="M 1265 924 L 1852 924 L 1852 960 Q 1705 975 1560 960 T 1265 960 Z" fill="#4D954D"/>
          <path d="M 2408 924 L 2995 924 L 2995 1326 Q 2850 1344 2705 1326 T 2408 1326 Z" fill="#63AD63" opacity="0.98" filter="url(#softShadow)"/>
          <path d="M 2408 924 L 2995 924 L 2995 960 Q 2850 975 2705 960 T 2408 960 Z" fill="#4D954D"/>
        </g>

        <!-- Chân tường & Hàng rào xi măng sơn màu hai bên -->
        <g id="facade-outer-walls">
          <rect x="1260" y="1530" width="600" height="86" rx="12" fill="#EAE0D4"/>
          <rect x="2400" y="1530" width="600" height="86" rx="12" fill="#EAE0D4"/>
          ${renderCementColorFence(1270, 7, 1340, 190, 28)}
          ${renderCementColorFence(1778, 2, 1340, 190, 28)}
          ${renderCementColorFence(2408, 2, 1340, 190, 28)}
          ${renderCementColorFence(2798, 7, 1340, 190, 28)}

          <!-- Bảng NỘI QUY (trái) & THÔNG BÁO (phải) bo tròn không viền -->
          <g id="sign-noi-quy" transform="translate(1480, 1322)" filter="url(#paperShadow)">
            <rect x="0" y="0" width="286" height="205" rx="20" fill="#FFFDF9"/>
            <rect x="12" y="12" width="262" height="181" rx="14" fill="#FFF7F8"/>
            <text x="143" y="38" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="15" font-weight="700" fill="#B82C3E">NỘI QUY</text>
            <text x="143" y="56" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" font-weight="700" fill="#B82C3E">DÀNH CHO PHỤ HUYNH</text>
            <rect x="26" y="74" width="210" height="7" rx="3.5" fill="#E3D9CE"/>
            <rect x="26" y="94" width="232" height="7" rx="3.5" fill="#EDE5DB"/>
            <rect x="26" y="114" width="196" height="7" rx="3.5" fill="#E3D9CE"/>
            <rect x="26" y="134" width="224" height="7" rx="3.5" fill="#EDE5DB"/>
            <rect x="26" y="154" width="175" height="7" rx="3.5" fill="#E3D9CE"/>
            <text x="143" y="182" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="10.5" font-weight="700" fill="#B82C3E">PHỤ HUYNH QUAN TÂM, PHỐI HỢP</text>
          </g>

          <g id="sign-thong-bao" transform="translate(2495, 1322)" filter="url(#paperShadow)">
            <rect x="0" y="0" width="286" height="205" rx="20" fill="#FFFDF9"/>
            <text x="143" y="36" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="16" font-weight="700" fill="#B82C3E">THÔNG BÁO</text>
            <rect x="28" y="60" width="102" height="96" rx="14" fill="#FFF4DC" transform="rotate(-2 79 108)"/>
            <circle cx="79" cy="68" r="5" fill="#E87A90"/>
            <rect x="150" y="64" width="104" height="86" rx="14" fill="#EBF8FA" transform="rotate(2 202 107)"/>
            <circle cx="202" cy="72" r="5" fill="#52A877"/>
          </g>
        </g>

        <!-- Hai trụ cổng & biển hiệu chính có ảnh logo đính kèm -->
        <g id="gate-pillars" filter="url(#paperShadow)">
          <rect x="1844" y="1142" width="78" height="474" rx="16" fill="url(#tealPillarGrad)"/>
          <rect x="1834" y="1126" width="98" height="24" rx="12" fill="#FFFDF9"/>
          <rect x="2338" y="1142" width="78" height="474" rx="16" fill="url(#tealPillarGrad)"/>
          <rect x="2328" y="1126" width="98" height="24" rx="12" fill="#FFFDF9"/>
        </g>

        <g id="gate-sign-group">
          <g id="national-flag" transform="translate(1878, 1126)">
            <line x1="0" y1="4" x2="-46" y2="-134" stroke="#9B9B9B" stroke-width="6" stroke-linecap="round"/>
            <g class="anim-flag" style="transform-origin:-46px -134px;">
              <path d="M -46 -134 Q -92 -146 -134 -128 L -120 -66 Q -78 -80 -34 -68 Z" fill="#D9383A" filter="url(#softShadow)"/>
              <polygon points="-84,-120 -79,-106 -65,-106 -76,-98 -72,-84 -84,-92 -96,-84 -92,-98 -103,-106 -89,-106" fill="#FFE15A"/>
            </g>
          </g>

          <!-- BIỂN HIỆU DÙNG LOGO ĐÍNH KÈM + SỐ ĐIỆN THOẠI MỚI -->
          <g id="main-signboard" transform="translate(1855, 932)" filter="url(#paperShadow)">
            <rect x="0" y="0" width="550" height="194" rx="22" fill="#FFFDF9"/>
            <text x="22" y="26" font-family="Be Vietnam Pro, sans-serif" font-size="11.5" font-weight="600" fill="#4B4440">UBND XÃ SƠN TỊNH</text>
            <text x="322" y="34" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="22" font-weight="700" fill="#C43B59">LỚP MẦM NON ĐỘC LẬP</text>
            <image href="assets/images/logo-hoa-sen.png" x="23" y="47" width="82" height="82" clip-path="url(#signboardLogoClip)"/>
            <text x="324" y="106" text-anchor="middle" font-family="Fraunces, serif" font-size="56" font-weight="700" letter-spacing="3">
              <tspan fill="#D94854">H</tspan><tspan fill="#2E7D5B">O</tspan><tspan fill="#2E3A67">A </tspan><tspan fill="#E85A77">S</tspan><tspan fill="#2D4A8C">E</tspan><tspan fill="#C94E87">N</tspan>
            </text>
            <path d="M 14 144 L 385 144 Q 396 165 385 186 L 14 186 Q 8 165 14 144 Z" fill="#2E9D5C"/>
            <path d="M 385 144 L 536 144 Q 542 165 536 186 L 385 186 Q 396 165 385 144 Z" fill="#F4D35E"/>
            <text x="24" y="162" font-family="Be Vietnam Pro, sans-serif" font-size="10.8" font-weight="500" fill="#FFFDF9">Địa chỉ: Lâm Lộc, Sơn Tịnh, Quảng Ngãi</text>
            <text x="24" y="179" font-family="Quicksand, sans-serif" font-size="11.5" font-weight="700" fill="#FFFDF9">ĐT: 0868.474.194 • 0975.551.545</text>
            <text x="466" y="162" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="9.2" font-weight="600" fill="#2C2A29">QĐ Số: 1815/QĐ-UBND</text>
            <text x="466" y="177" text-anchor="middle" font-family="Be Vietnam Pro, sans-serif" font-size="8.8" font-weight="500" fill="#2C2A29">ngày 08/12/2025</text>
          </g>
        </g>
      </g>

      <!-- Cành lá tiền cảnh bo tròn góc ngoài -->
      <g class="foreground-foliage" opacity="0.9">
        <path d="M -80 1580 Q 45 1420 135 1515 Q 50 1630 -80 1660 Z" fill="#469668"/>
        <path d="M 3260 1540 Q 3120 1410 3045 1510 Q 3130 1640 3260 1660 Z" fill="#469668"/>
      </g>
    </g>
  </svg>
  `;

  // Gắn 2 cánh cổng rời vào lớp tiền cảnh màn hình để mở đều sang hai bên khung hình mà KHÔNG biến mất hay dồn sang phải
  const stageViewport = document.getElementById("stage-viewport");
  if (stageViewport && !document.getElementById("gate-doors-portal")) {
    const portal = document.createElement("div");
    portal.id = "gate-doors-portal";
    portal.className = "gate-doors-portal";
    portal.setAttribute("aria-hidden", "true");
    portal.innerHTML = `
      <svg id="gate-leaf-left" class="gate-door-wing is-left" viewBox="0 0 220 420" preserveAspectRatio="none">
        <rect x="8" y="10" width="204" height="400" rx="16" fill="#46B8DA" opacity="0.22"/>
        <g fill="#42B2D4">
          <rect x="16" y="8" width="13" height="404" rx="6.5"/>
          <rect x="42" y="8" width="13" height="404" rx="6.5"/>
          <rect x="68" y="8" width="13" height="404" rx="6.5"/>
          <rect x="94" y="8" width="13" height="404" rx="6.5"/>
          <rect x="120" y="8" width="13" height="404" rx="6.5"/>
          <rect x="146" y="8" width="13" height="404" rx="6.5"/>
          <rect x="172" y="8" width="13" height="404" rx="6.5"/>
          <rect x="198" y="8" width="13" height="404" rx="6.5"/>
        </g>
        <rect x="10" y="268" width="202" height="12" rx="6" fill="#E87A90"/>
        <rect x="10" y="392" width="202" height="14" rx="7" fill="#E87A90"/>
        <rect x="10" y="268" width="12" height="138" rx="6" fill="#E87A90"/>
        <rect x="200" y="268" width="12" height="138" rx="6" fill="#E87A90"/>
      </svg>

      <svg id="gate-leaf-right" class="gate-door-wing is-right" viewBox="0 0 220 420" preserveAspectRatio="none">
        <rect x="8" y="10" width="204" height="400" rx="16" fill="#46B8DA" opacity="0.22"/>
        <g fill="#42B2D4">
          <rect x="10" y="8" width="13" height="404" rx="6.5"/>
          <rect x="36" y="8" width="13" height="404" rx="6.5"/>
          <rect x="62" y="8" width="13" height="404" rx="6.5"/>
          <rect x="88" y="8" width="13" height="404" rx="6.5"/>
          <rect x="114" y="8" width="13" height="404" rx="6.5"/>
          <rect x="140" y="8" width="13" height="404" rx="6.5"/>
          <rect x="166" y="8" width="13" height="404" rx="6.5"/>
          <rect x="192" y="8" width="13" height="404" rx="6.5"/>
        </g>
        <rect x="8" y="268" width="202" height="12" rx="6" fill="#E87A90"/>
        <rect x="8" y="392" width="202" height="14" rx="7" fill="#E87A90"/>
        <rect x="8" y="268" width="12" height="138" rx="6" fill="#E87A90"/>
        <rect x="198" y="268" width="12" height="138" rx="6" fill="#E87A90"/>
      </svg>
    `;
    stageViewport.appendChild(portal);
  }
}
