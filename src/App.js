import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar';
import EventPage from './pages/EventPage';
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/events' element={<EventPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
