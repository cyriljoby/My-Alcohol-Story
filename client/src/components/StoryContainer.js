import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/StoryContainer";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ReplyTemplate from "./replyTemplate";
import moment from "moment";
import { now } from "mongoose";
import { useState, useRef } from "react";
import { BiMessage, BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";

var targetBoxId;
var targetRenderId;
let del = "";
let opens = [];
let openIds = [];

// import {BiReply} from "react-icons/bi";

const StoryContainer = ({ profile, save }) => {
  // const [replyState, setreplyState] = useState(false);

  const {
    getStories,
    stories,
    isLoading,
    page,
    search,
    subreplyIds,
    searchType,
    sort,
    getUsers,
    users,
    createReply,
    setEditLog,
    addSave,
    getReplies,
    replies,
    getSubReplies,
    subreplies,
    getSaves,
    saves,
    deleteSave,
    setEditJob,
    deleteJob,
    user
  } = useAppContext();
  useEffect(() => {
    getUsers();
    getStories();
    getReplies();
    getSubReplies();
    getSaves();

    // eslint-disable-next-line
  }, []);
  if (!stories) {
    return <Loading center={true} />;
  }
  let user_info = [];
  const userId=user._id
  let user_id = JSON.parse(localStorage.getItem("_id"));
  let replyValue = "";
  //let arrow = <BsChevronDown />;
  let saved = [];
  saves.map((save) => {
    saved.push(save.savedId);
  });

  for (let i = 0; i < users?.length; i++) {
    user_info.push({
      id: users[i]._id,
      alias: users[i].alias,
      icon: users[i].image,
    });
  }

  if (stories?.length === 0) {
    return (
      <Wrapper>
        <h2>No stories to display...</h2>
      </Wrapper>
    );
  }

  const handleReplyInput = (e) => {
    replyValue = e.target.value;
  };

  function None() {
    let count = 0;
    stories?.map((story) => {
      if (story.createdBy === userId) {
        count += 1;
      }
    });
    if (profile && count == 0) {
      return (
        <p style={{ textAlign: "center", margin: "0 auto" }}>
          No Stories to display
        </p>
      );
    } else {
      return null;
    }
  }
  function RenderReplyBox(job) {
    let alias = "";
    let iconName = "";
    let icon = "";
    const [replyState, setreplyState] = useState(false);
    const replyFunc = (e) => {
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
      let _id = "";
      if (saved?.includes(targetBoxId)) {
        deleteSave(targetBoxId);
      } else {
        addSave(targetBoxId);
      }
    };
    const hi = (e) => {
      opens = [];
      e.preventDefault();
      opens.push(e.currentTarget.id);

      getReplies();
      createReply(job["job"]._id, replyValue);
    };
    for (let i = 0; i < user_info.length; i++) {
      if (job["job"].createdBy === user_info[i].id) {
        alias = user_info[i].alias;
        iconName = user_info[i].icon;
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

    return (
      <div>
        <div className="story-header">
          <div className="user-info">
            <div className="story-icon">
              <span className="icon">{icon}</span>
            </div>

            <h4>{alias}</h4>

            {/* <p>Posted {date}</p> */}
          </div>
          <div className="edit-btns">
            <button className="btn open-reply" onClick={replyFunc}>
              <BiReply />
            </button>
            {job["job"].createdBy !== user_id ? (
              <button
                className="btn start-chat"
                onClick={() => chatFunc(job["job"].createdBy, alias, iconName)}
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
                  onClick={() => setEditJob(job["job"]._id)}
                >
                  <FaEdit></FaEdit>
                </Link>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => deleteJob(job["job"]._id)}
                >
                  <MdDelete />
                </button>
              </div>
            ) : null}
            {profile ? null : (
              <button className="save" id={job["job"]._id} onClick={save}>
                {saved.includes(job["job"]._id) ? (
                  <BsFillBookmarkFill />
                ) : (
                  <BsBookmark />
                )}
              </button>
            )}
          </div>
        </div>
        <h1 className="story-title">{job["job"].title}</h1>
        <p>{job["job"].story}</p>

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
              id={job["job"]._id}
              className="btn reply-btn"
              onClick={hi}
            >
              Reply
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  let counts = [];

  let opened = false;
  function RenderButtton({ job, counts }) {
    counts = [];
    const [showState, setshowState] = useState(() => {
      if (sessionStorage.getItem(job._id) === "open") {
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
        sessionStorage.setItem(job._id, "close");
      } else {
        sessionStorage.setItem(job._id, "open");
      }
      if (props_list.length != 0) {
        {
          props_list.map((props) => {
            sessionStorage.setItem(props._id, "close");
          });
        }
      }
    };

    replies?.map((reply) => {
      if (subreplyIds.length > 0) {
        let subcount = subreplyIds?.filter((x) => x == reply["_id"]).length;
        for (let i = 0; i < subcount; i++) {
          counts.push(reply["storyId"]);
        }
      }

      counts.push(reply["storyId"]);
    });

    let count = counts.filter((x) => x == job._id).length;
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

          if (reply["storyId"] === job._id) {
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
              // subList.push(content,subalias,subicon,aliasparent)
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
        if (openIds[i] == job._id) {
          openIds.splice(i, 1);
        }
      }
      let multiple = count > 0;
      return (
        <div>
          <div>
            <button
              id={"show" + job._id}
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
            id={"show" + job._id}
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
  if (save) {
    return saves.map((save) => {
      return stories.map((story) => {
        if (save.savedId == story._id) {
          return (
            <Wrapper>
              <div key={story._id} className="story">
                <RenderReplyBox id={"box" + story._id} job={story} />

                <RenderButtton
                  id={"replies" + story._id}
                  job={story}
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
      <Wrapper>
        <div>
          {stories?.map((job) => {
            if (profile) {
              if (job.createdBy == userId) {
                let date = new moment.utc(job.createdAt)
                  .local()
                  .startOf("seconds")
                  .fromNow();

                // job.push(icon)

                return (
                  <div key={job._id} className="story">
                    <RenderReplyBox id={"box" + job._id} job={job} />

                    <RenderButtton
                      id={"replies" + job._id}
                      job={job}
                      counts={counts}
                    />
                  </div>
                );
              }
            }

            // else if (save){
            //   saves?.map((save=>{
            //     return (
            //       <div key={job._id} className="story">
            //         <RenderReplyBox id={"box" + job._id} job={job} />

            //         <RenderButtton
            //           id={"replies" + job._id}
            //           job={job}
            //           counts={counts}
            //         />
            //       </div>
            //     );
            //   }))
            // }
            else {
              let date = new moment.utc(job.createdAt)
                .local()
                .startOf("seconds")
                .fromNow();

              // job.push(icon)

              return (
                <div key={job._id} className="story">
                  <RenderReplyBox id={"box" + job._id} job={job} />

                  <RenderButtton
                    id={"replies" + job._id}
                    job={job}
                    counts={counts}
                  />
                </div>
              );
            }
          })}
          <None />
        </div>
      </Wrapper>
    );
  }
};

export default StoryContainer;
