import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center text-gray-600 text-lg font-medium">Loading product details...</p>;

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-contain max-h-[500px] mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.title}</h2>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 text-base mb-6 leading-relaxed">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-indigo-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
              Add to Cart
            </button>
            <button className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-semibold text-base hover:bg-indigo-200 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;