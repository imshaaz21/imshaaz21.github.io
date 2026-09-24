import {useCallback, useEffect, useRef, useState} from "react";
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
import CommandPalette from "./components/CommandPalette";
import Toast from "./components/Toast";
import content from "./data/content.json";

function App() {
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const [activeSection, setActiveSection] = useState("about");
    const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const isClickScrollingRef = useRef(false);
    const clickTimeoutRef = useRef(null);
    const toastTimeoutRef = useRef(null);

    const showToast = useCallback((msg) => {
        setToastMessage(msg);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => {
            setToastMessage(null);
        }, 2800);
    }, []);

    const scrollToSection = useCallback((sectionId) => {
        // Prevent scroll-spy from changing section while smooth scrolling to clicked nav item
        isClickScrollingRef.current = true;

        const targetSection = sectionId === "top" ? "about" : sectionId;
        setActiveSection(targetSection);

        let targetY = 0;
        if (sectionId !== "about" && sectionId !== "top") {
            const element = document.getElementById(sectionId);
            if (element) {
                const isMobile = window.innerWidth <= 900;
                const navbarEl = document.getElementById("navbar");
                const headerHeight = isMobile && navbarEl ? navbarEl.offsetHeight : 0;
                const elementTop = element.getBoundingClientRect().top + window.scrollY;
                const offset = isMobile ? headerHeight + 12 : 24;
                targetY = Math.max(0, elementTop - offset);
            }
        }

        window.scrollTo({
            top: targetY,
            behavior: "smooth",
        });

        if (window.history.replaceState) {
            const hash = (sectionId === "about" || sectionId === "top")
                ? window.location.pathname
                : `#${sectionId}`;
            window.history.replaceState(null, "", hash);
        }

        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => {
            isClickScrollingRef.current = false;
        }, 850);
    }, []);

    useEffect(() => {
        const sectionIds = [
            "about",
            "experience",
            "projects",
            "skills",
            "education",
            "contact",
        ];

        const updateActiveSection = () => {
            if (isClickScrollingRef.current) return;

            const scrollY = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollY < 60) {
                setActiveSection("about");
                return;
            }

            const focalY = 140;
            let currentActive = "about";

            for (let i = 0; i < sectionIds.length; i++) {
                const el = document.getElementById(sectionIds[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= focalY + 30 && rect.bottom > 60) {
                        currentActive = sectionIds[i];
                    }
                }
            }

            if (totalHeight > 0 && scrollY >= totalHeight - 15) {
                const contactEl = document.getElementById("contact");
                if (contactEl) {
                    const contactRect = contactEl.getBoundingClientRect();
                    if (contactRect.top <= window.innerHeight * 0.65) {
                        currentActive = "contact";
                    }
                }
            }

            setActiveSection(currentActive);
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)) : 0;

                    document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
                    setShowScrollTopButton(scrollY > 250);

                    updateActiveSection();

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();

        // Release lock early if user interacts during smooth scroll
        const handleUserTouchOrWheel = () => {
            if (isClickScrollingRef.current) {
                if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
                isClickScrollingRef.current = false;
            }
        };

        window.addEventListener("wheel", handleUserTouchOrWheel, {passive: true});
        window.addEventListener("touchstart", handleUserTouchOrWheel, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("wheel", handleUserTouchOrWheel);
            window.removeEventListener("touchstart", handleUserTouchOrWheel);
            if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsCmdPaletteOpen((prev) => !prev);
            } else if (e.key === "/" && !isTyping) {
                e.preventDefault();
                setIsCmdPaletteOpen(true);
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    useEffect(() => {
        if (window.location.hash) {
            const initialSection = window.location.hash.substring(1);
            const el = document.getElementById(initialSection);
            if (el) {
                setTimeout(() => {
                    scrollToSection(initialSection);
                }, 150);
            }
        }
    }, [scrollToSection]);

    return (
        <>
            <Meta meta={content.meta}/>
            <CursorGlow/>
            <div className="layout">
                <NavBar
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                    about={content.about}
                    socials={content.socials}
                    onOpenCmdPalette={() => setIsCmdPaletteOpen(true)}
                    onToast={showToast}
                />
                <main className="main">
                    <About about={content.about}/>
                    <Experiences experiences={content.experiences}/>
                    <Projects projects={content.projects}/>
                    <Skills skills={content.skills}/>
                    <Educations educations={content.education}/>
                    <Contact contact={content.contact}/>
                    <Footer/>
                </main>
            </div>
            {showScrollTopButton && <ScrollToTopButton onClick={scrollToSection}/>}
            <CommandPalette
                isOpen={isCmdPaletteOpen}
                onClose={() => setIsCmdPaletteOpen(false)}
                scrollToSection={scrollToSection}
                about={content.about}
            />
            <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>
        </>
    );
}

export default App;

