package com.RideMe.Rides.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table (name = "Ride")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ride {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "passenger_id")
    private Integer passengerId;

    @Column(name = "passenger_name")
    private String passengerName;

    @Column(name = "passenger_number")
    private String passengerNumber;

    @Column(name = "driver_id")
    private Integer driverId;

    @Column(name = "driver_name")
    private String driverName;

    @Column(name = "driver_number")
    private String driverNumber;

    @Column(name = "source")
    private String source;

    @Column(name = "destination")
    private String destination;

    @Column(name = "price")
    private double price;

    @Column(name = "rating")
    private double rating;

    @Column(name = "feedback")
    private String feedback;

    @Column(name = "date")
    private LocalDateTime dateTime;

    @Column(name = "status_id", insertable = false, updatable = false)
    private Integer statusId;

    @ManyToOne
    private Status status;
}
