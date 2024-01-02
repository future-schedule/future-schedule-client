import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddAvailability() {
  const API_URL = process.env.REACT_APP_SERVER_URL
  const storedToken = localStorage.getItem("authToken");
  const {memberId} = useParams();
  const navigate = useNavigate();

  const [availability, setAvailability] = useState([]);
  const [dateId, setDateId] = useState("");
 
    const addNewAvailability = (e) => {
      e.preventDefault();

      const newAvailability = {
        availability, dateId
      }

      axios.post(`${API_URL}/api/members/${memberId}/availabilities`, newAvailability, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(newAvailabilityResult => {
          setAvailability("")
          alert("success to post the new availability status")
          navigate(-1)
        })
        .catch(e => console.log("failed to fetch the specific member"))
    };


  console.log(availability)

  return(
    <form onSubmit={addNewAvailability}>
      <label>Adding New Availability</label>
      <select
        name="availability"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      >
        <option value="">Select Availability</option>
        <option value="✓">✓</option>
        <option value="✗">✗</option>
        <option value="Could be">Could be</option>
      </select>

      <label>Date Id</label>
      <input 
        type="text"
        name="dateId"
        value={dateId}
        onChange={e => setDateId(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddAvailability;