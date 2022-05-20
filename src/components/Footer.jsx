import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="fixed right-0 bottom-0 left-0 h-20 bg-neutral text-white flex justify-center items-center z-50">
      <nav className="w-full mt-2 overflow-y-hidden">
        <ul className="m-0 p-0 flex justify-evenly items-center font-semibold">
          <li
            className="cursor-pointer flex flex-col items-center"
            onClick={() => navigate('/')}
          >
            <p><i class="fa-solid fa-house"></i></p>
            <p>Explore</p>
          </li>
          <li
            className="cursor-pointer flex flex-col items-center"
            onClick={() => navigate('/offers')}
          >
            <p><i className="fa-solid fa-tag"></i></p>
           <p>Offers</p>
          </li>
          <li
            className="cursor-pointer flex flex-col items-center"
            onClick={() => navigate('/profile')}
          >
            <p>
              <i className="fa-regular fa-user"></i>
            </p>
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
