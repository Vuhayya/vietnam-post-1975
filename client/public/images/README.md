# Thư mục ảnh / media

Thả ảnh (hoặc video/audio) cho câu hỏi vào đây. Ví dụ: `dinh-doc-lap.jpg`, `xe-tang.jpg`.

Sau đó trong `server/src/data/questions.ts`, tham chiếu bằng đường dẫn bắt đầu từ `/images/...`:

```ts
media: { kind: "image", url: "/images/xe-tang.jpg" }
media: { kind: "video", url: "/images/su-kien.mp4" }
```

Với chướng ngại vật (Vòng 2), đặt ảnh vào `imageUrl`:

```ts
imageUrl: "/images/hoi-truong-thong-nhat.jpg"
```

Cũng có thể dùng URL ảnh trên internet (https://...) thay vì file local.
