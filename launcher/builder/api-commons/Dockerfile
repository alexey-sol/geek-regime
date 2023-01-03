FROM maven:3.8.5-openjdk-17-slim

WORKDIR /api-commons

COPY ./pom.xml ./pom.xml
RUN mvn dependency:go-offline -B
COPY ./src ./src
RUN mvn package
