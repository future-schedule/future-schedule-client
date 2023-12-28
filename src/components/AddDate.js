import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddDate() {

  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const {eventId} = useParams();

  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const addDateInTheEvent = (e) => {
    e.preventDefault();

    const addDateBody = {
      date, hour
    };

    axios.post(`${API_URL}/api/events/${eventId}/dates`, addDateBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {
        alert("success to add new date");
        setDate("");
        setHour("");
        navigate(-1)
      })
      .catch(e => console.log("failed to add new date"));
  };


  return(
    <form onSubmit={addDateInTheEvent} className="add-date">
      <label>Date</label>
      <input 
        type="Date"
        name="date"
        value={date}
        onChange={e => setDate(e.target.value)}

      />

      <label>Hour</label>
      <input 
        type="text"
        name="hour"
        value={hour}
        onChange={e => setHour(e.target.value)}
      />
      <button>Add New Date</button>
    </form>
  );
};

export default AddDate;