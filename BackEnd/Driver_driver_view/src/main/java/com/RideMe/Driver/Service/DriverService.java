package com.RideMe.Driver.Service;

import com.RideMe.Driver.Dto.DriverDto;
import com.RideMe.Driver.Model.City;
import com.RideMe.Driver.Model.Driver;
import com.RideMe.Driver.Model.Status;
import com.RideMe.Driver.Repository.CityRepo;
import com.RideMe.Driver.Repository.DriverRepo;
import com.RideMe.Driver.Dto.LoginRequest;
import com.RideMe.Driver.Repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private CityRepo cityRepo;

    @Autowired
    private StatusRepo statusRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> getCities() {
        List<City> cities = cityRepo.findAll();
        return ResponseEntity.ok(cities);
    }

    public ResponseEntity<Object> addDriver(Driver driver){
        driver.setAverage_rating(-1);
        driver.setAvailable(false);
        driver.setStatus(statusRepo.findById(1).get());
        driver.setStatusId(1);
        driver.setCity(cityRepo.findById(driver.getCityId()).get());
        driver.setPassword(passwordEncoder.encode(driver.getPassword()));
        driverRepo.save(driver);
        return ResponseEntity.ok("");
    }

    public ResponseEntity<Object> login(LoginRequest request){
        if (request.getEmail() == null || request.getEmail().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        Optional<Driver> optionalDriver = driverRepo.findByEmail(request.getEmail());
        if (optionalDriver.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        Driver driver = optionalDriver.get();
        if (!passwordEncoder.matches(request.getPassword(), driver.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        return ResponseEntity.ok(DriverDto.toDto(driver)); // 200 OK
    }

    public ResponseEntity<Object> available(int id){
        Optional<Driver> optionalDriver = driverRepo.findById(id);
        if (optionalDriver.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        Driver driver = optionalDriver.get();
        driver.setAvailable(true);
        driverRepo.save(driver);
        return ResponseEntity.ok(driver);
    }

    public ResponseEntity<Object> notAvailable(int id){
        Optional<Driver> optionalDriver = driverRepo.findById(id);
        if (optionalDriver.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Driver driver = optionalDriver.get();
        driver.setAvailable(false);
        driverRepo.save(driver);
        return ResponseEntity.ok(driver);
    }

    public ResponseEntity<Object> changeLocation(int id, int CityId, String region){
        Optional<Driver> optionalDriver = driverRepo.findById(id);
        if (optionalDriver.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Driver driver = optionalDriver.get();

        Optional<City> optionalCity = cityRepo.findById(CityId);
        if (optionalCity.isEmpty()) { return ResponseEntity.notFound().build(); }
        driver.setCity(optionalCity.get());
        driver.setCityId(CityId);
        driver.setRegion(region);
        driverRepo.save(driver);
        return ResponseEntity.ok(driver);
    }


}