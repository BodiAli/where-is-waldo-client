import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboards">Leaderboards</Link>
        </li>
      </ul>
    </header>
  );
}
