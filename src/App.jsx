import './App.css';
import '../Resposive.css'
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const doctorUser = [
    { id: 10025645874, nombre: "adam agudelo", fecha: "14/05/2024" },
    { id: 245874, nombre: "teresa cordoba", fecha: "10/07/2024" },
    { id: 1010245155, nombre: "andres prasca", fecha: "12/08/2024" },
    { id: 8785414, nombre: "carlos cordoba", fecha: "10/07/2024" },
    { id: 878475, nombre: "jose agudelo", fecha: "12/08/2024" }
  ];

  useEffect(() => {
    setUsuarios(doctorUser);
  }, []);

  const agregar = (data) => {
    setUsuarios([...usuarios, data]);
  };

  const eliminar = (id) => {
    const btnDelete = usuarios.filter(user => user.id !== id);
    setUsuarios(btnDelete);
  };

  const actualizar = (editar) => {
    const index = usuarios.findIndex(user => user.id === usuarioSeleccionado.id);
    const updatedUsuarios = [...usuarios];
    updatedUsuarios[index] = editar;
    setUsuarios(updatedUsuarios);
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              actualizar={actualizar}
              agregar={agregar}
              usuarioSeleccionado={usuarioSeleccionado}
              setUsuarioSeleccionado={setUsuarioSeleccionado}
              eliminar={eliminar}
              usuarios={usuarios}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
