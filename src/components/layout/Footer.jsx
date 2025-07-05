import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-5 pt-4 pb-4">
      <div className="container-fluid text-center">
        <Row>
          <Col md={4}>
            <h5>Sobre nosotros</h5>
            <p>Somos una plataforma educativa con años de experiencia ofreciendo cursos de calidad y actualizados.</p>
          </Col>
          <Col md={4}>
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><a href="/cursos" className="text-white">Cursos</a></li>
              <li><a href="/contacto" className="text-white">Contacto</a></li>
              <li><a href="/nosotros" className="text-white">Nosotros</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <p>Email: info@tiendacursos.com</p>
            <p>Teléfono: +54 11 1234-5678</p>
          </Col>
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col className="text-center">
            <small>© {new Date().getFullYear()} Tienda Cursos. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;
