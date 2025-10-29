package com.example.login.repository;

import com.example.login.model.PlanPagos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanPagosRepository extends JpaRepository<PlanPagos, Integer> {
}
