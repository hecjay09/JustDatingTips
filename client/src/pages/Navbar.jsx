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
            <Link to="/register"> Register </Link>
          </li>
          <li>
            <Link to="/"> Home </Link>
          </li>{" "}
          <li>
            <Link to="/create"> Create a Date </Link>
          </li>
          <li>
            <Link to="/logout"> Logout </Link>
          </li>

        </ul>
      </nav>
    </div>
  );
}
