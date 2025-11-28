//Hash'i hesaplayabilmek için kripto modülünü çekiyoruz
const SHA256 = require('crypto-js/sha256');

//En temel parça olan bloğu oluşturacak olan kod
class Block {
    constructor(index, timestamp, data, prevHash = '') {
        this.index =index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data) + this.nonce).toString();
    }

    //Madencilik için gerekli fonksiyon daha difficulty belirlenmedi
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
        // Tren raylara indiğinde ilk vagonu (Genesis) otomatik ekle
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // Zorluk seviyesi (Mining için)
    }

    // İlk vagonu (Atayı) yaratan fonksiyon
    createGenesisBlock() {
        return new Block(1, "28/11/2025", "Genesis Block", "0");
    }

    // Zincirin en sonundaki vagonu bulur
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Zincire yeni vagon ekler
    addBlock(newBlock) {
        // 1. Yeni gelen vagonun "prevHash"ine, şu anki son vagonun hash'ini yazar
        newBlock.prevHash = this.getLatestBlock().hash;

        // 2. Madencilik (Mining) işlemini başlatır
        // (Zorluk seviyesine göre hash bulmaya çalışır)
        newBlock.mineBlock(this.difficulty);

        // 3. Vagonu zincire ekler
        this.chain.push(newBlock);
    }
}