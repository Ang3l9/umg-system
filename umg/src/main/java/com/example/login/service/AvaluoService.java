package com.example.login.service;

import com.example.login.model.Avaluo;
import com.example.login.repository.AvaluoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AvaluoService {

    @Autowired
    private AvaluoRepository repository;

    public Avaluo createAvaluo(Avaluo avaluo) {
        return repository.save(avaluo);
    }

    public List<Avaluo> getAllAvaluos() {
        return repository.findAll();
    }

    public Avaluo getAvaluoById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Avalúo no encontrado con ID: " + id));
    }

    public Avaluo updateAvaluo(Integer id, Avaluo updatedAvaluo) {
        Avaluo existing = getAvaluoById(id);
        existing.setSolicitud(updatedAvaluo.getSolicitud());
        existing.setUsuario(updatedAvaluo.getUsuario());
        existing.setMontoEstimado(updatedAvaluo.getMontoEstimado());
        existing.setPorcentajeAvaluo(updatedAvaluo.getPorcentajeAvaluo());
        existing.setEstadoAvaluo(updatedAvaluo.getEstadoAvaluo());
        return repository.save(existing);
    }

    public void deleteAvaluo(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Avalúo no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
