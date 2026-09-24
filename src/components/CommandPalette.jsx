import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../ThemeContext";
import {
    Briefcase,
    CornerDownLeft,
    FileText,
    FolderGit2,
    GraduationCap,
    Mail,
    Moon,
    Search,
    Sun,
    User,
    Wrench,
} from "lucide-react";

const SECTIONS = [
    {id: "about", title: "About", icon: User},
    {id: "experience", title: "Experience", icon: Briefcase},
    {id: "projects", title: "Projects", icon: FolderGit2},
    {id: "skills", title: "Skills", icon: Wrench},
    {id: "education", title: "Education", icon: GraduationCap},
    {id: "contact", title: "Contact", icon: Mail},
];

const CommandPalette = ({isOpen, onClose, scrollToSection, about}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const inputRef = useRef(null);

    const commands = [
        ...SECTIONS.map((s) => ({
            ...s,
            group: "Navigate",
            run: () => scrollToSection(s.id),
        })),
        {
            id: "theme",
            group: "Actions",
            title: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
            icon: theme === "dark" ? Sun : Moon,
            run: toggleTheme,
        },
        about?.cv && {
            id: "cv",
            group: "Actions",
            title: "Download CV",
            icon: FileText,
            run: () => window.open(about.cv, "_blank"),
        },
    ].filter(Boolean);

    const q = query.toLowerCase().trim();
    const filtered = commands.filter((item) => !q || item.title.toLowerCase().includes(q));

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
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
        item.run();
        onClose();
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
            executeItem(filtered[selectedIndex]);
        }
    };

    return (
        <div className="cmd-backdrop" onClick={onClose}>
            <div
                className="cmd-dialog"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Search"
            >
                <div className="cmd-header">
                    <Search size={16} className="cmd-search-icon" aria-hidden="true"/>
                    <input
                        ref={inputRef}
                        type="text"
                        className="cmd-input"
                        placeholder="Search sections and actions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <kbd className="cmd-esc-badge" onClick={onClose}>Esc</kbd>
                </div>

                <div className="cmd-list">
                    {filtered.length === 0 ? (
                        <div className="cmd-empty">No results</div>
                    ) : (
                        filtered.map((item, index) => {
                            const Icon = item.icon;
                            const isSelected = index === selectedIndex;
                            const showGroup = index === 0 || filtered[index - 1].group !== item.group;
                            return (
                                <div key={item.id}>
                                    {showGroup && <div className="cmd-group">{item.group}</div>}
                                    <div
                                        className={`cmd-row ${isSelected ? "selected" : ""}`}
                                        onClick={() => executeItem(item)}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <Icon size={15} strokeWidth={1.75} className="cmd-icon"/>
                                        <span className="cmd-title">{item.title}</span>
                                        {isSelected && <CornerDownLeft size={13} className="cmd-enter"/>}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="cmd-footer">
                    <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                    <span><kbd>Esc</kbd> close</span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
