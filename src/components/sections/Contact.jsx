import React, { useRef, useState } from "react";
import styled from "styled-components";
import EarthCanvas from "../canvas/Earth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;
const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;
const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;

  &.sent {
    animation: pulse 2s ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      filter: brightness(1);
    }
    20% {
      transform: scale(1.03);
      filter: brightness(1.1);
    }
    80% {
      transform: scale(1.03);
      filter: brightness(1.1);
    }
    100% {
      transform: scale(1);
      filter: brightness(1);
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div`
  margin-top: 15px;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  background-color: ${(props) => {
    switch (props.status) {
      case "success":
        return "rgba(76, 175, 80, 0.15)";
      case "error":
        return "rgba(244, 67, 54, 0.15)";
      case "sending":
        return "rgba(33, 150, 243, 0.15)";
      default:
        return "transparent";
    }
  }};
  border: 1px solid ${(props) => {
    switch (props.status) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "sending":
        return "#2196F3";
      default:
        return "transparent";
    }
  }};
  box-shadow: 0 4px 12px ${(props) => {
    switch (props.status) {
      case "success":
        return "rgba(76, 175, 80, 0.2)";
      case "error":
        return "rgba(244, 67, 54, 0.2)";
      case "sending":
        return "rgba(33, 150, 243, 0.2)";
      default:
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "success":
        return "#4CAF50";
      case "error":
        return "#F44336";
      case "sending":
        return "#2196F3";
      default:
        return props.theme.text_primary;
    }
  }};
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  animation: slideIn 0.5s ease-out forwards;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(props) => {
      switch (props.status) {
        case "success":
          return "linear-gradient(to right, transparent, #4CAF50, transparent)";
        case "error":
          return "linear-gradient(to right, transparent, #F44336, transparent)";
        case "sending":
          return "linear-gradient(to right, transparent, #2196F3, transparent)";
        default:
          return "transparent";
      }
    }};
    animation: shimmer 2s infinite;
  }

  &::after {
    content: "${(props) => {
      switch (props.status) {
        case "success":
          return "✓";
        case "error":
          return "✗";
        case "sending":
          return "⟳";
        default:
          return "";
      }
    }}";
    margin-right: 8px;
    font-size: 18px;
    ${(props) =>
      props.status === "sending"
        ? "animation: spin 1.5s linear infinite;"
        : ""}
  }

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [showMessageSent, setShowMessageSent] = useState(false); // State for button text change

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const fromEmail = form.current.email.value;
    const fromName = form.current.name.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    if (!fromEmail || !fromName || !subject || !message) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in all fields");
      setTimeout(() => {
        setSubmitMessage("");
        setSubmitStatus("");
      }, 2000);
      return;
    }
    // Show loading indicator but don't display a message
    setIsSubmitting(true);

    // Using formsubmit.co as a free form submission service
    const formData = new FormData(form.current);

    fetch("https://formsubmit.co/ajax/mdashhaad@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset the form
        form.current.reset();
        // Reset the submitting state
        setIsSubmitting(false);
        // Show "Message sent" text in button
        setShowMessageSent(true);
        // Revert button text after delay
        setTimeout(() => {
          setShowMessageSent(false);
        }, 2500);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Reset the form anyway
        form.current.reset();
        // Reset the submitting state
        setIsSubmitting(false);
      });
  };
  return (
    <Container>
      <Wrapper>
        <EarthCanvas />
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm
          ref={form}
          onSubmit={handleSubmit}
          action="https://formsubmit.co/mdashhaad@gmail.com"
          method="POST"
        >
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="email"
            type="email"
            required
          />
          <ContactInput
            placeholder="Your Name"
            name="name"
            type="text"
            required
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            type="text"
            required
          />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={4}
            required
          />
          {/* Hidden inputs required for FormSubmit.co */}
          <input type="hidden" name="_next" value="http://localhost:3001/#Contact" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <ContactButton
            type="submit"
            value={
              showMessageSent
                ? "Message sent!"
                : isSubmitting
                ? "Sending..."
                : "Send"
            }
            disabled={isSubmitting}
            className={showMessageSent ? "sent" : ""}
            style={{
              transition: "all 0.5s ease",
            }}
          />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
