// Ürün sayfası önerileri: önce aynı dükkândan (aynı kategori önde), sonra "Pazardan öneriler" (diğer dükkânlar, benzer kategori önde).
// Kullanım: urun.html'de </main>'den sonra <section class="oneri" id="oneri"></section>, verilerden sonra bu dosya.
(()=>{
  const kutu=document.getElementById('oneri');if(!kutu)return;
  const id=new URLSearchParams(location.search).get('id')||'';
  const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const TL=n=>(n||0).toLocaleString('tr-TR')+' ₺';
  const kucuk=p=>p.replace(/^kaynak\//,'kaynak/k/');
  // bütün ürünler tek listede: {id, ad, kat, genel, gorsel, fiyat, dukkan, dad}
  const T=[];
  if(typeof URUNLER!=='undefined')URUNLER.forEach(u=>{const k=(typeof KATEGORI!=='undefined'&&KATEGORI[u[0]])||'';
    T.push({id:u[0],ad:u[1],kat:k,genel:k==='Elektronik & Kamera'?'Elektronik':k,gorsel:`kaynak/web/${u[0]}.webp`,fiyat:typeof FIYAT!=='undefined'?FIYAT[u[0]]:0,ornek:true,dukkan:'halalar',dad:'Halalar',href:'index.html'})});
  [['d2:',typeof DUKKAN2!=='undefined'?DUKKAN2:null,'dukkan.html'],['d3:',typeof DUKKAN3!=='undefined'?DUKKAN3:null,'dukkan.html?d=3']].forEach(([on,D,href])=>{if(!D)return;
    D.urunler.filter(x=>x.stok!==0).forEach(x=>T.push({id:on+x.id,ad:x.ad,kat:x.kategori||'',genel:on==='d2:'?'Giyim':x.kategori==='Televizyon'?'Elektronik':x.kategori||'',gorsel:x.gorsel,fiyat:x.fiyat||0,ornek:false,dukkan:D.id,dad:D.ad,href}))});
  const bu=T.find(x=>x.id===id);if(!bu)return;
  // sabit ama ürüne göre değişen sıra (her ürün sayfasında farklı öneriler, yenileyince aynı)
  const h=s=>{let v=2166136261;for(const c of s)v=Math.imul(v^c.charCodeAt(0),16777619);return v>>>0};
  const sira=(L,puan)=>L.map(x=>[x,puan(x)*1e10+(h(id+x.id)%1e9)]).sort((a,b)=>b[1]-a[1]).map(a=>a[0]);
  const ayni=sira(T.filter(x=>x.dukkan===bu.dukkan&&x.id!==id),x=>x.kat===bu.kat?1:0).slice(0,8);
  const pazar=sira(T.filter(x=>x.dukkan!==bu.dukkan),x=>x.genel===bu.genel?1:0).slice(0,8);
  const kart=x=>`<a class="o-kart" href="urun.html?id=${encodeURIComponent(x.id)}"><span class="o-g"><img class="${window.HPK?HPK.sinif(x.id):''}" src="${esc(kucuk(x.gorsel))}" data-b="${esc(x.gorsel)}" alt="" loading="lazy"></span><small>${esc(bu.dukkan===x.dukkan?x.kat:x.dad)}</small><b>${esc(x.ad)}</b><i>${x.fiyat?TL(x.fiyat)+(x.ornek?' <em>örnek</em>':''):'Teklif ile'}</i></a>`;
  const blok=(bas,alt,L,link)=>L.length?`<div class="o-blok"><div class="o-bas"><h2>${bas}</h2>${link?`<a href="${link[0]}">${link[1]} →</a>`:''}</div><p>${alt}</p><div class="o-sira">${L.map(kart).join('')}</div></div>`:'';
  kutu.innerHTML=blok(esc(bu.dad)+' dükkânından','Aynı dükkânın başka ürünleri',ayni,[bu.href,'Dükkâna git'])+blok('Pazardan öneriler','Diğer dükkânlardan benzerleri',pazar,['index.html?mod=pazar','Pazara gir']);
  kutu.querySelectorAll('img[data-b]').forEach(im=>im.onerror=()=>{if(im.src.indexOf('/k/')>-1)im.src=im.dataset.b});
  const st=document.createElement('style');st.textContent=`.oneri{padding:0 6vw 10vh;max-width:1240px;margin:0 auto;box-sizing:content-box}
.o-blok{margin-top:48px}
.o-bas{display:flex;align-items:baseline;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line,#26262c);padding-bottom:10px}
.o-bas h2{font-family:Anton,sans-serif;font-weight:400;text-transform:uppercase;font-size:clamp(26px,3vw,38px);line-height:1.1;color:var(--ink,#f2efe9)}
.o-bas a{font:700 13px/1 "Barlow Condensed",sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--yumusak,#cfcac1);text-decoration:none;white-space:nowrap}
.o-bas a:hover{color:var(--ink,#f2efe9)}
.oneri>.o-blok>p{margin:8px 0 18px;font-size:14px;color:var(--muted,#8d887f);max-width:none}
.o-sira{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.o-kart{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:var(--ink,#f2efe9);min-width:0}
.o-g{display:block;position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--panel,#141418);border:1px solid var(--line,#26262c);padding:0;transition:border-color .2s}
.o-kart:hover .o-g{border-color:#77777f}
.o-g img{position:absolute;inset:10px;width:calc(100% - 20px);height:calc(100% - 20px);object-fit:contain;max-height:none;filter:none}
.o-kart small{font:700 11.5px/1.2 "Barlow Condensed",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--muted,#8d887f);margin-top:4px}
.o-kart b{font-weight:600;font-size:15px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.o-kart i{font-style:normal;font-family:Anton,sans-serif;font-size:19px}
.o-kart em{font:700 10px "Barlow Condensed",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--muted,#8d887f);font-style:normal;margin-left:4px}
@media(max-width:900px){.o-sira{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:760px){.oneri{padding:0 16px 8vh}.o-blok{margin-top:36px}.o-sira{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;margin:0 -16px;padding:0 16px 6px;scrollbar-width:none}.o-sira::-webkit-scrollbar{display:none}.o-kart{flex:0 0 42%;scroll-snap-align:start}}`;
  document.head.appendChild(st);
})();
