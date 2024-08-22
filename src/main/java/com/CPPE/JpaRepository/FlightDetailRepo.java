package com.CPPE.JpaRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.CPPE.FlightDetail.FlightDetail;

public interface FlightDetailRepo extends JpaRepository<FlightDetail,String> {

	boolean existsByFlightDate(String flightDate);

	List<FlightDetail> findAllByFlightDate(String date);;
}
