import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="icon" href="/logo.png" type="image/png" />

        <title>MergeMate - Connect with Open-Source Projects</title>
        <meta
          name="description"
          content="MergeMate makes it easy for developers to discover and contribute to open-source projects that align with their skills and interests."
        />
        <meta
          name="keywords"
          content="open-source, contribute, projects, developer, MergeMate, contribution, GitHub, programming"
        />
        <meta name="author" content="MergeMate" />

        {/* <!-- Open Graph meta tags --> */}
        <meta property="og:title" content="MergeMate - Connect with Open-Source Projects" />
        <meta
          property="og:description"
          content="A platform that connects developers with open-source projects, making contributions seamless and exciting."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://www.mergemate.com" />
        <meta property="og:type" content="website" />

        {/* <!-- Twitter meta tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MergeMate - Connect with Open-Source Projects" />
        <meta
          name="twitter:description"
          content="Find open-source projects that align with your interests and contribute seamlessly with MergeMate."
        />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
