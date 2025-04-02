import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { artisanService } from '../services/artisanService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, artisansData] = await Promise.all([
          productService.getAllProducts(),
          artisanService.getAllArtisans()
        ]);
        setProducts(productsData);
        setArtisans(artisansData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            // src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl18zwNml8PkjHDUvAeWvW5hCUJevYQ8NutQ&s"
            alt="African crafts"
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover Igbo Artisanal Crafts
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Explore our curated collection of authentic Igbo crafts, handmade by skilled artisans who preserve traditional techniques and cultural heritage.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Featured products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
        {loading ? (
          <div className="mt-6 text-center">Loading products...</div>
        ) : error ? (
          <div className="mt-6 text-center text-red-600">Error: {error}</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured artisans */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Artisans</h2>
          {loading ? (
            <div className="mt-6 text-center">Loading artisans...</div>
          ) : error ? (
            <div className="mt-6 text-center text-red-600">Error: {error}</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {artisans.slice(0, 6).map((artisan) => (
                <div key={artisan.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={artisan.imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(artisan.name)}
                      alt={artisan.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(artisan.name);
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/artisan/${artisan.id}`} className="hover:text-primary-600">
                        {artisan.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{artisan.bio || 'No bio available'}</p>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(artisan.specialties) 
                          ? artisan.specialties.slice(0, 3).map((specialty, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {specialty}
                              </span>
                            ))
                          : (artisan.specialties || '').split(',').slice(0, 3).map((specialty, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {specialty.trim()}
                              </span>
                            ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 