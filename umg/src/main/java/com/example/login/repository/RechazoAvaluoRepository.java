package com.example.login.repository;

import com.example.login.model.RechazoAvaluo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RechazoAvaluoRepository extends JpaRepository<RechazoAvaluo, Integer> {

}
