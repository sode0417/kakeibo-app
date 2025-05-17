# 家計簿アプリ (Kakeibo App)

## 概要
家計簿アプリは、収支の管理、履歴の確認、カテゴリの管理を行うためのツールです。  
フロントエンドは React を使用し、バックエンドは .NET を使用しています。

## 主な機能
- **ダッシュボード**: 収支の概要を表示
- **収支入力**: 新しい収支を登録
- **履歴一覧**: 過去の収支履歴を確認
- **カテゴリ管理**: カテゴリの追加・削除・管理

## 技術スタック
### フロントエンド
- React + TypeScript
- Material-UI
- Vite
- Axios

### バックエンド
- .NET 8
- Entity Framework Core
- SQLite

### CI/CD
- GitHub Actions
- 自動テストとLinterチェック
- 環境別デプロイ設定

## セットアップ手順

### フロントエンド
1. 必要な依存関係をインストールします。
   ```bash
   cd frontend
   npm install
   ```
2. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```

### バックエンド
1. 必要な依存関係をインストールします。
   ```bash
   cd backend
   dotnet restore
   ```
2. アプリケーションを起動します。
   ```bash
   dotnet run
   ```

### データベース設定
1. SQLite データベースを使用しています。デフォルトのデータベースファイルは `backend/kakeibo.db` にあります。
2. データベースのマイグレーションを適用するには以下を実行してください。
   ```bash
   cd backend
   dotnet ef database update
   ```

## アプリケーションへのアクセス
1. フロントエンド開発サーバー
   ```
   http://localhost:5173 または http://localhost:5174
   ```
2. バックエンドAPI
   ```
   http://localhost:5268
   ```

## 実装済みの主な機能
### データ管理
- SQLiteを使用したデータの永続化
- Entity Framework Coreによるデータアクセス
- マイグレーションによるデータベース管理

### セキュリティと安定性
- 環境別のCORS設定
- エラーハンドリングの実装
- データバリデーション

### UI/UX
- Material-UIによる一貫したデザイン
- レスポンシブなレイアウト
- 直感的な操作性

### 開発環境
- CI/CDパイプラインによる自動化
- コード品質の自動チェック
- 環境変数による設定管理

## ライセンス
このプロジェクトは MIT ライセンスの下で公開されています。