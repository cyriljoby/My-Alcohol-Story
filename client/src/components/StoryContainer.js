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
import ReplyTemplate from "./replyTemplate";
import moment from "moment";
import { now } from "mongoose";
import { useState, useRef } from "react";
import { BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
var targetBoxId;
var targetRenderId;
let del = "";
let count = 0;
let opens = [];
let openIds = [];

// import {BiReply} from "react-icons/bi";

const StoryContainer = () => {
  // const [replyState, setreplyState] = useState(false);

  const {
    getStories,
    stories,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    getUsers,
    users,
    createReply,
    reply,
    addSave,
    getReplies,
    replies,
    getSubReplies,
    subreplies,
    getSaves,
    saves,
    deleteSave
  } = useAppContext();
  useEffect(() => {
    getUsers();
    getStories();
    getReplies();
    getSubReplies();
    getSaves()
    

    // eslint-disable-next-line
  }, []);
  let user_info = [];
  // console.log(stories)
  let user_id = localStorage.getItem("_id");
  let replyValue = "";
  let arrow = <BsChevronDown />;
  let saved=[]
  saves.map(save=>{
    saved.push(save.savedId)
  })
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
  

  function RenderReplyBox(job) {
    let alias = "";
    let icon = "";
    const [replyState, setreplyState] = useState(false);
    const replyFunc = (e) => {
      setreplyState(!replyState);
    };

    const save = (e) => {
      console.log('save')
      targetBoxId = e.currentTarget.id
      addSave(targetBoxId)
    };
    const unsave = (e) => {
      console.log('un')
      targetBoxId = e.currentTarget.id
      deleteSave(targetBoxId)
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
      
      return (
        <div>
          <div className="story-header">
            <div className="user-info">
              <div className="story-icon">
                <span className="icon">{icon}</span>
              </div>

              <h4>{alias}</h4>
              {saved.includes(job["job"]._id)?
              <button id={job["job"]._id} onClick={unsave}>unsave</button>:
              <button id={job["job"]._id} onClick={save}>save</button>}
              {/* <p>Posted {date}</p> */}
            </div>
            <div className="edit-btns">
              <button className="btn open-reply" onClick={replyFunc}>
                <BiReply />
              </button>
            </div>
          </div>
          <h1 className="story-title">{job["job"].title}</h1>
          <p>{job["job"].story}</p>

          {replyState?<div className="reply-container">
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
          </div>:null}
        </div>
      );
  }

  let counts = [];
  
  let opened = false;
  function RenderButtton({ job, counts }) {
    counts = [];
    const [showState, setshowState] = useState(() => {
      if (
        
        sessionStorage.getItem(job._id) === "open"
      ) {
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
      if (props_list.length!=0){
        {props_list.map((props) => {
 
          sessionStorage.setItem(props._id, "close");

          
        })}
      }
    };
    replies?.map((reply) => {
      counts.push(reply["storyId"]);
    });

    let count = counts.filter((x) => x == job._id).length;
    let alias = "";
    let icon = "";

    if (showState) {
      {
        replies?.map((reply) => {
          let subList = [];
          let content=''
          let subalias=''
          let subicon=''
          let aliasparent=''
          
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
              
              // console.log(subList)
            }
            subreplies?.map((sub)=>{
              // console.log(sub)
              if (reply["_id"]==sub["replyId"]){
                content=(sub["subreply"])
              

              for (let i = 0; i < user_info.length; i++) {
                if (sub["createdBy"] === user_info[i].id) {
                  subalias=(user_info[i].alias);
                  subicon=(user_info[i].icon)
                } 
                if (sub["createdByReplyId"] === user_info[i].id) {
                      aliasparent=user_info[i].alias;
                    } 
              }
              let subCreatedBy=sub["createdBy"]
              let subId=sub["_id"]
              subList.push({"content":content,"subalias":subalias,"subicon":subicon,"aliasparent":aliasparent,"subCreatedBy":subCreatedBy,"subId":subId })
            }

            })
            let props = {
              _id: reply["_id"],
              createdBy:reply["createdBy"],
              reply: reply["reply"],
              createdAt: reply["createdAt"],
              icon: icon,
              alias: alias,
              del: del,
              sub:subList,
              opens:opens,
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
            {multiple?props_list.map((props) => {
 
                return <ReplyTemplate {...props} />;

                
                }):<h1 style={{ paddingBottom: "2rem" }}>no comments</h1>}
            
          </div>
        </div>
      );}

    
    else {
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
  return (
    <Wrapper>
      <div>
        {stories?.map((job) => {
          //       count+=1
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
        })}
      </div>
    </Wrapper>
  );
};

export default StoryContainer;
