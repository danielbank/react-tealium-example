import { type AppType } from "next/dist/shared/lib/utils";
import { UtagProvider } from "hooks/useUtag";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UtagProvider>
      <Component {...pageProps} />
    </UtagProvider>
  );
};

export default MyApp;
