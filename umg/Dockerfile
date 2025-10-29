FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom.xml del padre y del módulo
COPY ../pom.xml ./parent-pom.xml
COPY pom.xml .
COPY src ./src

# Compilar
RUN mvn clean package -DskipTests -Pproduction

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el jar compilado
COPY --from=build /app/target/*.jar app.jar

# Puerto
EXPOSE 8080

# Variables de entorno opcionales
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Ejecutar
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]