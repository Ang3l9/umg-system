package com.example.login.repository;

import com.example.login.model.CarteraCobranza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarteraCobranzaRepository extends JpaRepository<CarteraCobranza, Long> {
}

