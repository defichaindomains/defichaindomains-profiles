import { Html, Head, Main, NextScript } from "next/document";

/**
 * This is a default page that comes with Next.js
 * We can define some metadata about our app in here like title for example
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Defichain Domains Profile</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="Defichain Domains Profile - One page to show who you are and everything you make and own.

."
      />
      <meta
        name="keywords"
        content="Defichain Domains Profiles, web3, domains, profiles.

        "
      />
      <meta name="author" content="Defichain Domains" />
      <meta name="og:title" content="Defichain Domains Pay" />
      <meta
        name="og:description"
        content="One page to show who you are and everything you make and own."
      />
      <meta name="og:type" content="website" />
      <meta
        name="og:url"
        content="https://www.profile.defichain-domains.com"
      ></meta>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
