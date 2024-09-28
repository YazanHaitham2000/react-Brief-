import Course from "../Components/Course";
import CourseDetails from "../Components/CourseDetails";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RequireUserAuth from "../Components/auth/RequireUserAuth"
import SubscriptionModal from "../Components/SubscriptionModal"
function Courses() {
    return (
      <div>
        <Header />
        <Course />
        <CourseDetails />
        <SubscriptionModal />
        <Footer />
      </div>
    );
  }
  
  export default Courses;
  
