package com.RideMe.Rides.Service;

import com.RideMe.Rides.Model.Ride;
import com.RideMe.Rides.Repository.RidesRepo;
import com.RideMe.Rides.Repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RidesService {

    @Autowired
    private RidesRepo ridesRepo;

    @Autowired
    private StatusRepo statusRepo;

    public ResponseEntity<Object> getAllRides(){
        List<Ride> rides = ridesRepo.findAll();
        List<Map<String, Object>> response = rides.stream()
                .map(ride -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("RideId", ride.getId());
                    Mapped.put("DriverName", ride.getDriverName());
                    Mapped.put("PassengerName", ride.getPassengerName());
                    Mapped.put("RideSource", ride.getSource());
                    Mapped.put("RideDestination", ride.getDestination());
                    Mapped.put("Status", ride.getStatus().getName());
                    Mapped.put("Price", ride.getPrice());
                    Mapped.put("Rating", ride.getRating());
                    Mapped.put("Feedback", ride.getFeedback());
                    Mapped.put("RideDate", ride.getDateTime());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> getPassengerRideHistory(int PassengerId){
        List<Ride> rides = ridesRepo.findAll().stream().filter(r -> r.getPassengerId() ==  PassengerId).collect(Collectors.toList());
        List<Map<String, Object>> response = rides.stream()
                .map(ride -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("RideId", ride.getId());
                    Mapped.put("Driver", ride.getDriverName());
                    Mapped.put("DriverPhoneNumber", ride.getDriverNumber());
                    Mapped.put("Passenger", ride.getPassengerName());
                    Mapped.put("Source", ride.getSource());
                    Mapped.put("Destination", ride.getDestination());
                    Mapped.put("Status", ride.getStatus().getName());
                    Mapped.put("Price", ride.getPrice());
                    Mapped.put("Rating", ride.getRating());
                    Mapped.put("Feedback", ride.getFeedback());
                    Mapped.put("Date", ride.getDateTime());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> getCurrentRideStatusPassenger(int PassengerId){
        List<Ride> rides = ridesRepo.findAll().stream().filter(r -> r.getPassengerId() == PassengerId && r.getStatusId() == 3).collect(Collectors.toList());
        List<Map<String, Object>> response = rides.stream()
                .map(ride -> {
                    Map<String, Object> Mapped = new HashMap<>();
                    Mapped.put("RideId", ride.getId());
                    Mapped.put("DriverId", ride.getDriverId());
                    Mapped.put("Driver", ride.getDriverName());
                    Mapped.put("DriverPhoneNumber", ride.getDriverNumber());
                    Mapped.put("Passenger", ride.getPassengerName());
                    Mapped.put("Source", ride.getSource());
                    Mapped.put("Destination", ride.getDestination());
                    Mapped.put("Status", ride.getStatus().getName());
                    Mapped.put("Price", ride.getPrice());
                    Mapped.put("Rating", ride.getRating());
                    Mapped.put("Feedback", ride.getFeedback());
                    Mapped.put("Date", ride.getDateTime());
                    return Mapped;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> calculateDriverAverageRating(int DriverId){
        Optional<List<Ride>> driverCompletedRidesOptional = ridesRepo.findByDriverIdAndStatusId(4, DriverId);
        int ridesCount = 0; double avg = 0;
        if(driverCompletedRidesOptional.isPresent()) {
            List<Ride> driverCompletedRides = driverCompletedRidesOptional.get();
            for (Ride ride : driverCompletedRides) {
                ridesCount+=1;
                avg+=ride.getRating();
            }
            avg/=ridesCount;
        }
        return ResponseEntity.ok(avg);
    }

    public ResponseEntity<Object> requestRide(Ride ride){
        ride.setRating(-1);
        ride.setFeedback("");
        ride.setStatus(statusRepo.findById(1).get());
        ride.setStatusId(1);
        ride.setDateTime(LocalDateTime.now());
        ridesRepo.save(ride);
        Object response = new Object(){
            public int RideId = ride.getId();
            public String DriverName = ride.getDriverName();
            public String PassengerName = ride.getPassengerName();
            public String PassengerNumber = ride.getPassengerNumber();
            public String DriverNumber = ride.getDriverNumber();
            public String RideSource = ride.getSource();
            public String RideDestination = ride.getDestination();
            public String Status = ride.getStatus().getName();
            public Double Price = ride.getPrice();
            public Double Rating = ride.getRating();
            public String Feedback = ride.getFeedback();
            public LocalDateTime RideDate = ride.getDateTime();
                };
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> confirmPayment(int id){
        Optional<Ride> rideOptional = ridesRepo.findById(id);
        if (rideOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }

        Ride ride = rideOptional.get();
        ride.setStatus(statusRepo.findById(4).get());
        ride.setStatusId(4);
        ridesRepo.save(ride);
        return ResponseEntity.ok(ride);
    }

    public ResponseEntity<Object> feedback(int id, String feedback){
        Optional<Ride> rideOptional = ridesRepo.findById(id);
        if (rideOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }

        Ride ride = rideOptional.get();
        ride.setFeedback(feedback);
        ridesRepo.save(ride);
        return ResponseEntity.ok(ride);
    }

    public ResponseEntity<Object> rate(int id, Double rate){
        Optional<Ride> rideOptional = ridesRepo.findById(id);
        if (rideOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }

        Ride ride = rideOptional.get();
        ride.setRating(rate);
        ridesRepo.save(ride);
        return ResponseEntity.ok(ride);
    }

    public ResponseEntity<Object> CancelRide(int id){
        Optional<Ride> rideOptional = ridesRepo.findById(id);
        if (rideOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }

        Ride ride = rideOptional.get();
        ridesRepo.delete(ride);
        return ResponseEntity.ok(ride);
    }
}