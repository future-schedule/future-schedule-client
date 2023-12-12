import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function SignUpPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const signUpSubmit = (e) => {
    e.preventDefault();
    const requestBodySignUp = {name, email, password};

    axios.post(`${API_URL}/auth/signup`, requestBodySignUp)
      .then(response =>  navigate("/login"))
      .catch(error => {
        console.log("failed to sign up", error);
        setErrorMessage(e.response.data.messsage)
      })
  };

  return(
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={signUpSubmit}>
        <label>Name:</label>
        <input 
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

        <label>Email:</label>
        <input 
          type="text"
          name="name"
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
        <button type="submit">Go there</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )

};


export default SignUpPage;