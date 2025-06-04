import React from 'react';
import { Clock } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const { isRTL } = useLanguage();
  
  // Icons mapping for service categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'design':
        return <i className="fas fa-palette"></i>;
      case 'teaching':
        return <i className="fas fa-chalkboard-teacher"></i>;
      case 'programming':
        return <i className="fas fa-code"></i>;
      case 'translation':
        return <i className="fas fa-language"></i>;
      case 'writing':
        return <i className="fas fa-pen-fancy"></i>;
      case 'music':
        return <i className="fas fa-music"></i>;
      case 'cooking':
        return <i className="fas fa-utensils"></i>;
      default:
        return <i className="fas fa-briefcase"></i>;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-12 h-12 rounded-full bg-[#2E86AB] bg-opacity-10 flex items-center justify-center text-[#2E86AB] text-xl">
            {getCategoryIcon(service.category)}
          </div>
          <div className={`${isRTL ? 'mr-3' : 'ml-3'}`}>
            <span className="text-xs uppercase tracking-wider text-gray-500">{service.category}</span>
            <h3 className="text-lg font-semibold text-[#2E86AB]">{service.title}</h3>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {service.description}
        </p>
        
        <div className={`flex items-center justify-between mt-5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <img 
              src={service.provider.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
              alt={service.provider.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className={`text-sm text-gray-700 ${isRTL ? 'ml-2' : 'ml-2'}`}>
              {service.provider.name}
            </span>
          </div>
          
          <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-[#2E86AB] flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {service.hourlyRate} {service.hourlyRate === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>
        
        <div className={`flex items-center mt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < service.rating
                    ? 'text-[#F18F01]'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className={`text-sm text-gray-500 ${isRTL ? 'ml-auto' : 'ml-2'}`}>
            ({service.reviews})
          </span>
          <span className={`text-sm text-gray-500 ${isRTL ? 'ml-2 mr-auto' : 'ml-auto'}`}>
            {service.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;