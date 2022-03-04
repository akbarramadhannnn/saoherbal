import "../styles/globals.css";
import "./index.scss";
import Layout from "../layout";
import { loadIcons } from "../utils/IconLoader";

loadIcons();

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
