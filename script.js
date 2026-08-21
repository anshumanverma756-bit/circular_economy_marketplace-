const materials = [
  {id:'MAT-2201', title:'Steel Turnings, Mixed Grade', cat:'Ferrous Metal', conf:96, qty:'4.2t', org:'Precision Forge Works', co2:'3.8t', hash:'0x7f..c93a'},
  {id:'MAT-2202', title:'HDPE Regrind, Post-Industrial', cat:'Plastic', conf:91, qty:'1.1t', org:'Coastal Packaging Co.', co2:'1.4t', hash:'0x2a..5e10'},
  {id:'MAT-2203', title:'Fly Ash, Class F', cat:'Mineral Byproduct', conf:88, qty:'12.0t', org:'Meridian Power Station', co2:'6.9t', hash:'0x91..7bd2'},
  {id:'MAT-2204', title:'Copper Wire Offcuts', cat:'Non-ferrous Metal', conf:98, qty:'0.6t', org:'Voltix Electricals', co2:'2.1t', hash:'0xd4..1f88'},
  {id:'MAT-2205', title:'Cardboard, Baled OCC', cat:'Fibre/Paper', conf:94, qty:'2.9t', org:'Northside Logistics Hub', co2:'1.0t', hash:'0x66..a02c'},
  {id:'MAT-2206', title:'Glass Cullet, Mixed Colour', cat:'Silicate', conf:90, qty:'5.4t', org:'Amber Bottling Ltd.', co2:'2.6t', hash:'0xb3..9e47'},
  {id:'MAT-2207', title:'Aluminium Chips, Dry', cat:'Non-ferrous Metal', conf:95, qty:'0.9t', org:'Falcon Aerostructures', co2:'2.9t', hash:'0x5c..3a19'},
  {id:'MAT-2208', title:'PET Flake, Food Grade', cat:'Plastic', conf:89, qty:'1.6t', org:'Coastal Packaging Co.', co2:'1.1t', hash:'0x0e..cd76'},
  {id:'MAT-2209', title:'Foundry Sand, Reclaimed', cat:'Mineral Byproduct', conf:85, qty:'8.3t', org:'Ironclad Castings', co2:'3.2t', hash:'0xa7..6602'}
];

const tickerEvents = [
  '4.2t Steel Turnings · Precision Forge → Bansal Alloys',
  '1.1t HDPE Regrind · Coastal Packaging → Reflow Plastics',
  '12.0t Fly Ash · Meridian Power → Horizon Cement',
  '0.6t Copper Offcuts · Voltix Electricals → Rewire Metals',
  '2.9t Cardboard OCC · Northside Logistics → PaperLoop',
  '5.4t Glass Cullet · Amber Bottling → ClearCycle Glass'
];

const tickerTrack = document.getElementById('tickerTrack');
function tickerHTML(){
  return tickerEvents.map(t => {
    const [amt, rest] = t.split(' · ');
    return `<span class="ticker-item"><span class="dot"></span><b>${amt}</b> ${rest} · verified</span>`;
  }).join('');
}
tickerTrack.innerHTML = tickerHTML() + tickerHTML();

const marketGrid = document.getElementById('marketGrid');
function renderMarket(filter){
  const list = filter === 'all' ? materials : materials.filter(m => m.cat === filter);
  marketGrid.innerHTML = list.map(m => `
    <div class="mcard">
      <div class="mcard-top">
        <span class="mcard-cat">${m.cat}</span>
        <span class="mcard-id mono">${m.id}</span>
      </div>
      <div class="mcard-title">${m.title}</div>
      <div class="mcard-org">${m.org}</div>
      <div class="mcard-stats">
        <div class="mcard-stat"><div class="v">${m.qty}</div><div class="k">QUANTITY</div></div>
        <div class="mcard-stat"><div class="v">${m.conf}%</div><div class="k">CONFIDENCE</div></div>
        <div class="mcard-stat"><div class="v">−${m.co2}</div><div class="k">CO₂e SAVED</div></div>
      </div>
    </div>
  `).join('');
}
renderMarket('all');

document.getElementById('filters').addEventListener('click', e => {
  if(e.target.tagName !== 'BUTTON') return;
  document.querySelectorAll('#filters .chip').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  renderMarket(e.target.dataset.filter);
});

let scanIndex = 0;
const scanBtn = document.getElementById('scanBtn');
const scanProgress = document.getElementById('scanProgress');
const scanProgressFill = document.getElementById('scanProgressFill');
const resultPassport = document.getElementById('resultPassport');

