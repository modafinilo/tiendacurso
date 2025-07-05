import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useCart } from '../context/CartContext';

const MySwal = withReactContent(Swal);

function CursoDetalle() {
    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const { agregarAlCarrito } = useCart(); // ✅ MOVIDO AQUÍ

    useEffect(() => {
        const obtenerCurso = async () => {
            const cursoRef = doc(db, 'productos', id);
            const docSnap = await getDoc(cursoRef);
            if (docSnap.exists()) {
                setCurso({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log('No se encontró el curso');
            }
        };

        obtenerCurso();
    }, [id]);

    const handleCantidad = (valor) => {
        if (valor >= 1 && valor <= curso?.stock) {
            setCantidad(valor);
        }
    };

    const handleAgregar = () => {
        agregarAlCarrito(curso, cantidad); // ✅ Se usa del contexto
        MySwal.fire({
            title: 'Producto agregado',
            text: `Se agregó ${cantidad} unidad(es) de "${curso.nombre}" al carrito.`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        });
    };

    if (!curso) return <p className="text-center mt-5">Cargando curso...</p>;

    return (
        <Container style={{ marginTop: '100px' }}>
            <Row className="align-items-center">
                <Col md={6}>
                    <img src={curso.imagen} alt={curso.nombre} className="img-fluid rounded" />
                </Col>
                <Col md={6}>
                    <h2>{curso.nombre}</h2>
                    <h4 className="text-muted">${curso.precio}</h4>
                    <p className="mt-3">{curso.descripcion}</p>
                    <p><strong>Categoría:</strong> {curso.categoria}</p>

                    <Form.Group controlId="cantidad" className="d-flex align-items-center justify-content-center gap-2 mt-4">
                        <Button variant="secondary" onClick={() => handleCantidad(cantidad - 1)}>-</Button>
                        <Form.Control
                            type="number"
                            value={cantidad}
                            onChange={(e) => handleCantidad(Number(e.target.value))}
                            style={{ width: '80px', margin: '0 10px' }}
                            min={1}
                            max={curso.stock}
                        />
                        <Button variant="secondary" onClick={() => handleCantidad(cantidad + 1)}>+</Button>
                    </Form.Group>

                    <Button variant="primary" className="mt-3" onClick={handleAgregar}>
                        Agregar al carrito
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default CursoDetalle;
