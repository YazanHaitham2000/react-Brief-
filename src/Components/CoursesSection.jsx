import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; 
import CourseDetails from "./CourseDetails"; // Import the CourseDetails component

// Course Card Component
const CourseCard = ({ imgSrc, course_name, teacher, price, duration, onDetailsClick }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={imgSrc || "https://via.placeholder.com/300"} // Fallback image if imgSrc is empty
          alt={course_name}
          style={styles.image}
        />
      </div>

      <div style={styles.cardContent}>
        <h3 style={styles.courseName}>Course name: {course_name}</h3>
        <p style={styles.teacher}>Teacher: {teacher}</p>
        <p style={styles.duration}>Duration: {duration}</p>
        <h4 style={styles.price}>Cost: ${price || 0}</h4>

        <div style={styles.buttonContainer}>
        <button className="course-button" onClick={onDetailsClick} style={{ marginRight : "5px" }}>Details</button>
        <button className="course-button">Subscription</button>
        </div>
      </div>
    </div>
  );
};

// Courses Section Component
const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to track the selected course
  const navigate = useNavigate(); 

  // Fetch courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            course_image: data.course_image || "https://via.placeholder.com/300", // Match property names
            course_name: data.course_name,
            course_teacher: data.course_teacher,
            total_cost: data.total_cost,
            course_duration: data.course_duration,
            course_description: data.course_description, // Ensure description is fetched
          };
        });

        setCourses(courseList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to handle the "Details" button click
  const handleDetailsClick = (course) => {
    setSelectedCourse(course); // Set the selected course to show in the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedCourse(null); // Reset selected course to hide the modal
  };

  // Navigate to the courses page when "Show More" is clicked
  const handleShowMore = () => {
    navigate("/courses");
  };

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Our Featured Courses</h2>

        <div style={styles.grid}>
          {courses.length === 0 ? (
            <p style={styles.noCourses}>No courses available</p>
          ) : (
            courses.slice(0, 3).map((course) => (
              <div style={styles.gridItem} key={course.id}>
                <CourseCard
                  imgSrc={course.course_image}
                  course_name={course.course_name}
                  teacher={course.course_teacher}
                  price={course.total_cost}
                  duration={course.course_duration}
                  onDetailsClick={() => handleDetailsClick(course)} // Pass the course details to the modal
                />
              </div>
            ))
          )}
        </div>

        <div style={styles.showMoreContainer}>
          <button style={styles.showMoreButton} onClick={handleShowMore}>
            Show More
          </button>
        </div>

        {/* Render CourseDetails modal if a course is selected */}
        {selectedCourse && (
          <CourseDetails course={selectedCourse} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

// Styling
const styles = {
  section: {
    padding: "40px 0",
    backgroundColor: "#f7f7f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    padding: "0 20px",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#475fa9",
    marginBottom: "40px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  gridItem: {
    width: "calc(33.333% - 20px)",
  },
  card: {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
  },
  imageContainer: {
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardContent: {
    padding: "20px",
    textAlign: "center",
  },
  courseName: {
    fontSize: "18px",
    color: "black",
  },
  teacher: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "black",
  },
  duration: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "black",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  showMoreContainer: {
    marginTop: "40px",
    textAlign: "center",
  },
  showMoreButton: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "12px 30px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  noCourses: {
    fontSize: "18px",
    color: "black",
  },
};

export default CoursesSection;