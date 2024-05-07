package com.RideMe.Rides.Controller;

import com.RideMe.Rides.Dto.DailyIncomeDto;
import com.RideMe.Rides.Dto.MonthlyIncomeDto;
import com.RideMe.Rides.Service.RidesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Rides")
public class RidesController {

    @Autowired
    private RidesService ridesService;

    @GetMapping("/get-ride-status")
    public ResponseEntity<Object> getRideStatus(@RequestParam int rideId){ return ridesService.getRideStatus(rideId); }

    @GetMapping("/get-requested-rides")
    public ResponseEntity<Object> getRequestedRides(@RequestParam int driverId){ return ridesService.getRequestedRides(driverId); }

    @GetMapping("/get-current-ride-status-driver")
    public ResponseEntity<Object> getCurrentRideStatusDriver(@RequestParam int driverId){ return ridesService.getCurrentRideStatusDriver(driverId); }

    @PostMapping("/get-driver-daily-income")
    public ResponseEntity<Object> getDriverDailyIncome(@RequestBody DailyIncomeDto dto){ return ridesService.getDriverDailyIncome(dto); }

    @PostMapping("/get-driver-monthly-income")
    public ResponseEntity<Object> getDriverMonthlyIncome(@RequestBody MonthlyIncomeDto dto){ return ridesService.getDriverMonthlyIncome(dto); }

    @PutMapping("/accept-ride")
    public ResponseEntity<Object> acceptRide(int rideId){ return ridesService.acceptRide(rideId); }

    @PutMapping("/reject-ride")
    public ResponseEntity<Object> rejectRide(int rideId){ return ridesService.rejectRide(rideId); }
}