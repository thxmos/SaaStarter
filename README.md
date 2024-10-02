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
