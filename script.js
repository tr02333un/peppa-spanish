/* ── Peppa-Spanish S1 — Main Script ── */
// ── 星星成就機制 ──
const unlockedStars = new Set();

function unlockStar(globalIdx){
  unlockedStars.add(globalIdx);
  updateStarDisplay();
}

function updateStarDisplay(){
  const el = document.getElementById('star-rating');
  if(!el) return;
  const epTotal = EPS[ep] ? EPS[ep].sentences.length : 10;
  let stars = '';
  for(let i = 0; i < epTotal; i++){
    const gIdx = ep * 10 + i;
    stars += unlockedStars.has(gIdx) ? '★' : '☆';
  }
  el.textContent = stars;
  // 顏色動態：全亮變金色
  el.style.color = unlockedStars.size >= epTotal ? '#D97706' : '#F59E0B';
}

// ── YOUGLISH PRONUNCIATION（僅手動複製，不做自動跳轉）──
function openYG(word, lang){
  const url = `https://youglish.com/pronounce/${encodeURIComponent(word)}/${lang}`;
  window.open(url, '_blank', 'noopener');
}

// ── WORDREFERENCE 直接跳轉（給單字：同源詞庫、詞綴單字卡）──
function openYGPanel(word){
  openWordReference(String(word).replace(/[¡¿.,!?;:（）]/g,'').trim());
}

function openWordReference(word){
  if(!word) return;
  window.open('https://www.wordreference.com/es/translation.asp?spen='+encodeURIComponent(word),'_blank','noopener');
  showPronBackup(word);
}

// ── 陌生詞彙收藏點擊：依內容判斷單字或語塊 ──
function pronounceVocab(text){
  const clean=String(text).replace(/[¡¿.,!?;:（）]/g,'').trim();
  if(!clean) return;
  if(clean.includes(' ')) speakWord(clean, null); // 語塊/句子 → TTS
  else openWordReference(clean); // 單字 → WordReference
}

// ── SPEECH SYNTHESIS (TTS) ──
let ttsReady = false;
let ttsVoice = null;

function initTTS(){
  if(!window.speechSynthesis){ return; }
  function pickVoice(){
    const voices = speechSynthesis.getVoices();
    ttsVoice = voices.find(v=>v.lang==='es-MX')
      || voices.find(v=>v.lang==='es-419')
      || voices.find(v=>v.lang==='es-US')
      || voices.find(v=>v.lang==='es-ES')
      || voices.find(v=>v.lang.startsWith('es'))
      || null;
    if(voices.length > 0){
      ttsReady = true;
      const dot = document.getElementById('ttsDot');
      if(dot) dot.classList.add('ready');
    }
  }
  // Chrome loads voices async
  if(speechSynthesis.getVoices().length > 0) pickVoice();
  speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function speakWord(text, el){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音'); return; }
  const clean = text.replace(/[¡!¿?,.:;\s]/g,'').trim();
  if(!clean) return;
  // Must cancel first on Android or it queues silently
  try{ speechSynthesis.cancel(); }catch(e){}
  const utt = new SpeechSynthesisUtterance(clean);
  utt.lang = 'es-MX';
  utt.rate = 0.7;
  utt.pitch = 1.05;
  utt.volume = 1;
  if(ttsVoice) utt.voice = ttsVoice;
  const dot = document.getElementById('ttsDot');
  if(el) el.classList.add('playing');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  utt.onend = () => {
    if(el) el.classList.remove('playing');
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
  };
  utt.onerror = (e) => {
    if(el) el.classList.remove('playing');
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
  };
  // Wrap in setTimeout(0) — helps some Android WebView trigger correctly
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 0);
}

function speakFull(text){
  speakWord(text.replace(/[¡¿]/g,''), null);
}

function testTTS(){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音朗讀'); return; }
  // Force init voices on first user tap
  if(!ttsReady){ initTTS(); }
  speakWord('Hola amigos', document.querySelector('.tts-badge'));
  toast('🔊 點語塊聽西語！點句子聽整句！');
}

/* EPS data → episodes.js */
// ── STATE ──
let ep=0,idx=0,revealed=false,score=0,makeScore=0,answered=[],makeAnswered=[];
function currentGlobalIdx(){ return ep*10+idx; }
let vocab=[]; // cross-episode passbook
let makeOpen=false,builtTokens=[];
let isPlaying=false; // kept for compat

function epData(){return EPS[ep]}
function cur(){return epData().sentences[idx]}
function total(){return epData().sentences.length}

// ── INIT NAV ──
function buildNav(){
  const nav=document.getElementById('seasonNav');
  nav.innerHTML='';
  EPS.forEach((e,i)=>{
    const chip=document.createElement('div');
    chip.className='ep-chip'+(i===ep?' active':'');
    chip.textContent=`E${i+1} ${e.titleZh}`;
    chip.onclick=()=>selectEp(i);
    nav.appendChild(chip);
  });
}

function selectEp(n){
  ep=n;idx=0;score=0;makeScore=0;answered=[];makeAnswered=[];makeOpen=false;builtTokens=[];unlockedStars.clear();updateStarDisplay();
  document.getElementById('completeScreen').classList.remove('show');
  document.querySelector('.card-container').style.display='block';
  document.querySelector('.nav-row').style.display='flex';
  buildNav();render();
  }

// ── STARS ──
function renderStars(){
  const n=total();
  const row=document.getElementById('starRow');
  row.innerHTML='';
  for(let i=0;i<n;i++){
    const s=document.createElement('span');
    s.className='s-star'+(answered.includes(i)?' lit':'');
    s.textContent='⭐';
    row.appendChild(s);
  }
  const epS=document.createElement('span');
  epS.className='s-star ep-star'+(answered.length===n?' lit':'');
  epS.textContent='🌟';
  row.appendChild(epS);
  const done=answered.length;
  document.getElementById('starLabel').textContent=
    done===0?'':
    done===n?`🌟 E${ep+1} 全集完成！`:
    `⭐ ${done} / ${n} 句完成`;
}

/* AMMO data → ammo.js */

// ── AMMO STATE ──
let ammoUnlocked = []; // array of ammo_ids unlocked so far
let ammoStars = {};    // {ammo_id: 0|1|2}

// ── 分組導覽 (E1 only) ──
const AMMO_GROUPS = [
  { label:'uno',    range:['e1_01','e1_02','e1_03'] },
  { label:'dos',    range:['e1_04','e1_05'] },
  { label:'tres',   range:['e1_06','e1_07','e1_08'] },
  { label:'cuatro', range:['e1_09','e1_10'] }
];
let currentGroupIndex = 0;

// Map sentence global index → ammo_id(s) to unlock
// (SENTENCE_AMMO_MAP 保留作備充；實際使用 SENTENCE_AMMO_MAP2)
const SENTENCE_AMMO_MAP2 = {
  0:['e1_01'], 1:['e1_02'], 2:['e1_03'], 3:['e1_04'], 4:['e1_05'],
  5:['e1_06'], 6:['e1_07'], 7:['e1_08'], 8:['e1_09'], 9:['e1_10'],
  10:['e2_01'], 11:['e2_02'], 12:['e2_03'], 13:['e2_04'], 14:['e2_05'],
  15:['e2_06'], 16:['e2_07'], 17:['e2_08'], 18:['e2_09'], 19:['e2_10'],
  20:['e3_01'], 21:['e3_02'], 22:['e3_03'], 23:['e3_04'], 24:['e3_05'],
  25:['e3_06'], 26:['e3_07'], 27:['e3_08'], 28:['e3_09'], 29:['e3_10'],
};

