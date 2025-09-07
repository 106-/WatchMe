# Markdown Website Makefile
# 簡単なコマンド集でReactアプリを管理するのだ

.PHONY: help install dev build preview clean deploy-check

# デフォルトターゲット：ヘルプを表示
help:
	@echo "Available commands:"
	@echo "  make install      - 依存関係をインストール"
	@echo "  make dev          - 開発サーバーを起動"
	@echo "  make build        - プロダクション用にビルド"
	@echo "  make preview      - ビルド結果をプレビュー"
	@echo "  make clean        - ビルド成果物を削除"
	@echo "  make deploy-check - デプロイ前のチェック"

# 依存関係のインストール
install:
	@echo "📦 依存関係をインストール中..."
	npm install
	@echo "✅ インストール完了！"

# 開発サーバーを起動
dev:
	@echo "🚀 開発サーバーを起動中..."
	@echo "ブラウザでhttp://localhost:3000を開くのだ！"
	npm run dev

# プロダクション用ビルド
build:
	@echo "🔨 プロダクション用にビルド中..."
	mkdir -p public
	cp main.md public/
	npm run build
	@echo "✅ ビルド完了！distフォルダを確認するのだ"

# ビルド結果をプレビュー
preview: build
	@echo "👀 ビルド結果をプレビュー中..."
	npm run preview

# ビルド成果物を削除
clean:
	@echo "🧹 クリーンアップ中..."
	rm -rf dist
	rm -rf public
	rm -rf node_modules/.vite
	@echo "✅ クリーンアップ完了！"

# デプロイ前のチェック
deploy-check: build
	@echo "🔍 デプロイ前チェック中..."
	@if [ -f "dist/index.html" ]; then \
		echo "✅ index.htmlが存在します"; \
	else \
		echo "❌ index.htmlが見つかりません"; \
		exit 1; \
	fi
	@if [ -f "dist/main.md" ]; then \
		echo "✅ main.mdが存在します"; \
	else \
		echo "❌ main.mdが見つかりません"; \
		exit 1; \
	fi
	@echo "✅ デプロイ準備完了！GitHub Pagesにpushするのだ"

# 初回セットアップ（install + 初回ビルド）
setup: install build
	@echo "🎉 初回セットアップ完了！"
	@echo "次は 'make dev' で開発を始めるのだ！"