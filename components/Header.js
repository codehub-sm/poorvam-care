function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        try {
            setIsMenuOpen(!isMenuOpen);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <header data-name="header" className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <a href="#" data-name="logo" className="text-2xl font-bold text-indigo-600">
                        KidsCare
                    </a>
                    
                    <button data-name="menu-button" 
                            className="md:hidden p-2"
                            onClick={toggleMenu}
                            aria-label="Toggle menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>

                    <nav data-name="navigation" className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent`}>
                        <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-6">
                            <li><a href="#home" className="hover:text-indigo-600">Home</a></li>
                            <li><a href="#services" className="hover:text-indigo-600">Services</a></li>
                            <li><a href="#contact" className="hover:text-indigo-600">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
