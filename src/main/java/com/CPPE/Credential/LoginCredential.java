package com.CPPE.Credential;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Login_Credential")
public class LoginCredential {
	
	@Id
	private String username;
	private String password;
	
	
	public LoginCredential() {
		
		
	}
	public LoginCredential(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	private void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	private void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "LoginCredential [username=" + username + ", Password=" + password + "]";
	}
	
	
}
