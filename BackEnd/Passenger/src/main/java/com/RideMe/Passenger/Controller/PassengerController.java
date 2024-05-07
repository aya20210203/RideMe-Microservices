package com.RideMe.Passenger.Controller;

import com.RideMe.Passenger.Dto.LoginRequest;
import com.RideMe.Passenger.Model.Passenger;
import com.RideMe.Passenger.Service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Passenger")
public class PassengerController {

    @Autowired
    private PassengerService passengerService;

    @GetMapping("/get-waiting-passengers")
    public ResponseEntity<Object> getWaitingPassengers(){
        return passengerService.getWaitingPassengers();
    }

    @PostMapping("/add-passenger")
    public ResponseEntity<Object> addPassenger(@RequestBody Passenger passenger){
        return passengerService.addPassenger(passenger);
    }

    @PostMapping("/Login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request){
        return passengerService.login(request);
    }

    @PutMapping("/accept-passenger")
    public ResponseEntity<Object> acceptPassenger(@RequestParam int id) { return passengerService.acceptPassenger(id); }

    @PutMapping("/reject-passenger")
    public ResponseEntity<Object> rejectPassenger(@RequestParam int id) { return passengerService.rejectPassenger(id); }
}
