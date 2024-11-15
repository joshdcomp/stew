This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run i && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Connected services

- Google IAM: https://console.cloud.google.com/auth/clients?project=stew-441422
    - Ensure to add the vercel preview deploy per branch to the Web client's authorized origins and redirects
- Neon database: https://console.neon.tech/app/projects/lively-grass-00245983
- Vercel: https://vercel.com/josh-comptons-projects/stew
    - ensure new database branches have the correct connection urls set in...
      - your local .env file
      - the env variables for the vercel branch (should be set by the integration, but wilder things have happened)