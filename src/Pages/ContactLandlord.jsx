import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function ContactLandlord() {
  const [message, setMessage] = useState('')
  const [landlord, setLandlord] = useState(null)
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not find landlord')
      }
    }

    getLandlord()
  }, [params.landlordId])

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className="container mx-auto">
      <header>
        <p className='font-bold text-2xl ml-4 mt-2'>Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main className='mx-4'>
          <div>
            <p className='mt-4'>Contact: {landlord?.name}</p>
          </div>
          <form>
            <div className='mb-6 mt-4 h-64'>
              <label htmlFor="message">Message:</label>
              <textarea
                className='form-control textarea textarea-bordered w-full h-full'
                name="message"
                id="message"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              className=''
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='btn btn-neutral w-full mt-8'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default ContactLandlord
