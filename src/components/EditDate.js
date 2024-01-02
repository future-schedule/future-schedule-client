import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDate() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const {dateId} = useParams();

  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/dates/${dateId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(specificDate => setDate(specificDate.data.date))
      .catch(e => console.log("failed to fetch the specific date", e))
  }, []);

  const updateDateEventHandle = (e) => {
    e.preventDefault();
    const requestDateBody = {date};

    axios.put(`${API_URL}/api/dates/${dateId}`, requestDateBody, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {
        alert("success to update the event date")
        navigate(-1)
      })
      .catch(e => console.log("failed to update the event date"))
  };

  const deleteDateEventHandle = () => {
    axios.delete(`${API_URL}/api/dates/${dateId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
      .then(() => {alert("success to delete the date event"); navigate(-1)})
      .catch(e => console.log("failed to delete the date event"))
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short"};
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return(
    <form onSubmit={updateDateEventHandle} className="edit-date">
      <label>
        <input 
          type="formatDate"
          name="date"
          value={formatDate(date)}
          onChange={e => setDate(e.target.value)}
        />
      </label>

      <button type="submit">Update</button>

      <button onClick={deleteDateEventHandle}>Delete</button>
    </form>
  );
};

export default EditDate;