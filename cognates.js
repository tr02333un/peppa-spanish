/* ── YouGlish keywords + 英西同源槓桿資料 ── */
// ── 精準 YouGlish 語塊關鍵字（避免整句搜不到）──
const SENTENCE_YG_KW = {
  'e0_s0':'Yo soy',            'e0_s1':'Este es mi hermano',
  'e0_s2':'está lloviendo',    'e0_s3':'Podemos salir a jugar',
  'e0_s4':'debes ponerte',     'e0_s5':'Me encanta saltar',
  'e0_s6':'ha encontrado',     'e0_s7':'sí que es grande',
  'e0_s8':'No pasa nada',      'e0_s9':'A todos les encanta',
  'e1_s0':'juguete favorito',  'e1_s1':'se va a la cama',
  'e1_s2':'ha perdido',        'e1_s3':'No te preocupes',
  'e1_s4':'Un detective',      'e1_s5':'siempre se trae',
  'e1_s6':'Ya lo sé',          'e1_s7':'no está en la cama',
  'e1_s8':'están jugando',     'e1_s9':'habéis estado saltando',
  'e2_s0':'está esperando',    'e2_s1':'quiere mucho',
  'e2_s2':'Son las mejores amigas', 'e2_s3':'solo para niñas',
  'e2_s4':'Soy una princesa',  'e2_s5':'no le gusta jugar solo',
  'e2_s6':'seré la doctora',   'e2_s7':'respira hondo',
  'e2_s8':'Creo que tienes',   'e2_s9':'necesitan muchas galletas',
};

