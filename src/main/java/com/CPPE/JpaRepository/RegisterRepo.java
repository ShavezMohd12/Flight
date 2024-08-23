package com.CPPE.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.CPPE.dto.registration;

public interface RegisterRepo extends JpaRepository<registration,Long> {
	
	@Query(nativeQuery=true,value="SELECT * FROM flightbooking.registration where email=:emailId")
	registration findByEmailId(@Param("emailId") String emailId); 
	

}
