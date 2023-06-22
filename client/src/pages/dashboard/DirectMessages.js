import "react-chat-elements/dist/main.css";
import { Button, Input, MessageList } from "react-chat-elements";
import {
  GiButterfly,
  GiDeer,
  GiDolphin,
  GiElephant,
  GiTortoise,
} from "react-icons/gi";
import ChatList from "../../components/ChatList";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import queryString from "query-string";
import { RiUserFill } from "react-icons/ri";

const iconMap = {
  GiTortoise: <GiTortoise />,
  GiDeer: <GiDeer />,
  RiUserFill: <RiUserFill />,
  GiButterfly: <GiButterfly />,
  GiDolphin: <GiDolphin />,
  GiElephant: <GiElephant />,
  AiOutlineUser: <RiUserFill />,
};

const DirectMessages = () => {
  const {
    socket,
    getChatRooms,
    currentMessages,
    getCurrentMessages,
    user,
    currentChat,
    currentChats,
    handleChange,
    displayGreeting,
  } = useAppContext();

  const messagesEndRef = useRef(null);

  const [chatInput, setChatInput] = useState("");

  const location = useLocation();

  useEffect(() => {
    getChatRooms();

    if (location.search) {
      const parsed = queryString.parse(location.search);
      if (parsed.recipient && parsed.alias && parsed.icon) {
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
        name: "currentChats",
        value: [],
      });

      handleChange({
        name: "currentMessages",
        value: [],
      });

      handleChange({
        name: "displayGreeting",
        value: true,
      });
    };
  }, []);

  useEffect(() => {
    if (currentChat) {
      if (currentChat.draft) {
        const nonDraftChats = currentChats.filter(
          (chat) => chat.draft !== true
        );
        const existingChat = nonDraftChats.find(
          (chat) => ((chat.userId === currentChat.userId) && !chat.draft)
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
        }
      }
      handleChange({
        name: "displayGreeting",
        value: false,
      });
    }
  }, [currentChats, currentChat]);


  useEffect(() => {
    if (currentMessages && currentMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentMessages]);


  const changeChat = (recipient) => {
    const chat = currentChats.find((chat) => chat.userId === recipient && !chat.draft);
    if (
      chat &&
      ((currentChat && currentChat.userId !== chat.userId) || (!currentChat || currentChat.draft))
    ) {
      console.log("Changing chat");
      // TODO: change chat color etc to indicate active chat

      handleChange({
        name: "currentChat",
        value: chat,
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

  // TODO: Change greeting
  // TODO: high risk/sensitive user group, chats will NEED to be moderated or filtered somehow to keep users safe
  // TODO: add blocking capabilities, report capabilities, make users agree to terms / remind them of risks of chatting

  return (
    <div className="messages-div">
      <div className="chat-panel">
        {currentChats.length === 0 ? (
          <div className="greeting-div">
            <p className="greeting">
              You don't have any chats yet! Create a new chat!
            </p>
          </div>
        ) : null}
        <ChatList users={currentChats} changeChat={changeChat} />
      </div>
      <div className="message-panel">
        {displayGreeting ? (
          <div className="greeting-div">
            <h1 className="greeting">Welcome to the chat!</h1>
            <p className="greeting">
              Select a user to start chatting, or create a new chat by clicking
              the chat button on a story or log!
            </p>
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
        <div className="input-div">
          <Input
            className="message-input"
            placeholder="Type here..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            multiline={true}
          />
          <Button
            className="message-button"
            text={"Send"}
            onClick={() => sendMessage()}
            title="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
