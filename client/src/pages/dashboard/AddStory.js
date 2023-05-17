import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import Popup from "reactjs-popup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
      const dayarea=document.getElementById("day");
      if (!log || !day) {
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
        dayarea.value="";
      }
      if (closeState) {
        logarea.value = "";
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



  return (
    
    
        <Tabs>
        <TabList>
          <Tab name ="story" onClick={()=>setStoryState(true)}>Add Story</Tab>
          <Tab name ="log" onClick={()=>setStoryState(false)}>Add Daily Log</Tab>
        </TabList>

        <TabPanel>
          
        {showAlert && <Alert />}
        <Wrapper>
          <div className="form-center addStoryForm">
          <form className="form">
          <label>{"Title" }</label>
              <textarea
                value={title }
                name="title"
                id="title" 
                onChange={handleJobInput}
                rows="10"
                cols="33"
                className="form-input"
              />
              <label>Story</label>
              <textarea
                value={story}
                id="story"
                name="story" 
                onChange={handleJobInput}
                rows="10"
                cols="33"
                className="form-textarea"
              />

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
              </form>
          </div>
          </Wrapper>
        </TabPanel>
        <TabPanel>
        {showAlert && <Alert />}
        <Wrapper>
        <div className="form-center addStoryForm">
        <form className="form">
        <label>Day</label>
        <textarea
                value={day}
                id="day"
                name="day"
                onChange={handleJobInput}
                rows="10"
                cols="33"
                className="form-input"
              />
        <label>{ "Log"}</label>
              <textarea
                value={ log}
                id={"log"}
                name={ "log"}
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
            </form>
            </div>
            </Wrapper>
        </TabPanel>
      </Tabs>
  );
};

export default AddStory;
