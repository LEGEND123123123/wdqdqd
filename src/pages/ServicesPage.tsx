import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { services, categories } from '../data/mockData';

interface ServicesPageProps {
  onServiceClick: (serviceId: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceClick }) => {
  const { t, isRTL } = useLanguage();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxHours, setMaxHours] = useState<number>(10);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique locations from services
  const locations = Array.from(new Set(services.map((service) => service.location)));

  // Apply filters
  useEffect(() => {
    let result = [...services];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter((service) => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter((service) => service.category === selectedCategory);
    }
    
    // Apply location filter
    if (selectedLocation) {
      result = result.filter((service) => service.location === selectedLocation);
    }
    
    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((service) => service.rating >= minRating);
    }
    
    // Apply max hours filter
    if (maxHours < 10) {
      result = result.filter((service) => service.hourlyRate <= maxHours);
    }
    
    setFilteredServices(result);
  }, [searchTerm, selectedCategory, selectedLocation, minRating, maxHours]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setMinRating(0);
    setMaxHours(10);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className={`text-3xl font-bold mb-8 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('services.all')}
      </h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="secondary"
            leftIcon={<Filter size={18} />}
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden"
          >
            Filters
          </Button>
          
          <Button 
            variant="primary"
            onClick={clearFilters}
            className={selectedCategory || selectedLocation || minRating > 0 || maxHours < 10 ? 'opacity-100' : 'opacity-0'}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Main content area with filters and services */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Panel - Desktop */}
        <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:w-1/4 bg-white p-6 rounded-xl shadow-md h-fit`}>
          <h3 className="text-lg font-semibold mb-4 text-[#2E86AB]">Filters</h3>
          
          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Category</h4>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Location</h4>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Rating Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Minimum Rating</h4>
            <div className="flex items-center">
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full"
              />
              <span className="ml-2 w-8 text-center">{minRating}</span>
            </div>
          </div>
          
          {/* Max Hours Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Maximum Hours</h4>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={maxHours}
                onChange={(e) => setMaxHours(Number(e.target.value))}
                className="w-full"
              />
              <span className="ml-2 w-8 text-center">{maxHours}</span>
            </div>
          </div>
          
          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={clearFilters}
          >
            Clear All
          </Button>
        </div>
        
        {/* Services Grid */}
        <div className="flex-1">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button variant="secondary" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => onServiceClick(service.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;