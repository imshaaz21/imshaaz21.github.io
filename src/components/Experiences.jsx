import FadeInSection from "../utils/FadeInSection";

const Experiences = ({experiences = []}) => {
    return (
        <FadeInSection>
            <section className="section" id="experience">
                <p className="eyebrow">git log --oneline ~/experience</p>
                <h2>Experience</h2>
                <div className="timeline">
                    {experiences.map((item) => (
                        <div className="timeline-item" key={`${item.workplace}-${item.position}`}>
                            <p className="timeline-date">{item.date}</p>
                            <h3 className="timeline-position">{item.position}</h3>
                            <p className="timeline-workplace">
                                {item.workplace}
                                {item.place ? ` · ${item.place}` : ""}
                            </p>
                            {item.descriptions?.length > 0 && (
                                <ul className="timeline-list">
                                    {item.descriptions.map((desc, idx) => (
                                        <li key={idx}>{desc}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </FadeInSection>
    );
};

export default Experiences;

