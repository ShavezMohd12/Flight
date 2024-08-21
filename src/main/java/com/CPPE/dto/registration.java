package com.CPPE.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.CPPE.Credential.LoginCredential;

@Entity
@Table(name="registration")
public class registration {
	
	@Id
	
	Long adhar;
	String name;
	@Column(unique=true)
	String email;
	@Column(unique=true)
	Long phone;
	String password;
	public registration() {
	
	}
	public registration(Long adhar, String name, String email, Long phone, String password) {
		super();
		this.adhar = adhar;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}
	private void setAdhar(Long adhar) {
		this.adhar = adhar;
	}
	private void setName(String name) {
		this.name = name;
	}
	private void setEmail(String email) {
		this.email = email;
		
	}
	private void setPhone(Long phone) {
		this.phone = phone;
	}
	private void setPassword(String password) {
		this.password = password;
	}
	public Long getAdhar() {
		return adhar;
	}
	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public Long getPhone() {
		return phone;
	}
	public String getPassword() {
		return password;
	}
	@Override
	public String toString() {
		return "Regitration [Adhar=" + adhar + ", name=" + name + ", email=" + email + ", phone=" + phone
				+ ", password=" + password + "]";
	}
	
	
	
	
	
}
