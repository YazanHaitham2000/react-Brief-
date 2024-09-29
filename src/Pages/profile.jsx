import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore"; // Firestore methods
import '../assets/css/User_Profile.css';
import '../assets/css/profile_user_pop.css';

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Logout from "../Components/auth/Logout";


const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
    });

    
  

    const [coursesData, setCoursesData] = useState([]);
    const [allCourses, setAllCourses] = useState([]); // State to hold all available courses
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newSubscription, setNewSubscription] = useState({
        courseID: '',
    });

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUser = async () => {

            const storedData = localStorage.getItem('auth');
            const parsedData = JSON.parse(storedData);
            const userId = parsedData.uid;

            const userDoc = await getDoc(doc(db, "users", userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser({
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                });
            } else {
                console.log("User does not exist.");
            }
        };
        fetchUser();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5; // عدد الدورات التي سيتم عرضها لكل صفحة

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    const currentCourses = coursesData.slice(startIndex, endIndex);
    

    // Fetch user's subscribed courses
// Fetch user's subscribed courses where status is 'accepted'
useEffect(() => {
    const fetchCourses = async () => {
                   const storedData = localStorage.getItem('auth');
        const subscriptionsCol = collection(db, 'subscriptions');
        const q = query(
            subscriptionsCol, 
            where("userID", "==", userID), 
            where("status", "==", "accepted") // Filter by accepted status
        );

        try {
            const subscriptionSnapshot = await getDocs(q);
            const subscriptionList = subscriptionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (subscriptionList.length > 0) {
                const courseIDs = subscriptionList.map(subscription => subscription.courseID);
                const coursesCol = collection(db, 'courses');
                const coursesPromises = courseIDs.map(courseID => getDoc(doc(coursesCol, courseID)));
                const coursesSnapshots = await Promise.all(coursesPromises);
                const coursesList = coursesSnapshots.map((snapshot, index) => ({
                    id: snapshot.id,
                    ...snapshot.data(),
                    endDate: subscriptionList[index].endDate
                }));
                setCoursesData(coursesList);
            } else {
                console.log(`No accepted subscriptions found for userID = ${userID}.`);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    fetchCourses();
}, []);


    // Fetch all available courses for the select dropdown
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const coursesSnapshot = await getDocs(collection(db, 'courses'));
                const coursesList = coursesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllCourses(coursesList); // Save all courses to state
            } catch (error) {
                console.error("Error fetching all courses:", error);
            }
        };
        fetchAllCourses();
    }, []);

    // Handle input changes for the new subscription form
    const handleSubscriptionInputChange = (e) => {
        const { name, value } = e.target;
        setNewSubscription((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission for new subscription
    const handleCreateSubscription = async (e) => {
        e.preventDefault();
                    const parsedData = JSON.parse(storedData);

        try {
            // Add new subscription to Firestore
            await addDoc(collection(db, 'subscriptions'), {
                userID,
                courseID: newSubscription.courseID,
                status: 'pending',
            });
            console.log("New subscription created successfully");

            // Close popup after submission
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error creating subscription:", error);
        }
    };

    // Handle form input changes for the user profile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle form submission for profile update
    const handleSubmit = async (e) => {
        e.preventDefault();
                    const userId = parsedData.uid;

        await updateDoc(doc(db, "users", userId), {
            name: user.name,
            email: user.email,
            phone: user.phone,
        });

        console.log("User updated successfully");
    };

    return (
        <>
            {/* <Header /> */}
            <Logout>
  <Header />
</Logout>
            <div className='content' style={{ marginTop: '100px' }}>
                <div className="profile-container">
                    <div className="profile-header">
                        <h1 style={{ color: '#000', textTransform: 'capitalize' }}>{user.name}</h1>
                    </div>
                    <div className="profile-content">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group my_perent_a_b">
                                <button type="submit">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="profile-container profile-container2">
                    <h2>Courses</h2>
                    <button onClick={() => setIsPopupOpen(true)}>Add Subscription</button>
                    <table className="status-table" style={{ color: "#000" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course Name</th>
                                <th>Cost</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map((course, index) => {
                                const currentDate = new Date();
                                const endDate = course.endDate ? course.endDate.toDate() : null;
                                let daysRemaining = null;
                            
                                if (endDate) {
                                    const timeDiff = endDate.getTime() - currentDate.getTime();
                                    daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
                                }
                            
                                let textColor = "#000";
                                if (daysRemaining !== null) {
                                    if (daysRemaining < 3) {
                                        textColor = "red";
                                    } else if (daysRemaining < 10) {
                                        textColor = "orange";
                                    }
                                }
                            
                                return (
                                    <tr key={course.id}>
                                        <td>{index + 1}</td>
                                        <td>{course.course_name}</td>
                                        <td>{course.total_cost}</td>
                                        <td style={{ color: textColor }}>
                                            {daysRemaining !== null ? `${daysRemaining} days` : 'No end date'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination" style={{ display: 5 >= coursesData.length ? 'none' : 'inline' }} > {/*  style={{display:: 5 > coursesData.length ? 'none' : 'inline' }} */}  
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => (endIndex < coursesData.length ? prev + 1 : prev))}
                            disabled={endIndex >= coursesData.length}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {isPopupOpen && (
                    <div className="popup">
                        <form onSubmit={handleCreateSubscription}>
                            <h3>Create New Subscription</h3>
                            <div className="form-group">
                                <label htmlFor="courseID">Course ID:</label>
                                <select
                                    style={{backgroundColor: 'rgb(216, 216, 216)'}}
                                    id="courseID"
                                    name="courseID"
                                    value={newSubscription.courseID}
                                    onChange={handleSubscriptionInputChange}
                                    required
                                >
                                    <option value="">Select a course</option>
                                    {allCourses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.course_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => setIsPopupOpen(false)}>Close</button>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Profile;
