import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import HomeSlider from '../components/HomeSlider'
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
        <div className="mx-4">
          <HomeSlider />
          <p className="font-bold text-lg my-4">Categories</p>
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="mt-2">
              <div className="card lg:h-44 md:h-36 sm:h-20">
                <Link to="/category/rent">
                  <figure>
                    <img
                      className="w-full h-full"
                      src={HouseIamge4}
                      alt="houseImage"
                    />
                  </figure>
                </Link>
              </div>
              <p className="text-md font-normal my-2">Place for Rent</p>
            </div>
            <div className="mt-2">
              <div className="card lg:h-44 md:h-36 sm:h-20">
                <Link to="/category/share">
                  <figure>
                    <img
                      className="w-full h-full"
                      src={HouseIamge4}
                      alt="houseImage"
                    />
                  </figure>
                </Link>
              </div>
              <p className="text-md font-normal my-2">Places for share</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
