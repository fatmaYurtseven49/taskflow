// Temel Middleware: Logger
// Tüm API isteklerinin method, endpoint ve zaman damgasını konsola ve logs/requests.log dosyasına yazar.
const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "..", "..", "logs");
const LOG_FILE = path.join(LOG_DIR, "requests.log");
fs.mkdirSync(LOG_DIR, { recursive: true });

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  console.log(line);
  fs.appendFile(LOG_FILE, line + "\n", (err) => {
    if (err) console.error("Log dosyasına yazılamadı:", err.message);
  });

  next();
}

module.exports = logger;
