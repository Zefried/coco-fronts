

const AdminMiddleware = ({children}) => {

    const admin = true;

    return (
        admin ? children : <p>access denied</p>
    )
    


}

export default AdminMiddleware;