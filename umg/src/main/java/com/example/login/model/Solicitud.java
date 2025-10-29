package com.example.login.model;

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
@Table(name = "solicitud")
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sol_id_solicitud", updatable = false)
    private Integer idSolicitud;

    @Column(name = "sol_Nombre", nullable = false, columnDefinition = "NVARCHAR(100)")
    private String nombre;

    @Column(name = "sol_Apellido", nullable = false, columnDefinition = "NVARCHAR(100)")
    private String apellido;

    @Column(name = "sol_DocumentoIdentidad", nullable = false, columnDefinition = "NVARCHAR(20)")
    private String documentoIdentidad;

    @Column(name = "sol_Evidencia", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String evidencia;

    @Column(name = "sol_Direccion", columnDefinition = "NVARCHAR(200)")
    private String direccion;

    @Column(name = "sol_CorreoElectronico", columnDefinition = "NVARCHAR(100)")
    private String correoElectronico;

    @Column(name = "sol_FechaNacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "sol_Telefono", columnDefinition = "NVARCHAR(20)")
    private String telefono;

    @Column(name = "sol_EstadoCivil", columnDefinition = "NVARCHAR(20)")
    private String estadoCivil;

    @Column(name = "sol_Nacionalidad", columnDefinition = "NVARCHAR(50)")
    private String nacionalidad;

    @Column(name = "sol_MontoSolicitado", nullable = false, columnDefinition = "DECIMAL(18,2)")
    private BigDecimal montoSolicitado;

    @Column(name = "sol_FechaSolicitud", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaSolicitud;

    @Column(name = "sol_EstadoSolicitud", nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'Pendiente'")
    private String estadoSolicitud;

    @ManyToOne
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "ta_IdTipoArticulo", nullable = false)
    private TipoArticulo tipoArticulo;
}