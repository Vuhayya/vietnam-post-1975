# Hướng dẫn thêm / sửa câu hỏi

Toàn bộ câu hỏi nằm trong **một file duy nhất**: `server/src/data/questions.ts`.
Sửa xong lưu lại là server tự nạp mới (đang chạy `npm run dev` thì tự reload).

Không cần database, không cần build. Ảnh để trong `client/public/images/` rồi tham chiếu `/images/ten-file.jpg`.

---

## Vòng 1 – Khởi động (`ROUND1`) — trắc nghiệm, server tự chấm

```ts
{
  id: "r1-11",              // id duy nhất
  phase: "round1",
  type: "mcq",
  text: "Câu hỏi của bạn?",
  options: [
    { id: "A", text: "Đáp án A" },
    { id: "B", text: "Đáp án B" },
    { id: "C", text: "Đáp án C" },
    { id: "D", text: "Đáp án D" },
  ],
  correctAnswer: "A",       // id của đáp án đúng
  timeLimit: 15,            // giây
  points: 10,
  explanation: "Giải thích (hiện khi công bố).", // tuỳ chọn
}
```

## Vòng 2 – Vượt chướng ngại vật (`OBSTACLE`)

Chỉ có **một** cấu trúc. Sửa trực tiếp:

```ts
export const OBSTACLE = {
  id: "obstacle-1",
  imageUrl: "/images/hoi-truong-thong-nhat.jpg", // ảnh bị che 4 góc
  keyword: "THONG NHAT",                          // từ khoá trung tâm
  keywordRevealed: false,
  cornersRevealed: [false, false, false, false],
  rows: [
    { id: "row-1", clue: "Gợi ý hàng ngang 1?", answer: "NAM", revealed: false },
    // ... đúng 4 hàng (mỗi hàng mở 1 góc ảnh)
  ],
};
```

## Vòng 3 – Tăng tốc (`ROUND3`) — hình ảnh/video, điểm theo đúng + nhanh

```ts
{
  id: "r3-5",
  phase: "round3",
  type: "media",
  text: "Sự kiện trong hình là gì?",
  media: { kind: "image", url: "/images/xe-tang.jpg" }, // hoặc kind: "video"
  options: [ { id: "A", text: "..." }, ... ],
  correctAnswer: "A",
  timeLimit: 20,
  points: 20,
}
```

## Vòng 4 – Về đích (`ROUND4`) — MC chấm thủ công

```ts
{
  id: "r4-6",
  phase: "round4",
  type: "finish",
  text: "Câu hỏi tự luận / mở?",
  correctAnswer: "Gợi ý đáp án để MC đối chiếu.",
  timeLimit: 30,
  points: 20,  // gói điểm thực tế do người chơi chọn trên bảng MC (10/20/30)
}
```

---

## Ghi chú

- **Thêm câu:** copy một khối `{ ... }`, đổi `id`, thêm vào mảng tương ứng.
- **Xoá câu:** xoá khối đó.
- **Số câu mỗi vòng** tự động theo độ dài mảng (Vòng 1 hiển thị "Câu x/10" theo số phần tử).
- **Dấu tiếng Việt** trong `text` hiển thị bình thường; nếu muốn AI đọc chuẩn, cứ viết có dấu đầy đủ.
- **So khớp đáp án tự luận/điền:** server chuẩn hoá khoảng trắng + không phân biệt hoa thường; nhưng Vòng 2 & 4 vẫn nên để **MC chấm tay** cho chắc.
