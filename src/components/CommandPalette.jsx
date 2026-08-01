import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../ThemeContext";
import {CornerDownLeft, Terminal, X} from "lucide-react";

const AVAILABLE_COMMANDS = [
    {cmd: "help", desc: "List all available terminal commands"},
    {cmd: "cd about", desc: "Navigate to About section"},
    {cmd: "cd experience", desc: "Navigate to Experience section"},
    {cmd: "cd projects", desc: "Navigate to Projects section"},
    {cmd: "cd skills", desc: "Navigate to Skills section"},
    {cmd: "cd education", desc: "Navigate to Education section"},
    {cmd: "cd contact", desc: "Navigate to Contact section"},
    {cmd: "ls", desc: "List all portfolio sections"},
    {cmd: "theme toggle", desc: "Toggle between Dark and Light mode"},
    {cmd: "whoami", desc: "Display quick profile summary"},
    {cmd: "cv", desc: "Download CV / Resume"},
    {cmd: "clear", desc: "Clear terminal screen history"},
];

const CommandPalette = ({isOpen, onClose, scrollToSection, about}) => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState([
        {
            type: "system",
            text: "Welcome to Shanaaz's Interactive Terminal! Type 'help' to list commands.",
        },
    ]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistory, setCommandHistory] = useState([]);

    const inputRef = useRef(null);
    const terminalEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            terminalEndRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [history, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                }
            } else if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const executeCommand = (rawCmd) => {
        const trimmed = rawCmd.trim();
        if (!trimmed) return;

        const cmdLower = trimmed.toLowerCase();
        const newHistory = [...history, {type: "input", text: trimmed}];
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);

        const parts = cmdLower.split(" ");
        const action = parts[0];
        const arg = parts.slice(1).join(" ");

        if (action === "clear" || action === "cls") {
            setHistory([]);
            setInputVal("");
            return;
        }

        if (action === "help" || action === "?") {
            newHistory.push({
                type: "output",
                content: (
                    <div className="cmd-help-grid">
                        <span className="cmd-help-title">Available Commands:</span>
                        {AVAILABLE_COMMANDS.map((item) => (
                            <div key={item.cmd} className="cmd-help-row" onClick={() => executeCommand(item.cmd)}>
                                <code className="cmd-code">{item.cmd}</code>
                                <span className="cmd-desc">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                ),
            });
        } else if (action === "ls") {
            newHistory.push({
                type: "output",
                text: "sections:  ~/about  ~/experience  ~/projects  ~/skills  ~/education  ~/contact",
            });
        } else if (action === "whoami") {
            newHistory.push({
                type: "output",
                text: `${about?.name || "Shanaaz Ahamed"} — ${about?.title || "Software Engineer"} based in ${about?.location || "Colombo, Sri Lanka"}.`,
            });
        } else if (action === "cd" || action === "goto") {
            const target = arg.replace(/^~\//, "").replace(/^#/, "").trim();
            const validSections = ["about", "experience", "projects", "skills", "education", "contact"];
            if (!target) {
                newHistory.push({type: "output", text: "Usage: cd <section> (e.g., cd projects)"});
            } else if (validSections.includes(target)) {
                newHistory.push({type: "success", text: `Navigating to ~/${target}...`});
                scrollToSection(target);
                setTimeout(() => onClose(), 450);
            } else {
                newHistory.push({
                    type: "error",
                    text: `bash: cd: ${target}: No such section. Type 'ls' to see sections.`,
                });
            }
        } else if (action === "theme") {
            if (arg === "light" || arg === "dark") {
                if (theme !== arg) toggleTheme();
                newHistory.push({type: "success", text: `Switched theme to ${arg} mode.`});
            } else {
                toggleTheme();
                newHistory.push({type: "success", text: "Toggled theme mode."});
            }
        } else if (action === "cv" || action === "resume" || action === "download") {
            if (about?.cv) {
                window.open(about.cv, "_blank");
                newHistory.push({type: "success", text: "Opening CV document..."});
            } else {
                newHistory.push({type: "error", text: "CV file not found."});
            }
        } else if (action === "contact" || action === "email") {
            newHistory.push({type: "success", text: "Navigating to Contact section..."});
            scrollToSection("contact");
            setTimeout(() => onClose(), 450);
        } else if (action === "sudo") {
            newHistory.push({
                type: "error",
                text: "Permission denied: visitor is not in the sudoers file. This incident will be reported to Shanaaz 🤖",
            });
        } else if (action === "exit" || action === "quit") {
            onClose();
            return;
        } else {
            newHistory.push({
                type: "error",
                text: `zsh: command not found: ${trimmed}. Type 'help' for available commands.`,
            });
        }

        setHistory(newHistory);
        setInputVal("");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        executeCommand(inputVal);
    };

    const handleKeyDownInInput = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(nextIdx);
            setInputVal(commandHistory[nextIdx] || "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === -1) return;
            const nextIdx = historyIndex + 1;
            if (nextIdx >= commandHistory.length) {
                setHistoryIndex(-1);
                setInputVal("");
            } else {
                setHistoryIndex(nextIdx);
                setInputVal(commandHistory[nextIdx] || "");
            }
        }
    };

    return (
        <div className="cmd-modal-overlay" onClick={onClose}>
            <div
                className="cmd-modal-window"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Interactive Terminal Command Palette"
            >
                <div className="cmd-window-header">
                    <div className="cmd-dots">
                        <span className="dot dot-close" onClick={onClose} title="Close"/>
                        <span className="dot dot-min"/>
                        <span className="dot dot-max"/>
                    </div>
                    <div className="cmd-window-title">
                        <Terminal size={14}/>
                        <span>shanaaz@dev:~ (zsh) — Press Esc to exit</span>
                    </div>
                    <button className="cmd-close-btn" onClick={onClose} aria-label="Close terminal">
                        <X size={16}/>
                    </button>
                </div>

                <div className="cmd-suggestions-bar">
                    <span className="cmd-suggestions-label">Quick Commands:</span>
                    <button className="cmd-chip" onClick={() => executeCommand("help")}>help</button>
                    <button className="cmd-chip" onClick={() => executeCommand("ls")}>ls</button>
                    <button className="cmd-chip" onClick={() => executeCommand("cd projects")}>cd projects</button>
                    <button className="cmd-chip" onClick={() => executeCommand("theme toggle")}>theme</button>
                    <button className="cmd-chip" onClick={() => executeCommand("whoami")}>whoami</button>
                </div>

                <div className="cmd-terminal-body">
                    {history.map((item, index) => (
                        <div key={index} className={`cmd-log-line ${item.type}`}>
                            {item.type === "input" && (
                                <div className="cmd-input-echo">
                                    <span className="prompt-user">shanaaz</span>
                                    <span className="prompt-at">@</span>
                                    <span className="prompt-host">dev</span>
                                    <span className="prompt-colon">:</span>
                                    <span className="prompt-path">~</span>
                                    <span className="prompt-char">$</span>
                                    <span className="cmd-text">{item.text}</span>
                                </div>
                            )}
                            {item.type === "system" && <div className="cmd-system">{item.text}</div>}
                            {item.type === "output" && (
                                <div className="cmd-output">{item.content || item.text}</div>
                            )}
                            {item.type === "success" && <div className="cmd-success">✔ {item.text}</div>}
                            {item.type === "error" && <div className="cmd-error">✖ {item.text}</div>}
                        </div>
                    ))}
                    <div ref={terminalEndRef}/>
                </div>

                <form className="cmd-input-line" onSubmit={handleFormSubmit}>
                    <span className="prompt-user">shanaaz</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-host">dev</span>
                    <span className="prompt-colon">:</span>
                    <span className="prompt-path">~</span>
                    <span className="prompt-char">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        className="cmd-terminal-input"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDownInInput}
                        placeholder="Type a command (e.g. 'help', 'cd skills', 'theme')..."
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <button type="submit" className="cmd-send-btn" title="Execute command">
                        <CornerDownLeft size={14}/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommandPalette;
