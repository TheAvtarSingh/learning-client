import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

function DoubtSolverChat() { // Modified to accept solverEmail prop
    const { conversationId,solverEmail } = useParams();
    const [solverData, setSolverData] = useState({});
    const [senderId, setSenderId] = useState(localStorage.getItem("email") || "solverEmail22@gmail.com");
    const [receiverId, setReceiverId] = useState("singha2k2@gmail.com");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatbotMessagesRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000); // Set to 20 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [conversationId]);

    useEffect(() => {
        if (chatbotMessagesRef.current) {
            chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        setSenderId(solverEmail);
        const userEmail = localStorage.getItem("email");
        setReceiverId(userEmail || "singha2k2@gmail.com");
        fetchUser(solverEmail);
    }, [solverEmail]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`https://learning-server-olive.vercel.app/api/messages/${conversationId}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const fetchUser = async (email) => {
        try {
            const response = await axios.get(`https://learning-server-olive.vercel.app/api/findUserInfo?email=${email}`);
            
            setSolverData(response.data.user);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async (event) => {
        event.preventDefault();
        
        const newMessage = {
            conversationId: conversationId,
            senderId: senderId,
            receiverId: receiverId,
            message: input
        };

        console.log(JSON.stringify(newMessage));

        setMessages([...messages, { ...newMessage, senderId }]);
        setInput('');

        try {
            await axios.post("https://learning-server-olive.vercel.app/api/messages", newMessage);
            fetchMessages(); // Fetch messages after sending a new one
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { ...newMessage, message: "Failed to send message.", senderId }]);
        }
    };
  return (
    <div className="chatbot-container">
            <div className="chatbot">
                <div className="d-flex justify-content-center align-items-center py-2">
                    <img className='px-2' style={{ width: "50px", borderRadius: "50%" }} src='/images/minions/minions.jpg' alt="Avatar" />
                    <span> Chatting with {solverData.name ? solverData.name : "Solver Name"} &#10004;</span>
                </div>
                <div className="chatbot-messages" ref={chatbotMessagesRef}>
                    {messages.map((message, index) => (
                        <div className={message.senderId === senderId ? 'message right' : 'message left'} key={index}>
                            <div className={message.senderId === senderId ? 'bubble-green' : 'bubble-blue'}>
                                {message.message.split('\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="chatbot-input">
                    <input type="text" placeholder="Type your message..." value={input} onChange={handleChange} />
                    <button className="send-button" type="submit" >Send</button>
                    <button className="refresh-button" type="button" onClick={fetchMessages}>Refresh</button>
                </form>
            </div>
        </div>
  )
}

export default DoubtSolverChat;
