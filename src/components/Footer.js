import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon4 from "../assets/img/nav-icon4.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import TrackVisibility from "react-on-screen";
import "animate.css";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <TrackVisibility>
          {({ isVisible }) => (
            <Row
              className={`align-items-center justify-content-center ${
                isVisible ? "animate__animated animate__fadeInUp" : ""
              }`}
            >
              <Col
                xs={12}
                sm={6}
                className="text-center text-sm-start mb-3 mb-sm-0"
              >
                <h1 style={{ color: "whitesmoke" }}>MY PORTFOLIO</h1>
              </Col>
              <Col xs={12} sm={6} className="text-center text-sm-end">
                <div className="social-icon">
                  <a
                    href="https://www.linkedin.com/in/rizwan-m-638242292/"
                    aria-label="LinkedIn"
                  >
                    <img src={navIcon1} alt="LinkedIn" />
                  </a>
                  <a
                    href="https://github.com/Rizwan1312004"
                    aria-label="Github"
                  >
                    <img src={navIcon4} alt="Github" />
                  </a>
                  <a href="https://x.com/RizwanM925433" aria-label="Twitter">
                    <img src={navIcon3} alt="Twitter" />
                  </a>
                </div>
                <p>© {year} All Rights Reserved</p>
              </Col>
            </Row>
          )}
        </TrackVisibility>
      </Container>
    </footer>
  );
};
