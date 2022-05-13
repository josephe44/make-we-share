import { Link } from 'react-router-dom'

function ListingItem({ id, listing, onDelete, onEdit }) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 items-center">
        <Link
          to={`/category/${listing.type}/${id}`}
          className="card ml-4 mr-4 lg:w-3/4"
        >
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <div className="card">
              <figure className="h-40">
                <img
                  className="w-full cover"
                  src={listing.imageUrls[0]}
                  alt={listing.name}
                />
              </figure>
            </div>
            <div>
              <div className="card grid sm:grid-cols-1 md:grid-cols-3 mt-2">
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
              <p className="font-bold lg:text-2xl md:text-xl mt-2">
                {listing.name}
              </p>
              <div className="flex">
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
                <div className="ml-2">
                  {listing.type === 'rent' ? (
                    <p className="badge p-2">Rent</p>
                  ) : (
                    <p className="badge p-2">Share</p>
                  )}
                </div>
              </div>
              <div className="flex mt-4">
                <div className="mr-4">
                  {onDelete && (
                    <div
                      className="badge badge-error py-4"
                      onClick={() => onDelete(listing.id, listing.name)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                      {''}Delete
                    </div>
                  )}
                </div>
                <div>
                  {onEdit && (
                    <div className="badge badge-warning py-4" onClick={() => onEdit(id)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                      {''}Edit
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ListingItem
