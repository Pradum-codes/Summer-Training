import useFetchProducts from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';

function Home() {
  const { products, loading, error } = useFetchProducts('https://fakestoreapi.com/products');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="diplay grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;
