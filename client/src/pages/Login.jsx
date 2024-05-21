import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Loading from "../components/Loading"
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post("/api/token/", {username, password});
      localStorage.setItem(ACCESS_TOKEN, response.data.access)
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
      navigate("/")
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }

    console.log("User Name:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loading && <Loading />}
      <Link to="/register"> Register </Link>
    </div>
  );
};

export default Login;
