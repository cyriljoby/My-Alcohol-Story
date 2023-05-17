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
import Wrapper from "../../assets/wrappers/StoryContainerEdit";

const DailyLog = () => {
    return(
      <Wrapper>
        <LogsContainer/>
      </Wrapper>
      
    )
    }

export default DailyLog;

