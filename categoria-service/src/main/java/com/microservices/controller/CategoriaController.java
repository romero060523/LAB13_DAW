package com.microservices.controller;

import com.microservices.model.Categoria;
import com.microservices.repository.CategoriaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    //Listar todas las categorias
    @GetMapping
    public List<Categoria> listar() {
        return repository.findAll();
    }

    //Buscar categoria por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok) //Si existe retorna 200 OK
                .orElse(ResponseEntity.notFound().build()); //Si no existe retorna 404
    }

    //Crear categoria
    @PostMapping
    public Categoria crear(@RequestBody Categoria datosCategoria) {
        return repository.save(datosCategoria);
    }

    //Actualizar categoria
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(@PathVariable Long id, @RequestBody Categoria datosCategoria) {
        return repository.findById(id)
                .map(categoriaExistente -> {
                    categoriaExistente.setNombre(datosCategoria.getNombre());
                    return ResponseEntity.ok(repository.save(categoriaExistente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //Eliminar Categoria
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

