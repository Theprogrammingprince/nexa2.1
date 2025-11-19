import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import AboutSection from '../components/AboutSection'
import Review from '../components/Review'
import FAQ from '../components/Faq'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <Review />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
