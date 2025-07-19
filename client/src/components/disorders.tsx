import { useState } from "react";
import { Puzzle, TrendingUp, Activity, Heart, Hand, Zap, ChevronDown } from "lucide-react";

interface DisorderCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  image: string;
  details: {
    approach?: string[];
    treatmentAreas?: string[];
    services?: string[];
    supportAreas?: string[];
    methods?: string[];
    interventionStrategies?: string[];
    ageGroups?: string;
  };
}

export default function Disorders() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const disorders: DisorderCard[] = [
    {
      id: "autism",
      title: "Autism Spectrum Disorder",
      description: "Comprehensive support for children on the autism spectrum, focusing on communication, social skills, and behavioral interventions.",
      icon: Puzzle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        approach: [
          "Applied Behavior Analysis (ABA)",
          "Speech and Language Therapy",
          "Occupational Therapy",
          "Social Skills Training",
          "Sensory Integration"
        ],
        ageGroups: "Early intervention (2-5 years) to school-age support (6-18 years)"
      }
    },
    {
      id: "developmental",
      title: "Developmental Delays",
      description: "Supporting children who are experiencing delays in reaching developmental milestones in areas like motor skills, speech, and cognition.",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        treatmentAreas: [
          "Gross & Fine Motor Development",
          "Language & Communication",
          "Cognitive Development",
          "Self-Help Skills",
          "Play Skills Development"
        ]
      }
    },
    {
      id: "cerebral",
      title: "Cerebral Palsy",
      description: "Specialized care for children with cerebral palsy, focusing on mobility, communication, and independence.",
      icon: Activity,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        services: [
          "Physical Therapy",
          "Occupational Therapy",
          "Speech Therapy",
          "Assistive Technology",
          "Family Support & Training"
        ]
      }
    },
    {
      id: "down",
      title: "Down Syndrome",
      description: "Comprehensive support for children with Down syndrome, promoting independence and skill development.",
      icon: Heart,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        supportAreas: [
          "Speech & Language Development",
          "Motor Skills Enhancement",
          "Cognitive Development",
          "Social Integration",
          "Life Skills Training"
        ]
      }
    },
    {
      id: "sensory",
      title: "Sensory Processing",
      description: "Helping children who struggle with processing sensory information through specialized interventions.",
      icon: Hand,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        methods: [
          "Sensory Integration Therapy",
          "Sensory Diet Development",
          "Environmental Modifications",
          "Self-Regulation Strategies",
          "Parent Education & Training"
        ]
      }
    },
    {
      id: "adhd",
      title: "ADHD Support",
      description: "Comprehensive strategies for children with ADHD to improve focus, organization, and social skills.",
      icon: Zap,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      details: {
        interventionStrategies: [
          "Behavioral Interventions",
          "Executive Function Training",
          "Social Skills Groups",
          "Attention & Focus Strategies",
          "School Support Planning"
        ]
      }
    }
  ];

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section id="disorders" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-gray-800 mb-6">
            Conditions We <span className="text-blue-600">Specialize In</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our expert team provides comprehensive care for a wide range of developmental and communication disorders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {disorders.map((disorder) => {
            const IconComponent = disorder.icon;
            const isExpanded = expandedCard === disorder.id;
            
            return (
              <div 
                key={disorder.id}
                className="disorder-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => toggleCard(disorder.id)}
              >
                <div className="p-8">
                  <img 
                    src={disorder.image} 
                    alt={disorder.title} 
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                  
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${disorder.bgColor} rounded-full flex items-center justify-center mr-4`}>
                      <IconComponent className={`${disorder.color} w-6 h-6`} />
                    </div>
                    <h3 className="text-2xl font-baloo font-semibold text-gray-800">{disorder.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {disorder.description}
                  </p>
                  
                  {isExpanded && (
                    <div className={`mt-6 p-6 ${disorder.bgColor} rounded-xl`}>
                      {disorder.details.approach && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Our Approach:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.approach.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.treatmentAreas && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Treatment Areas:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.treatmentAreas.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.services && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Our Services:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.services.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.supportAreas && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Support Areas:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.supportAreas.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.methods && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Our Methods:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.methods.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.interventionStrategies && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Intervention Strategies:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                            {disorder.details.interventionStrategies.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {disorder.details.ageGroups && (
                        <>
                          <h4 className={`font-bold text-lg mb-3 ${disorder.color}`}>Age Groups:</h4>
                          <p className="text-gray-600 mb-4">{disorder.details.ageGroups}</p>
                        </>
                      )}
                      
                      <button className={`bg-gradient-to-r ${disorder.color.replace('text-', 'from-')} ${disorder.color.replace('text-', 'to-')}-700 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors`}>
                        Learn More
                      </button>
                    </div>
                  )}
                  
                  <button className={`${disorder.color} font-semibold hover:opacity-80 transition-colors flex items-center`}>
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
