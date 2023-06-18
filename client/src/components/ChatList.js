import React from 'react';

const ChatList = ({users, changeChat}) => {
  return (
    <div className='chat-list'>
      {users.map((user, index) => {
        return (
          <button
            key={index}
            className="chat-row"
            onClick={() => changeChat(user.userId)}
          >
            <span className="chat-icon story-icon">{user.image}</span>
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