import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const[user,setUser]=useState("");
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const[status,setStatus]=useState("u");
    
    const navigate = useNavigate();
    
    var url="http://localhost:8081/login";
   

    const ValidData=()=>{

        axios.post(url,{
            username:Username,
            password:Password
         }
         ).then((response)=>{setUser(response.data)}).catch((error)=>{console.log(error)});

              setTimeout(()=>{console.log(user)},2000);
    }


    function Nvigate()
    {
        if(user=="login")
        {

            //it will not let to open the flightBoooking Directly
            navigate("/flightBooking",{state:"101xx"});
        }
        else if(user=="invalid")
        {
            return <h5 style={{color:"white"}}>Invalid Credentials</h5>
        }
      
    }

    return (
        <div id="container">
            
            <div id='loginid'>
                <h2 id='loginh2'>Login</h2>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username"  required/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
    <button onClick={()=>{ValidData()}} >Login</button>
    {/* <h4 style={{color:"white"}}>{user}</h4> */}
   
   <Nvigate/>
   
    <p ><b>
                Don't have an account? </b><a href="/register">Register here</a>
            </p>
            </div>
            
        </div>
    );
}

export default Login;