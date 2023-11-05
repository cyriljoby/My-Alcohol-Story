import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Popup from "reactjs-popup";

const DeletedRepliesPopup = () => {
    const { user, closePopup } = useAppContext()
    console.log(user)
    if (user.popup2){
        return null
    }
    if(user.popup&&!user.popup2){
    return (
    <div className="welcome">
    <Popup className="welcome" disableBackdropClick={false} backdrop="static" open={true}   onClose={() => closePopup(true)} >
          {(close) => (
            <div
              className="modal"
              style={{
                width: "700px",
                maxWidth: "90vw",
                background: "#ffffff",
                padding: "1.5rem 2rem",
              }}
            >
              <button
                className="close"
                onClick={() => {
                  close();
                  closePopup(true);
                }}
                style={{ fontSize: "1.5rem" }}
              >
                &times;
              </button>
              {/* <h3 className="header"> Warning </h3> */}
              <div className="content-long">
                

                <p>Recently, we discovered a loss of data where comments on posts in My Alcohol Story were deleted. We are investigating the cause of this issue and sincerely apologize for any inconveniences. Nevertheless, My Alcohol Story has and continues to serve as a place where young people affected by alcohol can find a supportive community</p>


              </div>
              <div className="content-short">
              <p>Recently, we discovered a loss of data where comments on posts in My Alcohol Story were deleted. We are investigating the cause of this issue and sincerely apologize for any inconveniences. Nevertheless, My Alcohol Story has and continues to serve as a place where young people affected by alcohol can find a supportive community</p>

              </div>
            </div>
          )}
        </Popup>
        </div>
  );}
  else{
    return null
  }
};
export default DeletedRepliesPopup;

