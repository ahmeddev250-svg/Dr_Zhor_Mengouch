import React, { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Cabinet from './components/Cabinet';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenModal = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar onOpenModal={handleOpenModal} />
        <main className="flex-1">
          <Hero onOpenModal={handleOpenModal} />
          <About />
          <Services onOpenModal={handleOpenModal} />
          <Cabinet />
          <Testimonials />
        </main>
        <Footer onOpenModal={handleOpenModal} />
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialService={selectedService}
        />
      </div>
    </LanguageProvider>
  );
}
