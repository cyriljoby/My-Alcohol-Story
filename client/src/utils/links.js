import { BsPlusSquare } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { TfiBook } from "react-icons/tfi";

const links = [
  { id: 1, text: "feed", path: "/", icon: <IoHomeOutline /> },
  { id: 2, text: "daily logs", path: "daily-logs", icon: <TfiBook /> },
  { id: 3, text: "post", path: "add-story", icon: <BsPlusSquare /> },
  { id: 4, text: "profile", path: "profile", icon: <RiUserFill /> },
  { id: 5, text: "resources", path: "resources", icon: <IoCallOutline /> },
];

export default links;
