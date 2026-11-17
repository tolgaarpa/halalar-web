// Kendi tünelini kur: ziyaretçi genel ürün kategorilerini seçer (dükkân adı yok), yalnız onlarla dolu bir tünelde gezer.
// Açmak için: data-tunel-kur özniteliği olan herhangi bir bağlantı/düğme. Seçim index.html?sec=Giyim~Beyaz Eşya olarak gider.
// Dükkânların kendi kategorileri GENEL tablosuyla genel kategoriye bağlanır; tabloda olmayan kendi adıyla genel kategoridir.
// Gerekli veri (varsa kullanılır): urunler.js + kategoriler.js (Halalar), dukkan2.js (DSG), dukkan3.js (Önsal).
(()=>{
  const ANAHTAR='hp-tunel-sec';
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const GENEL={'d2:Üst giyim':'Giyim','d2:Alt giyim':'Giyim','d2:Dış giyim':'Giyim','d2:Takım':'Giyim','h:Elektronik & Kamera':'Elektronik','d3:Televizyon':'Elektronik'};
  const genelAd=k=>GENEL[k]||k.slice(k.indexOf(':')+1);
  // dükkân grupları (iç kullanım): [başlık, alt yazı, [[anahtar, kategori adı, ürün sayısı], ...]]
  function dukGruplar(){const G=[];
    if(typeof URUNLER!=='undefined'&&typeof KATEGORI!=='undefined'){const s={};URUNLER.forEach(u=>{const k=KATEGORI[u[0]];if(k)s[k]=(s[k]||0)+1});
      const sira=(typeof KATEGORILER!=='undefined'?KATEGORILER:Object.keys(s)).filter(k=>s[k]);G.push(['Halalar','Vintage ve koleksiyon',sira.map(k=>['h:'+k,k,s[k]])])}
    const duk=(on,D,alt)=>{const s={};D.urunler.filter(x=>x.tunel&&x.stok!==0).forEach(x=>s[x.kategori]=(s[x.kategori]||0)+1);
      const sira=(D.kategoriler||Object.keys(s)).filter(k=>s[k]);if(sira.length)G.push([D.ad,alt,sira.map(k=>[on+k,k,s[k]])])};
    if(typeof DUKKAN2!=='undefined')duk('d2:',DUKKAN2,'Giyim');
    if(typeof DUKKAN3!=='undefined')duk('d3:',DUKKAN3,'Elektronik ve beyaz eşya');
    return G}
  // ziyaretçiye görünen tek liste: genel kategoriler, çoktan aza
  function gruplar(){const s={},sira=[];dukGruplar().forEach(g=>g[2].forEach(c=>{const a=genelAd(c[0]);if(!(a in s)){s[a]=0;sira.push(a)}s[a]+=c[2]}));
    return [['Kategoriler','',sira.sort((a,b)=>s[b]-s[a]).map(a=>[a,a,s[a]])]]}
  // seçim (genel ad ya da eski 'h:Müzik' biçimi) -> dükkân anahtarları; tünel bunu kullanır
  window.tunelSecimCoz=L=>{const S=new Set(L.map(k=>k.includes(':')?genelAd(k):k)),out=[];dukGruplar().forEach(g=>g[2].forEach(c=>{if(S.has(genelAd(c[0])))out.push(c[0])}));return out};
  const css=`.tk{position:fixed;inset:0;z-index:120;background:rgba(8,8,10,.94);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;justify-content:center;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;color:#f2efe9;font-family:Barlow,system-ui,sans-serif}
.tk[hidden]{display:none}
.tk-ic{width:100%;max-width:860px;padding:28px 24px 120px}
.tk-bas{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}
.tk-bas b{font:400 clamp(30px,6vw,46px)/1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.01em}
.tk-bas b span{color:#e8201c}
.tk-x{flex:none;background:none;border:1px solid #444;color:#f2efe9;border-radius:3px;padding:11px 16px;font:500 12px Barlow,sans-serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
.tk-x:hover{border-color:#f2efe9}
.tk-ac{margin:12px 0 26px;color:#b9b4ab;font-size:16px;line-height:1.45;max-width:560px}
.tk-g{margin:0 0 26px}
.tk-gb{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;border-bottom:1px solid #26262c;padding-bottom:8px;margin-bottom:12px}
.tk-gb h4{margin:0;font:400 22px/1.1 Anton,sans-serif;text-transform:uppercase}
.tk-gb small{color:#8d887f;font-size:13px}
.tk-hep{margin-left:auto;background:none;border:0;color:#cfcac1;font:500 13px Barlow,sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:4px 0}
.tk-hep:hover{color:#fff}
.tk-cips{display:flex;flex-wrap:wrap;gap:8px}
.tk-cip{display:inline-flex;align-items:center;gap:8px;background:#141417;border:1px solid #2e2e35;color:#e4e0d9;border-radius:999px;padding:10px 16px;font:500 15px Barlow,sans-serif;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.tk-cip i{font-style:normal;font-size:12px;color:#8d887f}
.tk-cip:hover{border-color:#77777f}
.tk-cip[aria-pressed="true"]{background:#f2efe9;color:#111;border-color:#f2efe9}
.tk-cip[aria-pressed="true"] i{color:#555}
.tk-cip[aria-pressed="true"]::before{content:"✓";font-weight:700;color:#e8201c}
.tk-alt{position:fixed;left:0;right:0;bottom:0;display:flex;justify-content:center;background:linear-gradient(transparent,rgba(8,8,10,.96) 35%);padding:28px 0 calc(18px + env(safe-area-inset-bottom))}
.tk-alt>div{width:100%;max-width:860px;display:flex;gap:12px;align-items:center;padding:0 24px}
.tk-tem{background:none;border:0;color:#cfcac1;font:500 14px Barlow,sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:12px 4px}
.tk-tem:disabled{opacity:.35;cursor:default}
.tk-git{margin-left:auto;background:#e8201c;border:0;color:#fff;border-radius:3px;padding:16px 26px;font:400 20px/1 Anton,sans-serif;text-transform:uppercase;letter-spacing:.03em;cursor:pointer}
.tk-git small{font:500 13px Barlow,sans-serif;text-transform:none;letter-spacing:0;opacity:.85;margin-left:8px}
.tk-git:disabled{background:#2a2a30;color:#8d887f;cursor:default}
.tk-cip:focus-visible,.tk-git:focus-visible,.tk-x:focus-visible,.tk-hep:focus-visible,.tk-tem:focus-visible{outline:2px solid #e8201c;outline-offset:2px}
@media(max-width:560px){.tk-ic{padding:20px 16px 130px}.tk-alt>div{padding:0 16px}.tk-cip{font-size:14px;padding:9px 14px}.tk-git{padding:15px 18px;font-size:18px}}`;
  let kur=null,sec=new Set(),G=[];
  function olustur(){
    const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    G=gruplar();kur=document.createElement('div');kur.className='tk';kur.id='tk';kur.hidden=true;
    kur.setAttribute('role','dialog');kur.setAttribute('aria-modal','true');kur.setAttribute('aria-labelledby','tkB');
    kur.innerHTML=`<div class="tk-ic"><div class="tk-bas"><b id="tkB">Kendi <span>tünelin</span></b><button class="tk-x" type="button">Kapat</button></div>
<p class="tk-ac">Görmek istediğin ürün kategorilerini seç, tünelde yalnız onlar gelsin. İstediğin kadar karıştırabilirsin.</p>
${G.map((g,gi)=>`<section class="tk-g"><div class="tk-gb"><h4>${esc(g[0])}</h4><small>${esc(g[1])}</small><button class="tk-hep" type="button" data-g="${gi}">Hepsini seç</button></div>
<div class="tk-cips">${g[2].map(c=>`<button class="tk-cip" type="button" aria-pressed="false" data-k="${esc(c[0])}">${esc(c[1])} <i>${c[2]}</i></button>`).join('')}</div></section>`).join('')}
</div><div class="tk-alt"><div><button class="tk-tem" type="button">Temizle</button><button class="tk-git" type="button">Tünele gir<small></small></button></div></div>`;
    document.body.appendChild(kur);
    kur.addEventListener('click',e=>{
      const c=e.target.closest('.tk-cip');if(c){const k=c.dataset.k;sec.has(k)?sec.delete(k):sec.add(k);guncelle();return}
      const h=e.target.closest('.tk-hep');if(h){const g=G[+h.dataset.g],hepsi=g[2].every(c=>sec.has(c[0]));g[2].forEach(c=>hepsi?sec.delete(c[0]):sec.add(c[0]));guncelle();return}
      if(e.target.closest('.tk-tem')){sec.clear();guncelle();return}
      if(e.target.closest('.tk-x')){kapa();return}
      if(e.target.closest('.tk-git')&&sec.size){const L=[...sec];try{localStorage.setItem(ANAHTAR,JSON.stringify(L))}catch(_){}location.href='index.html?sec='+encodeURIComponent(L.join('~'))}
    });
    // tünelin kaydırma dinleyicileri bu pencerede çalışmasın
    ['wheel','touchmove','touchstart'].forEach(t=>kur.addEventListener(t,e=>e.stopPropagation(),{passive:true}));
    addEventListener('keydown',e=>{if(e.key==='Escape'&&kur&&!kur.hidden)kapa()});
  }
  function guncelle(){
    const say={};G.forEach(g=>g[2].forEach(c=>say[c[0]]=c[2]));let n=0;sec.forEach(k=>n+=say[k]||0);
    kur.querySelectorAll('.tk-cip').forEach(b=>b.setAttribute('aria-pressed',String(sec.has(b.dataset.k))));
    kur.querySelectorAll('.tk-hep').forEach(b=>{b.textContent=G[+b.dataset.g][2].every(c=>sec.has(c[0]))?'Hiçbirini seçme':'Hepsini seç'});
    const git=kur.querySelector('.tk-git');git.disabled=!n;git.querySelector('small').textContent=n?n+' ürün':'önce kategori seç';
    kur.querySelector('.tk-tem').disabled=!sec.size}
  function ac(){
    if(!kur)olustur();
    // önceki seçim: adresteki tünel, yoksa son kurulan
    let L=null;const s=new URLSearchParams(location.search).get('sec');if(s)L=s.split('~');
    if(!L)try{L=JSON.parse(localStorage.getItem(ANAHTAR))}catch(_){}
    if(L)L=L.map(k=>k.includes(':')?genelAd(k):k);
    const var_=new Set();G.forEach(g=>g[2].forEach(c=>var_.add(c[0])));sec=new Set((L||[]).filter(k=>var_.has(k)));
    guncelle();kur.hidden=false;kur.scrollTop=0;dispatchEvent(new CustomEvent('tunelkur',{detail:true}));
    setTimeout(()=>{const b=kur.querySelector('.tk-cip');if(b)b.focus({preventScroll:true})},30)}
  function kapa(){kur.hidden=true;dispatchEvent(new CustomEvent('tunelkur',{detail:false}))}
  window.tunelKurAc=ac;window.tunelKurAcik=()=>!!(kur&&!kur.hidden);
  document.addEventListener('click',e=>{const t=e.target.closest('[data-tunel-kur]');if(!t)return;e.preventDefault();e.stopPropagation();
    const m=document.getElementById('hpMenu');if(m&&!m.hidden){m.hidden=true;const a=document.getElementById('hpAc');if(a)a.setAttribute('aria-expanded','false')}
    ac()},true);
})();
