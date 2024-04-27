import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const IndividualProduct = () => {
  const { product_id,variant_id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedRamPrice, setSelectedRamPrice] = useState(null);
  const [selectedMrp, setSelectedMrp] = useState(null);
  const [selectRam, selectedRam] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [set,  condition] = useState(false);


  useEffect(() => {
    fetchProduct();
  }, [product_id,variant_id])

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://app1.crazzyhub.com/api/product-details-api/?product_id=${product_id}&variant_id=${variant_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj'
        }
      });

      const data = await response.json();
      setProduct(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleRamClick = async (ram) => {
    selectedRam(ram.value);
    try {
      const response = await fetch(`https://app1.crazzyhub.com/api/product-variant-filter-api/?product_id=${product_id}&variant_id=${variant_id}&color_variant_id=1849&other_variant_id=${ram.id}&search=other`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj'
        }
      });
  
      const data = await response.json();
      console.log(data.related_products);
       
      console.log(ram);
      setSelectedMrp(data.data.price);
      setSelectedRamPrice(data.data.price);
      setSelectedDiscount(data.data.discount_percent
    );
    } catch (error) {
      console.error('Error fetching RAM price:', error);
    }
  };
  const handleStorage = async (ram) => {
    try {
      const response = await fetch(`https://app1.crazzyhub.com/api/product-variant-filter-api/?product_id=${product_id}&variant_id=${variant_id}&color_variant_id=1849&other_variant_id=${ram}&search=other`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '7c2b8693d001c79d4b5ed6ebc387ad6b862989dfjhjjhj'
        }
      });
  
      const data = await response.json();
      console.log(data.related_products);
      setRelatedProducts(data.related_products);
      condition(true);
       
      console.log(ram);
      setSelectedMrp(data.data.price);
      setSelectedRamPrice(data.data.price);
      setSelectedDiscount(data.data.discount_percent
    );
    } catch (error) {
      console.error('Error fetching RAM price:', error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
          <img src={selectedColor ? selectedColor.variant_image : product.variant_image} alt={product.variant_image} className="w-64" />
          <img src={selectedColor ? selectedColor.variant_image : product.variant_image} alt={product.variant_image} className="w-14 mx-4 mt-3 border-2 border-orange-500 p-2" />
        </div>
        <div>
        <h2 className="text-3xl font-bold mb-4">
  {selectedColor ? `${product.slug} (${selectedColor.value}, ${selectRam && selectRam})` : product.product_variant_name}
</h2>


          <p className="text-green-600">{product.stock_sataus}</p>
          <div className='flex gap-4'>
            <p className="font-semibold text-orange-500">&#8377;{selectedRamPrice || product.price}</p>
            <p className="text-md font-semibold"><span className="line-through">M.R.P:{selectedMrp || product.mrp}</span> <span className="bg-green-500 text-white rounded px-2">{selectedDiscount || product.discount_percent}% off</span></p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.variant_color_values.map((color) => (
                <div className={`border-2 p-2 text-center cursor-pointer ${selectedColor === color ? 'border-orange-500' : 'border-gray-300'}`} key={color.id} onClick={() => handleColorClick(color)}>
                  <img src={color.variant_image} alt={color.value} className="w-18 h-14" />
                  <p className="text-xs mt-1 text-bold">{color.value}</p>
                </div>
              ))}
            </div>
          </div>
          {product.other_variant_values.length > 0 ? 
        <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">RAM</h3>
        <div className='flex gap-4'>
          {product.other_variant_values && Object.values(product.other_variant_values).map((ram, index) => (
            <span
              key={index}
              className={`border-2 p-2 cursor-pointer ${selectRam === ram.value ? 'border-orange-500' : 'border-gray-300'}`}
              onClick={() => handleRamClick(ram)}
            >
              {ram.value}
            </span>
          ))}
        </div>
      </div>
      
          
          : ''}


{product.storage_variant_name.length > 0 ? 
  <div className="mb-4">
  <h3 className="text-lg font-semibold mb-2">Storage</h3>
  <div className='flex gap-4'>
  {product.variant_storage_values.map((storage) => 
  <p className='border-2 border-orange-500 p-2' onClick={() => {handleStorage(storage.id)}}>{storage.value}</p>
)}
</div>
  
</div>
: ''}

        
        </div>
        <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
  {/* Render related products here */}
  {set ? (
  relatedProducts.length > 0 ? (
    relatedProducts.map((relatedProduct) => (
      <div key={relatedProduct.id} className=" items-center mb-4">
        <img src={relatedProduct.variant_image} alt={relatedProduct.product_variant_name} className="w-24 h-24 mr-4" />
        <p>{relatedProduct.product_variant_name}</p>
      </div>
    ))
  ) : (
    "Please Click storage"
  )
) : (
  "Choose storage"
)}

  

 
</div>

      </div>
      </div>
   
    </div>
  );
};

export default IndividualProduct;
