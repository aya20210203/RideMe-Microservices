package com.RideMe.Rides;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@EnableAspectJAutoProxy
@SpringBootApplication
public class RidesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RidesApplication.class, args);
	}

}
