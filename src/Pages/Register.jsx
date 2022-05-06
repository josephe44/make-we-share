import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { name, email, password } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handling Registration with email and password
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // getting auth value from getAuth
      const auth = getAuth()

      // Register user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Get User information
      const user = userCredential.user

      // Update the displayName of the user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // copying fromData to formDataCopy without changing it
      const formDataCopy = { ...formData }

      // Delete the password before storing userCredential in firebase
      delete formDataCopy.password

      // creating a timestammp for each user stored in firebase
      formDataCopy.timestammp = serverTimestamp()

      // Storing the user to firebase
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // If successful Registration, Navigate to Home and display a toast
      navigate('/')
      toast.success('Welcome back!')
    } catch (error) {
      // If unsuccessful Registration, display a toast with the error
      toast.error('Could not register')
    }
  }
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-3xl font-bold">Welcom Back!</h1>
          <p className="py-6">
            <strong>Makeweshare</strong> is a platform where you can easily
            access accomodation either for rent or share with someone else.
            without undergoing any stress or disappointment cause by agent.{' '}
            <br /> we are fast and reliable.
          </p>
          <p>You can sign up with google</p>
        </div>
        <div className="card w-full max-w-2xl shadow bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
            <div className="divider">OR</div>
            <div className="form-control mt-6">
              <Link to="/sign-in" className="btn btn-ghost">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
