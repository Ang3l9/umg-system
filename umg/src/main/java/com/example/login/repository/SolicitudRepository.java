package com.example.login.repository;

import com.example.login.model.Solicitud;
import com.example.login.model.TipoArticulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {

}
