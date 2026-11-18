// Dekupe konturu: Gündüz'de beyaz eşyaya siyah; kırmızı ve yeşil şimdilik ÖRNEK (veride indirim bilgisi yok).
// Gerçek indirim gelince yalnız renk() içindeki sıra kuralı değişir. Uygulama destesinde aynı kuralın kopyası var.
window.HPK=(()=>{let M=null;
  const bak=id=>{if(!M)M=new Map(typeof DUKKAN3!=='undefined'?DUKKAN3.urunler.map((u,i)=>['d3:'+u.id,{k:u.kategori,i}]):[]);return M.get(id)};
  const tur=id=>{const b=bak(id);if(!b)return '';return b.i%9===0?'k':b.i%9===4?'y':b.k==='Beyaz Eşya'?'s':''};
  const RENK={k:'#e8201c',y:'#12a150',s:'#111114'};
  const css=r=>`filter:drop-shadow(1.5px 0 0 ${r}) drop-shadow(-1.5px 0 0 ${r}) drop-shadow(0 1.5px 0 ${r}) drop-shadow(0 -1.5px 0 ${r})!important`;
  const st=document.createElement('style');st.textContent=`.kn-k{${css(RENK.k)}}.kn-y{${css(RENK.y)}}html[data-tema="gunduz"] .kn-s,html.kn-beyaz .kn-s,#ara .kn-s{${css(RENK.s)}}`;document.head.appendChild(st);
  return {renk:(id,gunduz)=>{const t=tur(id);return t==='s'&&!gunduz?null:RENK[t]||null},sinif:id=>{const t=tur(id);return t?'kn-'+t:''}}})();
