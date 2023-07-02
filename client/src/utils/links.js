import { BsPlusSquare } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { TfiBook } from "react-icons/tfi";
import { BiMessage } from "react-icons/bi";
import { AiFillAndroid } from "react-icons/ai";

const links = [
  { id: 1, text: "feed", path: "/", icon: <IoHomeOutline /> },
  { id: 2, text: "dear sobriety", path: "daily-logs", icon: <TfiBook /> },
  { id: 3, text: "messages", path: "messages", icon: <BiMessage /> },
  { id: 4, text: "personal chatbot", path: "chat-bot", icon: <AiFillAndroid /> },
  { id: 5, text: "post", path: "add-story", icon: <BsPlusSquare /> },
  { id: 6, text: "profile", path: "profile", icon: <RiUserFill /> },
  { id: 7, text: "resources", path: "resources", icon: <IoCallOutline /> },
];

export default links;
