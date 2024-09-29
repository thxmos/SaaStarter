### Products

- id, purchaseId,
- webhook from stripe to populate db when new product is added

### Purchase

- link userId to productId
- quantity, stripe transactionId?
- webhook to update transactionId from stripe (if needed)

### Nice to haves

- users can set theme in profile
- make avatar dropdown close on click
- button disable on email resend, login, sign up
- allow users to view actual stripe billing data from account settings
- documentation

### Verification / Auth

- verify different devices / location
- create cookie and log the user in after they verify their email
- redirect only routes

### Refactor / Clean up

- dont make server actions ingest forms, process forms from client components
- layout to prevent page scrolling when unecessary

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

## Set Up / Docs

- where to get env variables
- stripe command

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator
