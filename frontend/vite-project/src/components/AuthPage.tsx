import { useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="auth-root">
      <div className="auth-card left-panel">
        <div className="brand">
          <div className="brand-logo">Finboro</div>
          <h1>Get started with us</h1>
          <p className="muted">
            Complete these easy steps to register your account.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-icon">✏️</div>
            <div>
              <div className="step-title">Sign up your account</div>
              <div className="step-muted">
                Complete these easy steps to register your account.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-icon">🔍</div>
            <div>
              <div className="step-title">Create your account</div>
              <div className="step-muted">
                Complete these easy steps to register your account.
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-icon">🎉</div>
            <div>
              <div className="step-title">Start trading with Finboro</div>
              <div className="step-muted">
                Complete these easy steps to register your account.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-card right-panel">
        <h2>Sign in to Finboro</h2>
        <p className="muted small">
          Enter your data to Sign in your account.
        </p>

        <div className="socials">
          <button className="btn social google">
            Sign up with Google
          </button>
        </div>

        <div className="or">Or</div>

        <label className="label">Email Address</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          type="email"
        />

        <label className="label">Password</label>
        <div className="input-with-icon">
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="row between">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>
          <a className="link">Forget Password?</a>
        </div>

        <button className="btn primary large">Sign up</button>

        <p className="muted center small">
          Do you have an account? <a className="link">Sign up</a>
        </p>
      </div>
    </div>
  );
}
