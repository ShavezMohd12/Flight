import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [Email, setEmail] = useState('empty');
    const[Name,setName]=useState('empty');
    const[Phone,setPhone]=useState('empty');
    const [Password, setPassword] = useState('p');
    const [Adhar, setAdhar] = useState('empty');
    const [confirmPassword, setConfirmPassword] = useState('cp');
    const[status,setStatus]=useState("state");
    const navigate = useNavigate();

    const url="http://localhost:8081/register";

    const handleRegister =()=>{
       
        if(Password==confirmPassword){
           
            axios.post(url,{
                adhar:Number(Adhar),
                name:Name.toUpperCase(),
                email:String(Email),
                phone:Number(Phone),
                password:Password

            }).then((response)=>{setStatus(response.data)}).catch((error)=>{console.log(error)});
            
        }else if(Password=="p" || confirmPassword=="cp" || Adhar=="empty" || Name=="empty" || Phone=="empty" || Email=="empty"){
            alert("field are empty");
        }
        else{
            alert("try again password are not same");
        }
    }

  
    const Error=()=>{
            return(
                <div >
           
                <div>

                    {(status=="success")?<h5 style={{color:"red",backgroundColor:"yellow",width:"200px",textAlign:"center",opacity:"1"}}>Your Data Is Registered</h5>:<h5 style={{color:"red",backgroundColor:"yellow",width:"200px",textAlign:"center"}}>Already Exist! Try Again</h5>}
                
              
            
                    </div>
                    </div>
            )
    }


    return (
        <div id="container">
           
        <div id='loginid'>
        <h2 id='loginh2'>Register</h2>
        
       <label for="adhar">Adhar Number </label><input
            type="text" id="adhar"
           maxlength="12" minlength="12"
            onChange={(e) => setAdhar(e.target.value)}
            placeholder="Adhar"
       required />
        <label for="name">Full Name</label><input
            type="text" id="name"
        
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
       required />
         <label>Email </label><input
            type="email"
           
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        required/>
          <label>Phone Number </label><input
            type="text"
           maxlength="10" minlength="10"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
        required/>
       <label>Password </label>  <input
            type="password"
           
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        required/>
       <label>Confirm Password </label>  <input
            type="password"
            
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
        required/>
        
        <button type="submit" onClick={handleRegister}>Register</button>
        {(status!="state")?<Error/>:""}
        <p>
            Already have an account? <a href="/login">Login here</a>
        </p>
     
        </div>
       
       
    </div>
       
    );
}

export default Register;