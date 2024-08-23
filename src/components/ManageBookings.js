import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../managebookings.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ManageBookings() {
    const [Bookings, setBookings] = useState([]);
    const [Error, setError] = useState('');
    const [EditBookingId, setEditBookingId] = useState(null);
    const [NewDate, setNewDate] = useState('');
    
    const [FlightNumber,setflightNumber]=useState();
    const navigate = useNavigate();
 const location =useLocation();

    function readData(){
        const url='http://localhost:8081/getAllBooking/'+location.state.uname;
        axios.get(url)
            .then((response) => {
                setBookings(response.data);
                setError('');
                
            })
            .catch((error) => {
                setError("Error fetching bookings!");
                console.log(error);
            });
    }

    const handleCancelBooking = (bookingId) => {
        const url="http://localhost:8081/cancelBooking/"+bookingId;
        axios.delete(url)
            .then(() => {
                setBookings(Bookings.filter(booking => booking.id !== bookingId));
                // alert("Booking cancelled successfully!");
                readData();
            })
            .catch((error) => {
                setError("Error cancelling booking!");
                console.log(error);
            });
    };

    const handleEditBooking = (bookingId,bookingFlightNumber) => {
        setEditBookingId(bookingId);
        setflightNumber(bookingFlightNumber);
       
    };

    const handleSaveEdit = () => {
        const url="http://localhost:8081/checkBYCondition?date="+String(NewDate)+"&FlightNumber="+FlightNumber;

        axios.get(url).then((response)=>{ console.log(response.data);
            if(response.data=="exist")
            { setError('');
                    const url2="http://localhost:8081/editFlight/"+EditBookingId;
                axios.put(url2,{
               flightDate:NewDate,
                  
                }).then((response)=>{
                    if(response.data=="changed")
                    {
                       
                        alert("changed");
                        readData();
                    }
                }).catch((er)=>{console.log(er)});
            }
            else if(response.data=="not exist"){
                
                
                setError("NO FLIGHT AVAILABLE FOR THIS DATE ");
            }
        }).catch((er)=>{})


        // axios.put()
        //     .then(() => {
        //         setBookings(Bookings.map(booking => 
        //             booking.id === EditBookingId ? { ...booking, date: NewDate } : booking
        //         ));
        //         setEditBookingId(null);
        //         setNewDate('');
        //         alert("Booking date updated successfully!");
        //     })
        //     .catch((error) => {
        //         setError("Error updating booking!");
        //         console.log(error);
        //     });
    };

    const ItemList = Bookings.length > 0 ? Bookings.map((booking) => {
        return (
            <tr key={booking.id} style={{ textAlign: "center", fontSize: "20px" }}>
                <td style={{ width: "200px" }}>{booking.bookingId}</td>
                <td style={{ width: "200px" }}>{booking.flightNumber}</td>
                <td style={{ width: "200px" }}>{booking.airline}</td>
                <td style={{ width: "200px" }}>{booking.flightDate}</td>
                <td style={{ width: "200px" }}>{booking.status}</td>
                <td style={{ width: "200px" }}>{booking.price}</td>
                
                <td style={{ width: "200px" }}>
                    <button 
                        style={{ backgroundColor: "blue", width: "50%", marginTop: "0" }} 
                        onClick={() => handleEditBooking(booking.bookingId,booking.flightNumber)}
                    >
                        Edit
                    </button>
                    <button 
                        style={{ backgroundColor: "red", width: "50%", marginTop: "0" }} 
                        onClick={() => handleCancelBooking(booking.bookingId)}
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }) : <tr><td colSpan="7" style={{ textAlign: "center" }}>No bookings available</td></tr>;
  
    
    return (
        
        <div className={styles.flightcontainer}>
            <div className={styles.bookingContainer}>
                <h2>Manage Bookings</h2>
                {EditBookingId && (
                    <div className={styles.editContainer}>
                        <input 
                            type="date" 
                         
                            onChange={(e) => setNewDate(e.target.value)} 
                            required 
                        />
                        <button className={styles.bttn} onClick={handleSaveEdit}>Save</button>
                    </div>
                )}
                <button className={styles.bttn} onClick={() => navigate('/flightbooking',{state:{id:location.state.id,uname:location.state.uname}})}>Create New Booking</button>
                <button className={styles.bttn2} onClick={readData}>Show My Bookings</button>
                {Error && <span className={styles.error}>{Error}</span>}
            </div>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr style={{ textAlign: "center" }}>
                        <th>Booking Id</th>
                        <th>Flight Number</th>
                        <th>Airline</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {ItemList}
                </tbody>
            </Table>
        </div>
    );
}

export default ManageBookings;