function unlockAmmo(globalIdx){
  const ids = SENTENCE_AMMO_MAP2[globalIdx] || [];
  ids.forEach(id=>{
    if(!ammoUnlocked.includes(id)) ammoUnlocked.push(id);
  });
  renderAmmo();
}

function cycleAmmoStar(id){
  ammoStars[id] = ((ammoStars[id]||0)+1)%3;
  saveToLS();
  renderAmmo();
}

function escAttr(s){ return String(s).replace(/'/g,"\\'"); }

function getPersonClass(w){
  const t = w.replace(/[¡¿（）]/g,'').trim().toLowerCase();
  if(t==='yo') return 'person-yo';
  if(t==='tú'||t==='tu') return 'person-tu';
  return '';
}

function renderAmmoFireChunks(fire){
  if(!fire.chunks || !fire.chunks.length) return '';
  return `<div class="ammo-fire-chunks">${fire.chunks.map(c=>{
    const personCls=c.role==='s'?getPersonClass(c.w):'';
    const clean=c.w.replace(/[¡¿.,!?;:（）]/g,'').trim();
    const starHtml=isVocabWorthy(clean) ? `<span class="ammo-chunk-star" onclick="event.stopPropagation();addToVocab('${escAttr(c.w)}','${escAttr(fire.zh)}','彈藥例句');this.textContent='⭐'" title="收藏這個語塊">☆</span>` : '';
    return `<span class="ammo-fire-chunk role-${c.role||'plain'}${personCls?' '+personCls:''}" onclick="event.stopPropagation();ammoChunkTap('${escAttr(c.w)}',${!!c.hideYg},'${escAttr(c.note||'')}')">${c.w}</span>${starHtml}`;
  }).join('')}</div>`;
}

function renderAmmoFireRow(fire, type){
  const tag = type==='peppa' ? '🎯 一發命中（佩佩豬原句）' : '🔥 火力全開（日常對話）';
  const tsLabel = type==='peppa' && fire.ts!=null
    ? `<span class="ammo-fire-ts" onclick="seekYT(${fire.ts})">▶ ${Math.floor(fire.ts/60)}:${String(fire.ts%60).padStart(2,'0')}</span>`
    : '';
  return `<div class="ammo-fire-row ${type}" onclick="${type==='peppa'?(fire.ts!=null?`seekYT(${fire.ts})`:''):`speakFull('${escAttr(fire.es)}')`}">
    <div class="ammo-fire-tag ${type}">${tag}${tsLabel}</div>
    <div class="ammo-fire-es">${fire.es}</div>
    <div class="ammo-fire-zh">${fire.zh}</div>
    ${renderAmmoFireChunks(fire)}
  </div>`;
}

function renderAmmoPatternEs(a){
  let p = a.pattern;
  // 先替換 [Ser: ...] 標記（藍色）
  p = p.replace(/\[Ser:\s*([^\]]+)\]/g, '<span class="ammo-slot-ser">Ser: $1</span>');
  // 再替換 [Estar: ...] 標記（橘色）
  p = p.replace(/\[Estar:\s*([^\]]+)\]/g, '<span class="ammo-slot-estar">Estar: $1</span>');
  // 最後替換一般 slot（橘色框）
  if(a.slots){
    a.slots.forEach(s=>{
      p = p.replace(`[${s}]`, `<span class="ammo-slot">[${s}]</span>`);
    });
  }
  return p;
}

function renderBeVerbTag(a){
  if(!a.be_verb_type || a.be_verb_type === 'none') return '';
  const label = a.be_verb_type === 'ser' ? '🔵 Ser' : '🟠 Estar';
  return `<span class="be-verb-tag ${a.be_verb_type}">${label}</span>`;
}

function renderBeVerbNote(a){
  if(!a.be_verb_type || a.be_verb_type === 'none' || !a.be_verb_note) return '';
  return `<div class="be-verb-note ${a.be_verb_type}">💡 ${a.be_verb_note}</div>`;
}


