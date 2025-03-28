import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/slices/productSlice';
import { updateArtisanProfile } from '../store/slices/artisanSlice';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

const ArtisanDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.products);
  const [activeTab, setActiveTab] = useState('products');
  const [isEditing, setIsEditing] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    culturalSignificance: '',
    materials: '',
    stock: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch artisan's products
    dispatch(fetchProducts());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
    if (!formData.category.trim()) errors.category = 'Category is required';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Valid stock level is required';
    if (!formData.imageUrl.trim()) errors.imageUrl = 'Image URL is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Format the data according to backend requirements
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price).toFixed(2), // Format to 2 decimal places
        category: formData.category.trim(),
        stock: parseInt(formData.stock),
        imageUrl: formData.imageUrl.trim(), // Required field
        artisanId: user.id, // Use user.id instead of user._id
        // Optional fields
        ...(formData.culturalSignificance && { culturalSignificance: formData.culturalSignificance.trim() }),
        ...(formData.materials && { materials: formData.materials.trim() }),
        isActive: true
      };

      if (isEditing) {
        await dispatch(updateProduct({ id: formData.id, productData })).unwrap();
        alert('Product updated successfully!');
      } else {
        await dispatch(createProduct(productData)).unwrap();
        alert('Product created successfully!');
      }
      setIsEditing(false);
      setShowProductForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        culturalSignificance: '',
        materials: '',
        stock: '',
      });
      setFormErrors({});
      dispatch(fetchProducts());
    } catch (error) {
      console.error('Error saving product:', error);
      // Show more specific error message to the user
      const errorMessage = error.message || 'Error saving product. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      culturalSignificance: product.culturalSignificance || '',
      materials: product.materials || '',
      stock: product.stock,
    });
    setShowProductForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        alert('Product deleted successfully!');
        dispatch(fetchProducts());
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      bio: e.target.bio.value.trim(),
      location: e.target.location.value.trim(),
      specialties: e.target.specialties.value.trim(),
      experience: e.target.experience.value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.bio) {
      alert('Please fill in all required fields (Name, Email, and Bio)');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      await dispatch(updateArtisanProfile({ id: user.id, profileData: formData })).unwrap();
      alert('Profile updated successfully!');
      window.location.href = '/'; // This will refresh and redirect to homepage
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Error updating profile. Please try again.');
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Artisan Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded ${
              activeTab === 'products'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded ${
              activeTab === 'profile'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">My Products</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  imageUrl: '',
                  culturalSignificance: '',
                  materials: '',
                  stock: '',
                });
                setShowProductForm(true);
              }}
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
            >
              Add New Product
            </button>
          </div>

          {showProductForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    rows="3"
                  />
                  {formErrors.description && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {formErrors.price && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {formErrors.category && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {formErrors.stock && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.stock}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {formErrors.imageUrl && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.imageUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cultural Significance</label>
                  <textarea
                    value={formData.culturalSignificance}
                    onChange={(e) => setFormData({ ...formData, culturalSignificance: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    rows="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Materials</label>
                  <textarea
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    rows="2"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowProductForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-primary-500 font-semibold">${product.price}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                defaultValue={user?.bio}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={user?.location}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialties</label>
              <input
                type="text"
                name="specialties"
                defaultValue={user?.specialties}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g., Wood carving, Pottery, Weaving"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <textarea
                name="experience"
                defaultValue={user?.experience}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows="3"
                placeholder="Describe your experience and background"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArtisanDashboard; 