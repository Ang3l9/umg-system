package com.example.login.service;

import com.example.login.model.Solicitud;
import com.example.login.repository.SolicitudRepository;
import com.example.login.repository.SolicitudRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudService {

    @Autowired
    private SolicitudRepository repository;

    // Create
    public Solicitud createSolicitud(Solicitud Solicitud) {
        return repository.save(Solicitud);
    }

    // Read (all)
    public List<Solicitud> getAllSolicitudes() {
        return repository.findAll();
    }

    // Read (by ID)
    public Solicitud getSolicitudById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de artículo no encontrado con ID: " + id));
    }

    public Solicitud updateSolicitud(Integer id, Solicitud updatedSolicitud) {
        Solicitud existing = getSolicitudById(id);
        existing.setNombre(updatedSolicitud.getNombre());
        existing.setApellido(updatedSolicitud.getApellido());
        existing.setDocumentoIdentidad(updatedSolicitud.getDocumentoIdentidad());
        existing.setEvidencia(updatedSolicitud.getEvidencia());
        existing.setDireccion(updatedSolicitud.getDireccion());
        existing.setCorreoElectronico(updatedSolicitud.getCorreoElectronico());
        existing.setFechaNacimiento(updatedSolicitud.getFechaNacimiento());
        existing.setTelefono(updatedSolicitud.getTelefono());
        existing.setEstadoCivil(updatedSolicitud.getEstadoCivil());
        existing.setNacionalidad(updatedSolicitud.getNacionalidad());
        existing.setMontoSolicitado(updatedSolicitud.getMontoSolicitado());
        existing.setEstadoSolicitud(updatedSolicitud.getEstadoSolicitud());
        existing.setUsuario(updatedSolicitud.getUsuario());
        existing.setTipoArticulo(updatedSolicitud.getTipoArticulo());
        return repository.save(existing);
    }

    // Delete
    public void deleteSolicitud(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Tipo de artículo no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
