package com.CPPE.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CPPE.payment.Card_detail;

public interface CardDetailRepo extends JpaRepository<Card_detail,String> {

	boolean existsByName(String Name);
		

	boolean existsByExpiryDate(String expiryDate);
	boolean existsByCvv(String Cvv);
}
