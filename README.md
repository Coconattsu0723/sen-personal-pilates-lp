# SEN PERSONAL PILATES

Webデザインのポートフォリオとして自主制作した、架空のパーソナルピラティススタジオの1ページ完結型LPです。HTML / CSS / Vanilla JavaScriptで実装し、375pxを基準にしたモバイルファーストで設計しています。

公開サイト：[SEN PERSONAL PILATES](https://coconattsu0723.github.io/sen-personal-pilates-lp/)

## Brand Concept

> 自分の身体を知ることから、整える習慣を。

Heroコピー：**整える前に、まず知ることから。**

「頑張って運動する」ことを先に求めるのではなく、姿勢チェックを通して今の身体を知り、一人ひとりに合った整え方を見つけるスタジオとして設計しました。

## Target / Conversion

ターゲットは、28〜35歳程度のデスクワーク中心で働く女性です。

> 運動した方がいいことは分かっている。  
> でも、自分には何が合うのか分からない。

この課題に対して、最終CVを**姿勢チェック付き初回パーソナル体験レッスン予約**に設定しています。

## Design Concept

デザインコンセプトは **Natural Calm**。静かで丁寧、信頼できる印象を、自然光の写真、余白を活かした文字組み、Sage系の控えめなアクセントで表現しました。

キーワード：静か / 丁寧 / 信頼できる / 余白 / 自然光 / ミニマル / 女性向け / 上品

### Color Palette

| Name | Color |
|---|---|
| Warm Ivory | `#F7F5F0` |
| Soft White | `#FCFBF8` |
| Deep Charcoal | `#303431` |
| Warm Gray | `#747873` |
| Sage Green | `#89988B` |
| Pale Sage | `#E6EAE4` |
| Deep Sage | `#66776A` |
| Light Gray | `#DADDD7` |

## Technology

- HTML5
- CSS3
- Vanilla JavaScript

外部ライブラリやフレームワークは使用していません。フォントは日本語に `Noto Sans JP` / `Hiragino Sans` / `Yu Gothic`、英字に `Cormorant Garamond` / `Times New Roman`を指定し、閲覧環境のフォントへフォールバックする構成です。

## Responsive Design

モバイルファーストで実装し、以下の幅で表示・動作を確認しています。

`375 / 390 / 768 / 1024 / 1366 / 1440px`

- 375px：SPデザインの正本
- 768px：Tablet向けレイアウト（`min-width: 768px`）
- 1024px：PCナビゲーション・PCレイアウト（`min-width: 1024px`）
- 1366 / 1440px：コンテンツ最大幅を保ったワイド画面確認

## Main Features

- SPハンバーガーメニューとPCナビゲーションの切り替え
- Hero内CTAの表示状態を基準にした固定CTA制御
- SPでは小型横書き、PCでは右端縦型になる固定CTA
- Reservation表示中の固定CTA非表示
- FAQアコーディオン
- 実送信しないダミー予約フォーム
- 必須項目・電話番号のフォームバリデーション
- エラー表示、最初の不正項目へのフォーカス、完了メッセージ
- 375〜1440pxに対応したレスポンシブレイアウト
- 写真素材のWebP化と表示サイズに合わせた画像最適化
- Hero以外の下部画像に対するlazy loading
- 48px favicon
- 1200×630pxの正式OGP画像

## Accessibility

- `header` / `nav` / `main` / `section` / `footer`などのセマンティックHTML
- Heroのみに`h1`を使用した見出し階層
- 文脈に合わせた画像の`alt`と装飾画像の空alt
- フォーム入力欄と`label`の関連付け
- Menu・FAQの`aria-expanded` / `aria-controls`
- スキップリンクと`:focus-visible`
- キーボード操作とEscapeキーによるMenu閉じ
- Menu表示中のフォーカス制御
- `prefers-reduced-motion`への対応
- `aria-invalid` / `aria-describedby` / `aria-live`を使ったフォームエラー表示
- 完了メッセージへのフォーカス移動

## SEO / Metadata

実装済み：

- `title`
- `meta description`
- `og:type` / `og:title` / `og:description` / `og:site_name`
- favicon

公開URL確定後に反映予定：

- canonical
- `og:url`
- `og:image`の絶対URL
- Twitter Cardの最終設定

## Visual Assets

写真を多用せず、Hero・Studio・Trainerを中心に少数の正式写真で空間とサービスを伝えています。身体の悩みや選ばれる理由はイラストアイコンで整理し、姿勢チェックは正面・側面の図解で説明しています。

原本は保持したまま、実装ではWeb表示用のWebP・軽量PNGを使用しています。素材の対応関係は`docs/03_IMAGE_ASSETS.md`に記録しています。

## Directory Structure

```text
sen_lp_project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── diagrams/
│       ├── favicon/
│       ├── icons/
│       ├── logo/
│       ├── ogp/
│       └── photos/
├── docs/
├── README.md
└── .gitignore
```

`docs/`には、企画・コンテンツ構成・デザインルール・画像台帳・実装ルール・意思決定ログを保存しています。

## Disclaimer

本サイトはポートフォリオ用に制作した架空のWebサイトです。  
記載されている施設・人物・住所等は実在しません。
