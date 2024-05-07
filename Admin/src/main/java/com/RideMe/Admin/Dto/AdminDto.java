package com.RideMe.Admin.Dto;

import com.RideMe.Admin.Model.Admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDto {
    private Integer id;
    private String name;
    private String email;

    public static AdminDto toDto(Admin entity){
        return AdminDto.builder()
        .id(entity.getId())
        .name(entity.getName())
        .email(entity.getEmail())
        .build();
    }
}
