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
	
	@PostMapping("/getFlightDetail")
	public  List<FlightDetail> flightDetail(@RequestBody FlightDetail detail) throws Exception
	{
		
		if(repo.existsByFlightDate(detail.getDate()))
		{
			List<FlightDetail> getalldetail=repo.findAllByFlightDate(detail.getDate());
			List<FlightDetail> FlightList=new ArrayList<>();
			for(FlightDetail fd:getalldetail)
			{
				if(detail.getSource().equalsIgnoreCase(fd.getSource()) && detail.getDestination().equalsIgnoreCase(fd.getDestination()) && detail.getDate().equals(fd.getDate()) && detail.getFlightClass().equalsIgnoreCase(""))
				{
					FlightList.add(fd);
				}
				else if(detail.getSource().equalsIgnoreCase(fd.getSource()) && detail.getDestination().equalsIgnoreCase(fd.getDestination()) && detail.getDate().equals(fd.getDate()) && detail.getFlightClass().equalsIgnoreCase(fd.getFlightClass()))
				{
					FlightList.add(fd);
				}
			}
			if(FlightList.isEmpty())
			{
				throw new Exception("failed");
			}
			else {
			return FlightList;
			}
		}
		else
		{
			System.out.println(detail.getDate());
			throw new Exception("failed");
		}
	}
	
	@GetMapping("/checkBYCondition")
	public String check(@RequestParam String date,@RequestParam int FlightNumber)
	{
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
