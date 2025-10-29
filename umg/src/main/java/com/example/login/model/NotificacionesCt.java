package com.example.login.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "NotificacionesCt")
public class NotificacionesCt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nc_IdNotificacion", updatable = false)
    private Integer idNotificacion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sol_IdSolicitud", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Solicitud solicitud;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usu_IdUsuario", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Usuario usuario;

    @Column(name = "nc_Mensaje", nullable = false, length = 255)
    private String mensaje;

    @Column(name = "nc_FechaRegistro", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaRegistro;

    @Column(name = "nc_Estado", nullable = false, columnDefinition = "NVARCHAR(20) DEFAULT 'No leida'", length = 20)
    private String estado;
}
