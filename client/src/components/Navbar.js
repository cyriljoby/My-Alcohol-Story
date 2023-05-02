import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
  GiConsoleController,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();
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

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo className="navbar-logo" />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <span className="logout-icon">{icon}</span>
            {user?.alias}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
