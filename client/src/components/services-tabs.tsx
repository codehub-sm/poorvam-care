import { useState } from "react";
import { Puzzle, TrendingUp, Activity, Heart, Hand, Zap, ChevronDown, Baby, User, Users, Check, Ear, Volume2, Headphones } from "lucide-react";

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

interface HearingService {
  title: string;
  description: string;
  icon: any;
  color: string;
  bgGradient: string;
  image: string;
  features: string[];
}

interface ServicesTabsProps {
  initialActiveTab?: 'early-intervention' | 'hearing';
}

export default function ServicesTabs({ initialActiveTab = 'early-intervention' }: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState<'early-intervention' | 'hearing'>(initialActiveTab);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const disorders: DisorderCard[] = [
    {
      id: "autism",
      title: "Autism Spectrum Disorder",
      description: "Comprehensive support for children on the autism spectrum, focusing on communication, social skills, and behavioral interventions.",
      icon: Puzzle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
      image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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
      image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
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

  const hearingServices: HearingService[] = [
    {
      title: "Pediatric Hearing",
      description: "Specialized hearing services for infants, toddlers, and children including early screening and intervention.",
      icon: Baby,
      color: "bg-blue-600",
      bgGradient: "from-blue-50 to-cyan-50",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
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
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Age-Related Assessment",
        "Hearing Aid Adjustment",
        "Assistive Listening Devices",
        "Family Communication Training"
      ]
    }
  ];

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-gray-800 mb-6">
            Our <span className="text-blue-600">Specialized Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive care for developmental disorders and hearing health across all age groups.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('early-intervention')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === 'early-intervention'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Puzzle className="w-5 h-5" />
                <span>Early Intervention</span>
              </button>
              <button
                onClick={() => setActiveTab('hearing')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === 'hearing'
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

        {/* Early Intervention Tab Content */}
        {activeTab === 'early-intervention' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-baloo font-bold text-gray-800 mb-4">
                Conditions We <span className="text-blue-600">Specialize In</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                      
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold">Learn More</span>
                        <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      
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
                              <p className="text-gray-600">{disorder.details.ageGroups}</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Hearing Services Tab Content */}
        {activeTab === 'hearing' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-baloo font-bold text-gray-800 mb-4">
                Comprehensive <span className="text-blue-600">Hearing Center</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete audiological services for all age groups with state-of-the-art equipment and expert care.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {hearingServices.map((service, index) => {
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
        )}
      </div>
    </section>
  );
} 