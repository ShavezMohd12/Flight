import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './booking.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login';

function FlightBooking() {
    const [Source, setSource] = useState('source');
    const [Destination, setDestination] = useState('destination');
    const [f_Date, setDate] = useState('');
    const [Flights, setFlights] = useState([]);
   const[Error,setError]=useState();
    const [SelectedClass, setSelectedClass] = useState('');
    const location=useLocation();
    const navigate=useNavigate();
    const handleSearch = () => {

        if(Source==" " || Destination==" " || Source=="" || Destination=="")
            {
                alert("Enter the location11");
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


    
        const ItemList= Flights.map((record)=>{
        return (
          <tr style={{textAlign:"center",fontSize:"20px"}}>
                <td  style={{width:"200px"}}>{record.flightNumber}</td>
                <td  style={{width:"200px"}}>{record.airline}</td>
                <td  style={{width:"200px"}}>{record.source}</td>
                <td  style={{width:"200px"}}>{record.destination}</td>
                <td  style={{width:"200px"}}>{record.flightClass}</td>
                <td  style={{width:"200px"}}>{record.price}</td>
                <td  style={{width:"200px"}}><button style={{backgroundColor:"red",width:"50%",marginTop:"0"}} onClick={()=>{alert("Booking page will render")}}>Book</button></td>
          </tr>

        )
    }
)
    
    function F_Error()
    {
        if(Error!==undefined)
        {
            return <span style={{color:"black",backgroundColor:"red",position:"relative",left:"47%",top:"10px",padding:"5px"}}> {Error}</span>
        }
    }


   


    return (
        <div>
        {(location.state!="101xx")?<Login/>:
        
        <div  className={styles.flightcontainer} >
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
            <F_Error/>
           
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
        }
      
       </div>
    );
}

export default FlightBooking;