// ── 每句英西同源槓桿資料 ──
const SENTENCE_COGNATES = {
  'e0_s0':{
    title:'🧠 Yo soy 字面解密',
    rows:[
      '👉 <b>Yo soy</b> = 一整塊固定外殼，後面直接插入名字或身份，超省力！',
      '💡 省略 Yo 直接說 <i>Soy Peppa.</i> 完全合法，西語主詞常省略！',
    ]
  },
  'e0_s1':{
    title:'🔵 Ser vs 🟠 Estar — 第一個 Boss',
    rows:[
      '👉 介紹「身分/本質」永遠用 <b>Ser</b>：<i>Este es mi hermano.</i>',
      '💡 <b>hermano</b>（兄弟）：ger-MAAN-o，英文 germane（同族）同根！',
      '⚠️ 記住：Este（陽性）Esta（陰性），跟著後面名詞性別走',
    ]
  },
  'e0_s2':{
    title:'🌧️ está lloviendo — 現在進行式解鎖',
    rows:[
      '👉 <b>estar + -ando/-iendo</b> = 正在做（暫時狀態）',
      '💡 <b>llover</b>（下雨）→ 英文 rain，但西語用 <b>lloviendo</b> 念起來像「喲ˋ彼ˊ安ˋ都」！',
      '🎯 <b>puede / pueden</b> ← 英文 <b>potent</b>（有力的）同源！',
    ]
  },
  'e0_s3':{
    title:'❓ ¿Podemos…? — 我們可以嗎',
    rows:[
      '👉 <b>¿Podemos + 原形動詞?</b> = 我們可以 ___？（poder 第一人稱複數）',
      '💡 <b>poder</b> ← 英文 <b>power</b>，有能力！',
      '🎯 <b>jugar</b>（玩）← 英文 juggle 同根，字面是「耍把戲」！',
    ]
  },
  'e0_s4':{
    title:'👢 debes ponerte — 你必須穿上',
    rows:[
      '👉 <b>debes + 原形動詞</b> = 你必須做 ___（deber = duty 義務！）',
      '💡 英文 <b>duty / debe</b> 同根！看到 debes 秒想到 duty！',
      '🎯 <b>botas</b>（靴子）← 英文 <b>boots</b>，發音相似，秒記！',
    ]
  },
  'e0_s5':{
    title:'💥 Me encanta — 強力喜歡炸彈',
    rows:[
      '👉 <b>Me encanta</b> 比 me gusta 強 10 倍，翻譯成「我超愛、我迷死了」',
      '💡 <b>encanta</b> ← 英文 <b>enchant</b>（著迷/施魔法）雙胞胎！',
      '🎯 <b>charcos</b>（水坑）← charcoal（木炭）同字源 char，黑色的坑！',
    ]
  },
  'e0_s6':{
    title:'🔍 ha encontrado — 現在完成式',
    rows:[
      '👉 <b>ha + 過去分詞</b> = 已經 ___（剛剛完成）',
      '💡 <b>encontrado</b> ← 英文 <b>encounter</b>（遭遇/發現）同源！',
      '🎯 字根 <b>contra</b>（相對/遇見）← counter 也是同源！',
    ]
  },
  'e0_s7':{
    title:'✨ sí que es — 強調語氣小炸彈',
    rows:[
      '👉 <b>sí que</b> = 真的是、確實是（加強語氣，超口語）',
      '💡 <b>grande</b> ← 英文 <b>grand</b>（宏大）！同一個字！',
      '🎯 注意：<b>sí</b>（有帽子）= yes；<b>si</b>（沒帽子）= if',
    ]
  },
  'e0_s8':{
    title:'😌 No pasa nada — 西語最強安慰語',
    rows:[
      '👉 字面：「沒有任何事情在發生」= 沒關係、不要緊、算了啦',
      '💡 <b>pasa</b> ← 英文 <b>pass</b>（通過/發生）同源！',
      '🎯 <b>barro</b>（泥巴）← barren（貧瘠/泥土）同字源概念！',
    ]
  },
  'e0_s9':{
    title:'🐷 A todos les encanta — 所有人都愛',
    rows:[
      '👉 <b>A todos les encanta</b> = 所有人都超愛（第三人稱複數，les 取代 me）',
      '💡 句型升級：me encanta → te encanta → le encanta → les encanta',
      '🎯 <b>todos</b> ← 英文 <b>total</b>（全部）同字根！',
    ]
  },
  'e1_s0':{
    title:'🦕 juguete favorito — 最愛玩具',
    rows:[
      '👉 <b>El juguete favorito de George</b> = 喬治最喜歡的玩具（所有格用 de）',
      '💡 <b>favorito</b> ← 英文 <b>favorite</b>！字母幾乎一樣！',
      '🎯 形容詞放在名詞後面：juguete <b>favorito</b>，不像英文放前面',
    ]
  },
  'e1_s1':{
    title:'🛏️ se va a la cama — 反身動詞床上見',
    rows:[
      '👉 <b>se va a la cama</b> = 去睡覺（直譯：自己去到床上）',
      '💡 <b>acurruca</b>（蜷縮）← curl up！概念完全一樣！',
      '🎯 <b>a su lado</b> = beside him/her，lado ← English lateral（側面）！',
    ]
  },
  'e1_s2':{
    title:'😱 ha perdido — 弄丟了',
    rows:[
      '👉 <b>ha perdido</b> = 已經弄丟了（現在完成式）',
      '💡 <b>perdido</b> ← 英文 <b>perdition</b>（失落/消失）同源！',
      '🎯 記憶鉤：「per-DEED-o」= 已經做了壞事（丟掉東西）！',
    ]
  },
  'e1_s3':{
    title:'🤗 No te preocupes — 別擔心',
    rows:[
      '👉 <b>No te preocupes</b> = 別擔心（反身動詞命令式）',
      '💡 <b>preocupar</b> ← 英文 <b>preoccupy</b>（讓你心裡先佔據了）！',
      '🎯 <b>encontraremos</b> ← encounter + future，我們將會找到！',
    ]
  },
  'e1_s4':{
    title:'🔍 Un detective — 你已經會了！',
    rows:[
      '👉 <b>detective</b> 西英完全一樣！這叫「零學習成本同源詞」！',
      '💡 <b>persona</b> ← 英文 <b>person</b>，字面就是「戴面具的人」！',
      '🎯 <b>muy buena encontrando</b> = very good at finding，結構也一樣！',
    ]
  },
  'e1_s5':{
    title:'🛁 siempre — 頻率副詞最省力',
    rows:[
      '👉 <b>siempre</b> = always，放動詞前！',
      '💡 記憶鉤：「siempre」發音像「先ˋ破ˋ」→ 先一步、永遠！',
      '🎯 <b>bañera</b>（浴缸）← bath 概念，帶波浪符的 ñ 是西語招牌！',
    ]
  },
  'e1_s6':{
    title:'💡 Ya lo sé — 我知道了！',
    rows:[
      '👉 <b>Ya lo sé</b> = I already know it！ya 表示「已然發生/就是現在」',
      '💡 <b>ya</b> 超萬用：ya voy（我來了）/ ya está（好了/完成了）',
      '🎯 <b>dónde</b>（哪裡）← where，d 對應 wh，西語發音「東ˋ得」！',
    ]
  },
  'e1_s7':{
    title:'📍 estar 位置用法 — no está en',
    rows:[
      '👉 <b>no está</b> = is not there，estar 專門管位置和暫時狀態！',
      '💡 口訣：<b>SER = 本質身分</b>；<b>ESTAR = 位置狀態</b>',
      '🎯 <b>cama</b>（床）← 英文 chamber（房間/床室）同字根！',
    ]
  },
  'e1_s8':{
    title:'🎮 están jugando — 進行式複數',
    rows:[
      '👉 <b>están jugando</b> = they are playing（estar + -ando）',
      '💡 <b>damas</b>（跳棋/西洋棋）← dame（女士們），棋子叫「女士」！',
      '🎯 <b>papá</b> = dad，帽子要加！papa（沒帽子）= 馬鈴薯！',
    ]
  },
  'e1_s9':{
    title:'🚀 habéis estado saltando — 完成進行式',
    rows:[
      '👉 <b>habéis estado + -ando</b> = you have been doing（完成進行式）',
      '💡 英文 have been jumping = habéis estado saltando，結構完全平行！',
      '🎯 這是西語最複雜時態之一，你用佩佩豬就學會了！',
    ]
  },
  'e2_s0':{
    title:'⏳ está esperando — 進行式等待',
    rows:[
      '👉 <b>está esperando</b> = is waiting（現在進行式）',
      '💡 <b>esperar</b> ← 英文 <b>hope / expect</b>（期待等待）同概念！',
      '🎯 <b>mejor amiga</b> = best friend（female），mejor ← major/mayor！',
    ]
  },
  'e2_s1':{
    title:'❤️ quiere mucho — 喜愛句型',
    rows:[
      '👉 <b>querer a alguien</b> = to love someone，人名前必加 a！',
      '💡 <b>querer</b> ← 英文 query（尋求）同字根，愛 = 尋求某人！',
      '🎯 <b>mucho</b> ← 英文 much！西英同源！',
    ]
  },
  'e2_s2':{
    title:'🏆 mejores amigas — 最高級',
    rows:[
      '👉 <b>las mejores amigas</b> = the best friends（female plural）',
      '💡 <b>mejor</b> ← 英文 <b>ameliorate</b>（改善），同字根 meli/mejor！',
      '🎯 複數變化：mejor → mejores（加 es），amica → amigas（加 s）',
    ]
  },
  'e2_s3':{
    title:'🚫 solo para — 限定句型',
    rows:[
      '👉 <b>solo para + 名詞</b> = only for ___',
      '💡 <b>niñas mayores</b> = older girls，mayor ← major（較大的）！',
      '🎯 <b>juego</b>（遊戲）← 英文 juggle → game，同字根！',
    ]
  },
  'e2_s4':{
    title:'👸 princesa — 你已會這個字！',
    rows:[
      '👉 <b>princesa</b> ← 英文 <b>princess</b>！零學習成本！',
      '💡 <b>salida de un cuento</b> = come out of a story，cuento ← recount（講故事）！',
      '🎯 <b>cuento</b> ← 英文 <b>account / recount</b> 同字根！',
    ]
  },
  'e2_s5':{
    title:'🎯 A + 人 + le gusta — 必學句型',
    rows:[
      '👉 <b>A George no le gusta jugar solo.</b> = George doesn\'t like playing alone.',
      '💡 <b>gustar</b> ← 英文 <b>gusto</b>（品味/享受）！',
      '🎯 口訣：主語不是「我/你」，是「事物」施魔法給「人」！',
    ]
  },
  'e2_s6':{
    title:'🔮 seré / serás — ser 未來式',
    rows:[
      '👉 <b>seré</b>（我將是）/ <b>serás</b>（你將是）= ser 動詞未來式',
      '💡 <b>doctora</b> ← 英文 <b>doctor</b>！加 -a 變女性！',
      '🎯 <b>enfermera</b>（護士）← 英文 infirmary（醫務室）同字根！',
    ]
  },
  'e2_s7':{
    title:'💨 respira hondo — 命令式發音',
    rows:[
      '👉 命令式（你做某事）直接用動詞現在式第二人稱：<b>respira！</b>',
      '💡 <b>respira</b> ← 英文 <b>respire / respiratory</b>（呼吸系統）！',
      '🎯 <b>hondo</b>（深）← 英文 profound（深刻）的 fond 部分！',
    ]
  },
  'e2_s8':{
    title:'💭 Creo que — 我認為',
    rows:[
      '👉 <b>Creo que</b> = I think that...（後接完整子句）',
      '💡 <b>creo</b> ← 英文 <b>creed / credible</b>（相信）同字根！',
      '🎯 <b>corazón</b>（心臟）← 英文 <b>core</b>（核心）同字根！心臟 = 核心！',
    ]
  },
  'e2_s9':{
    title:'🍪 galletas — 餅乾治百病',
    rows:[
      '👉 <b>para curarse</b> = in order to get better（para + 原形）',
      '💡 <b>galletas</b>（餅乾）← waffle / wafer 類似概念，g/w 音轉！',
      '🎯 <b>curarse</b> ← 英文 <b>cure</b>！用餅乾 cure 你自己，佩佩醫生認可！',
    ]
  },
};

