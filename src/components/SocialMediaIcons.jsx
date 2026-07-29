import { Github, Linkedin, Mail } from "lucide-react";

const SocialMediaIcons = ({ github, linkedin, email }) => {
  return (
    <div className="social-icons">
      {email && (
        <a href={`mailto:${email}`} aria-label="Email" title={email}>
          <Mail size={18} strokeWidth={1.75} />
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
          <Github size={18} strokeWidth={1.75} />
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
          <Linkedin size={18} strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
};

export default SocialMediaIcons;
