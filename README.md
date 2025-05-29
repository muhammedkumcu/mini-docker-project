# Mini Docker Project

Bu proje, Docker Compose ile çoklu servisi (Node.js ve MySQL) çalıştıran basit bir kullanıcı kayıt sistemidir. Kullanıcılar isim, soyisim ve numara bilgilerini tarayıcıdan ekleyebilir ve kaydedilen verileri listeleyebilir.

## ✏️ Özellikler

- 📦 Node.js (Express) web uygulaması
- 🐬 MySQL veritabanı servisi
- 📦 `Dockerfile` ve `docker-compose.yaml` yapılandırma dosyaları
- 💾 Volume kullanımı ile MySQL veri kalıcılığı
- 🌐 Tarayıcıdan form ile canlı veri ekleme ve listeleme
- 🔒 Ortam değişkenleri ile yapılandırma

## 🚀 Kurulum ve Çalıştırma

1️⃣ Projeyi klonla ve çalıştır:  
```bash
git clone https://github.com/muhammedkumcu/mini-docker-project.git
cd mini-docker-project
docker compose up --build -d
```
Adres: http://localhost:3001
