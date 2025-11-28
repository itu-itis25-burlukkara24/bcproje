// --- 1. ADIM: BLOK YAPISI ---
const SHA256 = require('crypto-js/sha256');

// En temel parça olan bloğu oluşturacak olan kod
class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index =index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }
// Hash'i hesaplıyoruz
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Madencilik yapan fonksiyonumuz bu şekilde ilk ürettiğimiz blok bile bizim istediğimiz formatta olacak
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Bloğunuz Kazıldı:" + this.hash);
    }
}
// --- 2. ADIM: ZİNCİR (BLOCKCHAIN) YAPISI ---
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // Mining'i yavaşlatmak için eklediğimiz difficulty değeri
    }

    // İlk bloğu yaratan fonksiyon
    createGenesisBlock() {
        return new Block(1, "28/11/2025", "Genesis Block", "0");
    }

    // Zincirin en sonundaki bloğu bulur
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Zincire yeni blok ekler
    addBlock(newBlock) {
        // Yeni gelen bloğun "prevHash"ine, şu anki son bloğun hash'ini yazar
        newBlock.prevHash = this.getLatestBlock().hash;

        // 2. Madencilik işlemini başlatır
        newBlock.mineBlock(this.difficulty);

        // 3. Bloğu zincire ekler
        this.chain.push(newBlock);
    }
}