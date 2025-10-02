import { useState, useEffect } from "react";
import { ChevronRight, Heart, Ear, Sparkles, ArrowRight, Play, Star, Users, Award } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function Hero() {
  const { setActiveBusinessLine } = useServiceContext();
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToBusinessLine = (businessLine: 'child-development' | 'hearing-center' | 'ucube') => {
    setActiveBusinessLine(businessLine);
    scrollToSection('services');
  };

  const businessLines = [
    {
      id: 'child-development',
      name: 'Child Development Center',
      subtitle: 'Therapies & Counselling',
      description: 'Comprehensive therapeutic services for children with developmental disorders, autism, and special needs. Our expert team provides evidence-based interventions to support your child\'s growth and development.',
      icon: Heart,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-50 to-blue-100',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      features: ['Speech Therapy', 'Occupational Therapy', 'Behavioral Interventions', 'Family Support'],
      stats: { clients: '500+', success: '95%', years: '8+' }
    },
    {
      id: 'hearing-center',
      name: 'Hearing Center',
      subtitle: 'Hearing Tests & Aids',
      description: 'Expert audiological care for all ages, from pediatric screening to senior hearing solutions. State-of-the-art equipment and personalized care for optimal hearing health.',
      icon: Ear,
      color: 'cyan',
      gradient: 'from-cyan-500 to-cyan-700',
      bgGradient: 'from-cyan-50 to-cyan-100',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      features: ['Hearing Assessments', 'Hearing Aids', 'Cochlear Implants', 'Tinnitus Management'],
      stats: { clients: '1200+', success: '98%', years: '12+' }
    },
    {
      id: 'ucube',
      name: 'Ucube',
      subtitle: 'Enrichment & Skills',
      description: 'Comprehensive enrichment programs including dance, yoga, music, art & craft, podcasting, public speaking, and soft skills development for children and teens.',
      icon: Sparkles,
      color: 'green',
      gradient: 'from-emerald-500 to-emerald-700',
      bgGradient: 'from-emerald-50 to-emerald-100',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      features: ['Dance & Yoga', 'Music & Art', 'Public Speaking', 'Soft Skills'],
      stats: { students: '800+', success: '92%', years: '5+' }
    }
  ];

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Premium Brand Introduction */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-4 mb-8">
            <div className="relative">
              <img 
                src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
                alt="Poorvam" 
                className="w-20 h-20 rounded-full object-cover shadow-2xl ring-4 ring-white/50"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6 font-serif">
            Welcome to Poorvam
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 font-serif max-w-4xl mx-auto leading-relaxed">
            Your trusted partner in comprehensive care and development. We serve individuals and families across three specialized areas: therapeutic services, hearing care, and enrichment programs.
          </p>

          {/* Premium Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-slate-800">2500+</div>
                <div className="text-sm text-slate-600">Lives Transformed</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <Award className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold text-slate-800">95%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
              <Star className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-slate-800">12+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Business Line Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {businessLines.map((businessLine, index) => {
            const IconComponent = businessLine.icon;
            const isHovered = hoveredBrand === businessLine.id;
            
            return (
              <div
                key={businessLine.id}
                className={`relative group cursor-pointer transform transition-all duration-700 hover:scale-105 ${
                  isHovered ? 'z-10' : ''
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredBrand(businessLine.id)}
                onMouseLeave={() => setHoveredBrand(null)}
                onClick={() => navigateToBusinessLine(businessLine.id)}
              >
                {/* Premium Card */}
                <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 ${
                  isHovered ? 'ring-4 ring-blue-500/20' : ''
                }`}>
                  
                  {/* Premium Business Line Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${businessLine.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                      <IconComponent className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors font-serif">
                        {businessLine.name}
                      </h3>
                      <p className="text-sm font-semibold text-slate-600 font-serif">
                        {businessLine.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Premium Business Line Image */}
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-xl relative group/image">
                    <img 
                      src={businessLine.image} 
                      alt={businessLine.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-slate-700 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 font-serif leading-relaxed">
                    {businessLine.description}
                  </p>

                  {/* Premium Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 font-serif">Key Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {businessLine.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            businessLine.color === 'green' 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : businessLine.color === 'cyan'
                              ? 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Premium Stats */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{businessLine.stats.clients || businessLine.stats.students}</div>
                      <div className="text-xs text-slate-600">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{businessLine.stats.success}</div>
                      <div className="text-xs text-slate-600">Success</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">{businessLine.stats.years}</div>
                      <div className="text-xs text-slate-600">Years</div>
                    </div>
                  </div>

                  {/* Premium CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-600 font-serif">
                      Explore Services
                    </span>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${businessLine.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Premium Hover Effect */}
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-purple-500/5 rounded-3xl pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Premium Call to Action */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <h2 className="text-4xl font-bold text-slate-800 mb-6 font-serif">
              Discover How Poorvam Can Help You
            </h2>
            <p className="text-xl text-slate-600 mb-8 font-serif max-w-2xl mx-auto">
              Explore our three specialized business lines and find the perfect care solution for you or your family. Our expert teams are ready to support your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-serif relative overflow-hidden"
              >
                <span className="relative z-10">Explore Our Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={() => scrollToSection('onboarding')}
                className="bg-white/90 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl font-serif"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Background Decorations */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-32 right-20 w-6 h-6 bg-emerald-500 rounded-full animate-bounce opacity-50"></div>
      <div className="absolute top-1/2 left-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute top-1/3 right-32 w-5 h-5 bg-cyan-500 rounded-full animate-bounce opacity-30"></div>
    </section>
  );
}
