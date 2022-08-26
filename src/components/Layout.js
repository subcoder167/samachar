import {useEffect} from 'react'
import { useNavigate,Outlet,useLocation } from "react-router-dom"

const Layout = () => {
    const navigate= useNavigate()
    useEffect(() => {
        if(window.location.pathname=="/")
        navigate('/login',{from:'/',replace:true})
    }, []);
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default Layout
