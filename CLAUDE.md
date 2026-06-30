# 🐷 佩佩豬學西語 — Claude Code 專案交接文件

## 你的角色
你是這個專案的**資深全端工程師**。產品負責人是 VERA（ADHD 學習者），你負責把她的需求轉化為無 Bug 的程式碼。**禁止破圖、禁止反覆修同一個問題。**

---

## 專案基本資訊

- **線上網址：** https://peppa-es.netlify.app
- **Netlify Site ID：** `1c126385-8478-45b6-a88e-19e7b3cac74f`
- **技術棧：** 純 Vanilla JS，零框架，零後端
- **色調：** 水色系（みずいろ）— CSS 變數定義在 `style.css` 的 `:root`
- **目標用戶：** ADHD 友善，手機優先（RWD）

---

## 檔案結構

```
Peppa-Spanish/
├── index.html      — 純 HTML 結構（無 inline CSS/JS）
├── style.css       — 所有樣式，含 :root CSS 變數
├── episodes.js     — EPS 陣列（S1 三集各 10 句）
├── ammo.js         — 語塊彈藥庫資料 + SENTENCE_AMMO_MAP2
├── cognates.js     — YouGlish 關鍵字 + 英西同源資料 + buildCogDetails()
├── script.js       — 所有邏輯函數 + INIT
└── CLAUDE.md       — 本文件
```

---

## 核心 CSS 變數（style.css :root）

```css
--mizu:    #9FD0DE   /* 水色：主色 */
--usumizu: #BCE1DF   /* 薄水色：背景邊框 */
--sora:    #8AC4DE   /* 空色：強調 */
--misora:  #6C9BD2   /* 御空色：按鈕 */
--nezumi:  #B8C8D1   /* 空色鼠：灰調 */
--konpeki: #005B98   /* 紺碧：標題深色 */
--benikake:#8491C3   /* 紅掛空色：點綴 */
--bg:      #EEF7F9
--bg2:     #F5FAFA
--tdark:   #1A2E3B
--tmid:    #4A6572
--tlight:  #8AABB8
--ok:      #3DB87A
--err:     #E05C5C
```

---

## 功能清單

### 卡片學習系統
- 星星進度條：完成一句點亮一顆 ⭐，完成全集點亮 🌟
- 語塊 chunk-pill：動詞=綠、名詞=藍、形容詞=紫，點語塊 → TTS 西語朗讀
- 點整句 → TTS 念整句
- 翻譯欄位：智慧比對（中文/英文，關鍵詞重疊 ≥55% 算對）
- 看答案：中 / EN 兩 tab，附文法說明

### YouGlish 發音
- `cognates.js` 的 `SENTENCE_YG_KW` 定義每句的精準搜尋短語
- 按鈕 `yg-card-btn` → `openYGPanel(keyword)` → `window.open` 開新分頁
- URL 格式：`https://youglish.com/pronounce/{encoded}/spanish`

### 英西同源槓桿
- 每句卡片下方有 `<details>` 摺疊寶箱
- 資料在 `cognates.js` 的 `SENTENCE_COGNATES`，key 格式 `e{ep}_s{idx}`
- `buildCogDetails(data)` 產生 HTML

### 造句區
- 顯示句型骨架（`getMakePattern`）
- E1 句2 有心智圖換詞地圖（`expand` 資料，`renderExpandMap`）
- 核對句型：比對關鍵動詞，成功 → TTS 念出使用者句子

### 彈藥庫（ammo.js）
- `AMMO_DATA` 陣列，每張彈藥卡：核心彈藥 → 武器改裝 → 實戰射擊
- `SENTENCE_AMMO_MAP2`：globalIdx → ammo_id(s) 對應
- 完成句子 → `unlockAmmo(globalIdx)` → 自動解鎖

### LocalStorage
- key：`peppa_es_v4`
- 儲存：`{ ammoUnlocked, ammoStars }`

---

## 已知待修問題

- [ ] chunk-pill 在某些環境下文字不顯示（已加 `min-height:34px` + `color:#005B98` hardcode）
- [ ] YouGlish 按鈕 label 目前顯示 `...`，需在 `render()` 裡確認 `ygBtn.querySelector('.yg-label')` 有正確更新
- [ ] E2、E3 句子尚無 `expand` 心智圖延伸
- [ ] S1 E4+ 尚未加入

---

## 部署指令（Netlify REST API）

```bash
TOKEN="你的_netlify_token"
SITE_ID="1c126385-8478-45b6-a88e-19e7b3cac74f"

# 單檔部署（只改了 index.html 時）
FILE_HASH=$(sha1sum index.html | cut -d' ' -f1)
DEPLOY_ID=$(curl -s -X POST \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"files\": {\"/index.html\": \"$FILE_HASH\"}}" \
  | python3 -c "import sys,json; print(json.load(sys.stdin).get('id',''))")

curl -s -X PUT \
  "https://api.netlify.com/api/v1/deploys/$DEPLOY_ID/files/index.html" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "@index.html"
```

---

## 給 Claude Code 的工作守則

1. **手機優先**：所有 UI 改動先想手機版，max-width: 480px
2. **不破 CSS 變數**：顏色一律用 `var(--konpeki)` 等變數，不要 hardcode（除非 debug 用）
3. **語塊教學法**：禁止單字死背，所有教學內容以語塊/片語/完整句為單位
4. **改一個說一個**：每修改一項，說明原因
5. **LocalStorage key 是 peppa_es_v4**：不要改 key 名稱，會讓用戶資料消失
