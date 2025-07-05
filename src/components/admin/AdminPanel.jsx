import { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {
    getProductos,
    crearProducto,
    editarProducto,
    eliminarProducto
} from '../../services/firestore';

function AdminPanel() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const data = await getProductos();
        setProductos(data);
    };

    const abrirFormulario = (modo, producto = {}) => {
        Swal.fire({
            title: modo === 'nuevo' ? 'Nuevo Producto' : 'Editar Producto',
            html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre || ''}" />
        <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion || ''}" />
        <input id="precio" type="number" class="swal2-input" placeholder="Precio" value="${producto.precio || ''}" />
        <input id="imagen" class="swal2-input" placeholder="URL de Imagen" value="${producto.imagen || ''}" />
        <input id="categoria" class="swal2-input" placeholder="Categoría" value="${producto.categoria || ''}" />
        <input id="stock" type="number" class="swal2-input" placeholder="Stock" value="${producto.stock || ''}" />
      `,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            showDenyButton: modo === 'editar',
            denyButtonText: 'Eliminar',
            preConfirm: async () => {
                const data = {
                    nombre: document.getElementById('nombre').value,
                    descripcion: document.getElementById('descripcion').value,
                    precio: Number(document.getElementById('precio').value),
                    imagen: document.getElementById('imagen').value,
                    categoria: document.getElementById('categoria').value,
                    stock: Number(document.getElementById('stock').value)
                };
                if (modo === 'nuevo') {
                    await crearProducto(data);
                } else {
                    await editarProducto(producto.id, data);
                }
                await cargarProductos();
            },
            didDeny: async () => {
                const confirmar = await Swal.fire({
                    title: '¿Eliminar?',
                    text: `¿Estás seguro de eliminar "${producto.nombre}"?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'No'
                });
                if (confirmar.isConfirmed) {
                    await eliminarProducto(producto.id);
                    await cargarProductos();
                }
            }
        });
    };

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Administración de Productos</h2>
                <Button variant="primary" onClick={() => abrirFormulario('nuevo')}>
                    Nuevo
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id} onClick={() => abrirFormulario('editar', prod)} style={{ cursor: 'pointer' }}>
                            <td>{prod.nombre}</td>
                            <td>${prod.precio}</td>
                            <td>{prod.categoria}</td>
                            <td>{prod.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminPanel;
