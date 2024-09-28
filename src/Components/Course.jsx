import React, { useState, useEffect } from 'react';
import '../assets/css/Courses.css'; 
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 
import CourseDetails from './CourseDetails'; 
import SubscriptionModal from './SubscriptionModal'; // Import the SubscriptionModal component

const CourseCard = ({ imgSrc, course_name, course_teacher, course_duration, cost, onDetailsClick, onSubscriptionClick }) => {
  return (
    <div className="course-card">
      <img className="course-image" src={imgSrc} alt={course_name} />
      <div className="course-content">
        <h3 className="course_name">Course name: {course_name}</h3>
        <h4 className="course-teacher">Teacher: {course_teacher}</h4>
        <h4 className="course-duration">Duration: {course_duration} days</h4>
        <h4 className="course-cost" style={{ color: 'red' }}>Cost: {cost} $</h4>
        <div className="button-group">
          <button className="course-button" onClick={onDetailsClick}>Details</button>
          <button className="course-button" onClick={onSubscriptionClick}>Subscription</button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Add selectedUser state
  const [selectedCreditCard, setSelectedCreditCard] = useState(null); // Add selectedCreditCard state
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const courseSnapshot = await getDocs(coursesCollection);
      const coursesList = courseSnapshot.docs.map(doc => doc.data());
      setCourses(coursesList);
    };

    fetchCourses();
  }, []);

  // Fetch user and credit card info (for demo purposes)
  const fetchUserAndCreditCard = async () => {
    const usersCollection = collection(db, 'users');
    const creditCardCollection = collection(db, 'credit_card');
    
    const userSnapshot = await getDocs(usersCollection);
    const creditCardSnapshot = await getDocs(creditCardCollection);
    
    const userList = userSnapshot.docs.map(doc => doc.data());
    const creditCardList = creditCardSnapshot.docs.map(doc => doc.data());
    
    setSelectedUser(userList[0]); // Assuming the first user
    setSelectedCreditCard(creditCardList[0]); // Assuming the first credit card
  };

  const handleSubscriptionClick = (course) => {
    setSelectedCourse(course); // Set the selected course
    fetchUserAndCreditCard(); // Fetch user and credit card data
    setSubscriptionModalOpen(true); // Open the modal
  };

  const handleCloseSubscriptionModal = () => {
    setSubscriptionModalOpen(false); // Close the modal
    setSelectedCourse(null); // Reset selected course
  };

  return (
    <main>
      <section className="hero-section">
        <h1 className="hero-title">Our Courses</h1>
        <p className="hero-subtitle">
          <a href="/" className="hero-link">Home</a> | Courses
        </p>
      </section>

      <section className="courses-section">
        <div className="courses-grid">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              imgSrc={course.course_image}
              course_name={course.course_name}
              course_teacher={course.course_teacher}
              course_duration={course.course_duration}
              cost={course.total_cost}
              onDetailsClick={() => setSelectedCourse(course)}
              onSubscriptionClick={() => handleSubscriptionClick(course)} // Handle subscription click
            />
          ))}
        </div>
      </section>

      {/* Render CourseDetails modal when a course is selected */}
      <CourseDetails course={selectedCourse} onClose={() => setSelectedCourse(null)} />

      {/* Render SubscriptionModal when subscription is clicked */}
      {isSubscriptionModalOpen && selectedUser && selectedCreditCard && (
        <SubscriptionModal 
          course={selectedCourse} 
          user={selectedUser} 
          creditCard={selectedCreditCard} 
          onClose={handleCloseSubscriptionModal} 
        />
      )}
    </main>
  );
};

export default Courses;
