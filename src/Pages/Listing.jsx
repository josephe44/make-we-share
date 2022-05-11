import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css/bundle'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main className="mb-12">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center center / cover no-repeat`,
              }}
              className="relative w-full h-96"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mx-6 my-4">
        <p className="text-xl font-bold">
          {listing.name} - ₦
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="font-semibold mb-4">{listing.location}</p>
        <div className="flex text-center items-center mb-2">
          <p className="badge mr-4">
            For {listing.type === 'rent' ? 'Rent' : 'Share'}
          </p>
          {listing.offer && (
            <p className="font-semibold text-neutral">
              ₦{listing.regularPrice - listing.discountedPrice} discount Price
            </p>
          )}
        </div>
        <ul>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathroom > 1
              ? `${listing.bathroom} Bathroom`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
      </div>
      {/* MAP */}
      <h3 className="ml-6 mb-4 text-xl font-bold">Location</h3>
      <div className="w-full mb-8 h-96 overflow-x-hidden">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[listing.geolocation.lat, listing.geolocation.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          />
          <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
            <Popup>{listing.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
      {auth.currentUser?.uid !== listing.userRef && (
        <div className="container mx-auto">
          <div className="mx-4">
            <Link
              className="btn btn-netural w-full"
              to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            >
              Contact Landlord
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

export default Listing
