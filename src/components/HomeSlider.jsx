import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { db } from '../firebase.config'
import Spinner from './Spinner'
import 'swiper/css/bundle'

function HomeSlider() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className="mt-4 mb-2 font-bold text-lg">Recommended</p>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center center / cover no-repeat`,
                }}
                className="relative w-full h-72"
              >
                <p className="absolute top-24 p-2 max-w-full font-bold lg:text-xl md:text-lg bg-neutral text-white">
                  {data.name}
                </p>
                <p className="absolute top-36 p-2 max-w-full font-bold text-md bg-white text-neutral">
                  ₦{data.discountedPrice ?? data.regularPrice}
                  {''}
                  {data.type === 'rent' && ' / month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default HomeSlider
