import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  specializations: string[];
  experience: string;
  clients: string;
}

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const teamMembers: TeamMember[] = [
    {
      name: "Shivam",
      title: "Managing Director",
      description: "Strategic leader overseeing clinical operations and ensuring excellence in service delivery. Focuses on evidence-based practices, team development, and maintaining the highest standards of pediatric care.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/shivam-photo.jpg",
      specializations: ["Clinical Operations", "Strategic Planning", "Team Leadership", "Quality Management"],
      experience: "18+",
      clients: "100+"
    },
    {
      name: "Apoorva",
      title: "Clinical Director & Speech & Language Pathologist & Audiologist",
      description: "Dual role expert leading our clinical operations while providing specialized speech therapy. Combines administrative excellence with hands-on therapeutic expertise to ensure the highest quality of care for every child.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg",
      specializations: ["Clinical Leadership", "Speech Therapy", "Team Management", "Quality Assurance"],
      experience: "13+",
      clients: "700+"
    },
    {
      name: "Mariapan",
      title: "Sr. Occupational Therapist",
      description: "Senior occupational therapy specialist with extensive experience in sensory integration and fine motor development. Creates comprehensive treatment plans for children with various developmental challenges.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/mariapan.png",
      specializations: ["Sensory Integration", "Fine Motor Skills", "ADL Training", "Sensory Processing"],
      experience: "15+",
      clients: "300+"
    },
    {
      name: "Niranjana",
      title: "Sr. Speech and Language Pathologist & Audiologist",
      description: "Senior speech therapist specializing in complex communication disorders and language development. Expert in creating individualized therapy programs for children with diverse speech and language needs.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg",
      specializations: ["Communication Disorders", "Language Development", "Articulation Therapy", "AAC Devices"],
      experience: "8+",
      clients: "300+"
    },
    {
      name: "Pooja",
      title: "Sr. Special Education Teacher",
      description: "Senior special education specialist with expertise in creating customized learning programs for children with diverse learning needs. Focuses on academic achievement and skill development.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Pooja.jpg",
      specializations: ["Individualized Education", "Learning Disabilities", "Academic Support", "Skill Development"],
      experience: "6+",
      clients: "100+"
    },
    {
      name: "Aftab",
      title: "Physiotherapist / Play Therapist",
      description: "Unique dual-specialist combining physical therapy expertise with play-based interventions. Helps children improve mobility, strength, and coordination through engaging therapeutic play activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/aftab.png",
      specializations: ["Physical Therapy", "Play Therapy", "Motor Development", "Therapeutic Play"],
      experience: "2+",
      clients: "100+"
    },
    {
      name: "Sushmita",
      title: "Occupational Therapist",
      description: "Dedicated occupational therapist helping children develop essential life skills and independence. Specializes in sensory processing, fine motor coordination, and daily living activities.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/sushmita.jpg",
      specializations: ["Life Skills", "Sensory Processing", "Fine Motor Skills", "Daily Living Activities"],
      experience: "5+",
      clients: "100+"
    },
    {
      name: "Sreeshma",
      title: "Speech and Language Pathologist",
      description: "Passionate speech therapist dedicated to helping children overcome communication challenges. Specializes in articulation disorders, language delays, and social communication skills.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/sreeshma.jpg",
      specializations: ["Articulation Disorders", "Language Delays", "Social Communication", "Speech Therapy"],
      experience: "3+",
      clients: "200+"
    },
    {
      name: "Aleena",
      title: "Speech and Language Pathologist",
      description: "Experienced speech therapist with a focus on early intervention and language development. Creates engaging therapy sessions that make communication fun and effective for young learners.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Aleena.jpg",
      specializations: ["Early Intervention", "Language Development", "Child-Centered Therapy", "Communication Skills"],
      experience: "1+",
      clients: "200+"
    },
    {
      name: "Asha",
      title: "Speech and Language Pathologist",
      description: "Compassionate speech therapist specializing in helping children with communication challenges. Focuses on building confidence and developing clear, effective communication skills.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/asha.png",
      specializations: ["Communication Skills", "Speech Clarity", "Confidence Building", "Language Therapy"],
      experience: "3+",
      clients: "250+"
    },
    {
      name: "Avlin",
      title: "Special Education Teacher",
      description: "Dedicated special education teacher creating inclusive learning environments for children with diverse needs. Develops personalized educational strategies to support academic and social growth.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/avlin.jpg",
      specializations: ["Inclusive Education", "Personalized Learning", "Academic Support", "Social Skills"],
      experience: "1+",
      clients: "100+"
    },
    {
      name: "Simran",
      title: "Speech and Language Pathologist & Audiologist",
      description: "Skilled speech therapist with expertise in family-centered therapy approaches. Works closely with families to support children's communication development in natural environments.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/simran.jpg",
      specializations: ["Family-Centered Therapy", "Natural Environment", "Communication Development", "Parent Training"],
      experience: "2+",
      clients: "300+"
    },
    {
      name: "Arunima",
      title: "Speech and Language Pathologist",
      description: "Specialized speech therapist with expertise in working with children with autism and ADHD. Implements evidence-based communication strategies tailored to each child's unique needs.",
      image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/arunima.png",
      specializations: ["Autism Communication", "ADHD Support", "Evidence-Based Therapy", "Individualized Care"],
      experience: "1+",
      clients: "100+"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-baloo font-bold text-gray-800 mb-6">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team includes qualified, licensed, and experienced professionals dedicated to your child's success.
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
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-auto max-w-6xl flex flex-col lg:flex-row h-[600px] lg:h-[600px]">
                    <div className="lg:w-1/2 h-64 lg:h-full">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center h-full overflow-y-auto">
                      <h3 className="text-3xl font-baloo font-bold text-gray-800 mb-4">{member.name}</h3>
                      <p className="text-xl text-blue-600 font-semibold mb-4">{member.title}</p>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {member.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-bold text-lg mb-2 text-gray-800">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.specializations.map((spec, specIndex) => (
                            <span key={specIndex} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{member.experience}</p>
                          <p className="text-sm text-gray-600">Years Experience</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{member.clients}</p>
                          <p className="text-sm text-gray-600">Children Helped</p>
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
