import {ArrowUpRight} from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const Projects = ({projects = []}) => {
    return (
        <FadeInSection>
            <section className="section" id="projects">
                <p className="eyebrow">ls -la ~/projects</p>
                <h2>Projects</h2>
                <div className="project-grid">
                    {projects.map((project, idx) => {
                        const isFeatured = idx === 0;
                        const Card = project.link ? "a" : "div";
                        const linkProps = project.link
                            ? {href: project.link, target: "_blank", rel: "noopener noreferrer"}
                            : {};
                        return (
                            <Card
                                key={project.title}
                                className={`project-card ${isFeatured ? "project-card-featured" : ""}`}
                                {...linkProps}
                            >
                                {isFeatured && <p className="featured-badge">Featured</p>}
                                <h3>
                                    {project.title}
                                    {project.link && (
                                        <ArrowUpRight size={16} strokeWidth={1.75} className="project-arrow"/>
                                    )}
                                </h3>
                                <p className="project-description">{project.description}</p>
                                {project.tags?.length > 0 && (
                                    <div className="project-tags">
                                        {project.tags.map((tag) => (
                                            <span className="tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </section>
        </FadeInSection>
    );
};

export default Projects;
