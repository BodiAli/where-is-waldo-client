import { NavLink } from "react-router";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.active : "";
            }}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? styles.active : "";
            }}
            to="/leaderboards"
          >
            Leaderboards
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
