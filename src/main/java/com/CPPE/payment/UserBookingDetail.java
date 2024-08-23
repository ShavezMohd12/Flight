
package com.CPPE.payment;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User_Booking_Details")
public class UserBookingDetail {
    @Id
    private String bookingId; // Use a String to handle long numbers
    
    private String flightNumber;
    
    private String flightDate;
    
    private String airline;
    private String email;
    	private int price;
     String status;
    
    
	public String getBookingId() {
		return bookingId;
	}
	public String getFlightNumber() {
		return flightNumber;
	}
	public String getFlightDate() {
		return flightDate;
	}
	public String getStatus() {
		return status;
	}
	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}
	public void setFlightNumber(String flightNumber) {
		this.flightNumber = flightNumber;
	}
	public void setFlightDate(String flightDate) {
		this.flightDate = flightDate;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAirline() {
		return airline;
	}
	public void setAirline(String airline) {
		this.airline = airline;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}

  
  
   
}