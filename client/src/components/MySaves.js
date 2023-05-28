import { useAppContext } from "../context/appContext";
import { useEffect, useReducer } from "react";
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
import LogContainerEdit from "./LogContainerEdit";
import StoryContainerEdit from "./StoryContainerEdit";
import StoryContainer from "./StoryContainer";
import moment from "moment";
const MySaves = () => {
  const {
    getUsers,
    users,
    getLogs,
    logs,
    isLoading,
    user,
    getSaves,
    getStories,
    saves,
    stories
  } = useAppContext();
  useEffect(() => {
    getSaves();
    getLogs();
    getUsers();
    getStories();

    

    // eslint-disable-next-line
  }, []);
  if (isLoading || logs===undefined) {
    return <Loading center />;
  }
  let mySaves=[]
  let user_info = [];
  let thisUser_id = "";
  let alias=''
  let icon=''
  for (let i = 0; i < users?.length; i++) {
    user_info.push({
      id: users[i]._id,
      alias: users[i].alias,
      icon: users[i].image,
    });
    if (users[i].alias === user.alias) {
      thisUser_id = users[i]._id;
    }
  }

  if (saves.length>0){
    saves.map((save)=>{
        logs.map((log)=>{
            if (save.savedId==log._id){
                mySaves.push(log)
            }
        })
        stories.map((story)=>{
            if (save.savedId==story._id){
                mySaves.push(story)
            }
        }
        )
    })
return(
    mySaves.map((mySave=>{
        for (let i = 0; i < user_info.length; i++) {
            if (mySave.createdBy === user_info[i].id) {
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
          let story = mySave.title
        return(
            <div>
              {/* <StoryContainer save={true}/> */}

            {story ?<StoryContainerEdit _id={mySave._id} title={mySave.title} story = {mySave.story} createdAt={mySave.createdAt} image={icon} alias={alias} save={true}/>:(
            <LogContainerEdit alias={alias} createdAt={mySave.createdAt} createdBy={mySave.createdBy} day={mySave.day} image={icon} log={mySave.log} month={mySave.month} updatedAt={mySave.updatedAt} _id={mySave._id} save={true}/>)}
            </div>
            // <StoryContainerEdit id={id} title={mySave.title} story = {mySave.story} createdAt={mySave.createdAt} image={icon} alias={alias} save={true}/>
        )
    }))
)
}
//     logs?.map((log) => {
//     let date = new moment.utc(log.createdAt)
//       .local()
//       .startOf("seconds")
//       .fromNow();

//     let icon = "";
//     for (let i = 0; i < user_info.length; i++) {
//       if (log.createdBy === user_info[i].id) {
//         log.alias = user_info[i].alias;
//         icon = user_info[i].icon;
//       }
//     }
//     if (log.createdBy == user._id || log.createdBy == thisUser_id) {
//       if (icon === "GiTortoise") {
//         log.image = <GiTortoise />;
//       }

//       if (icon === "GiDeer") {
//         log.image = <GiDeer />;
//       }

//       if (icon === "RiUserFill") {
//         log.image = <RiUserFill />;
//       }

//       if (icon === "GiButterfly") {
//         log.image = <GiButterfly />;
//       }

//       if (icon === "GiDolphin") {
//         log.image = <GiDolphin />;
//       }

//       if (icon === "GiElephant") {
//         log.image = <GiElephant />;
//       }
//       return (
        
//         <Wrapper>
//           <div key={log._id}>
//             <LogContainerEdit key={log._id} {...log} />
//           </div>
//         </Wrapper>
//       );
      
//     }

//     else{
//       return null
//     }
  

//   }))}
  else{
    return   <p style={{textAlign: "center",margin:"0 auto"}}>You have no Saved Posts</p>

  };
};

export default MySaves;
