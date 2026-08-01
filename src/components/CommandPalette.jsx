import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../ThemeContext";
import {
    Command,
    CornerDownLeft,
    FileText,
    Folder,
    HelpCircle,
    Mail,
    Moon,
    Search,
    Sun,
    Terminal,
    User,
    X,
} from "lucide-react";

const COMMAND_LIST = [
    {
        id: "about",
        cmd: "cd about",
        title: "Go to About",
        desc: "Overview & personal bio",
        category: "Navigation",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("about"),
    },
    {
        id: "experience",
        cmd: "cd experience",
        title: "Go to Experience",
        desc: "Work history & roles",
        category: "Navigation",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("experience"),
    },
    {
        id: "projects",
        cmd: "cd projects",
        title: "Go to Projects",
        desc: "Featured software projects",
        category: "Navigation",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("projects"),
    },
    {
        id: "skills",
        cmd: "cd skills",
        title: "Go to Skills",
        desc: "Tech stack & tools",
        category: "Navigation",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("skills"),
    },
    {
        id: "education",
        cmd: "cd education",
        title: "Go to Education",
        desc: "Degrees & academic background",
        category: "Navigation",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("education"),
    },
    {
        id: "contact",
        cmd: "cd contact",
        title: "Go to Contact",
        desc: "Get in touch / Send message",
        category: "Navigation",
        icon: Mail,
        action: (scrollToSection) => scrollToSection("contact"),
    },
    {
        id: "theme",
        cmd: "theme toggle",
        title: "Toggle Theme",
        desc: "Switch between Dark and Light mode",
        category: "System",
        icon: Moon,
        action: (scrollToSection, toggleTheme) => toggleTheme(),
    },
    {
        id: "whoami",
        cmd: "whoami",
        title: "Who Am I",
        desc: "Display developer profile summary",
        category: "System",
        icon: User,
        action: null,
    },
    {
        id: "cv",
        cmd: "cv",
        title: "Download CV",
        desc: "Open PDF resume",
        category: "Actions",
        icon: FileText,
        action: (scrollToSection, toggleTheme, cvUrl) => {
            if (cvUrl) window.open(cvUrl, "_blank");
        },
    },
    {
        id: "help",
        cmd: "help",
        title: "Help & Commands",
        desc: "View terminal command hints",
        category: "System",
        icon: HelpCircle,
        action: null,
    },
];

const CommandPalette = ({isOpen, onClose, scrollToSection, about}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [outputMessage, setOutputMessage] = useState(null);

    const inputRef = useRef(null);
    const listRef = useRef(null);

    const filteredCommands = COMMAND_LIST.filter((item) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            item.title.toLowerCase().includes(q) ||
            item.cmd.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setOutputMessage(null);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 40);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const executeItem = (item) => {
        if (!item) return;

        if (item.id === "whoami") {
            setOutputMessage({
                type: "info",
                title: "whoami",
                text: `${about?.name || "Shanaaz Ahamed"} — ${about?.title || "Software Engineer"} based in ${about?.location || "Colombo, Sri Lanka"}.`,
            });
            return;
        }

        if (item.id === "help") {
            setOutputMessage({
                type: "info",
                title: "Terminal Commands",
                text: "Use ↑/↓ arrows to navigate, Enter to run. Commands: cd <section>, theme, cv, whoami, clear.",
            });
            return;
        }

        if (item.action) {
            item.action(scrollToSection, toggleTheme, about?.cv);
            onClose();
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                filteredCommands.length > 0 ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = query.trim().toLowerCase();

            if (trimmed === "clear" || trimmed === "cls") {
                setOutputMessage(null);
                setQuery("");
                return;
            }

            if (trimmed.startsWith("sudo")) {
                setOutputMessage({
                    type: "error",
                    title: "sudo",
                    text: "Permission denied: visitor is not in the sudoers file. Incident reported 🤖",
                });
                return;
            }

            if (filteredCommands.length > 0) {
                executeItem(filteredCommands[selectedIndex]);
            }
        }
    };

    return (
        <div className="cmd-backdrop" onClick={onClose}>
            <div className="cmd-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="cmd-search-header">
                    <Search className="cmd-search-icon" size={18}/>
                    <input
                        ref={inputRef}
                        type="text"
                        className="cmd-input"
                        placeholder="Type a command or search section (e.g. 'projects', 'theme', 'cv')..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                    <div className="cmd-header-badges">
                        <kbd className="cmd-kbd">ESC</kbd>
                        <button className="cmd-close" onClick={onClose} aria-label="Close">
                            <X size={16}/>
                        </button>
                    </div>
                </div>

                {outputMessage && (
                    <div className={`cmd-output-card ${outputMessage.type}`}>
                        <div className="cmd-output-header">
                            <span className="prompt-user">shanaaz</span>
                            <span className="prompt-at">@</span>
                            <span className="prompt-host">dev</span>
                            <span className="prompt-colon">:</span>
                            <span className="prompt-path">~</span>
                            <span className="prompt-char">$</span>
                            <span className="cmd-output-title">{outputMessage.title}</span>
                            <button className="cmd-output-clear" onClick={() => setOutputMessage(null)}>
                                <X size={12}/>
                            </button>
                        </div>
                        <p className="cmd-output-text">{outputMessage.text}</p>
                    </div>
                )}

                <div className="cmd-list" ref={listRef}>
                    {filteredCommands.length === 0 ? (
                        <div className="cmd-empty">
                            <Terminal size={24}/>
                            <p>No matching commands found</p>
                            <span>Try searching &apos;about&apos;, &apos;projects&apos;, &apos;theme&apos;, or &apos;cv&apos;</span>
                        </div>
                    ) : (
                        filteredCommands.map((item, index) => {
                            const IconComponent = item.icon || Command;
                            const isSelected = index === selectedIndex;
                            return (
                                <div
                                    key={item.id}
                                    className={`cmd-item ${isSelected ? "selected" : ""}`}
                                    onClick={() => executeItem(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="cmd-item-left">
                                        <div className="cmd-icon-box">
                                            {item.id === "theme" ? (
                                                theme === "dark" ? <Sun size={15}/> : <Moon size={15}/>
                                            ) : (
                                                <IconComponent size={15}/>
                                            )}
                                        </div>
                                        <div className="cmd-item-text">
                                            <span className="cmd-item-title">{item.title}</span>
                                            <span className="cmd-item-desc">{item.desc}</span>
                                        </div>
                                    </div>
                                    <div className="cmd-item-right">
                                        <kbd className="cmd-code-kbd">{item.cmd}</kbd>
                                        {isSelected && <CornerDownLeft size={13} className="cmd-enter-icon"/>}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="cmd-footer">
                    <div className="cmd-footer-hint">
                        <span><kbd className="cmd-kbd">↑</kbd> <kbd className="cmd-kbd">↓</kbd> Navigate</span>
                        <span><kbd className="cmd-kbd">↵</kbd> Select</span>
                        <span><kbd className="cmd-kbd">ESC</kbd> Close</span>
                    </div>
                    <div className="cmd-footer-brand">
                        <Command size={12}/>
                        <span>Terminal Palette</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
