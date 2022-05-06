import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav className="navbar bg-primary text-neutral-content">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          MakeWeShare
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
