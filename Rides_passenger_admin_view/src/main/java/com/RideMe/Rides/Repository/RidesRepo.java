package com.RideMe.Rides.Repository;

import com.RideMe.Rides.Model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RidesRepo extends JpaRepository<Ride, Integer> {
    @Query("SELECT a FROM Ride a WHERE a.statusId = ?1 AND a.driverId = ?2")
    Optional<List<Ride>> findByDriverIdAndStatusId(int StatusId, int driverId);
}
