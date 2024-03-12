import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // Import your CSS file for styling

const API_KEY = "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";

function Chatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT.",
            sender: "ChatGPT"
        }
    ]);

    const chatbotMessagesRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the messages container when messages change
        if (chatbotMessagesRef.current) {
            chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async (event) => {
        event.preventDefault();
        const newMessage = {
            message: input,
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setInput('');

        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return (
                { role: role, content: messageObject.message }
            );
        });

        const systemMessage = {
            role: "system",
            content: "Explain all concepts as if I am 10 years old."
        };

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setMessages([
                ...chatMessages,
                {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }
            ]);
        });
    }

    return (
        <div className="chatbot-container">
            <div className="chatbot">
                <div className="chatbot-messages" ref={chatbotMessagesRef}>
                    {messages.map((message, index) => {
                        return (
                            <div className={message.sender === "ChatGPT" ? 'assistant-message' : 'user-message'} key={index}>
                                {message.message.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="chatbot-input">
                    <input type="text" placeholder="Type your message..." value={input} onChange={handleChange} />
                    <button className="send-button" type="submit" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
