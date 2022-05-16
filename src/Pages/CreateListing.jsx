import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const navigate = useNavigate()
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({ ...formData, userRef: user.uid })
      } else {
        navigate('/sign-in')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Uploading the created listing and doing some validation
  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    // Validation for discountedPrice
    if (discountedPrice >= regularPrice) {
      setLoading(false)
      toast.error('Discounted price needs to be less than regular price')
      return
    }

    // Validation for image upload
    if (images.length > 6) {
      setLoading(false)
      toast.error('Max 6 images')
      return
    }

    // Create the gelocation(gecode)
    let geolocation = {}
    let location

    if (geolocationEnabled) {
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODE_API_KEY}&query=${address}`
      )
      const data = await response.json()

      // adding data from the fetch to the geolocation lat & lng
      geolocation.lat = data.data[0]?.latitude ?? 0
      geolocation.lng = data.data[0]?.longitude ?? 0

      location = data.data[0] ? data.data[0]?.label : undefined

      // Validating the location data
      if (location === undefined || location.includes('undefined')) {
        setLoading(false)
        toast.error('Please enter a valid address')
        return
      }
    } else {
      geolocation.lat = latitude
      geolocation.lng = longitude
    }

    // Store Images in Firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()

        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('upload is pause')
                break
              case 'running':
                console.log('upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    // getting all the uploaded imageUrls from firestore and adding it to the image input
    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error("Image couldn't be uploaded")
      return
    })

    // setting all data gotten from the formData and uploaded imageUrls with goelocation to the formDataCopy
    const formDataCopy = {
      ...formData,
      imageUrls,
      geolocation,
      timestamp: serverTimestamp(),
    }

    // Cleaning up things we dont need in the formDataCopy
    formDataCopy.location = address
    delete formDataCopy.images
    delete formDataCopy.address
    !formDataCopy.offer && delete formDataCopy.discountedPrice

    // Saving formDataCopy to the firebase database
    const docRef = await addDoc(collection(db, 'listings'), formDataCopy)
    setLoading(false)
    toast.success('Listing created successfully')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  // Create an Onchange on the Input
  const onMutate = (e) => {
    let boolean = null

    // turning all true to boolean true
    if (e.target.value === 'true') {
      boolean = true
    }

    // turning all false to boolean false
    if (e.target.value === 'false') {
      boolean = false
    }

    // files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Strings / Numbers / Booleans
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="container mx-auto">
      <header className="mt-4">
        <p className="font-bold text-2xl ml-4">Create a Listing</p>
      </header>
      <main className="mt-8 mx-4 md:w-full lg:w-1/2">
        <form onSubmit={onSubmit}>
          {/* Rent or Share */}
          <div className=" form-control">
            <label>Rent / Share</label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                className={
                  type === 'rent' ? 'btn btn-neutral' : 'btn btn-ghost'
                }
                id="type"
                value="rent"
                onClick={onMutate}
              >
                Rent
              </button>
              <button
                type="button"
                className={
                  type === 'share' ? 'btn btn-neutral' : 'btn btn-ghost'
                }
                id="type"
                value="share"
                onClick={onMutate}
              >
                Share
              </button>
            </div>
            {/* Name of listing */}
            <div className="form-control mb-4">
              <label>Name</label>
              <input
                className="input input-bordered"
                type="text"
                id="name"
                value={name}
                onChange={onMutate}
                maxLength="45"
                minLength="10"
                required
              />
            </div>
            {/* Bedrooms and Bathrooms */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label>Bedrooms</label>
                <input
                  className="input input-bordered"
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
              <div className="form-control">
                <label>Bathrooms</label>
                <input
                  className="input input-bordered"
                  type="number"
                  id="bathrooms"
                  value={bathrooms}
                  onChange={onMutate}
                  min="1"
                  max="50"
                  required
                />
              </div>
            </div>
            {/* Parking */}
            <div>
              <label>Parking spot</label>
              <div className="grid grid-cols-2 gap-4 mb-4 form-control">
                <button
                  type="button"
                  className={parking ? 'btn btn-neutral' : 'btn btn-ghost'}
                  id="parking"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={
                    !parking && parking !== null
                      ? 'btn btn-neutral'
                      : 'btn btn-ghost'
                  }
                  id="parking"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
            {/* furnished */}
            <div className="mb-4">
              <label>Furnished</label>
              <div className="grid grid-cols-2 gap-4 form-control">
                <button
                  type="button"
                  className={furnished ? 'btn btn-neutral' : 'btn btn-ghost'}
                  id="furnished"
                  value={true}
                  onClick={onMutate}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={
                    !furnished && furnished !== null
                      ? 'btn btn-neutral'
                      : 'btn btn-ghost'
                  }
                  id="furnished"
                  value={false}
                  onClick={onMutate}
                >
                  No
                </button>
              </div>
            </div>
            {/* Address */}
            <div className="mb-4">
              <div className="mb-4">
                <label>Address</label>
                <textarea
                  className="form-control textarea textarea-bordered w-full"
                  type="text"
                  id="address"
                  value={address}
                  onChange={onMutate}
                  required
                ></textarea>
              </div>
              {/* geolocationEnabled */}
              {!geolocationEnabled && (
                <>
                  <label className="">Gelocation</label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                      <label>Latitude</label>
                      <input
                        className="input input-bordered"
                        type="number"
                        id="latitude"
                        value={latitude}
                        onChange={onMutate}
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label>Longitude</label>
                      <input
                        className="input input-bordered"
                        type="number"
                        id="longitude"
                        value={longitude}
                        onChange={onMutate}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              {/* Offer */}
              <div className="mb-4">
                <label>Offers</label>
                <div className="grid grid-cols-2 gap-4 form-control">
                  <button
                    type="button"
                    className={offer ? 'btn btn-neutral' : 'btn btn-ghost'}
                    id="offer"
                    value={true}
                    onClick={onMutate}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={
                      !offer && offer !== null
                        ? 'btn btn-neutral'
                        : 'btn btn-ghost'
                    }
                    id="offer"
                    value={false}
                    onClick={onMutate}
                  >
                    No
                  </button>
                </div>
              </div>
              {/* Regular Price */}
              <div className="mb-4">
                <div className="grid w-1/2 mb-4">
                  <div className="form-control">
                    <label>Regular Price</label>
                    <div className="flex items-center">
                      <input
                        className="input input-bordered"
                        type="number"
                        id="regularPrice"
                        value={regularPrice}
                        onChange={onMutate}
                        min="50"
                        max="900000000"
                        required
                      />
                      {type === 'share' && <p className="ml-4">₦ / Month</p>}
                    </div>
                    {/* Discounted Price */}
                    {offer && (
                      <>
                        <div className="form-control mb-4">
                          <label>Discounted Price</label>
                          <div className="flex items-center">
                            <input
                              className="input input-bordered"
                              type="number"
                              id="discountedPrice"
                              value={discountedPrice}
                              onChange={onMutate}
                              min="50"
                              max="900000000"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {/* Images for th listing */}
                    <div className="form-control mb-4">
                      <label className="mb-2">Images</label>
                      <p className="text-sm text-gray-400">
                        The First image will be the cover (max 6)
                      </p>
                      <div className="flex items-center">
                        <input
                          className="input input-bordered"
                          type="file"
                          id="images"
                          onChange={onMutate}
                          max="6"
                          accept=".jpp,.png,.jpeg"
                          multiple
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-control mb-6">
                <button type="submit" className="btn btn-netural w-full">
                  Create Listing
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateListing
