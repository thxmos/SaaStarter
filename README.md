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

### Nice to haves

- users can set theme in profile (save in preferences cookie)
- allow users to view actual stripe billing data from account settings
- documentation
  - where to get env variables
  - commands

### Verification / Auth

- verify different devices / location
- create cookie and log the user in after they verify their email \*
- redirect only routes
- 2fa enablement

### Refactor / Clean up

- dont make server actions ingest forms, process forms from client components
- layout to prevent page scrolling when unecessary
- clean error handling, let some things silently fail and have good error logs
- dont need to store as much info in product maybe just the ids, make stripe actions to access needed data (actually maybe itd be good to have if moving to another platform and wanting to keep prod data)
- move all stripe webhooks into helper function files? products.helpers.ts, prices.helpers.ts or something more modular

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator
