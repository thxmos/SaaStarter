- redirect only routes
- email-verify page check if already verified and just redirect to dashboard
- button disable on email resend, login, sign up

- allow users to view actual stripe billing data from account settings

- Products

  - id, purchaseId,
  - webhook from stripe to populate db when new product is added

- Purchase

  - link userId to productId
  - quantity, stripe transactionId?
  - webhook to update transactionId from stripe (if needed)

- dont make server actions ingest forms, process forms from client components
- layout to prevent page scrolling when unecessary
- users can set theme in profile
- make avatar dropdown close on click

- verify different devices / location
-

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

## Set Up

- where to get env variables
- stripe command

### Types

```
type User {
    id: String,
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date
}

type Product {
    name: "",
    price: "",
    description: "",
    createdAt: Date,
    updatedAt: Date
}

type Purchase {
    userId: String,
    productId: String,
    createdAt: Date,
    updatedAt: Date
}
```

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator
