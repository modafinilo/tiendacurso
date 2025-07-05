import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function NavBar() {
    const { user, rol, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">TiendaCursos</Navbar.Brand>
                <Navbar.Toggle aria-controls="nav-principal" />
                <Navbar.Collapse id="nav-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/cursos">Cursos</Nav.Link>
                        <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>
                        <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
                        {rol === 'admin' && (
                            <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                        )}
                    </Nav>

                    <Nav>
                        {!user ? (
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        ) : (
                            <NavDropdown title={`Hola, ${user.email.split('@')[0]}`} align="end">
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;