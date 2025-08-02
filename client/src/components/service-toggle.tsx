import { Puzzle, Ear } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function ServiceToggle() {
  const { activeService, setActiveService } = useServiceContext();

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveService('early-intervention')}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 font-serif ${
              activeService === 'early-intervention'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Puzzle className="w-5 h-5" />
            <span>Early Intervention</span>
          </button>
          <button
            onClick={() => setActiveService('hearing')}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 font-serif ${
              activeService === 'hearing'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            <Ear className="w-5 h-5" />
            <span>Hearing Services</span>
          </button>
        </div>
      </div>
    </div>
  );
} 