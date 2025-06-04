import React, { useState } from 'react';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WalletPage from './pages/WalletPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProviderRegistrationPage from './pages/ProviderRegistrationPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import ExpertiseVerificationPage from './pages/ExpertiseVerificationPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import TermsPage from './pages/TermsPage';
import DashboardPage from './pages/DashboardPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState('services');
  const [verificationPhone, setVerificationPhone] = useState('');

  const handleServiceClick = (serviceId: string) => {
    setPreviousPage(activePage);
    setSelectedServiceId(serviceId);
    setActivePage('serviceDetail');
  };

  const handlePhoneVerification = (phone: string) => {
    setVerificationPhone(phone);
    setActivePage('phone-verification');
  };

  const handleVerificationComplete = () => {
    setActivePage('expertise-verification');
  };

  const goBack = () => {
    setActivePage(previousPage);
    setSelectedServiceId(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} onServiceClick={handleServiceClick} />;
      case 'services':
        return <ServicesPage onServiceClick={handleServiceClick} />;
      case 'wallet':
        return <WalletPage />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'provider-register':
        return <ProviderRegistrationPage setActivePage={setActivePage} onPhoneVerification={handlePhoneVerification} />;
      case 'phone-verification':
        return (
          <PhoneVerificationPage
            phone={verificationPhone}
            onVerificationComplete={handleVerificationComplete}
            setActivePage={setActivePage}
          />
        );
      case 'expertise-verification':
        return <ExpertiseVerificationPage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage />;
      case 'support':
        return <SupportPage />;
      case 'terms':
        return <TermsPage />;
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} />;
      case 'serviceDetail':
        return selectedServiceId ? (
          <ServiceDetailPage 
            serviceId={selectedServiceId} 
            setActivePage={setActivePage} 
            goBack={goBack}
          />
        ) : (
          <ServicesPage onServiceClick={handleServiceClick} />
        );
      default:
        return <HomePage setActivePage={setActivePage} onServiceClick={handleServiceClick} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Header activePage={activePage} setActivePage={setActivePage} />
          {renderPage()}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;