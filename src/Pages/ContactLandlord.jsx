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
        <p>Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div>
            <p>Contact: {landlord?.name}</p>
          </div>
          <form>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='btn btn-neutral w-full'>
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
