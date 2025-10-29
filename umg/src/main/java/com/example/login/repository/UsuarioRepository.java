package com.example.login.repository;

import com.example.login.model.Customer;
import com.example.login.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT usuario FROM Usuario usuario WHERE usuario.correo = ?1")
    Optional<Usuario> findCustomerByEmail(String email);


}