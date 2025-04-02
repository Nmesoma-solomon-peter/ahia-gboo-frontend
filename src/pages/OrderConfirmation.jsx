import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchOrderById } from '../store/slices/orderSlice';

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentOrder, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    // Get order ID from location state
    const orderId = location.state?.orderId;
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, location.state]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error || 'Order not found'}
          </h2>
          <Link
            to="/"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="mt-1 text-sm text-gray-900">#{currentOrder.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-sm text-gray-900 capitalize">{currentOrder.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="mt-1 text-sm text-gray-900">${currentOrder.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Shipping Address</p>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{currentOrder.shippingAddress}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
            <div className="mt-4">
              <ul className="divide-y divide-gray-200">
                {currentOrder.items.map((item, index) => (
                  <li key={index} className="py-4 flex">
                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h4>{item.name}</h4>
                          <p className="ml-4">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 