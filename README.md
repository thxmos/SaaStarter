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

### Theme Gen

https://zippystarter.com/tools/shadcn-ui-theme-generator

### Google OAuth

Google cloud console > apis & services > credentials.

And then you setup a new pair 2.0 client by clicking create credentials and then oAuth client id

Go to the console for your project and look under API Access. You should see your client ID & client secret there, along with a list of redirect URIs. If the URI you want isn't listed, click edit settings and add the URI to the list.

Change the the env variable NEXT_PUBLIC_URL to match the correct url of your app.

### Connect to DB
