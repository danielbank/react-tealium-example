import Head from "next/head";
import Script from "next/script";
import { useUtag } from "hooks/useUtag";
import type { Utag } from "hooks/useUtag";
import { ShirtsForm } from "components/ShirtsForm";

import styles from "./index.module.css";
import { useEffect } from "react";

export default function Home() {
  const TEALIUM_ACCOUNT = process.env.NEXT_PUBLIC_TEALIUM_ACCOUNT;
  const TEALIUM_PROFILE = process.env.NEXT_PUBLIC_TEALIUM_PROFILE;
  const TEALIUM_ENV = process.env.NEXT_PUBLIC_TEALIUM_ENV;

  const utag: Utag = useUtag();

  useEffect(() => {
    // Explicitly handle page views
    utag.view({ page_name: "Mens Fashion: View Page" });
  }, [utag]);

  return (
    <>
      <Head>
        <title>Next.js React Tealium Example</title>
        <meta name="description" content="Next.js React Tealium Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ShirtsForm />
      </main>
      <Script
        id="utag_data"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var utag_data={
                "page_type"     : "section",
                "site_section"  : "men",
                "page_name"     : "Men's Fashion | Acme Inc.",
                "country_code"  : "US",
                "currency_code" : "USD"};
            window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
            window.utag_cfg_ovrd.noview = true
          `,
        }}
      />
      <Script
        id="utag_script"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(a,b,c,d) {
                a='//tags.tiqcdn.com/utag/${TEALIUM_ACCOUNT}/${TEALIUM_PROFILE}/${TEALIUM_ENV}/utag.js';
                b=document;c='script';d=b.createElement(c);d.src=a;
                d.type='text/java'+c;d.async=true;
                a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a)})();
          `,
        }}
      />
    </>
  );
}
