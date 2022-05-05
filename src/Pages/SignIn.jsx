import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    navigate('/')
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
          <p>You can sign in with google</p>
        </div>
        <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
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
                  <Link to="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
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
