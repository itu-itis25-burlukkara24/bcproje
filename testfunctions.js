// --- Testing Codes.js ---

// 1-) --- Oto Zincir Üretme Fonksiyonu ---
// Parametreler: Blockchain Sınıfı, Block Sınıfı, Adet
function zincirUret(BlockchainRef, BlockRef, adet) {
    console.log(`\n🏭 Otomatik Blok Üretimi Başladı: ${adet} blok üretilecek.\n`);
    
    // Ana dosyadaki sınıfı kullanarak yeni bir zincir yaratıyoruz
    let yerelCoin = new BlockchainRef(); 

    for (let i = 0; i < adet; i++) {
        const rastgeleMiktar = Math.floor(Math.random() * 100) + 1;
        const blokSirasi = yerelCoin.chain.length;
        
        console.log(`⚙️  Blok ${blokSirasi} işleniyor...`);
        
        // Ana dosyadaki Block sınıfını kullanıyoruz
        yerelCoin.addBlock(new BlockRef(blokSirasi, Date.now(), { amount: rastgeleMiktar }));
    }

    console.log(`\n✅ Üretim Tamamlandı! Toplam Blok Sayısı: ${yerelCoin.chain.length}`);
    return yerelCoin; // Oluşan zinciri geri döndür
}

// 2-) --- Manuel Blok Ekleme ---
// Parametreler: Mevcut Zincir, Block Sınıfı, Veri
function blokEkle(zincir, BlockRef, veri) {
    const index = zincir.chain.length;
    const timestamp = Date.now();

    console.log("⛏️  Madencilik başlıyor...");
    // BlockRef parametresini burada kullanıyoruz
    zincir.addBlock(new BlockRef(index, timestamp, veri));
}

// 3-) --- Hack Senaryosu ---
function hackSenaryosu(zincir) {
    console.log("\n🚨 Zincire saldırı yapılıyor...");

    // Kontrol: Zincirde en az 2 blok var mı?
    if (zincir.chain.length < 2) {
        console.log("⚠️ Hacklemek için yeterli blok yok!");
        return;
    }

    // Hacker veriyi değiştiriyor
    zincir.chain[1].data = { Batıkanın_merte_olan_dolar_borcu: 9999999 };
    
    // Hacker hash'i güncelliyor
    zincir.chain[1].hash = zincir.chain[1].calculateHash();
    
    console.log("Saldırı sonrası zincir geçerli mi? " + zincir.isChainValid());
}

// Fonksiyonları dışarıya açıyoruz [cite: 2]
module.exports = { zincirUret, blokEkle, hackSenaryosu };