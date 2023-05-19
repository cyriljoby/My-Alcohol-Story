import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";

const NavLinks = ({ toggleSidebar }) => {
  const {
    user
  } = useAppContext();
  console.log(user.image)
  let image = user.image;
    if (image === "GiTortoise") {
      image = <GiTortoise />;
    }

    if (image === "GiDeer") {
      image = <GiDeer />;
    }

    if (image === "RiUserFill") {
      image = <RiUserFill />;
    }

    if (image === "GiButterfly") {
      image = <GiButterfly />;
    }

    if (image === "GiDolphin") {
      image = <GiDolphin />;
    }

    if (image === "GiElephant") {
      image = <GiElephant />;
    }

    if (image === "AiOutlineUser") {
      image = <RiUserFill />;
    }
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <span className="icon">{path=="profile"?image:icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
