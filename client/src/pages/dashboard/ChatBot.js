
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { userMessage: '', botReply: "Hey there! I'm  your friendly chatbot here to lend a helping hand when it comes to alcohol-related topics. Whether you have questions about alcohol addiction, seeking advice on cutting back, or just need someone to talk to, I'm here for you. Together, we can explore strategies, provide support, and share valuable information to help you navigate your journey towards a healthier relationship with alcohol. Feel free to ask me anything, and let's start the conversation! " },
  ]);
  const sendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Send user message to OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: userMessage,
      max_tokens: 120, // Adjust the token limit based on your requirements
      temperature: 0.7, // Adjust the temperature based on your requirements
      model: 'text-davinci-003'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ***REMOVED***', // Replace with your actual API key
      },
    });

    const botReply = response.data.choices[0]?.text.trim();

    // Update chat history
    setChatHistory(prevChat => [
      ...prevChat,
      { userMessage, botReply },
    ]);

    setUserMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div className="message-container" key={index}>
            <div className="user-message">
              <p>{chat.userMessage}</p>
            </div>
            <div className="bot-message">
              <p>{chat.botReply}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
