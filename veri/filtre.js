// Ara filtreleri: her kategoriye kendi filtreleri (giyimde tür/beden/renk, beyaz eşyada tür/marka/kapasite,
// antikada dönem/malzeme; fiyat her yerde). Aynı filtrede çoklu seçim (VEYA), farklı filtreler birlikte (VE).
// Her seçeneğin yanında ürün sayısı; sonuç vermeyen seçenek kapalı. Site (index.html) ve uygulama destesi aynı dosyayı kullanır.
// Gerekli genel veriler: URUNLER, KATEGORI, FIYAT (Halalar), DUKKAN2 (DSG), DUKKAN3 (Önsal).
window.HPF=(()=>{
  const SIRA=['Fiyat','Tür','Beden','Renk','Marka','Kapasite','Dönem','Malzeme'];
  const FIYATK=['Teklif ile','1.000 ₺ altı','1.000–5.000 ₺','5.000–20.000 ₺','20.000 ₺ ve üstü'];
  const BEDEN=['XS','S','M','L','XL','XXL','28','30','32','34','36','38'];
  const KAPK=['8 kg ve altı','9–10 kg','11 kg ve üstü','300 L altı','300–450 L','450 L ve üstü'];
  const kucuk=t=>(t||'').toLocaleLowerCase('tr-TR');
  const buyukIlk=t=>t?t.charAt(0).toLocaleUpperCase('tr-TR')+t.slice(1):t;
  // Türkçe harfleri de sayan kelime sınırı ("taş" eşleşir, "taşır" eşleşmez)
  const kelime=(m,k)=>new RegExp('(^|[^a-zçğıöşü])'+k+'([^a-zçğıöşü]|$)').test(m);
  const fiyatK=f=>!f?'Teklif ile':f<1000?FIYATK[1]:f<5000?FIYATK[2]:f<20000?FIYATK[3]:FIYATK[4];
  const RENK={siyah:'Siyah',beyaz:'Beyaz','buz gri':'Gri',gri:'Gri',antrasit:'Antrasit',lacivert:'Lacivert',
    'açık mavi':'Mavi',mavi:'Mavi',bej:'Bej',krem:'Krem',ekru:'Krem',haki:'Haki','yeşil':'Yeşil','kırmızı':'Kırmızı',
    bordo:'Bordo',kahverengi:'Kahverengi',kahve:'Kahverengi','inoks':'İnoks',inox:'İnoks',silver:'Gri'};
  const renkler=m=>{const s=new Set();Object.keys(RENK).sort((a,b)=>b.length-a.length).forEach(k=>{if(kelime(m,k))s.add(RENK[k])});return [...s]};
  const ONSAL=[['Buzdolabı',/buzdolab|derin dondurucu|kombi tipi/],['Çamaşır makinesi',/çamaşır makine/],['Kurutma makinesi',/kurutma makine/],
    ['Bulaşık makinesi',/bulaşık makine/],['Fırın',/fırın/],['Ocak',/ocak/],['Aspiratör',/aspiratör|davlumbaz/],['Mikrodalga',/mikrodalga/],
    ['Süpürge',/süpürge/],['Klima',/klima/],['Termosifon',/termosifon|şofben/],['Kahve makinesi',/kahve|espresso/],['Ütü',/ütü/],
    ['Tost makinesi',/tost/],['Blender',/blender|doğrayıcı|rondo|mikser/],['Su ısıtıcı',/kettle|su ısıtıcı/],['Isıtıcı',/radyatör|ısıtıcı|soba/],['Vantilatör',/vantilatör/],['Temizlik makinesi',/buharlı temizleyici|yıkama makine/],['Su sebili',/sebil/],['Çay makinesi',/çay makine/],['Tartı',/tartı/],['Fritöz',/fritöz|airfryer|air fryer/],
    ['Saç bakımı',/saç|fön|düzleştirici/],['Tıraş',/tıraş|epilatör/],['Televizyon',/\btv\b|televizyon/]];
  const MALZ=['porselen','ahşap','metal','kristal','pirinç','gümüş','bronz','cam','bakır','deri','seramik','taş','kumaş','mermer','plastik'];
  const onbellek={};
  function oz(id){if(onbellek[id])return onbellek[id];const o={};
    if(/^d2:/.test(id)&&typeof DUKKAN2!=='undefined'){const u=DUKKAN2.urunler.find(x=>'d2:'+x.id===id);if(u){const m=kucuk(u.ad);
      o['Fiyat']=[fiyatK(u.fiyat)];o['Tür']=[buyukIlk(u.ad.split(' · ')[0].trim())];
      o['Beden']=u.kategori==='Alt giyim'?['28','30','32','34','36','38']:['S','M','L','XL','XXL'];   // örnek: her ürün her bedende var sayılır (sahip 19.11)
      const r=renkler(m);if(r.length)o['Renk']=r}}
    else if(/^d3:/.test(id)&&typeof DUKKAN3!=='undefined'){const u=DUKKAN3.urunler.find(x=>'d3:'+x.id===id);if(u){const A=u.tamAd||u.ad,m=kucuk(A+' '+(u.aciklama||''));   // tamAd: model kodlu tam ad (dukkan3.js)
      o['Fiyat']=[fiyatK(u.fiyat)];if(u.marka)o['Marka']=[u.marka];
      const t=ONSAL.find(x=>x[1].test(kucuk(A)))||ONSAL.find(x=>x[1].test(m));if(t)o['Tür']=[t[0]];
      const r=renkler(kucuk(A));if(r.length)o['Renk']=r;
      const kg=A.match(/(\d+(?:[.,]\d+)?)(?:\/\d+)?\s*kg/i),lt=A.match(/(\d+)\s*(?:L|lt|litre)\b/i);
      if(kg&&t&&/Çamaşır|Kurutma|Bulaşık/.test(t[0])){const v=parseFloat(kg[1].replace(',','.'));o['Kapasite']=[v<=8?KAPK[0]:v<=10?KAPK[1]:KAPK[2]]}
      else if(lt&&t&&t[0]==='Buzdolabı'){const v=+lt[1];o['Kapasite']=[v<300?KAPK[3]:v<450?KAPK[4]:KAPK[5]]}}}
    else if(typeof URUNLER!=='undefined'){const u=URUNLER.find(x=>x[0]===id);if(u){
      o['Fiyat']=[fiyatK(typeof FIYAT!=='undefined'?FIYAT[id]:0)];
      const d=String(u[3]||'').match(/(\d{4})|(\d{2})'/);if(d){const y=d[1]?+d[1]:1900+ +d[2],on=Math.floor(y/10)*10,s=on%100;
        o['Dönem']=[on+"'"+({0:'ler',10:'lar',20:'ler',30:'lar',40:'lar',50:'ler',60:'lar',70:'ler',80:'ler',90:'lar'}[s])]}
      const m=kucuk(u[1]+' '+u[2]),ml=MALZ.filter(k=>kelime(m,k)).map(buyukIlk);if(ml.length)o['Malzeme']=ml}}
    return onbellek[id]=o}
  const sirala=(g,a)=>{const L=g==='Fiyat'?FIYATK:g==='Beden'?BEDEN:g==='Kapasite'?KAPK:null;return L?a.sort((x,y)=>L.indexOf(x)-L.indexOf(y)):a};
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  let cssTamam=false;
  function css(){if(cssTamam)return;cssTamam=true;const s=document.createElement('style');s.textContent=`
.hpf{max-width:1200px;width:100%;margin:0 auto;padding:0 var(--hpf-pad,32px) 10px;color:#111114}
.hpf-ust{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.hpf-ac{background:#111114;color:#fff;border:0;padding:9px 14px;font:700 14px/1 "Barlow Condensed",sans-serif;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}
.hpf-ac[aria-expanded="true"]{background:#e8201c}
.hpf-say{font:700 13px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#77777f}
.hpf-et{display:inline-flex;align-items:center;gap:6px;background:#f1f1f3;border:1px solid #dcdce1;color:#111114;padding:6px 9px;font:600 13px/1 Barlow,sans-serif;cursor:pointer}
.hpf-et::after{content:"×";font-size:16px;line-height:1;color:#e8201c}
.hpf-tem{background:none;border:0;color:#4a4a52;font:500 13px Barlow,sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:6px 2px}
.hpf-panel{margin-top:10px;border-top:1px solid #e4e4e8;padding-top:6px}
.hpf-panel[hidden]{display:none}
.hpf-g{padding:8px 0;border-bottom:1px solid #f1f1f3}
.hpf-g>b{display:block;font:400 18px/1.1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em;margin-bottom:7px}
.hpf-sec{display:flex;flex-wrap:wrap;gap:6px}
.hpf-s{display:inline-flex;align-items:baseline;gap:6px;background:#fff;border:1px solid #c9c9d0;color:#111114;padding:8px 11px;font:500 14px/1 Barlow,sans-serif;cursor:pointer;min-height:36px}
.hpf-s i{font-style:normal;font-size:11px;color:#77777f}
.hpf-s[aria-pressed="true"]{background:#e8201c;border-color:#e8201c;color:#fff}.hpf-s[aria-pressed="true"] i{color:#ffd9d6}
.hpf-s:disabled{opacity:.35;cursor:default}
.hpf-not{margin:8px 0 0;font:500 13px/1.4 Barlow,sans-serif;color:#4a4a52}
.hpf-goster{display:none;width:100%;margin-top:10px;background:#1b2fa0;color:#fff;border:0;padding:13px;font:400 18px/1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.03em;cursor:pointer}
@media(max-width:600px){.hpf{padding:0 16px 8px}.hpf-goster{display:block}}`;document.head.appendChild(s)}
  // host: filtrelerin çizileceği kutu; degisti(): seçim değişince sayfa sonuçları yeniden süzer
  function kur(host,degisti){css();host.classList.add('hpf');const SEC={};let taban=[],acik=true;   // telefonda da açık başlar (Tolga 21.11)
    const kac=()=>Object.values(SEC).reduce((t,s)=>t+s.size,0);
    const uyar=(id,haric)=>{const o=oz(id);return Object.keys(SEC).every(g=>g===haric||!SEC[g].size||(o[g]||[]).some(v=>SEC[g].has(v)))};
    function ciz(sonucSay){const G={};taban.forEach(id=>{const o=oz(id);Object.keys(o).forEach(g=>o[g].forEach(v=>{(G[g]=G[g]||{})[v]=0}))});
      // sayılar: o filtre dışındaki seçimler uygulanmış hâliyle
      taban.forEach(id=>{const o=oz(id);Object.keys(o).forEach(g=>{if(uyar(id,g))o[g].forEach(v=>G[g][v]++)})});
      // birden çok dükkân karışıksa (Pazar, Tümü) yalnız fiyat; kategori ya da dükkân seçilince ona özel filtreler (ürünlerin en az %15'inde olan)
      const coklu=new Set(taban.map(id=>(id.match(/^d[23]:/)||['h'])[0])).size>1,kapsam=g=>taban.filter(id=>oz(id)[g]).length/Math.max(1,taban.length);
      const gs=SIRA.filter(g=>G[g]&&((SEC[g]&&SEC[g].size)||(Object.keys(G[g]).length>1&&(coklu?g==='Fiyat':kapsam(g)>=.15))));
      Object.keys(SEC).forEach(g=>{if(!G[g])delete SEC[g]});
      const et=[];Object.keys(SEC).forEach(g=>SEC[g].forEach(v=>et.push(`<button class="hpf-et" type="button" data-g="${esc(g)}" data-v="${esc(v)}" aria-label="${esc(v)} filtresini kaldır">${esc(v)}</button>`)));
      host.innerHTML=gs.length?`<div class="hpf-ust"><button class="hpf-ac" type="button" aria-expanded="${acik}">Filtrele${kac()?' ('+kac()+')':''}</button><span class="hpf-say">${sonucSay} ürün</span>${et.join('')}${kac()?'<button class="hpf-tem" type="button">Temizle</button>':''}</div>
<div class="hpf-panel"${acik?'':' hidden'}>${gs.map(g=>`<div class="hpf-g"><b>${esc(g)}</b><div class="hpf-sec">${sirala(g,Object.keys(G[g])).map(v=>{const on=!!(SEC[g]&&SEC[g].has(v)),n=G[g][v];return `<button class="hpf-s" type="button" data-g="${esc(g)}" data-v="${esc(v)}" aria-pressed="${on}"${!n&&!on?' disabled':''}>${esc(v)}<i>${n}</i></button>`}).join('')}</div></div>`).join('')}${coklu?'<p class="hpf-not">Kategori seç, o kategoriye özel filtreler (beden, renk, marka…) çıksın.</p>':''}<button class="hpf-goster" type="button">${sonucSay} ürünü göster</button></div>`:''}
    host.onclick=e=>{const b=e.target.closest('button');if(!b)return;
      if(b.classList.contains('hpf-ac')||b.classList.contains('hpf-goster')){acik=b.classList.contains('hpf-ac')?!acik:false;degisti();return}
      if(b.classList.contains('hpf-tem')){Object.keys(SEC).forEach(g=>delete SEC[g]);degisti();return}
      const g=b.dataset.g,v=b.dataset.v;if(!g)return;const s=SEC[g]=SEC[g]||new Set();
      if(b.classList.contains('hpf-et')||s.has(v))s.delete(v);else s.add(v);if(!s.size)delete SEC[g];degisti()};
    return {
      // ids: arama ve kategoriden geçen ürünler; döner: filtrelere de uyanlar
      suz(ids){taban=ids;const L=ids.filter(id=>uyar(id,null));ciz(L.length);return new Set(L)},
      durum:()=>({sec:Object.fromEntries(Object.entries(SEC).map(([g,s])=>[g,[...s]])),acik}),
      yukle(d){Object.keys(SEC).forEach(g=>delete SEC[g]);if(d&&d.sec)Object.entries(d.sec).forEach(([g,a])=>{if(a.length)SEC[g]=new Set(a)});if(d&&'acik' in d)acik=d.acik},
      temizle(){Object.keys(SEC).forEach(g=>delete SEC[g])}}}
  return {oz,kur}})();
