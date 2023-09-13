import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Link } from "react-router-dom";

const EditLog = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    day,
    log,
    handleChange,
    clearValues,
    createStory,
    editLog,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!log || !day) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editLog();
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
        <h3>{"edit log"}</h3>
        {showAlert && <Alert />}
        <div className="form-center addStoryForm">
          {/* title */}
          {/* <input type="text" name="title" value={title} handleChange={handleJobInput} style="width: 200px;"></input> */}
          <FormRow
            type="text"
            name="day"
            value={day}
            handleChange={handleJobInput}
          />
          {/* story */}
          <label>Story</label>
          <textarea
            id="log"
            name="log"
            value={log}
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

export default EditLog;

