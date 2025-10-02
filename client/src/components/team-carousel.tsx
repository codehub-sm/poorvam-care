import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Award, Users, Calendar } from "lucide-react";
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
  rating?: number;
  achievements?: string[];
}

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSpecializations, setExpandedSpecializations] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { activeBusinessLine } = useServiceContext();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const allTeamMembers: TeamMember[] = [
    {
      name: "Shivam",
      title: "Managing Director",
      description: "Strategic leader overseeing clinical operations and ensuring excellence in service delivery. Focuses on evidence-based practices, team development, and maintaining the highest standards of pediatric care.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/shivam-photo.jpg",
      specializations: ["Clinical Operations", "Strategic Planning", "Team Leadership", "Quality Management"],
      experience: "18+",
      clients: "100+",
      role: "both",
      rating: 4.9,
      achievements: ["MBA Healthcare Management", "Certified Quality Auditor"]
    },
    {
      name: "Apoorva",
      title: "Clinical Director",
      description: "Dual role expert leading our clinical operations while providing specialized speech therapy and audiological services. Combines administrative excellence with hands-on therapeutic expertise.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg",
      specializations: ["Clinical Leadership", "Speech Therapy", "Audiological Services", "Team Management"],
      experience: "13+",
      clients: "700+",
      role: "both",
      rating: 4.8,
      achievements: ["PhD Speech Pathology", "Certified Audiologist"]
    },
    {
        name: "Ananya",
        title: "Clinic Manager & Behavioural Therapist",
        description: "Passionate behavioral therapist dedicated to helping children overcome communication and behavioral challenges. Specializes in behavioral interventions and social communication skills.",
        image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/ananya.jpeg ",
        specializations: ["Behavioral Interventions", "Social Communication", "Behavioral Therapy", "Social Skills"],
        experience: "3+",
        clients: "200+",
        role: "early-intervention",
        rating: 4.7,
        achievements: ["BCBA Certified", "ABA Specialist"]
    },
    {
      name: "Mariapan",
      title: "Sr. Occupational Therapist",
      description: "Senior occupational therapy specialist with extensive experience in sensory integration and fine motor development. Creates comprehensive treatment plans for children with various developmental challenges.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/mariapan.png",
      specializations: ["Sensory Integration", "Fine Motor Skills", "ADL Training", "Sensory Processing"],
      experience: "15+",
      clients: "300+",
      role: "early-intervention",
      rating: 4.9,
      achievements: ["MOT Degree", "SIPT Certified"]
    },
    {
      name: "Niranjana",
      title: "Sr. Speech and Language Pathologist & Audiologist",
      description: "Senior speech therapist and audiologist specializing in complex communication disorders, language development, and comprehensive hearing assessments.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg",
      specializations: ["Communication Disorders", "Language Development", "Audiological Assessment", "AAC Devices"],
      experience: "8+",
      clients: "300+",
      role: "both",
      rating: 4.8,
      achievements: ["MSLP", "CCC-SLP Certified"]
    },
    {
      name: "Pooja",
      title: "Sr. Special Education Teacher",
      description: "Senior special education specialist with expertise in creating customized learning programs for children with diverse learning needs. Focuses on academic achievement and skill development.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Pooja.jpg",
      specializations: ["Individualized Education", "Learning Disabilities", "Academic Support", "Skill Development"],
      experience: "6+",
      clients: "100+",
      role: "early-intervention",
      rating: 4.6,
      achievements: ["M.Ed Special Education", "IEP Specialist"]
    },
    {
      name: "Aftab",
      title: "Physiotherapist / Play Therapist",
      description: "Unique dual-specialist combining physical therapy expertise with play-based interventions. Helps children improve mobility, strength, and coordination through engaging therapeutic play activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/aftab.png",
      specializations: ["Physical Therapy", "Play Therapy", "Motor Development", "Therapeutic Play"],
      experience: "2+",
      clients: "100+",
      role: "early-intervention",
      rating: 4.5,
      achievements: ["DPT", "Play Therapy Certified"]
    },
    {
      name: "Sushmita",
      title: "Occupational Therapist",
      description: "Dedicated occupational therapist helping children develop essential life skills and independence. Specializes in sensory processing, fine motor coordination, and daily living activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/sushmita.jpg",
      specializations: ["Life Skills", "Sensory Processing", "Fine Motor Skills", "Daily Living Activities"],
      experience: "5+",
      clients: "100+",
      role: "early-intervention",
      rating: 4.7,
      achievements: ["MOT", "Sensory Integration Certified"]
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

  // Filter team members based on business line
  const getTeamMembers = () => {
    if (activeBusinessLine === 'hearing-center') {
      return allTeamMembers.filter(member => 
        member.role === 'hearing' || member.role === 'both'
      );
    } else if (activeBusinessLine === 'ucube') {
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
    if (activeBusinessLine === 'hearing-center') {
      return "Meet our certified audiologists and hearing care specialists dedicated to providing comprehensive hearing solutions for all age groups.";
    } else if (activeBusinessLine === 'ucube') {
      return "Our innovative team of instructors and specialists are passionate about preparing children for tomorrow's world through cutting-edge skills and creative learning experiences.";
    } else {
      return "Our expert team of therapists and specialists work together to provide comprehensive early intervention services for children with developmental needs.";
    }
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 font-serif">
            Meet Our <span className={activeBusinessLine === 'ucube' ? 'text-emerald-600' : 'text-blue-600'}>Expert Team</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-serif leading-relaxed">
            {getServiceDescription()}
          </p>
        </div>
        
        {/* Clean Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getTeamMembers().map((member, index) => (
            <div
              key={index}
              className={`group transition-all duration-700 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Clean Profile Image */}
              <div className="relative mb-4">
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=3B82F6&color=fff&font-size=0.4`;
                    }}
                  />
                </div>
                {/* Premium Rating Badge */}
                {member.rating && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
                    <Star className="w-3 h-3 text-white fill-current" />
                    <span className="text-xs font-bold text-white">{member.rating}</span>
                  </div>
                )}
              </div>

              {/* Clean Text Box */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-serif group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-slate-600 mb-3 font-serif leading-relaxed">
                  {member.title}
                </p>
                
                {/* Compact Stats */}
                <div className="flex justify-between items-center text-xs text-slate-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{member.experience} years</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{member.clients} clients</span>
                  </div>
                </div>

                {/* Specializations - Compact */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {member.specializations.slice(0, 2).map((spec, specIndex) => (
                      <span 
                        key={specIndex}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activeBusinessLine === 'ucube' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                    {member.specializations.length > 2 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        +{member.specializations.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Achievements - Compact */}
                {member.achievements && member.achievements.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-1 text-xs text-slate-600">
                      <Award className="w-3 h-3" />
                      <span className="truncate">{member.achievements[0]}</span>
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
