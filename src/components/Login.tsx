import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginToken, setLoginToken] = useState<string | null>(
    localStorage.getItem("login_token")
  );

  useEffect(() => {
    if (loginToken) {
      navigate("/home");
    }
  }, [loginToken]);

  const loginHandler = async () => {
    if (!email || !password) {
      return;
    }
    if (email === "sujaybanage@gmail.com" && password === "sujay@123") {
      localStorage.setItem("login_token", email + password);
      setLoginToken(localStorage.getItem("login_token"));
      return;
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={loginHandler}>
        <h1>User Login</h1>
        <div className="input__container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
