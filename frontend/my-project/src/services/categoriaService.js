/**
 * PASO 2: SERVICIO DE CATEGORÍAS
 * 
 * Este archivo contiene todas las funciones para interactuar con el API de categorías.
 * Cada función representa una operación CRUD (Create, Read, Update, Delete).
 * 
 * IMPORTANTE: Este servicio actúa como una capa intermedia entre los componentes
 * y la API. Los componentes NO hacen peticiones directamente, sino que usan estas funciones.
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../api.config';

/**
 * Obtener todas las categorías
 * 
 * @returns {Promise<Array>} - Array de objetos categoría
 * 
 * EJEMPLO DE RESPUESTA:
 * [
 *   { id: 1, nombre: "Electrónica" },
 *   { id: 2, nombre: "Ropa" }
 * ]
 */
export const obtenerCategorias = async () => {
  try {
    // Llamamos al endpoint GET /api/categorias
    const categorias = await apiGet('/api/categorias');
    console.log('Categorías obtenidas:', categorias);
    return categorias;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error; // Re-lanzamos para que el componente pueda manejarlo
  }
};

/**
 * Obtener una categoría por ID
 * 
 * @param {number} id - ID de la categoría a buscar
 * @returns {Promise<Object>} - Objeto categoría
 * 
 * EJEMPLO DE USO:
 * const categoria = await obtenerCategoriaPorId(1);
 */
export const obtenerCategoriaPorId = async (id) => {
  try {
    // Llamamos al endpoint GET /api/categorias/{id}
    const categoria = await apiGet(`/api/categorias/${id}`);
    console.log('Categoría obtenida:', categoria);
    return categoria;
  } catch (error) {
    console.error(`Error al obtener categoría con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Crear una nueva categoría
 * 
 * @param {Object} categoriaData - Datos de la nueva categoría
 * @param {string} categoriaData.nombre - Nombre de la categoría
 * @returns {Promise<Object>} - Categoría creada con su ID asignado
 * 
 * EJEMPLO DE USO:
 * const nuevaCategoria = await crearCategoria({ nombre: "Deportes" });
 */
export const crearCategoria = async (categoriaData) => {
  try {
    // Validación básica antes de enviar
    if (!categoriaData.nombre || categoriaData.nombre.trim() === '') {
      throw new Error('El nombre de la categoría es requerido');
    }
    
    // Llamamos al endpoint POST /api/categorias
    const categoriaCreada = await apiPost('/api/categorias', categoriaData);
    console.log('Categoría creada:', categoriaCreada);
    return categoriaCreada;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

/**
 * Actualizar una categoría existente
 * 
 * @param {number} id - ID de la categoría a actualizar
 * @param {Object} categoriaData - Nuevos datos de la categoría
 * @param {string} categoriaData.nombre - Nuevo nombre de la categoría
 * @returns {Promise<Object>} - Categoría actualizada
 * 
 * EJEMPLO DE USO:
 * const categoriaActualizada = await actualizarCategoria(1, { nombre: "Tecnología" });
 */
export const actualizarCategoria = async (id, categoriaData) => {
  try {
    // Validación básica
    if (!categoriaData.nombre || categoriaData.nombre.trim() === '') {
      throw new Error('El nombre de la categoría es requerido');
    }
    
    // Llamamos al endpoint PUT /api/categorias/{id}
    const categoriaActualizada = await apiPut(`/api/categorias/${id}`, categoriaData);
    console.log('Categoría actualizada:', categoriaActualizada);
    return categoriaActualizada;
  } catch (error) {
    console.error(`Error al actualizar categoría con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar una categoría
 * 
 * @param {number} id - ID de la categoría a eliminar
 * @returns {Promise<void>}
 * 
 * EJEMPLO DE USO:
 * await eliminarCategoria(1);
 */
export const eliminarCategoria = async (id) => {
  try {
    // Llamamos al endpoint DELETE /api/categorias/{id}
    await apiDelete(`/api/categorias/${id}`);
    console.log(`Categoría con ID ${id} eliminada exitosamente`);
  } catch (error) {
    console.error(`Error al eliminar categoría con ID ${id}:`, error);
    throw error;
  }
};

/**
 * RESUMEN DE FUNCIONES DISPONIBLES:
 * 
 * - obtenerCategorias() -> Obtiene todas las categorías
 * - obtenerCategoriaPorId(id) -> Obtiene una categoría específica
 * - crearCategoria(data) -> Crea una nueva categoría
 * - actualizarCategoria(id, data) -> Actualiza una categoría existente
 * - eliminarCategoria(id) -> Elimina una categoría
 */
