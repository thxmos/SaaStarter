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
