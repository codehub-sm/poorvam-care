function TeamMember({ name, role, image, description, specialties }) {
    return (
        <div data-name="team-member" className="bg-white p-6 rounded-lg shadow-md">
            <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
            <p className="text-indigo-600 text-center mb-4">{role}</p>
            <p className="text-gray-600 mb-4 text-center">{description}</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {specialties.map((specialty, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                        {specialty}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Team() {
    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Speech & Language Therapist",
            image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=300&q=80",
            description: "Over 10 years of experience in pediatric speech therapy and early intervention.",
            specialties: ["Speech Therapy", "Feeding Therapy", "Early Intervention"]
        },
        {
            name: "Michael Chen",
            role: "Occupational Therapist",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
            description: "Specialist in sensory integration and motor development.",
            specialties: ["Sensory Integration", "Motor Skills", "Handwriting"]
        },
        {
            name: "Emma Wilson",
            role: "Play Therapist",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
            description: "Certified play therapist with expertise in emotional regulation.",
            specialties: ["Play Therapy", "Behavioral Management", "Social Skills"]
        }
    ];

    return (
        <section data-name="team" id="team" className="section bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Our Expert Team</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Meet our dedicated team of professionals committed to your child's development and well-being.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
