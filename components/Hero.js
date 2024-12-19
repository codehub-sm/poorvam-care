function Hero() {
    return (
        <section data-name="hero" id="home" className="pt-24 pb-12 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Transform Your Child's Future With Early Intervention
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            We provide comprehensive therapy and developmental services for children aged 0-12 years. Our expert team ensures personalized care for your child's unique needs.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#contact" data-name="contact-btn" className="btn btn-primary">
                                Book Assessment
                            </a>
                            <a href="https://wa.me/1234567890" data-name="whatsapp-btn" 
                               target="_blank" rel="noopener noreferrer" 
                               className="btn btn-secondary">
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80" 
                             alt="Child development therapy session" 
                             className="rounded-lg shadow-lg"
                             width="600"
                             height="400" />
                    </div>
                </div>
            </div>
        </section>
    );
}
