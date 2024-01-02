import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const {eventId} = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("");

  useEffect (() => {
    const fetchEventHandle = () => {
      axios.get(`${API_URL}/api/events/details/${eventId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(response => {
          const title = response.data.title;
          const hour = response.data.hour;
          
          setTitle(title);
          setHour(hour);
        })
        .catch(e => console.log("failed to fetch the event", e))
    };

    fetchEventHandle();
  }, [])

  const editEventHandle = (e) => {
    e.preventDefault();
    const editEventBody = {title, hour};

    axios.put(`${API_URL}/api/events/${eventId}`, editEventBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {navigate(-1)})
      .catch(e => console.log("failed to edit the event", e))
  };

  return(
    <div className="edit-event">
      <form onSubmit={editEventHandle}>
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

        <button type="submit">Edit</button>  
      </form>
    </div>
  );
};

export default EditEvent;