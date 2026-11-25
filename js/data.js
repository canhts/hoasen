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
      label: "Thời gian hoạt động",
      text: "Từ 6h30 sáng, đến 17h00 chiều",
    },
    maps: {
      buttonLabel: "Chỉ đường Google Maps",
      directUrl:
        "https://www.google.com/maps/search/?api=1&query=15.157905572390417%2C108.73893262715227",
      embedUrl:
        "https://maps.google.com/maps?q=15.157905572390417,108.73893262715227&t=&z=17&ie=UTF8&iwloc=&output=embed",
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
   * 3. KỊCH BẢN 11 CHẶNG SCROLLYTELLING LIỀN MẠCH TOÀN TRANG
   * Thứ tự không gian Tầng trệt (Trái -> Phải):
   * [Sân chơi chính] — [Lớp Nhà trẻ] — [Lớp Mẫu giáo bé] — [Văn phòng & Cầu thang] — [Kho dụng cụ & Bếp chữ L]
   * Luồng tham quan: Cổng (1) -> Văn phòng & Bếp (2) -> Sân chơi (3) -> Nhà trẻ (4) -> Mẫu giáo bé (5) -> Cầu thang (6) -> Mẫu giáo nhỡ (7) -> Mẫu giáo lớn (8) -> Khoảnh khắc (9) -> Cô giáo (10) -> Liên hệ (11)
   */
  chapters: [
    {
      id: "gate",
      stepLabel: "1",
      navTitle: "Cổng Hoa Sen",
      eyebrow: "Chặng 1 • Chạm ngõ yêu thương",
      title: "Chào ba mẹ ghé thăm ngôi nhà nhỏ Hoa Sen!",
      story:
        "Từ mặt đường rộng trước cổng nhìn vào, hàng rào xi măng sơn màu tươi sáng chạy dọc hai bên cổng đón nắng mai Sơn Tịnh. Bên trái là lá cờ Tổ quốc và bảng Nội quy phụ huynh, bên phải là bảng Thông báo gọn gàng. Mời ba mẹ cuộn nhẹ để hai cánh cổng mở rộng đón bước chân vào sân trường nhé!",
      badges: [
        { text: "Nhận trẻ 5 tháng – 6 tuổi", tone: "pink" },
        { text: "QĐ 1815/QĐ-UBND", tone: "teal" },
      ],
      highlights: [
        "Hàng rào xi măng sơn màu tươi tắn, kiên cố và an toàn",
        "Thời gian hoạt động: Từ 6h30 sáng, đến 17h00 chiều",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 1185, y: 1320, width: 1240, offsetX: 0.16, offsetY: 0 },
        tablet: { x: 1185, y: 1330, width: 1120, offsetX: 0, offsetY: 0 },
        mobile: { x: 1185, y: 1340, width: 920, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "veranda-kitchen",
      stepLabel: "2",
      navTitle: "Văn phòng & Bếp",
      eyebrow: "Chặng 2 • Tầng trệt bên phải",
      title: "Văn phòng Camera 24/7 cùng khu Kho – Bếp chữ L",
      story:
        "Bước qua cổng là Hiên chính với dãy cột hồng phấn, dây hoa rực rỡ và đối diện ngay là Văn phòng trường. Điểm ba mẹ yên tâm nhất là toàn trường có hệ thống camera giám sát 24/7 giúp phụ huynh dễ dàng dõi theo mọi hoạt động của con hằng ngày. Liền kề bên phải là Kho dụng cụ ngăn nắp nối liền khu Bếp nấu xoay chữ L kéo dài từ cạnh sau ra gần hàng rào trước với cửa mở hướng thẳng ra hành lang.",
      badges: [
        { text: "Camera giám sát 24/7", tone: "teal" },
        { text: "Kho dụng cụ & Bếp chữ L", tone: "green" },
      ],
      highlights: [
        "Hệ thống camera giám sát 24/7 đồng hành cùng sự an tâm của ba mẹ",
        "Kho dụng cụ & Bếp nấu nối liền hình chữ L, mở cửa thoáng ra hành lang",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 1685, y: 1475, width: 1420, offsetX: 0.16, offsetY: 0.02 },
        tablet: { x: 1680, y: 1495, width: 1160, offsetX: 0, offsetY: 0 },
        mobile: { x: 1700, y: 1505, width: 920, offsetX: 0, offsetY: 0 },
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
        desktop: { x: 655, y: 845, width: 920, offsetX: -0.16, offsetY: 0.02 },
        tablet: { x: 655, y: 845, width: 840, offsetX: 0, offsetY: 0 },
        mobile: { x: 655, y: 845, width: 680, offsetX: 0, offsetY: 0 },
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
        desktop: { x: 955, y: 1010, width: 820, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 955, y: 1010, width: 760, offsetX: 0, offsetY: 0 },
        mobile: { x: 955, y: 1010, width: 600, offsetX: 0, offsetY: 0 },
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
        desktop: { x: 1200, y: 1150, width: 820, offsetX: -0.17, offsetY: 0.02 },
        tablet: { x: 1200, y: 1150, width: 760, offsetX: 0, offsetY: 0 },
        mobile: { x: 1200, y: 1150, width: 600, offsetX: 0, offsetY: 0 },
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
        desktop: { x: 1705, y: 1255, width: 960, offsetX: 0.16, offsetY: 0.01 },
        tablet: { x: 1705, y: 1255, width: 880, offsetX: 0, offsetY: 0 },
        mobile: { x: 1705, y: 1255, width: 700, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "floor2-nho",
      stepLabel: "7",
      navTitle: "Mẫu giáo nhỡ",
      eyebrow: "Chặng 7 • Lầu 2 bên phải cầu thang",
      title: "Lớp Mẫu giáo nhỡ — Sân chơi & góc sáng tạo của Cô Hồng",
      story:
        "Bước lên Lầu 2 dọc hành lang thoáng rộng phía trước là Lớp Mẫu giáo nhỡ do Cô Hồng phụ trách. Lớp nối liền ra khoảng sân chơi nhỏ bên phải được bảo vệ bởi hàng rào sắt an toàn, có giá vẽ mỹ thuật, bàn học nhóm và góc đồ chơi gọn sạch.",
      badges: [
        { text: "4 – 5 tuổi", tone: "sun" },
        { text: "Cô Hồng", tone: "pink" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Hành lang Lầu 2 nối liền mạch từ cầu thang tới hai sân chơi hai đầu",
        "Hàng rào sắt bao quanh 3 cạnh Lầu 2 bảo đảm an toàn cho bé",
      ],
      cardSide: "left",
      camera: {
        desktop: { x: 2295, y: 1125, width: 980, offsetX: 0.16, offsetY: 0.02 },
        tablet: { x: 2295, y: 1125, width: 900, offsetX: 0, offsetY: 0 },
        mobile: { x: 2295, y: 1125, width: 720, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "floor2-lon",
      stepLabel: "8",
      navTitle: "Mẫu giáo lớn",
      eyebrow: "Chặng 8 • Lầu 2 bên trái cầu thang",
      title: "Lớp Mẫu giáo lớn — Vững bước sẵn sàng vào Lớp 1",
      story:
        "Đi dọc hành lang Lầu 2 sang tay trái là Lớp Mẫu giáo lớn của Cô Nga và Cô Vy — điểm dừng cuối trong hành trình tham quan ngôi trường. Bàn học ngay ngắn hướng bảng chữ cái, tủ sách đa sắc màu và sân chơi nhỏ bên trái giúp bé rèn nề nếp tự tin bước vào Lớp 1.",
      badges: [
        { text: "5 – 6 tuổi", tone: "pink" },
        { text: "Cô Nga • Cô Vy", tone: "green" },
        { text: "Nhà vệ sinh riêng khép kín cho trẻ", tone: "teal" },
      ],
      highlights: [
        "Góc sách & bảng chữ cái rèn thói quen học tập chuẩn bị vào Lớp 1",
        "Nối thẳng ra sân chơi nhỏ bên trái rào sắt an toàn 3 cạnh",
      ],
      cardSide: "right",
      camera: {
        desktop: { x: 1520, y: 805, width: 1040, offsetX: -0.2, offsetY: 0.02 },
        tablet: { x: 1580, y: 785, width: 920, offsetX: 0, offsetY: 0 },
        mobile: { x: 1610, y: 785, width: 740, offsetX: 0, offsetY: 0 },
      },
    },
    {
      id: "gallery",
      stepLabel: "9",
      navTitle: "Khoảnh khắc",
      eyebrow: "Chặng 9 • Dây cờ ảnh kỷ niệm",
      title: "Khoảnh khắc rạng rỡ treo tự nhiên trên bầu trời Hoa Sen",
    },
    {
      id: "teachers",
      stepLabel: "10",
      navTitle: "Cô giáo",
      eyebrow: "Chặng 10 • Vườn Hoa Sen yêu thương",
      title: "Đội ngũ cô giáo tận tâm đồng hành từng lớp học",
    },
    {
      id: "contact",
      stepLabel: "11",
      navTitle: "Liên hệ",
      eyebrow: "Chặng 11 • Bưu thiếp chiều nắng ấm",
      title: "Lời hẹn ghé thăm Lớp Mầm Non Độc Lập Hoa Sen",
    },
  ],

  /**
   * 4. CHẶNG 9: KHOẢNH KHẮC NỔI BẬT (BỐ CỤC TREO TỰ DO, LỆCH TẦNG TỰ NHIÊN)
   */
  gallery: {
    eyebrow: "Chặng 9 • Dây cờ ảnh kỷ niệm",
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
   * 5. CHẶNG 10: ĐỘI NGŨ GIÁO VIÊN PHỤ TRÁCH CHÍNH XÁC TỪNG LỚP
   */
  teachersSection: {
    eyebrow: "Chặng 10 • Vườn Hoa Sen yêu thương",
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
   * 6. CHẶNG 11: BƯU THIẾP LIÊN HỆ CHIỀU NẮNG ẤM TẠI SƠN TỊNH
   */
  contactSection: {
    eyebrow: "Chặng 11 • Bưu thiếp chiều nắng ấm tại Sơn Tịnh",
    subtitle:
      "Cánh cổng Hoa Sen luôn rộng mở đón phụ huynh đến tham quan lớp học, theo dõi hệ thống camera và trò chuyện cùng các cô.",
    stampLabel: "Sơn Tịnh • 2025",
    decisionLabel: "Quyết định thành lập",
    addressLabel: "Địa chỉ Google Maps",
    hoursTitle: "Thời gian hoạt động",
    contactsTitle: "Liên hệ phụ huynh",
  },
};
