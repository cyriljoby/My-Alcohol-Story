import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/StoryContainerEdit";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState, useEffect } from "react";
let replyValue = "";

const BaseReplyTemplate = ({ createdByReplyId, replyid, subreply }) => {
  const {
    deleteReply,
    createSubReply,
    getSubReplies,
    subreplies,
    deleteSubReply,
  } = useAppContext();
  function RenderSubReplyBox() {
    const [openState, setOpenState] = useState(false);
    const changeOpenState = () => {
      setOpenState(!openState);
    };
    const checkDelete = () => {
      if (
        subreply["subCreatedBy"] ===
        localStorage.getItem("_id").replace(/['"]+/g, "")
      ) {
        return (
          <button
            onClick={() => deleteSubReply(subreply["subId"])}
            className="btn delete-btn"
          >
            <MdDelete />
          </button>
        );
      }
    };
    const handleReplyInput = (e) => {
      replyValue = e.target.value;
    };

    const submit = () => {
      createSubReply(replyValue, replyid, subreply["subCreatedBy"]);
      getSubReplies();
    };
    let icon = subreply["subicon"];
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
    if (openState) {
      return (
        <Wrapper>
          <div style={{ paddingLeft: "4rem" }} className="reply-story">
            <div className="story-header-edit">
              <div className="user-info">
                <div className="story-icon">
                  <span className="icon">{icon}</span>
                </div>
                <h4>{subreply["subalias"]}</h4>
                {/* <p className="story-date">{date}</p> */}
              </div>
              <div className="edit-btns">
                <button className="btn open-reply" onClick={changeOpenState}>
                  <BiReply />
                </button>
                {checkDelete()}
              </div>
            </div>
            {/* <h1 className="story-title">{title}</h1> */}
            <p
              style={{
                display: "inline-block",
              }}
            >
              {/*  --primary-600: #209472;
  --primary-700: #1d8366; */}
              <span style={{ color: "#24a47f" }}>
                <span style={{ fontSize: "1.4rem" }}> @</span>
                {subreply["aliasparent"]}
              </span>{" "}
              {subreply["content"]}
            </p>
            {/* <p>{subreply["content"]}</p> */}
            <div className="reply-container">
              <textarea
                id="reply"
                name="reply"
                rows="10"
                cols="33"
                className="form-input reply-box"
                onChange={handleReplyInput}
              ></textarea>
              <button
                type="submit"
                // id={job["job"]._id}
                className="btn reply-btn"
                onClick={submit}
              >
                Reply
              </button>
            </div>
          </div>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <div style={{ paddingLeft: "4rem" }} className="reply-story">
            <div className="story-header-edit">
              <div className="user-info">
                <div className="story-icon">
                  <span className="icon">{icon}</span>
                </div>
                <h4>{subreply["subalias"]}</h4>
                {/* <p className="story-date">{date}</p> */}
              </div>
              <div className="edit-btns">
                <button className="btn open-reply" onClick={changeOpenState}>
                  <BiReply />
                </button>
                {checkDelete()}
              </div>
            </div>
            {/* <h1 className="story-title">{title}</h1> */}
            <p
              style={{
                display: "inline-block",
              }}
            >
              <span
                style={{
                  color: "#24a47f",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}> @</span>
                {subreply["aliasparent"]}
              </span>{" "}
              {subreply["content"]}
            </p>
          </div>
        </Wrapper>
      );
    }
  }

  return <RenderSubReplyBox />;
};
export default BaseReplyTemplate;