// ── 英西同源詞庫總覽（從 SENTENCE_COGNATES 整理出的扁平清單，供 #cogLibraryBody 瀏覽搜尋）──
const COGNATE_LIBRARY = [
  // E1 · 泥巴坑
  {en:'germane',   es:'hermano',   art:'el',  zh:'兄弟',       ep:'E1 · 泥巴坑'},
  {en:'potent',    es:'poder',     art:'',    zh:'能夠／有力的', ep:'E1 · 泥巴坑'},
  {en:'juggle',    es:'jugar',     art:'',    zh:'玩',         ep:'E1 · 泥巴坑'},
  {en:'boots',     es:'botas',     art:'las', zh:'靴子',       ep:'E1 · 泥巴坑'},
  {en:'duty',      es:'deber',     art:'',    zh:'必須／義務',  ep:'E1 · 泥巴坑'},
  {en:'charcoal',  es:'charco',    art:'el',  zh:'水坑',       ep:'E1 · 泥巴坑'},
  {en:'enchant',   es:'encantar',  art:'',    zh:'使著迷／超愛', ep:'E1 · 泥巴坑'},
  {en:'counter',   es:'contra',    art:'',    zh:'相對／遇見',  ep:'E1 · 泥巴坑'},
  {en:'encounter', es:'encontrar', art:'',    zh:'找到／遭遇',  ep:'E1 · 泥巴坑'},
  {en:'grand',     es:'grande',    art:'',    zh:'宏大／大的',  ep:'E1 · 泥巴坑'},
  {en:'barren',    es:'barro',     art:'el',  zh:'泥巴',       ep:'E1 · 泥巴坑'},
  {en:'pass',      es:'pasar',     art:'',    zh:'通過／發生',  ep:'E1 · 泥巴坑'},
  {en:'total',     es:'todos',     art:'',    zh:'全部／所有人', ep:'E1 · 泥巴坑'},
  // E2 · 恐龍先生不見了
  {en:'favorite',   es:'favorito',  art:'',    zh:'最喜歡的',   ep:'E2 · 恐龍先生不見了'},
  {en:'lateral',    es:'lado',      art:'el',  zh:'側面',       ep:'E2 · 恐龍先生不見了'},
  {en:'perdition',  es:'perdido',   art:'',    zh:'失落／弄丟了', ep:'E2 · 恐龍先生不見了'},
  {en:'preoccupy',  es:'preocupar', art:'',    zh:'擔心',       ep:'E2 · 恐龍先生不見了'},
  {en:'detective',  es:'detective', art:'el',  zh:'偵探',       ep:'E2 · 恐龍先生不見了'},
  {en:'person',     es:'persona',   art:'la',  zh:'人',         ep:'E2 · 恐龍先生不見了'},
  {en:'bath',       es:'bañera',    art:'la',  zh:'浴缸',       ep:'E2 · 恐龍先生不見了'},
  {en:'where',      es:'dónde',     art:'',    zh:'哪裡',       ep:'E2 · 恐龍先生不見了'},
  {en:'chamber',    es:'cama',      art:'la',  zh:'床／房間',    ep:'E2 · 恐龍先生不見了'},
  {en:'dad',        es:'papá',      art:'el',  zh:'爸爸',       ep:'E2 · 恐龍先生不見了'},
  // E3 · 最好的朋友
  {en:'expect',    es:'esperar',   art:'',    zh:'期待／等待',      ep:'E3 · 最好的朋友'},
  {en:'major',     es:'mejor',     art:'',    zh:'較好的／最好的',   ep:'E3 · 最好的朋友'},
  {en:'much',      es:'mucho',     art:'',    zh:'很多',            ep:'E3 · 最好的朋友'},
  {en:'query',     es:'querer',    art:'',    zh:'尋求／喜歡',      ep:'E3 · 最好的朋友'},
  {en:'game',      es:'juego',     art:'el',  zh:'遊戲',            ep:'E3 · 最好的朋友'},
  {en:'princess',  es:'princesa',  art:'la',  zh:'公主',            ep:'E3 · 最好的朋友'},
  {en:'account',   es:'cuento',    art:'el',  zh:'故事',            ep:'E3 · 最好的朋友'},
  {en:'gusto',     es:'gustar',    art:'',    zh:'品味／享受／喜歡', ep:'E3 · 最好的朋友'},
  {en:'doctor',    es:'doctora',   art:'la',  zh:'醫生',            ep:'E3 · 最好的朋友'},
  {en:'infirmary', es:'enfermera', art:'la',  zh:'醫務室／護士',    ep:'E3 · 最好的朋友'},
  {en:'respire',   es:'respirar',  art:'',    zh:'呼吸',            ep:'E3 · 最好的朋友'},
  {en:'profound',  es:'hondo',     art:'',    zh:'深刻／深的',      ep:'E3 · 最好的朋友'},
  {en:'credible',  es:'creer',     art:'',    zh:'相信',            ep:'E3 · 最好的朋友'},
  {en:'core',      es:'corazón',   art:'el',  zh:'核心／心臟',      ep:'E3 · 最好的朋友'},
  {en:'cure',      es:'curar',     art:'',    zh:'治療／康復',      ep:'E3 · 最好的朋友'},
];

