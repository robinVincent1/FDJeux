import { Link } from "react-router-dom"
import "../output.css"


export const PageAccueil = () => {
    return (
        <div className="border">
            <Link to="/signin">
                Connexion 
            </Link>
        </div>
    )
}