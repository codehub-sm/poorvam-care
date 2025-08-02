import { useServiceContext } from "@/contexts/ServiceContext";
import { Award, Users, Clock, Star } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  specializations: string[];
  experience: string;
  clients: string;
  role: 'early-intervention' | 'hearing' | 'both';
}

export default function TeamSection() {
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
        image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/ananya.jpg",
        specializations: ["Behavioral Interventions", "Social Communication", "Behavioral Therapy", "Social Skills"],
        experience: "2+",
        clients: "100+",
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
        name: "Soundarya",
        title: "Behavioural & Speech Therapist",
        description: "Passionate behavioral therapist dedicated to helping children overcome communication and behavioral challenges. Specializes in behavioral interventions and social communication skills.",
        image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/soundarya.jpg",
        specializations: ["Behavioral Interventions", "Social Communication", "Behavioral Therapy", "Social Skills"],
        experience: "2+",
        clients: "100+",
        role: "early-intervention"
    },
    {
        name: "Albin",
        title: "Physiotherapist / Play Therapist",
        description: "Unique dual-specialist combining physical therapy expertise with play-based interventions. Helps children improve mobility, strength, and coordination through engaging therapeutic play activities.",
        image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/albiin.png",
        specializations: ["Physical Therapy", "Play Therapy", "Motor Development", "Therapeutic Play"],
        experience: "1+",
        clients: "50+",
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
    }
  ];

  // Filter team members based on service
  const getTeamMembers = () => {
    if (activeService === 'hearing') {
      return allTeamMembers.filter(member => 
        member.role === 'hearing' || member.role === 'both'
      );
    } else {
      return allTeamMembers.filter(member => 
        member.role === 'early-intervention' || member.role === 'both'
      );
    }
  };

  const teamMembers = getTeamMembers();

  const getServiceTitle = () => {
    return activeService === 'hearing' 
      ? "Our Hearing Care Specialists" 
      : "Our Early Intervention Team";
  };

  const getServiceDescription = () => {
    return activeService === 'hearing'
      ? "Meet our certified audiologists and hearing care specialists dedicated to providing comprehensive hearing solutions for all age groups."
      : "Our expert team of therapists and specialists work together to provide comprehensive early intervention services for children with developmental needs.";
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif mb-8">
            {getServiceDescription()}
          </p>
          
          {/* Service-specific stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2">
                {activeService === 'hearing' ? 'Certified Audiologists' : 'Licensed Therapists'}
              </h3>
              <p className="text-gray-600 font-serif">
                {activeService === 'hearing' ? 'All specialists are certified by recognized audiological boards' : 'All therapists are licensed and certified professionals'}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2">
                {activeService === 'hearing' ? 'All Age Groups' : 'Child-Centered Care'}
              </h3>
              <p className="text-gray-600 font-serif">
                {activeService === 'hearing' ? 'From newborns to seniors, we serve all age groups' : 'Specialized care designed specifically for children\'s needs'}
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 font-serif mb-2">
                {activeService === 'hearing' ? 'Advanced Technology' : 'Evidence-Based'}
              </h3>
              <p className="text-gray-600 font-serif">
                {activeService === 'hearing' ? 'State-of-the-art equipment and latest hearing technology' : 'Research-backed interventions and proven methodologies'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Grid - Reduced to 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Profile Image - Smaller */}
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
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
                
                {/* Experience Badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold font-serif">
                  {member.experience} Years
                </div>
              </div>
              
              {/* Member Info - Compact */}
              <div className="p-4">
                <h3 className="text-lg font-serif font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3 font-serif text-sm">{member.title}</p>
                
                <p className="text-gray-600 mb-3 leading-relaxed font-serif text-xs line-clamp-3">
                  {member.description}
                </p>
                
                {/* Specializations - Compact */}
                <div className="mb-3">
                  <h4 className="font-bold text-xs mb-1 text-gray-800 font-serif">Specializations:</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.specializations.slice(0, 2).map((spec, specIndex) => (
                      <span key={specIndex} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium font-serif">
                        {spec}
                      </span>
                    ))}
                    {member.specializations.length > 2 && (
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium font-serif">
                        +{member.specializations.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Stats - Compact */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-sm font-bold text-blue-600 font-serif">{member.clients}</p>
                    <p className="text-xs text-gray-600 font-serif">Clients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-green-600 font-serif">{member.experience}</p>
                    <p className="text-xs text-gray-600 font-serif">Years</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold text-gray-800 font-serif ml-1">5.0</span>
                    </div>
                    <p className="text-xs text-gray-600 font-serif">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-serif font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg mb-6 opacity-90 font-serif">
              {activeService === 'hearing' 
                ? 'Schedule your hearing assessment with our certified audiologists today.'
                : 'Book a consultation with our early intervention specialists.'
              }
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 font-serif">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 