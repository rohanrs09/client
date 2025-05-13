import React, { useState, useEffect } from 'react';
import { hotelService, bookingService } from '../../services/api';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: '',
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

  const handleBooking = async (hotelId) => {
    if (!bookingDates.checkIn || !bookingDates.checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    try {
      await bookingService.createBooking({
        hotelId,
        checkInDate: bookingDates.checkIn,
        checkOutDate: bookingDates.checkOut,
      });
      setSelectedHotel(null);
      setBookingDates({ checkIn: '', checkOut: '' });
      // You might want to show a success message or redirect to bookings page
    } catch (err) {
      setError('Failed to create booking');
      console.error('Booking error:', err);
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
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Available Hotels</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse and book from our selection of hotels
          </p>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                <p className="mt-3 text-base text-gray-500">{hotel.description}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-lg font-medium text-gray-900">
                    ${hotel.basePrice}/night
                  </span>
                </div>
              </div>
              <div className="mt-6">
                {selectedHotel === hotel.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Check-in
                        </label>
                        <input
                          type="date"
                          value={bookingDates.checkIn}
                          onChange={(e) =>
                            setBookingDates((prev) => ({
                              ...prev,
                              checkIn: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Check-out
                        </label>
                        <input
                          type="date"
                          value={bookingDates.checkOut}
                          onChange={(e) =>
                            setBookingDates((prev) => ({
                              ...prev,
                              checkOut: e.target.value,
                            }))
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleBooking(hotel.id)}
                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => setSelectedHotel(null)}
                        className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedHotel(hotel.id)}
                    className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList; 