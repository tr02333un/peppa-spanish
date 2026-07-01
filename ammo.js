/* ── 語塊彈藥庫資料：S1 E1~E3，每句一張卡，共 30 張 ── */
const AMMO_DATA = [
  // ══════════ E1 · 泥巴坑 ══════════
  {
    ammo_id:"e1_01", ep:"E1 · 泥巴坑",
    core_ammo:"Yo soy Peppa Pig.", core_zh:"我是佩佩豬。",
    be_verb_type:"ser", be_verb_note:"Ser 用在身分本質：Yo soy = 我是（恆久不變的身分）",
    pattern:"Yo soy [身分/名字].", pattern_zh:"我是 ___。",
    pattern_note:"省略 Yo 直接說 Soy 也通，西語常省主詞", slots:["身分/名字"],
    fire_peppa:{es:"Yo soy Peppa Pig.", zh:"我是佩佩豬。", ts:null,
      chunks:[{w:"（我）",role:"s"},{w:"soy",role:"v",note:"ser ➔ 變位 soy ➔ 意思：我是（身分本質，「我」的說法）"},{w:"Peppa Pig.",role:"o"}]},
    fire_daily:[
      {es:"Yo soy estudiante.", zh:"我是學生。", chunks:[{w:"（我）",role:"s"},{w:"soy",role:"v"},{w:"de Taiwán.",role:"o"}]},
      {es:"Yo soy de Taiwán.", zh:"我是台灣人。", chunks:[{w:"（我）",role:"s"},{w:"soy",role:"v"},{w:"de Taiwán.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_02", ep:"E1 · 泥巴坑",
    core_ammo:"Este es mi hermano pequeño George.", core_zh:"這是我的小弟弟喬治。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分關係：Este es = 這是（介紹某人）",
    pattern:"Este es mi [關係] [名字].", pattern_zh:"這是我的 ___ ___。",
    pattern_note:"Este/Esta 跟著關係詞性別走", slots:["關係","名字"],
    fire_peppa:{es:"Este es mi hermano pequeño George.", zh:"這是我的小弟弟喬治。", ts:null,
      chunks:[{w:"Este",role:"s"},{w:"es",role:"v",note:"ser ➔ 變位 es ➔ 意思：是（介紹他人身分）"},{w:"mi hermano pequeño George.",role:"o"}]},
    fire_daily:[
      {es:"Esta es mi hermana mayor.", zh:"這是我姊姊。", chunks:[{w:"Este",role:"s"},{w:"es",role:"v"},{w:"mi amigo Carlos.",role:"o"}]},
      {es:"Este es mi amigo Carlos.", zh:"這是我朋友卡洛斯。", chunks:[{w:"Este",role:"s"},{w:"es",role:"v"},{w:"mi amigo Carlos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_03", ep:"E1 · 泥巴坑",
    core_ammo:"Hoy está lloviendo así que no pueden jugar fuera.", core_zh:"今天在下雨，所以不能去外面玩。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando/-iendo = 正在做的說法，描述正在發生的事",
    pattern:"Hoy está [動詞-ndo].", pattern_zh:"今天正在 ___。",
    pattern_note:"estar + -ing形態，暫時性動作", slots:["動詞-ndo"],
    fire_peppa:{es:"Hoy está lloviendo así que no pueden jugar fuera.", zh:"今天在下雨，所以不能去外面玩。", ts:null,
      chunks:[{w:"Hoy",hideYg:true},{w:"está lloviendo",role:"v",note:"estar ➔ está + llover ➔ lloviendo ➔ 意思：正在下雨（estar + -ing形態 = 進行式）"},{w:"así que",role:"c",hideYg:true},{w:"no pueden jugar fuera.",role:"v",note:"poder ➔ pueden（「他們」的說法）+ no ➔ 意思：不能去玩"}]},
    fire_daily:[
      {es:"Hoy está nevando mucho.", zh:"今天下很大的雪。", chunks:[{w:"Ahora mismo"},{w:"está sonando",role:"v"},{w:"el teléfono.",role:"s"}]},
      {es:"Ahora mismo está sonando el teléfono.", zh:"現在電話正在響。", chunks:[{w:"Ahora mismo"},{w:"está sonando",role:"v"},{w:"el teléfono.",role:"s"}]}
    ]
  },
  {
    ammo_id:"e1_04", ep:"E1 · 泥巴坑",
    core_ammo:"¿Podemos salir a jugar?", core_zh:"我們可以出去玩嗎？",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¿Podemos [原形動詞]?", pattern_zh:"我們可以 ___ 嗎？",
    pattern_note:"poder 「我們」的說法，徵求許可", slots:["原形動詞"],
    fire_peppa:{es:"¿Podemos salir a jugar?", zh:"我們可以出去玩嗎？", ts:null,
      chunks:[{w:"（我們）",role:"s",hideYg:true},{w:"¿Podemos salir a jugar?",role:"v",note:"poder ➔ podemos（「我們」的說法）➔ 意思：我們可以嗎？（徵求許可）"}]},
    fire_daily:[
      {es:"¿Podemos comer ahora?", zh:"我們現在可以吃了嗎？", chunks:[{w:"（我們）",role:"s"},{w:"¿Podemos ver la tele?",role:"v"}]},
      {es:"¿Podemos ver la tele?", zh:"我們可以看電視嗎？", chunks:[{w:"（我們）",role:"s"},{w:"¿Podemos ver la tele?",role:"v"}]}
    ]
  },
  {
    ammo_id:"e1_05", ep:"E1 · 泥巴坑",
    core_ammo:"Peppa, debes ponerte las botas de agua.", core_zh:"佩佩，你必須穿上雨靴。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Debes [原形動詞] [受詞].", pattern_zh:"你必須 ___ ___。",
    pattern_note:"deber + 原形動詞 = 義務、必須做", slots:["原形動詞","受詞"],
    fire_peppa:{es:"Peppa, debes ponerte las botas de agua.", zh:"佩佩，你必須穿上雨靴。", ts:null,
      chunks:[{w:"Peppa,",hideYg:true},{w:"debes ponerte",role:"v",note:"deber ➔ debes（「你」的說法）+ poner ➔ ponerte ➔ 意思：你必須穿上（deber + 原形 = 義務）"},{w:"las botas de agua.",role:"o"}]},
    fire_daily:[
      {es:"Debes lavarte las manos.", zh:"你必須洗手。", chunks:[{w:"（你）",role:"s"},{w:"Debes hacer",role:"v"},{w:"la tarea.",role:"o"}]},
      {es:"Debes hacer la tarea.", zh:"你必須做功課。", chunks:[{w:"（你）",role:"s"},{w:"Debes hacer",role:"v"},{w:"la tarea.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_06", ep:"E1 · 泥巴坑",
    core_ammo:"¡Me encanta saltar en los charcos!", core_zh:"我超愛在水坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¡Me encanta [原形動詞]!", pattern_zh:"我超愛 ___！",
    pattern_note:"me encanta 比 me gusta 更強烈", slots:["原形動詞"],
    fire_peppa:{es:"¡Me encanta saltar en los charcos!", zh:"我超愛在水坑裡跳！", ts:null,
      chunks:[{w:"¡Me",role:"s",hideYg:true},{w:"encanta saltar en los charcos!",role:"v",note:"encantar ➔ encanta（「他/她」的說法）➔ 意思：超愛（比 gustar 語氣更強，倒裝語序）"}]},
    fire_daily:[
      {es:"¡Me encanta bailar!", zh:"我超愛跳舞！", chunks:[{w:"¡Me",role:"s"},{w:"encanta comer helado!",role:"v"}]},
      {es:"¡Me encanta comer helado!", zh:"我超愛吃冰淇淋！", chunks:[{w:"¡Me",role:"s"},{w:"encanta comer helado!",role:"v"}]}
    ]
  },
  {
    ammo_id:"e1_07", ep:"E1 · 泥巴坑",
    core_ammo:"Peppa ha encontrado un charco pequeño.", core_zh:"佩佩找到了一個小水坑。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha encontrado [受詞].", pattern_zh:"___ 找到了 ___。",
    pattern_note:"ha + -ado/-ido形 = 已完成說法", slots:["人","受詞"],
    fire_peppa:{es:"Peppa ha encontrado un charco pequeño.", zh:"佩佩找到了一個小水坑。", ts:null,
      chunks:[{w:"Peppa",role:"s"},{w:"ha encontrado",role:"v",note:"encontrar ➔ encontrado（-ado/-ido形）+ haber ➔ ha ➔ 意思：找到了（已完成說法）"},{w:"un charco pequeño.",role:"o"}]},
    fire_daily:[
      {es:"Mamá ha encontrado las llaves.", zh:"媽媽找到鑰匙了。", chunks:[{w:"（我）",role:"s"},{w:"He encontrado",role:"v"},{w:"mi libro.",role:"o"}]},
      {es:"He encontrado mi libro.", zh:"我找到我的書了。", chunks:[{w:"（我）",role:"s"},{w:"He encontrado",role:"v"},{w:"mi libro.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_08", ep:"E1 · 泥巴坑",
    core_ammo:"¡Ese charco sí que es grande!", core_zh:"那個水坑真的好大！",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質特徵：sí que es = 真的是（強調語氣）",
    pattern:"¡Ese [名詞] sí que es [形容詞]!", pattern_zh:"那個 ___ 真的好 ___！",
    pattern_note:"sí que = 加強語氣，真的、確實", slots:["名詞","形容詞"],
    fire_peppa:{es:"¡Ese charco sí que es grande!", zh:"那個水坑真的好大！", ts:null,
      chunks:[{w:"¡Ese charco",role:"s"},{w:"sí que es",role:"v",note:"ser ➔ es，加 sí que 強調語氣 ➔ 意思：真的好大（確實是…）"},{w:"grande!",role:"o"}]},
    fire_daily:[
      {es:"¡Esa casa sí que es grande!", zh:"那間房子真的好大！", chunks:[{w:"¡Este pastel",role:"s"},{w:"sí que es",role:"v"},{w:"rico!",role:"o"}]},
      {es:"¡Este pastel sí que es rico!", zh:"這個蛋糕真的好好吃！", chunks:[{w:"¡Este pastel",role:"s"},{w:"sí que es",role:"v"},{w:"rico!",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_09", ep:"E1 · 泥巴坑",
    core_ammo:"No pasa nada. Sólo es barro.", core_zh:"沒關係，只是泥巴而已。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質：Sólo es = 只是（描述事物本質）",
    pattern:"No pasa nada. Sólo es [名詞].", pattern_zh:"沒關係，只是 ___ 而已。",
    pattern_note:"No pasa nada = 西語最常用的安慰語", slots:["名詞"],
    fire_peppa:{es:"No pasa nada. Sólo es barro.", zh:"沒關係，只是泥巴而已。", ts:null,
      chunks:[{w:"No pasa nada.",role:"v",note:"pasar ➔ pasa（「他/她」的說法）+ no ➔ 意思：沒關係（西語最常用安慰語）"},{w:"Sólo es",role:"v",note:"ser ➔ es + sólo ➔ 意思：只是…而已（描述本質）"},{w:"barro.",role:"o"}]},
    fire_daily:[
      {es:"No pasa nada. Sólo es agua.", zh:"沒關係，只是水而已。", chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo es",role:"v"},{w:"un rasguño.",role:"o"}]},
      {es:"No pasa nada. Sólo es un rasguño.", zh:"沒關係，只是擦傷而已。", chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo es",role:"v"},{w:"un rasguño.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_10", ep:"E1 · 泥巴坑",
    core_ammo:"A todos les encanta saltar en los charcos de barro.", core_zh:"所有人都超愛在泥巴坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A todos les encanta [原形動詞].", pattern_zh:"所有人都超愛 ___。",
    pattern_note:"encanta 「他們」的說法，les 取代 me", slots:["原形動詞"],
    fire_peppa:{es:"A todos les encanta saltar en los charcos de barro.", zh:"所有人都超愛在泥巴坑裡跳！", ts:null,
      chunks:[{w:"A todos les",role:"s",hideYg:true},{w:"encanta saltar en los charcos de barro.",role:"v",note:"encantar ➔ encanta（「他/她」的說法）+ les（間接受詞代詞）➔ 意思：所有人都超愛（A+人+le/les encanta = 某人超愛）"}]},
    fire_daily:[
      {es:"A todos les encanta cantar.", zh:"所有人都超愛唱歌。", chunks:[{w:"A todos les",role:"s"},{w:"encanta el verano.",role:"v"}]},
      {es:"A todos les encanta el verano.", zh:"所有人都超愛夏天。", chunks:[{w:"A todos les",role:"s"},{w:"encanta el verano.",role:"v"}]}
    ]
  },

  // ══════════ E2 · 恐龍先生不見了 ══════════
  {
    ammo_id:"e2_01", ep:"E2 · 恐龍先生不見了",
    core_ammo:"El juguete favorito de George es el señor Dinosaurio.", core_zh:"喬治最喜歡的玩具是恐龍先生。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分本質：es = 是（介紹事物）",
    pattern:"El juguete favorito de [人] es [名詞].", pattern_zh:"___ 最喜歡的玩具是 ___。",
    pattern_note:"favorito 放在名詞後面，跟英文相反", slots:["人","名詞"],
    fire_peppa:{es:"El juguete favorito de George es el señor Dinosaurio.", zh:"喬治最喜歡的玩具是恐龍先生。", ts:null,
      chunks:[{w:"El juguete favorito de George",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（介紹事物身分，favorito 放在名詞後）"},{w:"el señor Dinosaurio.",role:"o"}]},
    fire_daily:[
      {es:"El libro favorito de mi hermana es Harry Potter.", zh:"我姊姊最喜歡的書是哈利波特。", chunks:[{w:"Mi color favorito",role:"s"},{w:"es",role:"v"},{w:"el azul.",role:"o"}]},
      {es:"Mi color favorito es el azul.", zh:"我最喜歡的顏色是藍色。", chunks:[{w:"Mi color favorito",role:"s"},{w:"es",role:"v"},{w:"el azul.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_02", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Cuando George se va a la cama el señor Dinosaurio se acurruca a su lado.", core_zh:"當喬治上床睡覺時，恐龍先生就蜷縮在他身旁。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Cuando [人] se va a la cama...", pattern_zh:"當 ___ 上床睡覺時…",
    pattern_note:"se va a la cama = 去睡覺，自己對自己做的動詞片語", slots:["人"],
    fire_peppa:{es:"Cuando George se va a la cama el señor Dinosaurio se acurruca a su lado.", zh:"當喬治上床睡覺時，恐龍先生就蜷縮在他身旁。", ts:null,
      chunks:[{w:"Cuando",role:"c",hideYg:true},{w:"George",role:"s"},{w:"se va a la cama",role:"v",note:"irse ➔ se va（自己對自己做的動詞）+ a la cama ➔ 意思：去睡覺（irse a = 去做某事）"},{w:"el señor Dinosaurio",role:"s"},{w:"se acurruca",role:"v",note:"acurrucarse ➔ se acurruca ➔ 意思：蜷縮（自己對自己做的動詞，「他/她」的說法）"},{w:"a su lado.",role:"o"}]},
    fire_daily:[
      {es:"Cuando mamá se va a la cama, apaga la luz.", zh:"當媽媽上床睡覺時，她會關燈。", chunks:[{w:"Yo",role:"s"},{w:"me voy a la cama",role:"v"},{w:"a las nueve.",role:"o"}]},
      {es:"Yo me voy a la cama a las nueve.", zh:"我九點去睡覺。", chunks:[{w:"Yo",role:"s"},{w:"me voy a la cama",role:"v"},{w:"a las nueve.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_03", ep:"E2 · 恐龍先生不見了",
    core_ammo:"George ha perdido al señor Dinosaurio.", core_zh:"喬治把恐龍先生弄丟了。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha perdido [受詞].", pattern_zh:"___ 把 ___ 弄丟了。",
    pattern_note:"ha perdido = 已經弄丟了（已完成說法）", slots:["人","受詞"],
    fire_peppa:{es:"George ha perdido al señor Dinosaurio.", zh:"喬治把恐龍先生弄丟了。", ts:null,
      chunks:[{w:"George",role:"s"},{w:"ha perdido",role:"v",note:"perder ➔ perdido（-ado/-ido形）+ haber ➔ ha ➔ 意思：弄丟了（已完成說法）"},{w:"al señor Dinosaurio.",role:"o"}]},
    fire_daily:[
      {es:"He perdido mi mochila.", zh:"我把我的書包弄丟了。", chunks:[{w:"Ella",role:"s"},{w:"ha perdido",role:"v"},{w:"su teléfono.",role:"o"}]},
      {es:"Papá ha perdido las llaves del coche.", zh:"爸爸把車鑰匙弄丟了。", chunks:[{w:"Papá",role:"s"},{w:"ha perdido",role:"v"},{w:"las llaves del coche.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_04", ep:"E2 · 恐龍先生不見了",
    core_ammo:"No te preocupes George, entre todos lo encontraremos.", core_zh:"不要擔心喬治，我們大家一起會找到牠的。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"No te preocupes, [理由].", pattern_zh:"不要擔心，___。",
    pattern_note:"No te preocupes = 自己對自己做的動詞直接下指令的說法，安慰用語", slots:["理由"],
    fire_peppa:{es:"No te preocupes George, entre todos lo encontraremos.", zh:"不要擔心喬治，我們大家一起會找到牠的。", ts:null,
      chunks:[{w:"No te preocupes",role:"v",note:"preocuparse ➔ preocupes（自己對自己做的動詞，直接下指令的說法否定）➔ 意思：不要擔心（西語安慰語）"},{w:"George,",hideYg:true},{w:"entre todos",role:"s",hideYg:true},{w:"lo encontraremos.",role:"v",note:"encontrar ➔ encontraremos（以後要做的說法複數）➔ 意思：我們將會找到"}]},
    fire_daily:[
      {es:"No te preocupes, todo va a salir bien.", zh:"不要擔心，一切都會順利的。", chunks:[{w:"No te preocupes,",role:"v"},{w:"（這）",role:"s"},{w:"es normal.",role:"v"}]},
      {es:"No te preocupes por el examen.", zh:"不要為考試擔心。", chunks:[{w:"No te preocupes",role:"v"},{w:"por el examen.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_05", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Un detective es una persona muy buena encontrando cosas.", core_zh:"偵探是一個非常擅長找東西的人。",
    be_verb_type:"ser", be_verb_note:"Ser 定義身分職業：detective es = 偵探是…（本質定義）",
    pattern:"Un [職業] es una persona muy buena [-ing形態].", pattern_zh:"___ 是一個非常擅長 ___ 的人。",
    pattern_note:"muy buena + -ing形態 = 非常擅長於做某事", slots:["職業","-ing形態"],
    fire_peppa:{es:"Un detective es una persona muy buena encontrando cosas.", zh:"偵探是一個非常擅長找東西的人。", ts:null,
      chunks:[{w:"Un detective",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（職業定義用 ser）"},{w:"una persona muy buena encontrando cosas.",role:"o"}]},
    fire_daily:[
      {es:"Un profesor es una persona muy buena explicando cosas.", zh:"老師是一個非常擅長解釋事情的人。", chunks:[{w:"Un maestro",role:"s"},{w:"es",role:"v"},{w:"una persona muy buena enseñando.",role:"o"}]},
      {es:"Mi abuela es muy buena cocinando.", zh:"我奶奶非常擅長煮飯。", chunks:[{w:"Mi abuela",role:"s"},{w:"es muy buena cocinando.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e2_06", ep:"E2 · 恐龍先生不見了",
    core_ammo:"George siempre se trae al señor Dinosaurio a la bañera.", core_zh:"喬治總是帶著恐龍先生去洗澡。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] siempre se trae [物] a [地點].", pattern_zh:"___ 總是帶著 ___ 去 ___。",
    pattern_note:"siempre 放在動詞前，表頻率", slots:["人","物","地點"],
    fire_peppa:{es:"George siempre se trae al señor Dinosaurio a la bañera.", zh:"喬治總是帶著恐龍先生去洗澡。", ts:null,
      chunks:[{w:"George",role:"s"},{w:"siempre se trae",role:"v",note:"traerse ➔ se trae（自己對自己做的動詞）+ siempre（頻率副詞）➔ 意思：總是帶著去（siempre 放動詞前）"},{w:"al señor Dinosaurio",role:"o"},{w:"a la bañera.",role:"o"}]},
    fire_daily:[
      {es:"Yo siempre me traigo un libro a la escuela.", zh:"我總是帶一本書去學校。", chunks:[{w:"Susi",role:"s"},{w:"siempre se trae",role:"v"},{w:"su muñeca",role:"o"},{w:"al parque.",role:"o"}]},
      {es:"Susi siempre se trae su muñeca al parque.", zh:"蘇西總是帶她的娃娃去公園。", chunks:[{w:"Susi",role:"s"},{w:"siempre se trae",role:"v"},{w:"su muñeca",role:"o"},{w:"al parque.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_07", ep:"E2 · 恐龍先生不見了",
    core_ammo:"¡Ya lo sé dónde está el señor Dinosaurio!", core_zh:"我知道恐龍先生在哪裡了！",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：dónde está = 在哪裡（位置用 estar）",
    pattern:"¡Ya lo sé dónde está [名詞]!", pattern_zh:"我知道 ___ 在哪裡了！",
    pattern_note:"Ya lo sé = 我知道了，ya 表示已然發生", slots:["名詞"],
    fire_peppa:{es:"¡Ya lo sé dónde está el señor Dinosaurio!", zh:"我知道恐龍先生在哪裡了！", ts:null,
      chunks:[{w:"（我）",role:"s",hideYg:true},{w:"¡Ya lo sé",role:"v",note:"saber ➔ sé（「我」的說法變化比較特別）+ ya ➔ 意思：我知道了（ya = 已然發生）"},{w:"dónde está",role:"c",note:"estar ➔ está ➔ 意思：在哪裡（位置/狀態用 estar，不用 ser）"},{w:"el señor Dinosaurio!",role:"s"}]},
    fire_daily:[
      {es:"¡Ya lo sé dónde está mi mochila!", zh:"我知道我的書包在哪裡了！", chunks:[{w:"（我）",role:"s"},{w:"¡Ya lo sé",role:"v"},{w:"dónde está",role:"c"},{w:"el gato!",role:"s"}]},
      {es:"¡Ya lo sé dónde está el gato!", zh:"我知道貓在哪裡了！", chunks:[{w:"（我）",role:"s"},{w:"¡Ya lo sé",role:"v"},{w:"dónde está",role:"c"},{w:"el gato!",role:"s"}]}
    ]
  },
  {
    ammo_id:"e2_08", ep:"E2 · 恐龍先生不見了",
    core_ammo:"El señor Dinosaurio no está en la cama de George.", core_zh:"恐龍先生不在喬治的床上。",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：no está en = 不在（estar 管位置）",
    pattern:"[名詞] no está en [地點].", pattern_zh:"___ 不在 ___。",
    pattern_note:"口訣：SER = 本質身分；ESTAR = 位置狀態", slots:["名詞","地點"],
    fire_peppa:{es:"El señor Dinosaurio no está en la cama de George.", zh:"恐龍先生不在喬治的床上。", ts:null,
      chunks:[{w:"El señor Dinosaurio",role:"s"},{w:"no está",role:"v",note:"estar ➔ está（「他/她」的說法）+ no ➔ 意思：不在（口訣：SER=本質，ESTAR=位置）"},{w:"en la cama de George.",role:"o"}]},
    fire_daily:[
      {es:"El gato no está en la cocina.", zh:"貓不在廚房。", chunks:[{w:"Mis llaves",role:"s"},{w:"no están",role:"v"},{w:"en la mesa.",role:"o"}]},
      {es:"Mis llaves no están en la mesa.", zh:"我的鑰匙不在桌上。", chunks:[{w:"Mis llaves",role:"s"},{w:"no están",role:"v"},{w:"en la mesa.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_09", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Peppa y papá Pig están jugando a las damas.", core_zh:"佩佩和豬爸爸正在下西洋棋。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 正在做的說法，正在做某事",
    pattern:"[人] están jugando a [遊戲].", pattern_zh:"___ 正在玩 ___。",
    pattern_note:"están jugando = 正在做的說法複數", slots:["人","遊戲"],
    fire_peppa:{es:"Peppa y papá Pig están jugando a las damas.", zh:"佩佩和豬爸爸正在下西洋棋。", ts:null,
      chunks:[{w:"Peppa y papá Pig",role:"s"},{w:"están jugando",role:"v",note:"jugar ➔ jugando + estar ➔ están ➔ 意思：正在玩（複數進行式，estar + -ing形態）"},{w:"a las damas.",role:"o"}]},
    fire_daily:[
      {es:"Los niños están jugando al fútbol.", zh:"孩子們正在踢足球。", chunks:[{w:"Mi hermano y yo",role:"s"},{w:"estamos jugando",role:"v"},{w:"a las cartas.",role:"o"}]},
      {es:"Mi hermano y yo estamos jugando a las cartas.", zh:"我哥哥和我正在玩牌。", chunks:[{w:"Mi hermano y yo",role:"s"},{w:"estamos jugando",role:"v"},{w:"a las cartas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_10", ep:"E2 · 恐龍先生不見了",
    core_ammo:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", core_zh:"我知道了，你們一直在泥巴坑裡跳！",
    be_verb_type:"estar", be_verb_note:"habéis estado + -ando = 一直做到現在的說法，一直在做某事",
    pattern:"Habéis estado [動詞-ndo] en [地點].", pattern_zh:"你們一直在 ___ ___。",
    pattern_note:"habéis estado + -ing形態 = 完成進行式", slots:["動詞-ndo","地點"],
    fire_peppa:{es:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", zh:"我知道了，你們一直在泥巴坑裡跳！", ts:null,
      chunks:[{w:"（我）",role:"s",hideYg:true},{w:"¡Ya lo sé,",role:"v",note:"saber ➔ sé（變化比較特別）+ ya ➔ 意思：我知道了（強調已知）"},{w:"habéis estado saltando",role:"v",note:"saltar ➔ saltando + haber ➔ habéis + estar ➔ estado ➔ 意思：你們一直在跳（一直做到現在的說法）"},{w:"en los charcos de barro!",role:"o"}]},
    fire_daily:[
      {es:"Habéis estado corriendo en el parque.", zh:"你們一直在公園裡跑步。", chunks:[{w:"（你們）",role:"s"},{w:"Habéis estado cantando",role:"v"},{w:"toda la tarde.",role:"o"}]},
      {es:"Habéis estado cantando toda la tarde.", zh:"你們整個下午都在唱歌。", chunks:[{w:"（你們）",role:"s"},{w:"Habéis estado cantando",role:"v"},{w:"toda la tarde.",role:"o"}]}
    ]
  },

  // ══════════ E3 · 最好的朋友 ══════════
  {
    ammo_id:"e3_01", ep:"E3 · 最好的朋友",
    core_ammo:"Peppa está esperando a su mejor amiga, Susi Sheep.", core_zh:"佩佩正在等她最好的朋友蘇西羊。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 正在做的說法，正在等待",
    pattern:"[人] está esperando a [人2].", pattern_zh:"___ 正在等 ___。",
    pattern_note:"está esperando = 正在做的說法", slots:["人","人2"],
    fire_peppa:{es:"Peppa está esperando a su mejor amiga, Susi Sheep.", zh:"佩佩正在等她最好的朋友蘇西羊。", ts:null,
      chunks:[{w:"Peppa",role:"s"},{w:"está esperando",role:"v",note:"esperar ➔ esperando + estar ➔ está ➔ 意思：正在等（進行式，-ing形態 -ando）"},{w:"a su mejor amiga, Susi Sheep.",role:"o"}]},
    fire_daily:[
      {es:"Mamá está esperando el autobús.", zh:"媽媽正在等公車。", chunks:[{w:"（我）",role:"s"},{w:"Estoy esperando",role:"v"},{w:"a mi amigo en la puerta.",role:"o"}]},
      {es:"Estoy esperando a mi amigo en la puerta.", zh:"我正在門口等我朋友。", chunks:[{w:"（我）",role:"s"},{w:"Estoy esperando",role:"v"},{w:"a mi amigo en la puerta.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_02", ep:"E3 · 最好的朋友",
    core_ammo:"Peppa quiere mucho a Susi y Susi quiere mucho a Peppa.", core_zh:"佩佩非常喜歡蘇西，蘇西也非常喜歡佩佩。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人1] quiere mucho a [人2].", pattern_zh:"___ 非常喜歡 ___。",
    pattern_note:"querer a alguien = 喜歡/愛某人，人名前必加 a", slots:["人1","人2"],
    fire_peppa:{es:"Peppa quiere mucho a Susi y Susi quiere mucho a Peppa.", zh:"佩佩非常喜歡蘇西，蘇西也非常喜歡佩佩。", ts:null,
      chunks:[{w:"Peppa",role:"s"},{w:"quiere mucho",role:"v",note:"querer ➔ quiere（「他/她」的說法）+ mucho（強調）➔ 意思：非常喜歡/愛（人名前必加 a）"},{w:"a Susi",role:"o"},{w:"y",role:"c",hideYg:true},{w:"Susi",role:"s"},{w:"quiere mucho",role:"v",note:"querer ➔ quiere（「他/她」的說法）+ mucho（強調）➔ 意思：非常喜歡/愛（人名前必加 a）"},{w:"a Peppa.",role:"o"}]},
    fire_daily:[
      {es:"Yo quiero mucho a mi familia.", zh:"我非常愛我的家人。", chunks:[{w:"George",role:"s"},{w:"quiero mucho",role:"v"},{w:"a su hermana.",role:"o"}]},
      {es:"George quiere mucho a su hermana.", zh:"喬治非常喜歡他姊姊。", chunks:[{w:"George",role:"s"},{w:"quiero mucho",role:"v"},{w:"a su hermana.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_03", ep:"E3 · 最好的朋友",
    core_ammo:"Son las mejores amigas.", core_zh:"她們是最好的朋友。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質關係：Son = 她們是（恆久身分關係）",
    pattern:"Son [形容詞最高級] [名詞複數].", pattern_zh:"她們是 ___ ___。",
    pattern_note:"mejores = mejor 的複數形", slots:["形容詞最高級","名詞複數"],
    fire_peppa:{es:"Son las mejores amigas.", zh:"她們是最好的朋友。", ts:null,
      chunks:[{w:"（她們）",role:"s",hideYg:true},{w:"Son",role:"v",note:"ser ➔ son（「他們」的說法）➔ 意思：她們是（複數身分關係）"},{w:"las mejores amigas.",role:"o"}]},
    fire_daily:[
      {es:"Son los mejores jugadores.", zh:"他們是最好的球員。", chunks:[{w:"（我們）",role:"s"},{w:"Somos",role:"v"},{w:"buenos amigos.",role:"o"}]},
      {es:"Somos buenos amigos.", zh:"我們是好朋友。", chunks:[{w:"（我們）",role:"s"},{w:"Somos",role:"v"},{w:"buenos amigos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_04", ep:"E3 · 最好的朋友",
    core_ammo:"¡No George! Este juego es solo para niñas mayores.", core_zh:"不行喬治！這個遊戲只給大一點的女孩玩。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質規則：es solo para = 只是給…（規則限定）",
    pattern:"Este [名詞] es solo para [對象].", pattern_zh:"這個 ___ 只給 ___。",
    pattern_note:"solo para = 只給、只限", slots:["名詞","對象"],
    fire_peppa:{es:"¡No George! Este juego es solo para niñas mayores.", zh:"不行喬治！這個遊戲只給大一點的女孩玩。", ts:null,
      chunks:[{w:"¡No George!",hideYg:true},{w:"Este juego",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（規則/本質用 ser，solo para = 只給）"},{w:"solo para niñas mayores.",role:"o"}]},
    fire_daily:[
      {es:"Esta silla es solo para mamá.", zh:"這張椅子只給媽媽坐。", chunks:[{w:"Este libro",role:"s"},{w:"es",role:"v"},{w:"solo para adultos.",role:"o"}]},
      {es:"Este libro es solo para adultos.", zh:"這本書只給大人看。", chunks:[{w:"Este libro",role:"s"},{w:"es",role:"v"},{w:"solo para adultos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_05", ep:"E3 · 最好的朋友",
    core_ammo:"¡Soy una princesa salida de un cuento!", core_zh:"我是從故事書裡走出來的公主！",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分：Soy = 我是（角色扮演）",
    pattern:"¡Soy [角色] salida de [來源]!", pattern_zh:"我是從 ___ 走出來的 ___！",
    pattern_note:"salida de = 從…走出來的（陰性形容詞）", slots:["角色","來源"],
    fire_peppa:{es:"¡Soy una princesa salida de un cuento!", zh:"我是從故事書裡走出來的公主！", ts:null,
      chunks:[{w:"（我）",role:"s",hideYg:true},{w:"¡Soy",role:"v",note:"ser ➔ soy（「我」的說法）➔ 意思：我是（角色扮演身分，恆久本質用 ser）"},{w:"una princesa salida de un cuento!",role:"o"}]},
    fire_daily:[
      {es:"¡Soy un superhéroe!", zh:"我是超級英雄！", chunks:[{w:"（我）",role:"s"},{w:"¡Soy",role:"v"},{w:"una doctora muy buena!",role:"o"}]},
      {es:"¡Soy una doctora muy buena!", zh:"我是非常厲害的醫生！", chunks:[{w:"（我）",role:"s"},{w:"¡Soy",role:"v"},{w:"una doctora muy buena!",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_06", ep:"E3 · 最好的朋友",
    core_ammo:"A George no le gusta jugar solo.", core_zh:"喬治不喜歡一個人玩。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A [人] no le gusta [原形動詞].", pattern_zh:"___ 不喜歡 ___。",
    pattern_note:"A + 人 + le gusta = 某人喜歡，西語必學句型", slots:["人","原形動詞"],
    fire_peppa:{es:"A George no le gusta jugar solo.", zh:"喬治不喜歡一個人玩。", ts:null,
      chunks:[{w:"A George",role:"s"},{w:"no le gusta",role:"v",note:"gustar ➔ gusta（「他/她」的說法）+ le（間接受詞）+ no ➔ 意思：不喜歡（倒裝：A+人+le gusta+動詞）"},{w:"jugar solo.",role:"o"}]},
    fire_daily:[
      {es:"A mí no me gusta el café.", zh:"我不喜歡咖啡。", chunks:[{w:"A Susi",role:"s"},{w:"le gusta",role:"v"},{w:"dibujar.",role:"o"}]},
      {es:"A Susi le gusta dibujar.", zh:"蘇西喜歡畫畫。", chunks:[{w:"A Susi",role:"s"},{w:"le gusta",role:"v"},{w:"dibujar.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_07", ep:"E3 · 最好的朋友",
    core_ammo:"Yo seré la doctora y tú serás la enfermera.", core_zh:"我來當醫生，你來當護士。",
    be_verb_type:"ser", be_verb_note:"Ser 以後要做的說法：seré / serás，角色扮演的身分用 Ser",
    pattern:"Yo seré [身份A] y tú serás [身份B].", pattern_zh:"我當 ___，你當 ___。",
    pattern_note:"ser 以後要做的說法：seré / serás / será", slots:["身份A","身份B"],
    fire_peppa:{es:"Yo seré la doctora y tú serás la enfermera.", zh:"我來當醫生，你來當護士。", ts:null,
      chunks:[{w:"Yo",role:"s"},{w:"seré",role:"v",note:"ser ➔ seré（以後要做的說法「我」的說法）➔ 意思：我將是/我來當（未來角色）"},{w:"la doctora",role:"o"},{w:"y",role:"c",hideYg:true},{w:"tú",role:"s"},{w:"serás",role:"v",note:"ser ➔ serás（以後要做的說法「你」的說法）➔ 意思：你將是/你來當"},{w:"la enfermera.",role:"o"}]},
    fire_daily:[
      {es:"Yo seré el chef y tú serás el cliente.", zh:"我來當主廚，你來當客人。", chunks:[{w:"Tú",role:"s"},{w:"serás",role:"v"},{w:"la profesora",role:"o"},{w:"y",role:"c"},{w:"yo",role:"s"},{w:"seré",role:"v"},{w:"el alumno.",role:"o"}]},
      {es:"Tú serás la profesora y yo seré el alumno.", zh:"你來當老師，我來當學生。", chunks:[{w:"Tú",role:"s"},{w:"serás",role:"v"},{w:"la profesora",role:"o"},{w:"y",role:"c"},{w:"yo",role:"s"},{w:"seré",role:"v"},{w:"el alumno.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_08", ep:"E3 · 最好的朋友",
    core_ammo:"Ahora George, respira hondo. Después tose.", core_zh:"現在喬治，深呼吸。然後咳嗽。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人], respira hondo.", pattern_zh:"___，深呼吸。",
    pattern_note:"直接下指令的說法直接用動詞「你」的動詞變化", slots:["人"],
    fire_peppa:{es:"Ahora George, respira hondo. Después tose.", zh:"現在喬治，深呼吸。然後咳嗽。", ts:null,
      chunks:[{w:"Ahora George,",hideYg:true},{w:"respira hondo.",role:"v",note:"respirar ➔ respira（直接下指令的說法，「你」的說法）➔ 意思：深呼吸（hondo = 深）"},{w:"Después",role:"c",hideYg:true},{w:"tose.",role:"v",note:"toser ➔ tose（直接下指令的說法，「你」的說法）➔ 意思：咳嗽（直接命令）"}]},
    fire_daily:[
      {es:"Peppa, respira hondo y cuenta hasta diez.", zh:"佩佩，深呼吸然後數到十。", chunks:[{w:"（你）",role:"s"},{w:"Abre",role:"v"},{w:"la boca, por favor.",role:"o"}]},
      {es:"Abre la boca, por favor.", zh:"請張開嘴巴。", chunks:[{w:"（你）",role:"s"},{w:"Abre",role:"v"},{w:"la boca, por favor.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_09", ep:"E3 · 最好的朋友",
    core_ammo:"Creo que tienes el corazón un poco flojo.", core_zh:"我認為你的心臟有點虛弱。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Creo que tienes [身體部位] un poco [形容詞].", pattern_zh:"我認為你的 ___ 有點 ___。",
    pattern_note:"Creo que = 我認為，後接完整子句", slots:["身體部位","形容詞"],
    fire_peppa:{es:"Creo que tienes el corazón un poco flojo.", zh:"我認為你的心臟有點虛弱。", ts:null,
      chunks:[{w:"（我）",role:"s",hideYg:true},{w:"Creo que",role:"v",note:"creer ➔ creo（「我」的說法）+ que（連接子句）➔ 意思：我認為…（Creo que + 完整句）"},{w:"tienes",role:"v",note:"tener ➔ tienes（「你」的說法）➔ 意思：你有（用於身體感覺：tienes fiebre = 你發燒了）"},{w:"el corazón un poco flojo.",role:"o"}]},
    fire_daily:[
      {es:"Creo que tienes fiebre.", zh:"我認為你發燒了。", chunks:[{w:"（我）",role:"s"},{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"razón.",role:"o"}]},
      {es:"Creo que tienes razón.", zh:"我認為你說得對。", chunks:[{w:"（我）",role:"s"},{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"razón.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_10", ep:"E3 · 最好的朋友",
    core_ammo:"Todos necesitan muchas galletas para curarse.", core_zh:"所有人都需要很多餅乾才能康復。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Todos necesitan [名詞] para [原形動詞].", pattern_zh:"所有人都需要 ___ 才能 ___。",
    pattern_note:"para + 原形動詞 = 為了做某事", slots:["名詞","原形動詞"],
    fire_peppa:{es:"Todos necesitan muchas galletas para curarse.", zh:"所有人都需要很多餅乾才能康復。", ts:null,
      chunks:[{w:"Todos",role:"s"},{w:"necesitan",role:"v",note:"necesitar ➔ necesitan（「他們」的說法）➔ 意思：需要（para + 原形動詞 = 為了做某事）"},{w:"muchas galletas para curarse.",role:"o"}]},
    fire_daily:[
      {es:"Necesitas agua para vivir.", zh:"你需要水才能生存。", chunks:[{w:"（我們）",role:"s"},{w:"Necesitamos",role:"v"},{w:"tiempo para descansar.",role:"o"}]},
      {es:"Necesitamos tiempo para descansar.", zh:"我們需要時間休息。", chunks:[{w:"（我們）",role:"s"},{w:"Necesitamos",role:"v"},{w:"tiempo para descansar.",role:"o"}]}
    ]
  },
];
