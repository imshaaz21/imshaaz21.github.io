import FadeInSection from "../utils/FadeInSection";

const Skills = ({skills = []}) => {
    return (
        <FadeInSection>
            <section className="section" id="skills">
                <p className="eyebrow">neofetch --skills</p>
                <h2>Skills</h2>
                <div className="skill-list">
                    {skills.map((skill) => (
                        <div className="skill-row" key={skill.category}>
                            <p className="skill-category">{skill.category}</p>
                            <div className="skill-tags">
                                {skill.items?.map((item) => (
                                    <span className="tag" key={item}>
                    {item}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </FadeInSection>
    );
};

export default Skills;

