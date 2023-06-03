import Wrapper from "../../assets/wrappers/DashboardFormPage";
import "react-chat-elements/dist/main.css"
import {Button, Input, MessageBox, MessageList} from "react-chat-elements";
import {GiDeer} from "react-icons/gi";
import ChatList from "../../components/ChatList"
import { io } from "socket.io-client";
import {useEffect} from "react";

const socket = io("http://localhost:5200/", {
  auth: {
    token: localStorage.getItem("token"),
  }
});

const DirectMessages = () => {

  const sendMessage = (data) => {
    socket.emit("create-message", {
      message: data.message,
    });
  }

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(data.message);
    });
  }, [socket]);


  return (
    <div
      className="messages-div"
    >
      <div
        className="chat-panel"
      >
        <ChatList
          className='chat-list'
          users={[
            {
              image: <GiDeer/>,
              alias: 'Kursat',
              userId: '123456'
            },
            {
              image: <GiDeer/>,
              alias: 'Bob',
              userId: '222452'
            }
          ]}
        />
      </div>
      <div
        className="message-panel"
      >
        <MessageList
          className='message-list'
          lockable={true}
          toBottomHeight={'100%'}
          dataSource={[
          {
            position:"left",
            type:"text",
            title:"Kursat",
            text:"Hey, I saw your post.. How are you doing?",
          },
          {
            position:"right",
            type:"text",
            title:"Test",
            text:"Im not doing the best but i'm trying...",
          },
          {
            position:"left",
            type:"text",
            title:"Kursat",
            text:"I hear you, I feel the same way...",
          },
          {
            position:"right",
            type:"text",
            title:"Test",
            text:"Oh? What are you struggling with? Do you want to talk about it? What have you done to deal with your addiction? I feel like I have tried everything...",
          },
          ]}
        />
        <div
          className="input-div"
        >
          <Input
            className="message-input"
            placeholder="Type here..."
            multiline={true}
          />
          <Button
            className="message-button"
            text={"Send"}
            onClick={() => alert("Sending...")}
            title="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
