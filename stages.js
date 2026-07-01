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

// ── Stage 3: 造句核心（重設計版）──
const S3_CORES = [
  {es:"Soy",           zh:"我是"},
  {es:"Eres",          zh:"你是"},
  {es:"Estoy",         zh:"我正在"},
  {es:"Puedo",         zh:"我可以"},
  {es:"Debo",          zh:"我必須"},
  {es:"Me encanta",    zh:"我超愛"},
  {es:"He encontrado", zh:"我找到了"}
];
const S3_COMPS = [
  {es:"estudiante",               zh:"學生"},
  {es:"amigo",                    zh:"朋友"},
  {es:"detective",                zh:"偵探"},
  {es:"médico",                   zh:"醫生"},
  {es:"saltar en charcos de barro", zh:"跳水坑"},
  {es:"salir a jugar",            zh:"出去玩"},
  {es:"ver la televisión",        zh:"看電視"},
  {es:"lavarme las manos",        zh:"洗手"}
];

let _s3CoreEs='', _s3CoreZh='', _s3CompEs='', _s3CompZh='';

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
    pill.textContent = c.w;
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
  el.innerHTML = TU_YO_PAIRS.map((p,i)=>`
    <div class="stage2-pair">
      <div class="stage2-card yo" onclick="speakSentence('${escStage(p.yo)}')">
        ${p.yo}
      </div>
      <div class="stage2-card tu" onclick="speakSentence('${escStage(p.tu)}')">
        ${p.tu}
      </div>
    </div>
    <div style="font-size:10px;color:var(--tlight);font-weight:600;text-align:center;margin:-4px 0 4px">${p.zh}</div>
  `).join('');
}

// ── Stage 3: 造句核心 render ──
function renderStage3(){
  const el = document.getElementById('stage3Area');
  if(!el) return;
  el.innerHTML = `
    <div class="stage3-container">
      <div class="sentence-output-box">
        <div class="output-label">🎬 你的造句結果</div>
        <div class="combined-sentence" id="s3CombinedText">請選擇下方的核心與補語…</div>
        <button class="speak-btn" id="s3SpeakBtn" onclick="s3SpeakCurrent()" disabled>🔊 點輸出聽整句</button>
      </div>
      <div class="puzzle-columns-grid">
        <div class="puzzle-column">
          <h3>🎯 選核心主幹</h3>
          <div class="chip-pool">
            ${S3_CORES.map(c=>`<button class="core-chip" data-es="${escStage(c.es)}" data-zh="${c.zh}" onclick="s3SelectCore(this)">${c.zh} (${c.es})</button>`).join('')}
          </div>
        </div>
        <div class="puzzle-column">
          <h3>🧩 選補語</h3>
          <div class="chip-pool">
            ${S3_COMPS.map(c=>`<button class="comp-chip" data-es="${escStage(c.es)}" data-zh="${c.zh}" onclick="s3SelectComp(this)">${c.zh}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  _s3CoreEs=''; _s3CoreZh=''; _s3CompEs=''; _s3CompZh='';
}

function s3SelectCore(el){
  document.querySelectorAll('.core-chip').forEach(c=>c.classList.remove('is-selected'));
  el.classList.add('is-selected');
  _s3CoreEs=el.dataset.es; _s3CoreZh=el.dataset.zh;
  _s3UpdateOutput3();
}

function s3SelectComp(el){
  document.querySelectorAll('.comp-chip').forEach(c=>c.classList.remove('is-selected'));
  el.classList.add('is-selected');
  _s3CompEs=el.dataset.es; _s3CompZh=el.dataset.zh;
  _s3UpdateOutput3();
}

function _s3UpdateOutput3(){
  const out=document.getElementById('s3CombinedText');
  const btn=document.getElementById('s3SpeakBtn');
  if(!out) return;
  if(_s3CoreEs && _s3CompEs){
    const full=`${_s3CoreEs} ${_s3CompEs}.`;
    out.innerHTML=`<div>${full}</div><div style="font-size:13px;color:var(--ok);font-weight:600;margin-top:4px;">意即：${_s3CoreZh}${_s3CompZh}</div>`;
    if(btn) btn.disabled=false;
  } else if(_s3CoreEs){
    out.textContent=`${_s3CoreEs} …`;
    if(btn) btn.disabled=true;
  } else if(_s3CompEs){
    out.textContent=`… ${_s3CompEs}`;
    if(btn) btn.disabled=true;
  }
}

function s3SpeakCurrent(){
  if(!_s3CoreEs||!_s3CompEs) return;
  speakFull(`${_s3CoreEs} ${_s3CompEs}.`);
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
