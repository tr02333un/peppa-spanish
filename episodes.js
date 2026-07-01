/* ── Episode sentence data (E1/E2/E3) ── */
// chunks: {w:"詞/詞組", role:"s"|"v"|"o"|undefined} — role 決定氣泡樣式
// s=主詞(虛線框) v=動詞(實色底) o=受詞/補語(實線框，也用於整句包框) 無role=連接詞等純文字
const EPS=[
// ── E1 泥巴坑 ──
{title:"Charcos de Barro",titleZh:"泥巴坑",dur:187,sentences:[
  {es:"Yo soy Peppa Pig.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Peppa Pig.",role:"o"}],zh:"我是佩佩豬。",en:"I am Peppa Pig.",noteZh:"「soy」= 我是（ser 動詞第一人稱）",noteEn:"soy = I am (1st person of 'ser')"},
  {es:"Este es mi hermano pequeño George.",chunks:[{w:"Este",role:"s"},{w:"es",role:"v"},{w:"mi hermano pequeño George.",role:"o"}],zh:"這是我的小弟弟喬治。",en:"This is my little brother George.",noteZh:"「hermano pequeño」= 小弟弟；pequeño 陽性形容詞",noteEn:"'hermano' = brother; 'pequeño' = little (masculine)",
  expand:{
    pattern:"____ es mi [關係] [大小] [名字]",
    note:"Este/Esta 跟著關係詞的性別走 — 選了 hermana 就要用 Esta",
    fixed:["es","mi"],
    groups:[
      {label:"關係詞",key:"rel",options:[
        {es:"hermano",zh:"兄弟",gender:"m"},
        {es:"hermana",zh:"姊妹",gender:"f"},
      ]},
      {label:"大小",key:"size",options:[
        {es:"mayor",zh:"大的（哥/姐）",gender:"both"},
        {es:"pequeño",zh:"小的（弟）",gender:"m"},
        {es:"pequeña",zh:"小的（妹）",gender:"f"},
      ]},
      {label:"名字",key:"name",options:[
        {es:"George",zh:"喬治",gender:"m"},
        {es:"Luna",zh:"露娜",gender:"f"},
        {es:"Vera",zh:"你自己",gender:"f"},
      ]},
    ]
  }},
  {es:"Hoy está lloviendo así que no pueden jugar fuera.",chunks:[{w:"Hoy"},{w:"está lloviendo",role:"v"},{w:"así que",role:"c"},{w:"no pueden jugar fuera.",role:"v"}],zh:"今天在下雨，所以不能去外面玩。",en:"Today it is raining so they cannot play outside.",noteZh:"「está lloviendo」= 現在進行式，正在下雨",noteEn:"'está lloviendo' = present continuous, it is raining"},
  {es:"¿Podemos salir a jugar?",chunks:[{w:"¿Podemos",role:"v"},{w:"salir a jugar?",role:"o"}],zh:"我們可以出去玩嗎？",en:"Can we go out to play?",noteZh:"「¿Podemos…?」= 我們可以…嗎？（poder 動詞一人稱複數）",noteEn:"'¿Podemos?' = Can we? (poder = to be able to)"},
  {es:"Peppa, debes ponerte las botas de agua.",chunks:[{w:"Peppa,"},{w:"debes ponerte",role:"v"},{w:"las botas de agua.",role:"o"}],zh:"佩佩，你必須穿上雨靴。",en:"Peppa, you must put on your wellies.",noteZh:"「debes + 原形動詞」= 你必須做…",noteEn:"'debes + infinitive' = you must do..."},
  {es:"¡Me encanta saltar en los charcos!",chunks:[{w:"¡Me",role:"s"},{w:"encanta",role:"v"},{w:"saltar en los charcos!",role:"o"}],zh:"我超愛在水坑裡跳！",en:"I love jumping in puddles!",noteZh:"「Me encanta」= 我超愛，比 me gusta 更強烈",noteEn:"'Me encanta' = I love it (stronger than 'me gusta')"},
  {es:"Peppa ha encontrado un charco pequeño.",chunks:[{w:"Peppa",role:"s"},{w:"ha encontrado",role:"v"},{w:"un charco pequeño.",role:"o"}],zh:"佩佩找到了一個小水坑。",en:"Peppa has found a small puddle.",noteZh:"「ha encontrado」= 現在完成式，已經找到了",noteEn:"'ha encontrado' = has found (present perfect tense)"},
  {es:"¡Ese charco sí que es grande!",chunks:[{w:"¡Ese charco",role:"s"},{w:"sí que es",role:"v"},{w:"grande!",role:"o"}],zh:"那個水坑真的好大！",en:"That puddle really is big!",noteZh:"「sí que」= 強調語氣，真的是、確實是",noteEn:"'sí que' adds emphasis: it really is / it truly is"},
  {es:"No pasa nada. Sólo es barro.",chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo"},{w:"es",role:"v"},{w:"barro.",role:"o"}],zh:"沒關係，只是泥巴而已。",en:"It's okay. It's only mud.",noteZh:"「No pasa nada」= 沒關係，西語最常用的安慰語！",noteEn:"'No pasa nada' = It's okay / No worries. Super common!"},
  {es:"A todos les encanta saltar en los charcos de barro.",chunks:[{w:"A todos les",role:"s"},{w:"encanta",role:"v"},{w:"saltar en los charcos de barro.",role:"o"}],zh:"所有人都超愛在泥巴坑裡跳！",en:"Everyone loves jumping in muddy puddles!",noteZh:"「A todos les encanta」= 所有人都超愛，第三人稱複數",noteEn:"'A todos les encanta' = everyone loves it (3rd person plural)"}
]},

