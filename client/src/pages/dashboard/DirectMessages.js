import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { FiSend } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import {
  GiButterfly,
  GiDeer,
  GiDolphin,
  GiElephant,
  GiTortoise,
} from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

import ChatList from "../../components/ChatList";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import queryString from "query-string";
import Popup from "reactjs-popup";
import { TextField, Button } from "@mui/material";

const iconMap = {
  GiTortoise: <GiTortoise />,
  GiDeer: <GiDeer />,
  RiUserFill: <RiUserFill />,
  GiButterfly: <GiButterfly />,
  GiDolphin: <GiDolphin />,
  GiElephant: <GiElephant />,
  AiOutlineUser: <AiOutlineUser />,
};

const DirectMessages = () => {
  const {
    socket,
    currentMessages,
    getCurrentMessages,
    currentChat,
    currentChats,
    handleChange,
    displayGreeting,
    showFilteredPopup,
    readChat,
  } = useAppContext();

  const messagesEndRef = useRef(null);

  const [chatInput, setChatInput] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      const parsed = queryString.parse(location.search);
      if (parsed.recipient && parsed.alias && parsed.icon) {
        if (currentChats.length > 0) {
          const nonDraftChats = currentChats.filter(
            (chat) => chat.draft !== true
          );

          const existingChat = nonDraftChats.find(
            (chat) => chat.userId === parsed.recipient
          );

          if (existingChat) {
            handleChange({
              name: "currentChats",
              value: nonDraftChats,
            });

            handleChange({
              name: "currentChat",
              value: existingChat,
            });

            changeChat(existingChat.userId);

            return;
          }
        }

        const chatDraft = {
          image: iconMap[parsed.icon],
          alias: parsed.alias,
          userId: parsed.recipient,
          draft: true,
        };

        const cleanedChats = currentChats.filter((chat) => !chat.draft);

        handleChange({
          name: "displayGreeting",
          value: false,
        });

        handleChange({
          name: "currentChat",
          value: chatDraft,
        });

        handleChange({
          name: "currentChats",
          value: [chatDraft, ...cleanedChats],
        });
      }
    }

    return () => {
      handleChange({
        name: "currentChat",
        value: null,
      });

      handleChange({
        name: "currentMessages",
        value: [],
      });

      handleChange({
        name: "displayGreeting",
        value: true,
      });

      handleChange({
        name: "currentChats",
        value: [...currentChats.filter((chat) => !chat.draft)],
      });
    };
  }, []);

  useEffect(() => {
    if (currentChat) {
      handleChange({
        name: "displayGreeting",
        value: false,
      });
    }
  }, [currentChat]);

  useEffect(() => {
    if (currentMessages && currentMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);

  const changeChat = (recipient) => {
    const chat = currentChats.find(
      (chat) => chat.userId === recipient && !chat.draft
    );
    if (
      chat &&
      ((currentChat && currentChat.userId !== chat.userId) ||
        !currentChat ||
        currentChat.draft)
    ) {
      console.log("Changing chat");

      readChat({ chatRoomId: chat.chatRoomId });

      handleChange({
        name: "currentChat",
        value: chat,
      });

      handleChange({
        name: "currentChats",
        value: [...currentChats.filter((chat) => !chat.draft)],
      });

      handleChange({
        name: "displayGreeting",
        value: false,
      });

      getCurrentMessages({
        recipient: chat.userId,
      });
    }
  };

  const sendMessage = () => {
    if (currentChat === null || displayGreeting) {
      return;
    }

    if (socket && socket.connected) {
      if (chatInput && chatInput.length > 0) {
        if (socket && socket.connected) {
          if (currentChat.draft) {
            const chatRoom = {
              recipient: currentChat.userId,
              initialMessage: chatInput,
            };

            console.log("Creating chat");

            socket.emit("create-chat", chatRoom);
            setChatInput("");

            // TODO: handle and display errors creating a chat
          } else {
            const chatRoomId = currentChat.chatRoomId;

            console.log("Sending message");

            socket.emit("create-message", { chatRoomId, content: chatInput });
            setChatInput("");

            // TODO: handle and display errors creating messages
          }
        }
      }
    }
  };

  const closePop = () => {
    handleChange({
      name: "showFilteredPopup",
      value: false,
    });
  };

  function RenderPopup() {
    if (showFilteredPopup) {
      return (
        <Popup disableBackdropClick backdrop="static" open={true} modal nested>
          {(close) => (
            <div
              className="modal"
              style={{
                maxWidth: "90vw",
                background: "#ffffff",
                padding: "2rem",
              }}
            >
              <button
                className="close"
                onClick={() => {
                  close();
                  closePop();
                }}
                style={{ fontSize: "1.5rem" }}
              >
                &times;
              </button>
              {/* <h3 className="header"> Warning </h3> */}
              <div className="content">
                {" "}
                Your message has potentially went against our community
                guidelines. While sending messages to other users, please make
                sure you <span>DO NOT</span>:
                <ul
                  style={{
                    listStyle: "inside",
                    marginLeft: "1rem",
                    marginTop: "0.5rem",
                    textTransform: "capitalize",
                  }}
                >
                  <li>insult or be toxic towards others</li>
                  <li>send obscene or sexually explicit messages</li>
                  <li>send threatening messages</li>
                  <li>glorify alcohol and its effects</li>
                  <li>encourage or promote self harm</li>
                  <li>post any personal identification information</li>
                </ul>
                If you are feeling the urge to harm yourself or need any other
                assistance, please visit our{" "}
                <a className="resources-page" href="/resources">
                  resources
                </a>{" "}
                page.
              </div>
            </div>
          )}
        </Popup>
      );
    } else {
      return null;
    }
  }

  const changeInput = (e) => {
    console.log("CHANGING INPUT");
    console.log(e.target.value);
    setChatInput(e.target.value);
  };

  // TODO: Change greeting
  // TODO: high risk/sensitive user group, chats will NEED to be moderated or filtered somehow to keep users safe
  // TODO: add blocking capabilities, report capabilities, make users agree to terms / remind them of risks of chatting

  return (
    <div className="messages-div">
      <RenderPopup />
      <div className="chat-panel">
        {currentChats.length === 0 ? (
          <div className="greeting-div">
            <p className="greeting">
              You don't have any chats yet! Create a new chat!
            </p>
          </div>
        ) : null}
        <ChatList
          users={currentChats}
          currentChat={currentChat}
          changeChat={changeChat}
        />
      </div>
      <div className="message-panel">
        {displayGreeting ? (
          <div className="greeting-div">
            <h1 className="messaging-title">Direct Messages</h1>
            <span className="greeting-icon">
              <BiMessage />
            </span>
            <p className="greeting">
              Start a more personal and direct conversation from a story or log!
              Select an existing chat, or create a new one from a story or log.
            </p>
            {/* <p className="notice-greeting">
              Note: Direct messages are filtered to reduce potentially harmful
              messages. Please be respectful towards others.
            </p> */}
          </div>
        ) : (
          <MessageList
            className="message-list"
            lockable={false}
            toBottomHeight={"100%"}
            dataSource={currentMessages}
            referance={messagesEndRef}
          />
        )}

        {displayGreeting ? (
          <div></div>
        ) : (
          <div className="input-div">
            <TextField
              className="message-input"
              hiddenLabel
              value={chatInput}
              onChange={changeInput}
              contenteditable="true"
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
              color="success"
              placeholder="Message..."
              id="filled-basic"
              size="small"
              variant="filled"
              error={showFilteredPopup}
              helperText={showFilteredPopup ? "Text filtered" : null}
            />
            <Button
              className="message-button"
              onClick={() => sendMessage()}
              variant="contained"
            >
              <FiSend />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectMessages;

