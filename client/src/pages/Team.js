import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import anit from "../assets/images/anit.png";
import cyril from "../assets/images/cyril.png";
import dhanush from "../assets/images/dhanush.jpg";
import lukas from "../assets/images/lukas.png";
import sathvik from "../assets/images/sathvik.jpg";
import { BsLinkedin } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

const Team = () => {
  return (
    <Wrapper>
      <header className="landing-header">
        <nav className="front-nav">
          <Logo />
          <Link to="/landing" className="front-nav-link">
            home
          </Link>
        </nav>
        <div className="container">
          <h1 className="team-title">Our Team</h1>
        </div>
      </header>
      <section className="section blog">
        <div className="section-center blog-center">
          <div class="section-center blog-center">
            {/* single article */}
            <div class="card">
              <div class="card-side card-front">
                <div className="card-photo-container">
                  <img src={anit} alt="" class="card-photo" />
                </div>
                <div class="card-info">
                  <h4 class="card-title">
                    Anit <br />
                    Annadi
                  </h4>
                </div>
              </div>
              <div class="card-side card-back">
                <div className="back-content">
                  <h4 className="role">Founder & CEO</h4>
                  <div className="card-icons">
                    <a
                      href="https://www.linkedin.com/in/anit-annadi-861aab250/"
                      target="_blank"
                    >
                      <BsLinkedin className="card-icon" />
                    </a>
                    <a href="mailto:anitannadi@gmail.com" target="_blank">
                      <FaEnvelope className="card-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end of article */}
            {/* single article */}
            <div class="card">
              <div class="card-side card-front">
                <div className="card-photo-container">
                  <img src={cyril} alt="" class="card-photo" />
                </div>
                <div class="card-info">
                  <h4 class="card-title">
                    Cyril <br />
                    Joby
                  </h4>
                </div>
              </div>
              <div class="card-side card-back">
                <div className="back-content">
                  <h4 className="role">Chief Technology Officer</h4>
                  <div className="card-icons">
                    <a
                      href="https://www.linkedin.com/in/cyril-joby-a68983274/"
                      target="_blank"
                    >
                      <BsLinkedin className="card-icon" target="_blank" />
                    </a>
                    <a href="mailto:cyriljoby@gmail.com" target="_blank">
                      <FaEnvelope className="card-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end of article */}
            {/* single article */}
            <div class="card">
              <div class="card-side card-front">
                <div className="card-photo-container">
                  <img src={lukas} alt="" class="card-photo" />
                </div>
                <div class="card-info">
                  <h4 class="card-title">
                    Lukas <br />
                    Somwong
                  </h4>
                </div>
              </div>
              <div class="card-side card-back">
                <div className="back-content">
                  <h4 className="role">Software Developer</h4>
                  <div className="card-icons card-icons-alt">
                    <a
                      href="https://www.linkedin.com/in/lukas-somwong-31417a225/"
                      target="_blank"
                    >
                      <BsLinkedin className="card-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end of article */}
            {/* single article */}
            <div class="card">
              <div class="card-side card-front">
                <div className="card-photo-container">
                  <img src={sathvik} alt="" class="card-photo" />
                </div>
                <div class="card-info">
                  <h4 class="card-title">
                    Sathvik <br />
                    Lakamsani
                  </h4>
                </div>
              </div>
              <div class="card-side card-back">
                <div className="back-content">
                  <h4 className="role">Senior Software Developer</h4>
                  <div className="card-icons card-icons-alt">
                    <a
                      href="https://www.linkedin.com/in/sathvik-lakamsani-67409723a?trk=contact-info"
                      target="_blank"
                    >
                      <BsLinkedin className="card-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end of article */}
            {/* single article */}
            <div class="card">
              <div class="card-side card-front">
                <div className="card-photo-container">
                  <img src={dhanush} alt="" class="card-photo" />
                </div>
                <div class="card-info">
                  <h4 class="card-title">
                    Dhanush <br />
                    Mulpuri
                  </h4>
                </div>
              </div>
              <div class="card-side card-back">
                <div className="back-content">
                  <h4 className="role">Marketing Director</h4>
                  <div className="card-icons card-icons-alt">
                    <a
                      href="https://www.linkedin.com/in/dhanush-mulpuri-46b434243"
                      target="_blank"
                    >
                      <BsLinkedin className="card-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* end of article */}
          </div>
        </div>
      </section>
      {/* <footer className="section footer">
        <div className="footer-links">
          <a
            href="mailto:myalcoholstorywebsite@gmail.com"
            className="footer-link"
          >
            contact
          </a>
          <Link to="/register" className="footer-link">
            Login/Register
          </Link>
        </div>
        <div class="footer-icons">
          <a
            href="https://www.linkedin.com/company/my-alcohol-story/"
            target="_blank"
            className="footer-icon"
          >
            <FaLinkedin className="inner-icon" />
          </a>
          <a
            href="https://www.instagram.com/my.alcohol.story/"
            target="_blank"
            className="footer-icon"
          >
            <FaInstagram className="inner-icon" />
          </a>
        </div>
        <p className="footer-text">My Alcohol Story</p>
      </footer> */}
    </Wrapper>
  );
};

export default Team;
