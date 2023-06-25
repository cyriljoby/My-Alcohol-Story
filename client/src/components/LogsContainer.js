import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { useState } from "react";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import Wrapper from "../assets/wrappers/StoryContainer";
import { BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ReplyTemplate from "./replyTemplate";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import Loading from "./Loading";
const LogsContainer = ({ profile, save }) => {
  const {
    getLogs,
    logs,
    getUsers,
    users,
    getReplies,
    createReply,
    user,
    getSubReplies,
    subreplies,
    addSave,
    deleteSave,
    saves,
    setEditLog,
    deleteLog,
  } = useAppContext();
  useEffect(() => {
    getLogs();
    getUsers();
    getReplies();
    getSubReplies();

    // eslint-disable-next-line
  }, []);
  const userId = user._id
  let user_info = [];
  let subreplyIds = [];
  var targetRenderId;
  let user_id = localStorage.getItem("_id");
  let opens = [];
  let openIds = [];
  let saved = [];
  if (!logs){
    return(<Loading center={true}/>)
  }
  saves.map((save) => {
    saved.push(save.savedId);
  });

  var targetBoxId;
  let replyValue = "";
  let del = "";

  for (let i = 0; i < users?.length; i++) {
    user_info.push({
      id: users[i]._id,
      alias: users[i].alias,
      icon: users[i].image,
    });
  }
  if (logs?.length === 0) {
    return (
      <Wrapper>
        <h2>No Dear Sobrieties to display...</h2>
      </Wrapper>
    );
  }
  const handleReplyInput = (e) => {
    replyValue = e.target.value;
  };

  function None() {
    let count = 0;
    logs?.map((log) => {
      if (log.createdBy === user) {
        count += 1;
      }
    });
    if (profile && count == 0) {
      return (
        <p style={{ textAlign: "center", margin: "0 auto" }}>
          No Dear Sobrieties to display
        </p>
      );
    } else {
      return null;
    }
  }
  function RenderReplyBox({ log }) {
    let alias = "";
    let icon = "";
    const [replyState, setreplyState] = useState(false);
    const replyFunc = (e) => {
      targetBoxId = e.currentTarget.id;
      setreplyState(!replyState);
    };

    const save = (e) => {
      targetBoxId = e.currentTarget.id;
      if (saved?.includes(targetBoxId)) {
        deleteSave(targetBoxId);
      } else {
        addSave(targetBoxId);
      }
    };

    const createNewReply = (e) => {
      opens = [];
      e.preventDefault();
      opens.push(e.currentTarget.id);
      getReplies();
      createReply(log._id, replyValue);
    };
    for (let i = 0; i < user_info.length; i++) {
      if (log.createdBy === user_info[i].id) {
        alias = user_info[i].alias;
        icon = user_info[i].icon;
      } else {
        continue;
      }
    }
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
    let datestring = new moment.utc(log.createdAt)
      .startOf("seconds")
      ._d.toISOString()
      .split("T");
    // let date=new Date(datestr)
    let day = moment(datestring[0]).format("DD MMMM YYYY").split(" ");
    let month = day[1];
    let date = day[0];
    let year = day[2];
    return (
      <div style={{ paddingBottom: "1rem" }}>
        <div className="story-header">
          <div className="user-info">
            <div className="story-icon">
              <span className="icon">{icon}</span>
            </div>

            <h4>{alias}</h4>

            <p className="story-date">
              {" "}
              {month} {date}, {year}
            </p>
          </div>
          <div className="edit-btns">
            {/* <button className="btn open-reply" onClick={replyFunc}>
              <BiReply />
            </button> */}
            {profile ? (
              <div
                className="edit-btns"
                style={{ alignContent: "center", marginLeft: "0.5rem" }}
              >
                <Link
                  to="/edit-story"
                  className="btn edit-btn"
                  onClick={() => setEditLog(log._id)}
                >
                  <FaEdit></FaEdit>
                </Link>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => deleteLog(log._id)}
                >
                  <MdDelete />
                </button>
              </div>
            ) : null}
            {profile ? null : (
              <button className="save" id={log._id} onClick={save}>
                {saved.includes(log._id) ? (
                  <BsFillBookmarkFill />
                ) : (
                  <BsBookmark />
                )}
              </button>
            )}
          </div>

          <h1
            className="story-title"
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "0.5rem",
            }}
          >
            day {log.day}
          </h1>
        </div>
        <p style={{ margin: "0rem", padding: "0rem", color: "#000000" }}>
          Dear Sobriety,
        </p>
        <p
          style={{ marginTop: "0rem", paddingTop: "0rem", textIndent: "2rem" }}
        >
          {log.log}
        </p>

        {replyState ? (
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
              id={log._id}
              className="btn reply-btn"
              onClick={createNewReply}
            >
              Reply
            </button>
          </div>
        ) : null}
      </div>
      // </div>
    );
  }


  let profilecount = 0;
  if (save) {
    return saves.map((save) => {
      return logs?.map((log) => {
        if (save.savedId == log._id) {
          return (
            <Wrapper>
              <div key={log._id} className="story">
                <RenderReplyBox id={"box" + log._id} log={log} />
              </div>
            </Wrapper>
          );
        }
      });
    });
  } else {
    return (
      <div>
        {logs?.map((log) => {
          if (profile) {
            if (log.createdBy === userId) {
              profilecount += 1;
              return (
                <Wrapper>
                  <div
                    key={log._id}
                    className="story"
                    style={{ paddingBottom: "0" }}
                  >
                    <RenderReplyBox id={"box" + log._id} log={log} />
                  </div>
                </Wrapper>
              );
            }
          } else {
            return (
              <Wrapper>
                <div
                  key={log._id}
                  className="story"
                  style={{ paddingBottom: "0" }}
                >
                  <RenderReplyBox id={"box" + log._id} log={log} />
    
                </div>
              </Wrapper>
            );
          }
        })}
        <None />
      </div>
    );
  }
};

export default LogsContainer;
