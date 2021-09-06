import "../styles/globals.scss";
import "../styles/reset.scss";
import AuthProvider from "../lib/auth";

export function reportWebVitals(metric) {
  console.log("パフォーマンス", metric.name, metric.value);
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
