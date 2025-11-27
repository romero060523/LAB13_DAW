package com.microservices.client;

import com.microservices.model.Producto;
import lombok.Data;

@Data
public class ProductoResponse {
    private Producto producto;
    private CategoriaClient categoria;

}
