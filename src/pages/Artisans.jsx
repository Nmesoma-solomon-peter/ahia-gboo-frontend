import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArtisans } from '../store/slices/artisanSlice';

const Artisans = () => {
  const dispatch = useDispatch();
  const { artisans, loading, error } = useSelector((state) => state.artisans);

  useEffect(() => {
    dispatch(fetchArtisans());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Artisans</h2>
        <div className="text-center">Loading artisans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Artisans</h2>
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Artisans</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {artisans?.map((artisan) => (
            <Link key={artisan._id} to={`/artisan/${artisan._id}`} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={artisan.imageUrl || 'https://via.placeholder.com/400x400?text=Artisan'}
                  alt={artisan.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{artisan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{artisan.location}</p>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{artisan.bio}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisans; 