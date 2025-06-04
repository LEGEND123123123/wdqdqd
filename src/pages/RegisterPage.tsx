import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

interface RegisterPageProps {
  setActivePage: (page: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setActivePage }) => {
  const { t, isRTL } = useLanguage();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password, phone);
      if (success) {
        setActivePage('dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md border-t-4 border-[#2E86AB]">
        <h2 className={`text-2xl font-bold mb-6 text-[#2E86AB] flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <UserPlus className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('register.title')}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.phone')}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
              required
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
          >
            {t('register.button')}
          </Button>
        </form>
        
        <p className="text-center mt-6">
          {t('register.login')} {' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#2E86AB] font-medium hover:underline"
          >
            {t('register.loginLink')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;