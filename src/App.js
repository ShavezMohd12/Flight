import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FlightBooking from './components/FlightBooking';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import ManageBookings from './components/ManageBookings';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Default route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/flightBooking" element={<FlightBooking/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/confirmation" element={<Confirmation/>} />
                <Route path="/manageBooking" element={<ManageBookings/>} />
            </Routes>
        </Router>
    );
}

export default App;