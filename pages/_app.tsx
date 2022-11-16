import { NextComponentType, NextPageContext } from "next";
import "../styles/index.css";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}

export default MyApp;
