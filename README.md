# Draw Kit 🎨

React, TypeScript, Vite で構築された、モダンで高機能な Web ドローイングアプリケーションです。
クリーンアーキテクチャ、パフォーマンス、そしてユーザー体験（UX）を重視して設計されています。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg?logo=tailwind-css&logoColor=white)

## ✨ 機能一覧

- **多彩な描画ツール**:
  - ✏️ **フリーハンド**: 自由な線を描画。
  - 📏 **直線 & 矢印**: 正確な図形描画。
  - ⭕ **楕円**: 円や楕円の描画。
  - 📝 **テキスト**: テキスト注釈の追加。
  - 🧹 **消しゴム**: 描画オブジェクトの削除。
  - ✋ **ハンドツール**: テキストオブジェクトの移動（ドラッグ＆ドロップ）。
- **カスタマイズ**:
  - 線の太さ調整。
  - カラーパレットによる色選択。
- **画像統合**: キャンバス背景として画像をアップロード可能。
- **堅牢な履歴管理**: 無制限の Undo（元に戻す）/ Redo（やり直し）機能。
- **モダン UI**: Tailwind CSS を用いたグラスモーフィズムデザインのフローティングツールバー。

## 🏗️ アーキテクチャと設計パターン

本プロジェクトは、スケーラブルなアプリケーション開発に適した、高度なフロントエンドアーキテクチャの実践デモとして構築されています。

### 1. ドメイン駆動設計 (DDD) ライクな構造

ビジネスロジックと UI の関心事を分離するために、ディレクトリ構成を整理しています：

- `src/domain`: `FreehandObject`, `TextObject`, `Point` などのコアドメインモデル（エンティティ）を定義。
- `src/application`: アプリケーションの状態管理やユースケース（Zustand Store, Command Manager）を担当。
- `src/components`: 純粋な UI コンポーネント。

### 2. Command Pattern (Undo/Redo)

単純な状態スナップショットではなく、**Command Pattern（コマンドパターン）**を採用して履歴を管理しています。

- **`ICommand` インターフェース**: 全ての操作（`execute`, `undo`）の契約を定義。
- **`CommandManager`**: 履歴スタックを管理するクラス。
- **具象コマンド**: `AddObjectCommand`, `UpdateObjectCommand` など、特定の操作をカプセル化。
- **メリット**: メモリ効率の向上と、操作ごとのきめ細やかな制御が可能。

### 3. 状態管理 (State Management)

- **Zustand**: Redux の軽量かつ高性能な代替として、グローバルな状態管理に使用。
- **Selectors**: `useShallow` を使用して再レンダリングを最適化。

### 4. 品質保証 (Testing)

- **Vitest**: 高速なユニットテストランナーを採用。
- **テスト範囲**: ドメインモデル、コマンドロジック、アプリケーションの状態遷移をカバー。
- **堅牢性**: 複雑な Undo/Redo ロジックや座標計算の正確性をテストで保証。

## 🚀 始め方

### 前提条件

- Node.js (v16 以上)
- npm または yarn

### インストール手順

1. リポジトリをクローンします:

   ```bash
   git clone https://github.com/yourusername/draw-kit.git
   cd draw-kit
   ```

2. 依存関係をインストールします:

   ```bash
   npm install
   ```

3. 開発サーバーを起動します:

   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:5173` を開きます。

## 🛠️ 技術スタック

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Material UI Icons (@mui/icons-material)
- **Linting**: ESLint (with strict type checking)

## 📂 プロジェクト構造

```
src/
├── application/       # アプリケーションロジック (Store, Commands)
│   ├── commands/      # Command Manager
│   └── store/         # Zustand Store
├── components/        # UIコンポーネント
│   ├── drawing-object-editor/ # オブジェクト生成ロジック
│   ├── drawn-object-layer/    # 描画レイヤー (Canvas)
│   ├── shared/        # 共通UI要素
│   └── toolbar/       # フローティングツールバー
├── domain/            # ビジネスロジック & モデル
│   ├── commands/      # コマンド定義
│   ├── models/        # ドメインエンティティ (Point, Line, etc.)
│   └── types.ts       # 型定義
├── hooks/             # カスタムReactフック
└── pages/             # メインページビュー
```

## 📝 ライセンス

This project is licensed under the MIT License.
