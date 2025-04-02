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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading artisans...</p>
        </div>
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
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Artisans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artisans?.map((artisan) => (
            <div key={artisan.id} className="flex flex-col">
              <Link to={`/artisan/${artisan.id}`} className="flex-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 bg-gray-200">
                    <img
                      src={artisan.imageUrl || '/images/default-artisan.jpg'}
                      alt={artisan.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-artisan.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{artisan.name}</h3>
                    {artisan.specialties && artisan.specialties.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">Specialties:</h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {artisan.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {artisan.experience && (
                      <p className="mt-2 text-sm text-gray-500">
                        Experience: {artisan.experience} years
                      </p>
                    )}
                    <div className="mt-2">
                      {artisan.bio && (
                        <p className="text-sm text-gray-500 line-clamp-2">{artisan.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisans; 