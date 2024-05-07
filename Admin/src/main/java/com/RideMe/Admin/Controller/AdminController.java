package com.RideMe.Admin.Controller;

import com.RideMe.Admin.Dto.LoginRequest;
import com.RideMe.Admin.Model.Admin;
import com.RideMe.Admin.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/Login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request){
        return adminService.login(request);
    }
    @PostMapping("/add-admin")
    public ResponseEntity<Object> AddAdmin(@RequestBody Admin admin){
        return adminService.AddAdmin(admin);
    }
}
