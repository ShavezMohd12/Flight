import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../booking.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';

function FlightBooking() {
    const [Source, setSource] = useState('source');
    const [Destination, setDestination] = useState('destination');
    const [f_Date, setDate] = useState('');
    const [Flights, setFlights] = useState([]);
   const[Error,setError]=useState();
    const [SelectedClass, setSelectedClass] = useState('');
    const[userdetail,setUserdetail]=useState([]);
    const [status,setStatus]=useState(true);
    const location=useLocation();
    const navigate=useNavigate();
  

 
    const handleSearch = () => {

        if(Source==" " || Destination==" " || Source=="" || Destination=="")
            {
                alert("Enter the location");
            }
        else if(Source==Destination)
        {
            alert("Both the locations are same");
        }
        else if(Source=="source" || Destination=="destination" )
        {
            alert("enter the location")
        }
        else{
            if(f_Date!=""){

              axios.post('http://localhost:8081/getFlightDetail', {
            source: Source,
            destination: String(Destination).trim(),
            date: String(f_Date),
            flightClass: String(SelectedClass)
        })
        .then((response) => {
            setFlights(response.data);
            setError();
        })
        .catch((error) => {
           setError("Not Available!");
            console.log(error);
        });
        }
        else
        {
            alert("Enter the Date");
        }
    }

      
    };


    
        const ItemList= (Flights.length>0)?Flights.map((record)=>{
        return (
          <tr style={{textAlign:"center",fontSize:"20px"}}>
                <td  style={{width:"200px"}}>{record.flightNumber}</td>
                <td  style={{width:"200px"}}>{record.airline}</td>
                <td  style={{width:"200px"}}>{record.source}</td>
                <td  style={{width:"200px"}}>{record.destination}</td>
                <td  style={{width:"200px"}}>{record.flightClass}</td>
                <td  style={{width:"200px"}}>{record.price}</td>
         
                <td  style={{width:"200px"}}><button style={{backgroundColor:"red",width:"50%",marginTop:"0"}} onClick={()=>{navigate("/payment",{state:{id:location.state.id,uname:location.state.uname,fNo:record.flightNumber,fAirline:record.airline,fDate:record.date,fPrice:record.price}})}}>Book</button></td>
          </tr>

        )
    }
):<tr><td colSpan="7" style={{ textAlign: "center" }}>No bookings available</td></tr>;
     


 
const manageBooking=()=>{
       navigate("/manageBooking",{state:{id:location.state.id,uname:location.state.uname}})
}



   
    if(location.state==null)
        {
            return (
                <>
                 {alert("User Not Verified")}
                
                 
            
                 <Login/>
                </>
      
            );
        }
        else{

           
            if(status){
            const url="http://localhost:8081/getDetail/"+location.state.uname;

            axios.get(url).then((response)=>{setUserdetail(response.data)}).catch((error)=>{console.log(error)});
                setStatus(false);
            }

    return (
        
  
        
        <div  className={styles.flightcontainer} >
            <nav className={styles.navbar}>
            <a className={styles.navname}>{userdetail.name}</a>
            <button className={styles.a} onClick={()=>{navigate("/login")}}>Log out</button>  
            <button className={styles.a} onClick={manageBooking}>My Bookings</button>  
              
            </nav>
        <div  className={styles.bookingContainer}>
            <h2 id='loginh2'>Flight Booking</h2>
            <div className={styles.bootCont}>
            <div  className={styles.bootFlex}>
            <input  className={styles.bootInput}
                type="text" 
              
                onChange={(e) => setSource(e.target.value)} 
                placeholder="Source Place" 
                required 
            />
            <input  className={styles.bootInput}
                type="text" 
                
                onChange={(e) => setDestination(e.target.value)} 
                placeholder="Destination Place" 
                required 
            />
            <input className={styles.bootInput}
                type="date" 
               
                onChange={(e) => setDate(e.target.value)} 
                required 
            />
           
                
                <select className={styles.selectCls}
                    value={SelectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)} 
                >
                    <option value="">Select a class</option>
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="firstClass">First Class</option>
                </select>
            </div>
            
          
            <button className={styles.bttn} onClick={handleSearch}>Search</button>
          

            </div>
            
           
        </div>


        <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th>Flight Number</th>
                    <th>Airline</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Class</th>
                    <th>Price (INR)</th>
                    <th>Booking</th>
                    
                </tr>
                </thead>
                <tbody>
                    {/* <ItemList/> */}
                    {ItemList}
                </tbody>
            
        </Table>

        </div>
     );
        }
      
    
    
        }

   


export default FlightBooking;