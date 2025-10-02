import { useState } from "react";
import { Check, Star, Clock, Users, PhoneCall, Calendar, Zap, Heart, Brain, Ear, ChevronDown, ChevronUp, ArrowRight, Sparkles, Target, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Contact from "@/components/contact";

interface ServicePackage {
  id: string;
  name: string;
  type: "assessment" | "therapy" | "program" | "premium";
  price: number;
  duration: string;
  sessions: number;
  popular?: boolean;
  recommended?: boolean;
  description: string;
  features: string[];
  includes: string[];
  icon: any;
  color: string;
  bgGradient: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export default function ServicePackages() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "assessments" | "single-sessions" | "packages" | "premium">("all");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const servicePackages: ServicePackage[] = [
    // Assessment Packages
    {
      id: "comprehensive-assessment",
      name: "Comprehensive Development Assessment",
      type: "assessment",
      price: 3500,
      duration: "2-3 hours",
      sessions: 1,
      description: "Complete evaluation of your child's developmental milestones, cognitive abilities, and communication skills by our certified specialists.",
      features: [
        "Detailed developmental assessment",
        "Cognitive and behavioral evaluation", 
        "Communication assessment",
        "Comprehensive written report",
        "Treatment recommendations",
        "Parent consultation session"
      ],
      includes: [
        "Written assessment report",
        "Developmental milestone tracking",
        "Customized intervention plan",
        "Resource recommendations",
        "Follow-up consultation"
      ],
      icon: Brain,
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-100",
      testimonial: {
        text: "The comprehensive assessment gave us clear insights into our daughter's needs and a roadmap for her development.",
        author: "Priya Sharma",
        role: "Mother of 4-year-old"
      }
    },
    {
      id: "hearing-assessment",
      name: "Complete Hearing Evaluation",
      type: "assessment", 
      price: 2500,
      duration: "1-2 hours",
      sessions: 1,
      description: "Thorough audiological assessment using state-of-the-art equipment to evaluate hearing health across all age groups.",
      features: [
        "Pure tone audiometry",
        "Speech audiometry", 
        "Tympanometry testing",
        "Otoacoustic emissions (OAE)",
        "Detailed audiological report",
        "Hearing aid consultation if needed"
      ],
      includes: [
        "Complete hearing test battery",
        "Audiogram interpretation", 
        "Hearing health recommendations",
        "Assistive device guidance",
        "Follow-up scheduling"
      ],
      icon: Ear,
      color: "text-green-600",
      bgGradient: "from-green-50 to-emerald-100"
    },
    {
      id: "autism-screening-assessment",
      name: "Autism Spectrum Screening",
      type: "assessment",
      price: 4000,
      duration: "2-3 hours",
      sessions: 1,
      description: "Comprehensive autism spectrum disorder screening using standardized assessment tools and clinical observation.",
      features: [
        "ADOS-2 assessment",
        "ADI-R interview",
        "Clinical observation",
        "Social communication evaluation",
        "Sensory profile assessment",
        "Comprehensive diagnostic report"
      ],
      includes: [
        "Standardized screening tests",
        "Parent interview session",
        "Clinical observation notes",
        "Diagnostic report",
        "Treatment recommendations",
        "Resource referrals"
      ],
      icon: Brain,
      color: "text-indigo-600",
      bgGradient: "from-indigo-50 to-blue-100"
    },
    {
      id: "learning-disability-assessment",
      name: "Learning Disability Assessment", 
      type: "assessment",
      price: 4500,
      duration: "3-4 hours",
      sessions: 1,
      description: "Comprehensive psychoeducational assessment to identify learning disabilities and academic processing difficulties.",
      features: [
        "Cognitive ability testing",
        "Academic achievement testing",
        "Processing speed evaluation",
        "Memory assessment",
        "Executive function testing",
        "Detailed psychoeducational report"
      ],
      includes: [
        "Standardized test battery",
        "Academic skill evaluation",
        "Processing assessment",
        "Comprehensive written report",
        "Educational recommendations",
        "IEP support documentation"
      ],
      icon: Star,
      color: "text-cyan-600",
      bgGradient: "from-cyan-50 to-teal-100"
    },
    {
      id: "behavioral-assessment",
      name: "Behavioral Assessment",
      type: "assessment",
      price: 3000,
      duration: "2 hours", 
      sessions: 1,
      description: "Comprehensive behavioral evaluation to identify behavioral patterns, triggers, and intervention strategies.",
      features: [
        "Functional behavior analysis",
        "Environmental assessment",
        "Trigger identification",
        "Behavioral observation",
        "Interview with caregivers",
        "Intervention plan development"
      ],
      includes: [
        "Behavioral analysis report",
        "Intervention recommendations", 
        "Data collection tools",
        "Caregiver training guide",
        "Follow-up consultation"
      ],
      icon: Heart,
      color: "text-rose-600",
      bgGradient: "from-rose-50 to-pink-100"
    },
    
    // Individual Therapy Sessions
    {
      id: "speech-therapy-single",
      name: "Speech Therapy Session",
      type: "therapy",
      price: 1200,
      duration: "45 minutes", 
      sessions: 1,
      description: "Individual speech and language therapy session with certified speech-language pathologist.",
      features: [
        "One-on-one therapy session",
        "Customized therapy plan",
        "Progress tracking",
        "Home practice materials",
        "Parent guidance"
      ],
      includes: [
        "Individual therapy session",
        "Progress notes",
        "Home exercises",
        "Parent consultation"
      ],
      icon: PhoneCall,
      color: "text-purple-600", 
      bgGradient: "from-purple-50 to-pink-100"
    },
    {
      id: "occupational-therapy-single",
      name: "Occupational Therapy Session", 
      type: "therapy",
      price: 1400,
      duration: "45 minutes",
      sessions: 1,
      description: "Focused occupational therapy to develop fine motor skills, sensory processing, and daily living activities.",
      features: [
        "Individualized OT session",
        "Sensory integration activities",
        "Fine motor skill development",
        "Adaptive strategies",
        "Equipment recommendations"
      ],
      includes: [
        "Therapy session",
        "Activity suggestions",
        "Progress documentation", 
        "Home program"
      ],
      icon: Heart,
      color: "text-red-600",
      bgGradient: "from-red-50 to-rose-100"
    },
    {
      id: "physiotherapy-single",
      name: "Physiotherapy Session",
      type: "therapy", 
      price: 1300,
      duration: "45 minutes",
      sessions: 1,
      description: "Individual physiotherapy session focused on motor development, strength building, and mobility improvement.",
      features: [
        "One-on-one physiotherapy",
        "Motor skill development",
        "Strength and mobility training",
        "Postural correction",
        "Exercise program design"
      ],
      includes: [
        "Individual therapy session",
        "Exercise recommendations",
        "Progress tracking",
        "Home exercise program"
      ],
      icon: Zap,
      color: "text-teal-600",
      bgGradient: "from-teal-50 to-cyan-100"
    },
    {
      id: "behavioral-therapy-single", 
      name: "Behavioral Therapy Session",
      type: "therapy",
      price: 1500,
      duration: "45 minutes", 
      sessions: 1,
      description: "Applied Behavior Analysis (ABA) session focused on behavior modification and skill development.",
      features: [
        "ABA-based interventions",
        "Behavior modification strategies",
        "Social skills training",
        "Communication enhancement", 
        "Data collection and analysis"
      ],
      includes: [
        "Individual therapy session",
        "Behavior plan updates",
        "Progress data reports",
        "Parent strategy guidance"
      ],
      icon: Brain,
      color: "text-amber-600", 
      bgGradient: "from-amber-50 to-orange-100"
    },
    {
      id: "special-education-single",
      name: "Special Education Session",
      type: "therapy",
      price: 1600,
      duration: "60 minutes",
      sessions: 1, 
      description: "Individualized special education session focusing on academic skills, learning strategies, and educational development.",
      features: [
        "Academic skill development",
        "Learning strategy training", 
        "Curriculum adaptation",
        "Educational assessment",
        "IEP goal targeting"
      ],
      includes: [
        "Educational therapy session",
        "Learning materials", 
        "Progress assessment",
        "Academic recommendations"
      ],
      icon: Star,
      color: "text-violet-600",
      bgGradient: "from-violet-50 to-purple-100"
    },

    // Package Programs
    {
      id: "early-intervention-starter",
      name: "Early Intervention Starter",
      type: "program",
      price: 15000,
      duration: "4 weeks",
      sessions: 8,
      popular: true,
      description: "Comprehensive early intervention program combining speech, occupational, and behavioral therapy for children aged 2-5 years.",
      features: [
        "8 therapy sessions (2 per week)",
        "Multi-disciplinary approach", 
        "Speech & language therapy",
        "Occupational therapy",
        "Behavioral interventions",
        "Parent training sessions",
        "Progress assessments",
        "Home program development"
      ],
      includes: [
        "Initial assessment",
        "Weekly progress reviews",
        "Parent training materials",
        "Home activity plans",
        "Final progress report"
      ],
      icon: Zap,
      color: "text-orange-600",
      bgGradient: "from-orange-50 to-yellow-100",
      testimonial: {
        text: "The starter program was perfect for us to understand our child's needs and see real progress in just one month.",
        author: "Rajesh Kumar",
        role: "Father of 3-year-old"
      }
    },
    {
      id: "intensive-development-program",
      name: "Intensive Development Program",
      type: "program",
      price: 45000,
      duration: "12 weeks", 
      sessions: 36,
      recommended: true,
      description: "Comprehensive 3-month intensive program for children with developmental delays, autism, or other special needs.",
      features: [
        "36 therapy sessions (3 per week)",
        "Multi-disciplinary team approach",
        "Speech & language therapy",
        "Occupational therapy", 
        "Applied behavior analysis (ABA)",
        "Social skills training",
        "Weekly parent consultations",
        "Monthly progress assessments",
        "School readiness preparation"
      ],
      includes: [
        "Comprehensive initial assessment",
        "Individualized education plan (IEP)",
        "Weekly progress tracking",
        "Parent training program", 
        "Home visit consultation",
        "School transition support",
        "Final comprehensive report"
      ],
      icon: Star,
      color: "text-indigo-600",
      bgGradient: "from-indigo-50 to-blue-100",
      testimonial: {
        text: "The intensive program transformed our son's communication and social skills. The team was incredibly supportive throughout.",
        author: "Meera Patel", 
        role: "Mother of 5-year-old with autism"
      }
    },
    {
      id: "speech-therapy-package",
      name: "Speech Therapy Package",
      type: "program",
      price: 8500,
      duration: "4 weeks",
      sessions: 8,
      description: "Focused speech and language development package with specialized interventions for communication disorders.",
      features: [
        "8 speech therapy sessions",
        "Articulation training",
        "Language development activities",
        "Communication device training",
        "Stuttering intervention",
        "Voice therapy if needed",
        "Parent training sessions",
        "Home practice materials"
      ],
      includes: [
        "Initial speech assessment",
        "Weekly progress reviews",
        "Customized therapy materials",
        "Home practice program",
        "Progress report"
      ],
      icon: PhoneCall,
      color: "text-pink-600",
      bgGradient: "from-pink-50 to-rose-100"
    },
    {
      id: "behavioral-intervention-package",
      name: "Behavioral Intervention Package",
      type: "program", 
      price: 18000,
      duration: "6 weeks",
      sessions: 18,
      popular: true,
      description: "Comprehensive ABA-based behavioral intervention program for children with autism spectrum disorders and behavioral challenges.",
      features: [
        "18 ABA therapy sessions (3 per week)",
        "Functional behavior assessment",
        "Behavior intervention plan",
        "Social skills training",
        "Communication support",
        "Daily living skills training",
        "Parent and caregiver training",
        "School collaboration"
      ],
      includes: [
        "Comprehensive behavioral assessment",
        "Individualized behavior plan",
        "Weekly data collection",
        "Parent training materials",
        "Progress monitoring",
        "Final evaluation report"
      ],
      icon: Brain,
      color: "text-emerald-600",
      bgGradient: "from-emerald-50 to-green-100",
      testimonial: {
        text: "The behavioral intervention program helped our son develop better communication and reduced his challenging behaviors significantly.",
        author: "Neha Gupta",
        role: "Mother of 6-year-old with autism"
      }
    },
    {
      id: "school-readiness-package",
      name: "School Readiness Program",
      type: "program",
      price: 12000,
      duration: "6 weeks", 
      sessions: 12,
      description: "Comprehensive school preparation program focusing on academic, social, and behavioral skills for successful school transition.",
      features: [
        "12 multi-disciplinary sessions",
        "Academic readiness assessment",
        "Pre-academic skill development",
        "Social skills training",
        "Classroom behavior preparation",
        "Fine motor skill development",
        "Communication skills enhancement",
        "School visit preparation"
      ],
      includes: [
        "School readiness assessment", 
        "Individualized preparation plan",
        "Educational materials",
        "Parent transition guide",
        "School communication support",
        "Progress tracking"
      ],
      icon: Star,
      color: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-100"
    },
    {
      id: "sensory-integration-package",
      name: "Sensory Integration Program",
      type: "program",
      price: 14000,
      duration: "8 weeks",
      sessions: 16,
      description: "Specialized sensory integration therapy program for children with sensory processing disorders.",
      features: [
        "16 sensory integration sessions",
        "Sensory profile assessment",
        "Individualized sensory diet",
        "Proprioceptive activities",
        "Vestibular stimulation",
        "Tactile processing activities",
        "Environmental modifications",
        "Family training program"
      ],
      includes: [
        "Comprehensive sensory assessment",
        "Personalized sensory diet",
        "Sensory tools and equipment",
        "Home environment recommendations",
        "Caregiver training",
        "Progress evaluation"
      ],
      icon: Heart,
      color: "text-purple-600",
      bgGradient: "from-purple-50 to-pink-100"
    },

    // Premium Packages
    {
      id: "premium-family-support",
      name: "Premium Family Support Package",
      type: "premium",
      price: 75000,
      duration: "6 months",
      sessions: 72,
      description: "Premium comprehensive care package with 24/7 support, home visits, and extended family training for complex developmental needs.",
      features: [
        "72 therapy sessions (3 per week)",
        "24/7 consultation support",
        "Monthly home visits",
        "Extended family training",
        "School collaboration visits", 
        "Specialized equipment included",
        "Priority scheduling",
        "Dedicated case manager",
        "Quarterly progress reviews",
        "Transition planning support"
      ],
      includes: [
        "All therapy modalities",
        "Home visit consultations",
        "Family training workshops",
        "Educational advocacy",
        "Specialized assessments", 
        "Equipment and materials",
        "24/7 phone support",
        "Quarterly detailed reports"
      ],
      icon: Users,
      color: "text-emerald-600",
      bgGradient: "from-emerald-50 to-teal-100",
      testimonial: {
        text: "The premium package provided our family with comprehensive support. Having 24/7 access to specialists was invaluable.",
        author: "Dr. Anita Singh",
        role: "Mother of child with cerebral palsy"
      }
    },
    {
      id: "group-therapy-sessions",
      name: "Group Therapy Sessions",
      type: "program",
      price: 6000,
      duration: "4 weeks",
      sessions: 8,
      description: "Small group therapy sessions focusing on social skills development and peer interaction for children with similar needs.",
      features: [
        "8 group therapy sessions",
        "Maximum 4 children per group",
        "Age-appropriate grouping",
        "Social skills development",
        "Peer interaction training",
        "Group activities and games",
        "Progress monitoring",
        "Parent feedback sessions"
      ],
      includes: [
        "Group assessment",
        "Individualized group goals",
        "Activity materials",
        "Progress reports",
        "Parent consultation",
        "Home practice suggestions"
      ],
      icon: Users,
      color: "text-lime-600",
      bgGradient: "from-lime-50 to-green-100"
    },
    {
      id: "executive-care-package",
      name: "Executive Care Package",
      type: "premium",
      price: 125000,
      duration: "12 months",
      sessions: 144,
      description: "Ultra-premium annual care package with comprehensive services, priority access, and executive-level support for complex developmental needs.",
      features: [
        "144 therapy sessions (3 per week)",
        "Dedicated care coordinator",
        "Monthly specialist consultations",
        "Quarterly comprehensive reviews",
        "Home and school visits",
        "24/7 emergency support line",
        "Equipment and technology included",
        "Annual developmental conferences",
        "Transition planning services",
        "International consultation access"
      ],
      includes: [
        "All therapy modalities",
        "Comprehensive assessments",
        "Equipment and assistive technology",
        "Family support services",
        "Educational advocacy",
        "Medical coordination",
        "Detailed quarterly reports",
        "Annual care planning"
      ],
      icon: Star,
      color: "text-gold-600",
      bgGradient: "from-yellow-50 to-amber-100",
      testimonial: {
        text: "The executive package transformed our entire family's approach to our daughter's development. The level of care and coordination was exceptional.",
        author: "Ravi Sharma",
        role: "Father of child with complex needs"
      }
    },
    {
      id: "parent-training-program",
      name: "Parent Training Program",
      type: "program",
      price: 5000,
      duration: "6 weeks",
      sessions: 6,
      description: "Comprehensive parent training program to empower families with strategies, techniques, and knowledge for supporting their child's development.",
      features: [
        "6 parent training sessions",
        "Evidence-based strategies",
        "Home implementation techniques",
        "Behavior management training",
        "Communication enhancement",
        "Resource navigation support",
        "Peer support group access",
        "Ongoing consultation"
      ],
      includes: [
        "Training materials",
        "Resource handouts",
        "Video demonstrations",
        "Implementation checklists",
        "Follow-up support",
        "Certificate of completion"
      ],
      icon: Heart,
      color: "text-orange-600",
      bgGradient: "from-orange-50 to-red-100"
    }
  ];

  const filteredPackages = selectedCategory === "all" 
    ? servicePackages 
    : servicePackages.filter(pkg => {
        if (selectedCategory === "assessments") {
          return pkg.type === "assessment";
        }
        if (selectedCategory === "single-sessions") {
          return pkg.type === "therapy";
        }
        if (selectedCategory === "packages") {
          return pkg.type === "program";
        }
        if (selectedCategory === "premium") {
          return pkg.type === "premium";
        }
        return true;
      });

  const categories = [
    { id: "all", name: "All Services", count: servicePackages.length, icon: Sparkles, color: "bg-gradient-to-r from-blue-500 to-purple-600" },
    { id: "assessments", name: "Assessments", count: servicePackages.filter(p => p.type === "assessment").length, icon: Target, color: "bg-gradient-to-r from-green-500 to-teal-600" },
    { id: "single-sessions", name: "Single Sessions", count: servicePackages.filter(p => p.type === "therapy").length, icon: Clock, color: "bg-gradient-to-r from-orange-500 to-red-600" },
    { id: "packages", name: "Program Packages", count: servicePackages.filter(p => p.type === "program").length, icon: TrendingUp, color: "bg-gradient-to-r from-purple-500 to-pink-600" },
    { id: "premium", name: "Premium Care", count: servicePackages.filter(p => p.type === "premium").length, icon: Award, color: "bg-gradient-to-r from-yellow-500 to-orange-600" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Transforming Lives Through Expert Care
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 mb-6 leading-tight font-serif">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Care Plan
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            From quick assessments to comprehensive care packages — 
            <span className="font-semibold text-gray-800">find the perfect solution</span> for your child's unique developmental journey.
          </p>
          
          {/* Trust Indicators with enhanced design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Families Served</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600 mb-1">15+</div>
              <div className="text-sm text-gray-600">Certified Specialists</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Category Filter with enhanced UX */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Browse by Service Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as "all" | "assessments" | "single-sessions" | "packages" | "premium")}
                  className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 transform hover:scale-105 ${
                    isSelected
                      ? `${category.color} text-white shadow-2xl`
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 shadow-lg"
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    isSelected 
                      ? "bg-white/20" 
                      : "bg-gradient-to-br from-gray-100 to-gray-200"
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isSelected ? "text-white" : "text-gray-600"
                    }`} />
                  </div>
                  <div className="font-semibold text-sm mb-1">{category.name}</div>
                  <div className={`text-xs ${
                    isSelected ? "text-white/80" : "text-gray-500"
                  }`}>
                    {category.count} option{category.count !== 1 ? 's' : ''}
                  </div>
                  
                  {isSelected && (
                    <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Packages Grid with Enhanced UX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const IconComponent = pkg.icon;
            const isExpanded = expandedPackage === pkg.id;
            
            return (
              <Card 
                key={pkg.id} 
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  pkg.popular ? "ring-4 ring-blue-500 ring-opacity-50 shadow-xl" : ""
                } ${
                  pkg.recommended ? "ring-4 ring-green-500 ring-opacity-50 shadow-xl" : ""
                } bg-white`}
              >
                {/* Enhanced Popular/Recommended Badge */}
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg px-3 py-1 text-xs font-bold">
                        <Star className="w-3 h-3 mr-1 animate-pulse" />
                        MOST POPULAR
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                )}
                {pkg.recommended && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg px-3 py-1 text-xs font-bold">
                        <Award className="w-3 h-3 mr-1" />
                        RECOMMENDED
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-md opacity-30"></div>
                    </div>
                  </div>
                )}

                {/* Enhanced Header with better visual hierarchy */}
                <CardHeader className={`bg-gradient-to-br ${pkg.bgGradient} pb-6 relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`${pkg.color} w-8 h-8`} />
                      </div>
                      <div className="text-right">
                        <div className="text-3xl lg:text-4xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</div>
                        <div className="text-sm font-medium text-gray-700 bg-white/50 px-3 py-1 rounded-full mt-1">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                      {pkg.name}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-700 leading-relaxed">
                      {pkg.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  {/* Enhanced Package Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-medium">Duration</div>
                        <div className="text-sm font-semibold text-gray-900">{pkg.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="text-xs text-gray-500 uppercase font-medium">Sessions</div>
                        <div className="text-sm font-semibold text-gray-900">{pkg.sessions}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Features Preview */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Expandable Content */}
                    {pkg.features.length > 3 && (
                      <div className="mt-4">
                        <button
                          onClick={() => setExpandedPackage(isExpanded ? null : pkg.id)}
                          className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
                        >
                          <span>{isExpanded ? 'Show Less' : `+${pkg.features.length - 3} More Features`}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                            <ul className="space-y-2">
                              {pkg.features.slice(3).map((feature, index) => (
                                <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {pkg.includes.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-semibold text-gray-900 mb-2">Also Includes:</h5>
                                <ul className="space-y-1">
                                  {pkg.includes.map((include, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                                      <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                      <span>{include}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Testimonial */}
                  {pkg.testimonial && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {pkg.testimonial.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 italic leading-relaxed mb-2">"{pkg.testimonial.text}"</p>
                          <div className="text-xs">
                            <span className="font-semibold text-gray-900">{pkg.testimonial.author}</span>
                            <span className="text-gray-500 mx-1">•</span>
                            <span className="text-gray-600">{pkg.testimonial.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <div className="w-full space-y-3">
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full text-lg font-bold py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <span>Book Now</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {pkg.name}</DialogTitle>
                          <DialogDescription>
                            Complete the form below to schedule your {pkg.name.toLowerCase()} appointment.
                          </DialogDescription>
                        </DialogHeader>
                        <Contact />
                      </DialogContent>
                    </Dialog>
                    
                    <div className="text-center text-xs text-gray-500">
                      Free consultation included • No hidden fees
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className="mt-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Free Expert Guidance Available
              </div>
              
              <h3 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Still Unsure About the 
                <span className="block text-yellow-300">Perfect Care Plan?</span>
              </h3>
              
              <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                Our certified specialists will analyze your child's needs and recommend 
                the <span className="font-bold text-yellow-300">ideal service package</span> — completely free!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 group font-bold">
                      <PhoneCall className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                      Get Free Expert Consultation
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Schedule Your Free Expert Consultation</DialogTitle>
                      <DialogDescription>
                        Connect with our specialists to discuss your child's needs and get personalized recommendations.
                      </DialogDescription>
                    </DialogHeader>
                    <Contact />
                  </DialogContent>
                </Dialog>
                
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Check className="w-4 h-4" />
                  <span>No commitment • Expert guidance • 15 minutes</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold">Personalized Recommendations</div>
                    <div className="text-sm opacity-80">Based on your child's unique needs</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold">Expert Assessment</div>
                    <div className="text-sm opacity-80">By certified specialists</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-semibold">Family-Centered Approach</div>
                    <div className="text-sm opacity-80">Tailored to your family's goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Quick Answers to Your
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Most Asked Questions
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our services, policies, and how we can support your family's journey.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Do you accept insurance?",
                  answer: "We provide detailed invoices that you can submit to your insurance provider for potential reimbursement. Please check with your insurance for coverage details.",
                  icon: "💳"
                },
                {
                  question: "How do I know which program is right?",
                  answer: "We recommend starting with our comprehensive assessment or free consultation. Our specialists will evaluate your child's needs and recommend the most appropriate program.",
                  icon: "🎯"
                },
                {
                  question: "Can I customize a package?",
                  answer: "Absolutely! We understand every child is unique. We can modify our packages or create custom programs based on your child's specific needs and your family's goals.",
                  icon: "⚙️"
                },
                {
                  question: "What is your cancellation policy?",
                  answer: "We require 24 hours notice for cancellations. Sessions cancelled with adequate notice can be rescheduled within the same month at no additional charge.",
                  icon: "📅"
                },
                {
                  question: "Do you provide home visits?",
                  answer: "Yes, home visits are available for our premium packages and can be added to other programs for an additional fee. This helps us work on skills in your child's natural environment.",
                  icon: "🏠"
                },
                {
                  question: "How quickly can we start?",
                  answer: "We typically have appointments available within 1-2 weeks. For urgent cases, we offer priority scheduling to begin services as soon as possible.",
                  icon: "⚡"
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {faq.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Still Have Questions?
                </h4>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Our friendly team is here to help! Get in touch with us and we'll answer any questions you might have about our services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 shadow-lg">
                        <PhoneCall className="w-4 h-4 mr-2" />
                        Ask Our Experts
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Ask Our Experts</DialogTitle>
                        <DialogDescription>
                          Send us your questions and we'll get back to you with detailed answers.
                        </DialogDescription>
                      </DialogHeader>
                      <Contact />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}