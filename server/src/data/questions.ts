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
  imageUrl: "", // có thể đặt URL ảnh Dinh Độc Lập / Hội trường Thống Nhất
  keyword: "THỐNG NHẤT",
  keywordRevealed: false,
  cornersRevealed: [false, false, false, false],
  rows: [
    {
      id: "row-1",
      clue: "Ngày 30/4/1975 là ngày giải phóng hoàn toàn miền... ?",
      answer: "NAM",
      revealed: false,
    },
    {
      id: "row-2",
      clue: "Tên gọi khác của Dinh Độc Lập ngày nay: Hội trường ... ?",
      answer: "THỐNG NHẤT",
      revealed: false,
    },
    {
      id: "row-3",
      clue: "Thắng lợi 1975 mở ra kỷ nguyên cả nước đi lên chủ nghĩa... ?",
      answer: "XÃ HỘI",
      revealed: false,
    },
    {
      id: "row-4",
      clue: "Cuộc Tổng tuyển cử 1976 bầu ra cơ quan quyền lực cao nhất: ... hội ?",
      answer: "QUỐC",
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
    text: "Sự kiện trong hình diễn ra ở đâu? (Xe tăng tiến vào Dinh Độc Lập)",
    media: { kind: "image", url: "" },
    options: [
      { id: "A", text: "Dinh Độc Lập (Sài Gòn)" },
      { id: "B", text: "Phủ Chủ tịch (Hà Nội)" },
      { id: "C", text: "Kinh thành Huế" },
      { id: "D", text: "Tòa thị chính Đà Nẵng" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-2",
    phase: "round3",
    type: "media",
    text: "Sắp xếp đúng: sự kiện nào diễn ra TRƯỚC?",
    options: [
      { id: "A", text: "Chiến dịch Hồ Chí Minh (4/1975)" },
      { id: "B", text: "Tổng tuyển cử cả nước (4/1976)" },
      { id: "C", text: "Đổi tên nước CHXHCN Việt Nam (7/1976)" },
      { id: "D", text: "Đổi tên TP Hồ Chí Minh (7/1976)" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-3",
    phase: "round3",
    type: "media",
    text: "Nhân vật lịch sử nào chỉ huy chiến dịch giải phóng Sài Gòn 1975?",
    media: { kind: "image", url: "" },
    options: [
      { id: "A", text: "Đại tướng Văn Tiến Dũng" },
      { id: "B", text: "Đại tướng Võ Nguyên Giáp" },
      { id: "C", text: "Trường Chinh" },
      { id: "D", text: "Lê Duẩn" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-4",
    phase: "round3",
    type: "media",
    text: "Năm 1977, Việt Nam trở thành thành viên thứ 149 của tổ chức quốc tế nào?",
    options: [
      { id: "A", text: "ASEAN" },
      { id: "B", text: "Liên Hợp Quốc (UN)" },
      { id: "C", text: "WTO" },
      { id: "D", text: "APEC" },
    ],
    correctAnswer: "B",
    timeLimit: 20,
    points: 20,
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
