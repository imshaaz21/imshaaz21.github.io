import {useEffect, useState} from "react";

const CursorGlow = () => {
    const [position, setPosition] = useState({x: -500, y: -500});
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let ticking = false;

        const handleMouseMove = (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setPosition({x: e.clientX, y: e.clientY});
                    setIsVisible(true);
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", handleMouseMove, {passive: true});
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="backdrop-glow"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            aria-hidden="true"
        />
    );
};

export default CursorGlow;
