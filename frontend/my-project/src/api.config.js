/**
 * PASO 1: CONFIGURACIÓN DE LA API CON AXIOS
 * 
 * Este archivo centraliza la configuración para comunicarnos con el backend.
 * Usamos Axios porque es más simple que fetch y tiene mejor manejo de errores.
 * 
 * VENTAJAS DE AXIOS:
 * - Automáticamente convierte las respuestas a JSON
 * - Manejo de errores más simple
 * - Interceptores para configuración global
 * - Mejor compatibilidad con navegadores antiguos
 */

import axios from 'axios';

// URL base del API Gateway - Todos los microservicios están detrás de este gateway
// NOTA: Si el API Gateway no responde en localhost:8080, verifica que esté corriendo
// y que el puerto 8080 esté disponible. Puedes verificar en Eureka (http://localhost:8761)
const API_BASE_URL = 'http://localhost:8080';

/**
 * Creamos una instancia de axios con configuración base
 * Esto nos permite tener una configuración centralizada para todas las peticiones
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Todas las peticiones envían JSON
  },
  timeout: 10000, // Timeout de 10 segundos para evitar esperas infinitas
});

/**
 * INTERCEPTOR DE RESPUESTAS
 * Esto se ejecuta automáticamente después de cada respuesta del servidor
 * Nos permite manejar errores de forma centralizada
 */
apiClient.interceptors.response.use(
  // Si la respuesta es exitosa (código 2xx), simplemente retornamos los datos
  (response) => response,
  
  // Si hay un error, lo manejamos aquí
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error (4xx, 5xx)
      console.error('Error del servidor:', error.response.status, error.response.data);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta (problema de red)
      console.error('Error de red: No se recibió respuesta del servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Función helper para hacer peticiones GET
 * 
 * @param {string} endpoint - La ruta del endpoint (ej: '/api/categorias')
 * @returns {Promise} - Promesa con los datos de la respuesta
 * 
 * EJEMPLO DE USO:
 * const categorias = await apiGet('/api/categorias');
 */
export const apiGet = async (endpoint) => {
  try {
    // axios.get retorna un objeto con la respuesta completa
    // response.data contiene los datos que nos interesan
    const response = await apiClient.get(endpoint);
    return response.data; // Axios ya parsea el JSON automáticamente
  } catch (error) {
    console.error('Error en GET:', error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
};

/**
 * Función helper para hacer peticiones POST (crear recursos)
 * 
 * @param {string} endpoint - La ruta del endpoint
 * @param {object} data - Los datos a enviar en el body
 * @returns {Promise} - Promesa con los datos de la respuesta
 * 
 * EJEMPLO DE USO:
 * const nuevaCategoria = await apiPost('/api/categorias', { nombre: 'Electrónica' });
 */
export const apiPost = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data; // Axios maneja la conversión a JSON automáticamente
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};

/**
 * Función helper para hacer peticiones PUT (actualizar recursos)
 * 
 * @param {string} endpoint - La ruta del endpoint
 * @param {object} data - Los datos a actualizar
 * @returns {Promise} - Promesa con los datos de la respuesta
 * 
 * EJEMPLO DE USO:
 * const categoriaActualizada = await apiPut('/api/categorias/1', { nombre: 'Tecnología' });
 */
export const apiPut = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error en PUT:', error);
    throw error;
  }
};

/**
 * Función helper para hacer peticiones DELETE (eliminar recursos)
 * 
 * @param {string} endpoint - La ruta del endpoint
 * @returns {Promise} - Promesa que se resuelve cuando se elimina
 * 
 * EJEMPLO DE USO:
 * await apiDelete('/api/categorias/1');
 */
export const apiDelete = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data; // Normalmente vacío para DELETE
  } catch (error) {
    console.error('Error en DELETE:', error);
    throw error;
  }
};

// Exportamos también la instancia de axios por si se necesita configuración avanzada
export { apiClient, API_BASE_URL };