// ── 詞綴規律資料（-tion→-ción 等三組） ──
const SUFFIX_PATTERNS = [
  {
    rule: '-tion → -ción',
    hint: '英文 -tion 結尾幾乎全都適用，直接套用就對了！',
    words: [
      {en:'nation',      es:'nación',       zh:'國家'},
      {en:'action',      es:'acción',       zh:'行動'},
      {en:'emotion',     es:'emoción',      zh:'情緒'},
      {en:'information', es:'información',  zh:'資訊'},
      {en:'education',   es:'educación',    zh:'教育'},
      {en:'situation',   es:'situación',    zh:'情況'},
    ]
  },
  {
    rule: '-ty → -dad',
    hint: '英文 -ty 抽象名詞 → 西語 -dad（全部陰性，記得加 la）',
    words: [
      {en:'city',        es:'ciudad',       zh:'城市'},
      {en:'reality',     es:'realidad',     zh:'現實'},
      {en:'quality',     es:'calidad',      zh:'品質'},
      {en:'university',  es:'universidad',  zh:'大學'},
      {en:'society',     es:'sociedad',     zh:'社會'},
      {en:'liberty',     es:'libertad',     zh:'自由'},
    ]
  },
  {
    rule: '-ce / -cy → -cia / -ncia',
    hint: '英文 -ce/-cy 結尾 → 西語 -cia/-ncia（全部陰性，記得加 la）',
    words: [
      {en:'patience',    es:'paciencia',    zh:'耐心'},
      {en:'experience',  es:'experiencia',  zh:'經驗'},
      {en:'distance',    es:'distancia',    zh:'距離'},
      {en:'importance',  es:'importancia',  zh:'重要性'},
      {en:'difference',  es:'diferencia',   zh:'差異'},
    ]
  },
];

// ── 建立 cognate details HTML ──
function buildCogDetails(data){
  const rowsHtml = data.rows.map(r=>`<div class="cog-detail-row">${r}</div>`).join('');
  return `<details class="cog-details">
    <summary>
      <span>✨ ${data.title}</span>
      <span class="cog-unlock-badge">💡 點擊解鎖秘密</span>
    </summary>
    <div class="cog-body">
      ${rowsHtml}
    </div>
  </details>`;
}

// ── YouGlish Panel ──
function openYGPanel(keyword){ window.open('https://youglish.com/pronounce/'+encodeURIComponent(keyword)+'/spanish','_blank','noopener'); }
function closeYG(){}
