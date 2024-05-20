FROM openjdk:22-jdk

COPY ./target/Passenger.jar Passenger.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "Passenger.jar"]
