# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # 初回セットアップ
npm start          # 開発サーバー起動（ファイル監視＋BrowserSync自動リロード）
npm run build      # 本番ビルド（dist/ に出力）
```

## Architecture

### Build pipeline

Gulp 4 で `src/` をコンパイルして `dist/` に出力する。編集対象は常に `src/` のみ。

| 入力 | 出力 |
|------|------|
| `src/**/*.html` | `dist/*.html` |
| `src/sass/style.scss` | `dist/css/style.css` + `style.min.css` |
| `src/js/**/*.js` | `dist/js/main.js` + `main.min.js` |
| `src/images/**/*` | `dist/images/` |

### SCSS structure

`src/sass/style.scss` がエントリーポイント。各ファイルはここで `@use` する。

```
src/sass/
├── style.scss          # @use でまとめるだけ
├── base/
│   ├── _variables.scss # 変数・rem()関数
│   ├── _mixin.scss     # mq / sp / tb / flex-center / hover
│   ├── _reset.scss
│   ├── _base.scss      # html/body・.l-wrapper・.sp-only/.pc-only
│   └── _utility.scss
├── global/             # _header.scss / _footer.scss
├── module/             # 再利用コンポーネント（ボタン、ナビ、セクションなど）
└── page/               # ページ固有スタイル
```

各モジュールファイルの先頭で `@use '../base/variables' as *;` と `@use '../base/mixin' as *;` を宣言する。

新しいページを追加する場合は `src/sass/page/_ページ名.scss` を作成し、`style.scss` の page セクションに `@use` を追記する。

### Key design tokens (`_variables.scss`)

- `rem($px)` — px を rem に変換する関数。スタイル全体で使用する
- `$color-main: #000`, `$color-navy: #001E63`, `$color-accent: #011950`
- ブレークポイント: SP=768px / TB=1025px
- `@include mq { ... }` が標準のモバイルファースト PC 対応ミックスイン

### JavaScript (`src/js/main.js`)

CDN 読み込みのライブラリを使用（`node_modules` で管理していない）：

- **GSAP + ScrollTrigger** — MV タイトルアニメーション・テキスト文字分割アニメーション (`gsap.matchMedia` で PC/SP 分岐)
- **Swiper** — MV の縦スクロールスライダー (`.js-mv-swiper`)
- **AOS** — スクロールフェードイン (`data-aos` 属性)

JS でインタラクティブな要素を制御する際は `js-` プレフィックスのクラスを使うこと（例: `.js-hamburger`, `.js-sp-nav`）。

### Pages

| ファイル | 内容 |
|---------|------|
| `index.html` | トップ（MV スライダー、各セクション） |
| `about.html` | 会社概要 |
| `service.html` | サービス一覧 |
| `news.html` | ニュース一覧（ページネーション付き） |
| `news-detail.html` | ニュース詳細（サイドバー付き） |
