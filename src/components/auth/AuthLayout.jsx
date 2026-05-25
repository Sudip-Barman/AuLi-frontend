import "./AuthLayout.css";

function AuthLayout({ children }) {

  return (

    <div className="auth-container">

      <div className="auth-left">

        <div className="auth-brand">

          <h1>AuLi AI</h1>

          <p>
            Your intelligent learning workspace.
          </p>

        </div>

      </div>

      <div className="auth-right">
        {children}
      </div>

    </div>

  );
}

export default AuthLayout;