import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/JobsContainerEdit";
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

const JobsContainerEdit = ({
  _id,
  title,
  story,
  createdAt,
  image,
  alias,
  icon,
}) => {
  const { setEditJob, deleteJob } = useAppContext();

  let date = new moment.utc(createdAt).local().startOf("seconds").fromNow();

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
          </div>
        </div>
        <h1 className="story-title">{title}</h1>
        <p>{story}</p>
      </div>
    </Wrapper>
  );
};
export default JobsContainerEdit;
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


