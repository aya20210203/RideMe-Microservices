package com.RideMe.Admin.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.RideMe.Admin.Model.Admin;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    @Query("SELECT a FROM Admin a WHERE a.email = ?1")
    Optional<Admin> findByEmail(String email);
}
