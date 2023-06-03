import Wrapper from "../../assets/wrappers/DashboardFormPage";
import "react-chat-elements/dist/main.css"
import {Button, Input, MessageBox, MessageList} from "react-chat-elements";
import {GiDeer} from "react-icons/gi";
import ChatList from "../../components/ChatList"
import { io } from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import {useAppContext} from "../../context/appContext";

const DirectMessages = () => {
  const { socket } = useAppContext();

  const createSocketListeners = () => {
    console.log("Creating socket listeners");
  }

  useEffect(() => {
    if (socket && socket.connected) {
      createSocketListeners();
    } else {
      const socketInterval = setInterval(() => {
        if (socket && socket.connected) {
          clearInterval(socketInterval);
          createSocketListeners();
        }
      }, 100);
    }

    return () => {
      if (socket && socket.connected) {
        // Clean up or perform any necessary actions when the component unmounts
      }
    }
  }, [socket]);

  const sendMessage = (data) => {
    if (socket && socket.connected) {
      // socket.emit("create-message", {
      //   message: data.message,
      // });
    }
  }

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
