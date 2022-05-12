import { Link } from 'react-router-dom'

function ListingItem({ id, listing }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 items-center">
        <Link to={`/category/${listing.type}/${id}`} className="card ml-4 mr-4 lg:w-3/4">
          <div className="grid grid-cols-2 gap-2 items-center">
            <figure className="h-40">
              <img
                className="w-full cover"
                src={listing.imageUrls[0]}
                alt={listing.name}
              />
            </figure>
            <div>
              <div className="grid sm:grid-cols-1 md:grid-cols-3">
                <div>
                  {listing.type === 'rent' ? (
                    <p className="badge">Rent</p>
                  ) : (
                    <p className="badge">Share</p>
                  )}
                </div>
                <div>
                  <span className="mr-2">
                    <i className="fa-solid fa-bed"></i>
                  </span>
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : `${listing.bedrooms} Bedroom`}
                </div>
                <div>
                  <span className="mr-2">
                    <i className="fa-solid fa-bath"></i>
                  </span>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Bathrooms`
                    : `${listing.bathrooms} Bathroom`}
                </div>
              </div>
              <p className="font-normal text-xs lg:text-sm mt-2">
                {listing.location}
              </p>
              <p className="font-bold lg:text-xl">{listing.name}</p>
              <p className="font-bold text-neutral">
                ₦
                {listing.offer
                  ? listing.discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {listing.type === 'rent' && ' / month'}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ListingItem