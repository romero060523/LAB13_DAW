/**
 * PASO 5: COMPONENTE PARA LISTAR PRODUCTOS
 * 
 * Similar al componente de categorías, pero con más campos.
 * Los conceptos son los mismos, pero aquí manejaremos más datos.
 */

import { useState, useEffect } from 'react';
import { obtenerProductos, eliminarProducto } from '../services/productoService';

function ProductoList() {
  // Estado del componente
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Cargar productos desde el backend
   */
  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (err) {
      setError('Error al cargar los productos. Por favor, intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Efecto para cargar productos al montar el componente
   */
  useEffect(() => {
    cargarProductos();
  }, []);

  /**
   * Eliminar un producto
   */
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await eliminarProducto(id);
      cargarProductos(); // Recargar la lista
      alert('Producto eliminado exitosamente');
    } catch (err) {
      alert('Error al eliminar el producto');
      console.error('Error:', err);
    }
  };

  /**
   * Formatear precio a moneda
   * Esta es una función helper para mostrar el precio con formato
   */
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(precio);
  };

  // Renderizado condicional - Cargando
  if (cargando) {
    return (
      <div className="producto-list">
        <h2>Productos</h2>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Renderizado condicional - Error
  if (error) {
    return (
      <div className="producto-list">
        <h2>Productos</h2>
        <p className="error">{error}</p>
        <button onClick={cargarProductos}>Reintentar</button>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="producto-list">
      <h2>Lista de Productos</h2>
      
      <button onClick={cargarProductos} className="btn-reload">
        🔄 Recargar
      </button>

      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{formatearPrecio(producto.precio)}</td>
                <td>
                  {/* Mostramos el stock con color según la cantidad */}
                  <span className={producto.stock < 10 ? 'stock-bajo' : 'stock-ok'}>
                    {producto.stock}
                  </span>
                </td>
                <td>{producto.categoriaId}</td>
                <td>
                  <button
                    onClick={() => handleEliminar(producto.id)}
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

      <p className="total">Total de productos: {productos.length}</p>
    </div>
  );
}

export default ProductoList;

/**
 * NUEVOS CONCEPTOS EN ESTE COMPONENTE:
 * 
 * 1. Formateo de datos: formatearPrecio() para mostrar moneda
 * 2. Clases CSS condicionales: className basado en condiciones
 * 3. Manejo de más campos en la tabla
 */
