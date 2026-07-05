# VNR202 Challenge

Gameshow học tập trực tuyến (kiểu Đường lên đỉnh Olympia) cho môn **VNR202 – Chương 3: Thống nhất đất nước sau 1975**.

- **3 vai trò:** MC (điều khiển), Người chơi (điện thoại/laptop), Màn hình trình chiếu.
- **4 vòng:** Khởi động · Vượt chướng ngại vật · Tăng tốc · Về đích.
- **Realtime:** Socket.IO. Server là "trọng tài", giữ đáp án và tính điểm.
- Hỗ trợ 30+ người chơi cùng lúc.

## Công nghệ

| Phần | Công nghệ |
|------|-----------|
| Server | Node.js + TypeScript + Express + Socket.IO |
| Client | React + Vite + TypeScript + Tailwind CSS v4 |
| Types dùng chung | workspace `@vnr/shared` |

## Cách chạy (development)

```bash
# 1. Cài dependencies (chạy 1 lần, ở thư mục gốc)
npm install

# 2. Chạy cả server + client
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:4000

### Chơi thử
1. Mở http://localhost:5173 → bấm **Tạo trận đấu mới (MC)** → sẽ có **mã phòng**.
2. Trên trang MC, bấm **Mở màn hình trình chiếu** (chiếu lên máy chiếu).
3. Người chơi mở http://localhost:5173 trên điện thoại (cùng mạng LAN, thay `localhost` bằng IP máy MC), nhập **mã phòng** + tên.
4. MC chọn vòng → **Hiện câu hỏi** → **bấm giờ** → **Công bố đáp án**.

> Chơi qua điện thoại trong cùng WiFi: người chơi vào `http://<IP-máy-MC>:5173`. Lấy IP bằng `ipconfig` (Windows).

## Luật điểm

- **Vòng 1 (Khởi động):** 10 câu trắc nghiệm, đúng = điểm câu hỏi. Server tự chấm.
- **Vòng 2 (Vượt chướng ngại vật):** ảnh che 4 góc + 4 hàng ngang. Người chơi bấm chuông giành quyền trả lời từ khóa. MC chấm.
- **Vòng 3 (Tăng tốc):** 4 câu hình ảnh/sự kiện. Điểm = đúng + nhanh (thưởng tốc độ). Server tự chấm.
- **Vòng 4 (Về đích):** Top 5. Mỗi người chọn gói điểm (10/20/30), có thể chọn **Ngôi sao hy vọng** (nhân đôi, sai bị trừ). Trả lời sai → 4 người còn lại bấm chuông cướp quyền. MC chấm.

## Sửa nội dung câu hỏi

Toàn bộ câu hỏi nằm ở `server/src/data/questions.ts`. Sửa trực tiếp là xong, không cần database.
Xem hướng dẫn chi tiết từng vòng ở **[QUESTIONS.md](QUESTIONS.md)**. Ảnh/video để trong `client/public/images/`.

## Chạy production (1 tiến trình – để deploy)

```bash
npm start   # build client rồi server phục vụ luôn bản build đó tại cổng PORT (mặc định 4000)
```

Deploy free được trên Render / Railway / Fly.io: build command `npm install && npm run build`, start command `npm run start -w server`.

## Database (PostgreSQL – lưu lịch sử trận)

Lưu trữ là **tùy chọn**: không có DB thì game vẫn chạy đầy đủ, chỉ không lưu lịch sử.

```bash
# 1. Mở Docker Desktop, rồi bật PostgreSQL:
docker compose up -d

# 2. Tạo bảng (chạy 1 lần):
npm run db:migrate -w server

# 3. Chạy game như thường:
npm run dev
```

- Kết thúc một trận (MC bấm "Kết thúc trận đấu") → tự lưu kết quả vào DB.
- Xem lại ở trang **/history** (hoặc API `GET /api/history`).
- Xem/sửa dữ liệu trực quan: `npm run db:studio -w server` (Prisma Studio).
- Cấu hình kết nối ở `server/.env` (`DATABASE_URL`).

## Chống gian lận (đã cài sẵn)

Server tách "phòng con" theo vai trò: **người chơi không nhận được nội dung câu hỏi cho tới khi MC bấm "Hiện câu hỏi"**, và **đáp án đúng không bao giờ được gửi xuống máy người chơi** — chỉ MC thấy đáp án. Mở DevTools trên máy người chơi cũng không lấy được đáp án.

## Cấu trúc

```
vnr202-challenge/
├─ shared/   # types dùng chung (hợp đồng client-server)
├─ server/   # Socket.IO game engine (server-authoritative)
│  └─ src/
│     ├─ game/     # Room (state machine), scoring, GameManager
│     ├─ data/     # ngân hàng câu hỏi
│     └─ socket/   # xử lý sự kiện socket
└─ client/   # React app: /host, /play, /screen
```

## Âm thanh & AI đọc câu hỏi

- **AI đọc câu hỏi:** dùng Web Speech API (miễn phí, giọng vi-VN có sẵn trong trình duyệt). MC bấm **Đọc / Đọc lại / Dừng**, âm thanh phát trên **màn hình trình chiếu** (`/screen`).
- **Hiệu ứng âm thanh:** tổng hợp trực tiếp bằng Web Audio API (tick, đúng, sai, chuông, reveal, victory...) — **không cần file mp3**.
- ⚠️ Trên `/screen`, bấm nút **"🔊 Bật âm thanh"** một lần khi bắt đầu (chính sách autoplay của trình duyệt).

## Định hướng (mở rộng sau)

- Thêm PostgreSQL (Prisma) để lưu lịch sử trận + kho câu hỏi (Phase 3).
- Bổ sung ảnh thật cho Vòng 2 (chướng ngại vật) và Vòng 3 (đang để URL rỗng trong `questions.ts`).
- Nâng cấp TTS lên OpenAI/Azure TTS nếu cần giọng đọc tự nhiên hơn (có phí).
