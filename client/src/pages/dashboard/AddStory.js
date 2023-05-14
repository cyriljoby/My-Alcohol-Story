import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import Popup from "reactjs-popup";
// import { useDetectClickOutside } from 'react-detect-click-outside';

const AddStory = () => {
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
    maxAlert,
    log,
    month,
    day,
    createLog
  } = useAppContext();
  const [popupState, setPopupState] = useState(false);
  const [closeState, setCloseState] = useState(false);
  const [storyState, setStoryState] = useState(true);
  let triggers = ["murder", "kill", "shoot", "suicide"];
  const directcreateStory = (e) => {
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

    createStory();
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
        <Popup  disableBackdropClick backdrop="static" open={true} modal nested >
          
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
                <a className="resources-page" href="/resources">
                  resources
                </a>{" "}
                page.
              </div>
              <div className="modal-btn-container">
                <button
                  className="btn btn-block submit-btn"
                  onClick={directcreateStory}
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
    if (storyState){
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
        createStory();
        storyarea.value = "";
        titlearea.value = "";
      }
      if (closeState) {
        storyarea.value = "";
        titlearea.value = "";
      }
    }

    else{

      const logarea=document.getElementById("log");
      const montharea=document.getElementById("month");
      const dayarea=document.getElementById("day");
      if (!log || !month ||!day) {
        console.log('log')
        displayAlert();
        return;
      }
      for (let i = 0; i < triggers.length; i++) {
        console.log(triggers)
        if (logarea.value.includes(triggers[i])) {
          console.log('hj')
          flag = true;
        } else {
          // console.log('log')
          continue;

        }}
      if (flag) {
        setPopupState(true);
      } else {
        
        createLog();
        logarea.value = "";
        montharea.value = "";
        dayarea.value="";
      }
      if (closeState) {
        logarea.value = "";
        montharea.value = "";
        dayarea.value="";
      }
    
      
    }
    
  };
  const handleJobInput = (e) => {
    setPopupState(false);
    setCloseState(false);
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name,value)
    handleChange({ name, value });
  };

  const handleAdd = (e) => {
    console.log(e.target.name)
    if (e.target.name==="story"){
      setStoryState(true)
    }
    if (e.target.name==="log"){
      setStoryState(false)
    }
  };

  return (
    
    <Wrapper>
     <div class="tab">
     <button name ="story" class="tablinks" onClick={handleAdd}>Add Story</button>
     <button name ="log" class="tablinks" onClick={handleAdd}>Add Daily Log</button>
    </div>
    <form className="form">
            <h3>{storyState ? "add story" : "add daily log"}</h3>
            {showAlert && <Alert />}
            <div className="form-center addStoryForm">
              {/* Month */}
              {/* <input type="text" name="title" value={title} handleChange={handleJobInput} style="width: 200px;"></input> */}
              <label>{storyState ? "Title" : "Month"}</label>
              <textarea
                value={storyState ? title : month}
                name={storyState ? "title" : "month"}
                id={storyState ? "title" : "month"}
                onChange={handleJobInput}
                rows="10"
                cols="33"
                className="form-input"
              />
              {storyState ? null:

              <div>
              <label>Day</label>
              <textarea
                value={day}
                id="day"
                name="day"
                onChange={handleJobInput}
                rows="10"
                cols="33"
                className="form-input"
              /></div>}

              {/* story */}
              <label>{storyState ? "Story" : "Log"}</label>
              <textarea
                value={storyState ? story : log}
                id={storyState ? "story" : "log"}
                name={storyState ? "story" : "log"}
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

export default AddStory;
