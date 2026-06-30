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

// ── YOUGLISH PRONUNCIATION ──
function openYG(word, lang){
  const url = `https://youglish.com/pronounce/${encodeURIComponent(word)}/${lang}`;
  window.open(url, '_blank', 'noopener');
}

// ── SPEECH SYNTHESIS (TTS) ──
let ttsReady = false;
let ttsVoice = null;

function initTTS(){
  if(!window.speechSynthesis){ return; }
  function pickVoice(){
    const voices = speechSynthesis.getVoices();
    ttsVoice = voices.find(v=>v.lang==='es-ES')
      || voices.find(v=>v.lang==='es-MX')
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
  utt.lang = 'es-ES';
  utt.rate = 0.82;
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
    done===0?'完成一句點亮一顆星 ⭐':
    done===n?`🌟 E${ep+1} 全集完成！`:
    `⭐ ${done} / ${n} 句完成`;
}

/* AMMO data → ammo.js */

// ── AMMO STATE ──
let ammoUnlocked = []; // array of ammo_ids unlocked so far
let ammoStars = {};    // {ammo_id: 0|1|2}

// Map sentence global index → ammo_id(s) to unlock
// (SENTENCE_AMMO_MAP 保留作備份；實際使用 SENTENCE_AMMO_MAP2)
const SENTENCE_AMMO_MAP2 = {
  0:  ['e1_01','e1_estar','e1_ser_adj'],
  1:  ['e1_02'],
  6:  ['e1_03'],
  8:  ['e1_04','e1_05'],
  12: ['e2_01'],
  13: ['e2_02'],
  25: ['e3_01'],
  26: ['e3_02'],
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

function renderAmmoFireRow(fire, type){
  const tag = type==='peppa' ? '🎯 一發命中（佩佩豬原句）' : '🔥 火力全開（日常對話）';
  return `<div class="ammo-fire-row ${type}" onclick="speakFull('${fire.es.replace(/'/g,"\\'")}')">
    <div class="ammo-fire-tag ${type}">${tag}</div>
    <div class="ammo-fire-es">${fire.es}</div>
    <div class="ammo-fire-zh">${fire.zh}</div>
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
    return `<div class="ammo-card">
      <div class="ammo-ep-tag">${a.ep}</div>
      <!-- 核心彈藥 -->
      <div class="ammo-chunk-row">
        <span class="ammo-label l-chunk">💥 核心彈藥</span>
        <span class="ammo-chunk" onclick="speakFull('${a.core_ammo.replace(/'/g,"\\'")}')">${a.core_ammo}</span>
        ${renderBeVerbTag(a)}
        <span class="ammo-chunk-zh">${a.core_zh}</span>
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
        ${renderAmmoFireRow(a.fire_peppa,'peppa')}
        ${dailyRows}
      </div>
      <div class="ammo-star" onclick="cycleAmmoStar('${a.ammo_id}')">${star}</div>
    </div>`;
  }).join('');
}

function toggleAmmo(){
  const body=document.getElementById('ammoBody');
  const t=document.getElementById('ammoToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
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
  // Build a pattern description from chunks
  const slots = s.chunks
    .filter(c=>c.type==='verb'||c.type==='noun'||c.type==='adj')
    .map(c=>c.type);
  return {
    es: s.es,
    display: s.es.replace(/\S+/g, w => {
      const chunk = s.chunks.find(c=>c.word===w);
      if(!chunk) return w;
      if(chunk.type==='noun'&&chunk.hint&&chunk.hint.includes('名字'))
        return `<span class="mp-slot">${chunk.hint}</span>`;
      if(chunk.type==='verb')
        return `<span class="mp-slot">${chunk.word}</span>`;
      return w;
    }),
    // key verbs that must appear
    keyVerbs: s.chunks.filter(c=>c.type==='verb').map(c=>c.word.replace(/[¡!¿?,.:;]/g,'').toLowerCase()),
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

function buildExpandSentence(exp){
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
  document.getElementById('userInput').value='';
  document.getElementById('userInput').className='trans-input';
  document.getElementById('makeBody').classList.remove('show');
  document.getElementById('makeIcon').classList.remove('open');
  document.getElementById('makeResult').style.display='none';
  if(document.getElementById('makeFreeInput')){
    document.getElementById('makeFreeInput').value='';
    document.getElementById('makeFreeInput').className='make-free-input';
  }

  document.getElementById('epBadge').textContent=`S1 · E${ep+1} · ${epData().titleZh}`;
  document.getElementById('cardNum').textContent=`句 ${idx+1} / ${n}`;
  document.getElementById('navCount').textContent=`${idx+1} / ${n}`;

  const area=document.getElementById('chunksArea');
  area.innerHTML='';
  s.chunks.forEach(c=>{
    const div=document.createElement('div');div.className='chunk';
    const pill=document.createElement('div');pill.className='chunk-pill '+(c.type||'');pill.textContent=c.word;
    const hint=document.createElement('div');hint.className='chunk-hint';hint.textContent=c.hint||'';
    div.appendChild(pill);div.appendChild(hint);
    div.onclick=()=>speakWord(c.word,div);
    area.appendChild(div);
  });

  document.getElementById('fullSent').textContent=s.es;
  document.getElementById('fullSent').onclick=()=>speakFull(s.es);

  // ── YouGlish 語塊按鈕 keyword ──
  const ygKw = SENTENCE_YG_KW['e'+ep+'_s'+idx] || s.es.slice(0,20);
  const ygBtn = document.getElementById('yg-card-btn');
  if(ygBtn){ ygBtn.onclick = ()=>{ openYGPanel(ygKw); unlockStar(idx + ep * 10); }; ygBtn.querySelector('.yg-label').textContent = ygKw; }

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
  document.getElementById('nextBtn').style.display='block';
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
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

function clearLS(){
  if(!confirm('確定清除所有學習紀錄？')) return;
  localStorage.removeItem('peppa_es_v4');
  ammoUnlocked=[];ammoStars={};
  renderAmmo();
  toast('已清除所有學習紀錄');
}

// ── INIT ──
(function init(){
  loadFromLS();
  buildNav();
  render();
  renderAmmo();
  initTTS();
})();
