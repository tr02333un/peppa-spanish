/* ── 實戰練習關卡 Stage 1 / 2 / 3 ── */

// ── Stage 2: tú / yo 人稱互換 ──
const TU_YO_PAIRS = [
  {yo:"Yo soy Peppa.",          tu:"Tú eres Peppa.",          zh:"我/你是佩佩。"},
  {yo:"Yo estoy lloviendo.",    tu:"Tú estás mojado.",        zh:"我下雨了。/你淋濕了。"},
  {yo:"Yo puedo salir.",        tu:"Tú puedes salir.",        zh:"我/你可以出去。"},
  {yo:"Yo debo ponerme las botas.", tu:"Tú debes ponerte las botas.", zh:"我/你必須穿雨靴。"},
  {yo:"Me encanta saltar.",     tu:"¿Te encanta saltar?",     zh:"我超愛跳。/你超愛跳嗎？"},
  {yo:"He encontrado el charco.", tu:"Has encontrado el charco.", zh:"我找到了水坑。/你找到了水坑。"},
  {yo:"No paso nada.",          tu:"No te preocupes.",         zh:"我沒事。/你不要擔心。"}
];

// ── Stage 3: 核心 + 補語 ──
const STAGE_CORES = [
  {zh:"我是",    es:"Yo soy"},
  {zh:"你是",    es:"Tú eres"},
  {zh:"我正在",  es:"Yo estoy"},
  {zh:"我可以",  es:"Yo puedo"},
  {zh:"我必須",  es:"Yo debo"},
  {zh:"我超愛",  es:"Me encanta"},
  {zh:"我找到了", es:"He encontrado"}
];

const STAGE_VERBS = [
  {zh:"學生",    es:"estudiante"},
  {zh:"朋友",    es:"amigo/a"},
  {zh:"偵探",    es:"detective"},
  {zh:"醫生",    es:"médico/a"},
  {zh:"跳水坑",  es:"saltar en los charcos"},
  {zh:"出去玩",  es:"salir a jugar"},
  {zh:"看電視",  es:"ver la tele"},
  {zh:"洗手",    es:"lavarme las manos"}
];

// ── Stage 1 State ──
let _s1Pool = [];
let _s1Idx = 0;
let _s1Order = [];
let _s1Done = [];

function _stageChunkClass(role){
  if(role==='v') return 'role-v';
  if(role==='s') return 'role-s';
  if(role==='o') return 'role-o';
  if(role==='c') return 'role-c';
  return 'role-plain';
}

function _buildS1Pool(){
  _s1Pool = [];
  AMMO_DATA.forEach(a => {
    if(a.fire_daily){
      a.fire_daily.forEach(fd => {
        if(fd.chunks && fd.chunks.length > 1) _s1Pool.push(fd);
      });
    }
  });
  _s1Order = _s1Pool.map((_,i)=>i);
  for(let i=_s1Order.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [_s1Order[i],_s1Order[j]]=[_s1Order[j],_s1Order[i]];
  }
  _s1Idx = 0;
  _s1Done = [];
}

function startStage1(){
  if(!_s1Pool.length || _s1Idx >= _s1Pool.length) _buildS1Pool();
  _renderS1();
}

function _renderS1(){
  const resultEl = document.getElementById('stage1Result');
  resultEl.style.display = 'none';

  const fire = _s1Pool[_s1Order[_s1Idx % _s1Order.length]];
  if(!fire){ document.getElementById('stage1Target').textContent = '（所有句子練習完畢！再按一次重新開始）'; return; }

  document.getElementById('stage1Target').textContent = '👆 點語塊，還原原句順序';

  // shuffle chunks
  // 過濾掉全形括號中文主詞提示（如「（我）」「（你們）」）
  const visibleChunks = fire.chunks.filter(c => !/^（.*）$/.test(c.w.trim()));
  const shuffled = [...visibleChunks];
  for(let i=shuffled.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }

  const area = document.getElementById('stage1Chunks');
  area.innerHTML = '';
  area.dataset.answer = fire.es;
  area.dataset.order = '[]';

  const built = [];

  shuffled.forEach((c,i)=>{
    const pill = document.createElement('span');
    pill.className = 'stage-chunk-pill '+_stageChunkClass(c.role);
    if(c.role==='v'){ pill.innerHTML = renderVWords(c.w); } else { pill.textContent = c.w; }
    pill.dataset.idx = i;
    pill.dataset.w = c.w;
    pill.onclick = () => _s1Pick(pill, c, built, visibleChunks, fire, area);
    area.appendChild(pill);
  });

  _s1Idx++;
}

