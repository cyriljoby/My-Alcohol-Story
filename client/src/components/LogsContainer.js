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
import { BiReply, BiMessage } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import ReplyTemplate from "./replyTemplate";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const LogsContainer = ({ profile, save }) => {
  const {
    getLogs,
    logs,
    getUsers,
    users,
    getReplies,
    createReply,
    replies,
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
  const user = localStorage
    .getItem("user")
    .split(",")[0]
    .replace('{"_id":', "")
    .replace(/['"]+/g, "");
  let user_info = [];
  let subreplyIds = [];
  var targetRenderId;
  let user_id = JSON.parse(localStorage.getItem("_id"));
  let opens = [];
  let openIds = [];
  let saved = [];
  if (!logs) {
    return <Loading center={true} />;
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
    let iconName = "";
    let icon = "";
    const [replyState, setreplyState] = useState(false);
    const replyFunc = (e) => {
      targetBoxId = e.currentTarget.id;
      setreplyState(!replyState);
    };

    const navigate = useNavigate();

    const chatFunc = (recipient, alias, iconName) => {
      navigate(
        `/messages?recipient=${recipient}&alias=${alias}&icon=${iconName}`
      );
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
        iconName = user_info[i].icon;
      } else {
        continue;
      }
    }
    if (iconName === "GiTortoise") {
      icon = <GiTortoise />;
    }
    if (iconName === "GiDeer") {
      icon = <GiDeer />;
    }
    if (iconName === "RiUserFill") {
      icon = <RiUserFill />;
    }
    if (iconName === "GiButterfly") {
      icon = <GiButterfly />;
    }
    if (iconName === "GiDolphin") {
      icon = <GiDolphin />;
    }
    if (iconName === "GiElephant") {
      icon = <GiElephant />;
    }
    if (iconName === "AiOutlineUser") {
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
      <div>
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
            <button className="btn open-reply" onClick={replyFunc}>
              <BiReply />
            </button>
            {log.createdBy !== user_id ? (
              <button
                className="btn start-chat"
                onClick={() => chatFunc(log.createdBy, alias, iconName)}
              >
                <BiMessage />
              </button>
            ) : null}
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
              <button className="btn save" id={log._id} onClick={save}>
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

  let opened = false;
  let counts = [];
  function RenderButtton({ log, counts }) {
    subreplyIds = [];
    counts = [];
    const [showState, setshowState] = useState(() => {
      if (sessionStorage.getItem(log._id) === "open") {
        return true;
      } else {
        return false;
      }
    });

    let props_list = [];
    const showReplies = (e) => {
      targetRenderId = e.currentTarget.id;
      opened = false;
      setshowState(!showState);
      if (showState) {
        sessionStorage.setItem(log._id, "close");
      } else {
        sessionStorage.setItem(log._id, "open");
      }
      if (props_list.length != 0) {
        {
          props_list.map((props) => {
            sessionStorage.setItem(props._id, "close");
          });
        }
      }
    };
    subreplies?.map((subreply, index) => {
      subreplyIds.push(subreply["replyId"]);
    });
    replies?.map((reply) => {
      let subcount = subreplyIds.filter((x) => x == reply["_id"]).length;
      for (let i = 0; i < subcount; i++) {
        counts.push(reply["storyId"]);
      }
      counts.push(reply["storyId"]);
    });

    let count = counts.filter((x) => x == log._id).length;
    let alias = "";
    let icon = "";

    if (showState) {
      {
        replies?.map((reply) => {
          let subList = [];
          let content = "";
          let subalias = "";
          let subicon = "";
          let aliasparent = "";

          if (reply["storyId"] === log._id) {
            for (let i = 0; i < user_info.length; i++) {
              if (reply.createdBy === user_info[i].id) {
                alias = user_info[i].alias;
                icon = user_info[i].icon;
              } else {
                continue;
              }
              if (reply["createdBy"] === user_id.replace(/['"]+/g, "")) {
                del = true;
              } else {
                del = false;
              }
            }
            subreplies?.map((sub) => {
              if (reply["_id"] == sub["replyId"]) {
                content = sub["subreply"];

                for (let i = 0; i < user_info.length; i++) {
                  if (sub["createdBy"] === user_info[i].id) {
                    subalias = user_info[i].alias;
                    subicon = user_info[i].icon;
                  }
                  if (sub["createdByReplyId"] === user_info[i].id) {
                    aliasparent = user_info[i].alias;
                  }
                }
                let subCreatedBy = sub["createdBy"];
                let subId = sub["_id"];
                subList.push({
                  content: content,
                  subalias: subalias,
                  subicon: subicon,
                  aliasparent: aliasparent,
                  subCreatedBy: subCreatedBy,
                  subId: subId,
                });
              }
            });
            let props = {
              _id: reply["_id"],
              createdBy: reply["createdBy"],
              reply: reply["reply"],
              createdAt: reply["createdAt"],
              icon: icon,
              alias: alias,
              del: del,
              sub: subList,
              opens: opens,
            };
            props_list.push(props);
          }
        });
      }
      for (let i = -1; i++, i < openIds.length; ) {
        if (openIds[i] == log._id) {
          openIds.splice(i, 1);
        }
      }
      let multiple = count > 0;
      return (
        <div>
          <div>
            <button
              id={"show" + log._id}
              onClick={showReplies}
              className="btn show-replies"
            >
              <span className={multiple ? "num-comments" : "num-alt"}>
                {count}
              </span>
              <BsChevronUp />
            </button>
          </div>
          <div>
            {multiple ? (
              props_list.map((props) => {
                return <ReplyTemplate {...props} />;
              })
            ) : (
              <h1 style={{ paddingBottom: "2rem" }}>no comments</h1>
            )}
          </div>
        </div>
      );
    } else {
      let multiple = count > 0;
      return (
        <div>
          <button
            id={"show" + log._id}
            onClick={showReplies}
            className="btn show-replies"
          >
            <span className={multiple ? "num-comments" : "num-alt"}>
              {count}
            </span>
            <BsChevronDown />
          </button>
        </div>
      );
    }
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

                <RenderButtton
                  id={"replies" + log._id}
                  log={log}
                  counts={counts}
                />
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
            if (log.createdBy === user) {
              profilecount += 1;
              return (
                <Wrapper>
                  <div
                    key={log._id}
                    className="story"
                    style={{ paddingBottom: "0" }}
                  >
                    <RenderReplyBox id={"box" + log._id} log={log} />
                    <RenderButtton
                      id={"replies" + log._id}
                      log={log}
                      counts={counts}
                    />
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
                  <RenderButtton
                    id={"replies" + log._id}
                    log={log}
                    counts={counts}
                  />
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
