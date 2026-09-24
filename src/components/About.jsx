import {Download} from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const About = ({about}) => {
    return (
        <FadeInSection>
            <section className="section about" id="about">
                <p className="eyebrow">cat ~/about.md</p>
                <div className="about-body">
                    <img
                        className="about-avatar"
                        src={about?.image || "/user.png"}
                        alt={about?.name || "User"}
                        loading="eager"
                        width={120}
                        height={120}
                    />
                    <div>
                        <h2>{about?.headline}</h2>
                        {about?.location && (
                            <p className="about-location">{about.location}</p>
                        )}
                        <div className="about-description">
                            {[].concat(about?.description ?? []).map((para) => (
                                <p key={para}>{para}</p>
                            ))}
                        </div>
                        {about?.cv && (
                            <a
                                className="cv-button"
                                href={about.cv}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`${about?.name || "CV"}.pdf`}
                            >
                                <Download size={16} strokeWidth={1.75}/>
                                Download CV
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </FadeInSection>
    );
};

export default About;

