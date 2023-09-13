import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FormRow,
  Alert,
  FormRowSelect,
  StoryContainer,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import LogsContainer from "../../components/LogsContainer";
import { RiUserFill } from "react-icons/ri";

import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import styled from "styled-components";
import MySaves from "../../components/MySaves";
import { BsCardText, BsBook, BsBookmark } from "react-icons/bs";

const Profile = () => {
  console.log("Running")
  
  
  

  
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  // console.log(location.search)
  const navigateName = queryParams.get('navName');

  

 
  
  const navigateAlias = queryParams.get('alias');
  const navigateIcon = queryParams.get('icon');
  const storiesPosted = queryParams.get('storiesPosted');
  const logsPosted = queryParams.get('logsPosted');
 
  

  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();


  let userId = navigateName ? navigateName: user._id
  const options = [
    { value: "RiUserFill", label: "User Icon" },
    { value: "GiElephant", label: "Elephant" },
    { value: "GiDeer", label: "Deer" },
    { value: "GiButterfly", label: "Butterfly" },
    { value: "GiDolphin", label: "Dolphin" },
    { value: "GiTortoise", label: "Tortoise" },
  ];

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
  `;
  
  //const [name, setName] = useState({ navigateName });
  const emailBoolean = navigateName ? null: user.email
  const [email, setEmail] = useState(emailBoolean)
  
  const aliasBoolean = navigateAlias ? navigateAlias: user.alias
  const [alias, setAlias] = useState(aliasBoolean);
 

  const imageBoolean = navigateIcon ? navigateIcon: user.image

  const [image, setImage] = useState(imageBoolean);

  const booleanSavedPosts = navigateName ? false: true
 
  //const types = [booleanMyStories, booleanMyLogs,booleanSavedPosts];
  let types = [" Stories", " Dear Sobrieties", " Saved Posts"];
  const icons = [<BsCardText />, <BsBook />, <BsBookmark />];
 
    
  const handleChange = (selected) => {
    // console.log(selected.target.value);
    setImage(selected.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !alias) {
      displayAlert();
      return;
    }
    updateUser({ email, alias, image, userId, navigateName });
    // window.location.reload();
  };
  let icon = navigateIcon ? navigateIcon: user.image
  if (icon === "GiTortoise") {
    icon = <GiTortoise />;
  }

  if (icon === "GiDeer") {
    icon = <GiDeer />;
  }

  if (icon === "RiUserFill") {
    icon = <RiUserFill />;
  }

  if (icon === "GiButterfly") {
    icon = <GiButterfly />;
  }

  if (icon === "GiDolphin") {
    icon = <GiDolphin />;
  }

  if (icon === "GiElephant") {
    icon = <GiElephant />;
  }

  if (icon === "AiOutlineUser") {
    icon = <RiUserFill />;
  }
  const [storyState, setStoryState] = useState(types[0]);

  return (
    <div>
      
    
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          
          <h3>{alias}</h3>
          {showAlert && <Alert />}
          <div className="profile-center">
            <div className="story-icon icon-profile">
              <span className="icon span-icon">{icon}</span>
            </div>
            <div className={navigateName ? "profile-form-center2": "profile-form-center"}>
            {navigateName == null && (
              <FormRow
                type="text"
                labelText="Alias"
                name="alias"
                value={alias}
                handleChange={(e) => setAlias(e.target.value)}
              />
            )}
            {navigateName != null && (
              <FormRow
                
                labelText="Alias"
                name="alias"
                value={alias}
                
               
              />
            )}
              {navigateName == null && (
              <FormRow
                type="email"
                name="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              )}
              {navigateName != null && (
              <FormRow
                type="text"
                name="Number of Stories Posted"
                value={storiesPosted}
               
              />
              )}
              <div className="form-row">
                {navigateIcon == null && (
                <label htmlFor="aliasChoice" className="form-label">
                  profile icon
                </label>
                )}
                {navigateIcon == null && (
                <select
                  name="aliasChoice"
                  value={image}
                  onChange={handleChange}
                  className="form-select"
                >
                  {options.map((itemValue, index) => {
                    return (
                      <option key={index} value={itemValue.value}>
                        {itemValue.label}
                      </option>
                    );
                  })}
                </select>
                )}
                </div>
                {navigateName == null && (
              <button 
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Please Wait..." : "save changes"}
              </button>
              )}
                {navigateName != null && (
              <FormRow
                type="text"
                name="Number of Logs Posted"
                value={logsPosted}
               
              />
              )}

              
             
            </div>
          </div>
        </form>
      </Wrapper>
      <ButtonGroup
        style={{
          margin: "1rem auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {types.map((type, index) => (
      
          (!booleanSavedPosts && index === 2) ? null : (
            <Tab
              key={type}
              active={storyState === type}
              onClick={() => setStoryState(type)}
            >
              <span className="tab-icon">{icons[index]}</span>
              <span className="tab-type">{ !booleanSavedPosts ? alias + "'s" + type: "My" + type}</span>
            </Tab>
          )
          ))}
      </ButtonGroup>

      {storyState == " Stories" ? (
        <StoryContainer profile={true} storyBoolean = {navigateName ? navigateName: null} removeButtons = {navigateName ? true: false} storyNum = {storiesPosted}/>
      ) : storyState == " Dear Sobrieties" ? (
        <LogsContainer profile={true} logBoolean = {navigateName ? navigateName: null} removeButtons = {navigateName ? true: false} logNum = {logsPosted}/>
      ) : (

        <MySaves saveBoolean = {navigateName ? true: false} />
      )}
    </div>
  );
};

export default Profile;
