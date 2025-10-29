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
@Table(name = "firma_electronica")
public class FirmaElectronica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_firma")
    private Integer idFirma;

    @Column(name = "id_contrato", nullable = false)
    private Integer idContrato;

    @Column(name = "id_usuario", nullable = false)
    private Integer idUsuario;

    @Column(name = "fecha_firma", nullable = false, columnDefinition = "DATETIME DEFAULT GETDATE()")
    private LocalDateTime fechaFirma;

    @Column(name = "documento_firmado", nullable = false, columnDefinition = "VARBINARY(MAX)")
    private byte[] documentoFirmado;

    @Column(name = "estado_firma", nullable = false, length = 20)
    private String estadoFirma;
}
