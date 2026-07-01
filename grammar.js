/* ── 文法酷庫資料：從 S1 E1~E3 課文萃取 ── */

/* 人稱中文化 ROUND7 */
const PERSON_LABEL_ZH = {
  yo:'我', tú:'你', él:'他', ella:'她',
  nosotros:'我們', nosotras:'我們',
  vosotros:'你們', vosotras:'你們',
  ellos:'他們', ellas:'她們',
  usted:'您', ustedes:'您們'
};
const CONJ_ORDER_ZH = ['我','你','他/她','我們','你們','他們'];

const GRAMMAR_CATS = [
  {key:"all",          label:"全部"},
  {key:"ser-estar",    label:"SER vs ESTAR"},
  {key:"tense",        label:"時態"},
  {key:"gustar",       label:"Gustar 句型"},
  {key:"verb-pattern", label:"動詞句型"},
  {key:"phrase",       label:"固定用語"}
];


const GRAMMAR_DATA = [

  // ══ SER vs ESTAR ══

  {
    id:"g01", cat:"ser-estar",
    title:"SER：身分與本質",
    rule:"SER 描述恆久不變的特質：身分、職業、國籍、關係、本質描述。",
    examples:[
      {es:"Yo soy Peppa Pig.", zh:"我是佩佩豬。（身分）"},
      {es:"Este es mi hermano pequeño.", zh:"這是我的小弟弟。（關係）"},
      {es:"Son las mejores amigas.", zh:"她們是最好的朋友。（本質關係）"}
    ],
    trap:"「她在廚房」= Está en la cocina，位置要用 ESTAR，不用 SER！",
    source:"E1·S1 / E1·S2 / E3·S3"
  },

  {
    id:"g02", cat:"ser-estar",
    title:"ESTAR：位置與狀態",
    rule:"ESTAR 描述暫時性的狀態、位置，或正在進行的動作。",
    examples:[
      {es:"El señor Dinosaurio no está en la cama de George.", zh:"恐龍先生不在喬治的床上。（位置）"},
      {es:"Peppa está esperando a Susi Sheep.", zh:"佩佩正在等蘇西羊。（進行中）"},
      {es:"Estoy cansada.", zh:"我現在很累。（暫時狀態）"}
    ],
    trap:"口訣：SER = 本質身分（永久）；ESTAR = 位置狀態（暫時）",
    source:"E2·S8 / E3·S1"
  },

  {
    id:"g03", cat:"ser-estar",
    title:"ESTAR + -ando：正在做某事",
    rule:"ESTAR（正確人稱）+ 動詞字尾改成 -ando / -iendo = 正在做某事。就像英文的 -ing！",
    examples:[
      {es:"Hoy está lloviendo.", zh:"今天正在下雨。（está + llovier → lloviendo）"},
      {es:"Peppa y papá Pig están jugando a las damas.", zh:"佩佩和豬爸爸正在下棋。（están + jugar → jugando）"},
      {es:"Estoy esperando el autobús.", zh:"我正在等公車。（estoy + esperar → esperando）"}
    ],
    trap:"-ar 動詞字尾換 -ando（jugar → jugando）；-er/-ir 動詞字尾換 -iendo（comer → comiendo）",
    source:"E1·S3 / E2·S9 / E3·S1"
  },

  {
    id:"g04", cat:"ser-estar",
    title:"SER vs ESTAR + 形容詞：意思大不同！",
    rule:"同一個形容詞接 SER 或 ESTAR，意思會完全不同！SER = 本質；ESTAR = 當下狀態。",
    examples:[
      {es:"La sopa es buena.", zh:"這是好湯。（SER：本質評價）"},
      {es:"La sopa está buena.", zh:"這湯現在很好喝。（ESTAR：當下狀態）"},
      {es:"Soy aburrida. vs Estoy aburrida.", zh:"我是無聊的人（SER）vs 我現在很無聊（ESTAR）"}
    ],
    trap:"問自己：這是「天生/本質」的特質，還是「當下/暫時」的狀態？",
    source:"E1~E3 綜合"
  },

  // ══ 時態 ══

  {
    id:"g05", cat:"tense",
    title:"現在完成式：haber + 動詞-ado/-ido形",
    rule:"haber（助動詞）+ 動詞-ado/-ido形 = 「已經做了某事」，結果跟現在有關。",
    examples:[
      {es:"Peppa ha encontrado un charco pequeño.", zh:"佩佩找到了一個小水坑。（ha + encontrado）"},
      {es:"George ha perdido al señor Dinosaurio.", zh:"喬治把恐龍先生弄丟了。（ha + perdido）"},
      {es:"He perdido mi mochila.", zh:"我把我的書包弄丟了。（第一人稱用 he）"}
    ],
    trap:"字尾規則：-ar → -ado（encontrar→encontrado）；-er/-ir → -ido（perder→perdido）",
    source:"E1·S7 / E2·S3"
  },

  {
    id:"g06", cat:"tense",
    title:"現在完成進行式：haber + estado + -ando",
    rule:"haber + estado + 動詞 -ando = 「一直在做某事」，動作持續到現在。",
    examples:[
      {es:"Habéis estado saltando en los charcos de barro.", zh:"你們一直在泥巴坑裡跳。"},
      {es:"He estado estudiando toda la tarde.", zh:"我整個下午都在念書。"},
      {es:"Mamá ha estado cocinando.", zh:"媽媽一直在煮飯。"}
    ],
    trap:"habéis = 你們（西班牙用法）；拉美用 han。英語對應：have been + -ing",
    source:"E2·S10"
  },

  {
    id:"g07", cat:"tense",
    title:"SER 未來式：seré / serás / será",
    rule:"SER 動詞的未來式，表示「將成為」某種身分或角色，常用於角色扮演或預測。",
    examples:[
      {es:"Yo seré la doctora y tú serás la enfermera.", zh:"我來當醫生，你來當護士。"},
      {es:"Tú serás una estrella.", zh:"你將成為一顆明星。"},
      {es:"¿Qué serás de mayor?", zh:"你長大想做什麼？（字面：你將成為什麼？）"}
    ],
    trap:"SER 未來式：seré / serás / será / seremos / seréis / serán",
    source:"E3·S7"
  },

  // ══ Gustar 句型 ══

  {
    id:"g08", cat:"gustar",
    title:"Me gusta vs Me encanta：喜歡的程度",
    rule:"Me gusta = 我喜歡（普通）；Me encanta = 我超愛（更強烈）。動詞跟著事物的單複數走。",
    examples:[
      {es:"Me gusta el chocolate.", zh:"我喜歡巧克力。（單數 → gusta）"},
      {es:"Me encanta saltar en los charcos.", zh:"我超愛在水坑裡跳。"},
      {es:"Me gustan las galletas.", zh:"我喜歡餅乾。（複數 → gustan）"},
      {es:"No me gusta la lluvia.", zh:"我不喜歡下雨。（否定：前面加 no）"},
      {es:"¿Te gusta el chocolate?", zh:"你喜歡巧克力嗎？（問句：me換成 te）"}
    ],
    trap:"動詞跟著「被喜歡的事物」走，不跟說話者：Me gusta（單）vs Me gustan（複）",
    source:"E1·S6 / E1·S10"
  },

  {
    id:"g09", cat:"gustar",
    title:"A + 人 + le gusta：某人喜歡",
    rule:"A + 人名或代名詞 + le/les + gusta(n) + 名詞或原形動詞。",
    examples:[
      {es:"A George no le gusta jugar solo.", zh:"喬治不喜歡一個人玩。"},
      {es:"A todos les encanta saltar en los charcos.", zh:"所有人都超愛在水坑裡跳。"},
      {es:"A mí me gusta el café.", zh:"我喜歡咖啡。（加 a mí 是為了強調）"}
    ],
    trap:"代名詞對應：a mí me / a ti te / a él,ella le / a nosotros nos / a vosotros os / a ellos les",
    source:"E3·S6 / E1·S10"
  },

  // ══ 動詞句型 ══

  {
    id:"g10", cat:"verb-pattern",
    title:"¿Podemos + infinitive?：我們可以…嗎？",
    rule:"poder（能夠）徵求／許可／詢問可能性。我們能夠 podemos + 原形動詞",
    examples:[
      {es:"¿Podemos salir a jugar?", zh:"我們可以出去玩嗎？"},
      {es:"¿Podemos comer ahora?", zh:"我們現在可以吃了嗎？"},
      {es:"¿Podemos ver la tele?", zh:"我們可以看電視嗎？"}
    ],
    trap:"poder 有不規則變化：puedo / puedes / puede / podemos / podéis / pueden",
    source:"E1·S4"
  },

  {
    id:"g11", cat:"verb-pattern",
    title:"Deber + infinitive：你應該、必須",
    rule:"deber（義務）+ 原形動詞 = 應該做、必須做某事。",
    examples:[
      {es:"Debes ponerte las botas de agua.", zh:"你必須穿上雨靴。"},
      {es:"Debes lavarte las manos.", zh:"你必須洗手。"},
      {es:"Debemos respetar las reglas.", zh:"我們應該遵守規則。"}
    ],
    trap:"deber 變化：debo / debes / debe / debemos / debéis / deben",
    source:"E1·S5"
  },

  {
    id:"g12", cat:"verb-pattern",
    title:"Para + infinitive：為了做某事",
    rule:"para + 原形動詞 = 為了…、目的是…。表示「目的」。",
    examples:[
      {es:"Todos necesitan galletas para curarse.", zh:"所有人都需要餅乾才能康復。"},
      {es:"Necesitas agua para vivir.", zh:"你需要水才能生存。"},
      {es:"Estudio español para viajar.", zh:"我學西語是為了旅行。"}
    ],
    trap:"para（目的）vs por（原因）：Estudio por dinero = 我讀書是因為錢（原因）",
    source:"E3·S10"
  },

  {
    id:"g13", cat:"verb-pattern",
    title:"Creo que + 子句：我認為…",
    rule:"Creo que + 完整子句 = 我認為、我覺得。表達個人意見或推測。",
    examples:[
      {es:"Creo que tienes el corazón un poco flojo.", zh:"我認為你的心臟有點虛弱。"},
      {es:"Creo que tienes fiebre.", zh:"我認為你發燒了。"},
      {es:"Creo que tienes razón.", zh:"我認為你說得對。"}
    ],
    trap:"口語快速版：Creo que sí（我覺得是）/ Creo que no（我覺得不是）",
    source:"E3·S9"
  },

  // ══ 固定用語 ══

  {
    id:"g14", cat:"phrase",
    title:"No pasa nada：沒關係、沒事",
    rule:"字面意思「什麼都沒發生」，是西語最高頻的安慰語之一。",
    examples:[
      {es:"No pasa nada. Sólo es barro.", zh:"沒關係，只是泥巴而已。"},
      {es:"No pasa nada, yo te ayudo.", zh:"沒關係，我來幫你。"},
      {es:"Lo siento. No pasa nada.", zh:"對不起。——沒關係。"}
    ],
    trap:"超萬用！道歉回應、安慰他人、自我寬解都能用，記起來終身受益！",
    source:"E1·S9"
  },

  {
    id:"g15", cat:"phrase",
    title:"No te preocupes：不要擔心",
    rule:"反身動詞 preocuparse（擔心）的否定命令式，對「你」說不要擔心。",
    examples:[
      {es:"No te preocupes, entre todos lo encontraremos.", zh:"不要擔心，我們大家一起會找到的。"},
      {es:"No te preocupes por el examen.", zh:"不要為考試擔心。"},
      {es:"No te preocupes, todo va a salir bien.", zh:"不要擔心，一切都會順利的。"}
    ],
    trap:"正式場合用：No se preocupe（對 usted）；跟朋友/家人用 No te preocupes",
    source:"E2·S4"
  },

  {
    id:"g16", cat:"phrase",
    title:"命令式（tú）：直接下指令",
    rule:"非正式命令（對「你」）：使用動詞第三人稱單數現在式形式，相當於英語 imperative。",
    examples:[
      {es:"Respira hondo.", zh:"深呼吸。（respirar → respira）"},
      {es:"Tose.", zh:"咳嗽。（toser → tose）"},
      {es:"Abre la boca, por favor.", zh:"請張開嘴巴。（abrir → abre）"}
    ],
    trap:"否定命令完全不同：No abras la boca（不要張嘴）。例外：ir→ve, ser→sé, hacer→haz",
    source:"E3·S8"
  }

];

