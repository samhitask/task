FROM openjdk:17-jdk-slim
VOLUME /tmp
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} application.jar
ENTRYPOINT ["java","-jar","/application.jar"]
EXPOSE 3000