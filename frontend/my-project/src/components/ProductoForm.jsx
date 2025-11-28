/**
 * PASO 7: FORMULARIO PARA CREAR/EDITAR PRODUCTOS
 * 
 * Similar al formulario de categorías, pero con más campos.
 * Maneja: nombre, precio, stock y categoría.
 */

import { useState, useEffect } from 'react';
import { crearProducto, actualizarProducto } from '../services/productoService';
import { obtenerCategorias } from '../services/categoriaService';

function ProductoForm({ onSuccess, productoEditar = null }) {
  /**
   * ESTADO DEL FORMULARIO
   * Cada campo del formulario tiene su propio estado
   */
  const [nombre, setNombre] = useState(productoEditar?.nombre || '');
  const [precio, setPrecio] = useState(productoEditar?.precio || '');
  const [stock, setStock] = useState(productoEditar?.stock || '');
  const [categoriaId, setCategoriaId] = useState(productoEditar?.categoriaId || '');
  
  // Estado para la lista de categorías disponibles
  const [categorias, setCategorias] = useState([]);
  
  // Estados de control
  const [guardando, setGuardando] = useState(false);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Cargar categorías al montar el componente
   * Necesitamos las categorías para el select/dropdown
   */
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const datos = await obtenerCategorias();
        setCategorias(datos);
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error('Error:', err);
      } finally {
        setCargandoCategorias(false);
      }
    };

    cargarCategorias();
  }, []);

  /**
   * Validación del formulario
   */
  const validarFormulario = () => {
    if (!nombre.trim()) {
      setError('El nombre del producto es requerido');
      return false;
    }
    
    if (!precio || parseFloat(precio) <= 0) {
      setError('El precio debe ser mayor a 0');
      return false;
    }
    
    if (stock === '' || parseInt(stock) < 0) {
      setError('El stock no puede ser negativo');
      return false;
    }
    
    if (!categoriaId) {
      setError('Debe seleccionar una categoría');
      return false;
    }
    
    return true;
  };

  /**
   * Manejo del envío del formulario
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    try {
      setGuardando(true);
      setError(null);
      
      // Preparamos los datos, convirtiendo los tipos correctamente
      const productoData = {
        nombre: nombre.trim(),
        precio: parseFloat(precio), // Convertimos a número decimal
        stock: parseInt(stock), // Convertimos a número entero
        categoriaId: parseInt(categoriaId) // Convertimos a número entero
      };

      if (productoEditar) {
        await actualizarProducto(productoEditar.id, productoData);
        alert('Producto actualizado exitosamente');
      } else {
        await crearProducto(productoData);
        alert('Producto creado exitosamente');
      }
      
      // Limpiamos el formulario
      setNombre('');
      setPrecio('');
      setStock('');
      setCategoriaId('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Error al guardar el producto. Por favor, intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setGuardando(false);
    }
  };

  /**
   * Si las categorías están cargando, mostramos un mensaje
   */
  if (cargandoCategorias) {
    return <p>Cargando formulario...</p>;
  }

  /**
   * RENDERIZADO DEL FORMULARIO
   */
  return (
    <div className="producto-form">
      <h3>{productoEditar ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre del Producto: <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Laptop HP"
            disabled={guardando}
            className="form-input"
          />
        </div>

        {/* Campo: Precio */}
        <div className="form-group">
          <label htmlFor="precio">
            Precio (S/.): <span className="required">*</span>
          </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: 1299.99"
            step="0.01" // Permite decimales
            min="0"
            disabled={guardando}
            className="form-input"
          />
        </div>

        {/* Campo: Stock */}
        <div className="form-group">
          <label htmlFor="stock">
            Stock: <span className="required">*</span>
          </label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ej: 10"
            min="0"
            disabled={guardando}
            className="form-input"
          />
        </div>

        {/* Campo: Categoría (Select/Dropdown) */}
        <div className="form-group">
          <label htmlFor="categoria">
            Categoría: <span className="required">*</span>
          </label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            disabled={guardando}
            className="form-select"
          >
            <option value="">-- Seleccione una categoría --</option>
            {/* Mapeamos las categorías para crear las opciones */}
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={guardando}
            className="btn-guardar"
          >
            {guardando ? 'Guardando...' : (productoEditar ? 'Actualizar' : 'Crear')}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setNombre('');
              setPrecio('');
              setStock('');
              setCategoriaId('');
              setError(null);
            }}
            disabled={guardando}
            className="btn-limpiar"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductoForm;

/**
 * NUEVOS CONCEPTOS EN ESTE COMPONENTE:
 * 
 * 1. Múltiples estados: Cada campo tiene su propio useState
 * 2. Conversión de tipos: parseFloat(), parseInt()
 * 3. Input type="number": Para campos numéricos
 * 4. Select/Dropdown: Para seleccionar de una lista
 * 5. Cargar datos relacionados: Obtener categorías para el select
 * 6. Validación de tipos: Verificar que los números sean válidos
 */
