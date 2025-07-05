import { Container, Row, Col } from 'react-bootstrap';

function Nosotros() {
    return (
        <Container style={{ marginTop: '100px' }}>
            <Row className="mb-5">
                <Col>
                    <h2>Sobre Nosotros</h2>
                    <p className="lead">
                        En <strong>Aprendé Hoy</strong>, creemos que la educación transforma vidas. Somos una plataforma argentina de cursos virtuales que desde hace más de 10 años conecta a personas con herramientas reales para desarrollarse profesional y personalmente.
                    </p>
                    <p>
                        Nacimos con la misión de democratizar el acceso a la formación de calidad, brindando contenidos actualizados, docentes con experiencia y una experiencia de usuario simple e intuitiva.
                    </p>
                    <p>
                        Nuestra propuesta está orientada a quienes buscan capacitarse a su ritmo, desde cualquier lugar y con el respaldo de una comunidad que acompaña. Contamos con cursos en áreas como programación, marketing digital, diseño gráfico, administración, salud y muchas más.
                    </p>
                    <p>
                        Con más de <strong>25.000 estudiantes</strong> en toda Latinoamérica, seguimos apostando al conocimiento como motor de cambio. Porque aprender no es un lujo, es un derecho.
                    </p>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h4>Nuestros valores</h4>
                    <ul>
                        <li>Educación accesible y de calidad</li>
                        <li>Compromiso con nuestros alumnos</li>
                        <li>Innovación en contenidos y tecnología</li>
                        <li>Respeto por la diversidad de trayectorias</li>
                    </ul>
                </Col>
                <Col md={6}>
                    <h4>¿Por qué elegirnos?</h4>
                    <ul>
                        <li>Cursos certificados</li>
                        <li>Docentes profesionales en cada área</li>
                        <li>Soporte técnico y académico permanente</li>
                        <li>Modalidad flexible y 100% online</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Nosotros;
