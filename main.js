// --- BLOCKCHAIN PROJE ---
// Gerekli kütüphaneler 
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
// Testing Codes dosyasından fonksiyonları çekiyoruz
const { zincirUret, blokEkle, hackSenaryosu } = require('./Testing Codes');

// --- 1. ADIM: BLOK YAPISI ---
class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("⛏️  Bloğunuz Kazıldı: " + this.hash);
    }
}

// --- 2. ADIM: ZİNCİR (BLOCKCHAIN) YAPISI ---
class Blockchain {
    constructor(dosyaAdi = 'chain.json') {
        this.dosyaAdi = dosyaAdi;
        this.difficulty = 2; 
        this.chain = []; 

        // --- HAFIZA KONTROLÜ ---
        if (fs.existsSync(this.dosyaAdi)) {
            console.log(`💾 ${this.dosyaAdi} bulundu, yükleniyor...`);
            const dosyaIcerigi = fs.readFileSync(this.dosyaAdi);
            const hamVeri = JSON.parse(dosyaIcerigi);

            this.chain = hamVeri.map(blokVerisi => {
                const canliBlok = new Block(
                    blokVerisi.index,
                    blokVerisi.timestamp,
                    blokVerisi.data,
                    blokVerisi.prevHash
                );
                canliBlok.nonce = blokVerisi.nonce;
                canliBlok.hash = blokVerisi.hash;
                return canliBlok;
            });
        } else {
            console.log(`🆕 Kayıt bulunamadı. ${this.dosyaAdi} için Genesis oluşturuluyor...`);
            this.chain = [this.createGenesisBlock()];
            this.saveToDisk();
        }
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);       
        this.chain.push(newBlock);
        this.saveToDisk();
    }

    // --- ZİNCİR DOĞRULAMA (Tek ve Doğru Yer) ---
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Re-hydration sayesinde artık calculateHash çalışır!
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log(` HATA: Blok ${currentBlock.index} verisi değiştirilmiş!`);
                return false;
            }

            if (currentBlock.prevHash !== previousBlock.hash) {
                console.log(` HATA: Blok ${currentBlock.index} zincirden kopuk!`);
                return false;
            }
        }
        console.log(" Zincir İncelemesi Temiz.");
        return true;
    }

    saveToDisk() {
        fs.writeFileSync(this.dosyaAdi, JSON.stringify(this.chain, null, 4));
        console.log(` Zincir ${this.dosyaAdi} dosyasına kaydedildi!`);
    }
}

// --- TEST ALANI (Execution Area) ---

// 1. Manuel Kullanım Örneği
console.log("\n--- MANUEL TEST ---");
let benimZincirim = new Blockchain(); // Varsayılan olarak chain.json kullanır

// DİKKAT: 'Block' sınıfını parametre olarak gönderiyoruz!
blokEkle(benimZincirim, Block, { mesaj: "Manuel ekleme testi" });

// 2. Otomatik Zincir Testi
console.log("\n--- OTOMATİK ZİNCİR TESTİ ---");
// Hem Blockchain hem Block sınıfını gönderiyoruz
let otoZincir = zincirUret(Blockchain, Block, 3); 

// 3. Sonuçları Görme
console.log("\n--- OLUŞAN ZİNCİR ---");
console.log(JSON.stringify(otoZincir, null, 4));

// 4. Hack Testi
hackSenaryosu(otoZincir);
