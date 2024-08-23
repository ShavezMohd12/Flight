package com.CPPE.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="card_details")
public class Card_detail {
	
	@Id
	 String cardNumber;
	 String name;
	
	String cvv;
	String expiryDate;
	
	
	public String getName() {
		return name;
	}
	public String getCardNumber() {
		return cardNumber;
	}
	public String getCvv() {
		return cvv;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	public void setCvv(String cvv) {
		this.cvv = cvv;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	

}
