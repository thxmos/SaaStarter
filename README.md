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

### small things

- refresh theme on user update
- redirect only routes
- layout to prevent page scrolling when unecessary
- store

### Purchase / Transactions ?

- Product default prices

- isVerified access restriction

### Nice to haves

- allow users to view actual stripe billing data from account settings
- documentation
  - where to get env variables
  - commands
- some framer motions

### Verification / Auth

- verify different devices / location
- create cookie and log the user in after they verify their email \*
- 2fa enablement
- look into what revalidate path does

### Refactor / Clean up

- dont make server actions ingest forms, process forms from client components
- clean error handling, let some things silently fail and have good error logs
- dont need to store as much info in product maybe just the ids, make stripe actions to access needed data (actually maybe itd be good to have if moving to another platform and wanting to keep prod data)
- move all stripe webhooks into helper function files? products.helpers.ts, prices.helpers.ts or something more modular

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator
