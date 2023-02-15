import { useAppContext } from "../context/appContext";
import { useEffect, useReducer } from "react";
import Loading from "./Loading";
import Wrapper from "../assets/wrappers/JobsContainer";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import JobsContainerEdit from "./JobsContainerEdit";

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
    numOfPages,
    users,
  } = useAppContext();
  let userId=localStorage
  .getItem("user")
  .split(",")[0]
  .replace('{"_id":', "")
  .replace(/['"]+/g, "");
  useEffect(() => {
    getJobs(userId);
    getUsers();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }
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
            <JobsContainerEdit key={job._id} {...job} />
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

