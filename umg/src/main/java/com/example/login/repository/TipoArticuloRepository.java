package com.example.login.repository;

import com.example.login.model.TipoArticulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoArticuloRepository extends JpaRepository<TipoArticulo, Integer> {
    boolean existsByNombreArticulo(String nombreArticulo);
}
