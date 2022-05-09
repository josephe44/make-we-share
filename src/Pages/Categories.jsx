import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Categories() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListingCategories = async () => {
      try {
        const listingRef = collection(db, 'listings')
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        const querySnap = await getDocs(q)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListingCategories()
  }, [params.categoryName])

  return (
    <div>
      <div className="container mx-auto">
        <div className="ml-6 my-6">
          <p className='font-bold text-2xl'>
            {params.categoryName === 'rent'
              ? 'Places for rent'
              : 'Places for share'}
          </p>
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
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Categories
