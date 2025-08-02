import { useServiceContext } from "@/contexts/ServiceContext";

export default function Hero() {
  const { activeService } = useServiceContext();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Different images for different services
  const getHeroImage = () => {
    switch (activeService) {
      case 'early-intervention':
        return "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600";
      case 'hearing':
        return "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
      default:
        return "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600";
    }
  };

  const getHeroTitle = () => {
    switch (activeService) {
      case 'early-intervention':
        return (
          <>
            Unlocking Potential, 
            <span className="text-blue-600"> Embracing Possibilities</span>
          </>
        );
      case 'hearing':
        return (
          <>
            Expert Hearing Care, 
            <span className="text-blue-600"> Better Communication</span>
          </>
        );
      default:
        return (
          <>
            Unlocking Potential, 
            <span className="text-blue-600"> Embracing Possibilities</span>
          </>
        );
    }
  };

  const getHeroDescription = () => {
    switch (activeService) {
      case 'early-intervention':
        return "At Poorvam Care & Hearing Solutions, we're passionate about empowering children with communication and developmental disorders to reach their full potential through evidence-based therapy and early intervention.";
      case 'hearing':
        return "Comprehensive hearing solutions for all ages. From pediatric screening to senior care, our certified audiologists provide expert diagnosis, treatment, and support for optimal hearing health.";
      default:
        return "At Poorvam Care & Hearing Solutions, we're passionate about empowering children with communication and developmental disorders to reach their full potential through evidence-based therapy and early intervention.";
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          
          {/* Hero Text */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-6 leading-tight animate-fade-in">
              {getHeroTitle()}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in font-serif">
              {getHeroDescription()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-center font-serif"
              >
                Book Consultation
              </button>
              <button 
                onClick={() => scrollToSection('onboarding')}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 border-2 border-blue-600 text-center font-serif"
              >
                Learn How We Help
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 relative animate-float">
            <img 
              src={getHeroImage()} 
              alt={activeService === 'early-intervention' ? "Children in therapy session" : "Hearing care consultation"} 
              className="rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-80 animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-500 rounded-full opacity-70 animate-bounce-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-400 rounded-full animate-bounce-slow opacity-60"></div>
      <div className="absolute bottom-32 right-20 w-6 h-6 bg-green-600 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute top-1/2 left-20 w-4 h-4 bg-blue-600 rounded-full animate-bounce-slow opacity-40"></div>
    </section>
  );
}
