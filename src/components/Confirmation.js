import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../confirmation.module.css'; // Import your CSS module
import Login from './Login';
function Confirmation() {
    const navigate = useNavigate();
    const location=useLocation();
    var ID,Uname;

    const handleNavigation = (path) => {
        navigate(path,{state:{id:ID,uname:Uname}});
    };

   
   
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
            ID=location.state.id;
            Uname=location.state.uname;
            console.log(Uname);

    return (
        <div className={styles.confirmationContainer}>
            <div className={styles.confirmationBox}>
                <img src="
                /success.png" alt="Success" className={styles.successIcon} />
                <h1 className={styles.successMessage}>Payment Successful!</h1>
                <p>Your payment has been processed successfully.</p>
                <button onClick={() => handleNavigation('/flightbooking')} className={styles.confirmationButton}>
                    Book Another Flight
                </button>
            </div>
        </div>
    );
}
}

export default Confirmation;