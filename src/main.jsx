import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./index.css";
import {ThemeProvider} from "./ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <App/>
    </ThemeProvider>
);
