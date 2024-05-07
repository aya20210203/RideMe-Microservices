package com.RideMe.Driver.Model;
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

@Table (name = "Driver")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Driver
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "car_type")
    private String carType;

    @Column(name = "smoking")
    private boolean smoking;

    @Column(name = "region")
    private String region;

    @Column(name = "available")
    private boolean available;

    @Column(name = "average_rating")
    private double average_rating;

    @Column(name = "status_id", insertable = false, updatable = false)
    private Integer statusId;

    @Column(name = "city_id", insertable = false, updatable = false)
    private Integer cityId;

    @ManyToOne
    private Status status;

    @ManyToOne
    private City City;
}
