# web-oinari-tech

OinariTech のホームページです。[Next.js](https://nextjs.org) で構築し、
[Google Cloud Run](https://cloud.google.com/run) 上で動作します。

## 開発

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認できます。

## ビルド

```bash
npm run build
```

`next.config.ts` で `output: "standalone"` を指定しているため、
`.next/standalone` にコンテナ実行用の最小構成が出力されます。

## コンテナイメージ

```bash
docker build -t web-oinari-tech .
docker run -p 8080:8080 web-oinari-tech
```

[http://localhost:8080](http://localhost:8080) で確認できます。

## Cloud Run への手動デプロイ

事前に `gcloud auth login` / `gcloud config set project <PROJECT_ID>` を実施してください。

```bash
gcloud artifacts repositories create web-oinari-tech \
  --repository-format=docker \
  --location=asia-northeast1

gcloud builds submit \
  --tag asia-northeast1-docker.pkg.dev/<PROJECT_ID>/web-oinari-tech/web-oinari-tech

gcloud run deploy web-oinari-tech \
  --image asia-northeast1-docker.pkg.dev/<PROJECT_ID>/web-oinari-tech/web-oinari-tech \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated
```

## CI/CD (GitHub Actions)

- `.github/workflows/ci.yml`: PR / push 時に lint とビルドを実行します。
- `.github/workflows/deploy.yml`: `main` ブランチへの push 時に Cloud Run へ自動デプロイします。
  Workload Identity Federation を利用するため、以下の Repository Secrets を設定してください。

  | Secret                          | 説明                                                   |
  | -------------------------------- | ------------------------------------------------------ |
  | `GCP_PROJECT_ID`                 | デプロイ先の GCP プロジェクト ID                        |
  | `GCP_WORKLOAD_IDENTITY_PROVIDER` | Workload Identity Provider のフルリソース名             |
  | `GCP_SERVICE_ACCOUNT`            | デプロイに使用するサービスアカウントのメールアドレス     |

  対象のサービスアカウントには最低限 `roles/run.admin` と `roles/artifactregistry.writer`、
  また Cloud Run のランタイムサービスアカウントに対する `roles/iam.serviceAccountUser` が必要です。

  Secret 発行までの GCP 側セットアップ手順（API 有効化、サービスアカウント作成、
  Workload Identity Federation の設定など）は [docs/gcp-setup.md](docs/gcp-setup.md) を参照してください。
