# 甜瓜影片轉換器

GitHub Pages 前端版「影片播放器 2.0」轉換工具。

## 專案內容

- `templates/gb.melsave`：原版影片幀存檔模板，網站實際讀取並替換其中 1～168 張圖片。
- `templates/gb mp4.melsave`：原作者播放器，網站原樣提供下載。
- `assets/icon.png`、`assets/icon2.png`：原作相關圖片資源。
- `index.html` / `style.css` / `app.js`：網站本體。

## 使用

上傳影片 → 轉換 → 同時下載 `gb.melsave` 與 `gb mp4.melsave` → 匯入 Melon Playground。

目前固定依原作格式輸出 168 幀、392×180 JPEG。

## 原作說明

播放器 Lua、物件結構、播放方式與相關資源來自「影片播放器 2.0」原檔作者。
本 Repository 的網頁部分是依該格式製作的轉換工具，並非宣稱播放器本體為本工具作者原創。

## GitHub Pages

把本 ZIP **裡面的檔案**直接放在 Repository 根目錄，然後：

Settings → Pages → Deploy from a branch → main → /(root)


## v2 修正

- 改用專案內的 `vendor/jszip.min.js` 直接載入原版 `.melsave`，不再自行重建 ZIP 結構。
- `gb.melsave` 只替換原作的 `1`～`168` 圖片資源，其餘內容保留。
- 可自訂存檔名稱。
- 自訂名稱時會同步修改播放器 Lua 的 `spawn.createSave("gb")`，因此影片存檔與播放器不再被鎖死為 `gb`。
