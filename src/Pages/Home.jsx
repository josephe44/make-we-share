import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import HouseIamge1 from '../assets/house-image/houseImage1.jpg'
import HouseIamge4 from '../assets/house-image/houseImage4.jpg'

function Home() {
  const [user, setUser] = useState(null)

  const auth = getAuth()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth.currentUser])

  return (
    <>
      <div className="container mx-auto">
        <h1 className="ml-4 mt-6">Categories</h1>
        <div className="grid grid-cols-2 gap-8 items-center mr-4 ml-4">
          <div className="card h-1/2">
            <Link to="/category/rent" clasName="card-body">
              <img
                className="w-full h-full"
                src={HouseIamge4}
                alt="houseImage"
              />
            </Link>
          </div>
          <div className="card h-1/2">
            <Link to="/category/share" clasName="card-body">
              <img
                className="w-full h-full"
                src={HouseIamge4}
                alt="houseImage"
              />
            </Link>
            {/* <div className="card-title">
              <h1 className="font-normal text-sm mt-2 ml-4">House For Share</h1>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
