import {CheckCircle2, X} from "lucide-react";

const Toast = ({message, onClose}) => {
    if (!message) return null;

    return (
        <div className="toast-notification" role="status" aria-live="polite">
            <div className="toast-content">
                <CheckCircle2 size={16} className="toast-icon"/>
                <span>{message}</span>
            </div>
            {onClose && (
                <button className="toast-close" onClick={onClose} aria-label="Close notification">
                    <X size={14}/>
                </button>
            )}
        </div>
    );
};

export default Toast;
