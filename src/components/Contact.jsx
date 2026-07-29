import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import FadeInSection from "../utils/FadeInSection";

const Contact = ({ contact }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const canSend = name.trim() !== "" && message.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSend) return;

    const subject = "Message from Portfolio Site";
    const body = `Hi ${contact?.name ?? ""},\n\n${message}\n\nThanks,\n${name}`;
    const mailtoLink = `mailto:${contact?.email ?? ""}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    setSent(true);
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
          <button type="submit" disabled={!canSend}>
            {sent ? (
              <>
                Opening Email Client... <CheckCircle2 size={16} strokeWidth={1.75} />
              </>
            ) : (
              <>
                Send <Send size={16} strokeWidth={1.75} />
              </>
            )}
          </button>
        </form>
      </section>
    </FadeInSection>
  );
};

export default Contact;

