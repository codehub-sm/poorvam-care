function ServiceCard({ title, description, icon, features }) {
    return (
        <div data-name="service-card" className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Services() {
    const services = [
        {
            title: "Speech & Language Therapy",
            description: "Comprehensive evaluation and therapy for communication disorders.",
            icon: <img src="https://img.icons8.com/color/48/000000/talk-male.png" alt="Speech therapy icon" />,
            features: [
                "Speech sound disorders",
                "Language delays",
                "Fluency disorders",
                "Social communication",
                "Feeding & swallowing"
            ]
        },
        {
            title: "Occupational Therapy",
            description: "Enhancing daily living skills and motor development.",
            icon: <img src="https://img.icons8.com/color/48/000000/physical-therapy.png" alt="Occupational therapy icon" />,
            features: [
                "Fine motor skills",
                "Sensory processing",
                "Visual perception",
                "Self-care skills",
                "Handwriting development"
            ]
        },
        {
            title: "Play Therapy",
            description: "Using play to help children express, explore and resolve challenges.",
            icon: <img src="https://img.icons8.com/color/48/000000/playground.png" alt="Play therapy icon" />,
            features: [
                "Emotional regulation",
                "Social skills development",
                "Trauma processing",
                "Anxiety management",
                "Behavioral issues"
            ]
        },
        {
            title: "Sensory Integration",
            description: "Helping children process and respond to sensory information effectively.",
            icon: <img src="https://img.icons8.com/color/48/000000/brain.png" alt="Sensory integration icon" />,
            features: [
                "Sensory processing disorders",
                "Motor planning",
                "Balance and coordination",
                "Attention and focus",
                "Environmental adaptation"
            ]
        },
        {
            title: "Oral Placement Therapy",
            description: "Specialized therapy for oral motor and feeding challenges.",
            icon: <img src="https://img.icons8.com/color/48/000000/eating.png" alt="Oral therapy icon" />,
            features: [
                "Feeding difficulties",
                "Oral motor exercises",
                "Speech clarity",
                "Muscle strengthening",
                "Swallowing patterns"
            ]
        },
        {
            title: "Special Education",
            description: "Individualized learning programs for special needs.",
            icon: <img src="https://img.icons8.com/color/48/000000/teacher.png" alt="Special education icon" />,
            features: [
                "Academic support",
                "Behavioral management",
                "Social skills training",
                "Life skills development",
                "Parent training"
            ]
        }
    ];

    return (
        <section data-name="services" id="services" className="section bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    We offer evidence-based therapeutic interventions designed to support your child's development and help them reach their full potential.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
