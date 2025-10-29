package com.example.login.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "contrato_prestamo")
public class ContratoPrestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contrato")
    private Integer idContrato;

    @Column(name = "id_avaluo", nullable = false)
    private Integer idAvaluo;

    @Column(name = "monto_aprobado", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoAprobado;

    @Column(name = "plazo_meses", nullable = false)
    private Integer plazoMeses;

    @Column(name = "tasan_interes", nullable = false, precision = 5, scale = 2)
    private BigDecimal tasaInteres;

    @Column(name = "fecha_generacion", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaGeneracion;

    @Column(name = "estado_contrato", nullable = false, length = 20)
    private String estadoContrato;


}
