package com.CPPE.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CPPE.Credential.LoginCredential;

public interface LoginRepo extends JpaRepository<LoginCredential,String>{

}
