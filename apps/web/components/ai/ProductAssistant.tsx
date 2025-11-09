import { useState } from 'react';

export function AIProductAssistant() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleUserMessage = async (message) => {
    setIsTyping(true);
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { 
      message, 
      role: 'user', 
      timestamp: Date.now() 
    }]);
    
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          chatHistory,
          customerContext: getCustomerContext()
        })
      });
      
      const aiResponse = await response.json();
      
      setChatHistory(prev => [...prev, {
        message: aiResponse.response,
        role: 'assistant',
        timestamp: Date.now(),
        recommendations: aiResponse.recommendations
      }]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-assistant-container">
      <ChatMessages messages={chatHistory} />
      <ChatInput onSendMessage={handleUserMessage} />
      {isTyping && <TypingIndicator />}
    </div>
  );
}

// Helper function (you'll need to implement this based on your auth/customer system)
function getCustomerContext() {
  return {
    userId: 'current-user-id', // Replace with actual user ID
    sessionId: 'current-session',
    preferences: {} // Add customer preferences
  };
}

// Placeholder components - you'll need to create these
function ChatMessages({ messages }) {
  return <div>Chat messages will appear here</div>;
}

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about products..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

function TypingIndicator() {
  return <div>AI is typing...</div>;
}
