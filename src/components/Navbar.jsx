import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navstyling = 'bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition flex flex-col items-center space-y-1';
  const navstylingHover = 'hover:bg-gray-800 px-4 py-2 rounded-md transition flex flex-col items-center space-y-1';

  const emojiSpan = (code) => (
    <span
      className="text-white text-xl"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-center px-4 py-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <NavLink
              to="/"
              end
              title="About Me"
              className={({ isActive }) => isActive ? navstyling : navstylingHover}
            >
              {emojiSpan("&#128100;")}
              <span className="text-sm hidden md:block">About Me</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              title="Projects"
              className={({ isActive }) => isActive ? navstyling : navstylingHover}
            >
              {emojiSpan("&#128187;")}
              <span className="text-sm hidden md:block">Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/education"
              title="Education"
              className={({ isActive }) => isActive ? navstyling : navstylingHover}
            >
              {emojiSpan("&#127891;")}
              <span className="text-sm hidden md:block">Education</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/skills"
              title="Skills & Tech"
              className={({ isActive }) => isActive ? navstyling : navstylingHover}
            >
              {emojiSpan("&#128736;&#65039;")}
              <span className="text-sm hidden md:block">Skills & Tech</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              title="Contact Info"
              className={({ isActive }) => isActive ? navstyling : navstylingHover}
            >
              {emojiSpan("&#128222;")}
              <span className="text-sm hidden md:block">Contact Info</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
