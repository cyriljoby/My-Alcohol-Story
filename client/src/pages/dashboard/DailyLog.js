import LogsContainer from "../../components/LogsContainer";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";

const DailyLog = () => {
  const {
    getLogs,
    logs,
    getUsers,
    users
  } = useAppContext();
  useEffect(() => {
    getLogs();
    getUsers();
    

    // eslint-disable-next-line
  }, []);
  let user_info=[]
  for (let i = 0; i < users?.length; i++) {
    user_info.push({
      id: users[i]._id,
      alias: users[i].alias,
      icon: users[i].image,
    });
  }
  console.log(user_info)
  let icon = "";
  return logs?.map((log)=>{
    for (let i = 0; i < user_info.length; i++) {
      if (log.createdBy === user_info[i].id) {
        log.alias = user_info[i].alias;
        icon = user_info[i].icon;
      }
    }
    if (icon === "GiTortoise") {
      log.image = <GiTortoise />;
    }

    if (icon === "GiDeer") {
      log.image = <GiDeer />;
    }

    if (icon === "RiUserFill") {
      log.image = <RiUserFill />;
    }

    if (icon === "GiButterfly") {
      log.image = <GiButterfly />;
    }

    if (icon === "GiDolphin") {
      log.image = <GiDolphin />;
    }

    if (icon === "GiElephant") {
      log.image = <GiElephant />;
    }
    console.log(log)
    return(
      <LogsContainer key={logs._id} {...log}/>
    )
  }) 
};

export default DailyLog;

