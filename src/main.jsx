import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./index.css";
import {ThemeProvider} from "./ThemeContext";
import {HelmetProvider} from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </HelmetProvider>
);
