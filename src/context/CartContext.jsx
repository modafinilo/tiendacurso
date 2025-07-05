import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto, cantidad) => {
        setCarrito((prev) => {
            const existente = prev.find((item) => item.id === producto.id);
            if (existente) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad }];
            }
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                actualizarCantidad,
                calcularTotal, // ✅ ya disponible para usar
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
