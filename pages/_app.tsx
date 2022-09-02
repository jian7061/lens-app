import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ padding: "100px" }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
