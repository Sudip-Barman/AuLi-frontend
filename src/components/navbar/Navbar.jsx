import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Navbar.css";

function Navbar({ 
    sidebarOpen, 
    setSidebarOpen, 
    onNewChat,
    setCurrentPage,
    lightMode,
    setLightMode
 }) {

  const [settingsOpen, setSettingsOpen] = useState(false);

  const settingsRef = useRef(null);
  const token = localStorage.getItem("token");
    const navigate = useNavigate();
  const handleToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  // close popup when clicking outside
useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target)
    ) {
      setSettingsOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };

}, []);

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <div>

          <h2 className="navbar-title">
            Welcome Back 👋
          </h2>

          <div className="brand">

            <div className="brand-mark">S</div>

            <div className="brand-text">
              <span className="brand-name">AuLi</span>

              <span className="brand-tag">
                AI Learning Workspace
              </span>
            </div>

          </div>

          <p className="navbar-subtitle">
            Continue learning with AuLi AI
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {!token ? (

        <button
            className="login-btn"
            onClick={() => navigate("/login")}
        >
            Login
        </button>

        ) : (

        <button className="icon-btn">
            🔔
        </button>

        )}

        {/* SETTINGS */}
<div className="settings-wrapper" ref={settingsRef}>

  <button
    className="icon-btn"
    onClick={() => setSettingsOpen(prev => !prev)}
  >
    ⚙️
  </button>

  {settingsOpen && (

    <div className="settings-popup">

      <div className="settings-header">
        Settings
      </div>

        <button
        className="settings-item"
        onClick={() => {

            setLightMode(!lightMode);

        }}
        >
        {lightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        <button
        className="settings-item"
        onClick={() => {

            setSettingsOpen(false);

            setCurrentPage("profile");

        }}
        >
        👤 Profile
        </button>

      <button
        className="settings-item"
        onClick={() => {
          console.log("Delete All Chats");
        }}
      >
        🗑️ Delete All Chats
      </button>

      <button
        className="settings-item"
        onClick={() => {
          console.log("Settings Clicked");
        }}
      >
        ⚡ App Settings
      </button>

                {token && (

        <button
            className="settings-item logout"
            onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/";
            }}
        >
            🚪 Logout
        </button>

        )}

    </div>

  )}

</div>

        {/* TOGGLE BUTTON */}
        <button
          className="icon-btn menu-btn"
          onClick={handleToggle}
        >
          {sidebarOpen ? "⟨⟨" : "⟩⟩"}
        </button>

        <button
          className="nav-btn"
          onClick={onNewChat}
        >
          New Chat
        </button>

      </div>

    </div>
  );
}

export default Navbar;