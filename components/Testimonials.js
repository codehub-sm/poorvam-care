function TestimonialCard({ text, author, relation }) {
    return (
        <div data-name="testimonial" className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            <p className="text-gray-600 mb-4">{text}</p>
            <div className="font-semibold">{author}</div>
            <div className="text-sm text-gray-500">{relation}</div>
        </div>
    );
}

function Testimonials() {
    const testimonials = [
        {
            text: "The progress our son has made since starting therapy here has been remarkable. The therapists are incredibly patient and caring.",
            author: "Mary Thompson",
            relation: "Parent of 4-year-old"
        },
        {
            text: "We've seen significant improvements in our daughter's speech and confidence. The team here is absolutely amazing!",
            author: "John Anderson",
            relation: "Parent of 6-year-old"
        },
        {
            text: "The personalized attention and care our child receives is exceptional. We couldn't be happier with the results.",
            author: "Sarah Miller",
            relation: "Parent of 3-year-old"
        }
    ];

    return (
        <section data-name="testimonials" id="testimonials" className="section bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">What Parents Say</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Read about the experiences of families who have been part of our journey.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
