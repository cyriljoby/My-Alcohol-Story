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

const LogContainerEdit = ({
    alias,
    createdAt,
    createdBy,
    day,
    image,
    log,
    month,
    updatedAt,
    _id,
    save,

    
}) => {
  const {  deleteLog,setEditLog, deleteSave, saves } = useAppContext();
  console.log(alias, day, image, log, _id)
//   let date = new moment.utc(createdAt).local().startOf("seconds").fromNow();
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
            </button>:
          <div className="edit-btns">
            <Link
              to="/edit-log"
              className="btn edit-btn"
              onClick={() => setEditLog(_id)}
            >
              <FaEdit></FaEdit>
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteLog(_id)}
            >
              <MdDelete />
            </button>
          </div>}
        </div>
        <h1 className="story-title">Day {day}</h1>
        <p>{log}</p>
      </div>
    </Wrapper>
  );
};
export default LogContainerEdit;
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


