package com.CPPE.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CPPE.dto.registration;

public interface RegisterRepo extends JpaRepository<registration,Long> {

}
