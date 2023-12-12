import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function LoginPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const {storeToken, authenticateUser} = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const loginSubmit = (e) => {
    e.preventDefault();
    const requestLoginBody = {email, password};

    axios.post(`${API_URL}/auth/login`, requestLoginBody)
      .then(response => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/events")
      })
      .catch(error => {
        console.log("failed to login", error);
        setErrorMessage(e.response.data.message);
      });
  };

  return(
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <label>Email:</label>
        <input 
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );

};

export default LoginPage;