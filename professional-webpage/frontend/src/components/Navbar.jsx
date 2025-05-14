import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navstyling = 'bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition';
  const navstylingHover = 'hover:bg-gray-800 px-4 py-2 rounded-md transition';

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:justify-center">
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex justify-center space-x-8">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? navstyling : navstylingHover}>About Me</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? navstyling : navstylingHover}>Projects</NavLink></li>
          <li><NavLink to="/education" className={({ isActive }) => isActive ? navstyling : navstylingHover}>Education</NavLink></li>
          <li><NavLink to="/skills" className={({ isActive }) => isActive ? navstyling : navstylingHover}>Skills & Tech</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? navstyling : navstylingHover}>Contact Info</NavLink></li>
        </ul>
      </div>

      {menuOpen && (
        <ul className="flex flex-col items-center space-y-4 pb-4 md:hidden">
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? navstyling : navstylingHover}>About Me</NavLink></li>
          <li><NavLink to="/projects" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? navstyling : navstylingHover}>Projects</NavLink></li>
          <li><NavLink to="/education" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? navstyling : navstylingHover}>Education</NavLink></li>
          <li><NavLink to="/skills" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? navstyling : navstylingHover}>Skills & Tech</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? navstyling : navstylingHover}>Contact Info</NavLink></li>
        </ul>
      )}
    </nav>
  );
}
