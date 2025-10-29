package com.example.login.service;

import com.example.login.model.FirmaElectronica;
import com.example.login.repository.FirmaElectronicaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FirmaElectronicaService {

    @Autowired
    private FirmaElectronicaRepository repository;

    public FirmaElectronica createFirmaElectronica(FirmaElectronica firmaElectronica) {
        return repository.save(firmaElectronica);
    }

    public List<FirmaElectronica> getAllFirmaElectronicas() {
        return repository.findAll();
    }

    public FirmaElectronica getFirmaElectronicaById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Firma electrónica no encontrada con ID: " + id));
    }

    public FirmaElectronica updateFirmaElectronica(Integer id, FirmaElectronica updatedFirmaElectronica) {
        FirmaElectronica existing = getFirmaElectronicaById(id);
        existing.setIdContrato(updatedFirmaElectronica.getIdContrato());
        existing.setIdUsuario(updatedFirmaElectronica.getIdUsuario());
        existing.setFechaFirma(updatedFirmaElectronica.getFechaFirma());
        existing.setDocumentoFirmado(updatedFirmaElectronica.getDocumentoFirmado());
        existing.setEstadoFirma(updatedFirmaElectronica.getEstadoFirma());
        return repository.save(existing);
    }

    public void deleteFirmaElectronica(Integer id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Firma electrónica no encontrada con ID: " + id);
        }
        repository.deleteById(id);
    }
}
