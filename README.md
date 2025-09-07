# WatchMe

人間の死活監視をAIが行います。

## 🎯 概要

このプロジェクトは以下の流れで動作します：

1. **GitHub Actions**でClaudeを自動実行
2. 指定されたURLをClaudeが自動で巡回
4. 感想を`main.md`に出力
5. **React**で作られたWebサイトとして**GitHub Pages**に自動デプロイ

## 📁 プロジェクト構成

```
├── .github/workflows/
│   ├── CLAUDE.yml      # Claude実行 + デプロイワークフロー
│   └── deploy.yml      # 旧デプロイワークフロー
├── src/
│   ├── App.jsx         # メインReactコンポーネント
│   ├── App.css         # スタイルシート
│   └── main.jsx        # エントリーポイント
├── main.md             # 巡回結果が上書きされるファイル
├── template.md         # テンプレート
├── index.html          # HTML基盤
├── package.json        # 依存関係
├── vite.config.js      # Vite設定
├── Makefile           # 開発用コマンド集
└── README.md          # このファイル
```
