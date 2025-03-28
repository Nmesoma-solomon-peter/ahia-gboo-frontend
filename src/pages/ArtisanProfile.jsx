import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtisanById, fetchArtisanProducts } from '../store/slices/artisanSlice';

const ArtisanProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentArtisan, artisanProducts, loading, error } = useSelector((state) => state.artisans);

  useEffect(() => {
    console.log('Fetching artisan with ID:', id);
    if (id) {
      dispatch(fetchArtisanById(id));
      dispatch(fetchArtisanProducts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Current Artisan:', currentArtisan);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [currentArtisan, loading, error]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading artisan:', error);
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">Error</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong</h1>
                <p className="mt-1 text-base text-gray-500">{error}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!currentArtisan) {
    return (
      <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-primary-600 sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Artisan not found</h1>
                <p className="mt-1 text-base text-gray-500">The artisan you're looking for doesn't exist.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Artisan Info */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{currentArtisan.name}</h1>
            <div className="mt-3">
              <p className="text-3xl text-gray-900">{currentArtisan.location}</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{currentArtisan.bio}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Specialties</h4>
                  <p className="mt-2 text-sm text-gray-500">{currentArtisan.specialties}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Experience</h4>
                  <p className="mt-2 text-sm text-gray-500">{currentArtisan.experience}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan's Products */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h2 className="text-2xl font-extrabold text-gray-900">Products by {currentArtisan.name}</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {artisanProducts?.map((product) => (
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
                        <a href={`/products/${product.id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile; 