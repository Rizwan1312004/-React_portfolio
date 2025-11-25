import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({ success: null, message: "" });

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formDetails.firstName || !formDetails.email || !formDetails.message) {
      setStatus({
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    setButtonText("Sending...");
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();

      if (result.code === 200) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormDetails(formInitialDetails);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setButtonText("Send");
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          {/* Left image */}
          <Col xs={12} md={6}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <img
                  src={contactImg}
                  alt="Contact Us"
                  className={`${
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  } w-100`}
                />
              )}
            </TrackVisibility>
          </Col>

          {/* Right form */}
          <Col xs={12} md={6}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div
                  className={`contact-form ${
                    isVisible ? "animate__animated animate__fadeInRight" : ""
                  }`}
                >
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name *"
                          onChange={(e) =>
                            onFormUpdate("firstName", e.target.value)
                          }
                          required
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            onFormUpdate("lastName", e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address *"
                          onChange={(e) =>
                            onFormUpdate("email", e.target.value)
                          }
                          required
                        />
                      </Col>
                      <Col xs={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone No."
                          onChange={(e) =>
                            onFormUpdate("phone", e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Your Message *"
                          onChange={(e) =>
                            onFormUpdate("message", e.target.value)
                          }
                          required
                        ></textarea>

                        <button
                          type="submit"
                          disabled={buttonText === "Sending..."}
                        >
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                    </Row>
                  </form>

                  {status.message && (
                    <p
                      className={`mt-3 fw-bold ${
                        status.success ? "text-success" : "text-danger"
                      }`}
                    >
                      {status.message}
                    </p>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
