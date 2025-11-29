// --- cli.js (GARANTİ ÇALIŞAN MANUEL VERSİYON) ---
import inquirer from 'inquirer';

function baslikYazdir() {
    console.clear(); // Ekranı temizleyelim ki güzel görünsün
    console.log("\n==============================================");
    console.log("   🚀 İTÜ BLOCKCHAIN YÖNETİM PANELİ v1.0 🚀");
    console.log("==============================================\n");
}

function menuBaslat(zincir, BlockRef, testKodlari) {
    
    // 1. Seçenekleri Ekrana Biz Yazdırıyoruz (Hata ihtimali yok)
    console.log("------------------------------------------");
    console.log("[1] ➕ Yeni Blok Ekle (Manuel)");
    console.log("[2] 🏭 Otomatik Blok Üret (Factory)");
    console.log("[3] 📜 Zinciri Görüntüle");
    console.log("[4] 🛡️  Güvenlik Kontrolü (Polis)");
    console.log("[5] 💀 HACKER MODU (Saldırı Testi)");
    console.log("[6] ❌ Çıkış"); 
    console.log("------------------------------------------");

    // 2. Kullanıcıdan sadece numara istiyoruz (Type: input)
    inquirer.prompt([
        {
            type: "input",
            name: "secimNo",
            message: "Yapmak istediğiniz işlemin numarasını girin (1-6):"
        }
    ]).then(cevap => {
        
        // Girilen numarayı (String olabilir) temizleyip kontrol ediyoruz
        const secim = cevap.secimNo.trim();

        if (secim === "1") {
            // MANUEL EKLEME
            inquirer.prompt([
                {
                    type: "input",
                    name: "veri",
                    message: "Blok içine ne yazılacak?:"
                }
            ]).then(veriCevabi => {
                testKodlari.blokEkle(zincir, BlockRef, { mesaj: veriCevabi.veri });
                devamEtmekIcinBekle(zincir, BlockRef, testKodlari);
            });

        } else if (secim === "2") {
            // OTOMATİK EKLEME
            inquirer.prompt([
                {
                    type: "input", // Input kullandık ki hata vermesin
                    name: "adet",
                    message: "Kaç adet blok üretilsin?:"
                }
            ]).then(sayiCevabi => {
                const adet = parseInt(sayiCevabi.adet); // Sayıya çevir
                console.log(`\n⚙️ ${adet} blok üretiliyor...`);
                for(let i=0; i < adet; i++) {
                     testKodlari.blokEkle(zincir, BlockRef, { otomatik: true, sayi: Math.random() });
                }
                devamEtmekIcinBekle(zincir, BlockRef, testKodlari);
            });

        } else if (secim === "3") {
            // GÖRÜNTÜLEME
            console.log("\n📄 --- GÜNCEL ZİNCİR --- 📄");
            console.log(JSON.stringify(zincir, null, 4));
            devamEtmekIcinBekle(zincir, BlockRef, testKodlari);

        } else if (secim === "4") {
            // GÜVENLİK
            console.log("\n👮 Müfettiş incelemeye başlıyor...");
            const sonuc = zincir.isChainValid();
            if(sonuc) console.log("✅ TEBRİKLER! Zincir %100 Sağlam.");
            else console.log("❌ UYARI! Zincirde bozulma tespit edildi.");
            devamEtmekIcinBekle(zincir, BlockRef, testKodlari);

        } else if (secim === "5") {
            // HACK TESTİ
            testKodlari.hackSenaryosu(zincir);
            devamEtmekIcinBekle(zincir, BlockRef, testKodlari);

        } else if (secim === "6") {
            // ÇIKIŞ
            console.log("👋 Güle güle! Program kapatılıyor...");
            process.exit(); 

        } else {
            // YANLIŞ TUŞ
            console.log("⚠️  Geçersiz seçim! Lütfen 1-6 arası bir sayı girin.");
            menuBaslat(zincir, BlockRef, testKodlari);
        }
    });
}

// Menünün hemen kaybolmaması için ufak bir bekleme fonksiyonu
function devamEtmekIcinBekle(zincir, BlockRef, testKodlari) {
    console.log("\n"); // Boşluk bırak
    inquirer.prompt([
        {
            type: "input",
            name: "devam",
            message: "Ana menüye dönmek için ENTER'a basın..."
        }
    ]).then(() => {
        // Başlığı tekrar yazıp menüyü çağır
        baslikYazdir();
        menuBaslat(zincir, BlockRef, testKodlari);
    });
}

export default { baslikYazdir, menuBaslat, };