scanBtn.addEventListener('click', () => {
  const m = materials[scanIndex % materials.length];
  scanIndex++;
  scanBtn.disabled = true;
  scanProgress.style.display = 'block';
  scanProgressFill.style.width = '0%';
  resultPassport.innerHTML = '<div class="result-empty">Analysing spectral + visual features…</div>';
  requestAnimationFrame(() => { scanProgressFill.style.width = '100%'; });

  setTimeout(() => {
    resultPassport.classList.remove('result-card');
    resultPassport.innerHTML = `
      <span class="passport-notch left"></span><span class="passport-notch right"></span>
      <div class="p-head">
        <div class="p-id">BATCH<b>${m.id}</b></div>
        <div class="p-stamp">CLASSIFIED</div>
      </div>
      <div class="p-title">${m.title}</div>
      <div class="p-meta"><span>${m.qty}</span><span>${m.cat}</span><span>${m.org}</span></div>
      <div class="p-row">
        <div class="p-row-label">Classification confidence</div>
        <div class="conf-bar"><div class="conf-fill" style="width:${m.conf}%"></div></div>
        <div class="conf-val">${m.conf}% — ${m.cat}</div>
      </div>
      <div class="p-row">
        <div class="p-row-label">Estimated carbon impact if reused</div>
        <div class="conf-val" style="color:var(--brass)">−${m.co2} CO₂e vs. virgin material</div>
      </div>
      <div class="p-hash"><span>owner_hash</span><b>${m.hash}</b></div>
    `;
    scanProgress.style.display = 'none';
    scanBtn.disabled = false;
  }, 1150);
});

const chartData = [
  {lbl:'Ferrous', val:412}, {lbl:'Non-ferr.', val:268}, {lbl:'Plastic', val:189},
  {lbl:'Mineral', val:530}, {lbl:'Fibre', val:96}, {lbl:'Silicate', val:174}
];
const maxVal = Math.max(...chartData.map(d => d.val));
const barsEl = document.getElementById('bars');
barsEl.innerHTML = chartData.map(d => `
  <div class="bar-col">
    <div class="bar-val" data-val="${d.val}">${d.val}t</div>
    <div class="bar" data-h="${(d.val/maxVal*100).toFixed(0)}"></div>
    <div class="bar-lbl">${d.lbl}</div>
  </div>
`).join('');

let chainData = [
  {idx:0, from:'Precision Forge Works', to:'Bansal Alloys', material:'Steel Turnings · 4.2t', hash:'8f2c...c93a', prev:'GENESIS'},
  {idx:1, from:'Coastal Packaging Co.', to:'Reflow Plastics', material:'HDPE Regrind · 1.1t', hash:'2a19...5e10', prev:'8f2c...c93a'},
  {idx:2, from:'Meridian Power Station', to:'Horizon Cement', material:'Fly Ash · 12.0t', hash:'91bd...7bd2', prev:'2a19...5e10'},
  {idx:3, from:'Voltix Electricals', to:'Rewire Metals', material:'Copper Offcuts · 0.6t', hash:'d441...1f88', prev:'91bd...7bd2'},
  {idx:4, from:'Northside Logistics', to:'PaperLoop', material:'Cardboard OCC · 2.9t', hash:'6602...a02c', prev:'d441...1f88'},
  {idx:5, from:'Amber Bottling Ltd.', to:'ClearCycle Glass', material:'Glass Cullet · 5.4t', hash:'b347...9e47', prev:'6602...a02c'}
];
const chainEl = document.getElementById('chain');
function renderChain(){
  chainEl.innerHTML = chainData.map(b => `
    <div class="block">
      <div class="block-idx">#${String(b.idx).padStart(4,'0')}<span>BLOCK</span></div>
      <div class="block-mid">
        <div class="transfer">${b.from}<span class="arrow">→</span>${b.to}</div>
        <div class="meta">${b.material}</div>
      </div>
      <div class="block-hash">
        <span class="tag">VERIFIED</span><br>
        <span>hash&nbsp;<b>${b.hash}</b></span><br>
        <span>prev&nbsp;<b>${b.prev}</b></span>
      </div>
    </div>
  `).join('');
  document.getElementById('chainHeight').textContent = chainData.length;
}
renderChain();

function randHash(){
  const chars = '0123456789abcdef';
  let s = '';
  for(let i=0;i<8;i++) s += chars[Math.floor(Math.random()*16)];
  return s.slice(0,4) + '...' + s.slice(4);
}
const newTransfers = [
  ['Ironclad Castings','Bansal Alloys','Foundry Sand · 8.3t'],
  ['Falcon Aerostructures','Rewire Metals','Aluminium Chips · 0.9t'],
  ['Coastal Packaging Co.','Reflow Plastics','PET Flake · 1.6t']
];
let newIdx = 0;
document.getElementById('addBlockBtn').addEventListener('click', () => {
  const last = chainData[chainData.length - 1];
  const t = newTransfers[newIdx % newTransfers.length]; newIdx++;
  chainData.push({idx:last.idx+1, from:t[0], to:t[1], material:t[2], hash:randHash(), prev:last.hash});
  renderChain();
  chainEl.lastElementChild.scrollIntoView({behavior:'smooth', block:'center'});
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {threshold:0.12});
revealEls.forEach(el => io.observe(el));

const barIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      document.querySelectorAll('.bar').forEach(b => b.style.height = b.dataset.h + '%');
      document.querySelectorAll('.bar-val').forEach(v => v.style.opacity = '1');
      barIo.disconnect();
    }
  });
}, {threshold:0.3});
barIo.observe(document.getElementById('bars'));
