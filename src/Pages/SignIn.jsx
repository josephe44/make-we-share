import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handling SignIn with email and password
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // getting auth value from getAuth
      const auth = getAuth()

      // SignIn user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Check if User has an account(validation)
      if (userCredential.user) {
        // if true signIn and navigate to home
        navigate('/')
        toast.success('Welcome back!')
      }
    } catch (error) {
      // if user doesn't have an account, display a toast with the error
      toast.error('Bad User Credentials')
    }
  }

  return (
    <div className="container mx-auto">
      <div className="grid place-items-center mb-24">
        <div className="card w-full max-w-2xl shadow bg-base-100 mt-6">
          <div className="card-title mt-4 ml-8">
            <h1 className="text-xl">Welcome Back!</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="email"
                  className="input input-bordered"
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
                />
                <label className="label flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-neutral">Login</button>
              </div>
            </form>
            <div className="divider">OR</div>
            <div className="form-control mt-6">
              <Link to="/sign-up" className="btn btn-ghost">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
