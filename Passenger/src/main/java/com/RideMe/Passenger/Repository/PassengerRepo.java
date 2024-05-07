package com.RideMe.Passenger.Repository;

import com.RideMe.Passenger.Model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PassengerRepo extends JpaRepository<Passenger, Integer> {
    @Query("SELECT a FROM Passenger a WHERE a.email = ?1")
    Optional<Passenger> findByEmail(String email);

    @Query("SELECT a FROM Passenger a WHERE a.statusId = ?1")
    Optional<List<Passenger>> findByStatusId(int id);
}
