import { Phone, ClipboardCheck, Route, Rocket } from "lucide-react";

export default function Onboarding() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      icon: Phone,
      title: "1. Initial Contact",
      description: "Reach out to us for a free consultation. We'll discuss your concerns and explain our approach.",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: ClipboardCheck,
      title: "2. Comprehensive Assessment",
      description: "Our specialists conduct thorough evaluations to understand your child's unique needs and strengths.",
      color: "from-green-600 to-green-700"
    },
    {
      icon: Route,
      title: "3. Personalized Plan",
      description: "We create a customized intervention plan with clear goals and evidence-based strategies.",
      color: "from-cyan-600 to-cyan-700"
    },
    {
      icon: Rocket,
      title: "4. Begin Therapy",
      description: "Start engaging therapy sessions with regular progress monitoring and family support.",
      color: "from-orange-600 to-orange-700"
    }
  ];

  return (
    <section id="onboarding" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-gray-800 mb-6">
            How Our <span className="text-blue-600">Early Intervention</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive onboarding process ensures your child receives personalized, evidence-based care from day one.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-baloo font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={scrollToContact}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
