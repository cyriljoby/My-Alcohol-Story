import { useEffect } from "react";
import Wrapper from "../assets/wrappers/StoryContainer";

import moment from "moment";
import { now } from "mongoose";
import { useState, useRef } from "react";
import { BiReply } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// import {BiReply} from "react-icons/bi";

const LogsContainer = ({image,alias,month,day,log}) => {
  // const [replyState, setreplyState] = useState(false);
    
  return (
    <Wrapper>
      <div className="story">
        <div className="story-header-edit">
          <div className="user-info">
            <div className="story-icon">
              <span className="icon">{image}</span>
            </div>

            <h4>{alias}</h4>
          </div>
        </div>
        <h1 className="story-title">Month:{month}</h1>
        <p>Day:{day}</p>
        <p>{log}</p>
      </div>
    </Wrapper>
  );

}

export default LogsContainer