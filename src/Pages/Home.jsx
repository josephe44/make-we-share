import { Link } from 'react-router-dom'
import HomeSlider from '../components/HomeSlider'
import HouseImage1 from '../assets/house-image/houseImage1.jpg'
import HouseImage2 from '../assets/house-image/houseImage2.jpg'

function Home() {
  return (
    <>
      <div className="2xl:container mx-auto">
        <div className="mx-4 mb-44">
          <HomeSlider />
          <p className="font-bold text-lg mt-4">Categories</p>
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="mt-2">
              <div className="card lg:h-44 md:h-36 sm:h-20">
                <Link to="/category/rent">
                  <figure>
                    <img
                      className="object-cover h-44 w-full"
                      src={HouseImage2}
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
                      className="object-cover h-44 w-full"
                      src={HouseImage1}
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
