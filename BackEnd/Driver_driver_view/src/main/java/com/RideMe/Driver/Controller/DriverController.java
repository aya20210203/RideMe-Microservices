package com.RideMe.Driver.Controller;

import com.RideMe.Driver.Dto.LocationDto;
import com.RideMe.Driver.Dto.LoginRequest;
import com.RideMe.Driver.Model.Driver;
import com.RideMe.Driver.Service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/Driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/get-cities")
    public ResponseEntity<Object> getCities(){ return driverService.getCities(); }

    @PostMapping("/add-driver")
    public ResponseEntity<Object> AddDriver(@RequestBody Driver driver){
        return driverService.addDriver(driver);
    }

    @PostMapping("/Login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request){
        return driverService.login(request);
    }

    @PutMapping("/available")
    public ResponseEntity<Object> available(@RequestParam int id){
        return driverService.available(id);
    }

    @PutMapping("/not-available")
    public ResponseEntity<Object> notAvailable(@RequestParam int id){
        return driverService.notAvailable(id);
    }

    @PutMapping("/change-location")
    public ResponseEntity<Object> changeLocation(@RequestBody LocationDto dto){
        return driverService.changeLocation(dto.getDriverId(), dto.getCityId(), dto.getRegion());
    }
}
