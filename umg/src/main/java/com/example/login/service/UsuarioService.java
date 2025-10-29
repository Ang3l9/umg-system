package com.example.login.service;


import com.example.login.model.Customer;
import com.example.login.model.Usuario;
import com.example.login.repository.CustomerRepository;
import com.example.login.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    public List<Usuario> getCustomers() {
        return usuarioRepository.findAll();
    }

    public Usuario getCustomer(String email, String password) {
        Optional<Usuario> customerOptional = usuarioRepository.findCustomerByEmail(email);
        if (customerOptional.isPresent()) {
            if (!customerOptional.get().getContrasena().equals(password)) {
                throw new IllegalStateException("contraseña erronea: "+ email);
            }
        }else {
            throw new IllegalStateException("corrreo: " + email + " no existe");
        }
        return customerOptional.get();
    }

    public void addNewCustomer(Usuario customer) {
        Optional<Usuario> customerOptional = usuarioRepository
                .findCustomerByEmail(customer.getCorreo());
        if(customerOptional.isPresent()) {
            throw new IllegalStateException("correo ya existe");
        }
        usuarioRepository.save(customer);
    }

    public void deleteCustomerByEmail(String email) {
        Optional<Usuario> customerOptional = usuarioRepository
                .findCustomerByEmail(email);
        if(customerOptional.isEmpty()) {
            throw new IllegalStateException("este cliente " + email + " no existe");
        }
        usuarioRepository.deleteById(customerOptional.get().getIdUsuario());
    }

}
