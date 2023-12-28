import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EventPageDetails() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");

  const { eventId } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = () => {
      axios
        .post(`${API_URL}/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((displayEventDetails) => {
          setEventDetails(displayEventDetails.data);
        })
        .catch((error) =>
          console.log("error to fetch the event details", error)
        );
    };

    fetchEventDetails();
  }, []);

  const handlePasswordSubmit = () => {
    // Make a request to the server to verify the password
    axios
      .post(
        `${API_URL}/api/events/${eventId}`,
        { password },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // If the password is correct, fetch the event details
        setEventDetails(response.data);
      })
      .catch((error) => console.log("Incorrect password", error));
  };

  const deleteEventHandle = () => {
    axios
      .delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/events"))
      .catch((e) => console.log("failed to delete the event"));
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short"};
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  console.log(eventDetails)

  if (!eventDetails) {
    return (
      <div className="password-container">
        <label>
          Enter Event Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handlePasswordSubmit}>Submit Password</button>
        <div>Loading...</div>
      </div>
    );
  }

  console.log(eventDetails)

  return (
    <div className="event-details-container">
      <table>
        <thead>
          <tr>
            <th colSpan={eventDetails.dates.length + 3}>{eventDetails.title}</th>
          </tr>
          <tr key={eventDetails._id}>
            <th>Name</th>
            <th>{formatDate(eventDetails.date)}</th>
            {eventDetails.dates.map(elementDate =>        
              <th>{formatDate(elementDate.date)}</th>
            )}
          </tr>
        </thead>
        <tbody>
        {eventDetails.members.map((displayMember, index) => 
          <tr key={displayMember._id}>
            <th>
              <Link to={`/members/${displayMember._id}`}>
                {displayMember.member.name}
              </Link>
            </th>
            {displayMember.availabilities.map(element => <th><Link to={`/availabilities/${element._id}`}>{element.availability}</Link></th>  )}
          </tr>
        )}
        </tbody>
      </table>
      <br />
      <h4>Created by: {eventDetails.ownerEvent.name}</h4>
      <button onClick={deleteEventHandle}>Delete Event</button>
      <Link to={`/events/edit-event/${eventDetails._id}`}>Edit Event</Link>
      <Link to={`/events/${eventDetails._id}/addDate`}>Add New Date</Link>
      <Link to={`/events/${eventDetails._id}/addMember`}>Add New Member</Link>
    </div>
  );
}

export default EventPageDetails;
