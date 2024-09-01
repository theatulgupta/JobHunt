import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import CategoryCarousel from './CategoryCarousel';
import HeroSection from './HeroSection';
import LatestJobs from './LatestJobs';

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

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