/* 全局句子索引（ep*10 + sentenceIdx）→ grammar_id
   null = 該句沒有對應的主要文法點 */
const SENTENCE_GRAMMAR_MAP = {
  // E1 泥巴坑
   0:'g01',  // Yo soy Peppa Pig. → SER 身分
   1:'g01',  // Este es mi hermano → SER 關係
   2:'g03',  // está lloviendo → ESTAR + -ando
   3:'g10',  // ¿Podemos salir? → Podemos
   4:'g11',  // debes ponerte → Deber
   5:'g08',  // Me encanta saltar → encanta
   6:'g05',  // ha encontrado → 現在完成式
   7:'g01',  // sí que es grande → SER 本質
   8:'g14',  // No pasa nada → 固定用語
   9:'g09',  // A todos les encanta → A+人+le
  // E2 恐龍先生不見了
  10:'g01',  // juguete favorito de George es → SER
  11: null,  // se va a la cama（反身動詞，無對應文法點）
  12:'g05',  // ha perdido → 現在完成式
  13:'g15',  // No te preocupes → 固定用語
  14:'g01',  // Un detective es una persona → SER 職業
  15: null,  // siempre se trae（無對應文法點）
  16:'g02',  // dónde está → ESTAR 位置
  17:'g02',  // no está en la cama → ESTAR 位置
  18:'g03',  // están jugando → ESTAR + -ando
  19:'g06',  // habéis estado saltando → 完成進行式
  // E3 最好的朋友
  20:'g03',  // está esperando → ESTAR + -ando
  21:'g09',  // quiere mucho a Susi → A+人+le 同族結構
  22:'g01',  // Son las mejores amigas → SER
  23:'g01',  // Este juego es solo para → SER
  24:'g01',  // Soy una princesa → SER 身分
  25:'g09',  // A George no le gusta → A+人+le
  26:'g07',  // Yo seré la doctora → SER 未來式
  27:'g16',  // respira hondo / tose → 命令式
  28:'g13',  // Creo que tienes → Creo que
  29:'g12',  // para curarse → para + infinitive
};
