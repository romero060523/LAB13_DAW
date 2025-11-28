/**
 * PASO 3: SERVICIO DE PRODUCTOS
 * 
 * Este archivo contiene todas las funciones para interactuar con el API de productos.
 * Similar al servicio de categorías, pero con más campos en los productos.
 * 
 * ESTRUCTURA DE UN PRODUCTO:
 * {
 *   id: number,
 *   nombre: string,
 *   precio: number,
 *   stock: number,
 *   categoriaId: number
 * }
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../api.config';

/**
 * Obtener todos los productos
 * 
 * @returns {Promise<Array>} - Array de objetos producto
 * 
 * EJEMPLO DE RESPUESTA:
 * [
 *   { id: 1, nombre: "Laptop", precio: 1200.50, stock: 10, categoriaId: 1 },
 *   { id: 2, nombre: "Mouse", precio: 25.99, stock: 50, categoriaId: 1 }
 * ]
 */
export const obtenerProductos = async () => {
  try {
    // Llamamos al endpoint GET /api/productos
    const productos = await apiGet('/api/productos');
    console.log('Productos obtenidos:', productos);
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 * 
 * @param {number} id - ID del producto a buscar
 * @returns {Promise<Object>} - Objeto producto
 * 
 * EJEMPLO DE USO:
 * const producto = await obtenerProductoPorId(1);
 */
export const obtenerProductoPorId = async (id) => {
  try {
    // Llamamos al endpoint GET /api/productos/{id}
    const producto = await apiGet(`/api/productos/${id}`);
    console.log('Producto obtenido:', producto);
    return producto;
  } catch (error) {
    console.error(`Error al obtener producto con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Crear un nuevo producto
 * 
 * @param {Object} productoData - Datos del nuevo producto
 * @param {string} productoData.nombre - Nombre del producto
 * @param {number} productoData.precio - Precio del producto
 * @param {number} productoData.stock - Cantidad en stock
 * @param {number} productoData.categoriaId - ID de la categoría
 * @returns {Promise<Object>} - Producto creado con su ID asignado
 * 
 * EJEMPLO DE USO:
 * const nuevoProducto = await crearProducto({
 *   nombre: "Teclado Mecánico",
 *   precio: 89.99,
 *   stock: 20,
 *   categoriaId: 1
 * });
 */
export const crearProducto = async (productoData) => {
  try {
    // Validaciones básicas antes de enviar
    if (!productoData.nombre || productoData.nombre.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    
    if (!productoData.precio || productoData.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    if (productoData.stock === undefined || productoData.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    
    if (!productoData.categoriaId) {
      throw new Error('Debe seleccionar una categoría');
    }
    
    // Llamamos al endpoint POST /api/productos
    const productoCreado = await apiPost('/api/productos', productoData);
    console.log('Producto creado:', productoCreado);
    return productoCreado;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

/**
 * Actualizar un producto existente
 * 
 * @param {number} id - ID del producto a actualizar
 * @param {Object} productoData - Nuevos datos del producto
 * @returns {Promise<Object>} - Producto actualizado
 * 
 * EJEMPLO DE USO:
 * const productoActualizado = await actualizarProducto(1, {
 *   nombre: "Laptop Gaming",
 *   precio: 1500.00,
 *   stock: 5,
 *   categoriaId: 1
 * });
 */
export const actualizarProducto = async (id, productoData) => {
  try {
    // Validaciones básicas
    if (!productoData.nombre || productoData.nombre.trim() === '') {
      throw new Error('El nombre del producto es requerido');
    }
    
    if (!productoData.precio || productoData.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    if (productoData.stock === undefined || productoData.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    
    // Llamamos al endpoint PUT /api/productos/{id}
    const productoActualizado = await apiPut(`/api/productos/${id}`, productoData);
    console.log('Producto actualizado:', productoActualizado);
    return productoActualizado;
  } catch (error) {
    console.error(`Error al actualizar producto con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar un producto
 * 
 * @param {number} id - ID del producto a eliminar
 * @returns {Promise<void>}
 * 
 * EJEMPLO DE USO:
 * await eliminarProducto(1);
 */
export const eliminarProducto = async (id) => {
  try {
    // Llamamos al endpoint DELETE /api/productos/{id}
    await apiDelete(`/api/productos/${id}`);
    console.log(`Producto con ID ${id} eliminado exitosamente`);
  } catch (error) {
    console.error(`Error al eliminar producto con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Obtener la categoría de un producto
 * 
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} - Objeto categoría
 * 
 * EJEMPLO DE USO:
 * const categoria = await obtenerCategoriaDeProducto(1);
 * 
 * NOTA: Este endpoint usa comunicación entre microservicios.
 * El producto-service llama internamente al categoria-service.
 */
export const obtenerCategoriaDeProducto = async (id) => {
  try {
    // Llamamos al endpoint GET /api/productos/{id}/categoria
    const categoria = await apiGet(`/api/productos/${id}/categoria`);
    console.log(`Categoría del producto ${id}:`, categoria);
    return categoria;
  } catch (error) {
    console.error(`Error al obtener categoría del producto ${id}:`, error);
    throw error;
  }
};

/**
 * RESUMEN DE FUNCIONES DISPONIBLES:
 * 
 * - obtenerProductos() -> Obtiene todos los productos
 * - obtenerProductoPorId(id) -> Obtiene un producto específico
 * - crearProducto(data) -> Crea un nuevo producto
 * - actualizarProducto(id, data) -> Actualiza un producto existente
 * - eliminarProducto(id) -> Elimina un producto
 * - obtenerCategoriaDeProducto(id) -> Obtiene la categoría de un producto
 */
