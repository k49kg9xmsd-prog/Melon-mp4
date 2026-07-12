# 甜瓜影片轉換器

這是一個純前端 GitHub Pages 專案。影片只在使用者的瀏覽器中處理，不會上傳。

## GitHub Pages 部署

1. 在 GitHub 建立新的 Repository。
2. 將這個資料夾內的所有檔案與資料夾完整上傳到 Repository 根目錄。
3. 開啟 `Settings` → `Pages`。
4. `Source` 選擇 `Deploy from a branch`。
5. Branch 選擇 `main`，資料夾選擇 `/ (root)`。
6. 儲存並等待部署完成。
7. 使用 GitHub 提供的 HTTPS 網址開啟。

網址是：

`https://k49kg9xmsd-prog.github.io/Melon-mp4/`

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


## 2.2 修正

- 修正部分瀏覽器下載後自動變成 `.melsave.zip`。
- 下載檔案改用通用二進位 MIME，保留 `.melsave` 副檔名。


## 3.0 更新

- 下載結果改為一般 ZIP。
- ZIP 內只有一個副檔名正確的 `.melsave`。
- 解壓縮後即可匯入遊戲，不必重新命名。
- 存檔名稱最多 20 個 Unicode 字元。
- 輸入框加入即時字數顯示與長度限制。
- 保留 2.1 的顏色色頻道修正。


## 4.0 更新

- 新增動態 GIF 上傳與逐幀轉換。
- 影片與 GIF 都會使用第一幀建立 64×64 存檔圖示。
- 下載仍為一般 ZIP，解壓縮後就是 `.melsave`。
- GIF 解碼使用瀏覽器內建 `ImageDecoder`，不會上傳檔案。


## 5.0 更新

- 移除「最長轉換秒數」，影片與 GIF 會完整轉換。
- 長影片會產生更多影格，轉換時間與存檔容量會同步增加。
- 網站下方加入原始存檔作者「紫晶石灰」與哔哩哔哩連結。
- 說明本網站僅修改原始存檔內容，讓玩家自訂影片或 GIF。
- 加入作者個人空間圖片。


## 6.0 更新

- 網站名稱改為「甜瓜影片轉換器」。
- 新增繁體中文、简体中文、English 三種語言。
- 語言選擇會儲存在瀏覽器，下次開啟會沿用。
- 介面文字、處理進度、錯誤提示與完成訊息都會跟著切換語言。
