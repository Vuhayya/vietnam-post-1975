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
export const ROUND4: Question[] = [
  {
    id: "r4-1",
    phase: "round4",
    type: "finish",
    text: "Nêu ngắn gọn ý nghĩa lịch sử của việc thống nhất đất nước về mặt nhà nước năm 1976.",
    correctAnswer:
      "Tạo cơ sở pháp lý hoàn chỉnh để thống nhất, phát huy sức mạnh toàn dân tộc đi lên CNXH, nâng cao vị thế quốc tế.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-2",
    phase: "round4",
    type: "finish",
    text: "Vì sao nói thống nhất về mặt nhà nước là yêu cầu tất yếu, cấp bách sau 1975?",
    correctAnswer:
      "Vì một đất nước, một dân tộc nhưng tồn tại 2 nhà nước, 2 chính phủ là trái với nguyện vọng; cần thống nhất để quản lý và xây dựng đất nước.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-3",
    phase: "round4",
    type: "finish",
    text: "Kỳ họp thứ nhất Quốc hội khóa VI (1976) đã thông qua những quyết định quan trọng nào?",
    correctAnswer:
      "Đổi tên nước thành CHXHCN Việt Nam; chọn Hà Nội là thủ đô; đổi tên Sài Gòn-Gia Định thành TP Hồ Chí Minh; quy định Quốc kỳ, Quốc huy, Quốc ca.",
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-4",
    phase: "round4",
    type: "finish",
    text: "Hội nghị Hiệp thương chính trị (11/1975) tại Sài Gòn đã nhất trí vấn đề gì?",
    correctAnswer: "Nhất trí hoàn toàn chủ trương, biện pháp thống nhất đất nước về mặt nhà nước.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-5",
    phase: "round4",
    type: "finish",
    text: "Kết quả cuộc Tổng tuyển cử ngày 25/4/1976 có ý nghĩa gì?",
    correctAnswer:
      "Hơn 23 triệu cử tri (98,8%) đi bầu, bầu ra 492 đại biểu Quốc hội chung, thể hiện ý chí thống nhất của toàn dân.",
    timeLimit: 30,
    points: 20,
  },
];

export const ALL_QUESTIONS = {
  round1: ROUND1,
  round2: OBSTACLE,
  round3: ROUND3,
  round4: ROUND4,
};
