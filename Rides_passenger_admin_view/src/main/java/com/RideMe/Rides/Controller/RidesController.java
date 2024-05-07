package com.RideMe.Rides.Controller;

import com.RideMe.Rides.Model.Ride;
import com.RideMe.Rides.Service.RidesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/Rides")
public class RidesController {

    @Autowired
    private RidesService ridesService;

    @GetMapping("/get-all-rides")
    public ResponseEntity<Object> getAllRides(){
        return ridesService.getAllRides();
    }

    @GetMapping("/get-passenger-ride-history")
    public ResponseEntity<Object> getPassengerRideHistory(@RequestParam int PassengerId){
        return ridesService.getPassengerRideHistory(PassengerId);
    }

    @GetMapping("/get-current-ride-status-passenger")
    public ResponseEntity<Object> getCurrentRideStatusPassenger(@RequestParam int PassengerId){
        return ridesService.getCurrentRideStatusPassenger(PassengerId);
    }

    @PostMapping("/calculate-driver-avg-rating")
    public ResponseEntity<Object> calculateDriverAvgRating(@RequestParam int DriverId){
        return ridesService.calculateDriverAverageRating(DriverId);
    }

    @PostMapping("/request-ride")
    public ResponseEntity<Object> requestRide(@RequestBody Ride ride){
        return ridesService.requestRide(ride);
    }

    @PutMapping("/confirm-payment")
    public ResponseEntity<Object> confirmPayment(@RequestParam int id){
        return ridesService.confirmPayment(id);
    }

    @PutMapping("/feedback")
    public ResponseEntity<Object> feedback(@RequestParam int id, String feedback){
        return ridesService.feedback(id, feedback);
    }

    @PutMapping("/rate")
    public ResponseEntity<Object> rate(@RequestParam int id, Double rate){
        return ridesService.rate(id, rate);
    }

    @DeleteMapping("/cancel-ride")
    public ResponseEntity<Object> cancelRide(@RequestParam int id){
        return ridesService.CancelRide(id);
    }
}