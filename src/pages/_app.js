import "../styles/globals.css";
import { AppContextProvider } from "../data/context/AppContext";
import { AuthProvider } from "../data/context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthProvider>
  );
}
export default MyApp;
