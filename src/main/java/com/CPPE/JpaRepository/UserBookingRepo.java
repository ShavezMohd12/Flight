
package com.CPPE.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CPPE.payment.UserBookingDetail;

public interface UserBookingRepo extends JpaRepository<UserBookingDetail, String> {
    // Additional query methods (if needed) can be defined here
	List<UserBookingDetail> findAllByEmail(String email);

	Long deleteByEmail(String email);
}