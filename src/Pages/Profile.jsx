import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import ListingItem from '../components/ListingItem'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Profile() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState('')
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [auth.currentUser])

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
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

    fetchListing()
  }, [auth.currentUser.uid])

  // LogOut the user
  const handleLogOut = () => {
    auth.signOut()
    navigate('/')
    toast.success('Logged Out')
  }

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListing = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListing)
      toast.success('Listing Deleted')
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <div className="mt-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 mx-4 justify-between place-items-center">
          <div className="w-full card shadow-lg bg-secondary-content ml-4">
            <h1 className="mt-2 font-bold text-2xl ml-4">Personal Details</h1>
            <div className="card-body">
              <h5 className="card-title text-sm">{user.displayName}</h5>
              <p className="card-text text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="w-full md:w-1/2 sm:w-full btn btn-error text-white mt-6"
          >
            Logout
          </button>
        </div>
        <div className="mx-4 mt-4">
          <Link to="/create-listing" className="btn btn-netural w-full md:w-1/2">
            <i className="fa-solid fa-house mr-4"></i> Sell or share your home
          </Link>
        </div>
        {!loading && listings?.length > 0 && (
          <div className="mt-12 mb-4">
            <p className="ml-6 mb-2 font-bold text-lg">Your Listings</p>
            <ul>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
