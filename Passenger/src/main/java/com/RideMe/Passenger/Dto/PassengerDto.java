package com.RideMe.Passenger.Dto;

import com.RideMe.Passenger.Model.Passenger;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PassengerDto {
    private Integer id;
    private String name;
    private String email;
    private String phoneNumber;
    private String status;

    public static PassengerDto toDto(Passenger entity){
        return PassengerDto.builder()
        .id(entity.getId())
        .name(entity.getName())
        .email(entity.getEmail())
        .phoneNumber(entity.getPhoneNumber())
        .status(entity.getStatus() != null ? entity.getStatus().getName() : null)
        .build();
    }
}
