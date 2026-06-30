/* ── 語塊彈藥庫資料：S1 E1~E3，每句一張卡，共 30 張 ── */
const AMMO_DATA = [
  // ══════════ E1 · 泥巴坑 ══════════
  {
    ammo_id:"e1_01", ep:"E1 · 泥巴坑",
    core_ammo:"Yo soy Peppa Pig.", core_zh:"我是佩佩豬。",
    be_verb_type:"ser", be_verb_note:"Ser 用在身分本質：Yo soy = 我是（恆久不變的身分）",
    pattern:"Yo soy [身分/名字].", pattern_zh:"我是 ___。",
    pattern_note:"省略 Yo 直接說 Soy 也通，西語常省主詞", slots:["身分/名字"],
    fire_peppa:{es:"Yo soy Peppa Pig.", zh:"我是佩佩豬。",
      chunks:[{word:"Yo",type:"noun"},{word:"soy",type:"verb"},{word:"Peppa",type:"noun"},{word:"Pig.",type:"noun"}]},
    fire_daily:[
      {es:"Yo soy estudiante.", zh:"我是學生。", chunks:[{word:"Yo",type:"noun"},{word:"soy",type:"verb"},{word:"estudiante.",type:"noun"}]},
      {es:"Yo soy de Taiwán.", zh:"我是台灣人。", chunks:[{word:"Yo",type:"noun"},{word:"soy",type:"verb"},{word:"de Taiwán.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_02", ep:"E1 · 泥巴坑",
    core_ammo:"Este es mi hermano pequeño George.", core_zh:"這是我的小弟弟喬治。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分關係：Este es = 這是（介紹某人）",
    pattern:"Este es mi [關係] [名字].", pattern_zh:"這是我的 ___ ___。",
    pattern_note:"Este/Esta 跟著關係詞性別走", slots:["關係","名字"],
    fire_peppa:{es:"Este es mi hermano pequeño George.", zh:"這是我的小弟弟喬治。",
      chunks:[{word:"Este",type:"adj"},{word:"es",type:"verb"},{word:"mi",type:"adj"},{word:"hermano",type:"noun"},{word:"pequeño",type:"adj"},{word:"George.",type:"noun"}]},
    fire_daily:[
      {es:"Esta es mi hermana mayor.", zh:"這是我姊姊。", chunks:[{word:"Esta",type:"adj"},{word:"es",type:"verb"},{word:"mi",type:"adj"},{word:"hermana",type:"noun"},{word:"mayor.",type:"adj"}]},
      {es:"Este es mi amigo Carlos.", zh:"這是我朋友卡洛斯。", chunks:[{word:"Este",type:"adj"},{word:"es",type:"verb"},{word:"mi",type:"adj"},{word:"amigo",type:"noun"},{word:"Carlos.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_03", ep:"E1 · 泥巴坑",
    core_ammo:"Hoy está lloviendo así que no pueden jugar fuera.", core_zh:"今天在下雨，所以不能去外面玩。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando/-iendo = 現在進行式，描述正在發生的事",
    pattern:"Hoy está [動詞-ndo].", pattern_zh:"今天正在 ___。",
    pattern_note:"estar + 現在分詞，暫時性動作", slots:["動詞-ndo"],
    fire_peppa:{es:"Hoy está lloviendo así que no pueden jugar fuera.", zh:"今天在下雨，所以不能去外面玩。",
      chunks:[{word:"Hoy",type:"noun"},{word:"está",type:"verb"},{word:"lloviendo",type:"verb"},{word:"así que",type:"noun"},{word:"no",type:"noun"},{word:"pueden",type:"verb"},{word:"jugar",type:"verb"},{word:"fuera.",type:"noun"}]},
    fire_daily:[
      {es:"Hoy está nevando mucho.", zh:"今天下很大的雪。", chunks:[{word:"Hoy",type:"noun"},{word:"está",type:"verb"},{word:"nevando",type:"verb"},{word:"mucho.",type:"adj"}]},
      {es:"Ahora mismo está sonando el teléfono.", zh:"現在電話正在響。", chunks:[{word:"Ahora mismo",type:"noun"},{word:"está",type:"verb"},{word:"sonando",type:"verb"},{word:"el teléfono.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_04", ep:"E1 · 泥巴坑",
    core_ammo:"¿Podemos salir a jugar?", core_zh:"我們可以出去玩嗎？",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¿Podemos [原形動詞]?", pattern_zh:"我們可以 ___ 嗎？",
    pattern_note:"poder 第一人稱複數，徵求許可", slots:["原形動詞"],
    fire_peppa:{es:"¿Podemos salir a jugar?", zh:"我們可以出去玩嗎？",
      chunks:[{word:"¿Podemos",type:"verb"},{word:"salir",type:"verb"},{word:"a",type:"noun"},{word:"jugar?",type:"verb"}]},
    fire_daily:[
      {es:"¿Podemos comer ahora?", zh:"我們現在可以吃了嗎？", chunks:[{word:"¿Podemos",type:"verb"},{word:"comer",type:"verb"},{word:"ahora?",type:"noun"}]},
      {es:"¿Podemos ver la tele?", zh:"我們可以看電視嗎？", chunks:[{word:"¿Podemos",type:"verb"},{word:"ver",type:"verb"},{word:"la tele?",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_05", ep:"E1 · 泥巴坑",
    core_ammo:"Peppa, debes ponerte las botas de agua.", core_zh:"佩佩，你必須穿上雨靴。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Debes [原形動詞] [受詞].", pattern_zh:"你必須 ___ ___。",
    pattern_note:"deber + 原形動詞 = 義務、必須做", slots:["原形動詞","受詞"],
    fire_peppa:{es:"Peppa, debes ponerte las botas de agua.", zh:"佩佩，你必須穿上雨靴。",
      chunks:[{word:"Peppa,",type:"noun"},{word:"debes",type:"verb"},{word:"ponerte",type:"verb"},{word:"las",type:"adj"},{word:"botas",type:"noun"},{word:"de agua.",type:"noun"}]},
    fire_daily:[
      {es:"Debes lavarte las manos.", zh:"你必須洗手。", chunks:[{word:"Debes",type:"verb"},{word:"lavarte",type:"verb"},{word:"las manos.",type:"noun"}]},
      {es:"Debes hacer la tarea.", zh:"你必須做功課。", chunks:[{word:"Debes",type:"verb"},{word:"hacer",type:"verb"},{word:"la tarea.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_06", ep:"E1 · 泥巴坑",
    core_ammo:"¡Me encanta saltar en los charcos!", core_zh:"我超愛在水坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¡Me encanta [原形動詞]!", pattern_zh:"我超愛 ___！",
    pattern_note:"me encanta 比 me gusta 更強烈", slots:["原形動詞"],
    fire_peppa:{es:"¡Me encanta saltar en los charcos!", zh:"我超愛在水坑裡跳！",
      chunks:[{word:"¡Me",type:"noun"},{word:"encanta",type:"verb"},{word:"saltar",type:"verb"},{word:"en",type:"noun"},{word:"los",type:"adj"},{word:"charcos!",type:"noun"}]},
    fire_daily:[
      {es:"¡Me encanta bailar!", zh:"我超愛跳舞！", chunks:[{word:"¡Me",type:"noun"},{word:"encanta",type:"verb"},{word:"bailar!",type:"verb"}]},
      {es:"¡Me encanta comer helado!", zh:"我超愛吃冰淇淋！", chunks:[{word:"¡Me",type:"noun"},{word:"encanta",type:"verb"},{word:"comer",type:"verb"},{word:"helado!",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_07", ep:"E1 · 泥巴坑",
    core_ammo:"Peppa ha encontrado un charco pequeño.", core_zh:"佩佩找到了一個小水坑。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha encontrado [受詞].", pattern_zh:"___ 找到了 ___。",
    pattern_note:"ha + 過去分詞 = 現在完成式", slots:["人","受詞"],
    fire_peppa:{es:"Peppa ha encontrado un charco pequeño.", zh:"佩佩找到了一個小水坑。",
      chunks:[{word:"Peppa",type:"noun"},{word:"ha",type:"verb"},{word:"encontrado",type:"verb"},{word:"un",type:"adj"},{word:"charco",type:"noun"},{word:"pequeño.",type:"adj"}]},
    fire_daily:[
      {es:"Mamá ha encontrado las llaves.", zh:"媽媽找到鑰匙了。", chunks:[{word:"Mamá",type:"noun"},{word:"ha",type:"verb"},{word:"encontrado",type:"verb"},{word:"las llaves.",type:"noun"}]},
      {es:"He encontrado mi libro.", zh:"我找到我的書了。", chunks:[{word:"He",type:"verb"},{word:"encontrado",type:"verb"},{word:"mi libro.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_08", ep:"E1 · 泥巴坑",
    core_ammo:"¡Ese charco sí que es grande!", core_zh:"那個水坑真的好大！",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質特徵：sí que es = 真的是（強調語氣）",
    pattern:"¡Ese [名詞] sí que es [形容詞]!", pattern_zh:"那個 ___ 真的好 ___！",
    pattern_note:"sí que = 加強語氣，真的、確實", slots:["名詞","形容詞"],
    fire_peppa:{es:"¡Ese charco sí que es grande!", zh:"那個水坑真的好大！",
      chunks:[{word:"¡Ese",type:"adj"},{word:"charco",type:"noun"},{word:"sí que",type:"noun"},{word:"es",type:"verb"},{word:"grande!",type:"adj"}]},
    fire_daily:[
      {es:"¡Esa casa sí que es grande!", zh:"那間房子真的好大！", chunks:[{word:"¡Esa",type:"adj"},{word:"casa",type:"noun"},{word:"sí que",type:"noun"},{word:"es",type:"verb"},{word:"grande!",type:"adj"}]},
      {es:"¡Este pastel sí que es rico!", zh:"這個蛋糕真的好好吃！", chunks:[{word:"¡Este",type:"adj"},{word:"pastel",type:"noun"},{word:"sí que",type:"noun"},{word:"es",type:"verb"},{word:"rico!",type:"adj"}]}
    ]
  },
  {
    ammo_id:"e1_09", ep:"E1 · 泥巴坑",
    core_ammo:"No pasa nada. Sólo es barro.", core_zh:"沒關係，只是泥巴而已。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質：Sólo es = 只是（描述事物本質）",
    pattern:"No pasa nada. Sólo es [名詞].", pattern_zh:"沒關係，只是 ___ 而已。",
    pattern_note:"No pasa nada = 西語最常用的安慰語", slots:["名詞"],
    fire_peppa:{es:"No pasa nada. Sólo es barro.", zh:"沒關係，只是泥巴而已。",
      chunks:[{word:"No",type:"noun"},{word:"pasa",type:"verb"},{word:"nada.",type:"noun"},{word:"Sólo",type:"adj"},{word:"es",type:"verb"},{word:"barro.",type:"noun"}]},
    fire_daily:[
      {es:"No pasa nada. Sólo es agua.", zh:"沒關係，只是水而已。", chunks:[{word:"No",type:"noun"},{word:"pasa",type:"verb"},{word:"nada.",type:"noun"},{word:"Sólo",type:"adj"},{word:"es",type:"verb"},{word:"agua.",type:"noun"}]},
      {es:"No pasa nada. Sólo es un rasguño.", zh:"沒關係，只是擦傷而已。", chunks:[{word:"No",type:"noun"},{word:"pasa",type:"verb"},{word:"nada.",type:"noun"},{word:"Sólo",type:"adj"},{word:"es",type:"verb"},{word:"un rasguño.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e1_10", ep:"E1 · 泥巴坑",
    core_ammo:"A todos les encanta saltar en los charcos de barro.", core_zh:"所有人都超愛在泥巴坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A todos les encanta [原形動詞].", pattern_zh:"所有人都超愛 ___。",
    pattern_note:"encanta 第三人稱複數，les 取代 me", slots:["原形動詞"],
    fire_peppa:{es:"A todos les encanta saltar en los charcos de barro.", zh:"所有人都超愛在泥巴坑裡跳！",
      chunks:[{word:"A todos",type:"noun"},{word:"les",type:"noun"},{word:"encanta",type:"verb"},{word:"saltar",type:"verb"},{word:"en",type:"noun"},{word:"los charcos",type:"noun"},{word:"de barro.",type:"noun"}]},
    fire_daily:[
      {es:"A todos les encanta cantar.", zh:"所有人都超愛唱歌。", chunks:[{word:"A todos",type:"noun"},{word:"les",type:"noun"},{word:"encanta",type:"verb"},{word:"cantar.",type:"verb"}]},
      {es:"A todos les encanta el verano.", zh:"所有人都超愛夏天。", chunks:[{word:"A todos",type:"noun"},{word:"les",type:"noun"},{word:"encanta",type:"verb"},{word:"el verano.",type:"noun"}]}
    ]
  },

  // ══════════ E2 · 恐龍先生不見了 ══════════
  {
    ammo_id:"e2_01", ep:"E2 · 恐龍先生不見了",
    core_ammo:"El juguete favorito de George es el señor Dinosaurio.", core_zh:"喬治最喜歡的玩具是恐龍先生。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分本質：es = 是（介紹事物）",
    pattern:"El juguete favorito de [人] es [名詞].", pattern_zh:"___ 最喜歡的玩具是 ___。",
    pattern_note:"favorito 放在名詞後面，跟英文相反", slots:["人","名詞"],
    fire_peppa:{es:"El juguete favorito de George es el señor Dinosaurio.", zh:"喬治最喜歡的玩具是恐龍先生。",
      chunks:[{word:"El",type:"adj"},{word:"juguete",type:"noun"},{word:"favorito",type:"adj"},{word:"de George",type:"noun"},{word:"es",type:"verb"},{word:"el señor",type:"noun"},{word:"Dinosaurio.",type:"noun"}]},
    fire_daily:[
      {es:"El libro favorito de mi hermana es Harry Potter.", zh:"我姊姊最喜歡的書是哈利波特。", chunks:[{word:"El libro",type:"noun"},{word:"favorito",type:"adj"},{word:"de mi hermana",type:"noun"},{word:"es",type:"verb"},{word:"Harry Potter.",type:"noun"}]},
      {es:"Mi color favorito es el azul.", zh:"我最喜歡的顏色是藍色。", chunks:[{word:"Mi color",type:"noun"},{word:"favorito",type:"adj"},{word:"es",type:"verb"},{word:"el azul.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_02", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Cuando George se va a la cama el señor Dinosaurio se acurruca a su lado.", core_zh:"當喬治上床睡覺時，恐龍先生就蜷縮在他身旁。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Cuando [人] se va a la cama...", pattern_zh:"當 ___ 上床睡覺時…",
    pattern_note:"se va a la cama = 去睡覺，反身動詞片語", slots:["人"],
    fire_peppa:{es:"Cuando George se va a la cama el señor Dinosaurio se acurruca a su lado.", zh:"當喬治上床睡覺時，恐龍先生就蜷縮在他身旁。",
      chunks:[{word:"Cuando",type:"noun"},{word:"George",type:"noun"},{word:"se va",type:"verb"},{word:"a la cama",type:"noun"},{word:"el señor Dinosaurio",type:"noun"},{word:"se acurruca",type:"verb"},{word:"a su lado.",type:"noun"}]},
    fire_daily:[
      {es:"Cuando mamá se va a la cama, apaga la luz.", zh:"當媽媽上床睡覺時，她會關燈。", chunks:[{word:"Cuando",type:"noun"},{word:"mamá",type:"noun"},{word:"se va",type:"verb"},{word:"a la cama,",type:"noun"},{word:"apaga",type:"verb"},{word:"la luz.",type:"noun"}]},
      {es:"Yo me voy a la cama a las nueve.", zh:"我九點去睡覺。", chunks:[{word:"Yo",type:"noun"},{word:"me voy",type:"verb"},{word:"a la cama",type:"noun"},{word:"a las nueve.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_03", ep:"E2 · 恐龍先生不見了",
    core_ammo:"George ha perdido al señor Dinosaurio.", core_zh:"喬治把恐龍先生弄丟了。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha perdido [受詞].", pattern_zh:"___ 把 ___ 弄丟了。",
    pattern_note:"ha perdido = 已經弄丟了（現在完成式）", slots:["人","受詞"],
    fire_peppa:{es:"George ha perdido al señor Dinosaurio.", zh:"喬治把恐龍先生弄丟了。",
      chunks:[{word:"George",type:"noun"},{word:"ha",type:"verb"},{word:"perdido",type:"verb"},{word:"al",type:"adj"},{word:"señor",type:"noun"},{word:"Dinosaurio.",type:"noun"}]},
    fire_daily:[
      {es:"He perdido mi mochila.", zh:"我把我的書包弄丟了。", chunks:[{word:"He",type:"verb"},{word:"perdido",type:"verb"},{word:"mi mochila.",type:"noun"}]},
      {es:"Papá ha perdido las llaves del coche.", zh:"爸爸把車鑰匙弄丟了。", chunks:[{word:"Papá",type:"noun"},{word:"ha",type:"verb"},{word:"perdido",type:"verb"},{word:"las llaves",type:"noun"},{word:"del coche.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_04", ep:"E2 · 恐龍先生不見了",
    core_ammo:"No te preocupes George, entre todos lo encontraremos.", core_zh:"不要擔心喬治，我們大家一起會找到牠的。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"No te preocupes, [理由].", pattern_zh:"不要擔心，___。",
    pattern_note:"No te preocupes = 反身動詞命令式，安慰用語", slots:["理由"],
    fire_peppa:{es:"No te preocupes George, entre todos lo encontraremos.", zh:"不要擔心喬治，我們大家一起會找到牠的。",
      chunks:[{word:"No te",type:"noun"},{word:"preocupes",type:"verb"},{word:"George,",type:"noun"},{word:"entre todos",type:"noun"},{word:"lo",type:"noun"},{word:"encontraremos.",type:"verb"}]},
    fire_daily:[
      {es:"No te preocupes, todo va a salir bien.", zh:"不要擔心，一切都會順利的。", chunks:[{word:"No te",type:"noun"},{word:"preocupes,",type:"verb"},{word:"todo",type:"noun"},{word:"va a salir",type:"verb"},{word:"bien.",type:"adj"}]},
      {es:"No te preocupes por el examen.", zh:"不要為考試擔心。", chunks:[{word:"No te",type:"noun"},{word:"preocupes",type:"verb"},{word:"por el examen.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_05", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Un detective es una persona muy buena encontrando cosas.", core_zh:"偵探是一個非常擅長找東西的人。",
    be_verb_type:"ser", be_verb_note:"Ser 定義身分職業：detective es = 偵探是…（本質定義）",
    pattern:"Un [職業] es una persona muy buena [動名詞].", pattern_zh:"___ 是一個非常擅長 ___ 的人。",
    pattern_note:"muy buena + 動名詞 = 非常擅長於做某事", slots:["職業","動名詞"],
    fire_peppa:{es:"Un detective es una persona muy buena encontrando cosas.", zh:"偵探是一個非常擅長找東西的人。",
      chunks:[{word:"Un",type:"adj"},{word:"detective",type:"noun"},{word:"es",type:"verb"},{word:"una persona",type:"noun"},{word:"muy",type:"adj"},{word:"buena",type:"adj"},{word:"encontrando",type:"verb"},{word:"cosas.",type:"noun"}]},
    fire_daily:[
      {es:"Un profesor es una persona muy buena explicando cosas.", zh:"老師是一個非常擅長解釋事情的人。", chunks:[{word:"Un profesor",type:"noun"},{word:"es",type:"verb"},{word:"una persona",type:"noun"},{word:"muy buena",type:"adj"},{word:"explicando",type:"verb"},{word:"cosas.",type:"noun"}]},
      {es:"Mi abuela es muy buena cocinando.", zh:"我奶奶非常擅長煮飯。", chunks:[{word:"Mi abuela",type:"noun"},{word:"es",type:"verb"},{word:"muy buena",type:"adj"},{word:"cocinando.",type:"verb"}]}
    ]
  },
  {
    ammo_id:"e2_06", ep:"E2 · 恐龍先生不見了",
    core_ammo:"George siempre se trae al señor Dinosaurio a la bañera.", core_zh:"喬治總是帶著恐龍先生去洗澡。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] siempre se trae [物] a [地點].", pattern_zh:"___ 總是帶著 ___ 去 ___。",
    pattern_note:"siempre 放在動詞前，表頻率", slots:["人","物","地點"],
    fire_peppa:{es:"George siempre se trae al señor Dinosaurio a la bañera.", zh:"喬治總是帶著恐龍先生去洗澡。",
      chunks:[{word:"George",type:"noun"},{word:"siempre",type:"adj"},{word:"se trae",type:"verb"},{word:"al señor",type:"noun"},{word:"Dinosaurio",type:"noun"},{word:"a la bañera.",type:"noun"}]},
    fire_daily:[
      {es:"Yo siempre me traigo un libro a la escuela.", zh:"我總是帶一本書去學校。", chunks:[{word:"Yo",type:"noun"},{word:"siempre",type:"adj"},{word:"me traigo",type:"verb"},{word:"un libro",type:"noun"},{word:"a la escuela.",type:"noun"}]},
      {es:"Susi siempre se trae su muñeca al parque.", zh:"蘇西總是帶她的娃娃去公園。", chunks:[{word:"Susi",type:"noun"},{word:"siempre",type:"adj"},{word:"se trae",type:"verb"},{word:"su muñeca",type:"noun"},{word:"al parque.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_07", ep:"E2 · 恐龍先生不見了",
    core_ammo:"¡Ya lo sé dónde está el señor Dinosaurio!", core_zh:"我知道恐龍先生在哪裡了！",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：dónde está = 在哪裡（位置用 estar）",
    pattern:"¡Ya lo sé dónde está [名詞]!", pattern_zh:"我知道 ___ 在哪裡了！",
    pattern_note:"Ya lo sé = 我知道了，ya 表示已然發生", slots:["名詞"],
    fire_peppa:{es:"¡Ya lo sé dónde está el señor Dinosaurio!", zh:"我知道恐龍先生在哪裡了！",
      chunks:[{word:"¡Ya",type:"adj"},{word:"lo sé",type:"verb"},{word:"dónde está",type:"verb"},{word:"el señor",type:"noun"},{word:"Dinosaurio!",type:"noun"}]},
    fire_daily:[
      {es:"¡Ya lo sé dónde está mi mochila!", zh:"我知道我的書包在哪裡了！", chunks:[{word:"¡Ya",type:"adj"},{word:"lo sé",type:"verb"},{word:"dónde está",type:"verb"},{word:"mi mochila!",type:"noun"}]},
      {es:"¡Ya lo sé dónde está el gato!", zh:"我知道貓在哪裡了！", chunks:[{word:"¡Ya",type:"adj"},{word:"lo sé",type:"verb"},{word:"dónde está",type:"verb"},{word:"el gato!",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_08", ep:"E2 · 恐龍先生不見了",
    core_ammo:"El señor Dinosaurio no está en la cama de George.", core_zh:"恐龍先生不在喬治的床上。",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：no está en = 不在（estar 管位置）",
    pattern:"[名詞] no está en [地點].", pattern_zh:"___ 不在 ___。",
    pattern_note:"口訣：SER = 本質身分；ESTAR = 位置狀態", slots:["名詞","地點"],
    fire_peppa:{es:"El señor Dinosaurio no está en la cama de George.", zh:"恐龍先生不在喬治的床上。",
      chunks:[{word:"El señor",type:"noun"},{word:"Dinosaurio",type:"noun"},{word:"no está",type:"verb"},{word:"en",type:"noun"},{word:"la cama",type:"noun"},{word:"de George.",type:"noun"}]},
    fire_daily:[
      {es:"El gato no está en la cocina.", zh:"貓不在廚房。", chunks:[{word:"El gato",type:"noun"},{word:"no está",type:"verb"},{word:"en la cocina.",type:"noun"}]},
      {es:"Mis llaves no están en la mesa.", zh:"我的鑰匙不在桌上。", chunks:[{word:"Mis llaves",type:"noun"},{word:"no están",type:"verb"},{word:"en la mesa.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_09", ep:"E2 · 恐龍先生不見了",
    core_ammo:"Peppa y papá Pig están jugando a las damas.", core_zh:"佩佩和豬爸爸正在下西洋棋。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 現在進行式，正在做某事",
    pattern:"[人] están jugando a [遊戲].", pattern_zh:"___ 正在玩 ___。",
    pattern_note:"están jugando = 現在進行式複數", slots:["人","遊戲"],
    fire_peppa:{es:"Peppa y papá Pig están jugando a las damas.", zh:"佩佩和豬爸爸正在下西洋棋。",
      chunks:[{word:"Peppa",type:"noun"},{word:"y",type:"noun"},{word:"papá Pig",type:"noun"},{word:"están",type:"verb"},{word:"jugando",type:"verb"},{word:"a las damas.",type:"noun"}]},
    fire_daily:[
      {es:"Los niños están jugando al fútbol.", zh:"孩子們正在踢足球。", chunks:[{word:"Los niños",type:"noun"},{word:"están",type:"verb"},{word:"jugando",type:"verb"},{word:"al fútbol.",type:"noun"}]},
      {es:"Mi hermano y yo estamos jugando a las cartas.", zh:"我哥哥和我正在玩牌。", chunks:[{word:"Mi hermano",type:"noun"},{word:"y yo",type:"noun"},{word:"estamos",type:"verb"},{word:"jugando",type:"verb"},{word:"a las cartas.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e2_10", ep:"E2 · 恐龍先生不見了",
    core_ammo:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", core_zh:"我知道了，你們一直在泥巴坑裡跳！",
    be_verb_type:"estar", be_verb_note:"habéis estado + -ando = 現在完成進行式，一直在做某事",
    pattern:"Habéis estado [動詞-ndo] en [地點].", pattern_zh:"你們一直在 ___ ___。",
    pattern_note:"habéis estado + 動名詞 = 完成進行式", slots:["動詞-ndo","地點"],
    fire_peppa:{es:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", zh:"我知道了，你們一直在泥巴坑裡跳！",
      chunks:[{word:"¡Ya lo sé,",type:"verb"},{word:"habéis",type:"verb"},{word:"estado",type:"verb"},{word:"saltando",type:"verb"},{word:"en los charcos",type:"noun"},{word:"de barro!",type:"noun"}]},
    fire_daily:[
      {es:"Habéis estado corriendo en el parque.", zh:"你們一直在公園裡跑步。", chunks:[{word:"Habéis",type:"verb"},{word:"estado",type:"verb"},{word:"corriendo",type:"verb"},{word:"en el parque.",type:"noun"}]},
      {es:"Habéis estado cantando toda la tarde.", zh:"你們整個下午都在唱歌。", chunks:[{word:"Habéis",type:"verb"},{word:"estado",type:"verb"},{word:"cantando",type:"verb"},{word:"toda la tarde.",type:"noun"}]}
    ]
  },

  // ══════════ E3 · 最好的朋友 ══════════
  {
    ammo_id:"e3_01", ep:"E3 · 最好的朋友",
    core_ammo:"Peppa está esperando a su mejor amiga, Susi Sheep.", core_zh:"佩佩正在等她最好的朋友蘇西羊。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 現在進行式，正在等待",
    pattern:"[人] está esperando a [人2].", pattern_zh:"___ 正在等 ___。",
    pattern_note:"está esperando = 現在進行式", slots:["人","人2"],
    fire_peppa:{es:"Peppa está esperando a su mejor amiga, Susi Sheep.", zh:"佩佩正在等她最好的朋友蘇西羊。",
      chunks:[{word:"Peppa",type:"noun"},{word:"está",type:"verb"},{word:"esperando",type:"verb"},{word:"a su",type:"noun"},{word:"mejor",type:"adj"},{word:"amiga,",type:"noun"},{word:"Susi Sheep.",type:"noun"}]},
    fire_daily:[
      {es:"Mamá está esperando el autobús.", zh:"媽媽正在等公車。", chunks:[{word:"Mamá",type:"noun"},{word:"está",type:"verb"},{word:"esperando",type:"verb"},{word:"el autobús.",type:"noun"}]},
      {es:"Estoy esperando a mi amigo en la puerta.", zh:"我正在門口等我朋友。", chunks:[{word:"Estoy",type:"verb"},{word:"esperando",type:"verb"},{word:"a mi amigo",type:"noun"},{word:"en la puerta.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_02", ep:"E3 · 最好的朋友",
    core_ammo:"Peppa quiere mucho a Susi y Susi quiere mucho a Peppa.", core_zh:"佩佩非常喜歡蘇西，蘇西也非常喜歡佩佩。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人1] quiere mucho a [人2].", pattern_zh:"___ 非常喜歡 ___。",
    pattern_note:"querer a alguien = 喜歡/愛某人，人名前必加 a", slots:["人1","人2"],
    fire_peppa:{es:"Peppa quiere mucho a Susi y Susi quiere mucho a Peppa.", zh:"佩佩非常喜歡蘇西，蘇西也非常喜歡佩佩。",
      chunks:[{word:"Peppa",type:"noun"},{word:"quiere",type:"verb"},{word:"mucho",type:"adj"},{word:"a Susi",type:"noun"},{word:"y",type:"noun"},{word:"Susi",type:"noun"},{word:"quiere",type:"verb"},{word:"mucho",type:"adj"},{word:"a Peppa.",type:"noun"}]},
    fire_daily:[
      {es:"Yo quiero mucho a mi familia.", zh:"我非常愛我的家人。", chunks:[{word:"Yo",type:"noun"},{word:"quiero",type:"verb"},{word:"mucho",type:"adj"},{word:"a mi familia.",type:"noun"}]},
      {es:"George quiere mucho a su hermana.", zh:"喬治非常喜歡他姊姊。", chunks:[{word:"George",type:"noun"},{word:"quiere",type:"verb"},{word:"mucho",type:"adj"},{word:"a su hermana.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_03", ep:"E3 · 最好的朋友",
    core_ammo:"Son las mejores amigas.", core_zh:"她們是最好的朋友。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質關係：Son = 她們是（恆久身分關係）",
    pattern:"Son [形容詞最高級] [名詞複數].", pattern_zh:"她們是 ___ ___。",
    pattern_note:"mejores = mejor 的複數形", slots:["形容詞最高級","名詞複數"],
    fire_peppa:{es:"Son las mejores amigas.", zh:"她們是最好的朋友。",
      chunks:[{word:"Son",type:"verb"},{word:"las",type:"adj"},{word:"mejores",type:"adj"},{word:"amigas.",type:"noun"}]},
    fire_daily:[
      {es:"Son los mejores jugadores.", zh:"他們是最好的球員。", chunks:[{word:"Son",type:"verb"},{word:"los mejores",type:"adj"},{word:"jugadores.",type:"noun"}]},
      {es:"Somos buenos amigos.", zh:"我們是好朋友。", chunks:[{word:"Somos",type:"verb"},{word:"buenos",type:"adj"},{word:"amigos.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_04", ep:"E3 · 最好的朋友",
    core_ammo:"¡No George! Este juego es solo para niñas mayores.", core_zh:"不行喬治！這個遊戲只給大一點的女孩玩。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質規則：es solo para = 只是給…（規則限定）",
    pattern:"Este [名詞] es solo para [對象].", pattern_zh:"這個 ___ 只給 ___。",
    pattern_note:"solo para = 只給、只限", slots:["名詞","對象"],
    fire_peppa:{es:"¡No George! Este juego es solo para niñas mayores.", zh:"不行喬治！這個遊戲只給大一點的女孩玩。",
      chunks:[{word:"¡No",type:"noun"},{word:"George!",type:"noun"},{word:"Este",type:"adj"},{word:"juego",type:"noun"},{word:"es",type:"verb"},{word:"solo para",type:"adj"},{word:"niñas",type:"noun"},{word:"mayores.",type:"adj"}]},
    fire_daily:[
      {es:"Esta silla es solo para mamá.", zh:"這張椅子只給媽媽坐。", chunks:[{word:"Esta",type:"adj"},{word:"silla",type:"noun"},{word:"es",type:"verb"},{word:"solo para",type:"adj"},{word:"mamá.",type:"noun"}]},
      {es:"Este libro es solo para adultos.", zh:"這本書只給大人看。", chunks:[{word:"Este",type:"adj"},{word:"libro",type:"noun"},{word:"es",type:"verb"},{word:"solo para",type:"adj"},{word:"adultos.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_05", ep:"E3 · 最好的朋友",
    core_ammo:"¡Soy una princesa salida de un cuento!", core_zh:"我是從故事書裡走出來的公主！",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分：Soy = 我是（角色扮演）",
    pattern:"¡Soy [角色] salida de [來源]!", pattern_zh:"我是從 ___ 走出來的 ___！",
    pattern_note:"salida de = 從…走出來的（陰性形容詞）", slots:["角色","來源"],
    fire_peppa:{es:"¡Soy una princesa salida de un cuento!", zh:"我是從故事書裡走出來的公主！",
      chunks:[{word:"¡Soy",type:"verb"},{word:"una",type:"adj"},{word:"princesa",type:"noun"},{word:"salida",type:"adj"},{word:"de un cuento!",type:"noun"}]},
    fire_daily:[
      {es:"¡Soy un superhéroe!", zh:"我是超級英雄！", chunks:[{word:"¡Soy",type:"verb"},{word:"un superhéroe!",type:"noun"}]},
      {es:"¡Soy una doctora muy buena!", zh:"我是非常厲害的醫生！", chunks:[{word:"¡Soy",type:"verb"},{word:"una doctora",type:"noun"},{word:"muy buena!",type:"adj"}]}
    ]
  },
  {
    ammo_id:"e3_06", ep:"E3 · 最好的朋友",
    core_ammo:"A George no le gusta jugar solo.", core_zh:"喬治不喜歡一個人玩。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A [人] no le gusta [原形動詞].", pattern_zh:"___ 不喜歡 ___。",
    pattern_note:"A + 人 + le gusta = 某人喜歡，西語必學句型", slots:["人","原形動詞"],
    fire_peppa:{es:"A George no le gusta jugar solo.", zh:"喬治不喜歡一個人玩。",
      chunks:[{word:"A George",type:"noun"},{word:"no",type:"noun"},{word:"le gusta",type:"verb"},{word:"jugar",type:"verb"},{word:"solo.",type:"adj"}]},
    fire_daily:[
      {es:"A mí no me gusta el café.", zh:"我不喜歡咖啡。", chunks:[{word:"A mí",type:"noun"},{word:"no",type:"noun"},{word:"me gusta",type:"verb"},{word:"el café.",type:"noun"}]},
      {es:"A Susi le gusta dibujar.", zh:"蘇西喜歡畫畫。", chunks:[{word:"A Susi",type:"noun"},{word:"le gusta",type:"verb"},{word:"dibujar.",type:"verb"}]}
    ]
  },
  {
    ammo_id:"e3_07", ep:"E3 · 最好的朋友",
    core_ammo:"Yo seré la doctora y tú serás la enfermera.", core_zh:"我來當醫生，你來當護士。",
    be_verb_type:"ser", be_verb_note:"Ser 未來式：seré / serás，角色扮演的身分用 Ser",
    pattern:"Yo seré [身份A] y tú serás [身份B].", pattern_zh:"我當 ___，你當 ___。",
    pattern_note:"ser 未來式：seré / serás / será", slots:["身份A","身份B"],
    fire_peppa:{es:"Yo seré la doctora y tú serás la enfermera.", zh:"我來當醫生，你來當護士。",
      chunks:[{word:"Yo",type:"noun"},{word:"seré",type:"verb"},{word:"la doctora",type:"noun"},{word:"y tú",type:"noun"},{word:"serás",type:"verb"},{word:"la enfermera.",type:"noun"}]},
    fire_daily:[
      {es:"Yo seré el chef y tú serás el cliente.", zh:"我來當主廚，你來當客人。", chunks:[{word:"Yo",type:"noun"},{word:"seré",type:"verb"},{word:"el chef",type:"noun"},{word:"y tú",type:"noun"},{word:"serás",type:"verb"},{word:"el cliente.",type:"noun"}]},
      {es:"Tú serás la profesora y yo seré el alumno.", zh:"你來當老師，我來當學生。", chunks:[{word:"Tú",type:"noun"},{word:"serás",type:"verb"},{word:"la profesora",type:"noun"},{word:"y yo",type:"noun"},{word:"seré",type:"verb"},{word:"el alumno.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_08", ep:"E3 · 最好的朋友",
    core_ammo:"Ahora George, respira hondo. Después tose.", core_zh:"現在喬治，深呼吸。然後咳嗽。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人], respira hondo.", pattern_zh:"___，深呼吸。",
    pattern_note:"命令式直接用動詞現在式第二人稱", slots:["人"],
    fire_peppa:{es:"Ahora George, respira hondo. Después tose.", zh:"現在喬治，深呼吸。然後咳嗽。",
      chunks:[{word:"Ahora",type:"noun"},{word:"George,",type:"noun"},{word:"respira",type:"verb"},{word:"hondo.",type:"adj"},{word:"Después",type:"noun"},{word:"tose.",type:"verb"}]},
    fire_daily:[
      {es:"Peppa, respira hondo y cuenta hasta diez.", zh:"佩佩，深呼吸然後數到十。", chunks:[{word:"Peppa,",type:"noun"},{word:"respira",type:"verb"},{word:"hondo",type:"adj"},{word:"y cuenta",type:"verb"},{word:"hasta diez.",type:"noun"}]},
      {es:"Abre la boca, por favor.", zh:"請張開嘴巴。", chunks:[{word:"Abre",type:"verb"},{word:"la boca,",type:"noun"},{word:"por favor.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_09", ep:"E3 · 最好的朋友",
    core_ammo:"Creo que tienes el corazón un poco flojo.", core_zh:"我認為你的心臟有點虛弱。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Creo que tienes [身體部位] un poco [形容詞].", pattern_zh:"我認為你的 ___ 有點 ___。",
    pattern_note:"Creo que = 我認為，後接完整子句", slots:["身體部位","形容詞"],
    fire_peppa:{es:"Creo que tienes el corazón un poco flojo.", zh:"我認為你的心臟有點虛弱。",
      chunks:[{word:"Creo que",type:"verb"},{word:"tienes",type:"verb"},{word:"el corazón",type:"noun"},{word:"un poco",type:"adj"},{word:"flojo.",type:"adj"}]},
    fire_daily:[
      {es:"Creo que tienes fiebre.", zh:"我認為你發燒了。", chunks:[{word:"Creo que",type:"verb"},{word:"tienes",type:"verb"},{word:"fiebre.",type:"noun"}]},
      {es:"Creo que tienes razón.", zh:"我認為你說得對。", chunks:[{word:"Creo que",type:"verb"},{word:"tienes",type:"verb"},{word:"razón.",type:"noun"}]}
    ]
  },
  {
    ammo_id:"e3_10", ep:"E3 · 最好的朋友",
    core_ammo:"Todos necesitan muchas galletas para curarse.", core_zh:"所有人都需要很多餅乾才能康復。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Todos necesitan [名詞] para [原形動詞].", pattern_zh:"所有人都需要 ___ 才能 ___。",
    pattern_note:"para + 原形動詞 = 為了做某事", slots:["名詞","原形動詞"],
    fire_peppa:{es:"Todos necesitan muchas galletas para curarse.", zh:"所有人都需要很多餅乾才能康復。",
      chunks:[{word:"Todos",type:"noun"},{word:"necesitan",type:"verb"},{word:"muchas",type:"adj"},{word:"galletas",type:"noun"},{word:"para",type:"noun"},{word:"curarse.",type:"verb"}]},
    fire_daily:[
      {es:"Necesitas agua para vivir.", zh:"你需要水才能生存。", chunks:[{word:"Necesitas",type:"verb"},{word:"agua",type:"noun"},{word:"para",type:"noun"},{word:"vivir.",type:"verb"}]},
      {es:"Necesitamos tiempo para descansar.", zh:"我們需要時間休息。", chunks:[{word:"Necesitamos",type:"verb"},{word:"tiempo",type:"noun"},{word:"para",type:"noun"},{word:"descansar.",type:"verb"}]}
    ]
  },
];