function _s1Pick(pill, c, built, visibleChunks, fire, area){
  speakWord(c.w, pill);
  if(pill.classList.contains('used')) return;
  pill.classList.add('used');
  pill.style.opacity = '0.35';
  built.push(c.w);

  const target = document.getElementById('stage1Target');
  target.textContent = built.join(' ');

  if(built.length === visibleChunks.length){
    const result = document.getElementById('stage1Result');
    const built_str = built.join(' ');
    const correct_str = visibleChunks.map(x=>x.w).join(' ');
    const ok = built_str === correct_str;
    result.className = 'stage-result '+(ok?'ok':'err');
    result.textContent = ok ? '✅ 正確！'+fire.zh : '❌ 原句：'+correct_str+' ／ '+fire.zh;
    result.style.display = 'block';
    if(ok) speakSentence(fire.es);
  }
}

// ── Stage 2: 你我互換 render ──
function renderStage2(){
  const el = document.getElementById('stage2Cards');
  if(!el) return;
  const header = `<div class="stage2-pair" style="margin-bottom:2px">
    <div style="flex:1;font-size:9px;font-weight:800;letter-spacing:.8px;color:var(--misora);text-align:center;padding:2px 0;text-transform:uppercase">YO</div>
    <div style="flex:1;font-size:9px;font-weight:800;letter-spacing:.8px;color:var(--ok);text-align:center;padding:2px 0;text-transform:uppercase">TÚ</div>
  </div>`;
  el.innerHTML = header + TU_YO_PAIRS.map((p,i)=>`
    <div class="stage2-pair">
      <div class="stage2-card yo" onclick="speakSentence('${escStage(p.yo)}')">${p.yo}</div>
      <div class="stage2-card tu" onclick="speakSentence('${escStage(p.tu)}')">${p.tu}</div>
    </div>
    <div style="font-size:10px;color:var(--tlight);font-weight:600;text-align:center;margin:-4px 0 4px">${p.zh}</div>
  `).join('');
}

// ── Stage 3: 造句核心 ──
let _s3Core = null;
let _s3Verb = null;

function renderStage3(){
  const el = document.getElementById('stage3Area');
  if(!el) return;
  el.innerHTML = `
    <div>
      <div class="stage3-label">選核心主幹</div>
      <div class="stage3-row" id="s3CoreRow">
        ${STAGE_CORES.map((c,i)=>`<span class="stage3-chip" onclick="s3PickCore(${i})" id="s3c${i}">${c.zh}</span>`).join('')}
      </div>
    </div>
    <div>
      <div class="stage3-label">選補語</div>
      <div class="stage3-row" id="s3VerbRow">
        ${STAGE_VERBS.map((v,i)=>`<span class="stage3-chip" onclick="s3PickVerb(${i})" id="s3v${i}">${v.zh}</span>`).join('')}
      </div>
    </div>
    <div class="stage3-output" id="s3Output" onclick="s3Speak()">（點上方選項，這裡顯示造句）</div>
  `;
}

function s3PickCore(i){
  _s3Core = STAGE_CORES[i];
  document.querySelectorAll('#s3CoreRow .stage3-chip').forEach((el,j)=>{
    el.classList.toggle('selected', j===i);
  });
  _s3UpdateOutput();
}

function s3PickVerb(i){
  _s3Verb = STAGE_VERBS[i];
  document.querySelectorAll('#s3VerbRow .stage3-chip').forEach((el,j)=>{
    el.classList.toggle('selected', j===i);
  });
  _s3UpdateOutput();
}

function _s3UpdateOutput(){
  const el = document.getElementById('s3Output');
  if(!el) return;
  if(_s3Core && _s3Verb){
    el.textContent = _s3Core.es+' '+_s3Verb.es+'.';
  } else if(_s3Core){
    el.textContent = _s3Core.es+' ___';
  } else {
    el.textContent = '（點上方選項，這裡顯示造句）';
  }
}

function s3Speak(){
  const el = document.getElementById('s3Output');
  if(el && _s3Core && _s3Verb) speakSentence(el.textContent);
}

function escStage(s){ return String(s).replace(/'/g,"\\'"); }

// ── Toggle ──
function toggleStages(){
  const body = document.getElementById('stagesBody');
  const tog = document.getElementById('stagesToggle');
  if(!body) return;
  const open = body.classList.toggle('open');
  tog.textContent = open ? '▲ 收起' : '▼ 展開';
  if(open){
    renderStage2();
    renderStage3();
  }
}

function jumpToStages(){
  const body = document.getElementById('stagesBody');
  const tog = document.getElementById('stagesToggle');
  const wrap = document.querySelector('.stages-wrap');
  if(!body) return;
  body.classList.add('open');
  tog.textContent = '▲ 收起';
  renderStage2();
  renderStage3();
  setTimeout(()=>{
    if(wrap){
      wrap.scrollIntoView({behavior:'smooth',block:'start'});
      wrap.classList.add('ammo-flash');
      setTimeout(()=>wrap.classList.remove('ammo-flash'),1200);
    }
  },80);
}
