package com.example.login.repository;

import com.example.login.model.NotificacionesCt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacionesCtRepository extends JpaRepository<NotificacionesCt, Integer> {
}