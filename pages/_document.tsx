import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

import theme from "@/components/theme";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="emotion-insertion-point" content="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
  };
};
