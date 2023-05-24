import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/StoryContainerEdit";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  GiElephant,
  GiDeer,
  GiButterfly,
  GiDolphin,
  GiTortoise,
} from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";

const StoryContainerEdit = ({
  _id,
  title,
  story,
  createdAt,
  image,
  alias,
  save
}) => {
  const { setEditJob, deleteJob,getReplies,getSubReplies, deleteSave } = useAppContext();
  // useEffect(() => {
  //   getReplies();
  //   getSubReplies();
    

  //   // eslint-disable-next-line
  // }, [replies]);
  let date = new moment.utc(createdAt).local().startOf("seconds").fromNow();
  // function RenderReply(){
  //   replies.map((reply=>{
  //     if (reply["storyId"]==_id){
  //       console.log('hii')
  //     }
  //   }))
  // }
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
          {save?
          <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteSave(_id)}
            >
              <MdDelete />
            </button>:(
          <div className="edit-btns">
            
            <Link
              to="/edit-story"
              className="btn edit-btn"
              onClick={() => setEditJob(_id)}
            >
              <FaEdit></FaEdit>
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteJob(_id)}
            >
              <MdDelete />
            </button>
          </div>)}
        </div>
        <h1 className="story-title">{title}</h1>
        <p>{story}</p>
      </div>
    </Wrapper>
  );
};
export default StoryContainerEdit;
//   return (
//     <Wrapper>
//       <header>
//         <div className='main-icon'>{story.charAt(0)}</div>
//         <div className='info'>
//           <h5>{title}</h5>
//           <p>{story}</p>
//         </div>
//       </header>
//       <div className='content'>
//         <div className='content-center'>
//           <JobInfo icon={<FaCalendarAlt />} text={date} />
//         </div>
//         <footer>
//           <div className='actions'>
//             <Link
//               to='/add-job'
//               className='btn edit-btn'
//               onClick={() => setEditJob(_id)}
//             >
//               Edit
//             </Link>
// <button
//   type='button'
//   className='btn delete-btn'
//   onClick={() => deleteJob(_id)}
// >
//   Delete
// </button>
//           </div>
//         </footer>
//       </div>
//     </Wrapper>
//   )
// }


