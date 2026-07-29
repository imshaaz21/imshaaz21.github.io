import FadeInSection from "../utils/FadeInSection";

const Educations = ({educations = []}) => {
    return (
        <FadeInSection>
            <section className="section" id="education">
                <p className="eyebrow">cat ~/education.log</p>
                <h2>Education</h2>
                <div className="timeline">
                    {educations.map((item) => (
                        <div className="timeline-item" key={`${item.field}-${item.place}`}>
                            <p className="timeline-date">{item.date}</p>
                            <h3 className="timeline-position">{item.field}</h3>
                            <p className="timeline-workplace">{item.place}</p>
                            {item.descriptions?.length > 0 && (
                                <p className="timeline-note">{item.descriptions.join(" · ")}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </FadeInSection>
    );
};

export default Educations;

