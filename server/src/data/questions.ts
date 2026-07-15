import type { Question, ObstaclePuzzle } from "@vnr/shared";

// ============================================================================
// NGÂN HÀNG CÂU HỎI - VNR202 Chương 3: Thống nhất đất nước sau 1975
// (Nội dung mẫu - GV/nhóm có thể sửa/thêm thoải mái)
// ============================================================================

// ---- VÒNG 1: KHỞI ĐỘNG (10 câu trắc nghiệm) --------------------------------
export const ROUND1: Question[] = [
  {
    id: "r1-1",
    phase: "round1",
    type: "mcq",
    text: "Chiến dịch Hồ Chí Minh lịch sử kết thúc thắng lợi vào ngày nào?",
    options: [
      { id: "A", text: "30/4/1975" },
      { id: "B", text: "2/9/1975" },
      { id: "C", text: "30/4/1976" },
      { id: "D", text: "19/5/1975" },
    ],
    correctAnswer: "A",
    timeLimit: 15,
    points: 10,
    explanation: "11h30 ngày 30/4/1975, cờ giải phóng tung bay trên nóc Dinh Độc Lập.",
  },
  {
    id: "r1-2",
    phase: "round1",
    type: "mcq",
    text: "Hội nghị Hiệp thương chính trị thống nhất đất nước (11/1975) họp tại đâu?",
    options: [
      { id: "A", text: "Hà Nội" },
      { id: "B", text: "Sài Gòn" },
      { id: "C", text: "Huế" },
      { id: "D", text: "Đà Nẵng" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-3",
    phase: "round1",
    type: "mcq",
    text: "Cuộc Tổng tuyển cử bầu Quốc hội chung cả nước diễn ra ngày nào?",
    options: [
      { id: "A", text: "25/4/1976" },
      { id: "B", text: "30/4/1976" },
      { id: "C", text: "2/7/1976" },
      { id: "D", text: "6/1/1946" },
    ],
    correctAnswer: "A",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-4",
    phase: "round1",
    type: "mcq",
    text: "Quốc hội khóa VI (7/1976) quyết định đổi tên nước thành gì?",
    options: [
      { id: "A", text: "Việt Nam Dân chủ Cộng hòa" },
      { id: "B", text: "Cộng hòa Xã hội chủ nghĩa Việt Nam" },
      { id: "C", text: "Cộng hòa miền Nam Việt Nam" },
      { id: "D", text: "Liên bang Đông Dương" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-5",
    phase: "round1",
    type: "mcq",
    text: "Thành phố Sài Gòn - Gia Định được đổi tên thành Thành phố Hồ Chí Minh năm nào?",
    options: [
      { id: "A", text: "1975" },
      { id: "B", text: "1976" },
      { id: "C", text: "1977" },
      { id: "D", text: "1980" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-6",
    phase: "round1",
    type: "mcq",
    text: "Kỳ họp đầu tiên của Quốc hội khóa VI đã chọn Thủ đô của cả nước là?",
    options: [
      { id: "A", text: "Huế" },
      { id: "B", text: "TP Hồ Chí Minh" },
      { id: "C", text: "Hà Nội" },
      { id: "D", text: "Đà Nẵng" },
    ],
    correctAnswer: "C",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-7",
    phase: "round1",
    type: "mcq",
    text: "Sau năm 1975, nhiệm vụ hàng đầu về mặt nhà nước của Việt Nam là gì?",
    options: [
      { id: "A", text: "Phát triển du lịch" },
      { id: "B", text: "Thống nhất đất nước về mặt nhà nước" },
      { id: "C", text: "Gia nhập ASEAN" },
      { id: "D", text: "Mở cửa kinh tế" },
    ],
    correctAnswer: "B",
    timeLimit: 20,
    points: 10,
  },
  {
    id: "r1-8",
    phase: "round1",
    type: "mcq",
    text: "Quốc kỳ nước CHXHCN Việt Nam là?",
    options: [
      { id: "A", text: "Cờ đỏ sao vàng" },
      { id: "B", text: "Cờ búa liềm" },
      { id: "C", text: "Cờ nửa đỏ nửa xanh sao vàng" },
      { id: "D", text: "Cờ trắng sao đỏ" },
    ],
    correctAnswer: "A",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-9",
    phase: "round1",
    type: "mcq",
    text: "Việc thống nhất đất nước về mặt nhà nước có ý nghĩa gì quan trọng nhất?",
    options: [
      { id: "A", text: "Tạo sức mạnh tổng hợp đi lên CNXH" },
      { id: "B", text: "Tăng dân số" },
      { id: "C", text: "Mở rộng lãnh thổ" },
      { id: "D", text: "Thu hút đầu tư nước ngoài" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 10,
  },
  {
    id: "r1-10",
    phase: "round1",
    type: "mcq",
    text: "Quốc hội khóa VI là Quốc hội của?",
    options: [
      { id: "A", text: "Riêng miền Bắc" },
      { id: "B", text: "Riêng miền Nam" },
      { id: "C", text: "Nước Việt Nam thống nhất" },
      { id: "D", text: "Chính phủ lâm thời" },
    ],
    correctAnswer: "C",
    timeLimit: 15,
    points: 10,
  },
];

// ---- VÒNG 2: VƯỢT CHƯỚNG NGẠI VẬT ------------------------------------------
export const OBSTACLE: ObstaclePuzzle = {
  id: "obstacle-1",
  imageUrl: "/images/doi_moi_2.webp", // Sài Gòn xưa (trước Đổi mới)
  imageUrlAfter: "/images/doi_moi_1.jpg", // Sài Gòn nay (sau Đổi mới)
  keyword: "ĐỔI MỚI",
  keywordRevealed: false,
  cornersRevealed: [false, false, false, false],
  centerHint: {
    clue: "Công cuộc do Đại hội VI (12/1986) khởi xướng, đưa đất nước thoát khỏi khủng hoảng và từng bước chuyển sang cơ chế thị trường có sự quản lý của Nhà nước.",
    revealed: false,
  },
  rows: [
    {
      id: "row-1",
      clue: "Trong giai đoạn trước năm 1986, nền kinh tế Việt Nam lâm vào tình trạng nghiêm trọng nào, đòi hỏi phải có những quyết sách mang tính bước ngoặt?",
      answer: "KHỦNG HOẢNG",
      revealed: false,
    },
    {
      id: "row-2",
      clue: "Đại hội đại biểu toàn quốc lần thứ mấy của Đảng được tổ chức vào tháng 12 năm 1986?",
      answer: "VI",
      revealed: false,
    },
    {
      id: "row-3",
      clue: "Cơ chế quản lý kinh tế dựa vào tem phiếu và phân phối theo kế hoạch tập trung trước năm 1986 thường được gọi là gì?",
      answer: "BAO CẤP",
      revealed: false,
    },
    {
      id: "row-4",
      clue: "Sau những quyết sách từ năm 1986, nền kinh tế Việt Nam từng bước vận hành theo cơ chế nào có sự quản lý của Nhà nước?",
      answer: "THỊ TRƯỜNG",
      revealed: false,
    },
  ],
};

// ---- VÒNG 3: TĂNG TỐC (4 câu, tính điểm theo thời gian + độ chính xác) ------
export const ROUND3: Question[] = [
  {
    id: "r3-1",
    phase: "round3",
    type: "media",
    text: "Sắp xếp 4 sự kiện đối ngoại sau theo thứ tự thời gian TĂNG DẦN:",
    answerFormat: "sequence",
    music: "/music/tang_toc_sap_xep_cot_moc.mp3",
    options: [
      { id: "A", text: "Việt Nam gia nhập ASEAN", imageUrl: "/images/asean.avif", note: "28/7/1995" },
      {
        id: "B",
        text: "Bình thường hóa quan hệ Việt Nam - Trung Quốc",
        imageUrl: "/images/binhthuonghoatrungquoc.jpg",
        note: "10/11/1991",
      },
      { id: "C", text: "Việt Nam gia nhập APEC", imageUrl: "/images/apec.jpg", note: "14/11/1998" },
      {
        id: "D",
        text: "Bình thường hóa quan hệ Việt Nam - Hoa Kỳ",
        imageUrl: "/images/binhthuonghoahoaki.webp",
        note: "11/7/1995",
      },
    ],
    correctAnswer: "BDAC",
    timeLimit: 30,
    points: 20,
    explanation:
      "Trung Quốc (10/11/1991) → Hoa Kỳ (11/7/1995) → ASEAN (28/7/1995) → APEC (14/11/1998).",
  },
  {
    id: "r3-2",
    phase: "round3",
    type: "media",
    text: "Ghép mỗi ảnh với mốc thời gian đúng của sự kiện đó: chạm các thẻ mốc thời gian bên dưới lần lượt theo thứ tự ảnh 1 → 2 → 3 → 4.",
    answerFormat: "match",
    music: "/music/tang_toc_sap_xep_cot_moc.mp3",
    options: [
      {
        id: "A",
        text: "Chiến dịch Hồ Chí Minh toàn thắng",
        imageUrl: "/images/xetang.jpg",
        note: "30/4/1975",
      },
      {
        id: "B",
        text: "Kỳ họp thứ nhất Quốc hội khóa VI đổi tên nước",
        imageUrl: "/images/quoc_hoi_khoa_vi_doi_ten_nuoc.jpg",
        note: "2/7/1976",
      },
      {
        id: "C",
        text: "Hội nghị Hiệp thương chính trị thống nhất đất nước",
        imageUrl: "/images/hoinghihiepthuong.jpg",
        note: "21/11/1975",
      },
      {
        id: "D",
        text: "Tổng tuyển cử bầu Quốc hội chung cả nước",
        imageUrl: "/images/tongtuyencu.jpg",
        note: "25/4/1976",
      },
    ],
    matchOptions: [
      { id: "1", text: "21/11/1975" },
      { id: "2", text: "30/4/1975" },
      { id: "3", text: "2/7/1976" },
      { id: "4", text: "25/4/1976" },
    ],
    correctAnswer: "2314",
    timeLimit: 30,
    points: 20,
    explanation:
      "Xe tăng tiến vào Dinh Độc Lập (30/4/1975) → Hội nghị Hiệp thương chính trị thống nhất đất nước (21/11/1975) → Tổng tuyển cử bầu Quốc hội chung cả nước (25/4/1976) → Quốc hội khóa VI quyết định đổi tên nước (2/7/1976).",
  },
  {
    id: "r3-3",
    phase: "round3",
    type: "media",
    text: "Chuỗi sự kiện trên cùng phản ánh quá trình lịch sử nào?",
    music: "/music/tang_toc_sap_xep_cot_moc.mp3",
    timeline: [
      { imageUrl: "/images/cau3-hinh-1.jpg", date: "30/4/1975", label: "Giải phóng hoàn toàn miền Nam" },
      {
        imageUrl: "/images/cau2_anh2.jpg",
        date: "25/4/1976",
        label: "Tổng tuyển cử bầu Quốc hội chung cả nước",
      },
      {
        imageUrl: "/images/quoc_hoi_khoa_vi_doi_ten_nuoc.jpg",
        date: "2/7/1976",
        label: "Quốc hội quyết định tên nước là CHXHCN Việt Nam",
      },
    ],
    options: [
      { id: "A", text: "Hoàn thành thống nhất đất nước về mặt Nhà nước" },
      { id: "B", text: "Cuộc kháng chiến chống Mỹ, cứu nước" },
      { id: "C", text: "Công cuộc Đổi mới đất nước" },
      { id: "D", text: "Quá trình bình thường hóa quan hệ ngoại giao" },
    ],
    correctAnswer: "A",
    timeLimit: 25,
    points: 20,
  },
  {
    id: "r3-4",
    phase: "round3",
    type: "media",
    text: "Xem video gợi ý và cho biết: Ông là ai?",
    media: { kind: "video", url: "/images/V3_q4_nhanvat.mp4" },
    options: [
      { id: "A", text: "Nguyễn Văn Linh" },
      { id: "B", text: "Trường Chinh" },
      { id: "C", text: "Đỗ Mười" },
      { id: "D", text: "Lê Duẩn" },
    ],
    correctAnswer: "A",
    timeLimit: 30,
    points: 20,
    explanation:
      "Nguyễn Văn Linh (quê Hưng Yên) - Tổng Bí thư giai đoạn 12/1986-6/1991, người trực tiếp lãnh đạo triển khai công cuộc Đổi mới sau Đại hội VI.",
  },
];

// ---- VÒNG 4: VỀ ĐÍCH (kho câu hỏi - MC chọn khi đến lượt) -------------------
// Luu y: trong danh sach goc duoi day, dap an dung LUON la phuong an A cho de soan.
// Thu tu that su hien ra man hinh duoc dao lai o cuoi file (xem shuffleOptions).
const ROUND4_RAW: Question[] = [
  {
    id: "r4-1",
    phase: "round4",
    type: "finish",
    text: "Ý nghĩa lịch sử của việc thống nhất đất nước về mặt nhà nước năm 1976 là gì?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Tạo cơ sở pháp lý hoàn chỉnh để thống nhất, phát huy sức mạnh toàn dân tộc đi lên CNXH, nâng cao vị thế quốc tế.",
      },
      { id: "B", text: "Chấm dứt hoàn toàn ách đô hộ của thực dân Pháp trên cả nước." },
      { id: "C", text: "Mở đầu cuộc kháng chiến chống Mỹ cứu nước của dân tộc." },
      { id: "D", text: "Đưa Việt Nam gia nhập khối ASEAN ngay trong năm 1976." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-2",
    phase: "round4",
    type: "finish",
    text: "Vì sao nói thống nhất về mặt nhà nước là yêu cầu tất yếu, cấp bách sau 1975?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Vì một đất nước, một dân tộc nhưng tồn tại 2 nhà nước, 2 chính phủ là trái nguyện vọng; cần thống nhất để quản lý và xây dựng đất nước.",
      },
      { id: "B", text: "Vì các nước lớn yêu cầu Việt Nam phải sáp nhập hai miền." },
      { id: "C", text: "Vì miền Bắc cần nguồn nhân lực từ miền Nam để phát triển công nghiệp." },
      { id: "D", text: "Vì Hiến pháp năm 1946 quy định bắt buộc phải thống nhất trong năm 1976." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-3",
    phase: "round4",
    type: "finish",
    text: "Kỳ họp thứ nhất Quốc hội khóa VI (1976) đã thông qua những quyết định quan trọng nào?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Đổi tên nước thành CHXHCN Việt Nam; chọn Hà Nội là thủ đô; đổi tên Sài Gòn-Gia Định thành TP Hồ Chí Minh; quy định Quốc kỳ, Quốc huy, Quốc ca.",
      },
      { id: "B", text: "Ban hành Hiến pháp mới và thành lập Mặt trận Việt Minh." },
      { id: "C", text: "Quyết định tiến hành công cuộc Đổi mới toàn diện đất nước." },
      { id: "D", text: "Thành lập Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-4",
    phase: "round4",
    type: "finish",
    text: "Hội nghị Hiệp thương chính trị (11/1975) tại Sài Gòn đã nhất trí vấn đề gì?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Nhất trí hoàn toàn chủ trương, biện pháp thống nhất đất nước về mặt nhà nước." },
      { id: "B", text: "Nhất trí ký Hiệp định Paris chấm dứt chiến tranh, lập lại hòa bình." },
      { id: "C", text: "Nhất trí duy trì hai nhà nước riêng ở hai miền Nam - Bắc." },
      { id: "D", text: "Nhất trí gia nhập Liên Hợp Quốc ngay trong năm 1975." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-5",
    phase: "round4",
    type: "finish",
    text: "Kết quả cuộc Tổng tuyển cử ngày 25/4/1976 có ý nghĩa gì?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Hơn 23 triệu cử tri (98,8%) đi bầu, bầu ra 492 đại biểu Quốc hội chung, thể hiện ý chí thống nhất của toàn dân.",
      },
      { id: "B", text: "Chỉ có cử tri miền Bắc tham gia bầu ra 492 đại biểu." },
      { id: "C", text: "Bầu ra hai Quốc hội riêng cho hai miền Nam - Bắc." },
      { id: "D", text: "Khoảng 50% cử tri đi bầu, bầu ra Chính phủ lâm thời." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-6",
    phase: "round4",
    type: "finish",
    text: "Chiến dịch giải phóng Sài Gòn - Gia Định năm 1975 được Bộ Chính trị đặt tên là chiến dịch gì?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Chiến dịch Hồ Chí Minh (đặt tên ngày 14/4/1975), diễn ra từ 26/4 đến 30/4/1975, là trận quyết chiến chiến lược cuối cùng.",
      },
      { id: "B", text: "Chiến dịch Điện Biên Phủ." },
      { id: "C", text: "Chiến dịch Tây Nguyên." },
      { id: "D", text: "Chiến dịch Huế - Đà Nẵng." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-7",
    phase: "round4",
    type: "finish",
    text: "Thời điểm nào trong ngày 30/4/1975 đánh dấu miền Nam hoàn toàn được giải phóng?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Trưa 30/4/1975 (khoảng 11h30), xe tăng tiến vào Dinh Độc Lập, cờ tung bay trên nóc dinh; Dương Văn Minh tuyên bố đầu hàng vô điều kiện.",
      },
      { id: "B", text: "Sáng 30/4/1975, quân giải phóng tiến vào giải phóng thành phố Huế." },
      { id: "C", text: "Chiều 26/4/1975, mở màn chiến dịch tại Xuân Lộc." },
      { id: "D", text: "Ngày 2/5/1975, giải phóng hoàn toàn đảo Phú Quốc." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-8",
    phase: "round4",
    type: "finish",
    text: "Sau ngày 30/4/1975, về mặt nhà nước, đất nước ta lâm vào tình trạng đặc biệt nào cần sớm khắc phục?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Đã thống nhất về lãnh thổ nhưng vẫn tồn tại hai nhà nước, hai chính quyền (Bắc và Nam) — đòi hỏi phải thống nhất về mặt nhà nước.",
      },
      { id: "B", text: "Đất nước chưa được giải phóng hoàn toàn, còn chiến sự ở miền Nam." },
      { id: "C", text: "Cả nước đã có chung một Quốc hội và một Chính phủ." },
      { id: "D", text: "Miền Nam vẫn nằm dưới sự kiểm soát của quân đội nước ngoài." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-9",
    phase: "round4",
    type: "finish",
    text: "Hội nghị lần thứ 24 Ban Chấp hành Trung ương Đảng (9/1975) đã đề ra nhiệm vụ quan trọng nào?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Hoàn thành thống nhất đất nước về mặt nhà nước, đưa cả nước tiến nhanh, tiến mạnh lên chủ nghĩa xã hội.",
      },
      { id: "B", text: "Phát động toàn quốc kháng chiến chống Mỹ cứu nước." },
      { id: "C", text: "Tiến hành cải cách ruộng đất trên toàn miền Nam." },
      { id: "D", text: "Khởi xướng đường lối Đổi mới kinh tế toàn diện." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-10",
    phase: "round4",
    type: "finish",
    text: "Từ ngày 15 đến 21/11/1975, hội nghị nào được tổ chức tại Sài Gòn để bàn việc thống nhất đất nước?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Hội nghị Hiệp thương chính trị thống nhất đất nước, gồm đại biểu hai miền Nam - Bắc.",
      },
      { id: "B", text: "Hội nghị Genève về Đông Dương." },
      { id: "C", text: "Hội nghị thành lập Đảng Cộng sản Việt Nam." },
      { id: "D", text: "Hội nghị Paris về chấm dứt chiến tranh ở Việt Nam." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-11",
    phase: "round4",
    type: "finish",
    text: "Quốc hội khóa VI quyết định lấy tên nước ta là gì, vào ngày nào?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Cộng hòa Xã hội chủ nghĩa Việt Nam, quyết nghị ngày 2/7/1976." },
      { id: "B", text: "Việt Nam Dân chủ Cộng hòa, ngày 2/9/1945." },
      { id: "C", text: "Cộng hòa miền Nam Việt Nam, ngày 30/4/1975." },
      { id: "D", text: "Liên bang Đông Dương, ngày 25/4/1976." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-12",
    phase: "round4",
    type: "finish",
    text: "Quốc hội khóa VI quyết định chọn thủ đô của nước Việt Nam thống nhất là thành phố nào?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Hà Nội." },
      { id: "B", text: "Thành phố Hồ Chí Minh." },
      { id: "C", text: "Huế." },
      { id: "D", text: "Sài Gòn." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-13",
    phase: "round4",
    type: "finish",
    text: "Thành phố Sài Gòn - Gia Định được Quốc hội khóa VI (1976) chính thức đổi tên thành gì?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Thành phố Hồ Chí Minh." },
      { id: "B", text: "Thành phố Gia Định." },
      { id: "C", text: "Thành phố Nam Bộ." },
      { id: "D", text: "Thành phố Sài Gòn mới." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-14",
    phase: "round4",
    type: "finish",
    text: "Quốc hội khóa VI quy định Quốc kỳ, Quốc ca của nước CHXHCN Việt Nam là gì?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Quốc kỳ là cờ đỏ sao vàng năm cánh; Quốc ca là bài Tiến quân ca." },
      { id: "B", text: "Quốc kỳ là cờ đỏ búa liềm; Quốc ca là bài Quốc tế ca." },
      { id: "C", text: "Quốc kỳ là cờ nửa đỏ nửa xanh sao vàng; Quốc ca là bài Giải phóng miền Nam." },
      { id: "D", text: "Quốc kỳ là cờ đỏ sao vàng; Quốc ca là bài Lên đàng." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-15",
    phase: "round4",
    type: "finish",
    text: "Ai được Quốc hội khóa VI bầu làm Chủ tịch nước đầu tiên của nước CHXHCN Việt Nam thống nhất?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Đồng chí Tôn Đức Thắng." },
      { id: "B", text: "Đồng chí Hồ Chí Minh." },
      { id: "C", text: "Đồng chí Phạm Văn Đồng." },
      { id: "D", text: "Đồng chí Lê Duẩn." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-16",
    phase: "round4",
    type: "finish",
    text: "Ai được Quốc hội khóa VI (1976) bầu làm Thủ tướng Chính phủ nước Việt Nam thống nhất?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Đồng chí Phạm Văn Đồng." },
      { id: "B", text: "Đồng chí Trường Chinh." },
      { id: "C", text: "Đồng chí Tôn Đức Thắng." },
      { id: "D", text: "Đồng chí Võ Nguyên Giáp." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-17",
    phase: "round4",
    type: "finish",
    text: "Vì sao có thể nói năm 1976 mới hoàn thành thống nhất đất nước về mặt nhà nước, dù lãnh thổ đã thống nhất từ 1975?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Vì 1975 mới thống nhất lãnh thổ; đến 1976 (Tổng tuyển cử 25/4 và Quốc hội khóa VI tháng 7) cả nước mới có chung một Quốc hội, một Chính phủ, một tên nước.",
      },
      { id: "B", text: "Vì đến năm 1976 quân đội nước ngoài mới rút hết khỏi miền Nam." },
      { id: "C", text: "Vì Hiệp định Paris quy định năm 1976 mới được thống nhất." },
      { id: "D", text: "Vì đến năm 1976 mới giải phóng hoàn toàn miền Nam." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-18",
    phase: "round4",
    type: "finish",
    text: "Việc hoàn thành thống nhất đất nước về mặt nhà nước đã tạo điều kiện thuận lợi gì cho vị thế Việt Nam trên trường quốc tế?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Nâng cao vị thế, uy tín, mở rộng quan hệ đối ngoại; tiêu biểu là năm 1977 Việt Nam trở thành thành viên Liên Hợp Quốc.",
      },
      { id: "B", text: "Giúp Việt Nam gia nhập khối ASEAN ngay trong năm 1976." },
      { id: "C", text: "Giúp Việt Nam trở thành ủy viên thường trực Hội đồng Bảo an." },
      { id: "D", text: "Chấm dứt mọi quan hệ đối ngoại để tập trung xây dựng trong nước." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-19",
    phase: "round4",
    type: "finish",
    text: "Cuộc Tổng tuyển cử ngày 25/4/1976 có điểm gì đặc biệt so với các lần bầu cử trước đó?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Lần đầu sau ngày thống nhất, nhân dân cả hai miền Nam - Bắc cùng bầu ra một Quốc hội chung của cả nước.",
      },
      { id: "B", text: "Lần đầu tiên nhân dân miền Bắc được đi bầu cử." },
      { id: "C", text: "Chỉ có đại biểu miền Nam được bầu vào Quốc hội." },
      { id: "D", text: "Là cuộc bầu cử riêng của từng tỉnh, không chung cả nước." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-20",
    phase: "round4",
    type: "finish",
    text: "Việc thống nhất đất nước về mặt nhà nước năm 1976 thể hiện điều gì về tinh thần của dân tộc Việt Nam?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Ý chí độc lập, thống nhất và tinh thần đại đoàn kết toàn dân tộc: 'Nước Việt Nam là một, dân tộc Việt Nam là một'.",
      },
      { id: "B", text: "Mong muốn chia tách đất nước thành nhiều quốc gia nhỏ." },
      { id: "C", text: "Sự phụ thuộc hoàn toàn vào sự giúp đỡ của nước ngoài." },
      { id: "D", text: "Ưu tiên phát triển kinh tế hơn độc lập, thống nhất dân tộc." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-21",
    phase: "round4",
    type: "finish",
    text: "Việc hoàn thành thống nhất đất nước về mặt nhà nước có ý nghĩa gì đối với công cuộc xây dựng chủ nghĩa xã hội?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Tạo điều kiện chính trị cơ bản để phát huy sức mạnh toàn diện của cả nước, đưa cả nước cùng tiến lên chủ nghĩa xã hội.",
      },
      { id: "B", text: "Buộc cả nước phải quay lại thời kỳ kháng chiến." },
      { id: "C", text: "Làm suy yếu khối đại đoàn kết toàn dân tộc." },
      { id: "D", text: "Chỉ có ý nghĩa đối với riêng miền Bắc." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-22",
    phase: "round4",
    type: "finish",
    text: "Bài học lớn rút ra từ quá trình thống nhất đất nước về mặt nhà nước (1975 - 1976) là gì?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Phát huy sức mạnh đại đoàn kết toàn dân tộc và ý chí độc lập, thống nhất để hoàn thành mục tiêu chung.",
      },
      { id: "B", text: "Cần dựa hoàn toàn vào sự can thiệp của nước ngoài." },
      { id: "C", text: "Nên duy trì lâu dài hai chính quyền riêng biệt." },
      { id: "D", text: "Ưu tiên phát triển quân sự hơn thống nhất chính trị." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-23",
    phase: "round4",
    type: "finish",
    text: "Vì sao Đảng chủ trương thống nhất đất nước về mặt nhà nước một cách khẩn trương ngay sau năm 1975?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Vì đó là nguyện vọng thiết tha của nhân dân cả nước và là điều kiện để phát huy sức mạnh toàn dân xây dựng, bảo vệ Tổ quốc.",
      },
      { id: "B", text: "Vì bị các nước lớn ép buộc phải làm ngay." },
      { id: "C", text: "Vì miền Nam muốn tách ra thành một quốc gia riêng." },
      { id: "D", text: "Vì cần thời gian để chuẩn bị cho một cuộc chiến tranh mới." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-24",
    phase: "round4",
    type: "finish",
    text: "Mối quan hệ giữa thống nhất lãnh thổ (1975) và thống nhất về mặt nhà nước (1976) được hiểu như thế nào?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Thống nhất lãnh thổ là tiền đề; thống nhất về mặt nhà nước hoàn thiện quá trình thống nhất trọn vẹn của đất nước.",
      },
      { id: "B", text: "Hai việc này hoàn toàn không liên quan đến nhau." },
      { id: "C", text: "Thống nhất về mặt nhà nước có trước, thống nhất lãnh thổ có sau." },
      { id: "D", text: "Chỉ cần thống nhất lãnh thổ là đủ, không cần thống nhất nhà nước." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-25",
    phase: "round4",
    type: "finish",
    text: "Sự kiện Việt Nam gia nhập Liên Hợp Quốc năm 1977 nói lên điều gì sau khi đất nước thống nhất?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Vị thế, uy tín quốc tế của Việt Nam được nâng cao và quan hệ đối ngoại được mở rộng sau khi đất nước thống nhất.",
      },
      { id: "B", text: "Việt Nam từ bỏ con đường xã hội chủ nghĩa." },
      { id: "C", text: "Việt Nam chấm dứt quan hệ với các nước xã hội chủ nghĩa." },
      { id: "D", text: "Đất nước vẫn còn bị chia cắt về mặt nhà nước." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-26",
    phase: "round4",
    type: "finish",
    text: "Việc thống nhất đất nước về mặt nhà nước năm 1976 khẳng định chân lý nào của Chủ tịch Hồ Chí Minh?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "'Nước Việt Nam là một, dân tộc Việt Nam là một; sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi.'",
      },
      { id: "B", text: "'Không có gì quý hơn độc lập, tự do' chỉ dành cho riêng miền Bắc." },
      { id: "C", text: "Việt Nam nên chia thành nhiều quốc gia nhỏ." },
      { id: "D", text: "Độc lập dân tộc không gắn liền với chủ nghĩa xã hội." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-27",
    phase: "round4",
    type: "finish",
    text: "Nhận định nào đúng về tính chất của cuộc Tổng tuyển cử bầu Quốc hội chung ngày 25/4/1976?",
    correctAnswer: "A",
    options: [
      {
        id: "A",
        text: "Là cuộc bầu cử dân chủ, thể hiện ý chí thống nhất và quyền làm chủ của nhân dân cả hai miền.",
      },
      { id: "B", text: "Chỉ mang tính hình thức, không có giá trị pháp lý." },
      { id: "C", text: "Chỉ có cán bộ tham gia, không có nhân dân." },
      { id: "D", text: "Do nước ngoài tổ chức và giám sát." },
    ],
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-28",
    phase: "round4",
    type: "finish",
    text: "Quốc hội khóa VI của nước Việt Nam thống nhất được bầu ra vào năm nào?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Năm 1976." },
      { id: "B", text: "Năm 1945." },
      { id: "C", text: "Năm 1954." },
      { id: "D", text: "Năm 1975." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-29",
    phase: "round4",
    type: "finish",
    text: "Kỳ họp thứ nhất Quốc hội khóa VI (1976) diễn ra tại đâu?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Tại thủ đô Hà Nội." },
      { id: "B", text: "Tại Thành phố Hồ Chí Minh." },
      { id: "C", text: "Tại thành phố Huế." },
      { id: "D", text: "Tại thành phố Đà Nẵng." },
    ],
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-30",
    phase: "round4",
    type: "finish",
    text: "Hội nghị Hiệp thương chính trị thống nhất đất nước (11/1975) được tổ chức tại thành phố nào?",
    correctAnswer: "A",
    options: [
      { id: "A", text: "Tại Sài Gòn." },
      { id: "B", text: "Tại Hà Nội." },
      { id: "C", text: "Tại thành phố Huế." },
      { id: "D", text: "Tại thành phố Cần Thơ." },
    ],
    timeLimit: 30,
    points: 20,
  },
];

// ---- Đảo thứ tự phương án ---------------------------------------------------
// Cac cau Ve dich duoc soan voi dap an dung o vi tri A. Neu de nguyen, thi sinh
// chi can bam A la trung 30/30 cau. Ham duoi day xao lai vi tri cac phuong an va
// danh lai nhan A/B/C/D theo vi tri moi, dong thoi cap nhat correctAnswer.
//
// Bo xao tron duoc gieo (seed) tu id cau hoi => thu tu giong het nhau o moi lan
// khoi dong lai server, tranh viec MC restart giua tran thi dap an nhay lung tung.
function seedFromId(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

function shuffleInPlace<T>(arr: T[], rnd: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Dat dap an dung vao vi tri `correctPos`, cac phuong an nhieu xao vao cho con lai. */
function shuffleOptions(q: Question, correctPos: number): Question {
  // Chi ap dung cho cau chon 1 dap an. Cau "sequence"/"match" phu thuoc vao id
  // phuong an nen phai giu nguyen.
  if (!q.options || q.options.length < 2) return q;
  if (q.answerFormat && q.answerFormat !== "single") return q;

  const rnd = mulberry32(seedFromId(q.id));
  const correct = q.options.find((o) => o.id === q.correctAnswer);
  if (!correct) return q;

  const distractors = shuffleInPlace(
    q.options.filter((o) => o.id !== q.correctAnswer),
    rnd
  );
  const pos = correctPos % q.options.length;
  const ordered = [...distractors];
  ordered.splice(pos, 0, correct);

  return {
    ...q,
    options: ordered.map((o, i) => ({ ...o, id: OPTION_LABELS[i] })),
    correctAnswer: OPTION_LABELS[pos],
  };
}

/**
 * Rai vi tri dap an dung deu cho ca kho cau hoi: cu moi 4 cau lien tiep thi dap an
 * dung roi du ca 4 vi tri A/B/C/D (thu tu trong tung nhom van la ngau nhien co seed).
 * Nho vay khong con chuyen "cu bam A la trung", va cung khong bi lech kieu 10 cau A.
 */
function spreadAnswers(list: Question[]): Question[] {
  const positions: number[] = [];
  for (let i = 0; i < list.length; i += 4) {
    shuffleInPlace([0, 1, 2, 3], mulberry32(seedFromId(`block-${i}`))).forEach((p) =>
      positions.push(p)
    );
  }
  return list.map((q, i) => shuffleOptions(q, positions[i]));
}

export const ROUND4: Question[] = spreadAnswers(ROUND4_RAW);

export const ALL_QUESTIONS = {
  round1: ROUND1,
  round2: OBSTACLE,
  round3: ROUND3,
  round4: ROUND4,
};
