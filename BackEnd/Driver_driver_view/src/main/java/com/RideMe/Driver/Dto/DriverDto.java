package com.RideMe.Driver.Dto;

import com.RideMe.Driver.Model.Driver;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverDto {
    private Integer Id;
    private String Name;
    private String Email;
    private String PhoneNumber;
    private String CarType;
    private boolean Smoking;
    private String Region;
    private boolean Available;
    private double Rating;
    private String Status;
    private String City;

    public static DriverDto toDto(Driver entity){
        return DriverDto.builder()
                .Id(entity.getId())
                .Name(entity.getName())
                .Email(entity.getEmail())
                .PhoneNumber(entity.getPhoneNumber())
                .CarType(entity.getCarType())
                .Smoking(entity.isSmoking())
                .Region(entity.getRegion())
                .Rating(entity.getAverage_rating())
                .Email(entity.getEmail())
                .Status(entity.getStatus() != null ? entity.getStatus().getName() : null)
                .City(entity.getCity() != null ? entity.getCity().getName() : null)
                .build();
    }
}
