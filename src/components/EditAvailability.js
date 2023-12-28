import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditAvailability() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const {availabilityId} = useParams();
  console.log(availabilityId)
  const navigate = useNavigate();

  const [availability, setAvailability] = useState("");

  useEffect(() => {
    const fetchNewAvailability = () => {
      axios.get(`${API_URL}/api/availabilities/${availabilityId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(fetchNewAvailability => setAvailability(fetchNewAvailability.data.availability))
        .catch(e => console.log("failed to fetch the new availability", e));
      }

      fetchNewAvailability();
  }, []);

  const editNewAvailabilityHandle = () => {

    const updateNewAvailabilityBody = {
      availability
    };

    axios.put(`${API_URL}/api/availabilities/${availabilityId}`, updateNewAvailabilityBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {navigate(-1); alert("success to edit!")})
      .catch(e => console.log("failed to edit"));
  };

  const deleteNewAvailabilityHandle = () => {
    axios.delete(`${API_URL}/api/availabilities/${availabilityId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {alert("success to remove the new availability"); navigate(-1)})
      .catch(e => console.log("failed to remove the new availability"))
  };

  return(
    <form onSubmit={editNewAvailabilityHandle} className="editNewAvailability">
      <label>Availability</label>
      <select
        name="availability"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      >
        <option value="">Select Availability</option>
        <option value="✓">✓</option>
        <option value="✗">✗</option>
      </select>
      <button type="submit">Update Status</button>
      <br></br>
      <button onClick={deleteNewAvailabilityHandle}>Delete</button>
    </form>
  );
};

export default EditAvailability;