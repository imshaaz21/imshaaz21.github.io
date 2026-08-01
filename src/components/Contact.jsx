import {useState} from "react";
import {CheckCircle2, RotateCcw, Send} from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const Contact = ({contact, onToast}) => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const canSend = name.trim() !== "" && message.trim() !== "";
    const hasInput = name !== "" || message !== "";

    const handleClear = () => {
        setName("");
        setMessage("");
        if (onToast) onToast("Contact form cleared");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSend) return;

        const subject = "Message from Portfolio Site";
        const body = `Hi ${contact?.name ?? ""},\n\n${message}\n\nThanks,\n${name}`;
        const mailtoLink = `mailto:${contact?.email ?? ""}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        setSent(true);
        if (onToast) onToast("Opening email client...");
        window.location.href = mailtoLink;

        setTimeout(() => {
            setSent(false);
        }, 4000);
    };

    return (
        <FadeInSection>
            <section className="section" id="contact">
                <p className="eyebrow">./send_message.sh</p>
                <h2>Get in touch</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="contact-name">Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                        id="contact-message"
                        placeholder="What would you like to say?"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="contact-actions">
                        <button type="submit" disabled={!canSend} className="btn-send">
                            {sent ? (
                                <>
                                    Opening Email Client... <CheckCircle2 size={16} strokeWidth={1.75}/>
                                </>
                            ) : (
                                <>
                                    Send <Send size={16} strokeWidth={1.75}/>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className="btn-clear"
                            onClick={handleClear}
                            disabled={!hasInput}
                            title="Clear inputs"
                        >
                            <RotateCcw size={15} strokeWidth={1.75}/>
                            <span>Clear</span>
                        </button>
                    </div>
                </form>
            </section>
        </FadeInSection>
    );
};

export default Contact;

