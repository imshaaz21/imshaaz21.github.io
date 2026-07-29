import {useContext, useEffect, useRef} from "react";
import {ThemeContext} from "../ThemeContext";
import SocialMediaIcons from "./SocialMediaIcons";
import {Moon, Sun} from "lucide-react";

const sections = [
    {id: "about", label: "about"},
    {id: "experience", label: "experience"},
    {id: "projects", label: "projects"},
    {id: "skills", label: "skills"},
    {id: "education", label: "education"},
    {id: "contact", label: "contact"},
];

const NavBar = ({scrollToSection, scrollProgress, about, socials, activeSection}) => {
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
                <span style={{width: `${scrollProgress}%`}}/>
            </div>

            <div className="terminal-window-bar">
                <div className="terminal-dots" aria-hidden="true">
                    <span className="dot dot-close"/>
                    <span className="dot dot-min"/>
                    <span className="dot dot-max"/>
                </div>
                <span className="terminal-title">zsh: shanaaz@dev:~</span>
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
                        <span className="prompt-symbol">❯</span> {about?.title}
                        <span className="terminal-cursor">_</span>
                    </p>
                </div>

                <div className="mobile-header-right">
                    <SocialMediaIcons
                        email={socials?.email}
                        github={socials?.github}
                        linkedin={socials?.linkedin}
                    />
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
                                        <span className="prompt-symbol">{isActive ? "❯" : "$"}</span>
                                        <span className="nav-cmd">cd ~/{section.label}</span>
                                        {isActive && <span className="terminal-active-indicator">_</span>}
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
                                    <span className="mobile-prompt-symbol">{isActive ? "❯" : "$"}</span>
                                    <span className="mobile-prompt-path">cd ~/{section.label}</span>
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
