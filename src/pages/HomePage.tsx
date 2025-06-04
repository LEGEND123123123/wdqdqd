import React from 'react';
import { UserPlus, Search } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { services } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onServiceClick: (serviceId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActivePage, onServiceClick }) => {
  const { t, isRTL } = useLanguage();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });
  
  // Get popular services (top 6 by rating)
  const popularServices = [...services]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#2E86AB] to-[#1a6a8d] text-white py-20 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          {/* Hero buttons */}
          <motion.div 
            variants={fadeInUp}
            className={`flex flex-col md:flex-row gap-4 justify-center mt-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}
          >
            <Button 
              size="lg" 
              leftIcon={<UserPlus />}
              onClick={() => setActivePage('register')}
            >
              {t('hero.join')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              leftIcon={<Search />}
              onClick={() => setActivePage('services')}
            >
              {t('hero.browse')}
            </Button>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-lg">Active Services</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-lg">Registered Users</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold mb-2">1,000+</div>
              <div className="text-lg">Hours Exchanged</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Popular Services Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className={`text-2xl md:text-3xl font-bold mb-10 text-[#2E86AB] relative ${isRTL ? 'text-right' : 'text-center'}`}
        >
          {t('services.popular')}
          <span className="block mx-auto mt-4 w-20 h-1 bg-[#F18F01]"></span>
        </motion.h2>
        
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {popularServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard 
                service={service} 
                onClick={() => onServiceClick(service.id)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button 
            variant="secondary" 
            onClick={() => setActivePage('services')}
          >
            {t('services.viewAll')}
          </Button>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={`text-2xl md:text-3xl font-bold mb-12 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-center'}`}
          >
            How It Works
            <span className="block mx-auto mt-4 w-20 h-1 bg-[#F18F01]"></span>
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2E86AB]">Register</h3>
              <p className="text-gray-600">Create an account and get 2 free hours as a welcome bonus</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2E86AB]">Offer Services</h3>
              <p className="text-gray-600">List your skills and earn time points when others use your services</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#2E86AB]">Get Services</h3>
              <p className="text-gray-600">Use your earned time to book services you need from other members</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;