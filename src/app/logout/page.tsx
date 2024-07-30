"use client"
import { useEffect } from "react";
import { useAuth } from "../contexts/JWTContext";


export default function Logout(){
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    },[]);
    return(
        <div className="h-screen flex justify-center items-center">
            <h1>Sesion ended</h1>
        </div>
    );
}