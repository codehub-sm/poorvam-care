function Contact() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        childAge: '',
        concern: '',
        message: ''
    });

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log('Form submitted:', formData);
            setFormData({
                name: '',
                email: '',
                phone: '',
                childAge: '',
                concern: '',
                message: ''
            });
        } catch (error) {
            reportError(error);
        }
    };

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <section data-name="contact" id="contact" className="section bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Get In Touch</h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Schedule a consultation with our experts. We'll help create a personalized intervention plan for your child.
                </p>
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <div className="bg-indigo-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <img src="https://img.icons8.com/color/48/000000/marker.png" 
                                             alt="Location icon"
                                             className="w-6 h-6 mt-1 mr-3" />
                                        <div>
                                            <h4 className="font-medium">Location</h4>
                                            <p className="text-gray-600">123 Therapy Center, Main Street<br />Bangalore, Karnataka 560001</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <img src="https://img.icons8.com/color/48/000000/clock.png" 
                                             alt="Hours icon"
                                             className="w-6 h-6 mt-1 mr-3" />
                                        <div>
                                            <h4 className="font-medium">Hours</h4>
                                            <p className="text-gray-600">Monday - Saturday<br />9:00 AM - 7:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <img src="https://img.icons8.com/color/48/000000/phone.png" 
                                             alt="Phone icon"
                                             className="w-6 h-6 mt-1 mr-3" />
                                        <div>
                                            <h4 className="font-medium">Contact</h4>
                                            <p className="text-gray-600">Phone: (123) 456-7890<br />Email: info@therapycenter.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Parent's Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="childAge" className="block text-sm font-medium text-gray-700">Child's Age</label>
                                        <input
                                            type="text"
                                            id="childAge"
                                            name="childAge"
                                            value={formData.childAge}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="concern" className="block text-sm font-medium text-gray-700">Primary Concern</label>
                                        <select
                                            id="concern"
                                            name="concern"
                                            value={formData.concern}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">Select concern</option>
                                            <option value="speech">Speech Delay</option>
                                            <option value="motor">Motor Skills</option>
                                            <option value="behavior">Behavioral Issues</option>
                                            <option value="learning">Learning Difficulties</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Information</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">
                                    Schedule Consultation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
