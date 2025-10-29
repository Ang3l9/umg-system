package com.example.login.repository;

import com.example.login.model.FirmaElectronica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirmaElectronicaRepository extends JpaRepository<FirmaElectronica, Integer> {

}
