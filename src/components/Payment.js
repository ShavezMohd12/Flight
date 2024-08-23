import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import styles from '../payment.module.css';
import axios from 'axios';
import Login from './Login';
function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const [errors, setErrors] = useState({});
    const location=useLocation();
    const navigate = useNavigate();
   var ID,Uname,Fno,FAirline,FDate,Fprice;


    const validate = () => {
        const errors = {};
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            errors.cardNumber = "Card number must be 16 digits.";
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            errors.expiryDate = "Expiry date must be in MM/YY format.";
        }
        if (cvv.length !== 3 || isNaN(cvv)) {
            errors.cvv = "CVV must be 3 digits.";
        }
        if (!cardHolderName.trim()) {
            errors.cardHolderName = "Card holder name is required.";
        }
        return errors;
    };

    const handlePayment = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const paymentUrl = "http://localhost:8081/processPayment";

        axios.post(paymentUrl, {

          name:cardHolderName.toLowerCase(),
          cardNumber:cardNumber,
	      cvv:cvv,
	     expiryDate:expiryDate,
         
        })
        .then((response) => {
           
            if (response.data=="success") {
               setPaymentStatus("success");
               const saveUrl="http://localhost:8081/Booked";
               axios.post(saveUrl,{
                flightNumber:String(Fno),
                flightDate:String(FDate),
                airline:FAirline,
                status:"Confirm",
                price:location.state.fPrice,
                email:Uname
               }
               ).then((res)=>{console.log(res)}).catch((er)=>{console.log(er)});
                navigate("/confirmation",{state:{id:ID,uname:Uname}});
               
            } else {
                setPaymentStatus("Payment failed. Please try again.");
            }
        })
        .catch((error) => {
            console.error("There was an error processing the payment!", error);
            setPaymentStatus("Payment failed due to an error.");
        });
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
             Uname=String(location.state.uname);
             Fno=location.state.fNo;
             FAirline=location.state.fAirline;
             FDate=location.state.fDate;
            console.log(ID);
            console.log(Uname);
            console.log(Fno);
            console.log(FAirline);
            console.log(FDate);
              return (
        <div className={styles.paymentContainer}>
            <div className={styles.paymentForm}>
                <h1 className={styles.paymentH2}>Payment Details</h1>
                <input 
                    type="text" 
                    placeholder="Card Number" 
                    value={cardNumber} 
                    onChange={(e) => setCardNumber(e.target.value)} 
                    required 
                />
                {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
                <input 
                    type="text" 
                    placeholder="Expiry Date (MM/YY)" 
                    value={expiryDate} 
                    onChange={(e) => setExpiryDate(e.target.value)} 
                    required 
                />
                {errors.expiryDate && <p className={styles.error}>{errors.expiryDate}</p>}
                <input 
                    type="text" 
                    placeholder="CVV" 
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    required 
                />
                {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}
                <input 
                    type="text" 
                    placeholder="Card Holder Name" 
                    value={cardHolderName} 
                    onChange={(e) => setCardHolderName(e.target.value)} 
                    required 
                />
                {errors.cardHolderName && <p className={styles.error}>{errors.cardHolderName}</p>}
                <button onClick={handlePayment}>Pay Now</button>
                <h5>{paymentStatus}</h5>
            </div>
        </div>
    );
        }

  
}

export default Payment;