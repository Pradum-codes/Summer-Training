import { useEffect, useState } from 'react';

function useFetchProducts(url) {
  const [products, setProducts] = useState(() => {
    const cached = sessionStorage.getItem('products');
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(products.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (products.length > 0) return; // Already cached

    let isMounted = true;

    async function fetchData() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (isMounted) {
          setProducts(data);
          sessionStorage.setItem('products', JSON.stringify(data));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, products]);

  return { products, loading, error };
}

export default useFetchProducts;
