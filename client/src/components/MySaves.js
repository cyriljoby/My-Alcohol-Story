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
import LogsContainer from "./LogsContainer";
import StoryContainer from "./StoryContainer";
import moment from "moment";
const MySaves = (saveBoolean) => {
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
function None(){
  if (saves.length<=0){
    return <p style={{ textAlign: "center" ,margin:"0 auto"}}>No Saved Posts</p>
  }
  else{
    return null
  }
}
return(
  <div>
  <StoryContainer save={true}/>
  <LogsContainer save={true}/>
  <None />
  </div>
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


export default MySaves;
