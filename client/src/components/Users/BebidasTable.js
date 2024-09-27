import React, { useEffect, useState } from 'react';
import { fetchBebidas, createBebida, updateBebida, deleteBebida } from '../../api'; // Importa las funciones desde api.js
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';  // Importa los íconos

const BebidasTable = () => {
    const [bebidas, setBebidas] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newBebida, setNewBebida] = useState({
        nombre: '',
        foto: '',
        variedad: '',
        cosecha: '',
        region: '',
        elaboracion: '',
        publicaPrecio: true,
        precio: 0,
        otrasPropiedades: '',
        disponibilidad: true,
        orden: 1
    });
    const [selectedBebida, setSelectedBebida] = useState(null);

    useEffect(() => {
        fetchBebidas()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setBebidas(response.data);
                } else {
                    console.error('La respuesta no es un arreglo:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener las bebidas:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBebida({
            ...newBebida,
            [name]: value
        });
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        createBebida(newBebida)
            .then(response => {
                setBebidas([...bebidas, response.data]);
                handleCloseAdd();
            })
            .catch(error => {
                console.error('Error al crear la bebida:', error);
            });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        updateBebida(selectedBebida._id, newBebida)
            .then(response => {
                setBebidas(bebidas.map(bebida => bebida._id === selectedBebida._id ? response.data : bebida));
                handleCloseEdit();
            })
            .catch(error => {
                console.error('Error al editar la bebida:', error);
            });
    };

    const handleCloseAdd = () => {
        setShowAddModal(false);
        setNewBebida({
            nombre: '',
            foto: '',
            variedad: '',
            cosecha: '',
            region: '',
            elaboracion: '',
            publicaPrecio: true,
            precio: 0,
            otrasPropiedades: '',
            disponibilidad: true,
            orden: 1
        });
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedBebida(null);
        setNewBebida({
            nombre: '',
            foto: '',
            variedad: '',
            cosecha: '',
            region: '',
            elaboracion: '',
            publicaPrecio: true,
            precio: 0,
            otrasPropiedades: '',
            disponibilidad: true,
            orden: 1
        });
    };

    const openEditModal = (bebida) => {
        setSelectedBebida(bebida);
        setNewBebida(bebida);
        setShowEditModal(true);
    };

    const handleDeleteBebida = (id) => {
        deleteBebida(id)
            .then(() => {
                setBebidas(bebidas.filter(bebida => bebida._id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la bebida:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h4>Lista de Bebidas</h4>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
                + Agregar Bebida
            </Button>

            {/* Modal para agregar nueva bebida */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nueva Bebida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAdd}>
                        <Form.Group controlId="formBebidaNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={newBebida.nombre} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaFoto">
                            <Form.Label>Foto URL</Form.Label>
                            <Form.Control type="text" name="foto" value={newBebida.foto} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBebidaVariedad">
                            <Form.Label>Variedad</Form.Label>
                            <Form.Control type="text" name="variedad" value={newBebida.variedad} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaCosecha">
                            <Form.Label>Cosecha</Form.Label>
                            <Form.Control type="text" name="cosecha" value={newBebida.cosecha} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaRegion">
                            <Form.Label>Región</Form.Label>
                            <Form.Control type="text" name="region" value={newBebida.region} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaElaboracion">
                            <Form.Label>Elaboración</Form.Label>
                            <Form.Control type="text" name="elaboracion" value={newBebida.elaboracion} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" name="precio" value={newBebida.precio} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaOtrasPropiedades">
                            <Form.Label>Otras Propiedades</Form.Label>
                            <Form.Control type="text" name="otrasPropiedades" value={newBebida.otrasPropiedades} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBebidaDisponibilidad">
                            <Form.Check
                                type="checkbox"
                                label="Disponible"
                                name="disponibilidad"
                                checked={newBebida.disponibilidad}
                                onChange={(e) => setNewBebida({ ...newBebida, disponibilidad: e.target.checked })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Agregar Bebida
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal para editar bebida */}
            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Bebida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEdit}>
                        <Form.Group controlId="formBebidaNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={newBebida.nombre} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaFoto">
                            <Form.Label>Foto URL</Form.Label>
                            <Form.Control type="text" name="foto" value={newBebida.foto} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBebidaVariedad">
                            <Form.Label>Variedad</Form.Label>
                            <Form.Control type="text" name="variedad" value={newBebida.variedad} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaCosecha">
                            <Form.Label>Cosecha</Form.Label>
                            <Form.Control type="text" name="cosecha" value={newBebida.cosecha} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaRegion">
                            <Form.Label>Región</Form.Label>
                            <Form.Control type="text" name="region" value={newBebida.region} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaElaboracion">
                            <Form.Label>Elaboración</Form.Label>
                            <Form.Control type="text" name="elaboracion" value={newBebida.elaboracion} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaPrecio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" name="precio" value={newBebida.precio} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBebidaOtrasPropiedades">
                            <Form.Label>Otras Propiedades</Form.Label>
                            <Form.Control type="text" name="otrasPropiedades" value={newBebida.otrasPropiedades} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBebidaDisponibilidad">
                            <Form.Check
                                type="checkbox"
                                label="Disponible"
                                name="disponibilidad"
                                checked={newBebida.disponibilidad}
                                onChange={(e) => setNewBebida({ ...newBebida, disponibilidad: e.target.checked })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Actualizar Bebida
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Tabla de bebidas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Foto</th>
                        <th>Variedad</th>
                        <th>Cosecha</th>
                        <th>Región</th>
                        <th>Elaboración</th>
                        <th>Precio</th>
                        <th>Disponibilidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bebidas.map(bebida => (
                        <tr key={bebida._id}>
                            <td>{bebida.nombre}</td>
                            <td>
                                <img src={bebida.foto} alt={bebida.nombre} style={{ width: '50px', height: 'auto' }} />
                            </td>
                            <td>{bebida.variedad}</td>
                            <td>{bebida.cosecha}</td>
                            <td>{bebida.region}</td>
                            <td>{bebida.elaboracion}</td>
                            <td>${bebida.precio}</td>
                            <td>{bebida.disponibilidad ? 'Sí' : 'No'}</td>
                            <td>
                                <Button variant="warning" onClick={() => openEditModal(bebida)}>
                                    <FaPencilAlt />
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteBebida(bebida._id)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BebidasTable;
