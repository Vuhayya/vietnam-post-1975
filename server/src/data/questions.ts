import type { Question, ObstaclePuzzle } from "@vnr/shared";

// ============================================================================
// NGAN HANG CAU HOI - VNR202 Chuong 3: Thong nhat dat nuoc sau 1975
// (Noi dung mau - GV/nhom co the sua/them thoai mai)
// ============================================================================

// ---- VONG 1: KHOI DONG (10 cau trac nghiem) --------------------------------
export const ROUND1: Question[] = [
  {
    id: "r1-1",
    phase: "round1",
    type: "mcq",
    text: "Chien dich Ho Chi Minh lich su ket thuc thang loi vao ngay nao?",
    options: [
      { id: "A", text: "30/4/1975" },
      { id: "B", text: "2/9/1975" },
      { id: "C", text: "30/4/1976" },
      { id: "D", text: "19/5/1975" },
    ],
    correctAnswer: "A",
    timeLimit: 15,
    points: 10,
    explanation: "11h30 ngay 30/4/1975, co giai phong tung bay tren noc Dinh Doc Lap.",
  },
  {
    id: "r1-2",
    phase: "round1",
    type: "mcq",
    text: "Hoi nghi Hiep thuong chinh tri thong nhat dat nuoc (11/1975) hop tai dau?",
    options: [
      { id: "A", text: "Ha Noi" },
      { id: "B", text: "Sai Gon" },
      { id: "C", text: "Hue" },
      { id: "D", text: "Da Nang" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-3",
    phase: "round1",
    type: "mcq",
    text: "Cuoc Tong tuyen cu bau Quoc hoi chung ca nuoc dien ra ngay nao?",
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
    text: "Quoc hoi khoa VI (7/1976) quyet dinh doi ten nuoc thanh gi?",
    options: [
      { id: "A", text: "Viet Nam Dan chu Cong hoa" },
      { id: "B", text: "Cong hoa Xa hoi chu nghia Viet Nam" },
      { id: "C", text: "Cong hoa mien Nam Viet Nam" },
      { id: "D", text: "Lien bang Dong Duong" },
    ],
    correctAnswer: "B",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-5",
    phase: "round1",
    type: "mcq",
    text: "Thanh pho Sai Gon - Gia Dinh duoc doi ten thanh Thanh pho Ho Chi Minh nam nao?",
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
    text: "Ky hop dau tien cua Quoc hoi khoa VI da chon Thu do cua ca nuoc la?",
    options: [
      { id: "A", text: "Hue" },
      { id: "B", text: "TP Ho Chi Minh" },
      { id: "C", text: "Ha Noi" },
      { id: "D", text: "Da Nang" },
    ],
    correctAnswer: "C",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-7",
    phase: "round1",
    type: "mcq",
    text: "Sau nam 1975, nhiem vu hang dau ve mat nha nuoc cua Viet Nam la gi?",
    options: [
      { id: "A", text: "Phat trien du lich" },
      { id: "B", text: "Thong nhat dat nuoc ve mat nha nuoc" },
      { id: "C", text: "Gia nhap ASEAN" },
      { id: "D", text: "Mo cua kinh te" },
    ],
    correctAnswer: "B",
    timeLimit: 20,
    points: 10,
  },
  {
    id: "r1-8",
    phase: "round1",
    type: "mcq",
    text: "Quoc ky nuoc CHXHCN Viet Nam la?",
    options: [
      { id: "A", text: "Co do sao vang" },
      { id: "B", text: "Co bua liem" },
      { id: "C", text: "Co nua do nua xanh sao vang" },
      { id: "D", text: "Co trang sao do" },
    ],
    correctAnswer: "A",
    timeLimit: 15,
    points: 10,
  },
  {
    id: "r1-9",
    phase: "round1",
    type: "mcq",
    text: "Viec thong nhat dat nuoc ve mat nha nuoc co y nghia gi quan trong nhat?",
    options: [
      { id: "A", text: "Tao suc manh tong hop di len CNXH" },
      { id: "B", text: "Tang dan so" },
      { id: "C", text: "Mo rong lanh tho" },
      { id: "D", text: "Thu hut dau tu nuoc ngoai" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 10,
  },
  {
    id: "r1-10",
    phase: "round1",
    type: "mcq",
    text: "Quoc hoi khoa VI la Quoc hoi cua?",
    options: [
      { id: "A", text: "Rieng mien Bac" },
      { id: "B", text: "Rieng mien Nam" },
      { id: "C", text: "Nuoc Viet Nam thong nhat" },
      { id: "D", text: "Chinh phu lam thoi" },
    ],
    correctAnswer: "C",
    timeLimit: 15,
    points: 10,
  },
];

// ---- VONG 2: VUOT CHUONG NGAI VAT ------------------------------------------
export const OBSTACLE: ObstaclePuzzle = {
  id: "obstacle-1",
  imageUrl: "", // co the dat URL anh Dinh Doc Lap / Hoi truong Thong Nhat
  keyword: "THONG NHAT",
  keywordRevealed: false,
  cornersRevealed: [false, false, false, false],
  rows: [
    {
      id: "row-1",
      clue: "Ngay 30/4/1975 la ngay giai phong hoan toan mien... ?",
      answer: "NAM",
      revealed: false,
    },
    {
      id: "row-2",
      clue: "Ten goi khac cua Dinh Doc Lap ngay nay: Hoi truong ... ?",
      answer: "THONG NHAT",
      revealed: false,
    },
    {
      id: "row-3",
      clue: "Thang loi 1975 mo ra ky nguyen ca nuoc di len chu nghia... ?",
      answer: "XA HOI",
      revealed: false,
    },
    {
      id: "row-4",
      clue: "Cuoc Tong tuyen cu 1976 bau ra co quan quyen luc cao nhat: ... hoi ?",
      answer: "QUOC",
      revealed: false,
    },
  ],
};

// ---- VONG 3: TANG TOC (4 cau, tinh diem theo thoi gian + do chinh xac) ------
export const ROUND3: Question[] = [
  {
    id: "r3-1",
    phase: "round3",
    type: "media",
    text: "Su kien trong hinh dien ra o dau? (Xe tang tien vao Dinh Doc Lap)",
    media: { kind: "image", url: "" },
    options: [
      { id: "A", text: "Dinh Doc Lap (Sai Gon)" },
      { id: "B", text: "Phu Chu tich (Ha Noi)" },
      { id: "C", text: "Kinh thanh Hue" },
      { id: "D", text: "Toa thi chinh Da Nang" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-2",
    phase: "round3",
    type: "media",
    text: "Sap xep dung: su kien nao dien ra TRUOC?",
    options: [
      { id: "A", text: "Chien dich Ho Chi Minh (4/1975)" },
      { id: "B", text: "Tong tuyen cu ca nuoc (4/1976)" },
      { id: "C", text: "Doi ten nuoc CHXHCN Viet Nam (7/1976)" },
      { id: "D", text: "Doi ten TP Ho Chi Minh (7/1976)" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-3",
    phase: "round3",
    type: "media",
    text: "Nhan vat lich su nao chi huy chien dich giai phong Sai Gon 1975?",
    media: { kind: "image", url: "" },
    options: [
      { id: "A", text: "Dai tuong Van Tien Dung" },
      { id: "B", text: "Dai tuong Vo Nguyen Giap" },
      { id: "C", text: "Truong Chinh" },
      { id: "D", text: "Le Duan" },
    ],
    correctAnswer: "A",
    timeLimit: 20,
    points: 20,
  },
  {
    id: "r3-4",
    phase: "round3",
    type: "media",
    text: "Nam 1977, Viet Nam tro thanh thanh vien thu 149 cua to chuc quoc te nao?",
    options: [
      { id: "A", text: "ASEAN" },
      { id: "B", text: "Lien Hop Quoc (UN)" },
      { id: "C", text: "WTO" },
      { id: "D", text: "APEC" },
    ],
    correctAnswer: "B",
    timeLimit: 20,
    points: 20,
  },
];

// ---- VONG 4: VE DICH (kho cau hoi - MC chon khi den luot) -------------------
export const ROUND4: Question[] = [
  {
    id: "r4-1",
    phase: "round4",
    type: "finish",
    text: "Neu ngan gon y nghia lich su cua viec thong nhat dat nuoc ve mat nha nuoc nam 1976.",
    correctAnswer:
      "Tao co so phap ly hoan chinh de thong nhat, phat huy suc manh toan dan toc di len CNXH, nang cao vi the quoc te.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-2",
    phase: "round4",
    type: "finish",
    text: "Vi sao noi thong nhat ve mat nha nuoc la yeu cau tat yeu, cap bach sau 1975?",
    correctAnswer:
      "Vi mot dat nuoc, mot dan toc nhung ton tai 2 nha nuoc, 2 chinh phu la trai voi nguyen vong; can thong nhat de quan ly va xay dung dat nuoc.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-3",
    phase: "round4",
    type: "finish",
    text: "Ky hop thu nhat Quoc hoi khoa VI (1976) da thong qua nhung quyet dinh quan trong nao?",
    correctAnswer:
      "Doi ten nuoc thanh CHXHCN Viet Nam; chon Ha Noi la thu do; doi ten Sai Gon-Gia Dinh thanh TP Ho Chi Minh; quy dinh Quoc ky, Quoc huy, Quoc ca.",
    timeLimit: 30,
    points: 30,
  },
  {
    id: "r4-4",
    phase: "round4",
    type: "finish",
    text: "Hoi nghi Hiep thuong chinh tri (11/1975) tai Sai Gon da nhat tri van de gi?",
    correctAnswer: "Nhat tri hoan toan chu truong, bien phap thong nhat dat nuoc ve mat nha nuoc.",
    timeLimit: 30,
    points: 20,
  },
  {
    id: "r4-5",
    phase: "round4",
    type: "finish",
    text: "Ket qua cuoc Tong tuyen cu ngay 25/4/1976 co y nghia gi?",
    correctAnswer:
      "Hon 23 trieu cu tri (98,8%) di bau, bau ra 492 dai bieu Quoc hoi chung, the hien y chi thong nhat cua toan dan.",
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
