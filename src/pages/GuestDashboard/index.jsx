import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import HotelList from './HotelList';
import Bookings from './Bookings';

const GuestDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/bookings" element={<Bookings />} />
        {/* Reviews component will be implemented later */}
        <Route path="/reviews" element={<div>Reviews Coming Soon</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default GuestDashboard; 