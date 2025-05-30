import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import { _backendAPI } from "../../APIs/api";

const NeedMessages = ({ itemID, itemCreator, currentUserEmail }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [userEmails, setUserEmails] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(_backendAPI, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ["websocket"],
      autoConnect: true,
      auth: {
        email: currentUserEmail,
      },
    });

    // Connection status handlers
    const onConnect = () => {
      setIsConnected(true);
      console.log("Socket connected");
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    const onAuthentication = ({ success, error }) => {
      if (success) {
        console.log("Socket authentication successful");
      } else {
        console.error("Socket authentication failed:", error);
      }
    };

    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);
    socketRef.current.on("authentication", onAuthentication);

    return () => {
      socketRef.current.off("connect", onConnect);
      socketRef.current.off("disconnect", onDisconnect);
      socketRef.current.off("authentication", onAuthentication);
      socketRef.current.disconnect();
    };
  }, [currentUserEmail]);

  // Fetch initial messages and setup socket listeners
  useEffect(() => {
    const fetchMessages = async () => {
      try {
       const response = await axios.get(
  `${_backendAPI}/api/messages/${itemID}`
);
        setAllMessages(response.data);
        updateUserEmailList(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    if (socketRef.current) {
      const handleReceiveMessage = (message) => {
        if (message.itemID === itemID) {
          setAllMessages((prev) => [...prev, message]);

          // If this is the active conversation, mark as read
          if (message.sender === selectedUserEmail) {
            socketRef.current.emit("markMessagesAsRead", {
              itemID,
              currentUser: currentUserEmail,
              otherUser: selectedUserEmail,
            });
          }

          // Update unread count if message is for current user
          if (message.receiver === currentUserEmail) {
            updateUserEmailList([...allMessages, message]);
          }
        }
      };

      const handleMessagesRead = ({ itemID, reader }) => {
        if (itemID === itemID && reader === selectedUserEmail) {
          setAllMessages((prev) =>
            prev.map((msg) =>
              msg.sender === reader &&
              msg.receiver === currentUserEmail &&
              !msg.read
                ? { ...msg, read: true }
                : msg
            )
          );
        }
      };

      socketRef.current.on("receiveMessage", handleReceiveMessage);
      socketRef.current.on("messagesRead", handleMessagesRead);

      return () => {
        socketRef.current.off("receiveMessage", handleReceiveMessage);
        socketRef.current.off("messagesRead", handleMessagesRead);
      };
    }
  }, [itemID, currentUserEmail, selectedUserEmail]);

  // Helper function to update user email list with unread counts
  const updateUserEmailList = (messages) => {
    const uniqueEmails = new Set();
    const unreadCounts = {};

    messages.forEach((msg) => {
      // For need creator, show all users who messaged
      if (currentUserEmail === itemCreator) {
        if (msg.sender !== itemCreator) {
          uniqueEmails.add(msg.sender);
          if (msg.receiver === currentUserEmail && !msg.read) {
            unreadCounts[msg.sender] = (unreadCounts[msg.sender] || 0) + 1;
          }
        }
      }
      // For other users, only show need creator
      else if (msg.sender === itemCreator || msg.receiver === itemCreator) {
        uniqueEmails.add(itemCreator);
        if (msg.receiver === currentUserEmail && !msg.read) {
          unreadCounts[itemCreator] = (unreadCounts[itemCreator] || 0) + 1;
        }
      }
    });

    const emailList = Array.from(uniqueEmails).map((email) => [
      email,
      unreadCounts[email] || 0,
    ]);

    setUserEmails(emailList);
  };

  // Handle user selection
  const handleSelectUser = (email) => {
    setSelectedUserEmail(email);

    // Mark messages as read when selecting a user (only if current user is the receiver)
    if (currentUserEmail !== email) {
      socketRef.current.emit("markMessagesAsRead", {
        itemID,
        currentUser: currentUserEmail,
        otherUser: email,
      });

      // Update local state to reflect read status
      setAllMessages((prev) =>
        prev.map((msg) =>
          msg.sender === email && msg.receiver === currentUserEmail && !msg.read
            ? { ...msg, read: true }
            : msg
        )
      );

      // Update unread counts
      updateUserEmailList(
        allMessages.map((msg) =>
          msg.sender === email && msg.receiver === currentUserEmail && !msg.read
            ? { ...msg, read: true }
            : msg
        )
      );
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, selectedUserEmail]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUserEmail) {
      const messageData = {
        itemID,
        sender: currentUserEmail,
        receiver: selectedUserEmail,
        content: newMessage,
        timestamp: new Date().toISOString(),
        read: false,
      };

      // Optimistic UI update
      setAllMessages((prev) => [...prev, messageData]);
      setNewMessage("");

      // Emit via socket with acknowledgment
      socketRef.current.emit("sendMessage", messageData, (ack) => {
        if (ack?.error) {
          console.error("Failed to send message:", ack.error);
          // Revert optimistic update if needed
          setAllMessages((prev) =>
            prev.filter((msg) => msg.timestamp !== messageData.timestamp)
          );
        }
      });
    }
  };

  // Filter messages for the selected conversation
  const filteredMessages = allMessages.filter(
    (msg) =>
      (msg.sender === selectedUserEmail && msg.receiver === currentUserEmail) ||
      (msg.sender === currentUserEmail && msg.receiver === selectedUserEmail)
  );

  return (
    <div className="mx-auto md:p-6">
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {!isConnected && (
        <div className="text-yellow-600 mb-2">
          Connection lost. Attempting to reconnect...
        </div>
      )}

      {currentUserEmail === itemCreator ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Users Who Messaged This Need
          </h3>
          <div className="flex flex-row gap-2 flex-wrap">
            {userEmails.map(([email, unreadCount]) => (
              <button
                key={email}
                className={`btn rounded-full px-4 py-2 flex items-center gap-2 ${
                  email === selectedUserEmail
                    ? "bg-blue-100 border border-blue-300"
                    : "bg-gray-50"
                }`}
                onClick={() => handleSelectUser(email)}
              >
                <span className="truncate max-w-[120px]">{email}</span>
                {unreadCount > 0 && (
                  <div className="px-2 text-xs rounded-full bg-red-400 text-white">
                    {unreadCount}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <button
            className={`btn ${
              selectedUserEmail === itemCreator ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleSelectUser(itemCreator)}
          >
            Chat with {itemCreator}
          </button>
        </div>
      )}

      {selectedUserEmail && (
        <div className="">
          <h3 className="text-lg font-semibold">
            Chat with {selectedUserEmail}
          </h3>
          <div className="bg-gray-100 border border-black/15 p-4 rounded-md h-92 overflow-y-auto">
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === currentUserEmail ? "chat-end" : "chat-start"
                } pt-4`}
              >
                <Link
                  to="/home/profile"
                  state={{ email: msg.sender }}
                  className="chat-image avatar tooltip"
                  data-tip={
                    msg.sender === currentUserEmail ? "You" : msg.sender
                  }
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src="/profilePic.jpg" />
                  </div>
                </Link>
                <div className="chat-header text-xs">
                  {msg.sender === currentUserEmail ? "You" : msg.sender}
                  <span className="text-xs opacity-50">
                    {" "}
                    {msg.timestamp
                      ? new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
                <div
                  className={`chat-bubble ${
                    !msg.read && msg.receiver === currentUserEmail
                      ? "bg-blue-100"
                      : msg.sender === currentUserEmail
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.content || "No message content"}
                </div>
                <div className="chat-footer opacity-50">
                  {msg.read
                    ? "Read"
                    : msg.sender === currentUserEmail
                    ? "Sent"
                    : "Received"}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 p-2 flex items-center md:p-4 border rounded-md">
            <input
              className="input outline-none border-none focus:outline-none focus:border-none focus:shadow-none shadow-none bg-transparent w-full"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              placeholder="Type a message..."
              disabled={!isConnected}
            />
            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={handleSendMessage}
              disabled={!isConnected || !newMessage.trim()}
            >
              <FaPaperPlane className="mr-2" /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeedMessages;
