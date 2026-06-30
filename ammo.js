/* ── 語塊彈藥庫 AMMO data ── */
// ── 語塊彈藥庫 AMMO LIBRARY ──
const AMMO_DATA = [
  // ── E1 泥巴坑 ──
  {
    ammo_id:'e1_01', ep:'E1',
    core_ammo:'Yo soy ___',
    core_zh:'我是 ___',
    be_verb_type:'ser',
    be_verb_note:'介紹「身分/名字」是永久本質，用 Ser',
    pattern:'Yo [Ser: 本質/身分/特徵] [名字/身份].',
    pattern_zh:'我是 ___。',
    pattern_note:'ser 動詞第一人稱；介紹自己最基本的句型',
    slots:['名字/身份'],
    fire_peppa:{ es:'Yo soy Peppa Pig.', zh:'我是佩佩豬。' },
    fire_daily:[
      { es:'Yo soy la mamá de cuatro niños.', zh:'我是四個孩子的媽媽。' },
      { es:'Yo soy tu profesora de español.', zh:'我是你的西語老師。' },
    ]
  },
  {
    ammo_id:'e1_02', ep:'E1',
    core_ammo:'Este/Esta es mi ___',
    core_zh:'這是我的 ___',
    be_verb_type:'ser',
    be_verb_note:'「這是我的某人」描述身分關係，用 Ser',
    pattern:'Este/Esta [Ser: 本質/身分/特徵] mi [關係] [大小] [名字].',
    pattern_zh:'這是我的 [關係] [大小] [名字]。',
    pattern_note:'Este=陽性 Esta=陰性，跟著後面名詞性別走',
    slots:['關係','大小（可省）','名字（可省）'],
    fire_peppa:{ es:'Este es mi hermano pequeño George.', zh:'這是我的小弟弟喬治。' },
    fire_daily:[
      { es:'Esta es mi hija mayor Luna.', zh:'這是我的大女兒露娜。' },
      { es:'Este es mi mejor amigo.', zh:'這是我最好的朋友。' },
    ]
  },
  {
    ammo_id:'e1_estar', ep:'E1',
    core_ammo:'está sucia/o',
    core_zh:'（她/他）髒了',
    be_verb_type:'estar',
    be_verb_note:'玩泥巴造成的「暫時狀態」，洗乾淨就沒了，用 Estar',
    pattern:'[某人/某物] [Estar: 狀態/位置/感受] sucia/o.',
    pattern_zh:'某人現在呈現 ___ 的（暫時）狀態。',
    pattern_note:'形容詞依性別調整：sucia（陰）/ sucio（陽）',
    slots:['某人/某物'],
    fire_peppa:{ es:'Peppa está sucia.', zh:'佩佩髒了。' },
    fire_daily:[
      { es:'Mi ropa está sucia.', zh:'我的衣服現在髒了。' },
      { es:'Las manos del niño están sucias.', zh:'孩子的手髒了。' },
    ]
  },
  {
    ammo_id:'e1_ser_adj', ep:'E1',
    core_ammo:'es grande',
    core_zh:'（它）很大',
    be_verb_type:'ser',
    be_verb_note:'描述水坑的固有特徵「大」，是本質屬性，用 Ser',
    pattern:'[某人/某物] [Ser: 本質/身分/特徵] [形容詞].',
    pattern_zh:'某人/某物（本質上）是 ___ 的。',
    pattern_note:'特徵/個性/形狀等穩定屬性都用 ser + 形容詞',
    slots:['某人/某物','形容詞'],
    fire_peppa:{ es:'El charco es grande.', zh:'水坑很大。' },
    fire_daily:[
      { es:'Mi hermana es muy simpática.', zh:'我妹妹個性很好。' },
      { es:'La ciudad es enorme.', zh:'這座城市很大。' },
    ]
  },
  {
    ammo_id:'e1_03', ep:'E1',
    core_ammo:'me encanta ___',
    core_zh:'我超愛 ___',
    be_verb_type:'none',
    be_verb_note:'',
    pattern:'Me encanta [動詞原形 / 名詞].',
    pattern_zh:'我超愛 ___。',
    pattern_note:'encantar 比 gustar 強烈；主語是「事物」不是「我」',
    slots:['動詞原形 或 名詞'],
    fire_peppa:{ es:'¡Me encanta saltar en los charcos!', zh:'我超愛在水坑裡跳！' },
    fire_daily:[
      { es:'Me encanta el café por la mañana.', zh:'我超愛早上的咖啡。' },
      { es:'A mi hija le encanta cantar.', zh:'我女兒超愛唱歌。' },
    ]
  },
  {
    ammo_id:'e1_04', ep:'E1',
    core_ammo:'hay que ___',
    core_zh:'（大家）必須 ___',
    be_verb_type:'none',
    be_verb_note:'',
    pattern:'Hay que [動詞原形].',
    pattern_zh:'必須 ___。',
    pattern_note:'無主詞，表「任何人都必須」，口語超高頻',
    slots:['動詞原形'],
    fire_peppa:{ es:'¡Hay que ponerse las botas!', zh:'一定要穿靴子！' },
    fire_daily:[
      { es:'Hay que comer verduras todos los días.', zh:'每天都要吃蔬菜。' },
      { es:'Hay que dormir ocho horas.', zh:'要睡八個小時。' },
    ]
  },
  {
    ammo_id:'e1_05', ep:'E1',
    core_ammo:'no pasa nada',
    core_zh:'沒關係 / 不要緊',
    be_verb_type:'ser',
    be_verb_note:'「Sólo es barro」描述泥巴的本質特徵，用 Ser',
    pattern:'No pasa nada. Solo [Ser: 本質/身分/特徵] [名詞].',
    pattern_zh:'沒關係，只是 ___ 而已。',
    pattern_note:'西語最萬用安慰句，單獨一句就夠',
    slots:['名詞（可省略後半句）'],
    fire_peppa:{ es:'No pasa nada. Sólo es barro.', zh:'沒關係，只是泥巴而已。' },
    fire_daily:[
      { es:'No pasa nada, lo hacemos mañana.', zh:'沒關係，我們明天再做。' },
      { es:'No pasa nada, eres muy valiente.', zh:'沒關係，你很勇敢的。' },
    ]
  },
  // ── E2 恐龍先生不見了 ──
  {
    ammo_id:'e2_01', ep:'E2',
    core_ammo:'ha perdido a ___',
    core_zh:'把 ___ 弄丟了',
    be_verb_type:'none',
    be_verb_note:'',
    pattern:'[人] ha perdido [東西 / a 人].',
    pattern_zh:'___ 把 ___ 弄丟了。',
    pattern_note:'現在完成式；弄丟的是人要加 a',
    slots:['主詞','東西或 a + 人名'],
    fire_peppa:{ es:'George ha perdido al señor Dinosaurio.', zh:'喬治把恐龍先生弄丟了。' },
    fire_daily:[
      { es:'He perdido las llaves otra vez.', zh:'我又把鑰匙弄丟了。' },
      { es:'El niño ha perdido su mochila.', zh:'那個孩子把書包弄丟了。' },
    ]
  },
  {
    ammo_id:'e2_02', ep:'E2',
    core_ammo:'no te preocupes',
    core_zh:'不要擔心',
    be_verb_type:'none',
    be_verb_note:'',
    pattern:'No te preocupes, [鼓勵的話].',
    pattern_zh:'不要擔心，___。',
    pattern_note:'反身命令句；比 no se preocupe 更口語親近',
    slots:['安慰/承諾的話'],
    fire_peppa:{ es:'No te preocupes George, entre todos lo encontraremos.', zh:'不要擔心喬治，我們大家一起會找到的。' },
    fire_daily:[
      { es:'No te preocupes, yo te ayudo.', zh:'不要擔心，我來幫你。' },
      { es:'No te preocupes, todo va a estar bien.', zh:'不要擔心，一切都會好的。' },
    ]
  },
  // ── E3 最好的朋友 ──
  {
    ammo_id:'e3_01', ep:'E3',
    core_ammo:'a ___ le gusta ___',
    core_zh:'___ 喜歡 ___',
    be_verb_type:'none',
    be_verb_note:'',
    pattern:'A [人] le gusta / no le gusta [動詞原形 / 名詞].',
    pattern_zh:'___ 喜歡 / 不喜歡 ___。',
    pattern_note:'西語必學句型：喜好用 gustar，主詞是「事物」',
    slots:['人名','動詞原形 或 名詞'],
    fire_peppa:{ es:'A George no le gusta jugar solo.', zh:'喬治不喜歡一個人玩。' },
    fire_daily:[
      { es:'A mis hijos les gusta la pizza.', zh:'我的孩子們喜歡披薩。' },
      { es:'A mí me gusta mucho el español.', zh:'我非常喜歡西班牙語。' },
    ]
  },
  {
    ammo_id:'e3_02', ep:'E3',
    core_ammo:'yo seré ___, tú serás ___',
    core_zh:'我當 ___，你當 ___',
    be_verb_type:'ser',
    be_verb_note:'角色扮演的「身分/職業」是本質描述，用 Ser（未來式）',
    pattern:'Yo [Ser: 本質/身分/特徵]-é [身份A] y tú [Ser: 本質/身分/特徵]-ás [身份B].',
    pattern_zh:'我當 ___，你當 ___。',
    pattern_note:'ser 未來式：seré / serás / será；角色扮演最愛用',
    slots:['身份A','身份B'],
    fire_peppa:{ es:'Yo seré la doctora y tú serás la enfermera.', zh:'我來當醫生，你來當護士。' },
    fire_daily:[
      { es:'Yo seré el chef y tú serás el cliente.', zh:'我來當主廚，你來當客人。' },
      { es:'Tú serás la profesora y yo seré el alumno.', zh:'你來當老師，我來當學生。' },
    ]
  },
];
