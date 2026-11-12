const express = require("express");
const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(logger);          // Temel middleware: tüm istekleri kaydeder
app.use(express.json());  // JSON gövde ayrıştırma

app.get("/", (req, res) => {
  res.json({
    name: "TaskFlow API",
    version: "1.0.0",
    endpoints: ["GET /tasks", "POST /tasks", "GET /tasks/:id", "PUT /tasks/:id", "DELETE /tasks/:id"],
  });
});

app.use("/tasks", taskRoutes);

// Tanımsız rota
app.use((req, res) => {
  res.status(404).json({ success: false, message: `${req.method} ${req.originalUrl} bulunamadı` });
});

// Hatalı JSON gövdesi vb. hatalar
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Gönderilen JSON geçersiz" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Sunucu hatası" });
});

module.exports = app;
