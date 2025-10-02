import React, { createContext, useContext, useState, ReactNode } from 'react';

type BusinessLine = 'child-development' | 'hearing-center' | 'ucube';

interface ServiceContextType {
  activeBusinessLine: BusinessLine;
  setActiveBusinessLine: (businessLine: BusinessLine) => void;
  // Legacy support for existing components
  activeService: 'early-intervention' | 'hearing' | 'future-skills';
  setActiveService: (service: 'early-intervention' | 'hearing' | 'future-skills') => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
  const [activeBusinessLine, setActiveBusinessLine] = useState<BusinessLine>('child-development');
  
  // Legacy mapping for backward compatibility
  const businessLineToService = {
    'child-development': 'early-intervention' as const,
    'hearing-center': 'hearing' as const,
    'ucube': 'future-skills' as const,
  };

  const setActiveService = (service: 'early-intervention' | 'hearing' | 'future-skills') => {
    const businessLineMap = {
      'early-intervention': 'child-development' as const,
      'hearing': 'hearing-center' as const,
      'future-skills': 'ucube' as const,
    };
    setActiveBusinessLine(businessLineMap[service]);
  };

  return (
    <ServiceContext.Provider value={{ 
      activeBusinessLine, 
      setActiveBusinessLine,
      activeService: businessLineToService[activeBusinessLine],
      setActiveService
    }}>
      {children}
    </ServiceContext.Provider>
  );
}; 