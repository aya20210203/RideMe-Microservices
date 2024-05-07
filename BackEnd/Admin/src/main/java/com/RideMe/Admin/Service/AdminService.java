package com.RideMe.Admin.Service;

import com.RideMe.Admin.Dto.AdminDto;
import com.RideMe.Admin.Dto.LoginRequest;
import com.RideMe.Admin.Model.Admin;
import com.RideMe.Admin.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<Object> login(LoginRequest request){
        if (request.getEmail() == null || request.getEmail().isEmpty() || request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(request.getEmail());
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
        Admin admin = optionalAdmin.get();
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
        return ResponseEntity.ok(AdminDto.toDto(admin)); // 200 OK
    }

    public ResponseEntity<Object> AddAdmin(Admin admin){
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepo.save(admin);
        return ResponseEntity.ok("");
    }
}
