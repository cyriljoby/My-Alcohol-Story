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
    getJobs,
    getUsers,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    user,
    users,
  } = useAppContext();
  useEffect(() => {
    getUsers();
    getJobs();

    

    // eslint-disable-next-line
  }, []);
  if (isLoading || jobs===undefined) {
    return <Loading center />;
  }
  console.log(jobs)
  let user_info = [];
  let thisUser_id = "";
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

  return jobs?.map((job) => {
    let date = new moment.utc(job.createdAt)
      .local()
      .startOf("seconds")
      .fromNow();

    let icon = "";
    for (let i = 0; i < user_info.length; i++) {
      if (job.createdBy === user_info[i].id) {
        job.alias = user_info[i].alias;
        icon = user_info[i].icon;
      }
    }
    if (job.createdBy == user._id || job.createdBy == thisUser_id) {
      if (icon === "GiTortoise") {
        job.image = <GiTortoise />;
      }

      if (icon === "GiDeer") {
        job.image = <GiDeer />;
      }

      if (icon === "RiUserFill") {
        job.image = <RiUserFill />;
      }

      if (icon === "GiButterfly") {
        job.image = <GiButterfly />;
      }

      if (icon === "GiDolphin") {
        job.image = <GiDolphin />;
      }

      if (icon === "GiElephant") {
        job.image = <GiElephant />;
      }
      return (
        <Wrapper>
          <div key={job._id}>
            <StoryContainerEdit key={job._id} {...job} />
          </div>
        </Wrapper>
      );
      
    }
    else{
      return null
    }

  });
};

export default MyStory;
