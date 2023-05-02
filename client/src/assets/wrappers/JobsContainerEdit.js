import styled from "styled-components";

const Wrapper = styled.section`
  .story {
    background-color: #ffffff;
    border-radius: var(--borderRadius);
    padding: 2rem;
    padding-bottom: 1rem;
    max-width: 50rem;
    margin: 1rem auto;
  }

  .reply-story {
    padding-bottom: 0.5rem;
  }

  .story-header-edit {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 88px;
  }

  .story-header img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .user-info h4 {
    margin: 0rem;
    padding-left: 1rem;
    font-size: 1rem;
  }

  .user-info p {
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
  .icon {
    padding: 0;
    margin: 0;
  }

  .story-icon {
    display: grid;
    place-items: center;
    height: 2.5rem;
    width: 2.5rem;
    border: #24a47f solid 2.5px;
    border-radius: 50%;
  }

  .edit-btn {
    margin-right: 0.5rem;
  }

  .story p {
    max-width: none;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .edit-btns {
    justify-self: end;
  }

  .subreply-open {
    justify-content: start;
    margin-top: -0.5rem;
  }

  @media screen and (max-width: 450px) {
    .story-date {
      display: none;
    }
  }
`;
export default Wrapper;
