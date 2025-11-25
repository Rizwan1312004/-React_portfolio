import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import bannerBg from "../assets/img/banner-bg.png";
import myImg from "../assets/img/my-pic.png";
import TrackVisibility from "react-on-screen";
import "animate.css";

// Banner props: name, roles, resumeLink
export const Banner = ({
  name = "Rizwan",
  roles = ["React Developer", "Web Designer", "Python Developer"],
  resumeLink = "/RIZWAN M_NEW_cv.pdf",
}) => {
  // Animated typing logic
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const speedRef = useRef(120);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);
      setText(updatedText);
      speedRef.current = isDeleting
        ? 50
        : updatedText === fullText
        ? 1200
        : 120;
      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }
    };
    const timer = setTimeout(handleTyping, speedRef.current);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles]);

  return (
    <section
      className="banner"
      id="home"
      aria-label="Portfolio Banner"
      style={{
        backgroundImage: `url(${bannerBg})`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={7} xl={7}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible
                      ? "animate__animated animate__fadeInLeft"
                      : "invisible"
                  }
                >
                  <span
                    className={
                      isVisible
                        ? "tagline animate__animated animate__fadeInDown"
                        : "tagline"
                    }
                  >
                    Welcome to my Portfolio
                  </span>
                  <h1>
                    Hi! I'm <span className="gradient-text">{name}</span>
                    <br />
                    <span
                      className="txt-rotate"
                      style={{
                        color: "#00bcd4",
                        fontWeight: 600,
                        fontSize: "1.5rem",
                      }}
                      aria-label={text}
                    >
                      {text}
                      <span className="cursor" style={{ color: "#00bcd4" }}>
                        |
                      </span>
                    </span>
                  </h1>
                  <p>
                    Passionate about crafting fast, responsive, and elegant web
                    applications using modern frameworks and clean design
                    principles.
                  </p>
                  <button
                    className={
                      isVisible
                        ? "connect-btn animate__animated animate__fadeInUp"
                        : "connect-btn"
                    }
                    aria-label="Download Resume"
                    onClick={() => window.open(resumeLink, "_blank")}
                  >
                    My Resume <Download size={25} />
                  </button>
                  {/* Scroll Down Indicator */}
                  <div
                    className="scroll-down"
                    aria-label="Scroll Down"
                    style={{ marginTop: 30, textAlign: "center" }}
                  >
                    <span
                      style={{
                        fontSize: "2rem",
                        color: "#00bcd4",
                        animation: "bounce 2s infinite",
                      }}
                    >
                      &#8595;
                    </span>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={5} xl={5}>
            <TrackVisibility once>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible
                      ? "animate__animated animate__zoomIn"
                      : "invisible"
                  }
                >
                  <img src={myImg} alt="Header" className="floating" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      {/* Simple background gradient for depth */}
      <style>{`
        .banner {
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .gradient-text {
          background: linear-gradient(90deg, #00bcd4, #2196f3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .scroll-down span {
          display: inline-block;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
};
