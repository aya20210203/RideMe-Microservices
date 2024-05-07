package com.RideMe.Driver.Repository;

import com.RideMe.Driver.Model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DriverRepo extends JpaRepository<Driver, Integer> {
    @Query("SELECT distinct cityId FROM Driver where available = true")
    List<Integer> getAvailableCityIds();

    @Query("SELECT distinct carType FROM Driver where available = true")
    List<String> getAvailableCarTypes();

    @Query("SELECT driver FROM Driver driver where driver.available = true")
    List<Driver> getAvailableDrivers();

    @Query("SELECT a FROM Driver a WHERE a.statusId = ?1")
    Optional<List<Driver>> findByStatusId(int id);
}
