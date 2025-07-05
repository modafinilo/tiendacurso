import { useCart } from '../context/CartContext';
import { Container, Table, Button, Form } from 'react-bootstrap';

function Carrito() {
    const { carrito, eliminarDelCarrito, actualizarCantidad, calcularTotal } = useCart();

    const handleCantidad = (id, cantidad) => {
        actualizarCantidad(id, cantidad);
    };

    return (
        <Container style={{ marginTop: '100px' }}>
            <h2>Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>${item.precio}</td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.cantidad}
                                            min={1}
                                            onChange={(e) =>
                                                handleCantidad(item.id, parseInt(e.target.value))
                                            }
                                            style={{ width: '80px' }}
                                        />
                                    </td>
                                    <td>${item.precio * item.cantidad}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => eliminarDelCarrito(item.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h4 className="text-end mt-3">Total a pagar: <strong>${calcularTotal()}</strong></h4>
                </>
            )}
        </Container>
    );
}

export default Carrito;
