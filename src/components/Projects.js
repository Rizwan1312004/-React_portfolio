import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/mail.svg";
import projImg2 from "../assets/img/mail.svg";
import projImg3 from "../assets/img/mail.svg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const frontEnd = [
    {
      title: "Travel-Journal",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Movie-Lister",
      description: "Design & Development",
      link: "https://rizwan1312004.github.io/My-Movie-Lister/",
      imgUrl: projImg2,
    },
    {
      title: "Packing-List",
      description: "Design & Development",
      link: " https://rizwan1312004.github.io/My-packing-list/",
      imgUrl: projImg3,
    },
    {
      title: "Calculator",
      description: "Design & Development",
      link: "https://rizwan1312004.github.io/basic-calculator/",
      imgUrl: projImg1,
    },
    {
      title: "Eat-and-Split-app",
      description: "Design & Development",
      link: "https://rizwan1312004.github.io/eat-and-split/",
      imgUrl: projImg3,
    },
    {
      title: "PizzaMenu",
      description: "Design & Development",
      link: "https://rizwan1312004.github.io/pizzaMenu/",
      imgUrl: projImg2,
    },
  ];

  // const backEnd = [
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg1,
  //   },
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg2,
  //   },
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg3,
  //   },
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg1,
  //   },
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg2,
  //   },
  //   {
  //     title: "Business Startup",
  //     description: "Design & Development",
  //     imgUrl: projImg3,
  //   },
  // ];

  const others = [
    {
      title: "Parkinson's desiease detection",
      description: "Design & Development",
      link: "https://github.com/Rizwan1312004/Portfolio_Projects/blob/main/Parkinson%20disease%20detection%20using%20XGboost.ipynb",
      imgUrl: projImg1,
    },
    {
      title: "AirBnB Project",
      description: "Design & Development",
      link: "https://public.tableau.com/app/profile/rizwan.m2004/viz/AirBnBProject_17508306888620/Dashboard1?publish=yes",
      imgUrl: projImg2,
    },
    {
      title: "Airline Reservation",
      description: "Design & Development",
      link: "https://github.com/Rizwan1312004/SQL_Final_Projects/blob/main/AIRLINE%20RESERVATION%20SYSTEM.sql",
      imgUrl: projImg3,
    },
    {
      title: "inventory warhouse managment",
      description: "Design & Development",
      link: "https://github.com/Rizwan1312004/SQL_Final_Projects/blob/main/Inventory%20%26%20Warehouse%20Management%20System.sql",
      imgUrl: projImg1,
    },
    {
      title: "Data Scrapping From Website",
      description: "Design & Development",
      link: "https://github.com/Rizwan1312004/Portfolio_Projects/blob/main/Data%20Scrapping%20From%20Website.ipynb",
      imgUrl: projImg2,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Projects</h2>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">FrontEnd</Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="second">BackEnd</Nav.Link>
                      </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link eventKey="third">Other</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {frontEnd.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {/* <Row>
                          {backEnd.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {others.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
