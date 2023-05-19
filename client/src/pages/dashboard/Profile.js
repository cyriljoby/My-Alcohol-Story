import { useState } from "react";
import { FormRow, Alert, FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import MyLog from "../../components/MyLog";
import MyStory from "../../components/MyStory";
import { RiUserFill } from "react-icons/ri";

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

  return (
    <div>
      <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
          <h3>profile</h3>
          {showAlert && <Alert />}
          <div className="profile-center">
            <div className="story-icon icon-profile">
              <span className="icon span-icon">
                <RiUserFill />
              </span>
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
      <h3>My Stories</h3>
      <MyStory />
      <h3>My Logs</h3>
      <MyLog />
    </div>
  );
};

export default Profile;

