import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../ThemeContext";
import {
    CornerDownLeft,
    FileText,
    Folder,
    Mail,
    Moon,
    Sun,
    User,
} from "lucide-react";

const COMMANDS = [
    {
        id: "about",
        cmd: "cd ~/about",
        title: "About",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("about"),
    },
    {
        id: "experience",
        cmd: "cd ~/experience",
        title: "Experience",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("experience"),
    },
    {
        id: "projects",
        cmd: "cd ~/projects",
        title: "Projects",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("projects"),
    },
    {
        id: "skills",
        cmd: "cd ~/skills",
        title: "Skills",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("skills"),
    },
    {
        id: "education",
        cmd: "cd ~/education",
        title: "Education",
        icon: Folder,
        action: (scrollToSection) => scrollToSection("education"),
    },
    {
        id: "contact",
        cmd: "cd ~/contact",
        title: "Contact",
        icon: Mail,
        action: (scrollToSection) => scrollToSection("contact"),
    },
    {
        id: "theme",
        cmd: "theme toggle",
        title: "Toggle Theme",
        icon: Moon,
        action: (scrollToSection, toggleTheme) => toggleTheme(),
    },
    {
        id: "whoami",
        cmd: "whoami",
        title: "Who Am I",
        icon: User,
        action: null,
    },
    {
        id: "cv",
        cmd: "cat ~/cv.pdf",
        title: "Download CV",
        icon: FileText,
        action: (scrollToSection, toggleTheme, cvUrl) => {
            if (cvUrl) window.open(cvUrl, "_blank");
        },
    },
];

const CommandPalette = ({isOpen, onClose, scrollToSection, about}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [systemOutput, setSystemOutput] = useState(null);

    const inputRef = useRef(null);

    const filtered = COMMANDS.filter((item) => {
        const q = query.toLowerCase().trim();
        if (!q) return true;
        return (
            item.title.toLowerCase().includes(q) ||
            item.cmd.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setSystemOutput(null);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 30);
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
            setSystemOutput(`${about?.name || "Shanaaz Ahamed"} | ${about?.title || "Software Engineer"} (${about?.location || "Colombo, Sri Lanka"})`);
            return;
        }

        if (item.action) {
            item.action(scrollToSection, toggleTheme, about?.cv);
            onClose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filtered.length > 0) {
                executeItem(filtered[selectedIndex]);
            }
        }
    };

    return (
        <div className="cmd-backdrop" onClick={onClose}>
            <div className="cmd-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                <div className="cmd-header">
                    <span className="cmd-prompt-symbol">❯</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="cmd-input"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <kbd className="cmd-esc-badge" onClick={onClose}>esc</kbd>
                </div>

                {systemOutput && (
                    <div className="cmd-system-output">
                        <span className="cmd-out-prefix">❯ output:</span>
                        <span>{systemOutput}</span>
                    </div>
                )}

                <div className="cmd-list">
                    {filtered.length === 0 ? (
                        <div className="cmd-empty">No matching commands</div>
                    ) : (
                        filtered.map((item, index) => {
                            const IconComp = item.icon;
                            const isSelected = index === selectedIndex;
                            return (
                                <div
                                    key={item.id}
                                    className={`cmd-row ${isSelected ? "selected" : ""}`}
                                    onClick={() => executeItem(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                >
                                    <div className="cmd-row-left">
                                        <span className="cmd-symbol">{isSelected ? "❯" : "$"}</span>
                                        {item.id === "theme" ? (
                                            theme === "dark" ? <Sun size={13}/> : <Moon size={13}/>
                                        ) : (
                                            <IconComp size={13}/>
                                        )}
                                        <span className="cmd-title">{item.title}</span>
                                    </div>
                                    <div className="cmd-row-right">
                                        <code className="cmd-code">{item.cmd}</code>
                                        {isSelected && <CornerDownLeft size={12} className="cmd-enter"/>}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="cmd-footer">
                    <span>↑↓ navigate · ↵ select · esc close</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
