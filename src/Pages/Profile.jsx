import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()

  // LogOut the user
  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
    toast.success('Logged Out')
  }

  return (
    <div className="mt-4">
      <button onClick={handleLogOut} className="btn btn-primary">
        Logout
      </button>
    </div>
  )
}

export default Profile
