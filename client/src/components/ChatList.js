import React from 'react';

const ChatList = ({users}) => {


  return (
    <div>
      {users.map((user) => (
        <div className="chat-row">
          <span className="chat-icon story-icon">{user.image}</span>
          <div className="chat-info">
            <h5 className="chat-name">{user.alias}</h5>
            <h6 className="chat-status">Say Hello!</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
