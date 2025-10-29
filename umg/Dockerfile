# Etapa 1: construir el proyecto con Maven y Java 17
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml y src
COPY pom.xml .
COPY src ./src

# Compilar el proyecto sin perfiles extra
RUN mvn clean package -DskipTests

# Etapa 2: imagen liviana para ejecutar
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el jar generado
COPY --from=build /app/target/login-0.0.1-SNAPSHOT.jar app.jar

# Exponer puerto
EXPOSE 8080

# Ejecutar
ENTRYPOINT ["java", "-jar", "app.jar"]
