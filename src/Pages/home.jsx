import HeroSection from "../Components/HeroSection";
import CoursesSection from "../Components/CoursesSection";
import AboutSection from "../Components/AboutSection";
import LearnerOutcomes from "../Components/LearnerOutcomes";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HeaderLogged from "../Components/HeaderLogged";
import Logout from "../Components/auth/Logout"
function Home() {
  return (
    <div>
      <Logout>
      <Header />
      </Logout>
      <HeroSection />
      <CoursesSection />
      <AboutSection />
      <LearnerOutcomes />
      <Footer />
    </div>
  );
}

export default Home;

