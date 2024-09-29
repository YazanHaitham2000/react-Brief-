import Course from "../Components/Course";
import CourseDetails from "../Components/CourseDetails";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import RequireUserAuth from "../Components/auth/RequireUserAuth";
import SubscriptionModal from "../Components/SubscriptionModal";
import Logout from "../Components/auth/Logout";
function Courses() {
    return (
      <div>
          <Logout>
      <Header />
      </Logout>
        <Course />
        <CourseDetails />
        <SubscriptionModal />
        <Footer />
      </div>
    );
  }
  
  export default Courses;


  
