package com.example.login.service;

import com.example.login.model.CarteraCobranza;
import com.example.login.repository.CarteraCobranzaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarteraCobranzaService {

    @Autowired
    private CarteraCobranzaRepository repository;

    public CarteraCobranza create(CarteraCobranza cartera) {
        return repository.save(cartera);
    }

    public List<CarteraCobranza> getAll() {
        return repository.findAll();
    }

    public CarteraCobranza getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cartera no encontrada con ID: " + id));
    }

    public CarteraCobranza update(Long id, CarteraCobranza updated) {
        CarteraCobranza existing = getById(id);
        existing.setPago(updated.getPago());
        existing.setUsuario(updated.getUsuario());
        existing.setMontoVencido(updated.getMontoVencido());
        existing.setDiasVencido(updated.getDiasVencido());
        existing.setNivelMora(updated.getNivelMora());
        existing.setEstado(updated.getEstado());
        existing.setObservaciones(updated.getObservaciones());
        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Cartera no encontrada con ID: " + id);
        }
        repository.deleteById(id);
    }
}
