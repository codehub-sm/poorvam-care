import { Phone, ClipboardCheck, Route, Rocket } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function Onboarding() {
  const { activeBusinessLine } = useServiceContext();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSteps = () => {
    if (activeBusinessLine === 'hearing-center') {
      return [
        {
          icon: Phone,
          title: "1. Initial Contact",
          description: "Reach out to us for a free hearing consultation. We'll discuss your concerns and explain our comprehensive hearing care approach.",
          color: "from-blue-600 to-blue-700"
        },
        {
          icon: ClipboardCheck,
          title: "2. Hearing Assessment",
          description: "Our certified audiologists conduct thorough hearing evaluations using state-of-the-art equipment to understand your hearing needs.",
          color: "from-green-600 to-green-700"
        },
        {
          icon: Route,
          title: "3. Treatment Plan",
          description: "We create a personalized hearing care plan with clear recommendations and evidence-based solutions.",
          color: "from-cyan-600 to-cyan-700"
        },
        {
          icon: Rocket,
          title: "4. Begin Treatment",
          description: "Start your hearing care journey with regular monitoring, support, and follow-up care.",
          color: "from-orange-600 to-orange-700"
        }
      ];
    } else if (activeBusinessLine === 'ucube') {
      return [
        {
          icon: Phone,
          title: "1. Program Selection",
          description: "Choose from our diverse enrichment programs including dance, yoga, music, art, public speaking, and soft skills development.",
          color: "from-emerald-600 to-emerald-700"
        },
        {
          icon: ClipboardCheck,
          title: "2. Skill Assessment",
          description: "We assess your child's interests and current skill levels to recommend the most suitable programs and classes.",
          color: "from-green-600 to-green-700"
        },
        {
          icon: Route,
          title: "3. Personalized Learning",
          description: "Create a customized learning path with age-appropriate activities and progressive skill development.",
          color: "from-cyan-600 to-cyan-700"
        },
        {
          icon: Rocket,
          title: "4. Start Learning",
          description: "Begin engaging classes with experienced instructors, regular progress tracking, and performance opportunities.",
          color: "from-orange-600 to-orange-700"
        }
      ];
    } else {
      return [
        {
          icon: Phone,
          title: "1. Initial Contact",
          description: "Reach out to us for a free consultation. We'll discuss your concerns and explain our therapeutic approach.",
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
    }
  };

  const steps = getSteps();

  return (
    <section id="onboarding" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            How Poorvam <span className="text-blue-600">{activeBusinessLine === 'hearing-center' ? 'Hearing Center' : activeBusinessLine === 'ucube' ? 'Ucube' : 'Child Development Center'}</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            {activeBusinessLine === 'hearing-center' 
              ? "Our comprehensive hearing care process ensures you receive personalized, evidence-based solutions for optimal hearing health."
              : activeBusinessLine === 'ucube'
              ? "Our enrichment programs are designed to develop skills, creativity, and confidence through engaging, hands-on learning experiences."
              : "Our comprehensive therapeutic process ensures your child receives personalized, evidence-based care from day one."
            }
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
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 font-serif">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={scrollToContact}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-serif"
          >
            Get Started with Poorvam
          </button>
        </div>
      </div>
    </section>
  );
}
