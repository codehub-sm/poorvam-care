import { useState } from "react";
import { ChevronRight, Heart, Ear, Rocket, ArrowRight } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function Hero() {
  const { setActiveService } = useServiceContext();
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToService = (serviceType: string) => {
    setActiveService(serviceType as 'early-intervention' | 'hearing' | 'future-skills');
    scrollToSection('services');
  };

  const brands = [
    {
      id: 'early-intervention',
      name: 'Poorvam Care',
      subtitle: 'Early Intervention Services',
      description: 'Comprehensive therapeutic services for children with developmental disorders, autism, and special needs.',
      icon: Heart,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      features: ['Speech Therapy', 'Occupational Therapy', 'Behavioral Interventions', 'Family Support']
    },
    {
      id: 'hearing',
      name: 'Poorvam Hearing Solutions',
      subtitle: 'Hearing Services',
      description: 'Expert audiological care for all ages, from pediatric screening to senior hearing solutions.',
      icon: Ear,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      features: ['Hearing Assessments', 'Hearing Aids', 'Cochlear Implants', 'Tinnitus Management']
    },
    {
      id: 'future-skills',
      name: 'uCUBE',
      subtitle: 'Future Skills',
      description: 'Innovative STEM education, creative arts, and future-ready skills for tomorrow\'s leaders.',
      icon: Rocket,
      color: 'green',
      gradient: 'from-green-500 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
      features: ['Robotics & Coding', 'Public Speaking', 'Art & Craft', 'Yoga & Wellness']
    }
  ];

  return (
    <section id="home" className="bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Brand Introduction */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <img 
              src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
              alt="Poorvam Logo" 
              className="w-16 h-16 rounded-full object-cover shadow-lg"
            />
          </div>
          <p className="text-2xl text-gray-600 mb-4 font-serif">
            <span className="text-blue-600 font-semibold">Innovating Care</span>, 
            <span className="text-green-600 font-semibold"> Shaping Futures</span>
          </p>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto font-serif leading-relaxed">
            A comprehensive ecosystem of specialized services dedicated to empowering individuals across all stages of life through evidence-based care and innovative learning.
          </p>
        </div>

        {/* Brand Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {brands.map((brand, index) => {
            const IconComponent = brand.icon;
            const isHovered = hoveredBrand === brand.id;
            
            return (
              <div
                key={brand.id}
                className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  isHovered ? 'z-10' : ''
                }`}
                onMouseEnter={() => setHoveredBrand(brand.id)}
                onMouseLeave={() => setHoveredBrand(null)}
                onClick={() => navigateToService(brand.id)}
              >
                {/* Card */}
                <div className={`bg-gradient-to-br ${brand.bgGradient} rounded-3xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                  isHovered ? 'border-opacity-100' : 'border-transparent'
                }`}>
                  
                  {/* Brand Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${brand.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-600 font-serif">
                        {brand.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Brand Image */}
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 font-serif leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 font-serif">Key Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            brand.color === 'green' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-600 font-serif">
                      Learn More
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${brand.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-3xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-serif max-w-2xl mx-auto">
              Whether you're seeking therapeutic support, hearing solutions, or future-ready skills, our expert teams are here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg font-serif"
              >
                Get Started Today
              </button>
              <button 
                onClick={() => scrollToSection('onboarding')}
                className="bg-white text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 font-serif"
              >
                How We Help
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-32 right-20 w-6 h-6 bg-green-500 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute top-1/2 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-1/3 right-32 w-5 h-5 bg-cyan-500 rounded-full animate-bounce opacity-30"></div>
    </section>
  );
}
