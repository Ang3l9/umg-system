package com.example.login.repository;

import com.example.login.model.PrestamoDesembolsado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrestamoDesembolsadoRepository extends JpaRepository<PrestamoDesembolsado, Integer> {
}
