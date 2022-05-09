import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'

function Profile() {
  const [user, setUser] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth.currentUser])

  // LogOut the user
  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
    toast.success('Logged Out')
  }

  return (
    <div className="mt-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 justify-between place-items-center">
          <div className="w-full card shadow-lg bg-secondary-content ml-8">
            <h1 className='mt-2 ml-4 font-bold'>Personal Details</h1>
            <div className="card-body">
              <h5 className="card-title text-sm">{user.displayName}</h5>
              <p className="card-text text-xs">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogOut} className=" w-1/2 btn btn-neutral">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
