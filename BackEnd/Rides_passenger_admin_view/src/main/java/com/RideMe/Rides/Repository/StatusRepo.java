package com.RideMe.Rides.Repository;

import com.RideMe.Rides.Model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepo extends JpaRepository<Status, Integer> {

}
