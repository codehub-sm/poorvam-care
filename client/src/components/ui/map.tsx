import React from 'react';
import { Card } from '@/components/ui/card';
import { Map as MapIcon } from 'lucide-react';

interface MapProps {
  address: string;
  className?: string;
}

const Map: React.FC<MapProps> = ({ address, className }) => {
  // In a production environment, we would use a proper map API like Google Maps
  // and replace this component with a real map implementation
  
  // Encode the address for Google Maps URL
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  return (
    <Card className={`bg-neutral-100 rounded-2xl overflow-hidden shadow-sm h-80 flex items-center justify-center ${className || ''}`}>
      <a 
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center p-4 w-full h-full flex flex-col items-center justify-center hover:bg-neutral-200 transition-colors"
      >
        <MapIcon className="h-16 w-16 text-neutral-500 mb-4" />
        <p className="text-neutral-600 font-medium mb-2">View Our Location</p>
        <p className="text-neutral-500 text-sm">{address}</p>
        <p className="text-primary mt-4 text-sm font-medium">Open in Google Maps</p>
      </a>
    </Card>
  );
};

export default Map;
