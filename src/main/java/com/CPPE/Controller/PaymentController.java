
package com.CPPE.Controller;

import java.time.LocalDate;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CPPE.payment.Card_detail;

import com.CPPE.JpaRepository.CardDetailRepo;



@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class PaymentController {

  
    
    @Autowired
    private CardDetailRepo cardrepo;

    @PostMapping("/processPayment")
    public String processPayment(@RequestBody Card_detail detail) {
    	System.out.println(detail.getCardNumber()+""+detail.getCvv()+""+detail.getExpiryDate()+""+detail.getName());
    	if(cardrepo.existsById(detail.getCardNumber())==true && cardrepo.existsByName(detail.getName().toUpperCase())==true && cardrepo.existsByCvv(detail.getCvv())==true && cardrepo.existsByExpiryDate(detail.getExpiryDate())==true)
    	{
    		LocalDate date=LocalDate.now();
    		String presentDate=String.valueOf(date);
    		
    		return "success";
    	}
    	else
    	{
    		return "failed";
    	}
    	
    	
    }
}