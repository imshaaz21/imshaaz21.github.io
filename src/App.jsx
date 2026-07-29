import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "./ThemeContext";
import Meta from "./components/Meta";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Experiences from "./components/Experiences";
import Educations from "./components/Educations";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CursorGlow from "./components/CursorGlow";
import content from "./data/content.json";

function App() {
  const { theme } = useContext(ThemeContext);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(
      theme === "dark" ? "dark-theme" : "light-theme"
    );
  }, [theme]);

  useEffect(() => {
    let ticking = false;
    const sectionIds = [
      "about",
      "experience",
      "projects",
      "skills",
      "education",
      "contact",
    ];

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress =
            totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          setShowScrollTopButton(window.scrollY > 250);

          const isAtBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 40;

          if (isAtBottom) {
            setActiveSection("contact");
          } else {
            const scrollPosition = window.scrollY + 140;
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const el = document.getElementById(sectionIds[i]);
              if (el && el.offsetTop <= scrollPosition) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -30;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Meta meta={content.meta} />
      <CursorGlow />
      <div className="layout">

        <NavBar
          scrollToSection={scrollToSection}
          scrollProgress={scrollProgress}
          activeSection={activeSection}
          about={content.about}
          socials={content.socials}
        />
        <main className="main">
          <About about={content.about} />
          <Experiences experiences={content.experiences} />
          <Projects projects={content.projects} />
          <Skills skills={content.skills} />
          <Educations educations={content.education} />
          <Contact contact={content.contact} />
          <Footer />
        </main>
      </div>
      {showScrollTopButton && <ScrollToTopButton onClick={scrollToSection} />}
    </>
  );
}

export default App;

