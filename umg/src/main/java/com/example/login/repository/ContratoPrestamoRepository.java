package com.example.login.repository;

import com.example.login.model.ContratoPrestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratoPrestamoRepository extends JpaRepository<ContratoPrestamo, Integer> {

}
