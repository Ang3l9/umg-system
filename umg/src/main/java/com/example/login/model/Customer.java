package com.example.login.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.Period;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(
        name = "customer",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "customer_email_unique", columnNames = "email"
                )
        }
)
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // SQL Server soporta IDENTITY
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(
            name = "firstname",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String firstname;

    @Column(
            name = "lastname",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String lastname;

    @Column(
            name = "email",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "NVARCHAR(100)"
    )
    private String password;

}
