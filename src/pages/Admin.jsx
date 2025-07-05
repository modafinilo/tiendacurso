import { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {collection, getDocs, deleteDoc, addDoc,updateDoc,doc} from 'firebase/firestore';
import { db } from '../services/firebase';
import ProductForm from '../components/admin/ProductForm';
import ReactDOM from 'react-dom/client';


const MySwal = withReactContent(Swal);

function Admin() {
    const [productos, setProductos] = useState([]);

    const cargarProductos = async () => {
        const productosRef = collection(db, 'productos');
        const snapshot = await getDocs(productosRef);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(docs);
    };

    const handleNuevo = () => {
        const div = document.createElement('div');
        div.id = 'react-form-container';

        Swal.fire({
            title: 'Nuevo Producto',
            html: div,
            didOpen: () => {
                const container = document.getElementById('react-form-container');
                if (container) {
                    ReactDOM.createRoot(container).render(
                        <ProductForm
                            initialData={null} // <-- MUY IMPORTANTE pasar null
                            onSave={async (formData) => {
                                await addDoc(collection(db, 'productos'), {
                                    ...formData,
                                    stock: 0,
                                    destacado: false
                                });
                                cargarProductos();
                                Swal.close();
                            }}
                        />
                    );
                }
            },
            showConfirmButton: false,
        });
    };
    
    const handleEditar = (producto) => {
        MySwal.fire({
            title: 'Editar Producto',
            html: '<div id="form-container"></div>',
            didOpen: () => {
                const container = document.getElementById('form-container');
                if (container) {
                    ReactDOM.createRoot(container).render(
                        <ProductForm
                            initialData={producto}
                            onSave={async (formData) => {
                                const productoRef = doc(db, 'productos', producto.id);
                                await updateDoc(productoRef, formData);
                                cargarProductos();
                                Swal.close();
                            }}
                            onDelete={async () => {
                                await deleteDoc(doc(db, 'productos', producto.id));
                                cargarProductos();
                                Swal.close();
                                Swal.fire('Eliminado', 'El producto fue eliminado correctamente', 'success');
                            }}
                        />
                    );
                }
            },
            showConfirmButton: false,
        });
    };

    const handleEliminar = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
        });

        if (confirm.isConfirmed) {
            await deleteDoc(doc(db, 'productos', id));
            cargarProductos();
            Swal.fire('Eliminado', 'El producto fue eliminado correctamente', 'success');
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <Container style={{ marginTop: '90px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productos</h2>
                <Button variant="success" onClick={handleNuevo}>
                    Nuevo
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>
                                <img src={prod.imagen} alt={prod.nombre} style={{ width: '80px', height: 'auto' }} />
                            </td>
                            <td>{prod.nombre}</td>
                            <td>{prod.descripcion}</td>
                            <td>${prod.precio}</td>
                            <td>{prod.categoria}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditar(prod)}>
                                    Editar
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleEliminar(prod.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Admin;
