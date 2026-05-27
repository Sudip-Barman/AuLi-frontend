import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="bg-glow bg-glow-top" />
      <div className="bg-glow bg-glow-bottom" />

      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="logo">AuLi</div>

        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn" onClick={() => navigate("/signup")}>Signup</button>
          <button className="try-btn" onClick={() => navigate("/chat")}>Try AuLi</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge">
          Offline-First AI Workspace
        </div>

        <h1 className="hero-title">
          Learn With AI.
          <br />
          Store On Your Device.
        </h1>

        <p className="hero-description">
          AuLi combines AI chat, PDF learning, offline storage,
          and future sync technology into one intelligent learning workspace.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/chat")}
            >
            Try AuLi Free
            </button>

          <button className="secondary-btn">
            Explore Features
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-header">
          <h2>Built For Modern Learning</h2>

          <p>
            A workspace designed for students, researchers, and curious minds.
          </p>
        </div>

        <div className="features-grid">
          {[
            {
              title: "AI Chat",
              desc: "Ask questions, brainstorm ideas, and learn instantly with AI assistance.",
            },
            {
              title: "PDF Learning",
              desc: "Upload PDFs and transform static documents into interactive study sessions.",
            },
            {
              title: "Offline Workspace",
              desc: "Store chats locally on your own device for a private learning experience.",
            },
            {
              title: "Future Sync",
              desc: "Sync devices only when you want, without depending fully on the cloud.",
            },
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">✦</div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <div className="section-header">
          <h2>How AuLi Works</h2>
        </div>

        <div className="steps-grid">
          {[
            {
              step: "01",
              title: "Open AuLi",
              desc: "Start instantly in guest mode or create an account.",
            },
            {
              step: "02",
              title: "Learn With AI",
              desc: "Chat, upload PDFs, and build your learning workspace.",
            },
            {
              step: "03",
              title: "Own Your Data",
              desc: "Keep your chats stored locally on your own device.",
            },
          ].map((item, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{item.step}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Vision */}
      <section className="future-section">
        <div className="future-box">
          <div className="future-badge">Future Vision</div>

          <h2>
            AuLi Is Becoming
            <br />
            An Offline-First AI Ecosystem
          </h2>

          <p>
            Future versions of AuLi will support Android APKs,
            local device sync, offline study systems,
            AI-powered exam environments, and smart cross-device collaboration.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div>© 2026 AuLi AI Workspace</div>

        <div className="footer-links">
          <button>Privacy</button>
          <button>Terms</button>
          <button>GitHub</button>
        </div>
      </footer>
    </div>
  );
}
