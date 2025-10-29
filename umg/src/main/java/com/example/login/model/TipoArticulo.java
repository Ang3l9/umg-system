package com.example.login.model;


import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(
        name = "tipoarticulo",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "ta_nombre_unique",
                        columnNames = "ta_NombreArticulo"
                )
        }
)
public class TipoArticulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ta_IdTipoArticulo", updatable = false)
    private Integer idTipoArticulo;

    @Column(
            name = "ta_NombreArticulo",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String nombreArticulo;

    @Column(
            name = "ta_Descripcion",
            columnDefinition = "NVARCHAR(255)"
    )
    private String descripcion;
}
