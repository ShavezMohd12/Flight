package com.CPPE.FlightDetail;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="flightDetails")
public class FlightDetail {
	
	@Id
	String Sno;
	
	int flightNumber;
	
	String airline;
	
	String source;
	
	String destination;
	
	String flightClass;
	
	String flightDate;
	int price;
	public int getFlightNumber() {
		return flightNumber;
	}
	public String getAirline() {
		return airline;
	}
	public String getSource() {
		return source;
	}
	public String getDestination() {
		return destination;
	}
	public String getFlightClass() {
		return flightClass;
	}
	public String getDate() {
		return flightDate;
	}
	public int getPrice() {
		return price;
	}
	public void setFlightNumber(int flightNumber) {
		this.flightNumber = flightNumber;
	}
	public void setAirline(String airline) {
		this.airline = airline;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public void setFlightClass(String flightClass) {
		this.flightClass = flightClass;
	}
	public void setDate(String date) {
		this.flightDate = date;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	
	
	
	
	

}
