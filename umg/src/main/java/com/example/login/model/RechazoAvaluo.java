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
@Table(name = "rechazo_avaluo")
public class RechazoAvaluo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rechazo")
    private Integer idRechazo;

    @Column(name = "id_avaluo", nullable = false)
    private Integer idAvaluo;

    @Column(name = "motivo", nullable = false, length = 255)
    private String motivo;

    @Column(name = "fecha_rechazo", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaRechazo;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

}