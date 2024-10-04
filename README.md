## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODOS:

- REFACTOR UseSession / getUserSession
- REFACTOR Look into best way to do forms
  - Password Reset page form
- UI Awaiting page fix emails
- UI Main layout component (prevent page scrolling when unecessary)
- UI refresh theme on user update (look into theme provider or revalidatePath)
- AUTH isVerified access restriction (either edit generic layout or make a verified-layout protection layer)
- AUTH Location Verification
  - verify different devices / location from the first signed up device
  - 2fa enablement
- FEATURE Billing Page
- STRIPE product default prices
- DOCUMENTATION
  - where to get env variables
  - commands
  - stripe setup
- Stripe Webhook Helper Functions
  - move all stripe webhooks into helper function files? products.helpers.ts, prices.helpers.ts or something more modular

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator

### AWS Config with SST

Create an IAM user
https://guide.sst.dev/chapters/create-an-iam-user.html

Configure AWS CLI
https://guide.sst.dev/chapters/configure-the-aws-cli.html

General SST Docs
https://sst.dev/docs/start/aws/nextjs

sst.aws.Postgres (https://sst.dev/docs/component/aws/postgres)

- look into options
- look into db connection with prisma
- aurora serverless postgres
- Generate a pre-signed URL
- scaling configuration

The command `npx sst bind npx prisma db push` is a combination of two separate commands that work together to push your Prisma schema changes to your database in the context of your SST (Serverless Stack) application. Let's break down what each part does:

1. `npx sst bind`:

- This command runs your script with the same environment variables and AWS permissions that your deployed application has.
- It loads your SST app's config and sets up the AWS credentials and environment variables.
- This is crucial because it provides access to resources like your database connection string, which is stored securely and not directly in your code.

2. `npx prisma db push`:

- This command is used to push your Prisma schema changes to your database. It updates the database schema to match the changes in your Prisma schema.
