package com.RideMe.Driver.Service;

import com.RideMe.Driver.Model.City;
import com.RideMe.Driver.Model.Driver;
import com.RideMe.Driver.Model.Status;
import com.RideMe.Driver.Repository.CityRepo;
import com.RideMe.Driver.Repository.DriverRepo;
import com.RideMe.Driver.Repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private CityRepo cityRepo;

    @Autowired
    private StatusRepo statusRepo;

    public ResponseEntity<Object> getAvailableCities() {
        List<Integer> cityIds = driverRepo.getAvailableCityIds();
        List<City> cities = new ArrayList<>();
        for (int cityId : cityIds) {
            City city = cityRepo.getById(cityId);
            cities.add(city);
        }
        return ResponseEntity.ok(cities);
    }

    public ResponseEntity<Object> getAvailableCarTypes() {
        List<String> carTypes = driverRepo.getAvailableCarTypes();
        return ResponseEntity.ok(carTypes);
    }

    public ResponseEntity<Object> getAvailableDrivers() {
        List<Driver> drivers = driverRepo.getAvailableDrivers();
        List<Map<String, Object>> response = drivers.stream()
                .map(driver -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("id", driver.getId());
                    Mapped.put("name", driver.getName());
                    Mapped.put("number", driver.getPhoneNumber());
                    Mapped.put("car", driver.getCarType());
                    Mapped.put("city", driver.getCity().getName());
                    Mapped.put("region", driver.getRegion());
                    Mapped.put("smoking", driver.isSmoking());
                    Mapped.put("rating", driver.getAverage_rating());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> getWaitingDrivers(){
         List<Driver> drivers = driverRepo.findByStatusId(1).get();
         List<Map<String, Object>> response = drivers.stream()
                .map(driver -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("Id", driver.getId());
                    Mapped.put("Name", driver.getName());
                    Mapped.put("Email", driver.getEmail());
                    Mapped.put("PhoneNumber", driver.getPhoneNumber());
                    Mapped.put("Status", driver.getStatus().getName());
                    Mapped.put("CarType", driver.getCarType());
                    Mapped.put("City", driver.getCity().getName());
                    Mapped.put("Region", driver.getRegion());
                    Mapped.put("Rating", driver.getAverage_rating());
                    Mapped.put("IsSmoking", driver.isSmoking());
                    Mapped.put("IsAvailable", driver.isAvailable());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> getAcceptedAndBlockedDrivers(){
        List<Driver> acceptedDrivers =  driverRepo.findByStatusId(2).get();
        List<Driver> blockedDrivers =  driverRepo.findByStatusId(4).get();
        acceptedDrivers.addAll(blockedDrivers);
        List<Map<String, Object>> response = acceptedDrivers.stream()
                .map(driver -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("Id", driver.getId());
                    Mapped.put("Name", driver.getName());
                    Mapped.put("PhoneNumber", driver.getPhoneNumber());
                    Mapped.put("Status", driver.getStatus().getName());
                    Mapped.put("CarType", driver.getCarType());
                    Mapped.put("City", driver.getCity().getName());
                    Mapped.put("Region", driver.getRegion());
                    Mapped.put("Rating", driver.getAverage_rating());
                    Mapped.put("IsSmoking", driver.isSmoking());
                    Mapped.put("IsAvailable", driver.isAvailable());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(acceptedDrivers);
    }

    public ResponseEntity<Object> getFilteredDrivers(Optional<String> CarTypeOptional, Optional<Boolean> smokingOptional, Optional<String> CityNameOptional){
        List<Driver> drivers = driverRepo.getAvailableDrivers();
        if(CarTypeOptional.isPresent())
            drivers = drivers.stream().filter(d -> d.getCarType().equals(CarTypeOptional.get())).toList();
        if(smokingOptional.isPresent())
            drivers = drivers.stream().filter(d -> d.isSmoking() == smokingOptional.get()).toList();
        if(CityNameOptional.isPresent())
            drivers = drivers.stream().filter(d -> d.getCity().getName().equals(CityNameOptional.get())).toList();
        List<Map<String, Object>> response = drivers.stream()
                .map(driver -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("id", driver.getId());
                    Mapped.put("name", driver.getName());
                    Mapped.put("number", driver.getPhoneNumber());
                    Mapped.put("car", driver.getCarType());
                    Mapped.put("city", driver.getCity().getName());
                    Mapped.put("region", driver.getRegion());
                    Mapped.put("smoking", driver.isSmoking());
                    Mapped.put("rating", driver.getAverage_rating());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> changeDriverAvgRating(int id, double rate){
        Driver driver = driverRepo.getById(id);
        driver.setAverage_rating(rate);
        driverRepo.save(driver);
        return ResponseEntity.ok("");
    }

    public ResponseEntity<Object> changeDriverStatusId(int id, int StatusId){
        Optional<Driver> optionalPassenger = driverRepo.findById(id);
        if (optionalPassenger.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Driver driver = optionalPassenger.get();

        Optional<Status> optionalStatus = statusRepo.findById(StatusId);
        if (optionalStatus.isEmpty()) { return ResponseEntity.notFound().build(); }
        driver.setStatus(optionalStatus.get());
        driver.setStatusId(StatusId);
        driverRepo.save(driver);
        return ResponseEntity.ok(driver);
    }

    public ResponseEntity<Object> acceptDriver(int id){ return changeDriverStatusId(id, 2); }

    public ResponseEntity<Object> rejectDriver(int id){ return changeDriverStatusId(id, 3); }

    public ResponseEntity<Object> blockDriver(int id){ return changeDriverStatusId(id, 4); }

    public ResponseEntity<Object> unblockDriver(int id){ return acceptDriver(id); }
}