import {ArrowUp} from "lucide-react";

const ScrollToTopButton = ({onClick}) => {
    return (
        <button
            className="scroll-top-button"
            aria-label="Scroll to top"
            title="Top"
            onClick={() => onClick("top")}
        >
            <ArrowUp size={18} strokeWidth={1.75}/>
        </button>
    );
};

export default ScrollToTopButton;

