import {useState, useEffect} from 'react'
import ListingItem from '../components/ListingItem'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, 'listings')

      const q = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10)
      )

      const querySnap = await getDocs(q)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListing()
  }, [])

  return (
    <div className='mb-24'>
      <div className="2xl:container mx-auto">
        <div className="ml-6 my-6">
          <p className="font-bold text-2xl">Offers</p>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              id={listing.id}
              listing={listing.data}
            />
          ))}
        </>
      ) : (
        <div className="container mx-auto">
          <p className='ml-6'>No listings for offer</p>
        </div>
      )}
    </div>
  )
}

export default Offers
