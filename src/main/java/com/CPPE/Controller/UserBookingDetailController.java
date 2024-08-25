package com.CPPE.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CPPE.FlightDetail.FlightDetail;
import com.CPPE.JpaRepository.FlightDetailRepo;
import com.CPPE.JpaRepository.UserBookingRepo;
import com.CPPE.payment.UserBookingDetail;

@RestController
@CrossOrigin(origins={"http://localhost:3000"})
public class UserBookingDetailController {
	
	
	 @Autowired
		    private UserBookingRepo userrepo;
	 
	 @Autowired
	 FlightDetailRepo frepo;
	 
	 //this function is used to insert the booking details of user after the payment is done
	 
	@PostMapping("/Booked")
	public void insertUserBooking(@RequestBody UserBookingDetail detail)
	{
		System.out.println(detail.getStatus());
		List<UserBookingDetail> find=new ArrayList<>();
		find=userrepo.findAll();
		 if(find.isEmpty())
		 {
			 detail.setBookingId("1");
			 userrepo.save(detail);

		 }
		 else
		 {
			
			 int Sno=Integer.parseInt(find.get(find.size()-1).getBookingId());
			 Sno+=1;
			 detail.setBookingId(String.valueOf(Sno));
			 userrepo.save(detail);
			
		 }
	}
	
	//this method is used to show all the booking details of the user if user click on show booking
	@GetMapping("/getAllBooking/{email}")
	public List<UserBookingDetail> fetchData(@PathVariable String email)
	{
		
		
		List<UserBookingDetail> list=userrepo.findAllByEmail(email);
		
			return list;
		
	}
	
	//this method is used to delete the flight detail if user want to cancel the flight
	@DeleteMapping("/cancelBooking/{id}")
	public String deleteData(@PathVariable String id)
	{

		userrepo.deleteById(id);
		return "deleted";
	}
	
	
	//this function is used when user want to edit the date of existing flight
	@PutMapping("/editFlight/{bookingId}")
	public String editFlightDate(@PathVariable String bookingId,@RequestBody UserBookingDetail detail)
	{
		UserBookingDetail fetch=userrepo.findById(bookingId).get();	
	 FlightDetail fdetail=frepo.findByFlightDateAndFlightNumber(detail.getFlightDate(),Integer.parseInt(fetch.getFlightNumber()));
	 
	 	fetch.setFlightDate(detail.getFlightDate());
	 	fetch.setPrice(fdetail.getPrice());
		String email=fetch.getEmail();
		userrepo.save(fetch);
		return "changed";
	}

}
