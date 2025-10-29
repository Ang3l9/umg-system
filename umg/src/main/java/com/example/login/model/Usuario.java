package com.example.login.model;

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
@Table(
        name = "usuario",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "usu_correo_unique",
                        columnNames = "usu_Correo"
                )
        }
)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usu_IdUsuario", updatable = false)
    private Long idUsuario;

    @Column(
            name = "usu_Nombre",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String usuNombre;

    @Column(
            name = "usu_Correo",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String correo;

    @Column(
            name = "usu_Contrasena",
            nullable = false,
            columnDefinition = "NVARCHAR(255)"
    )
    private String contrasena;

    @Column(
            name = "usu_Salt",
            columnDefinition = "NVARCHAR(128)"
    )
    private String salt;

    @Column(
            name = "usu_FechaExpiracionContrasena"
    )
    private LocalDateTime fechaExpiracionContrasena;

    @Column(
            name = "usu_Estado",
            nullable = false,
            columnDefinition = "NVARCHAR(20)"
    )
    private String estado = "Activo";

    @Column(
            name = "usu_FechaBloqueo"
    )
    private LocalDateTime fechaBloqueo;

    @Column(
            name = "usu_RazonBloqueo",
            columnDefinition = "NVARCHAR(100)"
    )
    private String razonBloqueo;

    @Column(
            name = "usu_IntentosConsecutivos",
            nullable = false,
            columnDefinition = "INT"
    )
    private Integer intentosConsecutivos = 0;
}