// 西語數字 1-10：基數/序數/emoji 三態並列
const NUM_EMOJI=['','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
const NUM_WORDS=['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];
const ORD_WORDS=['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo'];

function renderAmmo(){
  document.getElementById('ammoCount').textContent = ammoUnlocked.length;
  const el = document.getElementById('ammoEntries');
  if(!ammoUnlocked.length){
    el.innerHTML='<div class="passbook-empty">還沒有彈藥 — 完成句子後自動解鎖！</div>';
    return;
  }
  const unlocked = AMMO_DATA.filter(a=>ammoUnlocked.includes(a.ammo_id));
  el.innerHTML = unlocked.map(a=>{
    const star = STAR_STATES[ammoStars[a.ammo_id]||0];
    const dailyRows = a.fire_daily.map(f=>renderAmmoFireRow(f,'daily')).join('');
    const num = parseInt((a.ammo_id.match(/(\d+)$/)||['','0'])[1],10);
    const numDisplay = `<span class="ammo-num-text">${NUM_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-text">${ORD_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-emoji">${NUM_EMOJI[num]}</span>`;
    return `<div class="ammo-card ammo-collapsed" id="ammo-${a.ammo_id}">
      <div class="ammo-ep-tag">${a.ep}</div>
      <div class="ammo-header" onclick="toggleAmmoCard('${a.ammo_id}')">
        <span class="ammo-num">${numDisplay}</span>
        <span class="ammo-chevron">▾</span>
      </div>
      <div class="ammo-card-body">
        <!-- 核心彈藥 -->
        <div class="ammo-chunk-row">
          <span class="ammo-chunk" onclick="speakFull('${escAttr(a.core_ammo)}')">${a.core_ammo}</span>
          ${renderBeVerbTag(a)}
        </div>
        ${renderBeVerbNote(a)}
        <!-- 武器改裝 -->
        <div class="ammo-label l-pattern" style="margin-bottom:5px">🔧 武器改裝</div>
        <div class="ammo-pattern-box">
          <div class="ammo-pattern-es">${renderAmmoPatternEs(a)}</div>
          <div class="ammo-pattern-zh">${a.pattern_zh}</div>
          <div class="ammo-pattern-note">${a.pattern_note}</div>
        </div>
        <!-- 實戰射擊 -->
        <div class="ammo-label l-fire" style="margin-bottom:5px">🎯 實戰射擊</div>
        <div class="ammo-fire-section">
          ${dailyRows}
        </div>
      </div>
      <div class="ammo-star" onclick="event.stopPropagation();cycleAmmoStar('${a.ammo_id}')">${star}</div>
    </div>`;
  }).join('');
}

function toggleAmmoCard(ammoId){
  const card=document.getElementById('ammo-'+ammoId);
  if(card) card.classList.toggle('ammo-collapsed');
}

// ── 分組導覽函式 ──
function ammoIdToSentenceIdx(id){ return parseInt(id.split('_')[1],10)-1; }

function initGroupButtons(){
  document.querySelectorAll('.sequence-segment-btn').forEach((btn,i)=>{
    btn.addEventListener('click',()=>{
      if(ep!==0) return;
      currentGroupIndex=i;
      idx=ammoIdToSentenceIdx(AMMO_GROUPS[i].range[0]);
      render();
    });
  });
}

function syncGroupBtn(){
  const wrap=document.getElementById('seqBarWrap');
  if(ep!==0){if(wrap)wrap.style.display='none';return;}
  if(wrap)wrap.style.display='';
  AMMO_GROUPS.forEach((g,i)=>{
    const first=ammoIdToSentenceIdx(g.range[0]);
    const last=ammoIdToSentenceIdx(g.range[g.range.length-1]);
    if(idx>=first&&idx<=last) currentGroupIndex=i;
  });
  document.querySelectorAll('.sequence-segment-btn').forEach((btn,i)=>{
    btn.classList.toggle('is-active',i===currentGroupIndex);
  });
  const entries=AMMO_GROUPS[currentGroupIndex].range
    .map(k=>AMMO_DATA.find(a=>a.ammo_id===k)).filter(Boolean);
  renderGroupFireArea(entries);
  const badge=document.getElementById('seqEpBadge');
  if(badge) badge.textContent=`ep${ep+1}. ${epData().titleZh}`;
}

function renderGroupFireArea(entries){
  const el=document.getElementById('groupFireArea');
  if(!el) return;
  el.innerHTML=entries.map(a=>`
    <div class="group-fire-card">
      <div class="group-fire-core" onclick="speakFull('${escAttr(a.core_ammo)}')">${a.core_ammo} <small style="color:var(--tlight);font-weight:500">${a.core_zh}</small></div>
      ${renderAmmoFireRow(a.fire_peppa,'peppa')}
      ${a.fire_daily.map(f=>renderAmmoFireRow(f,'daily')).join('')}
    </div>
  `).join('');
}

function seekYT(sec){
  if(window.ytPlayer && typeof ytPlayer.seekTo==='function'){
    ytPlayer.seekTo(sec, true);
    ytPlayer.playVideo();
    // 展開播放器
    const ytBody=document.getElementById('ytBody');
    if(ytBody && !ytBody.classList.contains('open')) toggleYT();
    toast('▶ 跳到 '+Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0'));
  } else {
    toast('請先開啟下方影片播放器');
  }
}

function copyYGUrl(){
  const el=document.getElementById('yg-mini-text');
  if(!el) return;
  const url=el.dataset.url||el.textContent;
  if(navigator.clipboard){ navigator.clipboard.writeText(url).then(()=>toast('✅ 已複製！')); }
  else{ const ta=document.createElement('textarea'); ta.value=url; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast('✅ 已複製！'); }
}

function toggleAmmo(){
  const body=document.getElementById('ammoBody');
  const t=document.getElementById('ammoToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 骨架看完 → 跳到這句對應的語塊彈藥卡（S/V/O 分析 → 語塊記憶 的橋接）──
function jumpToAmmo(globalIdx){
  const ids = SENTENCE_AMMO_MAP2[globalIdx] || [];
  if(!ids.length) return;
  unlockAmmo(globalIdx);
  const body=document.getElementById('ammoBody');
  const t=document.getElementById('ammoToggle');
  body.classList.add('open');
  t.textContent='▲ 收起';
  setTimeout(()=>{
    const card=document.getElementById('ammo-'+ids[0]);
    if(!card) return;
    card.classList.remove('ammo-collapsed');
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('ammo-flash');
    setTimeout(()=>card.classList.remove('ammo-flash'),1200);
  },50);
}

// ── 英西同源詞庫總覽（COGNATE_LIBRARY → cognates.js） ──
function toggleCogLibrary(){
  const body=document.getElementById('cogLibraryBody');
  const t=document.getElementById('cogLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function renderCogLibrary(filter){
  const body=document.getElementById('cogLibraryBody');
  if(!body) return;
  const q=(filter||'').toLowerCase().trim();
  let html=`<input type="text" class="cog-search" id="cogSearchInput" placeholder="🔍 搜尋英文／西語／中文…" value="${(filter||'').replace(/"/g,'&quot;')}">`;

  // 詞綴規律區（無搜尋時顯示）
  if(!q){
    html+=`<div class="suffix-section"><div class="suffix-title">🔤 前後綴歡心－英西鞏固一籮筐雙重解鎖</div>`;
    SUFFIX_PATTERNS.forEach(p=>{
      html+=`<details class="suffix-group"><summary class="suffix-summary"><span class="suffix-rule">${p.rule}</span><span class="suffix-hint">${p.hint}</span></summary><div class="suffix-body">`;
      html+=p.words.map(w=>{
        const genderHtml = w.gendered
          ? `<div class="suffix-gender-row"><span class="sg-cell gender-ms">el ${w.gendered.ms}</span><span class="sg-cell gender-fs">la ${w.gendered.fs}</span><span class="sg-cell gender-mp">los ${w.gendered.mp}</span><span class="sg-cell gender-fp">las ${w.gendered.fp}</span></div>`
          : '';
        const addBtnHtml = isVocabWorthy(w.es) ? `<span class="vocab-add-btn" onclick="addToVocab('${escAttr(w.es)}','${escAttr(w.zh)}','詞綴規律')">＋</span>` : '';
        const chunksHtml = (w.ex?.chunks||[]).map(ck=>{
          const clean=ck.w.replace(/^[¡¿]+|[.!?,;:]+$/g,'').trim();
          if(!clean) return '<span class="suffix-ex-punct">'+ck.w+'</span>';
          const starHtml = isVocabWorthy(ck.w) ? '<span class="suffix-chunk-star" onclick="addToVocab(\''+escAttr(ck.w)+'\',\''+escAttr(w.zh)+'\',\'詞綴例句\');this.textContent=\'⭐\'" title="收藏">☆</span>' : '';
          return '<span class="suffix-ex-chunk role-'+ck.role+'" onclick="speakWord(\''+escAttr(clean)+'\',this)">'+ck.w+'</span>'+starHtml;
        }).join('');
        return `
        <div class="suffix-word-card">
          <div class="suffix-word-row">
            <span class="cog-en">${w.en}</span>
            <span class="cog-arrow">→</span>
            <span class="cog-es" onclick="openYGPanel('${escAttr(w.es)}')">${w.art?`<span class="cog-art">${w.art}</span> `:''}${w.es}</span>
            <span class="cog-zh">${w.zh}</span>
            ${addBtnHtml}
          </div>
          ${genderHtml}
          ${w.ex?`<div class="suffix-ex">
            <div class="suffix-ex-chunks">${chunksHtml}</div>
            <span class="suffix-ex-zh">${w.ex.zh}</span>
          </div>`:''}
        </div>`;
      }).join('');
      html+=`</div></details>`;
    });
    html+=`</div>`;
  }

  // 按集數分組
  const epOrder=[];
  const groups={};
  COGNATE_LIBRARY.forEach(c=>{
    if(q && !(c.en.toLowerCase().includes(q)||c.es.toLowerCase().includes(q)||c.zh.includes(q))) return;
    if(!groups[c.ep]){groups[c.ep]=[];epOrder.push(c.ep);}
    groups[c.ep].push(c);
  });
  if(!epOrder.length && q){
    html+=`<div class="passbook-empty">找不到符合的詞彙</div>`;
  } else {
    epOrder.forEach(epLabel=>{
      html+=`<div class="cog-group"><div class="cog-group-title">${epLabel}</div><div class="cog-row-list">`;
      html+=groups[epLabel].map(c=>`
        <div class="cog-row">
          <span class="cog-en">${c.en}</span>
          <span class="cog-arrow">→</span>
          <span class="cog-es" onclick="openYGPanel('${escAttr(c.es)}')">${c.art?`<span class="cog-art">${c.art}</span> `:''}${c.es}</span>
          <span class="cog-zh">${c.zh}</span>
          <span class="vocab-add-btn" onclick="addToVocab('${escAttr(c.es)}','${escAttr(c.zh)}','同源詞庫')">＋</span>
        </div>`).join('');
      html+=`</div></div>`;
    });
  }
  body.innerHTML=html;
  const input=document.getElementById('cogSearchInput');
  if(input){
    input.oninput=()=>renderCogLibrary(input.value);
    if(filter!==undefined){ input.focus(); const len=input.value.length; input.setSelectionRange(len,len); }
  }
}

// ── 陌生詞彙收藏（localStorage key: peppa_es_vocab_v1，獨立於 peppa_es_v4） ──
let vocabList=[];
const VOCAB_STARS=['☆','★','★★','★★★','★★★★','✓'];
// 0=新收藏 1~4=熟悉度 5=已熟悉(沉底)

function addToVocab(text,zh,source){
  const clean=(text||'').replace(/[¡!¿?,.:;]+$/,'').replace(/^[¡¿]+/,'').trim();
  if(!clean) return;
  if(vocabList.some(v=>v.text===clean)){ toast('已經收藏過了！'); return; }
  vocabList.push({id:Date.now()+Math.random(), text:clean, zh:zh||'', source:source||'', stars:0});
  saveVocabToLS();
  renderVocab();
  toast('☆ 已收藏到詞彙本！');
}

function cycleVocabStar(id){
  const v=vocabList.find(v=>v.id===id);
  if(!v) return;
  v.stars=((v.stars||0)+1)%6;
  saveVocabToLS();
  renderVocab();
}

function removeFromVocab(id){
  vocabList=vocabList.filter(v=>v.id!==id);
  saveVocabToLS();
  renderVocab();
}

function renderVocab(){
  const countEl=document.getElementById('vocabCount');
  if(countEl) countEl.textContent=vocabList.length;
  const el=document.getElementById('vocabEntries');
  if(!el) return;
  if(!vocabList.length){
    el.innerHTML='<div class="passbook-empty">還沒收藏任何詞彙 — 點任何語塊旁的 ＋ 試試看</div>';
    return;
  }
  const active=vocabList.filter(v=>(v.stars||0)<5);
  const done=vocabList.filter(v=>(v.stars||0)>=5);
  const renderCard=(v)=>`
    <div class="vocab-card${(v.stars||0)>=5?' vocab-done':''}">
      <div class="vocab-text">
        <div class="vocab-es" onclick="pronounceVocab('${escAttr(v.text)}')">${v.text}</div>
        <div class="vocab-zh">${v.zh}</div>
        <div class="vocab-source">${v.source}</div>
      </div>
      <div class="vocab-right">
        <div class="vocab-star" onclick="cycleVocabStar(${v.id})" title="點擊增加熟悉度">${VOCAB_STARS[v.stars||0]}</div>
        <div class="vocab-remove" onclick="removeFromVocab(${v.id})">✕</div>
      </div>
    </div>`;
  let html=active.map(renderCard).join('');
  if(done.length){
    html+=`<div class="vocab-done-header">✓ 已熟悉（${done.length}）</div>`;
    html+=done.map(renderCard).join('');
  }
  el.innerHTML=html;
}

function toggleVocabBox(){
  const body=document.getElementById('vocabBody');
  const t=document.getElementById('vocabToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function saveVocabToLS(){
  try{ localStorage.setItem('peppa_es_vocab_v1', JSON.stringify(vocabList)); }catch(e){}
}
function loadVocabFromLS(){
  try{
    const raw=localStorage.getItem('peppa_es_vocab_v1');
    if(!raw) return;
    const d=JSON.parse(raw);
    if(Array.isArray(d)) vocabList=d.map(v=>({stars:0,...v}));
  }catch(e){}
}


// 舊句型存摺已整合進語塊彈藥庫，stub 保留相容性
function togglePatternBook(){}
function addToPatternBook(){}
function renderPatternBook(){}
function cyclePatternStar(){}

function togglePatternBook(){}
// familiarity: 0=off, 1=half, 2=full
const STAR_STATES = ['☆','✨','⭐'];  // 0=off 1=half(✨) 2=full

function addToPassbook(sentence){ /* passbook removed */ }

function cycleStar(idx){/* removed */}

function renderPassbook(){/* removed */}

function togglePassbook(){/* removed */}

// ── MAKE SENTENCE — free type with pattern check ──
// Each sentence has a "pattern" = the structural slots
// We check if user sentence uses the SAME verb/structure slots
function getMakePattern(s){
  // v-role chunks = 動詞語塊；把裡面的字拆成一個個 word 供比對
  const verbWords = new Set(
    s.chunks.filter(c=>c.role==='v')
      .flatMap(c=>c.w.split(/\s+/))
      .map(w=>w.replace(/[¡!¿?,.:;]/g,'').toLowerCase())
  );
  return {
    es: s.es,
    display: s.es.replace(/\S+/g, w => {
      const clean = w.replace(/[¡!¿?,.:;]/g,'').toLowerCase();
      if(verbWords.has(clean)) return `<span class="mp-slot">${w}</span>`;
      return w;
    }),
    // key verbs that must appear
    keyVerbs: [...verbWords],
    wordCount: s.chunks.length,
  };
}

// ── EXPAND STATE ──
let expandSel = {}; // {key: selectedIndex}

function toggleMake(){
  makeOpen=!makeOpen;
  document.getElementById('makeBody').classList.toggle('show',makeOpen);
  document.getElementById('makeIcon').classList.toggle('open',makeOpen);
  if(makeOpen){
    const s=cur();
    expandSel={};
    // Pattern box
    const pat=getMakePattern(s);
    document.getElementById('makePatternBox').innerHTML=
      `<div style="font-size:10px;color:var(--tlight);font-weight:700;margin-bottom:4px">原句句型：</div>${pat.display}`;
    // Expand map
    const expandMap=document.getElementById('expandMap');
    if(s.expand){
      expandMap.style.display='block';
      renderExpandMap(s.expand);
    } else {
      expandMap.style.display='none';
    }
    document.getElementById('makeFreeInput').value='';
    document.getElementById('makeFreeInput').className='make-free-input';
    document.getElementById('makeResult').style.display='none';
  }
}

function renderExpandMap(exp){
  const map=document.getElementById('expandMap');
  let html='';
  // Note about Este/Esta
  if(exp.note){
    html+=`<div style="font-size:11px;color:var(--benikake);font-weight:700;margin-bottom:6px;padding:6px 10px;background:rgba(132,145,195,.08);border-radius:8px;border-left:3px solid var(--benikake)">${exp.note}</div>`;
  }
  exp.groups.forEach(g=>{
    html+=`<div class="expand-group">`;
    html+=`<div class="expand-group-label">${g.label}</div>`;
    html+=`<div class="expand-chips">`;
    g.options.forEach((opt,i)=>{
      const isSel=expandSel[g.key]===i;
      html+=`<div class="exp-chip${isSel?' selected':''}" onclick="selectExpand('${g.key}',${i})">
        ${opt.es} <span class="exp-zh">${opt.zh}</span>
      </div>`;
    });
    html+=`</div></div>`;
  });
  // Preview sentence
  html+=`<div class="expand-preview" id="expandPreview">${buildExpandPreview(exp)}</div>`;
  map.innerHTML=html;
}

function selectExpand(key,i){
  const s=cur();
  if(!s.expand)return;
  expandSel[key]=i;
  // Auto-select size gender when rel changes
  if(key==='rel'){
    const relOpt=s.expand.groups.find(g=>g.key==='rel').options[i];
    // clear size selection if gender mismatch
    const sizeGroup=s.expand.groups.find(g=>g.key==='size');
    if(sizeGroup){
      const curSizeIdx=expandSel['size'];
      if(curSizeIdx!==undefined){
        const curSize=sizeGroup.options[curSizeIdx];
        if(curSize.gender!=='both'&&curSize.gender!==relOpt.gender){
          delete expandSel['size'];
        }
      }
    }
  }
  renderExpandMap(s.expand);
  // Fill input with built sentence
  const built=buildExpandSentence(s.expand);
  if(built){
    document.getElementById('makeFreeInput').value=built;
    speakFull(built);
  }
}

function buildExpandPreview(exp){
  if(exp.template) return buildExpandPreviewGeneric(exp);
  const relGroup=exp.groups.find(g=>g.key==='rel');
  const sizeGroup=exp.groups.find(g=>g.key==='size');
  const nameGroup=exp.groups.find(g=>g.key==='name');

  const rel  = relGroup  && expandSel['rel']  !==undefined ? relGroup.options[expandSel['rel']]   : null;
  const size = sizeGroup && expandSel['size'] !==undefined ? sizeGroup.options[expandSel['size']] : null;
  const name = nameGroup && expandSel['name'] !==undefined ? nameGroup.options[expandSel['name']] : null;

  // Determine Este/Esta from rel gender
  const dem = rel ? (rel.gender==='f' ? 'Esta' : 'Este') : '<span class="ep-demo">Este/Esta</span>';
  const relStr  = rel  ? `<span class="ep-demo">${rel.es}</span>`   : `<span style="color:var(--nezumi)">[關係詞]</span>`;
  const sizeStr = size ? `<span class="ep-demo">${size.es}</span>`  : `<span style="color:var(--nezumi)">[大小]</span>`;
  const nameStr = name ? `<span class="ep-demo">${name.es}</span>`  : `<span style="color:var(--nezumi)">[名字]</span>`;

  // Gender note
  let gNote='';
  if(rel&&size&&size.gender!=='both'&&size.gender!==rel.gender){
    gNote=`<span class="ep-gender-note">⚠️ ${rel.gender==='f'?'pequeña':'pequeño'} 才對</span>`;
  }

  return `${dem} <span class="ep-fixed">es mi</span> ${relStr} ${sizeStr} ${nameStr}${gNote}`;
}

// ── 通用版 expand（E2/E3 新句子用）：template = 固定字/佔位符 陣列 ──
function buildExpandPreviewGeneric(exp){
  return exp.template.map(tok=>{
    if(tok.t!==undefined) return `<span class="ep-fixed">${tok.t}</span>`;
    const g=exp.groups.find(g=>g.key===tok.g);
    const i=expandSel[tok.g];
    if(i===undefined) return `<span style="color:var(--nezumi)">[${g.label}]</span>`;
    return `<span class="ep-demo">${g.options[i].es}</span>`;
  }).join(' ');
}

function buildExpandSentenceGeneric(exp){
  const firstGroupKey=exp.groups[0].key;
  if(expandSel[firstGroupKey]===undefined) return '';
  const parts=exp.template.map(tok=>{
    if(tok.t!==undefined) return tok.t;
    const g=exp.groups.find(g=>g.key===tok.g);
    const i=expandSel[tok.g];
    return i!==undefined ? g.options[i].es : '';
  }).filter(Boolean);
  return parts.join(' ');
}

function buildExpandSentence(exp){
  if(exp.template){
    const built=buildExpandSentenceGeneric(exp);
    return built ? built+(/[.!?]$/.test(built)?'':'.') : '';
  }
  const relGroup=exp.groups.find(g=>g.key==='rel');
  const sizeGroup=exp.groups.find(g=>g.key==='size');
  const nameGroup=exp.groups.find(g=>g.key==='name');
  if(expandSel['rel']===undefined) return '';
  const rel  = relGroup.options[expandSel['rel']];
  const size = sizeGroup&&expandSel['size']!==undefined ? sizeGroup.options[expandSel['size']] : null;
  const name = nameGroup&&expandSel['name']!==undefined ? nameGroup.options[expandSel['name']] : null;
  const dem = rel.gender==='f'?'Esta':'Este';
  let parts=[dem,'es','mi',rel.es];
  if(size) parts.push(size.es);
  if(name) parts.push(name.es);
  return parts.join(' ')+'.';
}

function checkMakeFree(){
  const val=document.getElementById('makeFreeInput').value.trim();
  const res=document.getElementById('makeResult');
  if(!val){ toast('先打一個句子！'); return; }

  const s=cur();
  const pat=getMakePattern(s);

  // Normalize input
  const norm=v=>v.toLowerCase().replace(/[¡!¿?,.:;]/g,'').trim();
  const input=norm(val);
  const original=norm(s.es);

  // Case 1: typed same as original
  if(input===original){
    res.className='make-result tip';
    res.textContent='😄 這是原句！試著換掉名字或主詞，造一個屬於你的句子～';
    res.style.display='block';
    document.getElementById('makeFreeInput').className='make-free-input';
    return;
  }

  // Case 2: check key verbs present
  const inputWords=input.split(/\s+/);
  const verbsFound=pat.keyVerbs.filter(v=>inputWords.some(w=>w===v||w.startsWith(v.slice(0,-1))));
  const hasVerbs=verbsFound.length>=Math.ceil(pat.keyVerbs.length/2);

  // Case 3: rough word count check (±3)
  const countOk=Math.abs(inputWords.length-pat.wordCount)<=3;

  if(hasVerbs&&countOk){
    res.className='make-result ok';
    res.textContent=`✅ 句型對了！用了 ${verbsFound.join(' / ')} — 很棒！`;
    res.style.display='block';
    document.getElementById('makeFreeInput').className='make-free-input ok';
    if(!makeAnswered.includes(idx)){makeAnswered.push(idx);makeScore++;}
    // speak the user's sentence
    speakFull(val);
    toast('🔊 念你的句子給你聽！');
  } else {
    res.className='make-result err';
    const hint = pat.keyVerbs.length ? `記得用「${pat.keyVerbs.join(' / ')}」這個動詞喔` : '句子太短或結構不太對';
    res.textContent=`❌ ${hint}`;
    res.style.display='block';
    document.getElementById('makeFreeInput').className='make-free-input err';
  }
}

function resetMakeFree(){
  document.getElementById('makeFreeInput').value='';
  document.getElementById('makeFreeInput').className='make-free-input';
  document.getElementById('makeResult').style.display='none';
}

// ── RENDER CARD ──
function render(){
  const s=cur(),n=total();
  revealed=false;makeOpen=false;builtTokens=[];
  document.getElementById('answerBox').classList.remove('show');
  document.getElementById('nextBtn').style.display='none';
  const uz=document.getElementById('unlockZone');if(uz){uz.style.display='';}
  const tipEl = document.getElementById('grammarTip');
  if(tipEl) tipEl.style.display='none';
  document.getElementById('userInput').value='';
  document.getElementById('userInput').className='trans-input';
  document.getElementById('makeBody').classList.remove('show');
  document.getElementById('makeIcon').classList.remove('open');
  document.getElementById('makeResult').style.display='none';
  if(document.getElementById('makeFreeInput')){
    document.getElementById('makeFreeInput').value='';
    document.getElementById('makeFreeInput').className='make-free-input';
  }

  document.getElementById('epBadge').textContent=`S1 · ep${ep+1} · ${epData().titleZh}`;
  const tsVal = s.ts!=null ? ` <span class="card-num-ts">${Math.floor(s.ts/60)}:${String(s.ts%60).padStart(2,'0')}</span>` : '';
  document.getElementById('cardNum').innerHTML = `句 ${idx+1} / ${n}${tsVal}`;
  document.getElementById('navCount').textContent=`${idx+1} / ${n}`;

  const area=document.getElementById('chunksArea');
  area.innerHTML='';
  s.chunks.forEach(c=>{
    const div=document.createElement('div');div.className='chunk';
    const personCls=c.role==='s'?getPersonClass(c.w):'';
    const famState=getFamState(c.w);
    const famCls=famState>0?' '+FAM_CLASSES[famState]:'';
    const pill=document.createElement('div');
    pill.className='chunk-pill role-'+(c.role||'plain')+(personCls?' '+personCls:'')+famCls;
    pill.dataset.famWord=c.w;
    const word=document.createElement('span');word.textContent=c.w;
    pill.appendChild(word);
    if(isVocabWorthy(c.w)){
      const addBtn=document.createElement('span');addBtn.className='vocab-add-btn';addBtn.textContent='＋';
      addBtn.onclick=(e)=>{e.stopPropagation();addToVocab(c.w,'',s.es.slice(0,12)+'…語塊');};
      pill.appendChild(addBtn);
    }
    div.appendChild(pill);
    div.onclick=()=>handleChunkTap(c,div);
    area.appendChild(div);
  });

  document.getElementById('fullSent').textContent=s.es;
  document.getElementById('fullSent').onclick=()=>speakFull(s.es);

  // ── YouGlish 語塊按鈕 keyword ──
  const ygKw = SENTENCE_YG_KW['e'+ep+'_s'+idx] || s.chunks.find(c=>c.role==='v')?.w || s.es.slice(0,15);
  const ygUrl = 'https://youtube.com/@peppapigespanollatinooficial?feature=shared';
  const urlEl = document.getElementById('yg-mini-text');
  if(urlEl){ urlEl.textContent = ygUrl; urlEl.dataset.url = ygUrl; }

  // ── 英西同源槓桿 details 注入 ──
  let cogBox = document.getElementById('cogBox');
  if(!cogBox){
    cogBox = document.createElement('div');
    cogBox.id = 'cogBox';
    const answerBox = document.getElementById('answerBox');
    answerBox.parentNode.insertBefore(cogBox, answerBox);
  }
  const cogData = SENTENCE_COGNATES['e'+ep+'_s'+idx];
  if(cogData){
    cogBox.innerHTML = buildCogDetails(cogData);
  } else {
    cogBox.innerHTML = '';
  }
  document.getElementById('prevBtn').disabled=(idx===0);
  document.getElementById('nextBtnB').disabled=(idx===n-1);

  const card=document.getElementById('mainCard');
  card.style.animation='none';card.offsetHeight;card.style.animation='';
  switchLang('zh');renderStars();
  syncGroupBtn();
}

function smartMatch(input,s){
  const clean=t=>t.toLowerCase().replace(/[，。！？、：；,.!?:;\s]/g,'');
  const u=clean(input);
  if(u.length<2)return false;
  if(clean(u)===clean(s.zh)||clean(u)===clean(s.en))return true;
  // keyword overlap zh
  const zhChars=s.zh.replace(/[，。！？、的了是在也都很\s]/g,'').split('');
  const matchZh=zhChars.filter(c=>u.includes(c)).length/Math.max(zhChars.length,1);
  // keyword overlap en
  const enWords=s.en.toLowerCase().replace(/[,.!?]/g,'').split(' ').filter(w=>w.length>2);
  const matchEn=enWords.length?enWords.filter(w=>u.includes(w)).length/enWords.length:0;
  return matchZh>=0.55||matchEn>=0.55;
}

function revealAnswer(){
  if(revealed)return;revealed=true;
  const s=cur();
  document.getElementById('aTextZh').textContent=s.zh;
  document.getElementById('aNoteZh').textContent=s.noteZh;
  document.getElementById('aTextEn').textContent=s.en;
  document.getElementById('aNoteEn').textContent=s.noteEn;
  document.getElementById('answerBox').classList.add('show');
  const uz=document.getElementById('unlockZone');
  if(uz){uz.style.display='none';}
  const nb=document.getElementById('nextBtn');
  nb.style.display='block';nb.style.flex='1';
  showGrammarTip(ep * 10 + idx);
  if(!answered.includes(idx)){
    answered.push(idx);
    const val=document.getElementById('userInput').value.trim();
    const ok=val.length>1&&smartMatch(val,s);
    if(ok){score++;document.getElementById('userInput').classList.add('correct');toast('✅ 答對了！');}
    else if(val.length>1){document.getElementById('userInput').classList.add('wrong');toast('❌ 看答案再試試！');}
    else{document.getElementById('userInput').classList.add('wrong');}
    addToPassbook(s);
    const globalIdx = ep * 10 + idx;
    unlockAmmo(globalIdx); unlockStar(globalIdx);
    saveToLS();
    renderStars();
  }
}

function switchLang(lang){
  document.querySelectorAll('.a-lang').forEach(el=>el.classList.remove('on'));
  document.querySelectorAll('.a-tab').forEach(el=>el.classList.remove('on'));
  document.getElementById(lang==='zh'?'aZh':'aEn').classList.add('on');
  const tabs=document.querySelectorAll('.a-tab');
  (lang==='zh'?tabs[0]:tabs[1]).classList.add('on');
}

function nextCard(){
  if(idx<total()-1){idx++;render();}else showComplete();
}
function prevCard(){if(idx>0){idx--;render();}}

// ── PER-EPISODE COGNATES ──
const EP_COGNATES = [
  // E1 泥巴坑
  [
    {en:'family',   es:'familia',    zh:'家庭'},
    {en:'animal',   es:'animal',     zh:'動物'},
    {en:'detective',es:'detective',  zh:'偵探'},
    {en:'super',    es:'súper',      zh:'超級'},
  ],
  // E2 恐龍先生
  [
    {en:'dinosaur', es:'dinosaurio', zh:'恐龍'},
    {en:'favorite', es:'favorito',   zh:'最喜歡的'},
    {en:'detective',es:'detective',  zh:'偵探'},
    {en:'hospital', es:'hospital',   zh:'醫院'},
  ],
  // E3 最好的朋友
  [
    {en:'doctor',   es:'doctora',    zh:'醫生'},
    {en:'princess', es:'princesa',   zh:'公主'},
    {en:'nurse',    es:'enfermera',  zh:'護士'},
    {en:'hospital', es:'hospital',   zh:'醫院'},
  ],
];


const CHEERS = [
  '你已經學完了 10 句真實西語對話！比背單字有趣多了吧！🎉',
  '太厲害了！10 句佩佩豬西語，你全部學過一遍！⭐',
  '每天 10 句，一年後的你會感謝今天的自己！💪',
  '你的大腦現在正在建立西語神經連線！繼續！🧠',
  '就是這樣！語塊學習法讓你學得快又記得住！🚀',
];

// ── 熟悉度系統（localStorage key: peppa_es_familiarity_v1） ──
let chunkFamiliarity = {};
const FAM_STARS   = ['☆','◑','★'];
const FAM_LABELS  = ['未熟','半熟','全熟'];
const FAM_CLASSES = ['fam-0','fam-1','fam-2'];

function loadFamiliarity(){
  try{ chunkFamiliarity = JSON.parse(localStorage.getItem('peppa_es_familiarity_v1')||'{}'); }catch(e){ chunkFamiliarity={}; }
}
function saveFamiliarity(){
  try{ localStorage.setItem('peppa_es_familiarity_v1', JSON.stringify(chunkFamiliarity)); }catch(e){}
}
function getFamState(word){ return chunkFamiliarity[word] || 0; }

function cycleFamiliarity(word){
  const next = (getFamState(word)+1)%3;
  chunkFamiliarity[word] = next;
  saveFamiliarity();
  const btn = document.querySelector('.fam-star-btn');
  if(btn && btn.dataset.word === word){
    btn.textContent = FAM_STARS[next];
    btn.title = FAM_LABELS[next];
    btn.dataset.state = next;
  }
  document.querySelectorAll('.chunk-pill[data-fam-word], .ammo-fire-chunk[data-fam-word]').forEach(el=>{
    if(el.dataset.famWord === word){
      FAM_CLASSES.forEach(c=>el.classList.remove(c));
      if(next>0) el.classList.add(FAM_CLASSES[next]);
    }
  });
}

function isVocabWorthy(word){
  const w = (word||'').toLowerCase().replace(/[¡¿.,!?;:]+/g,'').trim();
  const SKIP = new Set(['yo','tú','tu','él','el','ella','nosotros','nosotras','vosotros','vosotras','ellos','ellas','usted','ustedes','me','te','se','le','les','soy','eres','es','somos','sois','son','estoy','estás','estas','está','esta','estamos','estáis','estais','están','estan','hay','y','o','a','de','en','que','no','si','sí','muy','más','mas','todo','todos','una','un','la','lo','las','los','del','al','qué','quién']);
  return w.length > 1 && !SKIP.has(w);
}

// ── SAVE / LOAD (LocalStorage) ──
function saveToLS(){
  try{
    const data = { ammoUnlocked, ammoStars };
    localStorage.setItem('peppa_es_v4', JSON.stringify(data));
  }catch(e){}
}

function loadFromLS(){
  try{
    // 清除舊版
    ['peppa_es_v1','peppa_es_v2','peppa_es_v3'].forEach(k=>localStorage.removeItem(k));
    const raw = localStorage.getItem('peppa_es_v4');
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.ammoUnlocked) ammoUnlocked = d.ammoUnlocked;
    if(d.ammoStars)    ammoStars    = d.ammoStars;
  }catch(e){}
}

// ── COMPLETE SCREEN ──
function showComplete(){
  document.querySelector('.card-container').style.display='none';
  document.querySelector('.nav-row').style.display='none';
  const cs = document.getElementById('completeScreen');
  cs.classList.add('show');

  const n = total();
  let stars = '';
  for(let i=0;i<n;i++) stars+='⭐';
  stars += ' 🌟';
  document.getElementById('completeStars').textContent = stars;
  document.getElementById('completeTitle').textContent = `E${ep+1} 完成！`;
  document.getElementById('completeSub').textContent   = `${epData().titleZh} · 全 ${n} 句`;
  document.getElementById('finalScore').textContent    = score;
  document.getElementById('finalMake').textContent     = makeScore;
  document.getElementById('finalWords').textContent    = ammoUnlocked.length;

  const cogs = EP_COGNATES[ep] || [];
  document.getElementById('ecList').innerHTML = cogs.map(c=>`
    <div class="ec-item">
      <span class="ec-en">${c.en}</span>
      <span class="ec-arrow">→</span>
      <span class="ec-es">${c.es}</span>
      <span class="ec-zh">${c.zh}</span>
    </div>`).join('');

  document.getElementById('completeCheer').textContent =
    CHEERS[Math.floor(Math.random()*CHEERS.length)];

  const nextEpBtn = document.getElementById('nextEpBtn');
  if(ep < EPS.length-1){
    nextEpBtn.classList.remove('locked');
    nextEpBtn.textContent = '下一集 →';
  } else {
    nextEpBtn.classList.add('locked');
    nextEpBtn.textContent = '🎉 S1 全集完成！';
  }

  renderAmmo();
  saveToLS();
}

function restartEp(){
  score=0;makeScore=0;idx=0;answered=[];makeAnswered=[];
  document.getElementById('completeScreen').classList.remove('show');
  document.querySelector('.card-container').style.display='block';
  document.querySelector('.nav-row').style.display='flex';
  render();
}

function goNextEp(){
  if(ep < EPS.length-1) selectEp(ep+1);
}

// ── TOAST ──
let _toastTimer = null;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

function showPronBackup(word){
  const url = 'https://es.wiktionary.org/wiki/'+encodeURIComponent(word);
  const t = document.getElementById('toast');
  t.innerHTML = 'WordReference 沒有？→ <a href="'+url+'" target="_blank" rel="noopener" style="color:var(--mizu);font-weight:900;text-decoration:none">Wiktionary ↗</a>';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(()=>{ t.classList.remove('show'); }, 4000);
}

function clearLS(){
  if(!confirm('確定清除所有學習紀錄？')) return;
  localStorage.removeItem('peppa_es_v4');
  localStorage.removeItem('peppa_es_vocab_v1');
  ammoUnlocked=[];ammoStars={};vocabList=[];
  renderAmmo();renderVocab();
  toast('已清除所有學習紀錄');
}

// ── 文法酷庫 ──

function showGrammarTip(globalIdx){
  const el = document.getElementById('grammarTip');
  if(!el) return;
  const gId = SENTENCE_GRAMMAR_MAP[globalIdx];
  if(!gId){ el.style.display='none'; return; }
  const g = GRAMMAR_DATA.find(x => x.id===gId);
  if(!g){ el.style.display='none'; return; }
  el.style.display = 'block';
  el.innerHTML = `<div class="grammar-tip-inner" onclick="openGrammarCard('${gId}')">
    <span class="grammar-tip-icon">💡</span>
    <div class="grammar-tip-text">
      <div class="grammar-tip-label">這句的文法點</div>
      <div class="grammar-tip-title">${g.title}</div>
    </div>
    <span class="grammar-tip-arrow">→</span>
  </div>`;
}

function buildConjTable(conj, gId){
  if(!conj || !conj.rows || !conj.rows.length) return '';
  const renderRow = r =>
    `<div class="conj-row">
      <span class="conj-person">${r.person}</span>
      <span class="conj-form" onclick="speakSentence('${escAttr(r.ex)}')">${r.form}</span>
      <span class="conj-ex" onclick="speakSentence('${escAttr(r.ex)}')">${r.ex}</span>
      <span class="conj-zh">${r.zh}</span>
      ${r.note?`<span class="conj-note">（${r.note}）</span>`:''}
    </div>`;
  const main3 = conj.rows.slice(0,3).map(renderRow).join('');
  const rest3 = conj.rows.slice(3);
  const restHtml = rest3.length
    ? `<details class="conj-expand"><summary class="conj-expand-summary">我們／你們／他們 ▾</summary>${rest3.map(renderRow).join('')}</details>`
    : '';
  const jumpBtn = gId ? `<div class="conj-jump-btn" onclick="jumpToConjLib('${gId}')">🔄 查完整變位庫 →</div>` : '';
  return `<div class="conj-section">
    <div class="conj-verb-label">${conj.verb}</div>
    <div class="conj-rows">${main3}${restHtml}</div>
    ${jumpBtn}
  </div>`;
}

// ── 👤 人稱代名詞查詢庫 ──
const PERSON_ICONS = ['🙋','👉','👤','👥','🙌','👨‍👩‍👧‍👦']; // 依序：1單/2單/3單/1複/2複/3複
function renderPronounLibrary(){
  const el = document.getElementById('pronounLibBody');
  if(!el) return;
  el.innerHTML = PRONOUN_LIBRARY.map(cat=>`
    <div class="pron-cat-card">
      <div class="pron-cat-header">${cat.cat} <span class="pron-cat-en">${cat.catEn}</span></div>
      <div class="pron-cat-hint">${cat.hint}</div>
      <div class="pron-rows">
        ${cat.rows.map((r,i)=>`
          <div class="pron-row">
            <span class="pron-icon">${PERSON_ICONS[i]||''}</span>
            <span class="pron-es" onclick="speakWord('${escAttr(r.es)}',this)">${r.es}</span>
            <span class="pron-zh">${r.zh}</span>
            <span class="pron-en">${r.en}</span>
          </div>`).join('')}
      </div>
      ${cat.example?`<div class="pron-example" onclick="speakSentence('${escAttr(cat.example.es)}')">
        <div class="pron-ex-es">▶ ${cat.example.es}</div>
        <div class="pron-ex-zh">${cat.example.zh}</div>
      </div>`:''}
      ${cat.note?`<div class="pron-note">${cat.note}</div>`:''}
    </div>`).join('');
}

function togglePronounLib(){
  const body=document.getElementById('pronounLibBody');
  const t=document.getElementById('pronounLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 🔄 動詞變位庫（獨立瀏覽區）──
function renderConjLibrary(){
  const el = document.getElementById('conjLibBody');
  if(!el) return;
  const verbs = GRAMMAR_DATA.filter(g=>g.conj && g.conj.rows && g.conj.rows.length);
  el.innerHTML = verbs.map(g=>`
    <div class="conj-lib-card" id="conjlib-${g.id}">
      <div class="conj-lib-header">${g.conj.verb}</div>
      ${buildConjTable(g.conj)}
    </div>`).join('');
}

function toggleConjLib(){
  const body=document.getElementById('conjLibBody');
  const t=document.getElementById('conjLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function jumpToConjLib(gId){
  closeGrammarSheet();
  switchMainTab('know');
  const body=document.getElementById('conjLibBody');
  const t=document.getElementById('conjLibToggle');
  body.classList.add('open');
  t.textContent='▲ 收起';
  setTimeout(()=>{
    const card=document.getElementById('conjlib-'+gId);
    if(!card) return;
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('ammo-flash');
    setTimeout(()=>card.classList.remove('ammo-flash'),1200);
  },80);
}

function openGrammarCard(gId){
  const g = GRAMMAR_DATA.find(x => x.id===gId);
  if(!g) return;
  const catLabel = (GRAMMAR_CATS.find(c=>c.key===g.cat)||{label:''}).label;
  const exHtml = g.examples.map(ex =>
    `<div class="grammar-ex-row" onclick="speakSentence('${escAttr(ex.es)}')">
      <div class="grammar-ex-es">▶ ${ex.es}</div>
      <div class="grammar-ex-zh">${ex.zh}</div>
    </div>`
  ).join('');
  const ruleClass = g.emph ? 'grammar-rule grammar-rule-emph' : 'grammar-rule';
  openGrammarSheet(`
    <div class="grammar-cat-tag">${catLabel}</div>
    <div class="grammar-title">${g.title}</div>
    <div class="${ruleClass}">${g.rule}</div>
    <div class="grammar-examples">${exHtml}</div>
    ${buildConjTable(g.conj, g.id)}
    <div class="grammar-trap">${g.trap}</div>
    <div class="grammar-source">📍 ${g.source}</div>
  `);
}

function closeGrammarModal(){
  closeGrammarSheet();
}

function openGrammarSheet(html){
  document.getElementById('grammarSheetContent').innerHTML = html;
  document.getElementById('grammarSheet').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeGrammarSheet(){
  document.getElementById('grammarSheet').style.display = 'none';
  document.body.style.overflow = '';
}

function _famStarHtml(word){
  const s = getFamState(word);
  return `<button class="fam-star-btn" data-word="${escAttr(word)}" data-state="${s}" onclick="cycleFamiliarity('${escAttr(word)}')" title="${FAM_LABELS[s]}">${FAM_STARS[s]}</button>`;
}

function handleChunkTap(c, el){
  speakWord(c.w, el);
  if(c.note){
    openGrammarSheet(_famStarHtml(c.w)+'<div class="grammar-chunk-note">'+c.note+'</div>');
  }
}

function ammoChunkTap(word, hideYg, note){
  speakWord(word, null);
  if(note){
    openGrammarSheet(_famStarHtml(word)+'<div class="grammar-chunk-note">'+note+'</div>');
  }
}

function speakSentence(text){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音'); return; }
  try{ speechSynthesis.cancel(); }catch(e){}
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'es-MX';
  utt.rate = 0.7;
  utt.pitch = 1.05;
  utt.volume = 1;
  if(ttsVoice) utt.voice = ttsVoice;
  const dot = document.getElementById('ttsDot');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  utt.onend = () => { if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); } };
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 0);
}

// ── INIT ──
// ── 雙 TAB 切換（語塊遊樂場 / 知識儲藏室）──
function switchMainTab(tab){
  const play=document.getElementById('tabPlay');
  const know=document.getElementById('tabKnow');
  const btnPlay=document.getElementById('tabBtnPlay');
  const btnKnow=document.getElementById('tabBtnKnow');
  if(tab==='know'){
    play.style.display='none'; know.style.display='';
    btnPlay.classList.remove('active'); btnKnow.classList.add('active');
  } else {
    play.style.display=''; know.style.display='none';
    btnKnow.classList.remove('active'); btnPlay.classList.add('active');
  }
}

(function init(){
  loadFromLS();
  loadVocabFromLS();
  loadFamiliarity();
  buildNav();
  render();
  renderAmmo();
  renderCogLibrary();
  renderConjLibrary();
  renderPronounLibrary();
  renderVocab();
  initTTS();
  initGroupButtons();
})();
