import React from 'react';
import { Badge } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const ChatList = ({users, changeChat, currentChat}) => {
  return (
    <div className='chat-list'>
      {users.map((user, index) => {
        const isSelected = currentChat && currentChat.userId === user.userId;
        return (
          <button
            key={index}
            className={`chat-row ${isSelected ? "chat-selected" : ""}`}
            onClick={() => changeChat(user.userId)}
          >
            <Badge badgeContent={user.unreadMessages} max={999} overlap="circular" color="error" className="chat-badge">
              <span className="chat-icon story-icon">{user.image}</span>
            </Badge>
            <div className="chat-info">
              <h5 className="chat-name">{user.draft ? (user.alias + " [DRAFT]"): user.alias}</h5>
              <h6 className="chat-status">{user.latestMessage}</h6>
            </div>
          </button>
        )
      })}
    </div>
  );
};

export default ChatList;