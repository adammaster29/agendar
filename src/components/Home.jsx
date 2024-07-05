import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useForm } from "react-hook-form";

const itemsPerPage = 4;

const Home = ({ actualizar, agregar, eliminar, usuarioSeleccionado, setUsuarioSeleccionado, usuarios }) => {
    const [doctor, setDoctor] = useState(1);
    const [formulario, setFormulario] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    // pagination *******************************************************************************
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Calcular los items a mostrar en la página actual
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(usuarios.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(usuarios.length / itemsPerPage));
    }, [itemOffset, usuarios]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % usuarios.length;
        setItemOffset(newOffset);
    };

    // Cambio de opción
    const change = (option) => {
        setDoctor(option);
    };

    // Formulario
    const formularioPaciente = () => {
        setFormulario(!formulario);
    };

    const submit = (data, e) => {
        e.preventDefault();
        if (usuarioSeleccionado) {
            actualizar(data);
            setUsuarioSeleccionado('');
        } else {
            agregar(data);
        }
        reset();
        setFormulario(false);
    };

    useEffect(() => {
        if (usuarioSeleccionado) {
            setValue("id", usuarioSeleccionado?.id);
            setValue("nombre", usuarioSeleccionado?.nombre);
            setValue("fecha", usuarioSeleccionado?.fecha);
        } else {
            reset(); // Restablecer el formulario si no hay usuario seleccionado
        }
    }, [usuarioSeleccionado, setValue, reset]);

    return (
        <div className='father'>
            <h1>AGENDAR CITAS</h1>
            {doctor === 1 &&
                <div className="hijo">
                    <div onClick={() => change(2)} className="card__hijo">
                        <img src="/img/doctor-uno.png" alt="Doctor Erick" />
                        <p>D. Erick</p>
                    </div>
                    <div onClick={() => change(3)} className="card__hijo">
                        <img src="/img/doctor-dos.png" alt="Doctor Paola" />
                        <p>D. Paola</p>
                    </div>
                    <div onClick={() => change(4)} className="card__hijo">
                        <img src="/img/doctor-tres.png" alt="Doctor Adams" />
                        <p>D. Adams</p>
                    </div>
                    <div onClick={() => change(5)} className="card__hijo">
                        <img src="/img/doctor-cuatro.png" alt="Doctor Rafael" />
                        <p>D. Rafael</p>
                    </div>
                    <div onClick={() => change(6)} className="card__hijo">
                        <img src="/img/doctor-cinco.png" alt="Doctor Antonio" />
                        <p>D. Antonio</p>
                    </div>
                    <div onClick={() => change(7)} className="card__hijo">
                        <img src="/img/doctor-seis.png" alt="Doctor Patricia" />
                        <p>D. Patricia</p>
                    </div>
                </div>
            }

            {[2, 3, 4, 5, 6, 7].includes(doctor) && (
                <div className="option">
                    <div className="contenedor__doctores-formulario">
                        <div className="doctores">
                            <div className='contenedor__name-doctores'>
                                <img className='doctor-agenda' src={`/img/doctor-${doctor === 2 ? 'uno' : doctor === 3 ? 'dos' : doctor === 4 ? 'tres' : doctor === 5 ? 'cuatro' : doctor === 6 ? 'cinco' : 'seis'}.png`} alt={`Doctor ${doctor === 2 ? 'Erick' : doctor === 3 ? 'Paola' : doctor === 4 ? 'Adams' : doctor === 5 ? 'Rafael' : doctor === 6 ? 'Antonio' : 'Patricia'}`} />
                                <p>{doctor === 2 ? 'Erick Martinez' : doctor === 3 ? 'Paola Jimenez' : doctor === 4 ? 'Adam Agudelo' : doctor === 5 ? 'Rafael Perez' : doctor === 6 ? 'Antonio Mercado' : 'Patricia Teran'}</p>
                            </div>

                            <div onClick={formularioPaciente} className="uiverse">
                                <span className="tooltip">Citas</span>
                                <span>Agendar</span>
                            </div>
                            <div onClick={() => change(1)} className="uiverse">
                                <span>Regresar</span>
                            </div>
                        </div>
                        {formulario && (
                            <div className="padre__formulario">
                                <form onSubmit={handleSubmit(submit)}>
                                    <div className="coolinput">
                                        <label htmlFor="id" className="text">Documento:</label>
                                        <input type="text" placeholder="Documento..." {...register("id")} className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label htmlFor="nombre" className="text">Nombre:</label>
                                        <input type="text" placeholder="Nombre..." {...register("nombre")} className="input" />
                                    </div>
                                    <div className="coolinput">
                                        <label htmlFor="fecha" className="text">Fecha:</label>
                                        <input type="date" {...register("fecha")} className="input" />
                                    </div>
                                    <button type="submit" className="button">Agendar</button>
                                </form>
                                <button className="button" onClick={() => setFormulario(false)}>Salir</button>
                            </div>
                        )}
                    </div>
                    <div className="tabla">
                    <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>----</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.fecha}</td>
                <td className='contenedorBtn'>
                  <button className='delete' onClick={() => { eliminar(user.id) }}>Eliminar</button>
                  <button className='edite' onClick={() => { setUsuarioSeleccionado(user), formularioPaciente() }}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                        {/* Componente de paginación */}
                        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}  // Mostrar solo un número de página
          marginPagesDisplayed={0}  // Mostrar solo un número de página en los márgenes
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"selected"}
          disabledClassName={"disabled"}
        />
                    </div>
                </div>
            )}
        </div>
    );
};

const Items = ({ currentItems }) => {
    return (
        <div>
            {currentItems && currentItems.map((item, index) => (
                <div key={index}>
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Home;
