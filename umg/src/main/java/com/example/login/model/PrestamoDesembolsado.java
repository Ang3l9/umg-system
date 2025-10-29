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
@Table(name = "PrestamoDesembolsado")
public class PrestamoDesembolsado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pd_IdDesembolso", updatable = false)
    private Integer idDesembolso;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cp_IdContrato", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ContratoPrestamo contrato;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(name = "pd_MontoDesembolsad", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoDesembolsado;

    @Column(name = "pd_FechaDesembolso", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaDesembolso;

    @Column(name = "pd_EstadoDesembolso", nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Pendiente'")
    private String estadoDesembolso;
}
