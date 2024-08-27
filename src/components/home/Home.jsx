import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import CategoryCarousel from './CategoryCarousel';
import HeroSection from './HeroSection';
import LatestJobs from './LatestJobs';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
