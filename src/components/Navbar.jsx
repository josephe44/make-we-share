import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
      <nav className="navbar bg-neutral text-primary-content">
        <div className="flex-1">
          <Link to="/" className="normal-case text-xl ml-4">
            <i className="fa-solid fa-people-carry-box"></i>
            <span className='text-xs ml-1'>make-we-share</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
