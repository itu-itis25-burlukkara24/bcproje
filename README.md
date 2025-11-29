# 🚧 Basic Blockchain Project (Week 3)

Bu repo, **İTÜ Blockchain Kulübü** 3. hafta eğitimi kapsamında verilen "Node.js ile Kendi Blockchain'ini Yaz" ödevi için oluşturulmuştur.

Amacımız, herhangi bir hazır framework kullanmadan JavaScript ile temel bir blokzincir yapısı (Blok, Zincir, Hash) oluşturmak ve terminal üzerinde çalıştırmaktır.

## 👥 Takım Üyeleri
* Yusuf Bürlükara
* Mert Süral

## 🎯 Proje Hedefleri ve Yol Haritası (Roadmap)

Sadece temel bir zincir değil, yaşayan ve etkileşimli bir sistem kurmayı hedefliyoruz:

### 🏗️ Faz 1: Temel Mimari (Core)
- [x] Proje kurulumu ve kütüphane entegrasyonu (`crypto-js`)
- [x] **Block** sınıfı ve veri yapısı
- [x] **SHA-256** şifreleme algoritması
- [x] **Mining (Proof of Work)** mekanizması ⛏️
- [x] **Blockchain** sınıfı ve zincirleme mantığı
- [x] **Genesis (İlk)** bloğun yaratılması

### 🛡️ Faz 2: Güvenlik ve Doğrulama
- [x] **Zincir Sağlığı Kontrolü (`isChainValid`):** Zincirde manipülasyon (hack) girişimi var mı?
- [ ] **Dinamik Zorluk Seviyesi:** Ağ gücüne göre madenciliğin zorlaşması.

### 💾 Faz 3: Kalıcılık ve Arayüz (Bonus Features)
- [x] **Veri Kalıcılığı (JSON):** Program kapansa bile blokların silinmemesi için dosya sistemi (`fs`) entegrasyonu.
- [ ] **CLI Arayüzü:** Kullanıcının terminal üzerinden interaktif işlem yapabilmesi (Menü sistemi).