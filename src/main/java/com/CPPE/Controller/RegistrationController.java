package com.CPPE.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CPPE.Credential.LoginCredential;
import com.CPPE.JpaRepository.LoginRepo;
import com.CPPE.JpaRepository.RegisterRepo;
import com.CPPE.dto.registration;

@RestController
@CrossOrigin(origins = { "http://localhost:3000"})
public class RegistrationController {

	@Autowired
	RegisterRepo Rrepo;
	
	@Autowired
	LoginRepo Lrepo;
	
	//this function is used to register the user details
		@PostMapping("/register")
		public String register(@RequestBody registration register)
		{
			
			try {
				if(Rrepo.existsById(register.getAdhar())==false) {
			 Rrepo.save(register);
			LoginCredential log1=new LoginCredential(register.getEmail(),register.getPassword());
			Lrepo.save(log1);
			return "success";
				}
				else
				{
					return "failed";
				}
		
			}
			catch(Exception ex)
			{
				return "failed";
			}
			
		}
		
	// this function will send the detail of user with matching email id
		@GetMapping("/getDetail/{email}")
		public registration getName(@PathVariable String email)
		{
			
			registration detail=Rrepo.findByEmailId(email);
			return detail;
		
			
		}
		
}
