import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/login"> Login </Link>
                    </li>
                    <li>
                        <Link to="register"> Register </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
