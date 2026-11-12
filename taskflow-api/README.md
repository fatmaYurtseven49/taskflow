# TaskFlow - Görev ve Proje Yönetim Sistemi API

Node.js + Express.js ile geliştirilmiş, REST API mantığında çalışan görev yönetim servisi. Backend Geliştirme bitirme projesidir.

## Gereksinimler

- Node.js 18 veya üzeri (npm ile birlikte gelir)
- Postman (test için)

## Kurulum

```bash
# 1. Repoyu indirin
git clone <REPO_LINKI>
cd taskflow-api

# 2. Bağımlılıkları kurun
npm install

# 3. Sunucuyu başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. Port değiştirmek için: `PORT=4000 npm start`.
Geliştirme sırasında otomatik yeniden başlatma için `npm run dev` kullanılabilir.

## Klasör yapısı

```
taskflow-api/
├── package.json
├── postman/TaskFlow.postman_collection.json
└── src/
    ├── server.js                 # Sunucuyu başlatır
    ├── app.js                    # Express uygulaması, middleware ve rotalar
    ├── routes/taskRoutes.js      # /tasks rotaları
    ├── controllers/taskController.js
    ├── middleware/logger.js      # İstek kayıt (logger) middleware'i
    └── data/taskStore.js         # Bellek içi veri deposu
```

## Endpoint listesi

| Metot  | Endpoint     | Açıklama        | Başarılı yanıt |
|--------|--------------|-----------------|----------------|
| GET    | `/tasks`     | Tüm görevleri listeler | 200 |
| GET    | `/tasks/:id` | Görev detayı    | 200 (yoksa 404) |
| POST   | `/tasks`     | Yeni görev ekler | 201 (hatalıysa 400) |
| PUT    | `/tasks/:id` | Görevi günceller | 200 (yoksa 404) |
| DELETE | `/tasks/:id` | Görevi siler    | 200 (yoksa 404) |

### Görev modeli

| Alan | Tip | Açıklama |
|------|-----|----------|
| id | number | Otomatik atanır |
| title | string | **Zorunlu** |
| description | string | Açıklama (varsayılan boş) |
| status | string | `pending` (varsayılan), `in-progress`, `completed` |
| priority | string | `low`, `medium` (varsayılan), `high` |
| assignee | string | Görevin atandığı çalışan |
| createdAt / updatedAt | ISO tarih | Otomatik |

### Örnek istek

```http
POST /tasks
Content-Type: application/json

{
  "title": "Rapor hazırla",
  "description": "Haftalık durum raporu",
  "priority": "high",
  "assignee": "musa"
}
```

## Logger middleware

Her istek `[zaman damgası] METOT /endpoint` biçiminde konsola ve `logs/requests.log` dosyasına yazılır.

## Postman ile test

`postman/TaskFlow.postman_collection.json` dosyasını Postman'da **Import** ederek tüm uçları hazır isteklerle deneyebilirsiniz. (Collection değişkeni `baseUrl` = `http://localhost:3000`)

## Notlar

- Veriler bellektedir; sunucu yeniden başlatıldığında örnek 3 görev yeniden yüklenir.
