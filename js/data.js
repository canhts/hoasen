/**
 * ============================================================================
 * TỆP DỮ LIỆU DUY NHẤT (SINGLE SOURCE OF TRUTH) - LỚP MẦM NON ĐỘC LẬP HOA SEN
 * ============================================================================
 */

export const SCHOOL_DATA = {
  /**
   * 1. THÔNG TIN CHUNG, PHÁP LÝ & LIÊN HỆ CỦA CƠ SỞ
   */
  schoolInfo: {
    name: "Lớp Mầm Non Độc Lập Hoa Sen",
    shortName: "Mầm Non Hoa Sen",
    logoSrc: "assets/images/logo-hoa-sen.png",
    authority: "UBND xã Sơn Tịnh",
    decision: "QĐ Số 1815/QĐ-UBND ngày 08/12/2025 của UBND xã Sơn Tịnh",
    address: "5P5Q+5G8, Lâm Lộc, Sơn Tịnh, Quảng Ngãi 53217, Việt Nam",
    detailAddress: "Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh, tỉnh Quảng Ngãi",
    phoneDisplay: "0868.474.194",
    phoneHref: "tel:0868474194",
    contacts: [
      {
        label: "Chú Cảnh",
        role: "Quản lý cơ sở",
        phoneDisplay: "0868.474.194",
        phoneHref: "tel:0868474194",
        zaloHref: "https://zalo.me/0868474194",
      },
      {
        label: "Cô Hường",
        role: "Phụ trách chuyên môn",
        phoneDisplay: "0975.551.545",
        phoneHref: "tel:0975551545",
        zaloHref: "https://zalo.me/0975551545",
      },
    ],
    hours: {
      morningLabel: "Đón trẻ buổi sáng",
      morningTime: "6h30 – 7h30",
      afternoonLabel: "Trả trẻ buổi chiều",
      afternoonTime: "16h00 – 17h00",
    },
    maps: {
      buttonLabel: "Chỉ đường Google Maps",
      directUrl:
        "https://www.google.com/maps/search/?api=1&query=5P5Q%2B5G8%2C+L%C3%A2m+L%E1%BB%99c%2C+S%C6%A1n+T%E1%BB%8Bnh%2C+Qu%E1%BA%A3ng+Ng%C3%A3i+53217%2C+Vi%E1%BB%87t+Nam",
      embedUrl:
        "https://maps.google.com/maps?q=5P5Q%2B5G8,%20L%C3%A2m%20L%E1%BB%99c,%20S%C6%A1n%20T%E1%BB%8Bnh,%20Qu%E1%BA%A3ng%20Ng%C3%A3i%2053217,%20Vi%E1%BB%87t%20Nam&t=&z=16&ie=UTF8&iwloc=&output=embed",
    },
    seoDescription:
      "Chuyến tham quan tương tác 2D giới thiệu Lớp Mầm Non Độc Lập Hoa Sen tại Lâm Lộc, Sơn Tịnh, Quảng Ngãi — ngôi nhà nhỏ ấm áp cho trẻ 5 tháng đến 6 tuổi.",
  },

  /**
   * 2. NHÃN GIAO DIỆN CHUNG
   */
  uiText: {
    brandTag: "Sơn Tịnh • Quảng Ngãi",
    scrollHint: "Cuộn nhẹ xuống để mở rộng hai cánh cổng trường",
    stepPrefix: "Chặng",
    galleryHint: "Bấm vào từng tấm ảnh đang treo để phóng to và vuốt xem trọn bộ kỷ niệm",
    skipToContact: "Liên hệ",
  },

  /**
   * 3. KỊCH BẢN 10 CHẶNG SCROLLYTELLING LIỀN MẠCH TOÀN TRANG
   * Thứ tự không gian Tầng trệt (Trái -> Phải):
   * [Sân chơi chính] — [Lớp Nhà trẻ] — [Lớp Mẫu giáo bé] — [Văn phòng & Cầu thang] — [Kho dụng cụ -> Thực đơn tuần -> Bếp nấu]
   * Luồng tham quan: Cổng -> Văn phòng & Bếp -> Sân chơi chính -> Nhà trẻ -> Mẫu giáo bé -> Cầu thang -> Lầu 2 -> Khoảnh khắc -> Giáo viên -> Liên hệ
   */
  chapters: [
    {
      id: "gate",
      stepLabel: "1",
      navTitle: "Cổng Hoa Sen",
      eyebrow: "Chặng 1 • Chạm ngõ yêu thương",
      title: "Chào ba mẹ ghé thăm ngôi nhà nhỏ Hoa Sen!",
      story:
        "Từ đầu ngõ nhìn vào, hàng rào xi măng được sơn màu tươi sáng chạy dọc hai bên cổng đã rạng rỡ đón nắng mai Sơn Tịnh. Bên trái là lá cờ Tổ quốc và bảng Nội quy phụ huynh, bên phải là góc Thông báo gọn gàng. Mời ba mẹ cuộn nhẹ để hai cánh cổng xanh viền hồng khẽ mở sang hai bên nhé!",
      badges: [
        { text: "Nhận trẻ 5 tháng – 6 tuổi", tone: "pink" },
        { text: "QĐ 1815/QĐ-UBND", tone: "teal" },
      ],
      highlights: [
        "Hàng rào xi măng sơn màu tươi tắn, kiên cố và an toàn",
        "Đón trẻ buổi sáng 6h30 – 7h30 trong không khí thân thương",
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
      navTitle: "Văn phòng & Bếp",
      eyebrow: "Chặng 2 • Tầng trệt bên phải",
      title: "Văn phòng Camera 24/7 cùng dãy Kho – Thực đơn – Bếp nấu",
      story:
        "Bước qua cổng là Hiên chính với dãy cột hồng phấn, dây hoa rực rỡ và đối diện ngay là Văn phòng trường. Điểm ba mẹ yên tâm nhất là toàn trường có hệ thống camera giám sát 24/7 giúp phụ huynh dễ dàng dõi theo mọi hoạt động của con hằng ngày. Liền kề bên phải Văn phòng theo đúng thứ tự là Kho dụng cụ ngăn nắp, bảng Thực đơn tuần đầy đủ dinh dưỡng và góc Bếp nấu ấm thơm.",
      badges: [
        { text: "Camera giám sát 24/7", tone: "teal" },
        { text: "Kho dụng cụ → Thực đơn tuần → Bếp nấu", tone: "green" },
      ],
      highlights: [
        "Hệ thống camera giám sát 24/7 đồng hành cùng sự an tâm của ba mẹ",
        "Khu vực bán trú bố trí một chiều: Kho dụng cụ → Thực đơn tuần → Bếp nấu",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2630, y: 1280, width: 1460, offsetX: 0.15, offsetY: 0.02 },
        tablet: { x: 2640, y: 1280, width: 1300, offsetX: 0, offsetY: 0 },
        mobile: { x: 2700, y: 1280, width: 920, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "playground",
      stepLabel: "3",
      navTitle: "Sân chơi",
      eyebrow: "Chặng 3 • Ngoài cùng bên trái",
      title: "Từ Văn phòng & Bếp bước thẳng ra Sân chơi chính rộn ràng!",
      story:
        "Rời khu vực Văn phòng và Bếp, mời ba mẹ chuyển tiếp thẳng ra Sân chơi chính thoáng đãng ngoài cùng bên trái! Dưới mái che khung sắt xanh ngọc cao ráo và những dây cờ mềm mại, thảm cỏ xanh êm mượt ôm lấy cầu trượt, xích đu, vòng quay cùng góc đá bóng mini luôn rộn rã tiếng cười giòn tan của các bé.",
      badges: [
        { text: "Thảm cỏ nhân tạo êm ái", tone: "green" },
        { text: "Mái che thoáng mát quanh năm", tone: "teal" },
      ],
      highlights: [
        "Cầu trượt, xích đu, vòng quay và góc đá bóng mini bo tròn an toàn",
        "Bóng cây xanh mát cùng hàng rào xi măng sơn màu bao quanh",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 450, y: 1245, width: 1040, offsetX: -0.16, offsetY: 0.02 },
        tablet: { x: 450, y: 1245, width: 940, offsetX: 0, offsetY: 0 },
        mobile: { x: 450, y: 1245, width: 800, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "nursery",
      stepLabel: "4",
      navTitle: "Nhà trẻ",
      eyebrow: "Chặng 4 • Sát bên Sân chơi chính",
      title: "Lớp Nhà trẻ — Ấm áp ngay cạnh Sân chơi chính",
      story:
        "Liền kề ngay sát Sân chơi chính là Lớp Nhà trẻ dành cho các thiên thần nhỏ nhất nhà Hoa Sen, được Cô Loan và Cô Ánh ân cần chăm sóc từng bữa ăn, giấc ngủ. Dưới ánh đèn vàng dịu êm vừa bật sáng, thảm xốp mềm mại, gối nệm xinh và đồ chơi khối mềm tông pastel nâng niu từng bước chân đầu đời.",
      badges: [
        { text: "5 – 36 tháng", tone: "sun" },
        { text: "Cô Loan • Cô Ánh", tone: "pink" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Nằm sát Sân chơi chính, không gian ấm êm và an toàn tuyệt đối",
        "Đồ chơi khối mềm, góc nghỉ ngơi êm ái theo từng tháng tuổi",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 1110, y: 1280, width: 960, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 1110, y: 1280, width: 880, offsetX: 0, offsetY: 0 },
        mobile: { x: 1110, y: 1280, width: 660, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "preschool-small",
      stepLabel: "5",
      navTitle: "Mẫu giáo bé",
      eyebrow: "Chặng 5 • Giữa Nhà trẻ và Văn phòng",
      title: "Lớp Mẫu giáo bé — Rộn ràng góc xếp hình & Hoa Bé Ngoan",
      story:
        "Bước tiếp sang căn phòng kế bên là Lớp Mẫu giáo bé của Cô Hải và Cô Yến. Ở đây có góc xếp hình sáng tạo, bàn tô màu rực rỡ và bảng Hoa Bé Ngoan ai cũng háo hức ngắm mỗi chiều. Các bạn nhỏ lên ba bắt đầu học tự lập từ việc cất ba lô, xếp dép và gửi lời chào lễ phép tới ba mẹ.",
      badges: [
        { text: "3 – 4 tuổi", tone: "pink" },
        { text: "Cô Hải • Cô Yến", tone: "sun" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Nằm giữa Lớp Nhà trẻ và Văn phòng, thuận tiện quan sát & sinh hoạt",
        "Bảng Hoa Bé Ngoan và góc vẽ kích thích sự khéo léo mỗi ngày",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 1690, y: 1280, width: 960, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 1690, y: 1280, width: 880, offsetX: 0, offsetY: 0 },
        mobile: { x: 1690, y: 1280, width: 660, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "stairs",
      stepLabel: "6",
      navTitle: "Cầu thang",
      eyebrow: "Chặng 6 • Lên tầng gió mát",
      title: "Men theo tay vịn nhiều màu dịu dàng lên Lầu 2",
      story:
        "Ngay cạnh Văn phòng là khu cầu thang sáng thoáng dẫn lên Lầu 2. Từng bậc thang xám sạch sẽ có tay vịn sắt bo tròn phối nhiều sắc màu tươi vui vừa tầm tay nhỏ, ô cửa kính chiếu nghỉ đón trọn ánh nắng tự nhiên cùng dải hoa treo lung linh trên cao.",
      badges: [
        { text: "Tay vịn an toàn theo tầm bé", tone: "sun" },
        { text: "Chiếu nghỉ thoáng sáng gió trời", tone: "teal" },
      ],
      highlights: [
        "Độ dốc bậc thang vừa phải, chống trơn trượt cho các bé",
        "Kết nối liền mạch không gian tầng trệt và các lớp Lầu 2",
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
      title: "Lầu 2: Lớp Mẫu giáo nhỡ & Lớp Mẫu giáo lớn vào Lớp 1",
      story:
        "Lên tới Lầu 2 sau lớp rèm sọc xanh ngọc mát dịu là không gian của các anh chị lớn. Rẽ tay phải là Lớp Mẫu giáo nhỡ do Cô Hồng phụ trách với bàn học nhóm, góc vẽ nghệ thuật và khoảng sân chơi nhỏ bên phải gọn sạch cho giờ sinh hoạt, ăn xế.",
      storySecondStop:
        "Đi ngang lối cầu thang sang tay trái là Lớp Mẫu giáo lớn cùng Cô Nga và Cô Vy với bảng chữ cái, góc sách thân thiện giúp bé tự tin bước vào Lớp 1, nối liền sân chơi nhỏ xinh bên trái ngập tràn nắng nhẹ.",
      subClasses: [
        {
          id: "floor2-nho",
          positionHint: "Bên phải cầu thang",
          name: "Lớp Mẫu giáo nhỡ",
          description:
            "Không gian khơi gợi trí tò mò cùng Cô Hồng với bàn học nhóm, góc vẽ sáng tạo và sân chơi nhỏ bên phải gọn sạch.",
          badges: [
            { text: "4 – 5 tuổi", tone: "sun" },
            { text: "Cô Hồng", tone: "pink" },
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
            "Góc sách thân thiện, bảng chữ cái cùng Cô Nga & Cô Vy rèn nề nếp vào Lớp 1, kèm sân chơi nhỏ bên trái thoáng đãng.",
          badges: [
            { text: "5 – 6 tuổi", tone: "pink" },
            { text: "Cô Nga • Cô Vy", tone: "green" },
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
      id: "gallery",
      stepLabel: "8",
      navTitle: "Khoảnh khắc",
      eyebrow: "Chặng 8 • Dây cờ ảnh kỷ niệm",
      title: "Khoảnh khắc rạng rỡ treo tự nhiên trên bầu trời Hoa Sen",
    },
    {
      id: "teachers",
      stepLabel: "9",
      navTitle: "Cô giáo",
      eyebrow: "Chặng 9 • Vườn Hoa Sen yêu thương",
      title: "Đội ngũ cô giáo tận tâm đồng hành từng lớp học",
    },
    {
      id: "contact",
      stepLabel: "10",
      navTitle: "Liên hệ",
      eyebrow: "Chặng 10 • Bưu thiếp chiều nắng ấm",
      title: "Lời hẹn ghé thăm Lớp Mầm Non Độc Lập Hoa Sen",
    },
  ],

  /**
   * 4. CHẶNG 8: KHOẢNH KHẮC NỔI BẬT (BỐ CỤC TREO TỰ DO, LỆCH TẦNG TỰ NHIÊN)
   */
  gallery: {
    eyebrow: "Chặng 8 • Dây cờ ảnh kỷ niệm",
    title: "Khoảnh khắc rạng rỡ của bé ở Hoa Sen",
    subtitle:
      "Những tấm ảnh thật được kẹp ngẫu nhiên trên dây cờ mềm mại — bấm vào từng ảnh để phóng to và vuốt xem trọn bộ.",
    photos: [
      {
        src: "assets/images/hien-chinh-lop-hoc.jpg",
        title: "Giờ sinh hoạt rộn ràng ở Hiên chính",
        caption: "Hàng cột hồng phấn, dây hoa rực rỡ cùng những bàn ghế nhỏ đầy ắp tiếng cười.",
        tag: "Hiên chính",
        tilt: -4.2,
        drop: 6,
      },
      {
        src: "assets/images/san-choi-chinh.jpg",
        title: "Sáng tinh mơ trên Sân chơi cỏ xanh",
        caption: "Không gian rộng rãi dưới mái che thoáng mát, cờ dây tung bay mỗi ngày.",
        tag: "Sân chơi",
        tilt: 3.4,
        drop: 32,
      },
      {
        src: "assets/images/lop-hoc-vui-ve.jpg",
        title: "Cả lớp giơ tay chào buổi sáng",
        caption: "Phòng học sáng sủa vẽ tranh phong cảnh hiền hòa và cửa kính thoáng gió.",
        tag: "Lớp học",
        tilt: -2.8,
        drop: -8,
      },
      {
        src: "assets/images/sinh-nhat-be.jpg",
        title: "Bé thêm tuổi mới cùng bạn bè",
        caption: "Chiếc bánh kem nhỏ xinh và niềm vui sẻ chia ngay tại lớp học thân quen.",
        tag: "Sinh nhật bé",
        tilt: 4.5,
        drop: 24,
      },
      {
        src: "assets/images/van-nghe-bieu-dien.jpg",
        title: "Tự tin tỏa sáng trên sân khấu",
        caption: "Những bước nhảy hồn nhiên trong ngày hội văn nghệ thiếu nhi 1/6.",
        tag: "Văn nghệ",
        tilt: -3.6,
        drop: 28,
      },
      {
        src: "assets/images/trao-thuong-be.jpg",
        title: "Ngày tổng kết trọn vẹn niềm tự hào",
        caption: "Các con hân hoan nhận giấy khen cùng phần quà nhỏ từ thầy cô Hoa Sen.",
        tag: "Tổng kết",
        tilt: 2.7,
        drop: -6,
      },
      {
        src: "assets/images/cong-truong.jpg",
        title: "Mặt tiền Cổng trường Hoa Sen",
        caption: "Biển hiệu thân quen, hàng rào xi măng sơn màu cùng bảng Nội quy và Thông báo.",
        tag: "Cổng trường",
        tilt: -4.1,
        drop: 18,
      },
      {
        src: "assets/images/le-tong-ket.jpg",
        title: "Lưu giữ kỷ niệm năm học 2025 – 2026",
        caption: "Một chặng đường khôn lớn đầy ắp yêu thương của đại gia đình Hoa Sen.",
        tag: "Kỷ niệm",
        tilt: 3.8,
        drop: 4,
      },
    ],
  },

  /**
   * 5. CHẶNG 9: ĐỘI NGŨ GIÁO VIÊN PHỤ TRÁCH CHÍNH XÁC TỪNG LỚP
   */
  teachersSection: {
    eyebrow: "Chặng 9 • Vườn Hoa Sen yêu thương",
    title: "Những cô giáo dịu dàng đồng hành cùng từng lớp",
    subtitle:
      "Mỗi độ tuổi tại Hoa Sen luôn có các cô tận tâm nâng niu, đón từng bước chân bé bằng sự ân cần như gia đình.",
    groups: [
      {
        classLabel: "Lớp Nhà trẻ (5 – 36 tháng)",
        namesDisplay: "Cô Loan • Cô Ánh",
        quote: "Ôm con thật dịu khi sáng mới vào lớp, chăm từng cữ sữa và ru con ngủ tròn giấc.",
        accent: "pink",
        teachers: [
          {
            name: "Cô Loan",
            photo: "",
            avatarPalette: { hair: "#3B2F2F", skin: "#FCE0CD", dress: "#F49EB0", collar: "#FFFDF9", hairStyle: "long" },
          },
          {
            name: "Cô Ánh",
            photo: "",
            avatarPalette: { hair: "#47352E", skin: "#FDE2D0", dress: "#F7B9C6", collar: "#FFFDF9", hairStyle: "bun" },
          },
        ],
      },
      {
        classLabel: "Lớp Mẫu giáo bé (3 – 4 tuổi)",
        namesDisplay: "Cô Hải • Cô Yến",
        quote: "Cùng con tập cầm bút sáp đầu tiên và reo vui trước mỗi bông Hoa Bé Ngoan.",
        accent: "teal",
        teachers: [
          {
            name: "Cô Hải",
            photo: "",
            avatarPalette: { hair: "#3A2D2B", skin: "#FCDCCB", dress: "#5FC0CE", collar: "#FFFDF9", hairStyle: "bob" },
          },
          {
            name: "Cô Yến",
            photo: "",
            avatarPalette: { hair: "#43342E", skin: "#FCE1CE", dress: "#8FD3DC", collar: "#FFFDF9", hairStyle: "long" },
          },
        ],
      },
      {
        classLabel: "Lớp Mẫu giáo nhỡ (4 – 5 tuổi)",
        namesDisplay: "Cô Hồng",
        quote: "Lắng nghe hàng trăm câu hỏi 'tại sao' và cùng con tô vẽ cả khu vườn mơ ước.",
        accent: "green",
        teachers: [
          {
            name: "Cô Hồng",
            photo: "",
            avatarPalette: { hair: "#362C2B", skin: "#FCDCCB", dress: "#72BE92", collar: "#FFFDF9", hairStyle: "bun" },
          },
        ],
      },
      {
        classLabel: "Lớp Mẫu giáo lớn (5 – 6 tuổi)",
        namesDisplay: "Cô Nga • Cô Vy",
        quote: "Nhẹ nhàng gieo thói quen đọc sách, giúp con tự tin bước qua ngưỡng cửa Lớp 1.",
        accent: "sun",
        teachers: [
          {
            name: "Cô Nga",
            photo: "",
            avatarPalette: { hair: "#3B2F2F", skin: "#FCE1CE", dress: "#F4C96B", collar: "#FFFDF9", hairStyle: "long" },
          },
          {
            name: "Cô Vy",
            photo: "",
            avatarPalette: { hair: "#47352E", skin: "#FDE2D0", dress: "#F7D98E", collar: "#FFFDF9", hairStyle: "bob" },
          },
        ],
      },
    ],
  },

  /**
   * 6. CHẶNG 10: BƯU THIẾP LIÊN HỆ CHIỀU NẮNG ẤM TẠI SƠN TỊNH
   */
  contactSection: {
    eyebrow: "Chặng 10 • Bưu thiếp chiều nắng ấm tại Sơn Tịnh",
    subtitle:
      "Cánh cổng Hoa Sen luôn rộng mở đón phụ huynh đến tham quan lớp học, theo dõi hệ thống camera và trò chuyện cùng các cô.",
    stampLabel: "Sơn Tịnh • 2025",
    decisionLabel: "Quyết định thành lập",
    addressLabel: "Địa chỉ Google Maps",
    hoursTitle: "Giờ đón – trả trẻ mỗi ngày",
    contactsTitle: "Liên hệ phụ huynh",
  },
};
