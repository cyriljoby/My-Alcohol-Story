import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Link } from "react-router-dom";

const EditStory = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    story,
    handleChange,
    clearValues,
    createStory,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !story) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    
    <Wrapper>
      <form className="form">
        <h3>{"edit story"}</h3>
        {showAlert && <Alert />}
        <div className="form-center addStoryForm">
          {/* title */}
          {/* <input type="text" name="title" value={title} handleChange={handleJobInput} style="width: 200px;"></input> */}
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleJobInput}
          />
          {/* story */}
          <label>Story</label>
          <textarea
            id="story"
            name="story"
            value={story}
            onChange={handleJobInput}
            rows="10"
            cols="33"
            className="form-textarea"
          />
          {/* btn container */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default EditStory;

