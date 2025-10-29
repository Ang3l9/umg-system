package com.example.login.service;

import com.example.login.model.RechazoAvaluo;
import com.example.login.repository.RechazoAvaluoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RechazoAvaluoService {

    @Autowired
    private RechazoAvaluoRepository repository;

    public RechazoAvaluo createRechazoAvaluo(RechazoAvaluo rechazoAvaluo) {
        return repository.save(rechazoAvaluo);
    }

    public List<RechazoAvaluo> getAllRechazoAvaluos() {
        return repository.findAll();
    }

    public RechazoAvaluo getRechazoAvaluoById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rechazo de avalúo no encontrado con ID: " + id));
    }

    public RechazoAvaluo updateRechazoAvaluo(Integer id, RechazoAvaluo updatedRechazoAvaluo) {
        RechazoAvaluo existing = getRechazoAvaluoById(id);
        existing.setIdAvaluo(updatedRechazoAvaluo.getIdAvaluo());
        existing.setMotivo(updatedRechazoAvaluo.getMotivo());
        existing.setFechaRechazo(updatedRechazoAvaluo.getFechaRechazo());
        existing.setIdUsuario(updatedRechazoAvaluo.getIdUsuario());
        return repository.save(existing);
    }

    public void deleteRechazoAvaluo(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Rechazo de avalúo no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
