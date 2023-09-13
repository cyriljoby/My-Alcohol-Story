import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  @media (min-width: 992px) {
    .form-center:not(.addStoryForm) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container:not(.addStoryForm) {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center:not(.addStoryForm) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button:not(.addStoryForm) {
      margin-top: 0;
    }
  }
`;

export default Wrapper;

