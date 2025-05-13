import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { hotelService, roomService } from '../../services/api';

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelForm, setHotelForm] = useState({
    name: '',
    description: '',
    basePrice: '',
    address: '',
  });
  const [roomForm, setRoomForm] = useState({
    roomNumber: '',
    type: 'Standard',
    price: '',
    capacity: '2',
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await hotelService.getAllHotels();
      setHotels(response.data);
    } catch (err) {
      setError('Failed to fetch hotels');
      console.error('Error fetching hotels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedHotel) {
        await hotelService.updateHotel(selectedHotel.id, hotelForm);
      } else {
        await hotelService.createHotel(hotelForm);
      }
      setHotelForm({
        name: '',
        description: '',
        basePrice: '',
        address: '',
      });
      setSelectedHotel(null);
      fetchHotels();
    } catch (err) {
      setError('Failed to save hotel');
      console.error('Hotel save error:', err);
    }
  };

  const handleRoomSubmit = async (e, hotelId) => {
    e.preventDefault();
    try {
      await roomService.createRoom(hotelId, roomForm);
      setRoomForm({
        roomNumber: '',
        type: 'Standard',
        price: '',
        capacity: '2',
      });
      fetchHotels();
    } catch (err) {
      setError('Failed to add room');
      console.error('Room save error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Hotel Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your hotels and rooms
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setSelectedHotel(null)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add New Hotel
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Hotel Form */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {selectedHotel ? 'Edit Hotel' : 'Add New Hotel'}
          </h3>
          <form onSubmit={handleHotelSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Hotel Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={hotelForm.name}
                  onChange={(e) => setHotelForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
                  Base Price per Night
                </label>
                <input
                  type="number"
                  name="basePrice"
                  id="basePrice"
                  value={hotelForm.basePrice}
                  onChange={(e) => setHotelForm((prev) => ({ ...prev, basePrice: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={hotelForm.address}
                onChange={(e) => setHotelForm((prev) => ({ ...prev, address: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={hotelForm.description}
                onChange={(e) => setHotelForm((prev) => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedHotel(null);
                  setHotelForm({
                    name: '',
                    description: '',
                    basePrice: '',
                    address: '',
                  });
                }}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Hotel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Hotels List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Hotel Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Base Price
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {hotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {hotel.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {hotel.address}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${hotel.basePrice}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => setSelectedHotel(hotel)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => hotelService.deleteHotel(hotel.id).then(fetchHotels)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HotelManagerDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<HotelManagement />} />
        {/* Add more routes for bookings and reviews management */}
      </Routes>
    </DashboardLayout>
  );
};

export default HotelManagerDashboard; 