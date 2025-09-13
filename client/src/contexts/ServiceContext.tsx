import React, { createContext, useContext, useState, ReactNode } from 'react';

type ServiceType = 'early-intervention' | 'hearing' | 'future-skills';

interface ServiceContextType {
  activeService: ServiceType;
  setActiveService: (service: ServiceType) => void;
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
  const [activeService, setActiveService] = useState<ServiceType>('early-intervention');

  return (
    <ServiceContext.Provider value={{ activeService, setActiveService }}>
      {children}
    </ServiceContext.Provider>
  );
}; 