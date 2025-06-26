import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PantallaPrincipal from './components/PantallaPrincipal';
import OrdenesFinalizadas from './components/OrdenesFinalizadas';
import OrdenesRealizadas from './components/OrdenesRealizadas';
import Motivos from './components/Motivos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<PantallaPrincipal />} />
        <Route path="/ordenes" element={<OrdenesFinalizadas />} />
        <Route path="/cerrar" element={<OrdenesRealizadas />} />
        <Route path="/motivos" element={<Motivos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;