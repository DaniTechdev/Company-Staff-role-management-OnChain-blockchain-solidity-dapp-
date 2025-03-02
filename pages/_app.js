import "../styles/globals.css";

//INTERNAL IMPORT

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Component {...pageProps} />
  </div>
);

export default MyApp;
