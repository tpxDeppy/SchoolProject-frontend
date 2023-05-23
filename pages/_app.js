import { SearchPeopleProvider } from "./searchPeople/searchPeopleContext";

import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <SearchPeopleProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchPeopleProvider>
  );
}
