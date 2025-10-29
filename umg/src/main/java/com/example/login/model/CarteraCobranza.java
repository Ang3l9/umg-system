package com.example.login.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "Cartera_Cobranza")
public class CarteraCobranza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cc_IdCartera", updatable = false)
    private Long idCartera;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "pp_IdPago", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private PlanPagos pago;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(name = "cc_MontoVencido", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoVencido;

    @Column(name = "cc_DiasVencido", nullable = false)
    private Integer diasVencido;

    @Column(name = "cc_NivelMora", length = 20, nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Temprana'")
    private String nivelMora = "Temprana";

    @Column(name = "cc_Estado", length = 20, nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Pendiente'")
    private String estado = "Pendiente";

    @Column(name = "cc_FechaIngreso", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaIngreso = LocalDateTime.now();

    @Column(name = "cc_Observaciones", length = 255)
    private String observaciones;
}

