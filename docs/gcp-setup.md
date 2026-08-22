# GCP プロジェクトのセットアップ

`.github/workflows/deploy.yml` から Cloud Run へデプロイできるようにするための、
GCP プロジェクト側の初期セットアップ手順です。ローカル端末に `gcloud` CLI がインストール・
ログイン済みであることを前提とします（`gcloud auth login`）。

サービスアカウントキー（JSON）は発行せず、GitHub Actions から
[Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) で
直接認証する構成にしています。

## 0. 変数の設定

これ以降のコマンドはすべて同じシェルセッションで実行してください。

```bash
PROJECT_ID="your-project-id"        # 既存 or 新規作成する GCP プロジェクト ID
REGION="asia-northeast1"            # デプロイ先リージョン（deploy.yml と合わせる）
REPO_OWNER="OinariTech"             # GitHub organization
REPO_NAME="web-oinari-tech"         # GitHub repository 名
SA_NAME="github-actions-deployer"
POOL_ID="github-actions-pool"
PROVIDER_ID="github-actions-provider"

gcloud config set project "$PROJECT_ID"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

プロジェクトがまだ無い場合は先に作成し、課金アカウントをリンクしてください。

```bash
gcloud projects create "$PROJECT_ID"
gcloud billing projects link "$PROJECT_ID" --billing-account=<BILLING_ACCOUNT_ID>
```

## 1. 必要な API を有効化

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  iamcredentials.googleapis.com \
  cloudbuild.googleapis.com \
  --project="$PROJECT_ID"
```

## 2. Artifact Registry リポジトリの作成

コンテナイメージの push 先です（`deploy.yml` の `REGION` / `REPOSITORY` と一致させています）。

```bash
gcloud artifacts repositories create "$REPO_NAME" \
  --repository-format=docker \
  --location="$REGION" \
  --project="$PROJECT_ID"
```

## 3. デプロイ用サービスアカウントの作成

GitHub Actions が Workload Identity Federation 経由でなりすます先のサービスアカウントです。

```bash
gcloud iam service-accounts create "$SA_NAME" \
  --display-name="GitHub Actions Cloud Run Deployer" \
  --project="$PROJECT_ID"

# イメージの push 先 Artifact Registry への書き込み権限
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/artifactregistry.writer"

# Cloud Run サービスのデプロイ権限
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

# Cloud Run のランタイムサービスアカウント（未指定時はデフォルトの Compute SA）を
# 使ってデプロイできるようにする
gcloud iam service-accounts add-iam-policy-binding \
  "${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser" \
  --project="$PROJECT_ID"
```

独自のランタイムサービスアカウントを Cloud Run サービスに設定する場合は、
最後のコマンドの対象を defaultのCompute SAではなくそちらに読み替えてください。

## 4. Workload Identity Federation の設定

GitHub Actions の OIDC トークンを信頼し、上記サービスアカウントへのなりすましを許可します。
`attribute-condition` でこのリポジトリからの実行に限定しているため、他リポジトリから
悪用される心配はありません。

```bash
gcloud iam workload-identity-pools create "$POOL_ID" \
  --location="global" \
  --display-name="GitHub Actions Pool" \
  --project="$PROJECT_ID"

gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID" \
  --location="global" \
  --workload-identity-pool="$POOL_ID" \
  --display-name="GitHub Actions Provider" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='${REPO_OWNER}/${REPO_NAME}'" \
  --project="$PROJECT_ID"

gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${REPO_OWNER}/${REPO_NAME}" \
  --project="$PROJECT_ID"
```

## 5. GitHub Secrets を発行する

Provider のフルリソース名を取得します。

```bash
gcloud iam workload-identity-pools providers describe "$PROVIDER_ID" \
  --location="global" \
  --workload-identity-pool="$POOL_ID" \
  --project="$PROJECT_ID" \
  --format="value(name)"
```

`https://github.com/OinariTech/web-oinari-tech/settings/secrets/actions` で、
以下の Repository Secrets を登録してください。

| Secret                            | 値                                                              |
| ---------------------------------- | ----------------------------------------------------------------- |
| `GCP_PROJECT_ID`                   | `$PROJECT_ID`                                                      |
| `GCP_WORKLOAD_IDENTITY_PROVIDER`   | 手順5で取得した `projects/.../workloadIdentityPools/.../providers/...` |
| `GCP_SERVICE_ACCOUNT`              | `$SA_EMAIL`（例: `github-actions-deployer@your-project-id.iam.gserviceaccount.com`） |

登録後、`main` ブランチに push するか、GitHub の Actions タブから
`Deploy to Cloud Run` ワークフローを手動実行（`workflow_dispatch`）すると
デプロイが走ります。初回はサービスがまだ存在しないため、
`deploy-cloudrun` アクションが新規作成します。
