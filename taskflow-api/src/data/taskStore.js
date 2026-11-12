// Veri katmanı: bellek içi (in-memory) görev deposu.
// Sunucu yeniden başlatıldığında örnek veriler yeniden yüklenir.
let nextId = 4;

const tasks = [
  {
    id: 1,
    title: "API tasarım dokümanını hazırla",
    description: "Endpoint listesi ve veri modelini yaz",
    status: "completed",
    priority: "high",
    assignee: "musa",
    createdAt: "2026-11-01T09:00:00.000Z",
    updatedAt: "2026-11-01T09:00:00.000Z",
  },
  {
    id: 2,
    title: "Express routing altyapısını kur",
    description: "Klasör yapısını oluştur, /tasks rotalarını bağla",
    status: "in-progress",
    priority: "medium",
    assignee: "ayse",
    createdAt: "2026-11-02T10:30:00.000Z",
    updatedAt: "2026-11-02T10:30:00.000Z",
  },
  {
    id: 3,
    title: "Postman testlerini tamamla",
    description: "Tüm CRUD uçlarını test et ve ekran görüntüsü al",
    status: "pending",
    priority: "low",
    assignee: "can",
    createdAt: "2026-11-03T08:15:00.000Z",
    updatedAt: "2026-11-03T08:15:00.000Z",
  },
];

module.exports = {
  all: () => tasks,
  find: (id) => tasks.find((t) => t.id === id),
  create(data) {
    const now = new Date().toISOString();
    const task = { id: nextId++, ...data, createdAt: now, updatedAt: now };
    tasks.push(task);
    return task;
  },
  update(id, data) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    Object.assign(task, data, { updatedAt: new Date().toISOString() });
    return task;
  },
  remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    return tasks.splice(index, 1)[0];
  },
};
