/**
 * ============================================================================
 * TỆP DỮ LIỆU DUY NHẤT (SINGLE SOURCE OF TRUTH) - LỚP MẦM NON ĐỘC LẬP HOA SEN
 * ============================================================================
 * Hướng dẫn dành cho Chủ trường / Quản trị viên:
 * - Toàn bộ câu chữ giới thiệu, thông tin 4 lớp, danh sách ảnh hoạt động,
 *   thông tin các cô giáo và liên hệ đều nằm tập trung tại đây.
 * - Chỉ cần sửa nội dung bên trong dấu ngoặc kép "..." hoặc đường dẫn ảnh,
 *   giao diện trang web sẽ tự động cập nhật mà không cần chạm vào mã đồ họa.
 * ============================================================================
 */

export const SCHOOL_DATA = {
  /**
   * 1. THÔNG TIN CHUNG & PHÁP LÝ CỦA CƠ SỞ
   */
  schoolInfo: {
    name: "Lớp Mầm Non Độc Lập Hoa Sen",
    shortName: "Mầm Non Hoa Sen",
    authority: "UBND xã Sơn Tịnh",
    decision: "QĐ Số 1815/QĐ-UBND ngày 08/12/2025 của UBND xã Sơn Tịnh",
    address: "Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh, tỉnh Quảng Ngãi",
    phoneDisplay: "0919.040317",
    phoneHref: "tel:0919040317",
    zaloHref: "https://zalo.me/0919040317",
    hours: {
      morningLabel: "Đón trẻ buổi sáng",
      morningTime: "6h30 – 7h30",
      afternoonLabel: "Trả trẻ buổi chiều",
      afternoonTime: "16h00 – 17h00",
    },
    maps: {
      buttonLabel: "Chỉ đường Google Maps",
      directUrl:
        "https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+L%C3%A2m+L%E1%BB%99c+Nam,+x%C3%A3+S%C6%A1n+T%E1%BB%8Bnh,+Qu%E1%BA%A3ng+Ng%C3%A3i",
      embedUrl:
        "https://maps.google.com/maps?q=Th%C3%B4n%20L%C3%A2m%20L%E1%BB%99c%20Nam,%20x%C3%A3%20S%C6%A1n%20T%E1%BB%8Bnh,%20Qu%E1%BA%A3ng%20Ng%C3%A3i&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    seoDescription:
      "Chuyến tham quan tương tác 2D giới thiệu Lớp Mầm Non Độc Lập Hoa Sen tại Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh, tỉnh Quảng Ngãi — ngôi nhà nhỏ ấm áp dành cho trẻ từ 5 tháng đến 6 tuổi.",
  },

  /**
   * 2. NHÃN GIAO DIỆN & GỢI Ý CUỘN TRANG
   */
  uiText: {
    brandTag: "Sơn Tịnh • Quảng Ngãi",
    scrollHint: "Cuộn nhẹ xuống để mở cổng trường",
    quickCallLabel: "Gọi 0919.040317",
    stepPrefix: "Chặng",
    galleryHint: "Bấm vào từng tấm ảnh để phóng to và vuốt xem trọn bộ kỷ niệm",
    lightboxClose: "Đóng",
    lightboxPrev: "Ảnh trước",
    lightboxNext: "Ảnh sau",
    skipToContact: "Xem liên hệ",
  },

  /**
   * 3. KỊCH BẢN 8 CHẶNG THAM QUAN LIỀN MẠCH
   * Lưu ý: Có thể chỉnh sửa tiêu đề, lời kể (story), thẻ điểm nhấn (badges)
   * và các ý nổi bật (highlights). Không thay đổi trường "id" và "camera".
   */
  chapters: [
    {
      id: "gate",
      stepLabel: "1",
      navTitle: "Cổng Hoa Sen",
      eyebrow: "Chặng 1 • Chạm ngõ yêu thương",
      title: "Chào ba mẹ ghé thăm ngôi nhà nhỏ Hoa Sen!",
      story:
        "Từ xa nhìn lại, hàng rào gỗ bảy sắc cầu vồng đã mỉm cười vẫy chào rồi kìa. Lá cờ Tổ quốc khẽ bay trong gió mai Sơn Tịnh, hai bên cổng là bảng Nội quy chu đáo và góc Thông báo xinh xắn. Mời ba mẹ đẩy nhẹ cánh cổng xanh viền hồng, bước chậm vào sân trường cùng lắng nghe một ngày thật vui của các con nhé!",
      badges: [
        { text: "Nhận trẻ 5 tháng – 6 tuổi", tone: "pink" },
        { text: "QĐ 1815/QĐ-UBND", tone: "teal" },
      ],
      highlights: [
        "Mặt tiền thoáng sáng, hàng rào gỗ pastel an toàn",
        "Đón trẻ mỗi sáng từ 6h30 trong không khí thân thương",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2130, y: 1275, width: 1620, offsetX: 0.16, offsetY: 0 },
        tablet: { x: 2130, y: 1280, width: 1460, offsetX: 0, offsetY: 0 },
        mobile: { x: 2130, y: 1290, width: 1220, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "veranda-kitchen",
      stepLabel: "2",
      navTitle: "Hiên & Bếp",
      eyebrow: "Chặng 2 • Tầng trệt ấm áp",
      title: "Qua hiên hoa rực rỡ, ghé Văn phòng & Bếp thơm",
      story:
        "Vừa qua cổng, ba mẹ sẽ gặp ngay hàng cột hồng phấn tròn trịa cùng những dải hoa rực rỡ đung đưa dọc Hiên chính — nơi các con quây quần ăn xế và trò chuyện ríu rít. Đối diện cổng là Văn phòng nhỏ gọn để ba mẹ trao đổi đầu giờ, còn ngay bên phải là góc Bếp bán trú luôn tỏa làn hơi ấm thơm lừng bên bảng Thực đơn tuần và Kho ngăn nắp.",
      badges: [
        { text: "Hiên sinh hoạt thoáng mát", tone: "pink" },
        { text: "Thực đơn tuần cân đối", tone: "green" },
      ],
      highlights: [
        "Văn phòng đối diện cổng chính, thuận tiện đón – trả trẻ",
        "Bếp nấu một chiều sạch sẽ, thực đơn đổi món mỗi ngày",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2560, y: 1285, width: 1420, offsetX: 0.14, offsetY: 0.02 },
        tablet: { x: 2560, y: 1280, width: 1260, offsetX: 0, offsetY: 0 },
        mobile: { x: 2660, y: 1280, width: 880, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "nursery",
      stepLabel: "3",
      navTitle: "Nhà trẻ",
      eyebrow: "Chặng 3 • Góc nhỏ êm ái",
      title: "Lớp Nhà trẻ — Nơi những bước chân đầu đời được nâng niu",
      story:
        "Nằm ngay sát Văn phòng để các cô tiện chăm chút từng giấc ngủ, Lớp Nhà trẻ lúc nào cũng thoảng mùi phấn thơm dịu nhẹ. Dưới ánh đèn vàng ấm vừa bật sáng, thảm xốp êm ru, gối nệm nhỏ xinh và rổ đồ chơi khối mềm pastel sẵn sàng ôm ấp các bé út ít nhà Hoa Sen tập lẫy, tập đi và bi bô những tiếng gọi cô đầu tiên.",
      badges: [
        { text: "5 – 36 tháng", tone: "sun" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Thảm xốp mềm toàn sàn, đồ chơi bo tròn không góc nhọn",
        "Chăm giấc ngủ trưa và cữ sữa riêng theo từng tháng tuổi",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 1695, y: 1285, width: 960, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 1695, y: 1280, width: 880, offsetX: 0, offsetY: 0 },
        mobile: { x: 1695, y: 1280, width: 660, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "preschool-small",
      stepLabel: "4",
      navTitle: "Mẫu giáo bé",
      eyebrow: "Chặng 4 • Thế giới sắc màu",
      title: "Lớp Mẫu giáo bé — Mỗi ngày thêm một bông Hoa Bé Ngoan",
      story:
        "Nối bước sang căn phòng rộn tiếng cười bên cạnh, ba mẹ sẽ bắt gặp góc xếp hình sáng tạo, những chiếc bàn tô màu lấm tấm sắc cầu vồng và bảng Hoa Bé Ngoan ai cũng háo hức ngắm mỗi chiều. Ở tuổi lên ba, các con bắt đầu biết tự xúc cơm, biết xếp dép ngay ngắn và kể rành rọt chuyện ở lớp cho ông bà nghe.",
      badges: [
        { text: "3 – 4 tuổi", tone: "pink" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Góc xếp hình, tô màu kích thích đôi tay khéo léo",
        "Bảng Hoa Bé Ngoan khích lệ nề nếp tự lập mỗi ngày",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 1115, y: 1285, width: 960, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 1115, y: 1280, width: 880, offsetX: 0, offsetY: 0 },
        mobile: { x: 1115, y: 1280, width: 660, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "playground",
      stepLabel: "5",
      navTitle: "Sân chơi",
      eyebrow: "Chặng 5 • Ngoài cùng bên trái",
      title: "Sân chơi chính rộn ràng dưới vòm mái che mát rượi",
      story:
        "Và đây rồi, 'tọa độ' các bạn nhỏ mong chờ nhất mỗi sáng: Sân chơi chính phủ thảm cỏ xanh mướt, có mái che khung sắt xanh ngọc cao ráo tránh nắng mưa và cờ dây bay phấp phới! Nào cầu trượt vèo một cái là tới thảm cỏ, xích đu khẽ nhún theo tiếng hát, vòng quay tíu tít và góc đá bóng mini cho những 'cầu thủ nhí' tung hoành.",
      badges: [
        { text: "Thảm cỏ nhân tạo êm ái", tone: "green" },
        { text: "Mái che thoáng mát quanh năm", tone: "teal" },
      ],
      highlights: [
        "Cầu trượt, xích đu, vòng quay và góc đá bóng mini",
        "Bóng cây xanh rợp mát cùng hàng rào bao quanh an toàn",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 450, y: 1245, width: 1040, offsetX: -0.16, offsetY: 0.02 },
        tablet: { x: 450, y: 1245, width: 940, offsetX: 0, offsetY: 0 },
        mobile: { x: 450, y: 1245, width: 800, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "stairs",
      stepLabel: "6",
      navTitle: "Cầu thang",
      eyebrow: "Chặng 6 • Lên tầng gió mát",
      title: "Men theo tay vịn bảy sắc, ngắm đóa Sen hồng nở rộ",
      story:
        "Tạm biệt sân chơi tầng trệt, mời ba mẹ dạo bước qua khu cầu thang ngay cạnh Văn phòng nhé. Từng bậc thang xám sạch sẽ có tay vịn sắt nhiều màu rực rỡ nâng bước chân nhỏ; ngay chiếu nghỉ là bức tranh Hoa Sen hồng đang khẽ hé cánh dưới dải hoa treo, mở lối lên không gian Lầu 2 tràn ngập ánh sáng.",
      badges: [
        { text: "Tay vịn an toàn theo tầm bé", tone: "sun" },
        { text: "Tranh Hoa Sen chiếu nghỉ", tone: "pink" },
      ],
      highlights: [
        "Độ dốc bậc thang vừa phải, chống trơn trượt",
        "Đón gió trời tự nhiên kết nối hai tầng lớp học",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2365, y: 1030, width: 920, offsetX: 0.17, offsetY: 0.01 },
        tablet: { x: 2365, y: 1030, width: 860, offsetX: 0, offsetY: 0 },
        mobile: { x: 2375, y: 1020, width: 640, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "floor2",
      stepLabel: "7",
      navTitle: "Lầu 2",
      eyebrow: "Chặng 7 • Gác nhỏ sáng trong",
      title: "Lầu 2: Lớp Mẫu giáo nhỡ & Lớp Mẫu giáo lớn chuẩn bị vào Lớp 1",
      story:
        "Lên tới Lầu 2 sau lớp rèm sọc xanh ngọc mát dịu là thế giới của các anh chị lớn. Rẽ tay phải là Lớp Mẫu giáo nhỡ (4 – 5 tuổi) rộn rã bàn học nhóm, góc vẽ nghệ thuật và khoảng sân chơi nhỏ gọn bên phải cho bé học tập, ăn xế ngoài trời.",
      storySecondStop:
        "Đi ngang lối cầu thang sang tay trái là Lớp Mẫu giáo lớn (5 – 6 tuổi) với bàn ghế ngay ngắn, bảng chữ cái và góc sách chuẩn bị hành trang vững vàng vào Lớp 1, nối liền sân chơi nhỏ xinh bên trái đầy ắp nắng nhẹ.",
      /** Hai lớp riêng trên Lầu 2 (hiển thị đủ thẻ lớp & điểm nhấn) */
      subClasses: [
        {
          id: "floor2-nho",
          positionHint: "Bên phải cầu thang",
          name: "Lớp Mẫu giáo nhỡ",
          description:
            "Không gian khơi gợi trí tò mò với bàn học nhóm, góc vẽ sáng tạo và sân chơi nhỏ bên phải gọn sạch cho giờ sinh hoạt, ăn uống.",
          badges: [
            { text: "4 – 5 tuổi", tone: "sun" },
            { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
          ],
          camera: {
            desktop: { x: 2700, y: 490, width: 1120, offsetX: 0.16, offsetY: 0.03 },
            tablet: { x: 2700, y: 495, width: 980, offsetX: 0, offsetY: 0 },
            mobile: { x: 2720, y: 495, width: 840, offsetX: 0, offsetY: 0 },
          },
        },
        {
          id: "floor2-lon",
          positionHint: "Bên trái cầu thang",
          name: "Lớp Mẫu giáo lớn",
          description:
            "Góc sách thân thiện, bảng chữ cái và nề nếp học tập nhẹ nhàng giúp bé tự tin vào Lớp 1, kèm sân chơi nhỏ bên trái thoáng đãng.",
          badges: [
            { text: "5 – 6 tuổi", tone: "pink" },
            { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
          ],
          camera: {
            desktop: { x: 1460, y: 490, width: 1200, offsetX: -0.16, offsetY: 0.03 },
            tablet: { x: 1460, y: 495, width: 1020, offsetX: 0, offsetY: 0 },
            mobile: { x: 1440, y: 495, width: 920, offsetX: 0, offsetY: 0 },
          },
        },
      ],
      badges: [
        { text: "4 – 5 tuổi & 5 – 6 tuổi", tone: "pink" },
        { text: "2 sân chơi nhỏ gọn bên trái & phải", tone: "green" },
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2700, y: 490, width: 1120, offsetX: 0.16, offsetY: 0.03 },
        tablet: { x: 2700, y: 495, width: 980, offsetX: 0, offsetY: 0 },
        mobile: { x: 2720, y: 495, width: 840, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "epilogue",
      stepLabel: "8",
      navTitle: "Kỷ niệm & Liên hệ",
      eyebrow: "Chặng 8 • Dòng chảy yêu thương",
      title: "Những khoảnh khắc thật, nụ cười cô giáo & lời hẹn tại Sơn Tịnh",
      story:
        "Đường nét kể chuyện khẽ nối dài thành dây cờ ảnh kỷ niệm, đưa ba mẹ ngắm lại nụ cười trong trẻo của các con, gặp gỡ các cô giáo trong Vườn Hoa Sen và lưu lại tấm bưu thiếp chiều nắng ấm khi ghé thăm trường.",
      badges: [
        { text: "Ảnh hoạt động thực tế", tone: "pink" },
        { text: "Gần gũi như gia đình", tone: "sun" },
      ],
      cardSide: "center",
    },
  ],

  /**
   * 4. CHẶNG 8: KHOẢNH KHẮC NỔI BẬT (DÂY CỜ ẢNH KỶ NIỆM)
   * Đường dẫn ảnh trỏ vào thư mục assets/images/
   */
  gallery: {
    eyebrow: "Dây cờ ảnh kỷ niệm",
    title: "Khoảnh khắc rạng rỡ của bé ở Hoa Sen",
    subtitle:
      "Mỗi tấm ảnh nhỏ kẹp trên dây cờ là một ngày vui có thật tại lớp học, sân chơi và sân khấu của các con.",
    photos: [
      {
        src: "assets/images/hien-chinh-lop-hoc.jpg",
        title: "Giờ sinh hoạt rộn ràng ở Hiên chính",
        caption: "Hàng cột hồng phấn, dây hoa rực rỡ cùng những bàn ghế nhỏ đầy ắp tiếng cười.",
        tag: "Hiên chính",
        tilt: -2.6,
      },
      {
        src: "assets/images/san-choi-chinh.jpg",
        title: "Sáng tinh mơ trên Sân chơi cỏ xanh",
        caption: "Không gian rộng rãi dưới mái che thoáng mát, cờ dây tung bay mỗi ngày.",
        tag: "Sân chơi",
        tilt: 2.2,
      },
      {
        src: "assets/images/lop-hoc-vui-ve.jpg",
        title: "Cả lớp giơ tay chào buổi sáng",
        caption: "Phòng học sáng sủa vẽ tranh phong cảnh hiền hòa và cửa kính thoáng gió.",
        tag: "Lớp học",
        tilt: -1.8,
      },
      {
        src: "assets/images/sinh-nhat-be.jpg",
        title: "Bé thêm tuổi mới cùng bạn bè",
        caption: "Chiếc bánh kem nhỏ xinh và niềm vui sẻ chia ngay tại lớp học thân quen.",
        tag: "Sinh nhật bé",
        tilt: 2.8,
      },
      {
        src: "assets/images/van-nghe-bieu-dien.jpg",
        title: "Tự tin tỏa sáng trên sân khấu",
        caption: "Những bước nhảy hồn nhiên trong ngày hội văn nghệ thiếu nhi 1/6.",
        tag: "Văn nghệ",
        tilt: -2.2,
      },
      {
        src: "assets/images/trao-thuong-be.jpg",
        title: "Ngày tổng kết trọn vẹn niềm tự hào",
        caption: "Các con hân hoan nhận giấy khen cùng phần quà nhỏ từ thầy cô Hoa Sen.",
        tag: "Tổng kết",
        tilt: 1.9,
      },
      {
        src: "assets/images/cong-truong.jpg",
        title: "Mặt tiền Cổng trường Hoa Sen",
        caption: "Biển hiệu thân quen, hàng rào nhiều màu cùng bảng Nội quy và Thông báo.",
        tag: "Cổng trường",
        tilt: -2.4,
      },
      {
        src: "assets/images/le-tong-ket.jpg",
        title: "Lưu giữ kỷ niệm năm học 2025 – 2026",
        caption: "Một chặng đường khôn lớn đầy ắp yêu thương của đại gia đình Hoa Sen.",
        tag: "Kỷ niệm",
        tilt: 2.1,
      },
    ],
  },

  /**
   * 5. ĐỘI NGŨ CÔ GIÁO HOA SEN (VƯỜN HOA SEN YÊU THƯƠNG)
   * Có thể thay trường photo bằng đường dẫn ảnh thật (vd: "assets/images/co-lan.jpg").
   * Nếu để trống "" hoặc ảnh chưa có, hệ thống tự động hiển thị chân dung minh họa SVG dịu dàng.
   */
  teachersSection: {
    eyebrow: "Vườn Hoa Sen yêu thương",
    title: "Những người gieo mầm dịu dàng mỗi sớm mai",
    subtitle:
      "Mỗi lớp học đều có các cô gắn bó kiên nhẫn, đón từng bước chân bé bỏng bằng sự ân cần như người mẹ thứ hai.",
    members: [
      {
        name: "Cô phụ trách Nhà trẻ",
        role: "Giáo viên chăm sóc trẻ",
        classLabel: "Lớp Nhà trẻ (5 – 36 tháng)",
        quote: "Ôm con thật dịu khi sáng mới vào lớp, ru con ngủ tròn giấc giữa trưa hè.",
        photo: "",
        accent: "pink",
        avatarPalette: { hair: "#3B2F2F", skin: "#FCE0CD", dress: "#F4A3B4", collar: "#FFFDF9" },
      },
      {
        name: "Cô phụ trách Mẫu giáo bé",
        role: "Giáo viên mầm non",
        classLabel: "Lớp Mẫu giáo bé (3 – 4 tuổi)",
        quote: "Cùng con tập cầm bút sáp đầu tiên và reo vui trước mỗi bông Hoa Bé Ngoan.",
        photo: "",
        accent: "teal",
        avatarPalette: { hair: "#43342E", skin: "#FDE2D0", dress: "#69BEC9", collar: "#FFFDF9" },
      },
      {
        name: "Cô phụ trách Mẫu giáo nhỡ",
        role: "Giáo viên mầm non",
        classLabel: "Lớp Mẫu giáo nhỡ (4 – 5 tuổi)",
        quote: "Lắng nghe hàng trăm câu hỏi 'tại sao' và cùng con tô vẽ cả khu vườn mơ ước.",
        photo: "",
        accent: "green",
        avatarPalette: { hair: "#362C2B", skin: "#FCDCCB", dress: "#73BD92", collar: "#FFFDF9" },
      },
      {
        name: "Cô phụ trách Mẫu giáo lớn",
        role: "Giáo viên mầm non",
        classLabel: "Lớp Mẫu giáo lớn (5 – 6 tuổi)",
        quote: "Nhẹ nhàng gieo thói quen đọc sách, giúp con tự tin bước qua ngưỡng cửa Lớp 1.",
        photo: "",
        accent: "sun",
        avatarPalette: { hair: "#3B2F2F", skin: "#FCE1CE", dress: "#F4C96B", collar: "#FFFDF9" },
      },
    ],
  },

  /**
   * 6. BƯU THIẾP LIÊN HỆ CHIỀU NẮNG ẤM TẠI SƠN TỊNH
   */
  contactSection: {
    eyebrow: "Bưu thiếp chiều nắng ấm tại Sơn Tịnh",
    title: "Mời ba mẹ ghé chơi với Hoa Sen bất cứ chiều nào",
    subtitle:
      "Cánh cổng Hoa Sen luôn rộng mở đón phụ huynh đến tham quan lớp học, trò chuyện cùng các cô và cảm nhận không khí ấm áp của trường.",
    stampLabel: "Sơn Tịnh • 2025",
    callActionText: "Gọi điện tư vấn",
    zaloActionText: "Nhắn qua Zalo",
    decisionLabel: "Quyết định thành lập",
    addressLabel: "Địa chỉ cơ sở",
    hoursTitle: "Giờ đón – trả trẻ mỗi ngày",
  },
};
