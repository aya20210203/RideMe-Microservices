package com.RideMe.Passenger.Service;

import com.RideMe.Passenger.Dto.LoginRequest;
import com.RideMe.Passenger.Dto.PassengerDto;
import com.RideMe.Passenger.Model.Passenger;
import com.RideMe.Passenger.Model.Status;
import com.RideMe.Passenger.Repository.PassengerRepo;
import com.RideMe.Passenger.Repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PassengerService {

    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private StatusRepo statusRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> getWaitingPassengers(){
        return ResponseEntity.ok(passengerRepo.findByStatusId(1).get());
    }

    public ResponseEntity<Object> addPassenger(Passenger passenger){
        passenger.setStatus(statusRepo.findById(1).get());
        passenger.setStatusId(1);
        passenger.setPassword(passwordEncoder.encode(passenger.getPassword()));
        passengerRepo.save(passenger);
        return ResponseEntity.ok("");
    }

    public ResponseEntity<Object> login(LoginRequest request){
        if (request.getEmail() == null || request.getEmail().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        Optional<Passenger> optionalPassenger = passengerRepo.findByEmail(request.getEmail());
        if (optionalPassenger.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        Passenger passenger = optionalPassenger.get();
        if (!passwordEncoder.matches(request.getPassword(), passenger.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        return ResponseEntity.ok(PassengerDto.toDto(passenger)); // 200 OK
    }

    public ResponseEntity<Object> changePassengerStatusId(int id, int StatusId){
        Optional<Passenger> optionalPassenger = passengerRepo.findById(id);
        if (optionalPassenger.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Passenger passenger = optionalPassenger.get();

        Optional<Status> optionalStatus = statusRepo.findById(StatusId);
        if (optionalStatus.isEmpty()) { return ResponseEntity.notFound().build(); }
        passenger.setStatus(optionalStatus.get());
        passenger.setStatusId(StatusId);
        passengerRepo.save(passenger);
        return ResponseEntity.ok(passenger);
    }

    public ResponseEntity<Object> acceptPassenger(int id){
        return changePassengerStatusId(id, 2);
    }

    public ResponseEntity<Object> rejectPassenger(int id){
        return changePassengerStatusId(id, 3);
    }
}