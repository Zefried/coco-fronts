import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "../../CustomStateManage/OrgUnits/AuthState";

const AdminOnly = ({ children }) => {
    const navigate = useNavigate();
    const authState = AuthAction.getState('sunState');
    const role = authState?.role;
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!authState.isAuthenticated || role !== 'admin') {
            navigate('/admin-login', { replace: true });
        } else {
            setVerified(true); // allow render if admin
        }
    }, [authState, role, navigate]);

    if (!verified) return null; // render nothing until verification

    return <>{children}</>;
};

export default AdminOnly;
