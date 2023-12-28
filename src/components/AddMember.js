import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddMember () {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const {eventId} = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState("");

  const addMemberInTheEvent = (e) => {
    e.preventDefault();

    const addMemberBody = {
      member
    };

    axios.post(`${API_URL}/api/events/${eventId}/members`, addMemberBody, {headers: {Authorization: ` Bearer ${storedToken}`}})
      .then(() => {
        alert("success to add new member")
        setMember("");
        navigate(-1)
      })
      .catch(e => console.log("failed to post the new member", e));
  };

  return(
    <form onSubmit={addMemberInTheEvent} className="add-member">
      <label>Member</label>
      <input 
        type="text"
        name="member"
        value={member}
        onChange={e => setMember(e.target.value)}
      />
      <button type="submit">Adding New Member</button>
    </form>
  );
};

export default AddMember;