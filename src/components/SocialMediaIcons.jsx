import {useState} from "react";
import {Check, Github, Linkedin, Mail, Share2} from "lucide-react";

const SocialMediaIcons = ({github, linkedin, email, onToast}) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                if (onToast) onToast("Link copied to clipboard!");
                setTimeout(() => setCopied(false), 2200);
            }
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    return (
        <div className="social-icons">
            {email && (
                <a href={`mailto:${email}`} aria-label="Email" title={email}>
                    <Mail size={18} strokeWidth={1.75}/>
                </a>
            )}
            {github && (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title={github.split("/").pop()}
                >
                    <Github size={18} strokeWidth={1.75}/>
                </a>
            )}
            {linkedin && (
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title={linkedin.split("/").pop()}
                >
                    <Linkedin size={18} strokeWidth={1.75}/>
                </a>
            )}
            <button
                onClick={handleShare}
                className="share-icon-btn"
                aria-label="Share profile link"
                title={copied ? "Link Copied!" : "Share / Copy link"}
            >
                {copied ? (
                    <Check size={18} strokeWidth={1.75} className="copied-icon"/>
                ) : (
                    <Share2 size={18} strokeWidth={1.75}/>
                )}
            </button>
        </div>
    );
};

export default SocialMediaIcons;
