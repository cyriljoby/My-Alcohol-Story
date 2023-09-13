import { BsPlusSquare } from "react-icons/bs";
import { RiUserFill } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { TfiBook } from "react-icons/tfi";
import { BiMessage } from "react-icons/bi";
import { AiOutlineRobot } from "react-icons/ai";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import React from "react";
// import StoryContainer from "../components/StoryContainer";
// console.log("Imported")
// import user from "StoryContainer"

// console.log("Icon: "+user.image)

// // if (icon === "GiTortoise") {
// //   icon = <GiTortoise />;
// // }

// // if (icon === "GiDeer") {
// //   icon = <GiDeer />;
// // }

// // if (icon === "RiUserFill") {
// //   icon = <RiUserFill />;
// // }

// // if (icon === "GiButterfly") {
// //   icon = <GiButterfly />;
// // }

// // if (icon === "GiDolphin") {
// //   icon = <GiDolphin />;
// // }

// // if (icon === "GiElephant") {
// //   icon = <GiElephant />;
// // }

// // if (icon === "AiOutlineUser") {
// //   icon = <RiUserFill />;
// // }

const links = [

  { id: 1, text: "feed", path: "/", icon: <IoHomeOutline /> },
  { id: 2, text: "dear sobriety", path: "/daily-logs", icon: <TfiBook /> },
  { id: 3, text: "messages", path: "/messages", icon: <BiMessage /> },
  { id: 4, text: "post", path: "/add-story", icon: <BsPlusSquare /> },
  { id: 5, text: "profile", path: "/profile", icon: <BsPlusSquare /> } ,
  { id: 6, text: "resources", path: "/resources", icon: <IoCallOutline /> },

];


export default links;
