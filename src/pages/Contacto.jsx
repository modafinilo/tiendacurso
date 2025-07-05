import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Contacto() {
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nombre || !form.email || !form.mensaje) {
            MySwal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completá todos los campos obligatorios.',
            });
            return;
        }

        MySwal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Gracias por contactarte. Te responderemos a la brevedad.',
        });

        setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    };

    return (
        <Container style={{ marginTop: '100px', maxWidth: '600px' }}>
            <h2 className="mb-4">Formulario de Contacto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre*</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="asunto">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control
                        type="text"
                        name="asunto"
                        value={form.asunto}
                        onChange={handleChange}
                        placeholder="Motivo del mensaje"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="mensaje">
                    <Form.Label>Mensaje*</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="mensaje"
                        rows={4}
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder="Escribí tu consulta o comentario"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}

export default Contacto;
