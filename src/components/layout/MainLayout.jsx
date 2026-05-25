import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import "./MainLayout.css";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import NetworkStatus from "../network/NetworkStatus";
import useChat from "../../hooks/useChat";
import ProfilePage from "../../pages/ProfilePage";
function MainLayout() {
  const [currentPage, setCurrentPage] = useState("chat");
  const [showUploads, setShowUploads] = useState(false);
  const [copied, setCopied] = useState(false);
  const uploadRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [pdfUploading, setPdfUploading] = useState(false);
  const chatEndRef = useRef(null);
  const sidebarRef = useRef(null);
  const [refreshChats, setRefreshChats] = useState(false);
  const [activeConversationId, setActiveConversationId] =
  useState(null);
  const [testType, setTestType] =
useState("practice");
  const [activeMode, setActiveMode] =
  useState("study");
  const [lightMode, setLightMode] = useState(() => {

  return localStorage.getItem("theme") === "light";

});
  {/* this will help on off from outside */}
// if (!localStorage.getItem("token")) {
//   window.dispatchEvent(new Event("auth:logout"));

// }
  useEffect(() => {

  const handleClickOutside = (e) => {
    
    if (
      uploadRef.current &&
      !uploadRef.current.contains(e.target)
    ) {
      setShowUploads(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };

}, []);

useEffect(() => {

  localStorage.setItem(
    "theme",
    lightMode ? "light" : "dark"
  );

}, [lightMode]);
 /* pdf handler */
// const handlePdfUpload = async (e) => {
//   const file = e.target.files[0];

//   if (!file) return;

//   setSelectedPdf(file); // 👈 show instantly in UI
//   setShowUploads(false);

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     // show uploading state
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         text: `📄 Uploading ${file.name}...`,
//       },
//     ]);

//     const res = await fetch("http://127.0.0.1:8000/upload-pdf", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "ai",
//         text: `📄 PDF ready!\n\n${data.text.slice(0, 1500)}`,
//       },
//     ]);

//   } catch (err) {
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "ai",
//         text: "⚠️ PDF upload failed",
//       },
//     ]);
//   }
// };
  /* CHAT HOOK */

const {
  messages,
  input,
  setInput,
  loading,
  sendMessage,
  setMessages,
  selectedPdf,
  setSelectedPdf,

} = useChat(
    setRefreshChats,
  activeConversationId
);
  /* AUTO SCROLL */

        useEffect(() => {

        setTimeout(() => {

            chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
            });

        }, 100);

        }, [messages, loading]);

const handleCopy = async (text) => {

  try {

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (err) {

    console.error("Copy failed");

  }

};
  return (
      <>

    <NetworkStatus />

    <div className={`layout ${lightMode ? "light-mode" : ""}`}>

      {
      sidebarOpen &&
      window.innerWidth <= 768 && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )
      }

      <div ref={sidebarRef}>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setCurrentPage={setCurrentPage}
          refreshChats={refreshChats}
          setActiveConversationId={setActiveConversationId}
          activeConversationId={activeConversationId}
          setMessages={setMessages}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
        />
      </div>

      <div className="main">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setCurrentPage={setCurrentPage}
          lightMode={lightMode}
          setLightMode={setLightMode}
        />


        <div className="content">
        {currentPage === "chat" ? (
          <div className="chat-wrapper">

            {/* CHAT AREA */}
            <div className="chat-area">

            {messages.map((msg, index) => (
                <div
                key={index}
                className={`message ${
                    msg.role === "ai" ? "ai-message" : "user-message"
                }`}
                >
                
                   <>
                    {msg.pdf && (
                    <div className="message-pdf">
                        📄 {msg.pdf.name}
                    </div>
                    )}

                    {msg.text && (

  <ReactMarkdown
  components={{

 code({ children, className }) {

  const codeText = String(children).replace(/\n$/, "");

  const isCodeBlock = className?.includes("language-");

  if (!isCodeBlock) {
    return <code>{children}</code>;
  }

  return (

    <div className="code-block-wrapper">

      <button
        className="copy-code-btn"
        onClick={() => handleCopy(codeText)}
      >
        Copy
      </button>

      <pre>
        <code>{codeText}</code>
      </pre>

    </div>
  );
},

  }}
>
  {msg.text}
</ReactMarkdown>

)}
                    </>
                
                </div>
            ))}

            {loading && (
                <div className="message ai-message">
                Thinking...
                </div>
            )}

            <div ref={chatEndRef} />

            </div>
            {/* INPUT SECTION */}
            {copied && (
                <div className="copy-toast">
                    Copied successfully ✓
                </div>
                )}
            <div className="chat-input-container">
                
              {/* UPLOAD MENU */}
        <div className="upload-popup-wrapper" ref={uploadRef}>
              {showUploads && (

                <div className="upload-popup">
                    <label className="upload-option">
                    📄 Upload PDF

                    <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {

                            // ONLY STORE FILE
                            setSelectedPdf(file);

                            // close popup
                            setShowUploads(false);
                        }
                        }}
                    />
                    </label>

                  <button className="upload-option">
                    🖼️ Upload Image
                  </button>

                </div>

              )}
</div>
              {/*INPUT of pdf*/}

                {selectedPdf && (
                <div className="attached-file">

                    <div className="attached-file-info">
                    📄 {selectedPdf.name}
                    </div>

                    <button
                    className="remove-file-btn"
                    onClick={() => setSelectedPdf(null)}
                    >
                    ✕
                    </button>

                </div>
                )}
                

              {/* INPUT BOX */}
              <div className="chat-input-box">

                <button
                  className="attach-btn"
                  onClick={() => setShowUploads(!showUploads)}
                >
                  +
                </button>

                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />

                <button
                  className="send-btn"
                  onClick={sendMessage}
                >
                  Send
                </button>

              </div>

              <p className="chat-disclaimer">
                AuLi AI can make mistakes.
                Verify important information.
              </p>

            </div>

          </div>
    ) : (

  <ProfilePage />

)}
        </div>
                  
      </div>

    </div>
</>
  );
}

export default MainLayout;