package com.example.login.service;

import com.example.login.model.TipoArticulo;
import com.example.login.repository.TipoArticuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TipoArticuloService {

    @Autowired
    private TipoArticuloRepository repository;

    // Create
    public TipoArticulo createTipoArticulo(TipoArticulo tipoArticulo) {
        if (tipoArticulo.getNombreArticulo() == null || tipoArticulo.getNombreArticulo().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del artículo no puede estar vacío.");
        }
        if (repository.existsByNombreArticulo(tipoArticulo.getNombreArticulo())) {
            throw new IllegalArgumentException("Ya existe un tipo de artículo con ese nombre.");
        }
        return repository.save(tipoArticulo);
    }

    // Read (all)
    public List<TipoArticulo> getAllTiposArticulos() {
        return repository.findAll();
    }

    // Read (by ID)
    public TipoArticulo getTipoArticuloById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de artículo no encontrado con ID: " + id));
    }

    // Update
    public TipoArticulo updateTipoArticulo(Integer id, TipoArticulo updatedTipoArticulo) {
        TipoArticulo existing = getTipoArticuloById(id);
        if (updatedTipoArticulo.getNombreArticulo() != null && !updatedTipoArticulo.getNombreArticulo().trim().isEmpty()) {
            if (!updatedTipoArticulo.getNombreArticulo().equals(existing.getNombreArticulo()) &&
                    repository.existsByNombreArticulo(updatedTipoArticulo.getNombreArticulo())) {
                throw new IllegalArgumentException("Ya existe un tipo de artículo con ese nombre.");
            }
            existing.setNombreArticulo(updatedTipoArticulo.getNombreArticulo());
        }
        if (updatedTipoArticulo.getDescripcion() != null) {
            existing.setDescripcion(updatedTipoArticulo.getDescripcion());
        }
        return repository.save(existing);
    }

    // Delete
    public void deleteTipoArticulo(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Tipo de artículo no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
