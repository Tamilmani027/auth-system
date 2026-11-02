import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../src/Context';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(Context);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
