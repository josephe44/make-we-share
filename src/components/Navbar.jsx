import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        MakeWeShare
      </Link>
    </div>
  )
}

export default Navbar
