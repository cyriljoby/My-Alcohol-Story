import { useState } from "react";
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
  let userId = localStorage
    .getItem("user")
    .split(",")[0]
    .replace('{"_id":', "")
    .replace(/['"]+/g, "");

  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
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
  const types = ["My Stories", "My Dear Sobrieties", "My Saved Posts"];
  const icons = [<BsCardText />, <BsBook />, <BsBookmark />];
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [alias, setAlias] = useState(user?.alias);
  const [image, setImage] = useState(user?.image);
  const handleChange = (selected) => {
    // console.log(selected.target.value);
    setImage(selected.target.value);
  };
  const handleSubmit = (e) => {
    console.log(name, email, alias);
    e.preventDefault();
    if (!email || !alias) {
      displayAlert();
      return;
    }
    updateUser({ email, alias, image, userId });
    // window.location.reload();
  };
  let icon = user.image;
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
          <h3>profile</h3>
          {showAlert && <Alert />}
          <div className="profile-center">
            <div className="story-icon icon-profile">
              <span className="icon span-icon">{icon}</span>
            </div>
            <div className="profile-form-center">
              <FormRow
                type="text"
                labelText="Alias"
                name="alias"
                value={alias}
                handleChange={(e) => setAlias(e.target.value)}
              />
              <FormRow
                type="email"
                name="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              <div className="form-row">
                <label htmlFor="aliasChoice" className="form-label">
                  profile icon
                </label>
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
              </div>
              <button
                className="btn btn-block"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Please Wait..." : "save changes"}
              </button>
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
          <Tab
            key={type}
            active={storyState === type}
            onClick={() => setStoryState(type)}
          >
            <span className="tab-icon">{icons[index]}</span>
            <span className="tab-type">{type}</span>
          </Tab>
        ))}
      </ButtonGroup>

      {storyState == "My Stories" ? (
        <StoryContainer profile={true} />
      ) : storyState == "My Dear Sobrieties" ? (
        <LogsContainer profile={true} />
      ) : (
        <MySaves />
      )}
    </div>
  );
};

export default Profile;
