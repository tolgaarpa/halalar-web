// Görüş bildir (test dönemi, Tolga 21.11): her sayfanın sağ kenarında küçük bir sekme.
// Yazılan görüş Firestore 'gorusler' koleksiyonuna düşer; yalnız yönetici panelde okur (halalar-app/panel.html).
// Kullanım: <script src="veri/gorus.js" defer></script>  (site sayfalarına hesap-ikon.js ekler; uygulama kendi yükler)
(()=>{if(window.HP_GORUS)return;window.HP_GORUS=1;
  const KOK=(document.currentScript&&document.currentScript.src||'').replace(/[^/]*$/,'');   // bu dosyanın klasörü (veri/)
  const FB='https://www.gstatic.com/firebasejs/10.12.2/';
  const yukle=src=>new Promise((ok,hata)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=hata;document.head.appendChild(s)});
  async function vt(){
    if(typeof firebase==='undefined')await yukle(FB+'firebase-app-compat.js');
    if(!firebase.firestore)await yukle(FB+'firebase-firestore-compat.js');
    if(!firebase.apps.length){if(typeof FIREBASE_AYAR==='undefined')await yukle(KOK+'firebase-ayar.js');firebase.initializeApp(FIREBASE_AYAR)}
    return firebase.firestore()}
  const css=`.hpg-sek{position:fixed;right:0;top:50%;z-index:140;transform:translateY(-50%);writing-mode:vertical-rl;rotate:180deg;background:#e8201c;color:#fff;border:0;
    padding:12px 7px;font:700 12px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;border-radius:0 6px 6px 0;opacity:.9}
  .hpg-sek:hover{opacity:1}
  .hpg-pen{position:fixed;inset:0;z-index:150;background:rgba(8,8,10,.72);display:flex;align-items:center;justify-content:center;padding:16px}
  .hpg-pen[hidden]{display:none}
  .hpg-kut{width:min(440px,100%);background:#111114;color:#f2efe9;border:1px solid #2a2a30;padding:22px 20px 18px;font:400 15px/1.45 Barlow,sans-serif}
  .hpg-kut b{display:block;font:400 26px/1 Anton,sans-serif;text-transform:uppercase;margin-bottom:6px}
  .hpg-kut p{color:#9a958c;font-size:13px;margin:0 0 12px}
  .hpg-kut textarea,.hpg-kut input{width:100%;box-sizing:border-box;background:#17171b;border:1px solid #2a2a30;color:inherit;padding:11px 12px;font:400 16px/1.4 Barlow,sans-serif;border-radius:3px;outline:none}
  .hpg-kut textarea{height:120px;resize:vertical;margin-bottom:10px}
  .hpg-alt{display:flex;gap:10px;justify-content:flex-end;margin-top:14px}
  .hpg-alt button{border:1px solid #55555e;background:none;color:inherit;padding:11px 18px;font:700 14px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
  .hpg-alt .hpg-gon{background:#e8201c;border-color:#e8201c;color:#fff}
  .hpg-alt button:disabled{opacity:.5;cursor:default}
  .hpg-dur{min-height:18px;font-size:13px;color:#9a958c;margin-top:8px}
  html[data-tema="gunduz"] .hpg-kut{background:#fff;color:#111114;border-color:#dcdce1}
  html[data-tema="gunduz"] .hpg-kut textarea,html[data-tema="gunduz"] .hpg-kut input{background:#f4f4f6;border-color:#dcdce1}
  html[data-tema="gunduz"] .hpg-alt button{border-color:#c9c9d0}
  html[data-tema="gunduz"] .hpg-alt .hpg-gon{border-color:#e8201c}`;
  function kur(){
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    const sek=document.createElement('button');sek.type='button';sek.className='hpg-sek';sek.textContent='Görüş bildir';
    const pen=document.createElement('div');pen.className='hpg-pen';pen.hidden=true;pen.setAttribute('role','dialog');pen.setAttribute('aria-label','Görüş bildir');
    pen.innerHTML=`<div class="hpg-kut"><b>Görüşün</b><p>Test dönemindeyiz. Bozuk bir şey, beğendiğin ya da eksik bulduğun ne varsa yaz.</p>
      <textarea class="hpg-met" maxlength="1000" placeholder="Ne gördün?"></textarea>
      <input class="hpg-il" maxlength="80" autocomplete="name" placeholder="Adın ya da telefonun (istersen)">
      <div class="hpg-dur" role="status"></div>
      <div class="hpg-alt"><button type="button" class="hpg-kap">Vazgeç</button><button type="button" class="hpg-gon">Gönder</button></div></div>`;
    document.body.append(sek,pen);
    const met=pen.querySelector('.hpg-met'),il=pen.querySelector('.hpg-il'),dur=pen.querySelector('.hpg-dur'),gon=pen.querySelector('.hpg-gon');
    const ac=()=>{pen.hidden=false;dur.textContent='';gon.disabled=false;setTimeout(()=>met.focus(),30)},kapa=()=>{pen.hidden=true};
    // sayfanın kendi tıklama/kaydırma dinleyicileri (tünel) pencereye karışmasın
    ['click','wheel','touchstart','touchmove','pointerdown','mousedown','keydown'].forEach(t=>{pen.addEventListener(t,e=>e.stopPropagation());sek.addEventListener(t,e=>e.stopPropagation())});
    sek.onclick=ac;pen.querySelector('.hpg-kap').onclick=kapa;pen.addEventListener('click',e=>{if(e.target===pen)kapa()});
    pen.addEventListener('keydown',e=>{if(e.key==='Escape')kapa()});
    gon.onclick=async()=>{const m=met.value.trim();if(m.length<2){dur.textContent='Birkaç kelime yaz.';met.focus();return}
      gon.disabled=true;dur.textContent='Gönderiliyor…';
      try{const db=await vt();await db.collection('gorusler').add({metin:m.slice(0,1000),iletisim:il.value.trim().slice(0,80),
          sayfa:(location.host+location.pathname+location.search).slice(0,200),ekran:(innerWidth+'x'+innerHeight).slice(0,20),zaman:firebase.firestore.FieldValue.serverTimestamp()});
        met.value='';dur.textContent='Teşekkürler, aldık.';setTimeout(kapa,1400)}
      catch(e){console.warn('görüş gönderilemedi',e);dur.textContent='Gönderilemedi, biraz sonra tekrar dener misin?';gon.disabled=false}};
  }
  if(document.body)kur();else document.addEventListener('DOMContentLoaded',kur);
})();
