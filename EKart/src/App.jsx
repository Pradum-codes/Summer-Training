import useFetchProducts from "./hooks/dataFetch";

function App() {
  const { products, loading, error } = useFetchProducts('https://fakestoreapi.com/products');

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h4>{product.title}</h4>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App
