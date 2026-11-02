import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Context from '../src/Context';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(Context);

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
