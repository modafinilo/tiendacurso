import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const productosRef = collection(db, 'productos');

export async function getProductos() {
    const snapshot = await getDocs(productosRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function crearProducto(data) {
    await addDoc(productosRef, data);
}

export async function editarProducto(id, data) {
    const ref = doc(db, 'productos', id);
    await updateDoc(ref, data);
}

export async function eliminarProducto(id) {
    const ref = doc(db, 'productos', id);
    await deleteDoc(ref);
}
