import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { scroller } from "react-scroll";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, LinearProgress } from "@mui/material";
import Meta from "./components/Meta";
import Navbar from "./components/NavBar";
import About from "./components/About";
import Experiences from "./components/Experiences";
import Educations from "./components/Educations";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ScrollToTopButton from "./components/ScrollToTopButton";
import details from "../details.json";
import "./App.css";
import Skills from "./components/Skills";

function App() {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(
      theme === "dark" ? "dark-theme" : "light-theme"
    );
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      if (window.scrollY > 0) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 200,
      offset: -80,
    });
  };

  return (
    <>
      {loading ? (
        <Box className="loading-screen d-flex justify-content-center align-items-center">
          <CircularProgress size="2rem" color="inherit" />
        </Box>
      ) : (
        <>
          <Navbar
            scrollToSection={scrollToSection}
            scrollProgress={scrollProgress}
          />
          {details && (
            <>
              <Meta meta={details.meta} />
              <About about={details.about} />
              <Experiences experiences={details.experiences} />
              <Skills skills={details.skills} />
              <Projects projects={details.projects} />
              <Educations educations={details.educations} />
              <Contact contact={details.contact} />
            </>
          )}
          <Footer />
          {showScrollTopButton && (
            <ScrollToTopButton onClick={scrollToSection} />
          )}
        </>
      )}
    </>
  );
}

export default App;
