import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl max-w-sm mx-auto">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xm font-semibold px-2 py-1 rounded-full">
            {product.category}
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 truncate mb-2">{product.title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'No description available'}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-indigo-700">${product.price.toFixed(2)}</p>
            <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;