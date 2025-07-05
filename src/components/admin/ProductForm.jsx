import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData = {}, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagen: ''
    });

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                precio: initialData.precio || '',
                categoria: initialData.categoria || '',
                imagen: initialData.imagen || ''
            });
        } else {
            // Asegura el reset completo si es nuevo
            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: '',
                imagen: ''
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.precio) {
            alert("El nombre y el precio son obligatorios.");
            return;
        }
        onSave(formData);
    };

    const handleDelete = () => {
        if (onDelete) onDelete();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <label>Nombre del curso</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-2">
                <label>Descripción</label>
                <textarea
                    className="form-control"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-2">
                <label>Precio</label>
                <input
                    type="number"
                    className="form-control"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-2">
                <label>Categoría</label>
                <input
                    type="text"
                    className="form-control"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-2">
                <label>Imagen (URL)</label>
                <input
                    type="text"
                    className="form-control"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
                {onDelete && (
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                        Eliminar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;
