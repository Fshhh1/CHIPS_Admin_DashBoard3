
import React from 'react';
import LandoChat from '../components/LandoChat';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-800 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CHIPS Admin Dashboard — Phase 26</h1>
        {/* Existing Dashboard Buttons and Components here */}
        {/* ... */}
        <LandoChat />
      </div>
    </div>
  );
}
