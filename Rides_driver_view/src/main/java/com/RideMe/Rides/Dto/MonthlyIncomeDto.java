package com.RideMe.Rides.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyIncomeDto {
    private int DriverId;
    private int Month;
}
