import styled from "styled-components";

const Wrapper = styled.section`
  .story {
    background-color: #ffffff;
    border-radius: var(--borderRadius);
    padding: 2rem;
    padding-bottom: 0rem;
    max-width: 50rem;
    margin: 1rem auto;
  }

  .story-header {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 60px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .edit-btns button,
  .edit-btn {
    background-color: transparent;
    color: #102a43;
    box-shadow: none;
    padding: 0.25rem 0.25rem;
    transition: 0.3s ease-in-out all;
  }

  .edit-btns button:hover,
  .edit-btn:hover {
    color: #24a47f;
  }

  .open-reply {
    font-size: 1.5rem;
    padding: 0.25rem;
    padding: 0.25rem 0.55rem;
    background-color: transparent;
    box-shadow: none;
  }

  .reply-container {
    display: grid;
    grid-template-columns: 8fr 1fr;
    padding-bottom: 1rem;
  }

  .reply-btn {
    margin-left: 0.5rem;
    font-size: 0.85rem;
  }

  .show-replies {
    display: block;
    font-size: 1.2rem;
    margin-left: -2rem;
    width: calc(100% + 4rem);
    color: #24a47f;
    padding-top: 0.8rem;
    border-top: solid 1px var(--grey-100);
    border-radius: 0px;
    background-color: transparent;
    box-shadow: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .num-comments,
  .num-alt {
    color: #24a47f;
    display: block;
    margin-left: auto;
    padding-right: 0.75rem;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .num-alt {
    visibility: hidden;
  }

  .reply-icon {
    transform: translateX(-50%);
  }

  .save {
    border: none;
    align-self: center;
    cursor: pointer;
  }

  .alt-edit {
    justify-self: end;
  }

  @media screen and (max-width: 480px) {
    .story-date {
      display: none;
    }
  }
`;
export default Wrapper;
