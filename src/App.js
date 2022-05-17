import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import Register from './Pages/Register'
import ForgotPassword from './Pages/ForgotPassword'
import Offers from './Pages/Offers'
import Profile from './Pages/Profile'
import ContactLandlord from './Pages/ContactLandlord'
import Categories from './Pages/Categories'
import CreateListing from './Pages/CreateListing'
import EditListing from './Pages/EditListing'
import Listing from './Pages/Listing'
import PrivateRoute from './components/PrivateRoute'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:landlordId" element={<ContactLandlord />} />
          <Route path="/category/:categoryName" element={<Categories />} />
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/offers" element={<Offers />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
