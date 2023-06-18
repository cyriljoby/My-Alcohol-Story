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
    chats,
    getChatRooms,
    currentMessages,
    getCurrentMessages,
    user,
  } = useAppContext();

  const messagesEndRef = useRef(null);

  const [chatInput, setChatInput] = useState("");

  const [localCurrentMessages, setLocalCurrentMessages] = useState([]);

  const [localCurrentChats, setLocalCurrentChats] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);

  const [displayGreeting, setDisplayGreeting] = useState(true);

  const location = useLocation();

  useEffect(() => {
    let handleMessageReceived;
    let handleNewChatReceived;

    const createSocketListeners = () => {
      console.log("Creating socket listeners");

      handleMessageReceived = ({ message, sender }) => {
        if (message.chat === currentChat.chatRoomId) {
          const formattedMessage = {
            position: sender._id === user._id ? "right" : "left",
            type: "text",
            title: sender.alias,
            text: message.content,
          };
          setLocalCurrentMessages([...localCurrentMessages, formattedMessage]);
        }

        const updatedChats = localCurrentChats.map((chat) => {
          if (chat.chatRoomId === message.chat) {
            return {
              ...chat,
              latestMessage: message.content,
            };
          } else {
            return chat;
          }
        });
        setLocalCurrentChats(updatedChats);
      };

      handleNewChatReceived = ({ chat, users }) => {
        console.log("New chat received");

        const filteredUsers = users.filter((filterUser) => {
          return filterUser._id !== user._id;
        });

        const formattedChat = {
          image: iconMap[filteredUsers[0].image],
          alias: filteredUsers[0].alias,
          userId: filteredUsers[0]._id,
          latestMessage: chat.latestMessage,
          draft: false,
          chatRoomId: chat._id,
        };

        if (
          currentChat &&
          currentChat.draft &&
          currentChat.userId === formattedChat.userId
        ) {
          const filteredChats = localCurrentChats.filter(
            (filterChat) => filterChat.draft !== true
          );
          setLocalCurrentChats([formattedChat, ...filteredChats]);
          // setTimeout(() => {
          //   console.log("Changing chat");
          //   changeChat(formattedChat.userId);
          // }, 1000);
        } else if (currentChat && currentChat.userId !== formattedChat.userId) {
          const filteredChats = localCurrentChats.filter(
            (filterChat) => filterChat.userId !== currentChat.userId
          );
          setLocalCurrentChats([currentChat, formattedChat, ...filteredChats]);
        } else if (!currentChat) {
          setLocalCurrentChats(
            [formattedChat, ...localCurrentChats].filter(
              (value) => Object.keys(value).length !== 0
            )
          );
        }
      };

      socket.on("new-message", handleMessageReceived);
      socket.on("new-chat", handleNewChatReceived);
    };

    if (socket && socket.connected) {
      createSocketListeners();
    } else {
      const socketInterval = setInterval(() => {
        if (socket && socket.connected) {
          clearInterval(socketInterval);
          createSocketListeners();
        }
      }, 5000);
    }

    return () => {
      if (socket && socket.connected) {
        socket.off("new-message", handleMessageReceived);
        socket.off("new-chat", handleNewChatReceived);
      }
    };
  }, [currentChat, localCurrentChats, localCurrentMessages]);

  const formatChats = () => {
    if (chats && chats.length > 0) {
      const formattedChats = chats.map((chat) => {
        const filteredUsers = chat.users.filter(
          (filterUser) => filterUser._id !== user._id
        );
        return {
          image: iconMap[filteredUsers[0].image],
          alias: filteredUsers[0].alias,
          userId: filteredUsers[0]._id,
          latestMessage: chat.latestMessage,
          draft: false,
          chatRoomId: chat._id,
        };
      });

      if (currentChat && currentChat.draft) {
        const chatsWithCurrentRecipient = formattedChats.filter(
          (chat) => chat.userId === currentChat.userId
        );

        if (chatsWithCurrentRecipient.length > 0) {
          const nonDraftChats = formattedChats.filter(
            (chat) => chat.userId !== currentChat.userId
          );
          const existingChat = nonDraftChats.find(
            (chat) => chat.userId === currentChat.userId
          );
          setLocalCurrentChats([existingChat, ...nonDraftChats]);
          setCurrentChat(existingChat);
        } else {
          setLocalCurrentChats([currentChat, ...formattedChats]);
        }
      } else {
        setLocalCurrentChats(formattedChats);
      }
    }
  };

  useEffect(() => {
    getChatRooms();
    formatChats();

    if (location.search) {
      const parsed = queryString.parse(location.search);
      if (parsed.recipient && parsed.alias && parsed.icon) {
        const chatDraft = {
          image: iconMap[parsed.icon],
          alias: parsed.alias,
          userId: parsed.recipient,
          draft: true,
        };

        const cleanedChats = localCurrentChats.filter((chat) => !chat.draft);

        setDisplayGreeting(false);
        setLocalCurrentChats([chatDraft, ...cleanedChats]);
        setCurrentChat(chatDraft);
      }
    }

    return () => {
      setLocalCurrentChats([]);
      setLocalCurrentMessages([]);
      setCurrentChat(null);
      setDisplayGreeting(true);
    };
  }, []);

  useEffect(() => {
    formatChats();
  }, [chats]);

  useEffect(() => {
    if (currentChat) {
      if (currentChat.draft) {
        const nonDraftChats = localCurrentChats.filter(
          (chat) => chat.draft !== true
        );
        const existingChat = nonDraftChats.find(
          (chat) => ((chat.userId === currentChat.userId) && !chat.draft)
        );

        if (existingChat) {
          setLocalCurrentChats(nonDraftChats);
          setCurrentChat(existingChat);
          changeChat(existingChat.userId);
        }
      }
      setDisplayGreeting(false);
    }
  }, [localCurrentChats, currentChat]);

  useEffect(() => {
    if (currentChat && currentMessages && currentMessages.length > 0) {
      const formattedMessages = currentMessages.map((message) => {
        return {
          position: message.sender._id === user._id ? "right" : "left",
          type: "text",
          title: message.sender.alias,
          text: message.content,
        };
      });
      setDisplayGreeting(false);
      setLocalCurrentMessages(formattedMessages);
    }

    if (currentMessages && currentMessages.length === 0) {
      setLocalCurrentMessages([]);
      setDisplayGreeting(true);
    }
  }, [currentMessages]);

  useEffect(() => {
    if (localCurrentMessages && localCurrentMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [localCurrentMessages]);

  const changeChat = (recipient) => {
    const chat = localCurrentChats.find((chat) => chat.userId === recipient && !chat.draft);
    if (
      chat &&
      ((currentChat && currentChat.userId !== chat.userId) || (!currentChat || currentChat.draft))
    ) {
      console.log("Changing chat");
      // TODO: change chat color etc to indicate active chat
      setDisplayGreeting(false);
      setCurrentChat(chat);
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
        {localCurrentChats.length === 0 ? (
          <div className="greeting-div">
            <p className="greeting">
              You don't have any chats yet! Create a new chat!
            </p>
          </div>
        ) : null}
        <ChatList users={localCurrentChats} changeChat={changeChat} />
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
            dataSource={localCurrentMessages}
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
