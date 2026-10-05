# 甜瓜影片播放器 2.0 轉換器 v3

這版只使用「视频-放器2.0.zip」內的原版 `gb.melsave` 與 `gb mp4.melsave`。

已確認原版 `gb.melsave` 結構：12 個根物件，每個根物件有 14 個帶 Human texture 的子物件，AssetId 連續為 1～168。

轉換器不新增/刪除任何影片物件，只替換 ZIP 中的 1～168 JPEG。播放器只修改 Lua 的 `spawn.createSave("gb",3,3)` 名稱。

為避免 iOS Safari 對 Blob 下載檔名處理不一致，最終下載為普通 ZIP；解壓後會得到：
- `<名稱>.melsave`
- `<名稱> mp4.melsave`
- `驗證結果.txt`

網站輸出前會重新解包兩個 melsave 並檢查 12/168 結構、AssetId 1～168 與播放器名稱綁定。
