import './App.css';
import NavBar from './components/Navbar';
import EventPage from './pages/EventPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import EventPageDetails from './pages/EventPageDetails';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import AddMember from './components/AddMember';
import AddDate from './components/AddDate';
import AddAvailability from './components/AddAvailability';
import EditAvailability from './components/EditAvailability';
import DeleteMember from './components/DeleteMember';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/events' element={<EventPage />} />
        <Route path='/events/:eventId' element={<EventPageDetails />} />
        <Route path='/events/add-event' element={<AddEvent />} />
        <Route path='/events/edit-event/:eventId' element={<EditEvent />} />
        <Route path='/events/:eventId/addMember' element={<AddMember />} />
        <Route path='/members/:memberId' element={<DeleteMember />} />
        <Route path='/events/:eventId/addDate' element={<AddDate />} />
        <Route path='/members/:memberId/availability' element={<AddAvailability />} />
        <Route path='/availabilities/:availabilityId' element={<EditAvailability />} />
      </Routes>
    </div>
  );
}

export default App;
