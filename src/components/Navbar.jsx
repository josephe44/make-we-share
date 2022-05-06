import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav className="navbar bg-neutral text-primary-content">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <i className="fa-solid fa-people-carry-box"></i>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <Link to="/offers" className="text-sm">
                <i className="fa-solid fa-tag text-xs"></i>Offers
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-sm">
                <i className="fa-regular fa-user text-xs"></i>Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