// ── E2 恐龍先生不見了 ──
{title:"El Señor Dinosaurio Se Ha Perdido",titleZh:"恐龍先生不見了",dur:195,sentences:[
  {es:"El juguete favorito de George es el señor Dinosaurio.",chunks:[{w:"El juguete favorito de George",role:"s"},{w:"es",role:"v"},{w:"el señor Dinosaurio.",role:"o"}],zh:"喬治最喜歡的玩具是恐龍先生。",en:"George's favourite toy is Mr Dinosaur.",noteZh:"「favorito」= 最喜歡的，名詞後置形容詞",noteEn:"'favorito' = favourite (adjective placed after noun)"},
  {es:"Cuando George se va a la cama el señor Dinosaurio se acurruca a su lado.",chunks:[{w:"Cuando",role:"c"},{w:"George",role:"s"},{w:"se va",role:"v"},{w:"a la cama",role:"o"},{w:"el señor Dinosaurio",role:"s"},{w:"se acurruca",role:"v"},{w:"a su lado.",role:"o"}],zh:"當喬治上床睡覺時，恐龍先生就蜷縮在他身旁。",en:"When George goes to bed, Mr Dinosaur cuddles up beside him.",noteZh:"「se va a la cama」= 上床睡覺；「a su lado」= 在他旁邊",noteEn:"'se va a la cama' = goes to bed; 'a su lado' = beside him",
  expand:{
    note:"套用 irse a la cama（上床睡覺）這個固定語塊，換主詞就能舉一反三",
    template:[{t:"Cuando"},{g:"person"},{t:"se va a la cama."}],
    groups:[
      {label:"誰",key:"person",options:[
        {es:"George",zh:"喬治"},
        {es:"Peppa",zh:"佩佩"},
        {es:"mamá",zh:"媽媽"},
        {es:"papá",zh:"爸爸"},
      ]}
    ]
  }},
  {es:"George ha perdido al señor Dinosaurio.",chunks:[{w:"George",role:"s"},{w:"ha perdido",role:"v"},{w:"al señor Dinosaurio.",role:"o"}],zh:"喬治把恐龍先生弄丟了。",en:"George has lost Mr Dinosaur.",noteZh:"「ha perdido」= 現在完成式，已經弄丟了",noteEn:"'ha perdido' = has lost (present perfect tense)"},
  {es:"No te preocupes George, entre todos lo encontraremos.",chunks:[{w:"No te preocupes",role:"v"},{w:"George,"},{w:"entre todos",role:"s"},{w:"lo encontraremos.",role:"v"}],zh:"不要擔心喬治，我們大家一起會找到牠的。",en:"Don't worry George, together we will find it.",noteZh:"「No te preocupes」= 不要擔心，反身動詞命令句",noteEn:"'No te preocupes' = Don't worry (reflexive imperative)"},
  {es:"Un detective es una persona muy buena encontrando cosas.",chunks:[{w:"Un detective",role:"s"},{w:"es",role:"v"},{w:"una persona muy buena encontrando cosas.",role:"o"}],zh:"偵探是一個非常擅長找東西的人。",en:"A detective is a person who is very good at finding things.",noteZh:"「muy buena encontrando」= 非常擅長於做某事",noteEn:"'muy buena encontrando' = very good at finding (gerund phrase)"},
  {es:"George siempre se trae al señor Dinosaurio a la bañera.",chunks:[{w:"George",role:"s"},{w:"siempre se trae",role:"v"},{w:"al señor Dinosaurio a la bañera.",role:"o"}],zh:"喬治總是帶著恐龍先生去洗澡。",en:"George always brings Mr Dinosaur to the bath.",noteZh:"「siempre」= 總是，頻率副詞放在動詞前",noteEn:"'siempre' = always (frequency adverb, placed before verb)",
  expand:{
    note:"se trae + 東西 = 隨身帶著；換掉帶去的東西練習",
    template:[{t:"George siempre se trae"},{g:"thing"},{t:"a la bañera."}],
    groups:[
      {label:"帶什麼",key:"thing",options:[
        {es:"al señor Dinosaurio",zh:"恐龍先生"},
        {es:"a su pelota",zh:"他的球"},
        {es:"a su osito",zh:"他的小熊"},
        {es:"a su libro favorito",zh:"他最喜歡的書"},
      ]}
    ]
  }},
  {es:"¡Ya lo sé dónde está el señor Dinosaurio!",chunks:[{w:"¡Ya lo sé",role:"v"},{w:"dónde",role:"c"},{w:"está",role:"v"},{w:"el señor Dinosaurio!",role:"s"}],zh:"我知道恐龍先生在哪裡了！",en:"I know where Mr Dinosaur is!",noteZh:"「Ya lo sé」= 我知道了，ya 表示已然發生",noteEn:"'Ya lo sé' = I already know! 'ya' indicates something just realized"},
  {es:"El señor Dinosaurio no está en la cama de George.",chunks:[{w:"El señor Dinosaurio",role:"s"},{w:"no está",role:"v"},{w:"en la cama de George.",role:"o"}],zh:"恐龍先生不在喬治的床上。",en:"Mr Dinosaur is not in George's bed.",noteZh:"「no está」= 不在（用 estar 表示位置）",noteEn:"'no está' = is not there (uses 'estar' for location)"},
  {es:"Peppa y papá Pig están jugando a las damas.",chunks:[{w:"Peppa y papá Pig",role:"s"},{w:"están jugando",role:"v"},{w:"a las damas.",role:"o"}],zh:"佩佩和豬爸爸正在下西洋棋。",en:"Peppa and Daddy Pig are playing draughts.",noteZh:"「están jugando」= 現在進行式，正在玩",noteEn:"'están jugando' = are playing (present continuous with estar)"},
  {es:"¡Ya lo sé, habéis estado saltando en los charcos de barro!",chunks:[{w:"¡Ya lo sé,",role:"v"},{w:"habéis estado saltando",role:"v"},{w:"en los charcos de barro!",role:"o"}],zh:"我知道了，你們一直在泥巴坑裡跳！",en:"I know, you've been jumping in muddy puddles!",noteZh:"「habéis estado + 動名詞」= 現在完成進行式，一直在做…",noteEn:"'habéis estado + gerund' = you have been doing... (present perfect continuous)"}
]},

// ── E3 最好的朋友 ──
{title:"La Mejor Amiga",titleZh:"最好的朋友",dur:192,sentences:[
  {es:"Peppa está esperando a su mejor amiga, Susi Sheep.",chunks:[{w:"Peppa",role:"s"},{w:"está esperando",role:"v"},{w:"a su mejor amiga, Susi Sheep.",role:"o"}],zh:"佩佩正在等她最好的朋友蘇西羊。",en:"Peppa is waiting for her best friend, Suzy Sheep.",noteZh:"「está esperando」= 現在進行式，正在等",noteEn:"'está esperando' = is waiting (present continuous)"},
  {es:"Peppa quiere mucho a Susi y Susi quiere mucho a Peppa.",chunks:[{w:"Peppa",role:"s"},{w:"quiere mucho",role:"v"},{w:"a Susi",role:"o"},{w:"y",role:"c"},{w:"Susi",role:"s"},{w:"quiere mucho",role:"v"},{w:"a Peppa.",role:"o"}],zh:"佩佩非常喜歡蘇西，蘇西也非常喜歡佩佩。",en:"Peppa loves Suzy very much and Suzy loves Peppa very much.",noteZh:"「querer + mucho」= 非常喜歡、愛，人名前加 a",noteEn:"'querer a alguien' = to love someone. 'a' is required before person"},
  {es:"Son las mejores amigas.",chunks:[{w:"Son",role:"v"},{w:"las mejores amigas.",role:"o"}],zh:"她們是最好的朋友。",en:"They are best friends.",noteZh:"「mejores amigas」= 最好的朋友；mejor 的複數形",noteEn:"'mejores' = best (plural of 'mejor'); 'amigas' = female friends"},
  {es:"¡No George! Este juego es solo para niñas mayores.",chunks:[{w:"¡No George!"},{w:"Este juego",role:"s"},{w:"es",role:"v"},{w:"solo para niñas mayores.",role:"o"}],zh:"不行喬治！這個遊戲只給大一點的女孩玩。",en:"No George! This game is just for older girls.",noteZh:"「solo para」= 只給、只限；「niñas mayores」= 大一點的女孩",noteEn:"'solo para' = only for; 'niñas mayores' = older girls"},
  {es:"¡Soy una princesa salida de un cuento!",chunks:[{w:"¡Soy",role:"v"},{w:"una princesa salida de un cuento!",role:"o"}],zh:"我是從故事書裡走出來的公主！",en:"I am a princess from a fairy tale!",noteZh:"「salida de un cuento」= 從故事書裡走出來的",noteEn:"'salida de un cuento' = come out of a story / fairy tale princess"},
  {es:"A George no le gusta jugar solo.",chunks:[{w:"A George",role:"s"},{w:"no le gusta",role:"v"},{w:"jugar solo.",role:"o"}],zh:"喬治不喜歡一個人玩。",en:"George doesn't like to play alone.",noteZh:"「A + 人 + le gusta」= 某人喜歡，西語必學句型！",noteEn:"'A + person + le gusta' = someone likes. Key Spanish structure!",
  expand:{
    note:"A + 人 + le gusta 是固定句型；換主詞就能套用在任何人身上",
    template:[{t:"A"},{g:"person"},{t:"no le gusta jugar solo."}],
    groups:[
      {label:"誰",key:"person",options:[
        {es:"George",zh:"喬治"},
        {es:"Peppa",zh:"佩佩"},
        {es:"mi hijo",zh:"我兒子"},
        {es:"mi hija",zh:"我女兒"},
      ]}
    ]
  }},
  {es:"Yo seré la doctora y tú serás la enfermera.",chunks:[{w:"Yo",role:"s"},{w:"seré",role:"v"},{w:"la doctora",role:"o"},{w:"y",role:"c"},{w:"tú",role:"s"},{w:"serás",role:"v"},{w:"la enfermera.",role:"o"}],zh:"我來當醫生，你來當護士。",en:"I will be the doctor and you will be the nurse.",noteZh:"「seré / serás」= ser 動詞的未來式，我/你將是",noteEn:"'seré / serás' = I will be / you will be (future tense of 'ser')",
  expand:{
    note:"職業陰陽性成對：la doctora/el doctor、la enfermera/el enfermero…換角色順便練性別變化",
    template:[{t:"Yo seré"},{g:"prof1"},{t:"y tú serás"},{g:"prof2"}],
    groups:[
      {label:"我來當",key:"prof1",options:[
        {es:"la doctora",zh:"醫生（女）"},
        {es:"el doctor",zh:"醫生（男）"},
        {es:"la maestra",zh:"老師（女）"},
        {es:"el maestro",zh:"老師（男）"},
        {es:"la cocinera",zh:"廚師（女）"},
        {es:"el cocinero",zh:"廚師（男）"},
      ]},
      {label:"你來當",key:"prof2",options:[
        {es:"la enfermera",zh:"護士（女）"},
        {es:"el enfermero",zh:"護士（男）"},
        {es:"la doctora",zh:"醫生（女）"},
        {es:"el doctor",zh:"醫生（男）"},
        {es:"la maestra",zh:"老師（女）"},
        {es:"el maestro",zh:"老師（男）"},
      ]}
    ]
  }},
  {es:"Ahora George, respira hondo. Después tose.",chunks:[{w:"Ahora George,"},{w:"respira hondo.",role:"v"},{w:"Después",role:"c"},{w:"tose.",role:"v"}],zh:"現在喬治，深呼吸。然後咳嗽。",en:"Now George, breathe deeply. Then cough.",noteZh:"「respira hondo」= 深呼吸，命令式動詞直接用",noteEn:"'respira hondo' = breathe deeply (imperative form, informal)"},
  {es:"Creo que tienes el corazón un poco flojo.",chunks:[{w:"Creo",role:"v"},{w:"que",role:"c"},{w:"tienes",role:"v"},{w:"el corazón un poco flojo.",role:"o"}],zh:"我認為你的心臟有點虛弱。",en:"I think your heart is a little weak.",noteZh:"「Creo que」= 我認為，後接完整子句",noteEn:"'Creo que' = I think that... (followed by a full clause)"},
  {es:"Todos necesitan muchas galletas para curarse.",chunks:[{w:"Todos",role:"s"},{w:"necesitan",role:"v"},{w:"muchas galletas para curarse.",role:"o"}],zh:"所有人都需要很多餅乾才能康復。",en:"Everyone needs lots of cookies to get better.",noteZh:"「para + 原形動詞」= 為了做某事；「curarse」= 康復",noteEn:"'para + infinitive' = in order to do; 'curarse' = to recover"}
]}
];
