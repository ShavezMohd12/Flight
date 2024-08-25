package com.CPPE.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CPPE.FlightDetail.FlightDetail;
import com.CPPE.JpaRepository.FlightDetailRepo;

@RestController
@CrossOrigin(origins={"http://localhost:3000"})
public class FlightDetailController {
	
	@Autowired
	FlightDetailRepo repo;
	
	//This function will fetch all detail from the flight database
	
	@PostMapping("/getFlightDetail")
	public  List<FlightDetail> flightDetail(@RequestBody FlightDetail detail) throws Exception
	{
	
		//check flight exist by date
		if(repo.existsByFlightDate(detail.getDate()))
		{
			List<FlightDetail> getalldetail=repo.findAllByFlightDate(detail.getDate());
			List<FlightDetail> FlightList=new ArrayList<>();
			//if exist then fetch all the flights
			for(FlightDetail fd:getalldetail)
			{
				//filter the flight by source,destination and date 
				if(detail.getSource().equalsIgnoreCase(fd.getSource()) && detail.getDestination().equalsIgnoreCase(fd.getDestination()) && detail.getDate().equals(fd.getDate()) && detail.getFlightClass().equalsIgnoreCase(""))
				{
					FlightList.add(fd);
				}
				//filter the flight by source destination and class
				else if(detail.getSource().equalsIgnoreCase(fd.getSource()) && detail.getDestination().equalsIgnoreCase(fd.getDestination()) && detail.getDate().equals(fd.getDate()) && detail.getFlightClass().equalsIgnoreCase(fd.getFlightClass()))
				{
					FlightList.add(fd);
				}
			}
			//if flight does not exist according filter then show return message failed
			if(FlightList.isEmpty())
			{
				throw new Exception("failed");
			}
			else {
			return FlightList;
			}
		}
		//if flight not available for that day then send message failed
		else
		{
			System.out.println(detail.getDate());
			throw new Exception("failed");
		}
	}
	
	// this function is used when user want to  edit the flight date
	@GetMapping("/checkBYCondition")
	public String check(@RequestParam String date,@RequestParam int FlightNumber)
	{
		//it will check if same flight number exist on the given date then it return exits else it return not exist
		System.out.println(FlightNumber+""+date);
		if(repo.existsByFlightDate(date)==true && repo.existsByFlightNumber(FlightNumber)==true)
		{
			return "exist";
		}else
		{
			return "not exist";
		}
	}

}
