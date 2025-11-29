// --- testfunctions.js ---

// 1-) --- Oto Zincir Üretme Fonksiyonu ---
export function zincirUret(BlockchainRef, BlockRef, adet) {
    console.log(`\n🏭 Otomatik Blok Üretimi Başladı: ${adet} blok üretilecek.\n`);
    
    let yerelCoin = new BlockchainRef(); 

    for (let i = 0; i < adet; i++) {
        const rastgeleMiktar = Math.floor(Math.random() * 100) + 1;
        const blokSirasi = yerelCoin.chain.length;
        
        console.log(`⚙️  Blok ${blokSirasi} işleniyor...`);
        
        yerelCoin.addBlock(new BlockRef(blokSirasi, Date.now(), { amount: rastgeleMiktar }));
    }

    console.log(`\n✅ Üretim Tamamlandı! Toplam Blok Sayısı: ${yerelCoin.chain.length}`);
    
    return yerelCoin; // BURASI ARTIK GÜVENDE (Fonksiyonun içinde)
}

// 2-) --- Manuel Blok Ekleme ---
export function blokEkle(zincir, BlockRef, veri) {
    const index = zincir.chain.length;
    const timestamp = Date.now();

    console.log("⛏️  Madencilik başlıyor...");
    zincir.addBlock(new BlockRef(index, timestamp, veri));
}

// 3-) --- Hack Senaryosu ---
export function hackSenaryosu(zincir) {
    console.log("\n🚨 Zincire saldırı yapılıyor...");

    if (zincir.chain.length < 2) {
        console.log("⚠️ Hacklemek için yeterli blok yok!");
        return;
    }

    // Veriyi ve Hash'i değiştiriyoruz
    zincir.chain[1].data = { Batıkanın_merte_olan_dolar_borcu: 9999999 };
    

    if(typeof zincir.chain[1].calculateHash === 'function'){
        zincir.chain[1].hash = zincir.chain[1].calculateHash();
    }
    
    console.log("Saldırı sonrası zincir geçerli mi? " + zincir.isChainValid());
}


