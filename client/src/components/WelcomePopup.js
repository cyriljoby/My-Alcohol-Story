import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Popup from "reactjs-popup";

const WelcomePopup = () => {
    const { user, closePopup } = useAppContext()
    console.log(user)
    if (user.popup){
        return null
    }
    else{
    return (
    <div className="welcome">
    <Popup className="welcome" disableBackdropClick backdrop="static" open={true} modal nested>
          {(close) => (
            <div
              className="modal"
              style={{
                maxWidth: "250vw",
                background: "#ffffff",
                padding: "2rem",
              }}
            >
              <button
                className="close"
                onClick={() => {
                  close();
                  closePopup();
                }}
                style={{ fontSize: "1.5rem" }}
              >
                &times;
              </button>
              {/* <h3 className="header"> Warning </h3> */}
              <div className="content">
                <p>Hey {user.alias}, </p>

                <p>Welcome to My Alcohol Story, a supportive community dedicated to teenagers struggling with alcohol. Here, you will find a safe space where you can connect with others who understand and relate with your struggles. Of course, you can share your story anonymously.</p>

                <p>My Alcohol Story can provide solace, inspiration, and resources to anyone joining us on their journey toward healing and recovery. Whether you’re seeking advice, other narratives, or looking for valuable tools, we’re here to give you the support you need. </p>

                <p>Remember, you are not alone in this fight! We will be here every step of the way while you navigate the challenges, celebrate the victories, and create a community where healing and hope thrive. </p>

                <p>Once again, welcome to our community, where your voice matters, your journey is honored, and your recovery is embraced.</p>

                <p>My Alcohol Story Team</p>

              </div>
            </div>
          )}
        </Popup>
        </div>
  );}
};
export default WelcomePopup;

