import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddAvailability from "./AddAvailability";

function DeleteMember() {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const {memberId} = useParams();

  const navigate = useNavigate();
  
  const deleteMemberHandle = () => {
    axios.delete(`${API_URL}/api/members/${memberId}`, {headers : {Authorization: `Bearer ${storedToken}`}})
      .then(() => {alert("success to remove"); navigate(-1); })
      .catch(e => console.log("failed to remove the member", e))
  };

return(
  <div  className="edit-member">
    <button onClick={deleteMemberHandle}>Leave the event</button>
    
    <AddAvailability />
  </div>
  
)

};

export default DeleteMember;