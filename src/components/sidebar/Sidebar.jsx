import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { modes } from "../../data/sidebarData";

import "./Sidebar.css";
import API_URL from "../../api";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  setCurrentPage,
  refreshChats,
  setActiveConversationId,
  activeConversationId,
  setMessages,
  activeMode,
  setActiveMode,
}) {

  const navigate = useNavigate();

//   const [activeMode, setActiveMode] = useState(1);

  const [conversations, setConversations] = useState([]);

  const token = localStorage.getItem("token");

  const deleteConversation = async (conversationId) => {

  try {

    await fetch(
      `${API_URL}/conversation/${conversationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // remove from sidebar instantly
    setConversations(prev =>
      prev.filter(c => c.id !== conversationId)
    );

    // if opened conversation deleted
    if (activeConversationId === conversationId) {

      // clear selected conversation
      setActiveConversationId(null);

      // clear frontend chat instantly
      setMessages([
        {
          role: "ai",
          text: "Hello 👋 I am AuLi AI. What do you want to learn today?",
        },
      ]);

      // optional:
      setCurrentPage("chat");
    }

  } catch (err) {

    console.error("Delete failed", err);

  }

};
  // =========================
  // FETCH CONVERSATIONS
  // =========================

  useEffect(() => {

    fetch(`${API_URL}/conversations`, {

      headers: {
        Authorization: `Bearer ${token}`
      }

    })

    .then((res) => res.json())

    .then((data) => {

      setConversations(data);

    })

    .catch((err) => {

      console.error(
        "Conversation fetch failed",
        err
      );

    });

  }, [refreshChats]);

  return (

    <div
      className={`sidebar ${
        sidebarOpen
          ? "open"
          : "collapsed"
      }`}
    >

      {/* HEADER */}

      <div className="sidebar-header">

        {sidebarOpen && (

          <div>

            <h1 className="logo">
              AuLi
            </h1>

            <p className="tagline">
              AI Learning Workspace
            </p>

          </div>

        )}

        <button
          className="collapse-btn"
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        >
          ☰
        </button>

      </div>

      {/* BODY */}

      <div className="sidebar-body">

        {/* MODES */}

        <div className="modes">

          {modes.map((mode) => (

            <button
              key={mode.id}
              className={
                activeMode === mode.id
                  ? "mode-btn active"
                  : "mode-btn"
              }
              onClick={() => setActiveMode(mode.id)}
            >

              <span className="mode-icon">
                {mode.icon}
              </span>

              {sidebarOpen && (
                <span>{mode.name}</span>
              )}

            </button>

          ))}

        </div>

        {/* REAL CONVERSATIONS */}

        <div className="subjects">

          {conversations.map((conversation) => (

            <div
  key={conversation.id}
  className="subject-folder"
  data-label={conversation.title}
>

  <div
    className="conversation-main"
    onClick={() => {

      setCurrentPage("chat");

      setActiveConversationId(
        conversation.id
      );

    }}
  >

    <span className="folder-icon">
      💬
    </span>

    {sidebarOpen && (

      <span className="conversation-title">
        {conversation.title}
      </span>

    )}

  </div>

  <button
    className="delete-chat-btn"
    onClick={() =>
      deleteConversation(conversation.id)
    }
  >
    ✕
  </button>

</div>
          ))}

        </div>

      </div>

      {/* FOOTER */}

      <div className="sidebar-footer">

        <button
          className="progress-btn"
          onClick={() => setCurrentPage("profile")}
        >

          👤

          {sidebarOpen && (
            <span>
              Progress & Profile
            </span>
          )}

        </button>

      </div>

    </div>

  );
}

export default Sidebar;