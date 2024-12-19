function App() {
    return (
        <div data-name="app">
            <Header />
            <main>
                <Hero />
                <Services />
                <Team />
                <Testimonials />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
