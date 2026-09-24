import {Github, Linkedin, Mail} from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const Contact = ({socials}) => {
    const links = [
        socials?.email && {icon: Mail, label: "Email", value: socials.email, href: `mailto:${socials.email}`},
        socials?.linkedin && {icon: Linkedin, label: "LinkedIn", value: socials.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: socials.linkedin},
        socials?.github && {icon: Github, label: "GitHub", value: socials.github.replace(/^https?:\/\//, ""), href: socials.github},
    ].filter(Boolean);

    return (
        <FadeInSection>
            <section className="section" id="contact">
                <p className="eyebrow">cat ~/contact</p>
                <h2>Get in touch</h2>
                <p className="contact-lead">The best way to reach me is by email.</p>
                <ul className="contact-links">
                    {links.map(({icon: Icon, label, value, href}) => (
                        <li key={label}>
                            <a
                                href={href}
                                {...(href.startsWith("http") && {target: "_blank", rel: "noopener noreferrer"})}
                            >
                                <Icon size={16} strokeWidth={1.75} aria-hidden="true"/>
                                <span className="contact-label">{label}</span>
                                <span className="contact-value">{value}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </FadeInSection>
    );
};

export default Contact;
