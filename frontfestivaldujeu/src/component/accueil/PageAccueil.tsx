import { Link } from "react-router-dom"
import "../output.css"
import Navbar from "../layout/Navbar"

export const PageAccueil = () => {
    return (
        <div className="border">
            <Navbar/>
            <Link to="/signin">
                Connexion 
            </Link>
        </div>
    )
}