FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} fly.jar
ENTRYPOINT ["java","-jar","fly.jar"]