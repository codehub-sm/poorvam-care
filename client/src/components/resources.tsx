import { useState } from "react";
import { BookOpen, Gamepad2, Users, Brain, Heart, GraduationCap, Download, Ear, Volume2, Headphones, Shield, Activity } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function Resources() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { activeService } = useServiceContext();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const earlyInterventionResources = [
    {
      title: "Early Development Guide",
      description: "Comprehensive guide covering developmental milestones and activities for ages 0-5 years.",
      icon: BookOpen,
      color: "bg-blue-600",
      bgGradient: "from-blue-50 to-cyan-50",
      pages: "24 pages"
    },
    {
      title: "Home Activity Pack",
      description: "Fun, educational activities you can do with your child to support speech and language development.",
      icon: Gamepad2,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      pages: "36 pages"
    },
    {
      title: "Autism Support Guide",
      description: "Essential information and strategies for families navigating autism spectrum disorders.",
      icon: Users,
      color: "bg-orange-600",
      bgGradient: "from-orange-50 to-yellow-50",
      pages: "42 pages"
    },
    {
      title: "Sensory Activities",
      description: "Sensory integration activities and strategies for children with processing challenges.",
      icon: Brain,
      color: "bg-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      pages: "28 pages"
    },
    {
      title: "Behavioral Strategies",
      description: "Positive behavioral support strategies for children with challenging behaviors.",
      icon: Heart,
      color: "bg-red-600",
      bgGradient: "from-red-50 to-pink-50",
      pages: "32 pages"
    },
    {
      title: "School Transition",
      description: "Guide to preparing your child for school and advocating for special education services.",
      icon: GraduationCap,
      color: "bg-indigo-600",
      bgGradient: "from-indigo-50 to-blue-50",
      pages: "38 pages"
    }
  ];

  const hearingResources = [
    {
      title: "Hearing Health Guide",
      description: "Comprehensive guide to understanding hearing health, common issues, and prevention strategies.",
      icon: Ear,
      color: "bg-blue-600",
      bgGradient: "from-blue-50 to-cyan-50",
      pages: "32 pages"
    },
    {
      title: "Pediatric Hearing Guide",
      description: "Essential information for parents about children's hearing development and early detection.",
      icon: Volume2,
      color: "bg-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      pages: "28 pages"
    },
    {
      title: "Hearing Aid Care",
      description: "Complete guide to maintaining and caring for hearing aids and assistive devices.",
      icon: Headphones,
      color: "bg-orange-600",
      bgGradient: "from-orange-50 to-yellow-50",
      pages: "24 pages"
    },
    {
      title: "Communication Strategies",
      description: "Effective communication techniques for families with hearing-impaired members.",
      icon: Shield,
      color: "bg-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      pages: "36 pages"
    },
    {
      title: "Senior Hearing Care",
      description: "Specialized guide for age-related hearing changes and senior hearing health.",
      icon: Activity,
      color: "bg-red-600",
      bgGradient: "from-red-50 to-pink-50",
      pages: "30 pages"
    },
    {
      title: "Tinnitus Management",
      description: "Strategies and techniques for managing tinnitus and related hearing conditions.",
      icon: Brain,
      color: "bg-indigo-600",
      bgGradient: "from-indigo-50 to-blue-50",
      pages: "26 pages"
    }
  ];

  const resources = activeService === 'hearing' ? hearingResources : earlyInterventionResources;

  const getSectionTitle = () => {
    return activeService === 'hearing' ? 'Hearing Health Resources' : 'Parent Resources';
  };

  const getSectionDescription = () => {
    return activeService === 'hearing' 
      ? "Access our comprehensive library of hearing health guides, care instructions, and educational materials to support optimal hearing health."
      : "Access our comprehensive library of guides, activities, and educational materials to support your child's development at home.";
  };

  // Don't render Resources section for Future Skills
  if (activeService === 'future-skills') {
    return null;
  }

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            {getSectionTitle()}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            {getSectionDescription()}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${resource.bgGradient} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}>
                <div className={`w-16 h-16 ${resource.color} rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className="text-white w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-4">{resource.title}</h3>
                <p className="text-gray-600 mb-6 font-serif">
                  {resource.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-serif">PDF • {resource.pages}</span>
                  <button className={`${resource.color} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center font-serif`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mt-12 text-center text-white">
          <h3 className="text-2xl font-serif font-bold mb-4">Stay Updated with New Resources</h3>
          <p className="text-lg mb-6 opacity-90 font-serif">
            Subscribe to our newsletter for the latest guides, tips, and resources delivered to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 border-none outline-none font-serif"
            />
            <button 
              type="submit" 
              disabled={newsletterMutation.isPending}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 font-serif"
            >
              {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
