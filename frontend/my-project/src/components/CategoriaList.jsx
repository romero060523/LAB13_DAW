/**
 * PASO 4: COMPONENTE PARA LISTAR CATEGORÍAS
 * 
 * Este es nuestro primer componente que consume la API.
 * Aquí aprenderás sobre:
 * - useState: Para manejar el estado del componente
 * - useEffect: Para ejecutar código cuando el componente se monta
 * - Async/Await: Para manejar operaciones asíncronas
 * - Manejo de errores y estados de carga
 */

import { useState, useEffect } from 'react';
import { obtenerCategorias, eliminarCategoria } from '../services/categoriaService';

/**
 * Componente CategoriaList
 * Muestra una lista de todas las categorías con opciones para eliminar
 */
function CategoriaList() {
  /**
   * ESTADO DEL COMPONENTE
   * 
   * useState es un Hook de React que nos permite agregar estado a componentes funcionales.
   * El estado es información que puede cambiar con el tiempo.
   */
  
  // Array de categorías obtenidas del backend
  const [categorias, setCategorias] = useState([]);
  
  // Indica si estamos cargando datos (true mientras esperamos la respuesta)
  const [cargando, setCargando] = useState(true);
  
  // Almacena cualquier error que ocurra
  const [error, setError] = useState(null);

  /**
   * FUNCIÓN PARA CARGAR CATEGORÍAS
   * 
   * Esta función se ejecuta cuando el componente se monta y cuando necesitamos
   * recargar los datos (por ejemplo, después de eliminar una categoría)
   */
  const cargarCategorias = async () => {
    try {
      setCargando(true); // Mostramos el indicador de carga
      setError(null); // Limpiamos cualquier error previo
      
      // Llamamos al servicio para obtener las categorías
      const datos = await obtenerCategorias();
      
      // Actualizamos el estado con las categorías obtenidas
      setCategorias(datos);
    } catch (err) {
      // Si hay un error, lo guardamos en el estado
      setError('Error al cargar las categorías. Por favor, intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      // Siempre ocultamos el indicador de carga al final
      setCargando(false);
    }
  };

  /**
   * useEffect - EFECTO SECUNDARIO
   * 
   * Este Hook se ejecuta después de que el componente se renderiza.
   * El array vacío [] significa que solo se ejecuta UNA VEZ cuando el componente se monta.
   * 
   * Si pusieramos [categorias], se ejecutaría cada vez que categorias cambie.
   */
  useEffect(() => {
    cargarCategorias();
  }, []); // Array de dependencias vacío = solo se ejecuta al montar

  /**
   * FUNCIÓN PARA ELIMINAR UNA CATEGORÍA
   * 
   * @param {number} id - ID de la categoría a eliminar
   */
  const handleEliminar = async (id) => {
    // Pedimos confirmación al usuario antes de eliminar
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      return; // Si cancela, no hacemos nada
    }

    try {
      // Llamamos al servicio para eliminar la categoría
      await eliminarCategoria(id);
      
      // Recargamos la lista de categorías para reflejar el cambio
      cargarCategorias();
      
      alert('Categoría eliminada exitosamente');
    } catch (err) {
      alert('Error al eliminar la categoría');
      console.error('Error:', err);
    }
  };

  /**
   * RENDERIZADO CONDICIONAL
   * 
   * Mostramos diferentes contenidos según el estado del componente
   */
  
  // Si está cargando, mostramos un mensaje de carga
  if (cargando) {
    return (
      <div className="categoria-list">
        <h2>Categorías</h2>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="categoria-list">
        <h2>Categorías</h2>
        <p className="error">{error}</p>
        <button onClick={cargarCategorias}>Reintentar</button>
      </div>
    );
  }

  /**
   * RENDERIZADO PRINCIPAL
   * 
   * Si no hay errores ni está cargando, mostramos la lista de categorías
   */
  return (
    <div className="categoria-list">
      <h2>Lista de Categorías</h2>
      
      {/* Botón para recargar manualmente */}
      <button onClick={cargarCategorias} className="btn-reload">
        🔄 Recargar
      </button>

      {/* Si no hay categorías, mostramos un mensaje */}
      {categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        /* Si hay categorías, las mostramos en una tabla */
        <table className="tabla-categorias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* 
              map() recorre el array de categorías y crea un <tr> por cada una
              key={categoria.id} es importante para que React identifique cada elemento
            */}
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <button
                    onClick={() => handleEliminar(categoria.id)}
                    className="btn-eliminar"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Mostramos el total de categorías */}
      <p className="total">Total de categorías: {categorias.length}</p>
    </div>
  );
}

export default CategoriaList;

/**
 * RESUMEN DE CONCEPTOS APRENDIDOS:
 * 
 * 1. useState: Maneja el estado del componente (categorias, cargando, error)
 * 2. useEffect: Ejecuta código cuando el componente se monta
 * 3. async/await: Maneja operaciones asíncronas de forma limpia
 * 4. Renderizado condicional: Muestra diferentes UI según el estado
 * 5. map(): Renderiza listas de elementos
 * 6. Manejo de eventos: onClick para botones
 * 7. Servicios: Separación de lógica de API en archivos de servicio
 */
