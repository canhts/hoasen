/**
 * ===================================================================
 * LỚP MẦM NON ĐỘC LẬP HOA SEN - NGUỒN DỮ LIỆU DUY NHẤT (SINGLE SOURCE OF TRUTH)
 * ===================================================================
 * Chủ trường hoặc quản trị viên chỉ cần chỉnh sửa nội dung trong file này:
 * - Thay đổi câu chữ giới thiệu các chặng
 * - Cập nhật thông tin 4 lớp học (độ tuổi, sĩ số, tiện ích...)
 * - Thay đổi danh sách hình ảnh hoạt động của các bé trong assets/images/
 * - Cập nhật thông tin giáo viên, số điện thoại, giờ đón trả trẻ...
 * Mọi thay đổi tại đây sẽ TỰ ĐỘNG hiển thị lên toàn bộ website mà không cần sửa code giao diện hay 3D!
 */

export const schoolData = {
  // --- THÔNG TIN CHUNG CỦA TRƯỜNG ---
  generalInfo: {
    name: "Lớp Mầm Non Độc Lập Hoa Sen",
    shortName: "Mầm Non Hoa Sen",
    slogan: "Ươm mầm yêu thương – Nâng bước tuổi thơ rạng rỡ",
    decision: "QĐ Số 1815/QĐ-UBND ngày 08/12/2025 của UBND xã Sơn Tịnh",
    address: "Đội 3, thôn Lâm Lộc Nam, xã Sơn Tịnh, tỉnh Quảng Ngãi",
    phone: "0919.040317",
    phoneTel: "tel:0919040317",
    zaloUrl: "https://zalo.me/0919040317",
    pickupHours: {
      morning: "6h30 – 7h30",
      afternoon: "16h00 – 17h00"
    },
    googleMapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+L%C3%A2m+L%E1%BB%99c+Nam,+S%C6%A1n+T%E1%BB%8Bnh,+Qu%E1%BA%A3ng+Ng%C3%A3i",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.646549220977!2d108.7423!3d15.2289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169f44ea595d7eb%3A0x82f4ff0ad35e4d2!2zTMOibSBM4buZYyBOYW0sIFPGoW4gVOG7i25oLCBRdeG6o25nIE5nw6Np!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn",
    enrollmentAge: "Nhận trẻ từ 5 tháng đến 6 tuổi"
  },

  // --- 8 CHẶNG HÀNH TRÌNH KHÁM PHÁ (ĐỒNG BỘ CAMERA 3D & TIMELINE CUỘN) ---
  timelineStops: [
    {
      id: "stop-1",
      stepNumber: 1,
      badge: "Cổng trường & Sảnh chính",
      title: "Chào mừng Ba Mẹ & Bé đến với Hoa Sen!",
      subtitle: "Ngôi trường nhỏ ngập tràn ánh nắng và nụ cười rạng rỡ",
      description: "Tọa lạc tại vùng quê yên bình Sơn Tịnh, Lớp Mầm Non Độc Lập Hoa Sen mở rộng cánh cổng rực rỡ sắc màu đón chào các thiên thần nhỏ. Với khuôn viên 2 tầng khang trang, hàng rào gỗ pastel sinh động cùng lá cờ đỏ sao vàng tung bay phấp phới, nơi đây là mái nhà thứ hai ấm cúng, an toàn và tràn ngập tiếng cười của bé.",
      stats: [
        { label: "Độ tuổi nhận trẻ", value: "5 tháng – 6 tuổi" },
        { label: "Không gian học tập", value: "2 tầng & 2 sân chơi" },
        { label: "Tiêu chuẩn vệ sinh", value: "WC riêng từng lớp" }
      ],
      callToAction: "Bắt đầu chuyến tham quan 3D ↓"
    },
    {
      id: "stop-2",
      stepNumber: 2,
      badge: "Tầng trệt · Hiên chính & Bếp thơm",
      title: "Hiên Cột Hồng & Góc Bếp Yêu Thương",
      subtitle: "Không gian sinh hoạt thoáng đãng, thơm lừng hương vị cơm ngon",
      description: "Bước qua cánh cổng, ba mẹ sẽ bắt gặp dãy cột tròn màu hồng phấn thân thiện cùng dàn hoa rực rỡ đón nắng sớm. Đây là hiên sinh hoạt chung nơi các con vui chơi ngoài trời mỗi sớm mai. Ngay phía trước là Văn phòng tiếp đón phụ huynh ân cần, kế bên là gian Bếp bán trú sạch bong, tuân thủ nguyên tắc một chiều với bảng thực đơn dinh dưỡng phong phú thay đổi từng tuần.",
      highlights: [
        "Hiên mát rượi với bàn ghế màu sắc cho bé ngắm nắng sớm và ăn nhẹ",
        "Văn phòng tiếp đón chu đáo, hồ sơ sổ sách minh bạch, rõ ràng",
        "Khu Bếp một chiều chuẩn ATTP, thực phẩm tươi sống mỗi ngày"
      ],
      tags: ["Hiên cột hồng", "Văn phòng thân thiện", "Bếp bán trú 1 chiều"]
    },
    {
      id: "stop-3",
      stepNumber: 3,
      badge: "Tầng trệt · Lớp Nhà trẻ",
      title: "Lớp Nhà Trẻ (5 – 36 tháng tuổi)",
      subtitle: "Vòng tay êm ái cho những bước chập chững đầu đời",
      description: "Dành riêng cho 'biệt đội bé xíu', phòng Nhà trẻ được lót thảm xốp chống va chạm êm ái, trang bị nôi cũi và nệm nằm êm dịu cùng các khối đồ chơi kích thích xúc giác an toàn tuyệt đối. Các cô luôn dịu dàng vỗ về, chăm chút từng cữ sữa, thìa cháo và giấc ngủ trưa ấm áp như ở bên mẹ.",
      badges: [
        "5 – 36 tháng",
        "Mỗi lớp có nhà vệ sinh riêng khép kín cho trẻ",
        "Sàn xốp êm mềm chống ngã",
        "Chăm sóc 1:1 tận tâm"
      ],
      roomFeatures: [
        "Thảm xốp mềm cao cấp bao phủ toàn bộ sàn phòng",
        "Góc ngủ riêng biệt với gối nệm thơm tho, thoáng khí",
        "Đồ chơi silicone & vải bông không góc cạnh, an toàn tối đa"
      ]
    },
    {
      id: "stop-4",
      stepNumber: 4,
      badge: "Tầng trệt · Lớp Mẫu giáo bé",
      title: "Lớp Mẫu Giáo Bé (3 – 4 tuổi)",
      subtitle: "Thế giới màu sắc & Những câu hỏi 'Vì sao lại thế?'",
      description: "Bước sang tuổi lên ba, các con bắt đầu bi bô khám phá thế giới xung quanh. Lớp Mẫu giáo bé được thiết kế rực rỡ với góc xếp hình thông minh, bàn ghế tô màu tí hon và bảng 'Hoa Bé Ngoan' khích lệ tinh thần tự lập của bé: tự xúc cơm, tự cất dép và chia sẻ đồ chơi cùng bạn bè.",
      badges: [
        "3 – 4 tuổi",
        "Mỗi lớp có nhà vệ sinh riêng khép kín cho trẻ",
        "Góc sáng tạo màu sáp",
        "Bảng Hoa Bé Ngoan"
      ],
      roomFeatures: [
        "Góc xếp hình lego & khối gỗ phát triển tư duy không gian",
        "Bàn ghế gỗ bo tròn chống trầy xước phù hợp vóc dáng trẻ",
        "Giá sách tranh cổ tích kích thích khả năng ngôn ngữ"
      ]
    },
    {
      id: "stop-5",
      stepNumber: 5,
      badge: "Tầng trệt · Sân chơi chính",
      title: "Sân Chơi Vận Động Rộn Rã Tiếng Cười",
      subtitle: "Giải phóng năng lượng dưới vòm mái che mát rượi",
      description: "Nằm ở góc trái khuôn viên là khu sân chơi chính ngoài trời có mái che cao ráo kiên cố, xua tan nỗi lo mưa nắng miền Trung. Thảm cỏ nhân tạo xanh mướt kết hợp viền gạch lát sạch sẽ cùng cầu trượt vui nhộn, xích đu, mâm quay và khung thành bóng đá mini giúp các con rèn luyện thể chất dẻo dai mỗi ngày.",
      highlights: [
        "Mái che khung sắt vòm cao thoáng mát bất kể thời tiết nắng mưa",
        "Thảm cỏ nhân tạo êm ái, giảm chấn thương khi chạy nhảy",
        "Trò chơi liên hoàn: Cầu trượt, xích đu, đu quay, bóng đá mini"
      ],
      tags: ["Vận động thể chất", "Mái che an toàn", "Cỏ nhân tạo êm mềm"]
    },
    {
      id: "stop-6",
      stepNumber: 6,
      badge: "Lên Cầu thang · Lầu 2",
      title: "Lớp Mẫu Giáo Nhỡ (4 – 5 tuổi)",
      subtitle: "Nâng niu óc sáng tạo & kỹ năng làm việc nhóm",
      description: "Men theo cầu thang với bức tranh đóa Sen hồng rực rỡ trên tường chiếu nghỉ, chúng ta tiến lên Lầu 2 thoáng đãng. Phía bên phải là Lớp Mẫu giáo nhỡ cùng khoảng sân chơi nhỏ đón gió. Tại đây, các bé thỏa sức vẽ tranh, đóng kịch, làm việc nhóm và cùng nhau thưởng thức những bữa xế thơm lành ngoài ban công mát mẻ.",
      badges: [
        "4 – 5 tuổi",
        "Mỗi lớp có nhà vệ sinh riêng khép kín cho trẻ",
        "Sân chơi nhỏ bên phải lớp",
        "Rèm sọc xanh cản nắng mát rượi"
      ],
      roomFeatures: [
        "Bàn học nhóm tròn khuyến khích giao tiếp và sẻ chia",
        "Sân chơi phụ liền kề phục vụ học tập trải nghiệm & ăn xế",
        "Góc hóa trang kịch nghệ rèn luyện sự tự tin trước đám đông"
      ]
    },
    {
      id: "stop-7",
      stepNumber: 7,
      badge: "Lầu 2 · Lớp Mẫu giáo lớn",
      title: "Lớp Mẫu Giáo Lớn (5 – 6 tuổi)",
      subtitle: "Vững vàng kiến thức & Tự tin bước vào Lớp 1",
      description: "Nằm bên trái cầu thang là lớp học của các 'anh chị cả' Hoa Sen. Không gian được trang bị bàn ghế học tập ngay ngắn, bảng làm quen chữ cái và con số, góc đọc sách phong phú. Kèm theo là sân chơi nhỏ bên trái thoáng đãng. Các con được rèn nếp ngồi học ngay ngắn, kỹ năng tự phục vụ và tâm thế tự tin nhất để chuẩn bị bước vào ngưỡng cửa trường tiểu học.",
      badges: [
        "5 – 6 tuổi",
        "Mỗi lớp có nhà vệ sinh riêng khép kín cho trẻ",
        "Sân chơi nhỏ bên trái lớp",
        "Hành trang vững chắc vào Lớp 1"
      ],
      roomFeatures: [
        "Góc làm quen Tiếng Việt & Toán học tư duy trực quan",
        "Bàn ghế chuẩn quy cách học đường cho độ tuổi 5-6",
        "Rèn nếp kỷ luật tích cực và tinh thần tự lập vượt trội"
      ]
    },
    {
      id: "stop-8",
      stepNumber: 8,
      badge: "Kết thúc hành trình",
      title: "Gửi Trọn Yêu Thương Cho Mầm Xanh Tương Lai",
      subtitle: "Ngôi nhà thứ hai – Nơi mỗi ngày đến trường là một ngày vui",
      description: "Mái ấm Hoa Sen luôn rộng mở chào đón các con và quý phụ huynh ghé thăm trực tiếp. Hãy để chúng tôi đồng hành cùng gia đình trên hành trình nuôi dưỡng những năm tháng ấu thơ rực rỡ và hạnh phúc nhất của bé yêu!",
      callToAction: "Xem ảnh hoạt động & Liên hệ tuyển sinh ↓"
    }
  ],

  // --- 4 LỚP HỌC CHI TIẾT (TỔNG HỢP) ---
  classes: [
    {
      id: "nha-tre",
      name: "Lớp Nhà Trẻ",
      ageRange: "5 – 36 tháng",
      location: "Tầng trệt (ở giữa Mẫu giáo bé và Văn phòng)",
      toiletNote: "Mỗi lớp đều có nhà vệ sinh riêng khép kín cho trẻ",
      icon: "baby",
      color: "#E87A90",
      description: "Chăm chút ân cần từng thìa cháo, cữ sữa, giấc ngủ êm cho các thiên thần nhỏ chập chững những bước đi đầu tiên."
    },
    {
      id: "mau-giao-be",
      name: "Lớp Mẫu Giáo Bé",
      ageRange: "3 – 4 tuổi",
      location: "Tầng trệt (sát Sân chơi chính bên trái)",
      toiletNote: "Mỗi lớp đều có nhà vệ sinh riêng khép kín cho trẻ",
      icon: "palette",
      color: "#F59E0B",
      description: "Thế giới màu sắc diệu kỳ, phát triển giác quan, ngôn ngữ và thói quen tự lập đầu đời qua trò chơi xếp hình, tô màu."
    },
    {
      id: "mau-giao-nho",
      name: "Lớp Mẫu Giáo Nhỡ",
      ageRange: "4 – 5 tuổi",
      location: "Lầu 2 (phía bên phải cầu thang)",
      toiletNote: "Mỗi lớp đều có nhà vệ sinh riêng khép kín cho trẻ",
      subPlayground: "Có sân chơi nhỏ riêng bên phải phục vụ học tập, sinh hoạt & ăn uống",
      icon: "puzzle",
      color: "#10B981",
      description: "Kích thích tư duy logic, hợp tác nhóm, kể chuyện sáng tạo và rèn luyện sự khéo léo của đôi bàn tay."
    },
    {
      id: "mau-giao-lon",
      name: "Lớp Mẫu Giáo Lớn",
      ageRange: "5 – 6 tuổi",
      location: "Lầu 2 (phía bên trái cầu thang)",
      toiletNote: "Mỗi lớp đều có nhà vệ sinh riêng khép kín cho trẻ",
      subPlayground: "Có sân chơi nhỏ riêng bên trái thoáng đãng",
      icon: "graduation-cap",
      color: "#2FA4B8",
      description: "Trang bị hành trang vững chắc: làm quen chữ cái, con số, rèn luyện nền nếp tự tin bước vào Lớp 1."
    }
  ],

  // --- KHOẢNH KHẮC HOẠT ĐỘNG CỦA BÉ (ALBUM ẢNH CHỤP THẬT) ---
  photoGallery: [
    {
      src: "assets/images/le-tong-ket.jpg",
      title: "Lễ tổng kết năm học & Văn nghệ thiếu nhi 1-6",
      caption: "Sân khấu rực rỡ sắc màu bong bóng trong ngày lễ bế giảng và đón Tết Thiếu nhi của các con."
    },
    {
      src: "assets/images/hien-chinh-lop-hoc.jpg",
      title: "Hiên cột hồng đón nắng sớm rạng rỡ",
      caption: "Các bé ngồi ngay ngắn trên ghế sắc màu tại hiên chính, sẵn sàng cho những giờ học vui nhộn."
    },
    {
      src: "assets/images/san-choi-chinh.jpg",
      title: "Giờ tập thể dục & vận động tại sân cỏ",
      caption: "Không gian sân chơi có mái che, thảm cỏ xanh mướt mát rượi giúp bé rèn luyện thể chất mỗi ngày."
    },
    {
      src: "assets/images/lop-hoc-vui-ve.jpg",
      title: "Nụ cười rạng rỡ trong lớp học Hoa Sen",
      caption: "Những nụ cười hồn nhiên và những cái vẫy tay đáng yêu của các con dưới mái trường yêu thương."
    },
    {
      src: "assets/images/trao-thuong-be.jpg",
      title: "Tự hào nhận phần thưởng Bé Ngoan Xuất Sắc",
      caption: "Niềm vui sướng của các bé khi cầm trên tay giấy khen và những món quà khích lệ ngọt ngào."
    },
    {
      src: "assets/images/sinh-nhat-be.jpg",
      title: "Bé thêm tuổi mới – Hoa điểm 10 rực rỡ",
      caption: "Tiệc sinh nhật ấm cúng bên cô giáo và bạn bè thân yêu với bánh kem và những lời chúc yêu thương."
    },
    {
      src: "assets/images/van-nghe-bieu-dien.jpg",
      title: "Tiết mục múa văn nghệ hồn nhiên của bé",
      caption: "Các vũ công nhí tự tin thể hiện những động tác múa duyên dáng trước sự cổ vũ của ba mẹ."
    },
    {
      src: "assets/images/cong-truong.jpg",
      title: "Mặt tiền & Cổng trường Hoa Sen thân thương",
      caption: "Cánh cổng xanh ngọc, hàng rào đa sắc cùng cờ Tổ quốc phấp phới đón chào bé mỗi ngày."
    }
  ],

  // --- ĐỘI NGŨ CÔ GIÁO HOA SEN ---
  teachers: [
    {
      name: "Cô Nguyễn Thị Mai",
      role: "Phụ trách chuyên môn & Lớp Mẫu giáo lớn (5 – 6t)",
      experience: "Hơn 9 năm kinh nghiệm mầm non",
      bio: "Luôn kiên nhẫn, thấu hiểu tâm lý trẻ và tâm huyết rèn luyện hành trang vững vàng nhất cho bé vào Lớp 1.",
      avatarBg: "#FCE7F3",
      avatarColor: "#BE185D"
    },
    {
      name: "Cô Trần Thị Thu Thảo",
      role: "Chủ nhiệm Lớp Mẫu giáo nhỡ (4 – 5t)",
      experience: "7 năm kinh nghiệm sư phạm mầm non",
      bio: "Đam mê tổ chức các hoạt động nghệ thuật, hội họa và múa hát giúp trẻ giải phóng trí tưởng tượng.",
      avatarBg: "#E0F2FE",
      avatarColor: "#0369A1"
    },
    {
      name: "Cô Lê Thị Hồng Hạnh",
      role: "Chủ nhiệm Lớp Mẫu giáo bé (3 – 4t)",
      experience: "6 năm đồng hành cùng trẻ thơ",
      bio: "Giọng nói truyền cảm, ấm áp, luôn khích lệ bé tự tin khám phá và tự lập trong sinh hoạt hàng ngày.",
      avatarBg: "#FEF3C7",
      avatarColor: "#B45309"
    },
    {
      name: "Cô Phạm Thị Thanh Trúc",
      role: "Phụ trách Lớp Nhà trẻ (5 – 36 tháng)",
      experience: "8 năm chăm sóc trẻ sơ sinh & chập chững",
      bio: "Đôi tay ân cần, yêu thương dịu dàng như người mẹ hiền thứ hai chăm sóc từng bữa ăn, giấc ngủ ngon của bé.",
      avatarBg: "#DCFCE7",
      avatarColor: "#15803D"
    }
  ],

  // --- ĐIỂM NỔI BẬT KHÁC BIỆT ---
  coreValues: [
    {
      icon: "shield-check",
      title: "An Toàn & Khép Kín",
      desc: "Mỗi phòng học đều có nhà vệ sinh riêng khép kín, sàn lót chống trơn trượt và camera giám sát toàn diện."
    },
    {
      icon: "heart",
      title: "Yêu Thương & Tận Tụy",
      desc: "Đội ngũ giáo viên chuẩn đào tạo sư phạm, giàu lòng trắc ẩn, chăm sóc trẻ bằng sự nhẫn nại và thấu hiểu."
    },
    {
      icon: "utensils",
      title: "Dinh Dưỡng Bán Trú 1 Chiều",
      desc: "Bếp nấu đạt chuẩn an toàn vệ sinh thực phẩm, thực đơn đổi mới từng tuần, nguồn nguyên liệu tươi sạch địa phương."
    },
    {
      icon: "sparkles",
      title: "Không Gian Mở Xanh Sạch",
      desc: "Sân chơi cỏ nhân tạo có mái che kiên cố, hiên đón nắng và các sân chơi vệ tinh thoáng mát đón gió trời."
    }
  ]
};
