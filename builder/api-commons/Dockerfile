FROM maven:3.8.5-openjdk-17-slim

WORKDIR /api-commons

COPY ./geek-regime-api-commons/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B
COPY ./geek-regime-api-commons/src ./src
RUN mvn package
