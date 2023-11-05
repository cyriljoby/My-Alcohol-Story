import main from "../assets/images/main.svg";
import community from "../assets/images/community.svg";
import read from "../assets/images/read.svg";
import share from "../assets/images/share.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Partners from "../components/Partners";
import Featured from "../components/Featured";

const Landing = () => {
  return (
    <Wrapper>
      <header className="landing-header">
        <nav className="front-nav">
          <Logo />
          <Link to="/team" className="front-nav-link">
            our team
          </Link>
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              my <span>alcohol</span> story
            </h1>
            <p>
              Providing teenagers and young adults who have been affected by alcohol a platform to anonymously share their stories and read
              others.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} className="img main-img" />
        </div>
      </header>
      <Featured />
      <Partners />
      <div className="landing-big">
        <div className="landing-div container first-landing">
          <img src={community} alt="job hunt" className="img landing-img" />
          <div className="info">
            <h1 className="landing-div-title">join a community</h1>
            <p>
              Connect with others who have been affected by alcohol and become
              apart of a community dedicated to aiding one another.
            </p>
          </div>
        </div>
        <div className="landing-div container">
          <div className="info">
            <h1 className="landing-div-title">share your story</h1>
            <p>
              Share the struggles you faced and how alcohol affected you or a loved one.
            </p>
          </div>
          <img src={share} alt="job hunt" className="img landing-img" />
        </div>
        <div className="landing-div container">
          <img src={read} alt="job hunt" className="img landing-img" />
          <div className="info">
            <h1 className="landing-div-title">read and grow</h1>
            <p>
              Gain insight and grow through reading about the journeys and
              struggles others faced with alcohol, and how they overcame them.
            </p>
          </div>
        </div>
      </div>
      <div className="landing-small">
        <div className="landing-div container first-landing">
          <div className="info">
            <h1 className="landing-div-title">join a community</h1>
            <p>
              Connect with others who have been affected by alcohol and become
              apart of a community dedicated to aiding one another.
            </p>
          </div>
          <img src={community} alt="job hunt" className="img landing-img" />
        </div>
        <div className="landing-div container">
          <div className="info">
            <h1 className="landing-div-title">share your story</h1>
            <p>
              Share the struggles you faced and how alcohol affected you or a loved one.
            </p>
          </div>
          <img src={share} alt="job hunt" className="img landing-img" />
        </div>
        <div className="landing-div container">
          <div className="info">
            <h1 className="landing-div-title">read and grow</h1>
            <p>
              Gain insight and grow through reading about the journeys and
              struggles others faced with alcohol, and how they overcame them.
            </p>
          </div>
          <img src={read} alt="job hunt" className="img landing-img" />
        </div>
      </div>
      <footer className="section footer">
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
      </footer>
    </Wrapper>
  );
};

export default Landing;
