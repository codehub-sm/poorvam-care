import { useState } from "react";
import { Puzzle, TrendingUp, Activity, Heart, Hand, Zap, ChevronDown, Baby, User, Users, Check, Ear, Volume2, Headphones, Rocket, Code, Mic, Calendar, Atom, MessageCircle, Palette } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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

interface FutureSkillsService {
  title: string;
  description: string;
  icon: any;
  color: string;
  bgGradient: string;
  image: string;
  features: string[];
  ageGroup: string;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  serviceType: string;
  message: string;
  consent: boolean;
}

export default function ServicesTabs() {
  const { activeService } = useServiceContext();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const { toast } = useToast();
  
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    serviceType: "",
    message: "",
    consent: false,
  });

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

  const futureSkillsServices: FutureSkillsService[] = [
    {
      title: "Robotics & Coding",
      description: "Hands-on learning in robotics, programming, and STEM concepts to prepare children for the digital future.",
      icon: Code,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Block-based Programming",
        "Robotics Construction",
        "STEM Project Building",
        "Problem-solving Skills",
        "Digital Literacy"
      ],
      ageGroup: "Ages 6-16"
    },
    {
      title: "Public Speaking & Podcasting",
      description: "Develop confidence and communication skills through public speaking training and podcast creation.",
      icon: Mic,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Speech Writing & Delivery",
        "Podcast Production",
        "Voice Modulation",
        "Presentation Skills",
        "Interview Techniques"
      ],
      ageGroup: "Ages 8-18"
    },
    {
      title: "Holistic Well-being",
      description: "Yoga, art therapy, and mindfulness practices for mental health and emotional well-being.",
      icon: Heart,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Therapeutic Yoga",
        "Art & Creative Expression",
        "Mindfulness & Meditation",
        "Stress Management",
        "Emotional Regulation"
      ],
      ageGroup: "All Ages"
    },
    {
      title: "Art & Craft Services",
      description: "Creative expression through various art forms, craft activities, and hands-on artistic learning experiences.",
      icon: Palette,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Painting & Drawing",
        "Craft Making",
        "Sculpture & 3D Art",
        "Digital Art Creation",
        "Art Therapy Sessions"
      ],
      ageGroup: "Ages 4-16"
    },
    {
      title: "Birthday Events & Activities",
      description: "Special birthday celebrations with therapeutic activities, fun learning, and memorable experiences.",
      icon: Calendar,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      features: [
        "Themed Birthday Parties",
        "Educational Activities",
        "Group Games & Fun",
        "Creative Workshops",
        "Memory Making"
      ],
      ageGroup: "Ages 3-16"
    }
  ];

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  // Contact form submission function
  const submitContactForm = async (data: ContactFormData) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec';
    
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      childName: data.childName,
      childAge: data.childAge,
      serviceType: data.serviceType,
      message: data.message,
      consent: data.consent,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    return { success: true };
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!contactFormData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the consent terms before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!contactFormData.firstName || !contactFormData.lastName || !contactFormData.email || !contactFormData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields (First Name, Last Name, Email, Phone).",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitContactForm(contactFormData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setContactFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        serviceType: "",
        message: "",
        consent: false,
      });
      
      setIsContactModalOpen(false);
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const updateContactFormData = (field: keyof ContactFormData, value: string | boolean) => {
    setContactFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookSession = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setContactFormData(prev => ({ ...prev, serviceType: serviceTitle }));
    setIsBookingModalOpen(true);
  };

  const handleContactUs = () => {
    setContactFormData(prev => ({ ...prev, serviceType: "Future Skills - General Inquiry" }));
    setIsContactModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Our <span className="text-blue-600">Specialized Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            Comprehensive care for developmental disorders and hearing health across all age groups.
          </p>
        </div>

        {/* Early Intervention Tab Content */}
        {activeService === 'early-intervention' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                Conditions We <span className="text-blue-600">Specialize In</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
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
                        <h3 className="text-2xl font-serif font-semibold text-gray-800">{disorder.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4 font-serif">
                        {disorder.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold font-serif">Learn More</span>
                        <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isExpanded && (
                        <div className={`mt-6 p-6 ${disorder.bgColor} rounded-xl`}>
                          {disorder.details.approach && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Our Approach:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.approach.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.treatmentAreas && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Treatment Areas:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.treatmentAreas.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.services && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Our Services:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.services.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.supportAreas && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Support Areas:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.supportAreas.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.methods && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Our Methods:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.methods.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.interventionStrategies && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Intervention Strategies:</h4>
                              <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 font-serif">
                                {disorder.details.interventionStrategies.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          
                          {disorder.details.ageGroups && (
                            <>
                              <h4 className={`font-bold text-lg mb-3 ${disorder.color} font-serif`}>Age Groups:</h4>
                              <p className="text-gray-600 font-serif">{disorder.details.ageGroups}</p>
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
        {activeService === 'hearing' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                Comprehensive <span className="text-blue-600">Hearing Center</span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
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
                    
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 font-serif">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 text-left">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="text-blue-600 w-5 h-5 mr-3" />
                          <span className="text-gray-600 font-serif">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-serif font-bold mb-6">
                Schedule Your Hearing Assessment Today
              </h3>
              <p className="text-xl mb-8 opacity-90 font-serif">
                Early detection and intervention can make all the difference. Our certified audiologists are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 font-serif">
                  Book Hearing Test
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-serif">
                  Download Resources
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Future Skills Tab Content */}
        {activeService === 'future-skills' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                <span className="text-green-600">Future Ready Skills</span> with uCUBE
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
                Empowering children with essential skills for tomorrow's world through innovative learning experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {futureSkillsServices.map((service, index) => {
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
                    
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-4 font-serif">
                      {service.description}
                    </p>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {service.ageGroup}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-left mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="text-green-600 w-5 h-5 mr-3" />
                          <span className="text-gray-600 font-serif">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => handleBookSession(service.title)}
                        className="bg-green-600 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-700 transition-all duration-300 font-serif"
                      >
                        Book Session
                      </button>
                      <button 
                        onClick={() => handleContactUs()}
                        className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 hover:text-white transition-all duration-300 font-serif"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Call to Action */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-serif font-bold mb-6">
                Ready to Shape Your Child's Future?
              </h3>
              <p className="text-xl mb-8 opacity-90 font-serif">
                Join uCUBE's innovative programs and give your child the skills they need to thrive in tomorrow's world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleBookSession("Future Skills - General Booking")}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 font-serif"
                >
                  Book Future Skills Session
                </button>
                <button 
                  onClick={() => handleContactUs()}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 font-serif"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Contact Us - Future Skills</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={contactFormData.firstName}
                  onChange={(e) => updateContactFormData('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={contactFormData.lastName}
                  onChange={(e) => updateContactFormData('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactFormData.email}
                  onChange={(e) => updateContactFormData('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={contactFormData.phone}
                  onChange={(e) => updateContactFormData('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="childName">Child's Name</Label>
                <Input
                  id="childName"
                  value={contactFormData.childName}
                  onChange={(e) => updateContactFormData('childName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="childAge">Child's Age</Label>
                <Input
                  id="childAge"
                  value={contactFormData.childAge}
                  onChange={(e) => updateContactFormData('childAge', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Input
                id="serviceType"
                value={contactFormData.serviceType}
                onChange={(e) => updateContactFormData('serviceType', e.target.value)}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={contactFormData.message}
                onChange={(e) => updateContactFormData('message', e.target.value)}
                rows={4}
                placeholder="Tell us more about your requirements..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="consent"
                checked={contactFormData.consent}
                onCheckedChange={(checked) => updateContactFormData('consent', checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm">
                I agree to the terms and conditions and consent to being contacted regarding this inquiry.
              </Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">Book {selectedService} Session</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookingFirstName">First Name *</Label>
                <Input
                  id="bookingFirstName"
                  value={contactFormData.firstName}
                  onChange={(e) => updateContactFormData('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bookingLastName">Last Name *</Label>
                <Input
                  id="bookingLastName"
                  value={contactFormData.lastName}
                  onChange={(e) => updateContactFormData('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookingEmail">Email *</Label>
                <Input
                  id="bookingEmail"
                  type="email"
                  value={contactFormData.email}
                  onChange={(e) => updateContactFormData('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bookingPhone">Phone *</Label>
                <Input
                  id="bookingPhone"
                  value={contactFormData.phone}
                  onChange={(e) => updateContactFormData('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bookingChildName">Child's Name *</Label>
                <Input
                  id="bookingChildName"
                  value={contactFormData.childName}
                  onChange={(e) => updateContactFormData('childName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bookingChildAge">Child's Age *</Label>
                <Input
                  id="bookingChildAge"
                  value={contactFormData.childAge}
                  onChange={(e) => updateContactFormData('childAge', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bookingServiceType">Service Type</Label>
              <Input
                id="bookingServiceType"
                value={contactFormData.serviceType}
                onChange={(e) => updateContactFormData('serviceType', e.target.value)}
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="bookingMessage">Additional Requirements</Label>
              <Textarea
                id="bookingMessage"
                value={contactFormData.message}
                onChange={(e) => updateContactFormData('message', e.target.value)}
                rows={4}
                placeholder="Any specific requirements or preferences for the session..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="bookingConsent"
                checked={contactFormData.consent}
                onCheckedChange={(checked) => updateContactFormData('consent', checked as boolean)}
              />
              <Label htmlFor="bookingConsent" className="text-sm">
                I agree to the terms and conditions and consent to being contacted regarding this booking.
              </Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Book Session
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
} 