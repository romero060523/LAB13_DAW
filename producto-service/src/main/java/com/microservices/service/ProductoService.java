package com.microservices.service;

import com.microservices.client.CategoriaClient;
import com.microservices.dto.Categoria;
import com.microservices.model.Producto;
import com.microservices.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaClient categoriaClient;

    // Constructor para inyección de dependencias (mejor práctica que @Autowired en campos)
    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaClient categoriaClient) {
        this.productoRepository = productoRepository;
        this.categoriaClient = categoriaClient;
    }

    // Obtener todos los productos
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Obtener producto por ID
    public Optional<Producto> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id.intValue());
    }

    // Crear un nuevo producto
    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    // Actualizar un producto existente
    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        return productoRepository.findById(id.intValue())
                .map(producto -> {
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setPrecio(productoActualizado.getPrecio());
                    producto.setCategoriaId(productoActualizado.getCategoriaId());
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    // Eliminar un producto
    public void eliminarProducto(Long id) {
        productoRepository.deleteById(id.intValue());
    }

    // Obtener la categoría de un producto usando Feign Client
    public Categoria obtenerCategoriaPorProductoId(Long productoId) {
        Optional<Producto> producto = productoRepository.findById(productoId.intValue());
        if (producto.isPresent()) {
            return categoriaClient.obtenerCategoria(producto.get().getCategoriaId());
        }
        throw new RuntimeException("Producto no encontrado con id: " + productoId);
    }
}
