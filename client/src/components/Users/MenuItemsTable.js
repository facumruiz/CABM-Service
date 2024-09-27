import React, { useEffect, useState } from 'react';
import { fetchMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../../api';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const MenuItemsTable = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newMenuItem, setNewMenuItem] = useState({
        nombre: '',
        foto: '',
        tipo: 'Entrada',
        ingredientes: [''],
        preparacion: '',
        aptoCeliaco: false,
        otros: [{ etiqueta: '', contenido: '' }], // Asegúrate de que haya un objeto con los campos requeridos
        orden: 0,
    });
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    useEffect(() => {
        fetchMenuItems()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setMenuItems(response.data);
                } else {
                    console.error('La respuesta no es un arreglo:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener los ítems del menú:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenuItem({
            ...newMenuItem,
            [name]: value
        });
    };

    const handleArrayChange = (e, index) => {
        const { name, value } = e.target;
        const updatedArray = [...newMenuItem[name]];
        updatedArray[index] = value;
        setNewMenuItem({ ...newMenuItem, [name]: updatedArray });
    };

    const handleOtrosChange = (e, index, field) => {
        const { value } = e.target;
        const updatedOtros = [...newMenuItem.otros];
        updatedOtros[index][field] = value;
        setNewMenuItem({ ...newMenuItem, otros: updatedOtros });
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        createMenuItem(newMenuItem)
            .then(response => {
                setMenuItems([...menuItems, response.data]);
                handleCloseAdd();
            })
            .catch(error => {
                console.error('Error al crear el ítem del menú:', error);
            });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        updateMenuItem(selectedMenuItem._id, newMenuItem)
            .then(response => {
                setMenuItems(menuItems.map(item => item._id === selectedMenuItem._id ? response.data : item));
                handleCloseEdit();
            })
            .catch(error => {
                console.error('Error al editar el ítem del menú:', error);
            });
    };

    const handleCloseAdd = () => {
        setShowAddModal(false);
        setNewMenuItem({
            nombre: '',
            foto: '',
            tipo: 'Entrada',
            ingredientes: [''],
            preparacion: '',
            aptoCeliaco: false,
            otros: [{ etiqueta: '', contenido: '' }], // Resetea con un objeto que tenga los campos requeridos
            orden: 0,
        });
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setSelectedMenuItem(null);
        handleCloseAdd();
    };

    const openEditModal = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setNewMenuItem(menuItem);
        setShowEditModal(true);
    };

    const handleDeleteMenuItem = (id) => {
        deleteMenuItem(id)
            .then(() => {
                setMenuItems(menuItems.filter(item => item._id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar el ítem del menú:', error);
            });
    };

    const addOtroField = () => {
        setNewMenuItem({ ...newMenuItem, otros: [...newMenuItem.otros, { etiqueta: '', contenido: '' }] });
    };

    const removeOtroField = (index) => {
        const updatedOtros = newMenuItem.otros.filter((_, i) => i !== index);
        setNewMenuItem({ ...newMenuItem, otros: updatedOtros });
    };

    return (
        <div className="container mt-5">
            <h4>Lista de Ítems del Menú</h4>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
                + Agregar Ítem
            </Button>

            {/* Modal para agregar nuevo ítem */}
            <Modal show={showAddModal} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Ítem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitAdd}>
                        <Form.Group controlId="formMenuItemNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={newMenuItem.nombre} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemFoto">
                            <Form.Label>Foto URL</Form.Label>
                            <Form.Control type="text" name="foto" value={newMenuItem.foto} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" name="tipo" value={newMenuItem.tipo} onChange={handleInputChange} required>
                                <option value="Entrada">Entrada</option>
                                <option value="Plato">Plato</option>
                                <option value="Postre">Postre</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMenuItemIngredientes">
                            <Form.Label>Ingredientes</Form.Label>
                            {newMenuItem.ingredientes.map((ingrediente, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    name="ingredientes"
                                    value={ingrediente}
                                    onChange={(e) => handleArrayChange(e, index)}
                                    placeholder={`Ingrediente ${index + 1}`}
                                    required
                                />
                            ))}
                        </Form.Group>
                        <Form.Group controlId="formMenuItemPreparacion">
                            <Form.Label>Preparación</Form.Label>
                            <Form.Control type="text" name="preparacion" value={newMenuItem.preparacion} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemAptoCeliaco">
                            <Form.Check
                                type="checkbox"
                                label="Apto Celíaco"
                                name="aptoCeliaco"
                                checked={newMenuItem.aptoCeliaco}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, aptoCeliaco: e.target.checked })}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formMenuItemOtros">
                            <Form.Label>Otros</Form.Label>
                            {newMenuItem.otros.map((otro, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <Form.Control
                                        type="text"
                                        value={otro.etiqueta}
                                        onChange={(e) => handleOtrosChange(e, index, 'etiqueta')}
                                        placeholder="Etiqueta"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        value={otro.contenido}
                                        onChange={(e) => handleOtrosChange(e, index, 'contenido')}
                                        placeholder="Contenido"
                                        required
                                    />
                                    <Button variant="danger" onClick={() => removeOtroField(index)} className="ml-2">Eliminar</Button>
                                </div>
                            ))}
                            <Button variant="primary" onClick={addOtroField}>Agregar Otro Campo</Button>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Agregar Ítem
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal para editar ítem */}
            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Ítem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitEdit}>
                        <Form.Group controlId="formMenuItemNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="nombre" value={newMenuItem.nombre} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemFoto">
                            <Form.Label>Foto URL</Form.Label>
                            <Form.Control type="text" name="foto" value={newMenuItem.foto} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control as="select" name="tipo" value={newMenuItem.tipo} onChange={handleInputChange} required>
                                <option value="Entrada">Entrada</option>
                                <option value="Plato">Plato</option>
                                <option value="Postre">Postre</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formMenuItemIngredientes">
                            <Form.Label>Ingredientes</Form.Label>
                            {newMenuItem.ingredientes.map((ingrediente, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    name="ingredientes"
                                    value={ingrediente}
                                    onChange={(e) => handleArrayChange(e, index)}
                                    placeholder={`Ingrediente ${index + 1}`}
                                    required
                                />
                            ))}
                        </Form.Group>
                        <Form.Group controlId="formMenuItemPreparacion">
                            <Form.Label>Preparación</Form.Label>
                            <Form.Control type="text" name="preparacion" value={newMenuItem.preparacion} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formMenuItemAptoCeliaco">
                            <Form.Check
                                type="checkbox"
                                label="Apto Celíaco"
                                name="aptoCeliaco"
                                checked={newMenuItem.aptoCeliaco}
                                onChange={(e) => setNewMenuItem({ ...newMenuItem, aptoCeliaco: e.target.checked })}
                            />
                        </Form.Group>
                        
                        <Form.Group controlId="formMenuItemOtros">
                            <Form.Label>Otros</Form.Label>
                            {newMenuItem.otros.map((otro, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <Form.Control
                                        type="text"
                                        value={otro.etiqueta}
                                        onChange={(e) => handleOtrosChange(e, index, 'etiqueta')}
                                        placeholder="Etiqueta"
                                        required
                                    />
                                    <Form.Control
                                        type="text"
                                        value={otro.contenido}
                                        onChange={(e) => handleOtrosChange(e, index, 'contenido')}
                                        placeholder="Contenido"
                                        required
                                    />
                                    <Button variant="danger" onClick={() => removeOtroField(index)} className="ml-2">Eliminar</Button>
                                </div>
                            ))}
                            <Button variant="primary" onClick={addOtroField}>Agregar Otro Campo</Button>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Foto</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item._id}>
                            <td>{item.nombre}</td>
                            <td><img src={item.foto} alt={item.nombre} style={{ width: '50px' }} /></td>
                            <td>{item.tipo}</td>
                            <td>
                                <Button variant="warning" onClick={() => openEditModal(item)}>
                                    <FaPencilAlt />
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteMenuItem(item._id)}>
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

export default MenuItemsTable;
