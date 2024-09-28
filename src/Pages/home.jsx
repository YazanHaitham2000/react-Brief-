import HeroSection from "../Components/HeroSection";
import CoursesSection from "../Components/CoursesSection";
import AboutSection from "../Components/AboutSection";
import LearnerOutcomes from "../Components/LearnerOutcomes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CoursesSection />
      <AboutSection />
      <LearnerOutcomes />
      <Footer />
    </div>
  );
}

export default Home;

