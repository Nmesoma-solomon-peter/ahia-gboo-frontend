import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtisanById, fetchArtisanProducts } from '../store/slices/artisanSlice';
import { Link } from 'react-router-dom';

const ArtisanProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentArtisan, artisanProducts, loading, error } = useSelector((state) => state.artisans);

  useEffect(() => {
    console.log('Fetching artisan profile for ID:', id);
    dispatch(fetchArtisanById(id));
    dispatch(fetchArtisanProducts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentArtisan) {
      console.log('Current artisan data:', currentArtisan);
      console.log('Artisan image URL:', currentArtisan.imageUrl);
      console.log('Artisan specialties:', currentArtisan.specialties);
      console.log('Artisan bio:', currentArtisan.bio);
      console.log('Artisan experience:', currentArtisan.experience);
    }
  }, [currentArtisan]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!currentArtisan) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Artisan not found</p>
      </div>
    );
  }

  // Ensure specialties is always an array
  const specialties = Array.isArray(currentArtisan.specialties) 
    ? currentArtisan.specialties 
    : (currentArtisan.specialties || '').split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative h-48 bg-gradient-to-r from-primary-500 to-primary-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={currentArtisan.imageUrl || '/images/default-artisan.jpg'}
                  alt={currentArtisan.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-artisan.jpg';
                  }}
                />
              </div>
            </div>
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentArtisan.name}</h1>
                <p className="text-gray-600">{currentArtisan.location || 'Location not specified'}</p>
              </div>
              <Link
                to={`/artisan/${currentArtisan.id}/products`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{currentArtisan.bio || 'No bio available'}</p>
            </div>

            {/* Experience Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{currentArtisan.experience || 'No experience information available'}</p>
            </div>

            {/* Products Preview */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {artisanProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-product.jpg';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-primary-600">${product.price}</span>
                        <Link
                          to={`/products/${product.id}`}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {artisanProducts.length > 4 && (
                <div className="mt-6 text-center">
                  <Link
                    to={`/artisan/${currentArtisan.id}/products`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Specialties */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {specialty}
                  </span>
                ))}
                {specialties.length === 0 && (
                  <p className="text-gray-500">No specialties listed</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-gray-900">{currentArtisan.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1 text-gray-900">{currentArtisan.location || 'Location not specified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile; 