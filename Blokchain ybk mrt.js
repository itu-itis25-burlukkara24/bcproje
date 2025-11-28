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