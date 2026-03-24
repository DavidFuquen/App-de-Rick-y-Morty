import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0e1a] border-b border-green-900 px-6 py-4 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 font-bold text-xl tracking-wide">
            Rick & Morty
          </span>
        </div>

        {/* Links */}
        <ul className="flex gap-8">
          {[
            { to: '/characters', label: 'Personajes' },
            { to: '/episodes', label: 'Episodios' },
            { to: '/locations', label: 'Locaciones' },
          ].map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-400 font-bold border-b-2 border-green-400 pb-1 transition-all'
                    : 'text-gray-400 hover:text-green-300 transition-colors'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar