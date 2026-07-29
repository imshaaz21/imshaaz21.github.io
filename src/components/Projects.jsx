import {Activity, ArrowUpRight, Binary, FolderGit2, Landmark, ScanEye, Sparkles, Sprout,} from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const getProjectFallbackIcon = (title = "") => {
    const lower = title.toLowerCase();
    if (lower.includes("object") || lower.includes("detection") || lower.includes("domain")) {
        return <ScanEye size={36} strokeWidth={1.5} className="fallback-icon"/>;
    }
    if (lower.includes("health") || lower.includes("companion") || lower.includes("aware")) {
        return <Activity size={36} strokeWidth={1.5} className="fallback-icon"/>;
    }
    if (lower.includes("bank") || lower.includes("finance")) {
        return <Landmark size={36} strokeWidth={1.5} className="fallback-icon"/>;
    }
    if (lower.includes("crop") || lower.includes("agriculture") || lower.includes("smart")) {
        return <Sprout size={36} strokeWidth={1.5} className="fallback-icon"/>;
    }
    if (lower.includes("canny") || lower.includes("edge") || lower.includes("scratch")) {
        return <Binary size={36} strokeWidth={1.5} className="fallback-icon"/>;
    }
    return <FolderGit2 size={36} strokeWidth={1.5} className="fallback-icon"/>;
};

const Projects = ({projects = []}) => {
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.style.display = "none";
        if (e.target.nextSibling) {
            e.target.nextSibling.style.display = "flex";
        }
    };

    return (
        <FadeInSection>
            <section className="section" id="projects">
                <p className="eyebrow">ls -la ~/projects</p>
                <h2>Projects</h2>
                <div className="project-grid">
                    {projects.map((project, idx) => {
                        const isFeatured = idx === 0;
                        const projectSlug = project.title
                            ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                            : "project";
                        return (
                            <a
                                key={project.title}
                                className={`project-card ${isFeatured ? "project-card-featured" : ""}`}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {isFeatured && (
                                    <div className="featured-badge">
                                        <Sparkles size={12}/>
                                        <span>Featured</span>
                                    </div>
                                )}
                                <div className="project-card-image-wrapper">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            onError={handleImageError}
                                        />
                                    ) : null}
                                    <div
                                        className="project-card-fallback"
                                        style={{display: project.image ? "none" : "flex"}}
                                    >
                                        <div className="fallback-grid-pattern" aria-hidden="true"/>
                                        {getProjectFallbackIcon(project.title)}
                                        <span className="fallback-tag">~/{projectSlug}</span>
                                    </div>
                                </div>
                                <div className="project-card-body">
                                    <h3>
                                        {project.title}
                                        <ArrowUpRight size={16} strokeWidth={1.75} className="project-arrow"/>
                                    </h3>
                                    <p>{project.description}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </section>
        </FadeInSection>
    );
};

export default Projects;



