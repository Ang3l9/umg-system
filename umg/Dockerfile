# Etapa 1: Construcción
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar archivos de Maven
COPY pom.xml .
COPY src ./src

# Compilar el proyecto
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final (ligera)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el jar compilado desde la etapa build
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto (ajusta si tu app usa otro)
EXPOSE 8080

# Variables de entorno opcionales
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Ejecutar la aplicación
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
