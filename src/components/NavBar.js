import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon4 from "../assets/img/nav-icon4.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { HashLink } from "react-router-hash-link";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll detection + navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 50);

      // auto detect active section while scrolling
      const sections = ["home", "skills", "projects", "connect"];
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (!el) return;

        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          setActiveLink(sec);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="md"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="#home" className="navbar-logo">
          <h1 id="nav-title">MY PORTFOLIO</h1>
        </Navbar.Brand>

        {/* Mobile Toggler */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav-custom ms-auto">
            {["home", "skills", "projects"].map((section) => (
              <Nav.Link
                key={section}
                href={`#${section}`}
                className={`navbar-link ${
                  activeLink === section ? "active" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Nav.Link>
            ))}

            {/* Social Icons */}
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/rizwan-m-638242292/">
                <img src={navIcon1} alt="LinkedIn" />
              </a>
              <a href="https://github.com/Rizwan1312004">
                <img src={navIcon4} alt="GitHub" />
              </a>
              <a href="https://x.com/RizwanM925433">
                <img src={navIcon3} alt="Twitter" />
              </a>
            </div>

            {/* Button */}
            <HashLink to="#connect" smooth className="hash-btn">
              <button className="connect-btn">
                <span>Let’s Connect</span>
              </button>
            </HashLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
