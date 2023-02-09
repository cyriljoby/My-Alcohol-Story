import styled from "styled-components";

const Wrapper = styled.main`
  background-color: #ffffff;
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height) - 0rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 768px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }

  .landing-div {
    align-items: center;
    margin-bottom: 6rem;
  }

  .landing-img {
    max-height: 30rem;
  }

  .landing-div-title {
    color: var(--primary-500);
    font-weight: 500;
    font-size: 2.5rem;
  }

  .landing-div .info {
    margin-bottom: 4rem;
  }

  .landing-div .info,
  .landing-div .info {
    justify-self: center;
  }

  @media (min-width: 768px) {
    .landing-div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      margin-bottom: 12rem;
    }
  }

  .footer {
    background: var(--mainBlack);
    color: var(--mainWhite);
    border-top: 2px solid var(--grey-100);
    text-align: center;
    padding: 2rem;
    padding: 1.25rem;
  }
  .footer-links,
  .footer-icons {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .footer-link {
    color: var(--mainWhite);
    text-transform: capitalize;
    font-size: 1rem;
    margin-right: 1rem;
    letter-spacing: var(--mainSpacing);
    transition: var(--mainTransition);
  }
  .footer-link:hover {
    color: var(--primaryColor);
  }
  .footer-icon {
    font-size: 2rem;
    margin-right: 1rem;
    margin-bottom: -0.75rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .footer-icon:hover {
    color: var(--primaryColor);
  }

  .footer-text {
    margin: 0 auto;
  }

  /* .first-landing {
    padding-top: 6rem;
  } */

  .landing-big {
    display: none;
  }

  @media (min-width: 768px) {
    .landing-big {
      display: block;
    }

    .landing-small {
      display: none;
    }

    .landing-div .info {
      max-width: 25rem;
    }
  }
`;
export default Wrapper;

