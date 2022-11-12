import { NavLink } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export function Navbar(): JSX.Element {
  const user = useOptionalUser();
  return (
    <nav>
      {user?.email} <NavLink to="/oppskrifter">Oppskrifter</NavLink>
      <NavLink to="/oppskrifter/ny">Ny</NavLink>
    </nav>
  );
}
