package com.RideMe.Driver.Repository;

import com.RideMe.Driver.Model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DriverRepo extends JpaRepository<Driver, Integer> {
    @Query("SELECT a FROM Driver a WHERE a.email = ?1")
    Optional<Driver> findByEmail(String email);
}
