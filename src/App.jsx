import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Cabinet from './components/Cabinet.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';
import AppointmentModal from './components/AppointmentModal.jsx';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const handleOpenBooking = (serviceId = '') => {
    setSelectedServiceId(serviceId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen brand-gradient-bg flex flex-col">
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />
        <About />
        <Services onOpenBooking={handleOpenBooking} />
        <Cabinet onOpenBooking={handleOpenBooking} />
        <Testimonials />
      </main>
      <Footer />
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialServiceId={selectedServiceId}
      />
    </div>
  );
}
