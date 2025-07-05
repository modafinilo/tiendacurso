import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
    const { user, rol } = useAuth();

    if (!user) {
        // No está logueado
        return <Navigate to="/login" />;
    }

    if (rol !== 'admin') {
        // Está logueado pero no es admin
        return <Navigate to="/" />;
    }

    // Es admin
    return children;
}

export default AdminRoute;
