package com.RideMe.Driver.Controller;

import com.RideMe.Driver.Model.Driver;
import com.RideMe.Driver.Service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/Driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/get-available-cities")
    public ResponseEntity<Object> getAvailableCities(){
        return driverService.getAvailableCities();
    }

    @GetMapping("/get-available-car-types")
    public ResponseEntity<Object> getAvailableCarTypes(){
        return driverService.getAvailableCarTypes();
    }

    @GetMapping("/get-available-drivers")
    public ResponseEntity<Object> getAvailableDrivers(){
        return driverService.getAvailableDrivers();
    }

    @GetMapping("/get-waiting-drivers")
    public ResponseEntity<Object> getWaitingDrivers(){
        return driverService.getWaitingDrivers();
    }

    @GetMapping("/get-accepted-and-blocked-drivers")
    public ResponseEntity<Object> getAcceptedAndBlockedDrivers(){
        return driverService.getAcceptedAndBlockedDrivers();
    }

    @GetMapping("/get-filtered-drivers")
    public ResponseEntity<Object> getFilteredDrivers(@RequestParam Optional<String> carType, Optional<Boolean> smoking, Optional<String> city){
        return driverService.getFilteredDrivers(carType, smoking, city);
    }

    @PutMapping("/change-driver-avg-rating")
    public ResponseEntity<Object> changeDriverAvgRating(int id, double rate){
        return driverService.changeDriverAvgRating(id, rate);
    }

    @PutMapping("/accept-driver")
    public ResponseEntity<Object> acceptDriver(@RequestParam int id){
        return driverService.acceptDriver(id);
    }

    @PutMapping("/reject-driver")
    public ResponseEntity<Object> rejectDriver(@RequestParam int id){
        return driverService.rejectDriver(id);
    }

    @PutMapping("/block-driver")
    public ResponseEntity<Object> blockDriver(@RequestParam int id){
        return driverService.blockDriver(id);
    }

    @PutMapping("/unblock-driver")
    public ResponseEntity<Object> unblockDriver(@RequestParam int id){
        return driverService.unblockDriver(id);
    }
}
