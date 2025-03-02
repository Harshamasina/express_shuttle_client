import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { MutatingDots } from 'react-loader-spinner';

const ProtectedRoute = ({children}) => {
    const { currentUser, loading } = useContext(AuthContext);
    
    if(loading){
        return <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#e5be5c"
                secondaryColor="#3a464e"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loader_route"
            />;
    }

    if (!currentUser || currentUser.emailVerified !== true) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;