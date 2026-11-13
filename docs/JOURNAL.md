# JOURNAL (en yeni üstte, 5 satır/oturum)

## 13.11 Taş Fener — tünel takılması 2
Tolga: biraz düzeldi, hâlâ hafif takılıyor. Ölçüm (80 derinlik noktası): yakın ürünler ekranın ~9 katı alanı kaplıyor, maliyet piksel sayısıyla gidiyor. Tuval çözünürlük tavanı 2 -> 1.5 (ortalama kare 104 -> 44 ms, en kötü 415 -> 117 ms, yazılım çizimde), 640px kopya eklendi. Yerel, yayın bekliyor.

## 13.11 Taş Fener — tünel takılması
Tolga: web çok takılıyor. Sebep: görseller 900px oldu, her karede ~114 ürün büyük resimden küçültülerek çiziliyordu (ölçüm: kare başı 462 ms). Çözüm: her ürünün 96/192/384px kopyası bir kez hazırlanıyor, ekrandaki boyuna yetecek en küçük kopya çiziliyor (ölçüm: 14 ms, ~32 kat hızlı). YAYINDA, canlıda doğrulandı.

## 13.11 Taş Fener — app ile eşitleme
Tolga: "web versiyonunu da aynı şekilde düzenle". Gömülü URUNLER/ASPECT çıkarıldı, veri/ dosyalarından okunuyor (app ile aynı). kaynak/web app img/ ile eşitlendi (eski hali .tmp/web-yedek). Tünele Ara+kategori, ürün sayfasına açı galerisi. Test: 94 ürün yüklendi, kırık 0, "porselen" 9 sonuç, lamba 4 açı tam görünüyor.

## 2026-10-29 — Halalar başlangıç
37 HEIC incelendi, rembg+birefnet ile kesim, yön sorunu (EXIF 6) çözüldü, index.html iskeleti yazıldı, ek kırpma listesi (26 parça) hazırlandı.

## 2026-10-29 gece — düzeltme
Tolga: istenen liste değil, "tavşan deliği" tüneli (derinliğe ilerleme, hover detay, tıkla ürün sayfası). index.html baştan yazıldı (CSS 3D perspective, scroll=kamera z), urun.html + urunler.js eklendi. Ders LESSONS + ortak hafızaya yazıldı.

## 2026-10-30 sabah
Siyah zemin, 4 duvar+köşe yerleşimi, forma göre duvar seçimi, pus kaldırıldı. Instagram @halalarsunar 217 kare indi, 23 ürün seçilip kesildi ve eklendi. Telefon kopmaları: pmset kaydı kapak kapanınca pilde uyku (29.10 12:09, 30.10 01:07).
