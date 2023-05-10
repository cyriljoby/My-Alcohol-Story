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
import { MdDelete, MdPadding } from "react-icons/md";
import { BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp, BsTranslate } from "react-icons/bs";
import { useState, useEffect } from "react";
import BaseReplyTemplate from "./BaseReplyTemplate";
let replyValue = "";
const ReplyTemplate = ({
  _id,
  createdBy,
  reply,
  createdAt,
  icon,
  alias,
  del,
  sub,
  subdel,
  showReply,
}) => {
  const { deleteReply, createSubReply, getSubReplies, subreplies } =
    useAppContext();
  let counts = [];
  function RenderSubReplyBox() {
    const [openState, setOpenState] = useState(false);

    const checkDelete = () => {
      if (del === true) {
        return (
          <button onClick={() => deleteReply(_id)} className="btn delete-btn">
            <MdDelete />
          </button>
        );
      }
    };
    const changeOpenState = () => {
      setOpenState(!openState);
    };

    const handleReplyInput = (e) => {
      replyValue = e.target.value;
    };

    const submit = () => {
      createSubReply(replyValue, _id, createdBy);
      getSubReplies();
    };

    let date = new moment.utc(createdAt).local().startOf("seconds").fromNow();
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
          <div className="reply-story">
            <div className="story-header-edit">
              <div className="user-info">
                <div className="story-icon">
                  <span className="icon">{icon}</span>
                </div>

                <h4>{alias}</h4>
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
            <p>{reply}</p>
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
    }

    return (
      <Wrapper>
        <div className="reply-story">
          <div className="story-header-edit">
            <div className="user-info">
              <div className="story-icon">
                <span className="icon">{icon}</span>
              </div>

              <h4>{alias}</h4>
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
          <p>{reply}</p>
        </div>
      </Wrapper>
    );
  }

  function RenderSubReply() {
    counts = [];
    const [showState, setshowState] = useState(() => {
      if (sessionStorage.getItem(_id) === "open") {
        return true;
      } else {
        return false;
      }
    });
    const showsub = () => {
      setshowState(!showState);
      if (showState) {
        sessionStorage.setItem(_id, "close");
      } else {
        sessionStorage.setItem(_id, "open");
      }
    };
    sub?.map((subreply) => {
      counts.push(subreply["storyId"]);
    });
    let count = counts.length;
    let multiple = count > 0;
    if (showState) {
      return (
        <div id={sub.id}>
          <div>
            {sub.map((subreply) => {
              return (
                <BaseReplyTemplate
                  subdel={subdel}
                  createdByReplyId={createdBy}
                  replyid={_id}
                  subreply={subreply}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      if (count > 0) {
        return (
          <div
            className={multiple ? "num-comments" : "num-alt"}
            style={{
              marginTop: "-1.5rem",
              display: "grid",
              maxWidth: "maxContent",
              justifyContent: "start",
              paddingLeft: "0rem",
              paddingBottom: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "52px 1fr",
                alignItems: "center",
                columnGap: "0.5rem",
              }}
            >
              <div
                className="line"
                style={{
                  width: "2.5rem",
                  height: "0.1rem",
                  backgroundColor: "#000000",
                }}
              ></div>
              <button
                onClick={showsub}
                className="btn show-replies show-subreplies"
                style={{
                  borderColor: "transparent",
                  color: "#000000",
                  fontSize: "0.875rem",
                  transform: "translateY(-0.25rem)",
                  textTransform: "none",
                }}
              >
                Show {count} replies
              </button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    }
  }
  // console.log(del,reply)
  return (
    <div>
      <RenderSubReplyBox />
      <RenderSubReply />
    </div>
  );
};
export default ReplyTemplate;
