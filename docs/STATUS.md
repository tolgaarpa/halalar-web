# STATUS (üzerine yaz, ~40 satır)
ŞU AN (13.11, Taş Fener): halalar-app ile aynı veri — veri/ (urunler, aspect, galeri, kategoriler; halalar-app'ten kopya), görseller kaynak/web (app img/ kopyası, 94 ürün). Tünele "Ara" + kategori; urun.html açı galerisi + kategori. Yerelde test edildi (8766), YAYINDA (13.11). Güncelleme: app'te değişince veri/ ve kaynak/web yeniden kopyalanır.
Canlı adres (GitHub Pages, 30.10.2026): https://tolgaarpa.github.io/halalar-web/ — depo github.com/tolgaarpa/halalar-web (herkese açık). Güncelleme: git commit + git push, 1-2 dk sonra yayında.
Odak: Halalar tünel sitesi — index.html artık TEK CANVAS üzerine çiziyor (DOM 3B katman sürümü .tmp/index_dom3d_yedek.html). Siyah zemin, çerçeve çevresine eşit dağılım, uzun ürünlere eğim, hover kartı, tık = urun.html.
Aç: python3 -m http.server 8766 (halalar-web içinde) → http://127.0.0.1:8766/index.html (file:// ile açınca Chrome resimleri engelliyor).
Ürünler: 49 dükkân fotoğrafı + 23 Instagram (@halalarsunar, kaynak/ig_secim → kaynak/kesik/ig), x10 tekrar.
Bilinen kusur: ig_maske kesiğinde siyah eldiven kaldı; 3477 kedi kesiğinde tabure; ilk ekranda üst-orta/alt-orta az boşluk.
Görevler: P1 Tolga onayı (todo), P2 maske eldiveni temizle (todo), P2 mobil dokunma testi (todo).

## Project

**Project id:** halalar-web-2026-11-11
**Project root:** /Users/phuket/Desktop/halalar-web

