import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-cyan-400"
        >
          React Performance Playground
        </NavLink>

        <nav>
          <NavLink
            to="/"
            className="rounded-md px-3 py-2 text-sm hover:bg-slate-800"
          >
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;