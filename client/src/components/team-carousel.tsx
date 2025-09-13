import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useServiceContext } from "@/contexts/ServiceContext";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  specializations: string[];
  experience: string;
  clients: string;
  role: 'early-intervention' | 'hearing' | 'future-skills' | 'both';
}

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSpecializations, setExpandedSpecializations] = useState<number | null>(null);
  const { activeService } = useServiceContext();
  
  const allTeamMembers: TeamMember[] = [
    {
      name: "Shivam",
      title: "Managing Director",
      description: "Strategic leader overseeing clinical operations and ensuring excellence in service delivery. Focuses on evidence-based practices, team development, and maintaining the highest standards of pediatric care.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/shivam-photo.jpg",
      specializations: ["Clinical Operations", "Strategic Planning", "Team Leadership", "Quality Management"],
      experience: "18+",
      clients: "100+",
      role: "both"
    },
    {
      name: "Apoorva",
      title: "Clinical Director",
      description: "Dual role expert leading our clinical operations while providing specialized speech therapy and audiological services. Combines administrative excellence with hands-on therapeutic expertise.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg",
      specializations: ["Clinical Leadership", "Speech Therapy", "Audiological Services", "Team Management"],
      experience: "13+",
      clients: "700+",
      role: "both"
    },
    {
        name: "Ananya",
        title: "Clinic Manager & Behavioural Therapist",
        description: "Passionate behavioral therapist dedicated to helping children overcome communication and behavioral challenges. Specializes in behavioral interventions and social communication skills.",
        image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/ananya.jpeg ",
        specializations: ["Behavioral Interventions", "Social Communication", "Behavioral Therapy", "Social Skills"],
        experience: "3+",
        clients: "200+",
        role: "early-intervention"
    },
    {
      name: "Mariapan",
      title: "Sr. Occupational Therapist",
      description: "Senior occupational therapy specialist with extensive experience in sensory integration and fine motor development. Creates comprehensive treatment plans for children with various developmental challenges.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/mariapan.png",
      specializations: ["Sensory Integration", "Fine Motor Skills", "ADL Training", "Sensory Processing"],
      experience: "15+",
      clients: "300+",
      role: "early-intervention"
    },
    {
      name: "Niranjana",
      title: "Sr. Speech and Language Pathologist & Audiologist",
      description: "Senior speech therapist and audiologist specializing in complex communication disorders, language development, and comprehensive hearing assessments.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg",
      specializations: ["Communication Disorders", "Language Development", "Audiological Assessment", "AAC Devices"],
      experience: "8+",
      clients: "300+",
      role: "both"
    },
    {
      name: "Pooja",
      title: "Sr. Special Education Teacher",
      description: "Senior special education specialist with expertise in creating customized learning programs for children with diverse learning needs. Focuses on academic achievement and skill development.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Pooja.jpg",
      specializations: ["Individualized Education", "Learning Disabilities", "Academic Support", "Skill Development"],
      experience: "6+",
      clients: "100+",
      role: "early-intervention"
    },
    {
      name: "Aftab",
      title: "Physiotherapist / Play Therapist",
      description: "Unique dual-specialist combining physical therapy expertise with play-based interventions. Helps children improve mobility, strength, and coordination through engaging therapeutic play activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/aftab.png",
      specializations: ["Physical Therapy", "Play Therapy", "Motor Development", "Therapeutic Play"],
      experience: "2+",
      clients: "100+",
      role: "early-intervention"
    },
    {
      name: "Sushmita",
      title: "Occupational Therapist",
      description: "Dedicated occupational therapist helping children develop essential life skills and independence. Specializes in sensory processing, fine motor coordination, and daily living activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/sushmita.jpg",
      specializations: ["Life Skills", "Sensory Processing", "Fine Motor Skills", "Daily Living Activities"],
      experience: "5+",
      clients: "100+",
      role: "early-intervention"
    },
    {
      name: "Sreeshma",
      title: "Behavioural Therapist",
      description: "Passionate behavioral therapist dedicated to helping children overcome communication and behavioral challenges. Specializes in behavioral interventions and social communication skills.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/sreeshma.jpg",
      specializations: ["Behavioral Interventions", "Social Communication", "Behavioral Therapy", "Social Skills"],
      experience: "3+",
      clients: "200+",
      role: "early-intervention"
    },
    {
      name: "Aleena",
      title: "Speech and Language Pathologist",
      description: "Experienced speech therapist with a focus on early intervention and language development. Creates engaging therapy sessions that make communication fun and effective for young learners.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Aleena.jpg",
      specializations: ["Early Intervention", "Language Development", "Child-Centered Therapy", "Communication Skills"],
      experience: "1+",
      clients: "200+",
      role: "early-intervention"
    },
    {
      name: "Asha",
      title: "Speech and Language Pathologist & Audiologist",
      description: "Compassionate speech therapist and audiologist specializing in helping children and adults with communication and hearing challenges. Focuses on building confidence and developing clear, effective communication skills.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/asha.png",
      specializations: ["Communication Skills", "Speech Clarity", "Audiological Services", "Language Therapy"],
      experience: "3+",
      clients: "250+",
      role: "both"
    },
    {
      name: "Avlin",
      title: "Special Education Teacher",
      description: "Dedicated special education teacher creating inclusive learning environments for children with diverse needs. Develops personalized educational strategies to support academic and social growth.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/avlin.jpg",
      specializations: ["Inclusive Education", "Personalized Learning", "Academic Support", "Social Skills"],
      experience: "1+",
      clients: "100+",
      role: "early-intervention"
    },
    {
      name: "Simran",
      title: "Speech and Language Pathologist & Audiologist",
      description: "Skilled speech therapist and audiologist with expertise in family-centered therapy approaches and comprehensive hearing care. Works closely with families to support communication development.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/simran.jpg",
      specializations: ["Family-Centered Therapy", "Audiological Assessment", "Communication Development", "Parent Training"],
      experience: "2+",
      clients: "300+",
      role: "both"
    },
    {
      name: "Arunima",
      title: "Speech and Language Pathologist",
      description: "Specialized speech therapist with expertise in working with children with autism and ADHD. Implements evidence-based communication strategies tailored to each child's unique needs.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/arunima.png",
      specializations: ["Autism Communication", "ADHD Support", "Evidence-Based Therapy", "Individualized Care"],
      experience: "1+",
      clients: "100+",
      role: "early-intervention"
    },
    // Future Skills Team Members
    {
      name: "Sarah Johnson",
      title: "Robotics & Coding Instructor",
      description: "Passionate STEM educator specializing in robotics, coding, and technology education for children. Creates engaging hands-on learning experiences that make complex concepts accessible and fun.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      specializations: ["Robotics Programming", "STEM Education", "Block Coding", "Technology Integration"],
      experience: "5+",
      clients: "150+",
      role: "future-skills"
    },
    {
      name: "Michael Chen",
      title: "Public Speaking Coach",
      description: "Experienced communication coach specializing in public speaking, podcast creation, and presentation skills. Helps children build confidence and develop effective communication abilities.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      specializations: ["Public Speaking", "Podcast Production", "Voice Training", "Presentation Skills"],
      experience: "8+",
      clients: "200+",
      role: "future-skills"
    },
    {
      name: "Priya Sharma",
      title: "Art & Craft Specialist",
      description: "Creative arts educator with expertise in various art forms, craft techniques, and therapeutic art practices. Inspires children to express themselves through creative mediums.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      specializations: ["Fine Arts", "Craft Making", "Art Therapy", "Creative Expression"],
      experience: "6+",
      clients: "180+",
      role: "future-skills"
    },
    {
      name: "David Rodriguez",
      title: "Yoga & Wellness Instructor",
      description: "Certified yoga instructor specializing in children's yoga, mindfulness practices, and holistic wellness. Creates safe, fun, and engaging yoga experiences for all age groups.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      specializations: ["Children's Yoga", "Mindfulness", "Stress Management", "Holistic Wellness"],
      experience: "4+",
      clients: "120+",
      role: "future-skills"
    },
    {
      name: "Emma Thompson",
      title: "Event Coordinator & Activity Specialist",
      description: "Dynamic event coordinator specializing in educational birthday parties and creative activities. Designs memorable experiences that combine fun with learning opportunities.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      specializations: ["Event Planning", "Educational Activities", "Group Management", "Creative Workshops"],
      experience: "3+",
      clients: "100+",
      role: "future-skills"
    }
  ];

  // Filter team members based on service
  const getTeamMembers = () => {
    if (activeService === 'hearing') {
      return allTeamMembers.filter(member => 
        member.role === 'hearing' || member.role === 'both'
      );
    } else if (activeService === 'future-skills') {
      return allTeamMembers.filter(member => 
        member.role === 'future-skills' || member.role === 'both'
      );
    } else {
      return allTeamMembers.filter(member => 
        member.role === 'early-intervention' || member.role === 'both'
      );
    }
  };

  const teamMembers = getTeamMembers();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
    setExpandedSpecializations(null); // Reset expanded specializations when changing slides
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setExpandedSpecializations(null); // Reset expanded specializations when changing slides
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setExpandedSpecializations(null); // Reset expanded specializations when changing slides
  };

  const toggleSpecializations = (index: number) => {
    setExpandedSpecializations(expandedSpecializations === index ? null : index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [teamMembers.length]);

  const getServiceDescription = () => {
    if (activeService === 'hearing') {
      return "Meet our certified audiologists and hearing care specialists dedicated to providing comprehensive hearing solutions for all age groups.";
    } else if (activeService === 'future-skills') {
      return "Our innovative team of instructors and specialists are passionate about preparing children for tomorrow's world through cutting-edge skills and creative learning experiences.";
    } else {
      return "Our expert team of therapists and specialists work together to provide comprehensive early intervention services for children with developmental needs.";
    }
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Meet Our <span className={activeService === 'future-skills' ? 'text-green-600' : 'text-blue-600'}>Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            {getServiceDescription()}
          </p>
        </div>
        
        <div className="relative">
          <div className="carousel-container overflow-hidden">
            <div 
              className="carousel-track flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-5xl flex flex-col lg:flex-row h-[600px] lg:h-[500px]">
                    <div className="lg:w-1/2 h-64 lg:h-full flex items-center justify-center p-8">
                      <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=256&background=3B82F6&color=fff&font-size=0.4`;
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center h-full overflow-y-auto">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">{member.name}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-3 font-serif">{member.title}</p>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed font-serif text-base">
                        {member.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-sm mb-2 text-gray-800 font-serif">Specializations:</h4>
                        <div className="flex flex-wrap gap-1">
                          {expandedSpecializations === index 
                            ? member.specializations.map((spec, specIndex) => (
                                <span key={specIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium font-serif">
                                  {spec}
                                </span>
                              ))
                            : (
                              <>
                                {member.specializations.slice(0, 3).map((spec, specIndex) => (
                                  <span key={specIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium font-serif">
                                    {spec}
                                  </span>
                                ))}
                                {member.specializations.length > 3 && (
                                  <button 
                                    onClick={() => toggleSpecializations(index)}
                                    className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium font-serif hover:bg-gray-100 transition-colors cursor-pointer"
                                  >
                                    +{member.specializations.length - 3} more
                                  </button>
                                )}
                              </>
                            )
                          }
                          {expandedSpecializations === index && member.specializations.length > 3 && (
                            <button 
                              onClick={() => toggleSpecializations(index)}
                              className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium font-serif hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                              Show less
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600 font-serif">{member.clients}</p>
                          <p className="text-xs text-gray-600 font-serif">Clients Helped</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600 font-serif">{member.experience}</p>
                          <p className="text-xs text-gray-600 font-serif">Years Experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
