import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [password, setPassword] = useState(""); // New state for the password


  const addEvenHandle = (e) => {
    e.preventDefault();

    const requestEventBody = {
      title, date, hour, password
    }

    axios.post(`${API_URL}/api/events`, requestEventBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then( response => {
        setTitle("");
        setDate("");
        setHour("");
        setPassword("");
        navigate("/events")
      })
      .catch(e => console.log("error to post the new events", e))
  }

  return(
    <div className="add-event">
      <form onSubmit={addEvenHandle}>
        <label>Title</label>
          <input 
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        <label>Hour</label>
          <input 
            type="text"
            name="hour"
            value={hour}
            onChange={e => setHour(e.target.value)}
          />
        <label>Date</label>
          <input 
            type="date"
            name="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        
        <label>Password</label>
          <input 
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;