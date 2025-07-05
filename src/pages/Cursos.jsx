import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cursos() {
    const [cursos, setCursos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarCursos = async () => {
            const productosRef = collection(db, 'productos');
            const snapshot = await getDocs(productosRef);
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCursos(docs);
        };

        cargarCursos();
    }, []);

    return (
        <Container style={{ marginTop: '100px' }}>
            <h2 className="mb-4">Nuestros Cursos</h2>
            <Row>
                {cursos.map((curso) => (
                    <Col key={curso.id} sm={6} md={4} lg={3} className="mb-4">
                        <Card style={{ height: '100%' }}>
                            <Card.Img
                                variant="top"
                                src={curso.imagen}
                                alt={curso.nombre}
                                style={{ objectFit: 'cover', height: '300px' }}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Title>{curso.nombre}</Card.Title>
                                    <Card.Text>${curso.precio}</Card.Text>
                                </div>
                                <Button variant="primary" onClick={() => navigate(`/curso/${curso.id}`)}>
                                    Ver más
                                </Button>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Cursos;
