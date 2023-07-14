import links from "../utils/links";
import {NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import {Badge} from "@mui/material";

const NavLinks = ({ toggleSidebar }) => {
  const {
    user,
    totalUnreadMessages,
  } = useAppContext();

  let location = useLocation();

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
            className={({ isActive }) => {
              const hasQuery = path.includes("?");
              console.log(location.pathname + location.search)
              if (hasQuery) return `nav-link ${(location.pathname + location.search) === `${path}` ? "active":""}`;
              return `nav-link ${(location.pathname + location.search) === `${path}` ? "active":""}`;
            }}
            end
          >
            {path === "messages" && (
              <span className="icon">
                <Badge badgeContent={totalUnreadMessages} max={999} color="error" className="chat-badge">
                  {icon}
                </Badge>
              </span>
            )}
            {path !== "messages" && (
              <span className="icon">{path=="profile"?image:icon}</span>
            )}
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
