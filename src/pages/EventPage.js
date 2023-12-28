import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EventPage() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const [events, setEvents] = useState([]);
  const storedToken = localStorage.getItem("authToken");

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
  }, []);

  return (
    <div>
      <div>
        {events.map(event => (
          <table key={event._id} className="events-container">
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>
                  <Link to={`/events/${event._id}`}>Details</Link>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      <div className="add-event-button">
        <Link to='/events/add-event'>Add Event</Link>
      </div>
    </div>
  ); 
};

export default EventPage;