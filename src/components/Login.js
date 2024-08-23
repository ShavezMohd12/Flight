import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const[user,setUser]=useState("");
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const[Error,setError]=useState([]);
   const errors={invalidUser:"",invalidPassword:""};
    const navigate = useNavigate();
    
    var url="http://localhost:8081/login";
   

    const ValidData=()=>{
       
         if(Username=="" && Password=="")
            {
                errors.invalidUser="Enter the username";
                errors.invalidPassword="Enter the Password"
                setError(errors);
                console.log(errors);
            }
            else  if(!Username.endsWith("@gmail.com"))
                {
                    errors.invalidUser="Invalid Username";
                    errors.invalidPassword="";
                    setError(errors);
                }
           
       else if(Username=="")
        {
            errors.invalidUser="Enter the username";
            errors.invalidPassword="";
            setError(errors);
            console.log(errors);
        }
      
         else if(Password=="")
        {
            errors.invalidUser="";
            errors.invalidPassword="Enter the password";
            setError(errors);
        }
       
        
        else if(Username!="" && Password!=""){
            errors.invalidPassword="";
            errors.invalidUser="";
            setError(errors);
        axios.post(url,{
            username:Username,
            password:Password
         }
         ).then((response)=>{setUser(response.data);setError([])}).catch((error)=>{console.log(error)});

              setTimeout(()=>{console.log(user)},2000);
        }
    }


    function Nvigate()
    {
        if(user=="login")
        {

            //it will not let to open the flightBoooking Directly
            navigate("/flightBooking",{state:{id:1,uname:Username}});
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
               <p>{errors.invalidUser}</p>
            <input type="email" onChange={(e) => setUsername(e.target.value)} placeholder="Username"  required/>
            <h4 style={{color:"white"}}>{Error.invalidUser}</h4>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
            <h4 style={{color:"white"}}>{Error.invalidPassword}</h4>
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