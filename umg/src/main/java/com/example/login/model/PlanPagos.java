package com.example.login.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "plan_pagos")
public class PlanPagos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pp_IdPago", updatable = false)
    private Integer idPago;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ma_IdAvaluo", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Avaluo avaluo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cp_IdContrato", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ContratoPrestamo contrato;

    @Column(name = "pp_NumeroCuota", nullable = false)
    private Integer numeroCuota;

    @Column(name = "pp_FechaVencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Column(name = "pp_MontoCuota", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoCuota;

    @Column(name = "pp_MontoInteres", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoInteres;

    @Column(name = "pp_MontoCapital", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoCapital;

    @Column(name = "pp_MontoPagado", nullable = false, columnDefinition = "DECIMAL(18,2) DEFAULT 0")
    private BigDecimal montoPagado;

    @Column(name = "pp_EstadoPago", nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Pendiente'")
    private String estadoPago;

    @Column(name = "pp_FechaPago")
    private LocalDateTime fechaPago;

    @Column(name = "pp_ArchivoComprobant", columnDefinition = "VARBINARY(MAX)")
    private byte[] archivoComprobante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;
}