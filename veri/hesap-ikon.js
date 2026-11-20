// Sağ üst köşedeki hesap simgesi: Hesabım, Bilmen gerekenler ve diğer bilgiler tek yerde. Her web sayfasında aynı.
// Kullanım: <nav>'dan hemen sonra <script src="veri/hesap-ikon.js"></script>
// Tema her sayfadan seçilir: Gece (varsayılan) / Gündüz. Seçim cihazda kalır, sayfalar 'hptema' olayıyla haber alır.
try{if(localStorage.getItem('hp-tema')==='gunduz')document.documentElement.dataset.tema='gunduz'}catch(e){}
window.hpTema=t=>{const g=t==='gunduz';if(g)document.documentElement.dataset.tema='gunduz';else delete document.documentElement.dataset.tema;try{localStorage.setItem('hp-tema',g?'gunduz':'gece')}catch(e){}dispatchEvent(new Event('hptema'))};
(()=>{const nav=document.querySelector('nav');if(!nav)return;
  const evde=/hit\.html$/.test(location.pathname),y=id=>(evde?'#':'hit.html#')+id;
  const css=`.hik{position:relative;display:flex;align-items:center;pointer-events:auto}
nav .hik .hik-btn{display:grid;place-items:center;width:46px;height:46px;margin:0;padding:0;background:#0b0b0d;border:1px solid #3a3a42;border-radius:50%;color:#f2efe9;cursor:pointer;box-shadow:none;transition:border-color .2s,background .2s}
nav .hik .hik-btn:hover,nav .hik .hik-btn[aria-expanded="true"]{border-color:#f2efe9;background:#16161a}
.hik-menu{position:absolute;top:calc(100% + 10px);right:0;z-index:96;width:min(300px,calc(100vw - 24px));background:#0b0b0df5;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid #2a2a30;box-shadow:0 30px 60px #000c;padding:6px 0;text-shadow:none;text-align:left}
nav .hik .hik-menu a{display:block;padding:11px 20px;margin:0;text-decoration:none;color:#f2efe9;border:0;border-left:3px solid transparent;font:400 16px/1.3 Barlow,system-ui,sans-serif;letter-spacing:normal;text-transform:none;white-space:normal}
nav .hik .hik-menu a b{display:block;font:400 20px/1.1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em}
nav .hik .hik-menu a small{display:block;margin-top:2px;font-size:12.5px;line-height:1.3;color:#9a958d}
nav .hik .hik-menu a:hover,nav .hik .hik-menu a:focus-visible{background:#16161a;border-left-color:#e8201c}
.hik-menu .hik-alt{border-top:1px solid #222227;margin-top:6px;padding-top:4px}
nav .hik .hik-menu .hik-alt a{padding:8px 20px;font-size:14px;color:#cfcac1}
.hik-menu[hidden]{display:none}
nav .hik a.hik-hesap{display:inline-flex;align-items:center;margin:0 10px 0 0;padding:11px 14px;border:0;background:#1b2fa0;color:#fff;font:700 15px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;white-space:nowrap}
nav .hik a.hik-hesap:hover{background:#e8201c;color:#fff}
nav .hik a.hik-hesap[hidden]{display:none}
@media(max-width:600px){nav .hik a.hik-hesap{position:absolute;top:calc(100% + 3px);right:0;margin:0;padding:5px 7px;font-size:11px;letter-spacing:.06em;z-index:2}}
.hik-tema{display:flex;align-items:center;gap:8px;padding:12px 20px;border-top:1px solid #222227;margin-top:6px;color:#f2efe9}
.hik-tema b{font:400 20px/1.1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em;margin-right:auto}
.hik-tb{background:none;border:1px solid #3a3a42;color:inherit;padding:8px 11px;font:700 14px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
.hik-tb[aria-pressed="true"]{background:#e8201c;border-color:#e8201c;color:#fff}
html[data-tema="gunduz"] nav .hik .hik-btn{background:#fff;border-color:#c9c9d0;color:#111114}
html[data-tema="gunduz"] nav .hik .hik-btn:hover,html[data-tema="gunduz"] nav .hik .hik-btn[aria-expanded="true"]{background:#f1f1f3;border-color:#111114}
html[data-tema="gunduz"] .hik-menu{background:#fffffff7;border-color:#dcdce1;box-shadow:0 24px 50px #0002}
html[data-tema="gunduz"] nav .hik .hik-menu a{color:#111114}
html[data-tema="gunduz"] nav .hik .hik-menu a small{color:#77777f}
html[data-tema="gunduz"] nav .hik .hik-menu .hik-alt a{color:#4a4a52}
html[data-tema="gunduz"] .hik-menu .hik-alt,html[data-tema="gunduz"] .hik-tema{border-top-color:#e4e4e8}
html[data-tema="gunduz"] .hik-tema{color:#111114}
html[data-tema="gunduz"] .hik-tb{border-color:#c9c9d0}
html[data-tema="gunduz"] .hik-tb[aria-pressed="true"]{border-color:#e8201c}
html[data-tema="gunduz"] nav .hik .hik-menu a:hover,html[data-tema="gunduz"] nav .hik .hik-menu a:focus-visible{background:#f1f1f3}
.hik-sag{display:flex;align-items:center;gap:18px}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  const k=document.createElement('span');k.className='hik';
  k.innerHTML=`<button class="hik-btn" id="hikBtn" type="button" aria-label="Hesap ve bilgiler" aria-expanded="false" aria-controls="hikMenu"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c.8-4.4 4.2-6.6 8.5-6.6s7.7 2.2 8.5 6.6"/></svg></button>
<div class="hik-menu" id="hikMenu" hidden>
  <a href="${y('hesap')}"><b id="ustHesap">Hesabım</b><small>Üye girişi, beğenilerim, teklif ve taleplerim</small></a>
  <a href="${y('bilmen')}"><b>Bilmen gerekenler</b><small>Fiyat, ödeme, ürün durumu</small></a>
  <a href="${y('nasil')}"><b>Nasıl çalışır?</b><small>Kaydır, seç, teklif yap, satın al</small></a>
  <a href="${y('dukkan-ac')}"><b>Dükkân aç</b><small>Dükkânını sokağa aç</small></a>
  <div class="hik-tema"><b>Tema</b><button class="hik-tb" type="button" data-tema="gece">Gece</button><button class="hik-tb" type="button" data-tema="gunduz">Gündüz</button></div>
  <div class="hik-alt"><a href="satis-kosullari.html">Satış koşulları</a><a href="https://tolgaarpa.github.io/halalar-app/kvkk.html">Aydınlatma metni</a><a href="https://tolgaarpa.github.io/halalar-app/panel.html">Dükkân girişi</a></div>
</div>`;
  // sağ taraf: sayfanın sağdaki öğeleri korunur, simge en sağa eklenir
  let sag=nav.querySelector(':scope>.sag');
  if(!sag){sag=document.createElement('span');sag.className='hik-sag';const son=nav.lastElementChild;if(son&&son!==nav.firstElementChild)sag.appendChild(son);nav.appendChild(sag)}
  sag.appendChild(k);
  const b=k.querySelector('#hikBtn'),m=k.querySelector('#hikMenu'),TB=[...k.querySelectorAll('.hik-tb')];
  const temaIsle=()=>{const g=document.documentElement.dataset.tema==='gunduz';TB.forEach(x=>x.setAttribute('aria-pressed',String((x.dataset.tema==='gunduz')===g)))};temaIsle();addEventListener('hptema',temaIsle);
  TB.forEach(x=>x.onclick=()=>hpTema(x.dataset.tema));
  // giriş yapan üyeye her sayfada görünür Hesabım yolu
  const hy=document.createElement('a');hy.className='hik-hesap';hy.href=y('hesap');hy.textContent='Hesabım';k.insertBefore(hy,b);
  const uyeIsle=()=>{let v=false;try{v=localStorage.getItem('hp-uye')==='1'}catch(e){}hy.hidden=!v};uyeIsle();addEventListener('hpuye',uyeIsle);addEventListener('storage',e=>{if(e.key==='hp-uye')uyeIsle()});
  const kapa=()=>{m.hidden=true;b.setAttribute('aria-expanded','false')};
  b.addEventListener('click',e=>{e.stopPropagation();m.hidden=!m.hidden;b.setAttribute('aria-expanded',String(!m.hidden))});
  m.addEventListener('click',e=>{if(e.target.closest('a'))setTimeout(kapa,0)});
  addEventListener('click',e=>{if(!m.hidden&&!e.target.closest('.hik'))kapa()});
  addEventListener('keydown',e=>{if(e.key==='Escape')kapa()});
})();

// Görüş bildir sekmesi (test dönemi): her sayfaya bu dosyayla gelir (veri/gorus.js)
;(()=>{const s=document.currentScript;if(!s||!s.src)return;const g=document.createElement("script");g.src=s.src.replace(/[^/]*$/,"")+"gorus.js";g.defer=true;document.head.appendChild(g)})();
