import styled from "styled-components";

const Wrapper = styled.section`
  .story {
    background-color: #ffffff;
    border-radius: var(--borderRadius);
    padding: 2rem;
    max-width: 50rem;
    margin: 1rem auto;
  }

  .story-header {
    display: flex;
    align-items: center;
  }

  .story-header img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .story-header h4 {
    margin: 0rem;
    padding-left: 1rem;
    font-size: 1rem;
  }

  .story-header p {
    margin: 0rem;
    padding-left: 1rem;
    font-size: 1rem;
    font-weight: 100;
  }

  .story h1 {
    font-size: 1.5rem;
    letter-spacing: normal;
    padding-top: 1rem;
  }

  .story p {
    max-width: none;
  }
`;
export default Wrapper;