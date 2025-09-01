import { Link } from "react-router";

export default function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/leaderboards">Leaderboards</Link>
      </li>
    </ul>
  );
}
