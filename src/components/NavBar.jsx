import {useContext, useEffect, useRef} from "react";
import {ThemeContext} from "../ThemeContext";
import SocialMediaIcons from "./SocialMediaIcons";
import {Moon, Search, Sun} from "lucide-react";

const sections = [
    {id: "about", label: "About"},
    {id: "experience", label: "Experience"},
    {id: "projects", label: "Projects"},
    {id: "skills", label: "Skills"},
    {id: "education", label: "Education"},
    {id: "contact", label: "Contact"},
];

const SEARCH_KEY = /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl+K";

const NavBar = ({scrollToSection, about, socials, activeSection, onOpenCmdPalette, onToast}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const activeMobileTabRef = useRef(null);

    useEffect(() => {
        if (activeMobileTabRef.current) {
            activeMobileTabRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [activeSection]);

    return (
        <aside className="sidebar" id="navbar">
            <div className="sidebar-progress" aria-hidden="true">
                <span style={{width: "var(--scroll-progress, 0%)"}}/>
            </div>

            <div
                className="terminal-window-bar interactive"
                onClick={onOpenCmdPalette}
                title={`Search (${SEARCH_KEY})`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpenCmdPalette()}
            >
                <span className="terminal-title">
                    <Search size={13} aria-hidden="true"/> Search
                </span>
                <span className="terminal-bar-badge">{SEARCH_KEY}</span>
            </div>

            <div className="sidebar-top">
                <div className="sidebar-brand">
                    <div className="terminal-prompt">
                        <span className="prompt-user">shanaaz</span>
                        <span className="prompt-at">@</span>
                        <span className="prompt-host">dev</span>
                        <span className="prompt-colon">:</span>
                        <span className="prompt-path">~</span>
                        <span className="prompt-char">$</span>
                        <span className="prompt-command">whoami</span>
                    </div>
                    <h1 className="sidebar-name">{about?.name}</h1>
                    <p className="sidebar-title">
                        {about?.title}
                    </p>
                </div>

                <div className="mobile-header-right">
                    <SocialMediaIcons
                        email={socials?.email}
                        github={socials?.github}
                        linkedin={socials?.linkedin}
                        onToast={onToast}
                    />
                    <button
                        className="theme-toggle-btn"
                        onClick={onOpenCmdPalette}
                        aria-label="Search"
                        title={`Search (${SEARCH_KEY} or /)`}
                    >
                        <Search size={15}/>
                    </button>
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? <Sun size={15}/> : <Moon size={15}/>}
                    </button>
                </div>

                <nav className="desktop-nav" aria-label="Section navigation">
                    <ul className="sidebar-nav">
                        {sections.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <li key={section.id}>
                                    <button
                                        onClick={() => scrollToSection(section.id)}
                                        className={`terminal-nav-btn ${isActive ? "active" : ""}`}
                                    >
                                        {section.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            <nav className="mobile-nav" aria-label="Mobile section navigation">
                <div className="mobile-terminal-bar">
                    <div className="mobile-nav-scroll">
                        {sections.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    ref={isActive ? activeMobileTabRef : null}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`mobile-terminal-tab ${isActive ? "active" : ""}`}
                                >
                                    {section.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <div className="sidebar-footer">
                <SocialMediaIcons
                    email={socials?.email}
                    github={socials?.github}
                    linkedin={socials?.linkedin}
                    onToast={onToast}
                />
                <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                >
                    {theme === "dark" ? (
                        <>
                            <Sun size={14}/> <span>light mode</span>
                        </>
                    ) : (
                        <>
                            <Moon size={14}/> <span>dark mode</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default NavBar;
