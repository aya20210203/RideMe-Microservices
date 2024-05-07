package com.RideMe.Rides.Dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyIncomeDto {
    private int DriverId;
    private String DateString;
}
