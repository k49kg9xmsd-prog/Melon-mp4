# MEL 影片轉換器

這是一個純前端 GitHub Pages 專案。影片只在使用者的瀏覽器中處理，不會上傳。

## GitHub Pages 部署

1. 在 GitHub 建立新的 Repository。
2. 將這個資料夾內的所有檔案與資料夾完整上傳到 Repository 根目錄。
3. 開啟 `Settings` → `Pages`。
4. `Source` 選擇 `Deploy from a branch`。
5. Branch 選擇 `main`，資料夾選擇 `/ (root)`。
6. 儲存並等待部署完成。
7. 使用 GitHub 提供的 HTTPS 網址開啟。

網址通常會是：

`https://你的帳號.github.io/儲存庫名稱/`

## 專案結構

```text
index.html
style.css
app.js
vendor/
  jszip.min.js
templates/
  mc-48x27.melsave
  pool-64x36.melsave
```

## 使用方式

1. 上傳瀏覽器能解碼的影片。
2. 選擇 48×27 或 64×36 模板。
3. 設定 FPS、填充方式與最長秒數。
4. 按下「生成 .melsave」。
5. 瀏覽器會下載完成的存檔。

## 注意

- Safari 通常能處理 iPhone／iPad 拍攝的 MOV。
- 其他瀏覽器是否支援 MOV 取決於影片實際編碼。
- 64×36 的效能負擔比 48×27 高很多。
- 請從 GitHub Pages 網址開啟，不要直接在 iOS「檔案」App 中開啟 `index.html`。
- `vendor/jszip.min.js` 已放在專案內，不依賴 CDN。


## 2.0 更新

- 轉換時不再對每一幀執行 `video.currentTime` seek。
- 改用 `requestVideoFrameCallback` 連續播放擷取。
- Safari 不支援該 API 時，會自動改用 `requestAnimationFrame`。
- 只在轉換開始時跳回影片開頭一次。
- 修正 iPad Safari 的「等待 seeked 逾時」問題。
- 轉換過程請保持 Safari 分頁在前景。


## 2.1 修正

- 修正綠色與藍色色頻道對調。
- 介面文字改為平台中性，不再只針對 Safari。
- 手機、平板與電腦皆可使用；影片格式仍取決於瀏覽器解碼能力。
