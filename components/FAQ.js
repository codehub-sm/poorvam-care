function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div data-name="faq-item" className="border-b border-gray-200">
            <button
                className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-900">{question}</span>
                <svg
                    className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
                <p className="text-gray-600">{answer}</p>
            </div>
        </div>
    );
}

function FAQ() {
    const faqs = [
        {
            question: "What age groups do you work with?",
            answer: "We provide services for children from birth to 12 years old. Early intervention is crucial, but we can help children at any stage of development."
        },
        {
            question: "How long does each therapy session last?",
            answer: "Therapy sessions typically last 45-60 minutes, depending on the child's needs and attention span. We customize session lengths based on individual requirements."
        },
        {
            question: "Do you accept insurance?",
            answer: "Yes, we work with several insurance providers. Please contact our office for specific information about your insurance coverage."
        },
        {
            question: "How often should my child attend therapy?",
            answer: "The frequency of sessions depends on your child's specific needs and goals. We typically recommend 1-3 sessions per week, but this can vary."
        },
        {
            question: "What is your assessment process?",
            answer: "Our assessment process includes a comprehensive evaluation of your child's abilities and needs, parent interviews, and standardized testing when appropriate."
        }
    ];

    return (
        <section data-name="faq" id="faq" className="section bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Find answers to common questions about our services and approach.
                </p>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}
