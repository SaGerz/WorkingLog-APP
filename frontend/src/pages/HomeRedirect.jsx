import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
    const isLoogedIn = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoogedIn){
            navigate("/TaskList");
        } else {
            navigate("/Login");
        }
    }, [isLoogedIn, navigate])
    
}

export default HomeRedirect;