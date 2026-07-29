import {createContext, useEffect, useState} from "react";

export const ThemeContext = createContext();

export const THEME_STYLES = [
    {id: "terminal", label: "Terminal Zsh"},
    {id: "minimal", label: "Vercel Dark"},
    {id: "emerald", label: "Matrix Green"},
    {id: "nordic", label: "Nordic Slate"},
    {id: "cyberpunk", label: "Cyberpunk Neon"},
];

export const ThemeProvider = ({children}) => {
    const [themeStyle, setThemeStyle] = useState(() => {
        return localStorage.getItem("themeStyle") || "terminal";
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    useEffect(() => {
        localStorage.setItem("themeStyle", themeStyle);
        localStorage.setItem("theme", theme);
        document.body.className = `${theme === "dark" ? "dark-theme" : "light-theme"} theme-${themeStyle}`;
    }, [themeStyle, theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const changeThemeStyle = (styleId) => {
        setThemeStyle(styleId);
    };

    return (
        <ThemeContext.Provider
            value={{theme, toggleTheme, themeStyle, changeThemeStyle}}
        >
            {children}
        </ThemeContext.Provider>
    );
};
