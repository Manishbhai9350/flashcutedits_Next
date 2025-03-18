import { useForm } from "@formspree/react";
import '../index.css'

function ContactForm() {
  const [state, handleSubmit, reset] = useForm(
    import.meta.env.FormSpreeId || "xdkeojwk"
  );
  if (state.succeeded) {
    return (
      <div style={{height:100,display:'flex',alignItems:'center'}}>
        <h1 className="santoshi" style={{ color: "white", fontSize: "1.4rem" }}>
          Thanks For Sending Message
        </h1>
      </div>
    );
  }
  return (
    <div className="form">
      <h2 className="santoshi">Send Message</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullname" placeholder="Full Name" type="text" />
        <input name="email" placeholder="Email" type="email" />
        <textarea
          style={{ resize: "none" }}
          name="Message"
          rows="6"
          placeholder="Enter Your Message"
          type="text"
        ></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ContactForm;
