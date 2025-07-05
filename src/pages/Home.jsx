import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';
import icono1 from '../assets/flex1.png';
import icono2 from '../assets/certif.png';
import icono3 from '../assets/teach.png';

function Home() {
    const [destacados, setDestacados] = useState([]);

    useEffect(() => {
        const obtenerDestacados = async () => {
            const productosRef = collection(db, 'productos');
            const q = query(productosRef, where('destacado', '==', true));
            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDestacados(docs);
        };

        obtenerDestacados();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: destacados.length < 3 ? destacados.length : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <Container style={{ marginTop: '100px' }}>
            <h2 className="mb-4 text-center">Cursos más vendidos</h2>
            {destacados.length > 0 ? (
                <Slider {...settings}>
                    {destacados.map((curso) => (
                        <div key={curso.id} className="p-3">
                            <div className="card h-100 text-center shadow-sm">
                                <img
                                    src={curso.imagen}
                                    alt={curso.nombre}
                                    className="card-img-top"
                                    style={{ height: '400px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{curso.nombre}</h5>
                                    <p className="card-text text-muted">${curso.precio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-center">No hay cursos destacados en este momento.</p>
            )}

            <hr className="my-5" />

            <Row className="text-center">
                <Col md={4}>
                    <img src={icono1} alt="flexibilidad" style={{ width: 60 }} />
                    <h5 className="mt-3">100% Online</h5>
                    <p>Estudiá desde donde quieras, a tu ritmo y sin horarios fijos.</p>
                </Col>
                <Col md={4}>
                    <img src={icono2} alt="certificado" style={{ width: 60 }} />
                    <h5 className="mt-3">Certificación</h5>
                    <p>Obtené tu certificado digital al finalizar cada curso.</p>
                </Col>
                <Col md={4}>
                    <img src={icono3} alt="docentes" style={{ width: 60 }} />
                    <h5 className="mt-3">Docentes Expertos</h5>
                    <p>Profesionales con experiencia en cada área temática.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
