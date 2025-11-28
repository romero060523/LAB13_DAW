/**
 * PASO 6: FORMULARIO PARA CREAR/EDITAR CATEGORÍAS
 * 
 * Este componente maneja tanto la creación como la edición de categorías.
 * Aprenderás sobre:
 * - Formularios controlados en React
 * - Manejo de eventos de formularios
 * - Validación de datos
 * - Operaciones POST y PUT
 */

import { useState } from 'react';
import { crearCategoria, actualizarCategoria } from '../services/categoriaService';

/**
 * Componente CategoriaForm
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSuccess - Callback que se ejecuta cuando se guarda exitosamente
 * @param {Object} props.categoriaEditar - Categoría a editar (opcional)
 */
function CategoriaForm({ onSuccess, categoriaEditar = null }) {
  /**
   * FORMULARIO CONTROLADO
   * 
   * En React, un formulario controlado es aquel donde el estado del componente
   * controla los valores de los inputs. Cada cambio en el input actualiza el estado.
   */
  
  // Estado para el nombre de la categoría
  const [nombre, setNombre] = useState(categoriaEditar?.nombre || '');
  
  // Estado para manejar el proceso de guardado
  const [guardando, setGuardando] = useState(false);
  
  // Estado para mensajes de error
  const [error, setError] = useState(null);

  /**
   * MANEJO DEL CAMBIO EN EL INPUT
   * 
   * Esta función se ejecuta cada vez que el usuario escribe en el input.
   * event.target.value contiene el nuevo valor del input.
   */
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    setError(null); // Limpiamos el error cuando el usuario empieza a escribir
  };

  /**
   * VALIDACIÓN DEL FORMULARIO
   * 
   * Antes de enviar los datos al backend, validamos que sean correctos.
   */
  const validarFormulario = () => {
    if (!nombre.trim()) {
      setError('El nombre de la categoría es requerido');
      return false;
    }
    
    if (nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return false;
    }
    
    return true;
  };

  /**
   * MANEJO DEL ENVÍO DEL FORMULARIO
   * 
   * Esta función se ejecuta cuando el usuario hace submit del formulario.
   * event.preventDefault() evita que la página se recargue.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // ¡MUY IMPORTANTE! Evita el comportamiento por defecto
    
    // Validamos antes de enviar
    if (!validarFormulario()) {
      return;
    }

    try {
      setGuardando(true);
      setError(null);
      
      // Preparamos los datos a enviar
      const categoriaData = {
        nombre: nombre.trim()
      };

      // Si estamos editando, usamos PUT, si no, usamos POST
      if (categoriaEditar) {
        // ACTUALIZAR categoría existente
        await actualizarCategoria(categoriaEditar.id, categoriaData);
        alert('Categoría actualizada exitosamente');
      } else {
        // CREAR nueva categoría
        await crearCategoria(categoriaData);
        alert('Categoría creada exitosamente');
      }
      
      // Limpiamos el formulario
      setNombre('');
      
      // Llamamos al callback de éxito (normalmente para recargar la lista)
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Error al guardar la categoría. Por favor, intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setGuardando(false);
    }
  };

  /**
   * RENDERIZADO DEL FORMULARIO
   */
  return (
    <div className="categoria-form">
      <h3>{categoriaEditar ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
      
      {/* Mostramos errores si existen */}
      {error && <p className="error">{error}</p>}
      
      {/* 
        Formulario controlado:
        - onSubmit: Se ejecuta al enviar el formulario
        - value: El valor del input viene del estado
        - onChange: Actualiza el estado cuando el usuario escribe
      */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre de la Categoría: <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ej: Electrónica"
            disabled={guardando}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={guardando}
            className="btn-guardar"
          >
            {guardando ? 'Guardando...' : (categoriaEditar ? 'Actualizar' : 'Crear')}
          </button>
          
          {categoriaEditar && (
            <button
              type="button"
              onClick={() => setNombre('')}
              disabled={guardando}
              className="btn-limpiar"
            >
              Limpiar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CategoriaForm;

/**
 * CONCEPTOS CLAVE APRENDIDOS:
 * 
 * 1. Formularios controlados: El estado controla los valores de los inputs
 * 2. event.preventDefault(): Evita el comportamiento por defecto del formulario
 * 3. event.target.value: Obtiene el valor actual del input
 * 4. Validación: Verificar datos antes de enviarlos al backend
 * 5. Props: Recibir funciones y datos desde el componente padre
 * 6. Operador opcional (?.): categoriaEditar?.nombre
 * 7. Operador OR (||): Proporcionar valores por defecto
 * 8. Callbacks: onSuccess para comunicarse con el componente padre
 */
