import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AgencySection from '../components/AgencySection';
import WorkSection from '../components/WorkSection';
import OurStory from '../components/OurStory';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import TimeDisplay from '../components/TimeDisplay';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <AgencySection />
            <WorkSection />
            <OurStory />
            <div className="bg-[#111]">
                <Testimonials />
                <BlogSection />
            </div>
            <TimeDisplay />
            <Footer />
        </div>
    );
};

export default Home;