import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import { BsCardText, BsBook } from "react-icons/bs";

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
    createLog,
    resource
  } = useAppContext();
  const Tab = styled.button`
    font-size: 20px;
    padding: 10px 60px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;

    ${({ active }) =>
      active &&
      `
      border-bottom: 2px solid #24a47f;
      opacity: 1;
    `}
  `;
  const ButtonGroup = styled.div`
    display: flex;
    @media screen and (max-width: 600px) {
      justify-content: "center";
    }
  `;
  const types = ["Add Story", "Add Dear Sobriety"];
  const icons = [<BsCardText />, <BsBook />];

  const [popupState, setPopupState] = useState(false);
  const [resourceState, setResurceState] = useState(false);
  const [closeState, setCloseState] = useState(false);
  let triggers = ["murder", "kill", "shoot", "suicide"];
  const directcreateStory = (e) => {
    e.preventDefault();
    setCloseState(true);
    setPopupState(false);
    setResurceState(true)
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
    setResurceState(false)
    const titlearea = document.getElementById("title");
    const storyarea = document.getElementById("story");
    storyarea.value = "";
    titlearea.value = "";
  };

  const closePop = () => {
    setPopupState(false);
    setCloseState(false);
    setResurceState(false)
  };
  function RenderPopup() {
    setCloseState(false);

    if (popupState) {
      return (
        <Popup disableBackdropClick backdrop="static" open={true} modal nested>
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
                  Post
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
    }
    if (resourceState &&resource!=''   ) {
      // resource.split('(',')')
      let start= resource.split('[')
      let split=(start[1].split(']'))
      split.unshift(start[0])
      return (
        <Popup disableBackdropClick backdrop="static" open={true} modal nested>
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
              <h3>Reccomended Resource</h3>
              <div className="content">
                {" "}
                {split[0]}
                {split[2]}
                <button
                  className="btn btn-block submit-btn"
                  style={{ margin: "0.5rem 0" }}
                >
                  <a href={split[1]} target="_blank" style={{color:"white"}}>Go To Resource</a>
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
    if (storyState == "Add Story") {
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
        if (storyarea.value.toLowerCase().includes(triggers[i])) {
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
        setResurceState(true)
      }
      if (closeState) {
        storyarea.value = "";
        titlearea.value = "";
      }
  
      
    } else {
      const logarea = document.getElementById("log");
      const dayarea = document.getElementById("day");
      if (!log || !day) {
        displayAlert();
        return;
      }
      for (let i = 0; i < triggers.length; i++) {
        if (logarea.value.toLowerCase().includes(triggers[i])) {
          flag = true;
        } else {
          continue;
        }
      }
      if (flag) {
        setPopupState(true);
      } else {
        createLog();
        logarea.value = "";
        dayarea.value = "";
        setResurceState(true)
      }
      if (closeState) {
        logarea.value = "";
        dayarea.value = "";
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

  const [storyState, setStoryState] = useState(types[0]);
  return (
    <>
      <Wrapper>
        {showAlert && <Alert />}
        <ButtonGroup style={{ marginTop: "-1rem", marginBottom: "1rem" }}>
          {types.map((type, index) => (
            <Tab
              key={type}
              active={storyState === type}
              onClick={() => setStoryState(type)}
            >
              <span className="tab-icon"> {icons[index]}</span>
              <span className="tab-type">{type}</span>
            </Tab>
          ))}
        </ButtonGroup>
        <div className="form-center addStoryForm">
          <form className="form">
            <label>{storyState == "Add Story" ? "Title" : "Day"}</label>
            <textarea
              value={storyState == "Add Story" ? title : day}
              name={storyState == "Add Story" ? "title" : "day"}
              id={storyState == "Add Story" ? "title" : "day"}
              onChange={handleJobInput}
              rows="10"
              cols="33"
              className="form-input"
            />
            <label>
              {storyState == "Add Story" ? "Story" : "Dear Sobriety,"}
            </label>
            <textarea
              value={storyState == "Add Story" ? story : log}
              id={storyState == "Add Story" ? "story" : "log"}
              name={storyState == "Add Story" ? "story" : "log"}
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
                post
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
    </>
  );
};

export default AddStory;
