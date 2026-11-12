const store = require("../data/taskStore");

const STATUSES = ["pending", "in-progress", "completed"];
const PRIORITIES = ["low", "medium", "high"];

// Gelen gövdeyi kontrol eder; hata varsa mesaj listesi döner.
function validate(body, { partial }) {
  const errors = [];
  const has = (k) => body[k] !== undefined;

  if (!partial || has("title")) {
    if (typeof body.title !== "string" || !body.title.trim()) errors.push("title zorunludur ve boş olamaz");
  }
  if (has("description") && typeof body.description !== "string") errors.push("description metin olmalıdır");
  if (has("status") && !STATUSES.includes(body.status)) errors.push(`status şunlardan biri olmalıdır: ${STATUSES.join(", ")}`);
  if (has("priority") && !PRIORITIES.includes(body.priority)) errors.push(`priority şunlardan biri olmalıdır: ${PRIORITIES.join(", ")}`);
  if (has("assignee") && typeof body.assignee !== "string") errors.push("assignee metin olmalıdır");
  return errors;
}

function pick(body) {
  const out = {};
  for (const k of ["title", "description", "status", "priority", "assignee"]) {
    if (body[k] !== undefined) out[k] = typeof body[k] === "string" ? body[k].trim() : body[k];
  }
  return out;
}

const notFound = (res, id) => res.status(404).json({ success: false, message: `${id} numaralı görev bulunamadı` });
const parseId = (req) => Number(req.params.id);

// 1) Görev ekleme  -> POST /tasks
exports.createTask = (req, res) => {
  const errors = validate(req.body || {}, { partial: false });
  if (errors.length) return res.status(400).json({ success: false, message: "Geçersiz veri", errors });

  const task = store.create({
    description: "",
    status: "pending",
    priority: "medium",
    assignee: "",
    ...pick(req.body),
  });
  res.status(201).json({ success: true, message: "Görev oluşturuldu", data: task });
};

// 2) Görev listeleme -> GET /tasks
exports.getTasks = (req, res) => {
  const tasks = store.all();
  res.json({ success: true, count: tasks.length, data: tasks });
};

// 3) Görev detayı -> GET /tasks/:id
exports.getTaskById = (req, res) => {
  const task = store.find(parseId(req));
  if (!task) return notFound(res, req.params.id);
  res.json({ success: true, data: task });
};

// 4) Görev güncelleme -> PUT /tasks/:id
exports.updateTask = (req, res) => {
  const errors = validate(req.body || {}, { partial: true });
  if (errors.length) return res.status(400).json({ success: false, message: "Geçersiz veri", errors });

  const task = store.update(parseId(req), pick(req.body));
  if (!task) return notFound(res, req.params.id);
  res.json({ success: true, message: "Görev güncellendi", data: task });
};

// 5) Görev silme -> DELETE /tasks/:id
exports.deleteTask = (req, res) => {
  const task = store.remove(parseId(req));
  if (!task) return notFound(res, req.params.id);
  res.json({ success: true, message: "Görev silindi", data: task });
};
