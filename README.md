# TaskGrid - タスク管理アプリケーション

## 概要

TaskGrid は、「時間管理のマトリクス」の考え方を基にしたタスク管理ツールです。タスクを「緊急度 × 重要度」の 2 軸で整理し、優先順位を視覚的に管理することができます。

## 特徴

- タスクを 4 つのカテゴリーで管理

  - 重要かつ緊急
  - 重要だが緊急でない
  - 重要でないが緊急
  - 重要でも緊急でもない

- 重要かつ緊急なタスクは 3 つまでに制限

  - 本当に重要で緊急なタスクに集中するための機能
  - オーバーフローを防ぎ、優先順位の明確化をサポート

- シンプルで直感的な UI
  - ドラッグ＆ドロップなしでカテゴリー間の移動が可能
  - クリアな視覚的表示で優先順位を瞬時に把握

## 技術スタック

- Next.js
- Firebase Authentication
- Cloud Firestore
- TailwindCSS

## 主な機能

1. ユーザー認証

   - メールアドレスによるサインアップ/ログイン
   - セキュアなユーザーデータの管理

2. タスク管理

   - タスクの追加/削除
   - カテゴリー間の移動
   - リアルタイムでの更新

3. レスポンシブデザイン
   - モバイル/デスクトップ両対応
   - 使いやすいインターフェース

## インストール方法

````bash
# リポジトリのクローン
git clone [リポジトリURL]

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

## 環境設定
1. Firebaseプロジェクトの作成
2. 環境変数の設定
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

## 使用方法
1. アカウント作成またはログイン
2. タスクの追加
3. カテゴリーの選択
4. 必要に応じてタスクの移動や削除
````
