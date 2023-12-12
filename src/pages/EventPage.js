import axios from "axios";
import { useEffect, useState } from "react";

function EventPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const [events, setEvents] = useState([]);
  const storedToken = localStorage.getItem("authToken")

  useEffect(() => {
    const fetchEvents = () => {
      axios.get(`${API_URL}/api/events`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(eventList => {
          setEvents(eventList.data)
        })
        .catch(error => {
          console.log("error fetching events", error)
        })
    };

    fetchEvents();
  }, [])
  console.log(events.map(element => element))
  return (
    <table className="events-container">
      <thead>
        <tr>
          <th>Title</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => 
          <tr key={event._id}>
            <th>{event.title}</th>
            <th>{event.hour}</th>
          </tr>
        )}
      </tbody>
    </table>
  ); 
};

export default EventPage;