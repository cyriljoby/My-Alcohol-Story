import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    story,
    handleChange,
    clearValues,
    createJob,
    editJob,
    maxAlert,
  } = useAppContext();
  const [popupState, setPopupState] = useState(false);
  const [closeState, setCloseState] = useState(false);
  const navigate = useNavigate()
  let triggers = ["murder", "kill", "shoot", "suicide"];
  const directCreateJob = (e) => {
    e.preventDefault();
    setCloseState(true);
    setPopupState(false);
    const titlearea = document.getElementById("title");
    const storyarea = document.getElementById("story");
    if (!title || !story) {
      // console./log('here')
      displayAlert();
      return;
    }
    if (titlearea.value.length >= 50) {
      maxAlert();
      return;
    }

    createJob();
    storyarea.value = "";
    titlearea.value = "";
  };

  const clearEntries = (e) => {
    e.preventDefault();
    setCloseState(true);
    setPopupState(false);
    const titlearea = document.getElementById("title");
    const storyarea = document.getElementById("story");
    storyarea.value = "";
    titlearea.value = "";
  };

  const closePop = () => {
    setPopupState(false);
    setCloseState(false);
  };

  function RenderPopup() {
    setCloseState(false);
    if (popupState) {
      return (
        <Popup open={true} modal nested>
          {(close) => (
            <div
              className="modal"
              style={{
                maxWidth: "90vw",
                background: "#ffffff",
                padding: "2rem",
              }}
            >
              <button
                className="close"
                onClick={() => {
                  close();
                  closePop();
                }}
                style={{ fontSize: "1.5rem" }}
              >
                &times;
              </button>
              {/* <h3 className="header"> Warning </h3> */}
              <div className="content">
                {" "}
                Your story has potentially went against our community
                guidelines. Please make sure you <span>DO NOT</span>:
                <ul
                  style={{
                    listStyle: "inside",
                    marginLeft: "1rem",
                    marginTop: "0.5rem",
                    textTransform: "capitalize",
                  }}
                >
                  <li>glorify alcohol and its effects</li>
                  <li>encourage or promote self harm</li>
                  <li>post any personal identification information</li>
                </ul>
                If you are feeling the urge to harm yourself, please visit our{" "}
                <a className="resources-page" onClick={()=>navigate("/resources")}>
                  resources
                </a>{" "}
                page.
              </div>
              <div className="modal-btn-container">
                {/* <button className="button" onClick={directCreateJob()}> Create Anyways </button> */}
                <button
                  className="btn btn-block submit-btn"
                  onClick={directCreateJob}
                  style={{ margin: "0.5rem 0" }}
                >
                  Post Story
                </button>
                <button
                  className="btn btn-block modal-clear-btn"
                  onClick={clearEntries}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </Popup>
      );
    } else {
      return null;
    }
  }
  const handleSubmit = (e) => {
    let flag = false;
    e.preventDefault();
    const titlearea = document.getElementById("title");
    const storyarea = document.getElementById("story");
    console.log("here");
    if (!title || !story) {
      // console./log('here')
      displayAlert();
      return;
    }
    if (titlearea.value.length >= 50) {
      maxAlert();
      return;
    }
    console.log("before");
    for (let i = 0; i < triggers.length; i++) {
      if (storyarea.value.includes(triggers[i])) {
        flag = true;
      } else {
        continue;
      }
    }
    if (flag) {
      setPopupState(true);
    } else {
      createJob();
      storyarea.value = "";
      titlearea.value = "";
    }
    if (closeState) {
      console.log("hi");
      storyarea.value = "";
      titlearea.value = "";
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
        <h3>{"add story"}</h3>
        {showAlert && <Alert />}
        <div className="form-center addJobForm">
          {/* title */}
          {/* <input type="text" name="title" value={title} handleChange={handleJobInput} style="width: 200px;"></input> */}
          <label>Title</label>
          <textarea
            id="title"
            name="title"
            onChange={handleJobInput}
            rows="10"
            cols="33"
            className="form-input"
          />
          {/* story */}
          <label>Story</label>
          <textarea
            id="story"
            name="story"
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
            <RenderPopup />
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

export default AddJob;
