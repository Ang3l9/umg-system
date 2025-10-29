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
@Table(name = "Avaluo")
public class Avaluo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_IdAvaluo", updatable = false)
    private Long idAvaluo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sol_id_solicitud", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Solicitud solicitud;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(name = "ma_MontoEstimado", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoEstimado;

    @Column(name = "ma_PorcentajeAvaluo", nullable = false, precision = 5, scale = 2)
    private BigDecimal porcentajeAvaluo;

    @Column(name = "ma_MontoAprobado", insertable = false, updatable = false, columnDefinition = "DECIMAL(18,2)")
    private BigDecimal montoAprobado;

    @Column(name = "ma_FechaAvaluo", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaAvaluo;

    @Column(name = "ma_EstadoAvaluo", nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Pendiente'")
    private String estadoAvaluo;

    @PrePersist
    @PreUpdate
    private void calculateMontoAprobado() {
        if (montoEstimado != null && porcentajeAvaluo != null) {
            this.montoAprobado = montoEstimado.multiply(porcentajeAvaluo).divide(BigDecimal.valueOf(100));
        }
    }
}