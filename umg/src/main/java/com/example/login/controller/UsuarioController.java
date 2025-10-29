package com.example.login.controller;

import com.example.login.model.Customer;
import com.example.login.model.Usuario;
import com.example.login.service.CustomerService;
import com.example.login.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/usuario")
@AllArgsConstructor
@CrossOrigin(origins = "http://192.168.56.1:3000")
public class UsuarioController {

    @Autowired
    private final UsuarioService usuarioService;

    @GetMapping("/all")
    public List<Usuario> getCustomers() {
        return usuarioService.getCustomers();
    }

    @GetMapping("/get")
    public Usuario getCustomer(@RequestParam(name = "email") String email,
                                @RequestParam(name = "password") String password) {
        return usuarioService.getCustomer(email,password);
    }

    @GetMapping()
    public List<Usuario> getCustomersAll() {
        return usuarioService.getCustomers();
    }


    @PostMapping("/add")
    public void registerNewCustomer(@RequestBody Usuario usuario) {
        usuarioService.addNewCustomer(usuario);
    }

    @DeleteMapping("/delete")
    public void deleteCustomerByEmail(@RequestParam(name = "email") String email) {
        usuarioService.deleteCustomerByEmail(email);
    }
}
