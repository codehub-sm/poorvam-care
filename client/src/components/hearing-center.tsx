import { Baby, User, Users, Check } from "lucide-react";

export default function HearingCenter() {
  const services = [
    {
      title: "Pediatric Hearing",
      description: "Specialized hearing services for infants, toddlers, and children including early screening and intervention.",
      icon: Baby,
      color: "bg-blue-600",
      bgGradient: "from-blue-50 to-cyan-50",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Newborn Hearing Screening",
        "Pediatric Audiometry", 
        "Hearing Aid Fitting",
        "Cochlear Implant Support"
      ]
    },
    {
      title: "Adult Hearing",
      description: "Comprehensive hearing evaluations and treatment options for working adults and professionals.",
      icon: User,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Diagnostic Audiometry",
        "Occupational Hearing Tests",
        "Hearing Protection",
        "Tinnitus Management"
      ]
    },
    {
      title: "Senior Hearing",
      description: "Specialized care for age-related hearing changes and communication needs of older adults.",
      icon: Users,
      color: "bg-orange-600",
      bgGradient: "from-orange-50 to-yellow-50",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Age-Related Assessment",
        "Hearing Aid Adjustment",
        "Assistive Listening Devices",
        "Family Communication Training"
      ]
    }
  ];

  return (
    <section id="hearing-center" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-gray-800 mb-6">
            Comprehensive <span className="text-blue-600">Hearing Center</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete audiological services for all age groups with state-of-the-art equipment and expert care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${service.bgGradient} rounded-2xl p-8 text-center`}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="text-white w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-baloo font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 text-left">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="text-blue-600 w-5 h-5 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-baloo font-bold mb-6">
            Schedule Your Hearing Assessment Today
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Early detection and intervention can make all the difference. Our certified audiologists are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300">
              Book Hearing Test
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Download Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
