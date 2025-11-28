/**
 * PASO 8: INTEGRACIÓN DE COMPONENTES EN APP.JSX
 * 
 * Este es el componente principal que integra todos los componentes creados.
 * Usamos un sistema de pestañas simple para navegar entre secciones.
 */

import { useState, useRef } from 'react';
import './App.css';

// Importamos todos los componentes que creamos
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';

function App() {
  /**
   * ESTADO PARA NAVEGACIÓN
   * Controlamos qué sección mostrar con un estado
   */
  const [seccionActiva, setSeccionActiva] = useState('categorias');
  
  /**
   * REFERENCIAS PARA RECARGAR LISTAS
   * useRef nos permite mantener referencias a funciones de los componentes hijos
   * sin causar re-renderizados innecesarios
   */
  const categoriaListRef = useRef(null);
  const productoListRef = useRef(null);

  /**
   * Callback que se ejecuta cuando se crea/actualiza una categoría
   * Esto permite recargar la lista automáticamente
   */
  const handleCategoriaSuccess = () => {
    // Aquí podrías recargar la lista si tuvieras una referencia
    console.log('Categoría guardada exitosamente');
  };

  /**
   * Callback para productos
   */
  const handleProductoSuccess = () => {
    console.log('Producto guardado exitosamente');
  };

  /**
   * RENDERIZADO PRINCIPAL
   */
  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">
        <h1>🛒 Sistema de Gestión de Productos</h1>
        <p>Consumiendo APIs de Microservicios con React + Axios</p>
      </header>

      {/* NAVEGACIÓN POR PESTAÑAS */}
      <nav className="app-nav">
        <button
          className={seccionActiva === 'categorias' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setSeccionActiva('categorias')}
        >
          📁 Categorías
        </button>
        <button
          className={seccionActiva === 'productos' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setSeccionActiva('productos')}
        >
          📦 Productos
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-main">
        {/* SECCIÓN DE CATEGORÍAS */}
        {seccionActiva === 'categorias' && (
          <div className="seccion">
            <div className="seccion-grid">
              {/* Formulario para crear categorías */}
              <div className="seccion-col">
                <CategoriaForm onSuccess={handleCategoriaSuccess} />
              </div>
              
              {/* Lista de categorías */}
              <div className="seccion-col">
                <CategoriaList ref={categoriaListRef} />
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN DE PRODUCTOS */}
        {seccionActiva === 'productos' && (
          <div className="seccion">
            <div className="seccion-grid">
              {/* Formulario para crear productos */}
              <div className="seccion-col">
                <ProductoForm onSuccess={handleProductoSuccess} />
              </div>
              
              {/* Lista de productos */}
              <div className="seccion-col">
                <ProductoList ref={productoListRef} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          💡 <strong>Arquitectura:</strong> API Gateway (8080) → Eureka Server → 
          Categoria Service + Producto Service
        </p>
        <p>
          🔧 <strong>Stack:</strong> React + Vite + Axios | Spring Boot + Spring Cloud
        </p>
      </footer>
    </div>
  );
}

export default App;

/**
 * CONCEPTOS FINALES APRENDIDOS:
 * 
 * 1. Composición de componentes: Combinar múltiples componentes en uno principal
 * 2. Navegación con estado: Cambiar entre secciones usando useState
 * 3. Renderizado condicional: Mostrar componentes según el estado
 * 4. Callbacks: Comunicación entre componentes padre e hijo
 * 5. useRef: Mantener referencias sin causar re-renderizados
 * 6. Organización de código: Separar en componentes reutilizables
 */
