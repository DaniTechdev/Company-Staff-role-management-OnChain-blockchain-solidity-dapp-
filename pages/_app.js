import "../styles/globals.css";

//INTERNAL IMPORTManagementProvider

import { ManagementProvider } from "../context/ManagementContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ManagementProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </ManagementProvider>
    </>
  );
};

export default MyApp;
