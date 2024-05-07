package com.RideMe.Rides.Service;

import com.RideMe.Rides.Dto.DailyIncomeDto;
import com.RideMe.Rides.Dto.MonthlyIncomeDto;
import com.RideMe.Rides.Model.Ride;
import com.RideMe.Rides.Model.Status;
import com.RideMe.Rides.Repository.RidesRepo;
import com.RideMe.Rides.Repository.StatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@Service
public class RidesService {
    @Autowired
    private RidesRepo ridesRepo;

    @Autowired
    private StatusRepo statusRepo;

    public ResponseEntity<Object> getRideStatus(int rideId){
        return ResponseEntity.ok(statusRepo.findById(ridesRepo.getById(rideId).getStatusId()));
    }

    public ResponseEntity<Object> getRequestedRides(int driverId){
        return ResponseEntity.ok(ridesRepo.findByDriverIdAndStatusId(1, driverId));
    }

    public ResponseEntity<Object> getCurrentRideStatusDriver(int DriverId){
        return ResponseEntity.ok(ridesRepo.findByDriverIdAndStatusId(3, DriverId));
    }

    public ResponseEntity<Object> getDriverDailyIncome(DailyIncomeDto dto){
        Optional<List<Ride>> ridesOptional = ridesRepo.findByDriverIdAndStatusId(4, dto.getDriverId());
        LocalDate localDate = LocalDate.parse(dto.getDateString(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        double income = 0;
        if (ridesOptional.isPresent()) {
            List<Ride> rides = ridesOptional.get();
            for (Ride ride : rides) {
                if(ride.getDateTime().toLocalDate().compareTo(localDate) == 0)
                    income += ride.getPrice();
            }
        }
        return ResponseEntity.ok(income);
    }

    public ResponseEntity<Object> getDriverMonthlyIncome(MonthlyIncomeDto dto) {
        Optional<List<Ride>> ridesOptional = ridesRepo.findByDriverIdAndStatusId(4, dto.getDriverId());
        double income = 0;
        if (ridesOptional.isPresent()) {
            List<Ride> rides = ridesOptional.get();
            for (Ride ride : rides) {
                if (ride.getDateTime().toLocalDate().getMonthValue() == dto.getMonth() )
                    income += ride.getPrice();
            }
        }
        return ResponseEntity.ok(income);
    }

    public ResponseEntity<Object> changeRideStatus(int id, int StatusId){
        Optional<Ride> optionalPassenger = ridesRepo.findById(id);
        if (optionalPassenger.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Ride ride = optionalPassenger.get();

        Optional<Status> optionalStatus = statusRepo.findById(StatusId);
        if (optionalStatus.isEmpty()) { return ResponseEntity.notFound().build(); }
        ride.setStatus(optionalStatus.get());
        ride.setStatusId(StatusId);
        ridesRepo.save(ride);
        return ResponseEntity.ok(ride);
    }

    public ResponseEntity<Object> acceptRide(int id){
        // reject other driver rides
        int driverId = ridesRepo.findById(id).get().getDriverId();
        List<Ride> driverOtherRides = ridesRepo.findByDriverIdAndStatusId(1, driverId).get();
        for (Ride ride : driverOtherRides) {
            changeRideStatus(ride.getId(), 2);
        }
        // reject other passenger rides
        int PassengerId = ridesRepo.findById(id).get().getPassengerId();
        List<Ride> PassengerOtherRides = ridesRepo.findByPassengerIdAndStatusId(1, PassengerId).get();
        for (Ride ride : PassengerOtherRides) {
            changeRideStatus(ride.getId(), 2);
        }
        // accept this ride
        return changeRideStatus(id, 3);
    }

    public ResponseEntity<Object> rejectRide(int id){
        return changeRideStatus(id, 2);
    }
}