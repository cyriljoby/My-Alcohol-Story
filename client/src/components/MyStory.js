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
import StoryContainerEdit from "./StoryContainerEdit";

import moment from "moment";
const MyStory = () => {
  const {
    getStories,
    getUsers,
    stories,
    isLoading,
    page,
    totalStories,
    search,
    searchStatus,
    searchType,
    sort,
    user,
    users,
    getLogs,
    logs
  } = useAppContext();
  useEffect(() => {
    getUsers();
    getStories();
    getLogs();

    

    // eslint-disable-next-line
  }, []);
  if (isLoading || stories===undefined) {
    return <Loading center />;
  }
  let user_info = [];
  let thisUser_id = "";
  let myStories=[]
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
  stories.map((story)=>{
    if (story.createdBy == user._id || story.createdBy == thisUser_id){
      myStories.push(story)
    }
  })
  console.log(myStories.length)
  if (myStories.length>0){
  return(
    stories?.map((story) => {
    let icon = "";
    for (let i = 0; i < user_info.length; i++) {
      if (story.createdBy === user_info[i].id) {
        story.alias = user_info[i].alias;
        icon = user_info[i].icon;
      }
    }
    if (story.createdBy == user._id || story.createdBy == thisUser_id) {
      if (icon === "GiTortoise") {
        story.image = <GiTortoise />;
      }

      if (icon === "GiDeer") {
        story.image = <GiDeer />;
      }

      if (icon === "RiUserFill") {
        story.image = <RiUserFill />;
      }

      if (icon === "GiButterfly") {
        story.image = <GiButterfly />;
      }

      if (icon === "GiDolphin") {
        story.image = <GiDolphin />;
      }

      if (icon === "GiElephant") {
        story.image = <GiElephant />;
      }
      
      return (
        <Wrapper>
          <div key={story._id}>
            
            <StoryContainerEdit key={story._id} {...story} />
          </div>
        </Wrapper>
      );
      
    }

    else{
      return null
    }
  

  }))}
  else{

    return(
      <Wrapper>
      <p style={{textAlign:"center"}}>You have no stories</p>
      </Wrapper>)
  };
};

export default MyStory;
