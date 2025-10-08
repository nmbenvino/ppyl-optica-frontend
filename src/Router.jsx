import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import SobrePage from "@pages/SobrePage";

/**
 * Componente principal de enrutamiento de la aplicación.
 * Define las rutas y los componentes que se renderizan para cada una.
 *
 * @returns {JSX.Element} El componente Router con todas las rutas de la aplicación.
 */
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Rutas para crear, ver, editar o eliminar un sobre */}
          <Route path="/sobres/:action" element={<SobrePage />} />
          <Route path="/sobres/:action/:id" element={<SobrePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
