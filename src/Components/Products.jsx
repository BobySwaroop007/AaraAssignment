import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://app1.crazzyhub.com/api/all-filter-product-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj'
        },
        body: JSON.stringify({
          category_id: '',
          brand_id: '',
          color_id: ''
        })
      });

      const data = await response.json();
      setProducts(data.data.product_list);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-3xl text-center font-bold mb-8">Mobiles & Tablets</h2>
      {loading ? ( 
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center mx-8 sm:mx-8 md:mx-2">
          {products.map((product) => (
            <Link to={`/product/${product.id}/${product.variant_id}`} key={product.id}> 
              <div className="card d-inline-flex shadow p-3 mb-5 bg-white rounded mx-2" style={{ width: '18rem' }}>
                <div className="relative">
                  <img src={product.image} className="card-img-top" alt={product.title} />
                </div>
                <div className="card-body mx-4">
                  <h5 className="card-title text-lg">{product.title}</h5>
                  <p className="text-green-600">{product.stock_sataus}</p>
                  <p className="font-semibold">&#8377;{product.actual_price}</p>
                  <p className="text-lg font-semibold"><span className="line-through">&#8377;{product.price}</span> <span className="bg-green-500 text-white rounded px-2">{product.discount_percent}% off</span></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
