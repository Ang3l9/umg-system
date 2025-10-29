
package com.example.login.repository;

import com.example.login.model.NotificacionesAvaluo;
import com.example.login.model.NotificacionesCt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacionesAvaluoRepository extends JpaRepository<NotificacionesAvaluo, Integer> {
}