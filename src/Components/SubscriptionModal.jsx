import React, { useState } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // For saving data
import '../assets/css/SubscriptionModal.css';

const SubscriptionModal = ({ course, user, onClose }) => {
  const [creditCard, setCreditCard] = useState({
    card_holder_name: '',
    card_number: '',
    cvv: '',
    expiry_date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleSaveCreditCard = async () => {
    if (!creditCard.card_holder_name || !creditCard.card_number || !creditCard.cvv || !creditCard.expiry_date) {
      alert('Please fill out all fields.');
      return;
    }

    // Check if course.id exists and log it
    console.log("Course object:", course);
    if (!course.id) {
      console.error("Course ID is missing or undefined.");
      alert("Course ID is missing!");
      return;
    }

    try {
      // Add credit card info to Firebase under `credit_card` collection
      const creditCardData = {
        ...creditCard,
        courseID: course.id,  // Use the document ID from Firestore
        user_name: user.name,  // Associate with the user directly
        user_id: user.userid,  // Assuming you have `userid` field for user identification
        status: 'pending',     // Add status field
        created_at: new Date()  // Add timestamp
      };

      console.log("Credit Card Data Payload:", creditCardData);  // Log data before sending
      await addDoc(collection(db, 'credit_card'), creditCardData);

      // Now create a subscription in the `subscriptions` collection
      const subscriptionData = {
        courseID: course.id,   // Use the course document ID
        userID: user.userid,   // Associate it with the user's ID
        status: 'pending',     // Set initial status of the subscription
        subscription_date: new Date()  // Timestamp
      };

      console.log("Subscription Data Payload:", subscriptionData);  // Log data before sending
      await addDoc(collection(db, 'subscriptions'), subscriptionData);

      alert('Credit Card Info and Subscription Saved Successfully!');
    } catch (error) {
      console.error('Error saving credit card info or subscription:', error.message);
      alert('Error saving data: ' + error.message);
    }

    onClose(); // Close the modal after saving
  };

  if (!course || !user) return null; // Don't show the modal if data is missing

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} style={{ color : "black" }}>X</button>
        <h2>Subscription Details</h2>
        <p><strong>Course Name:</strong> {course.course_name}</p>
        <p><strong>Course Duration:</strong> {course.course_duration} days</p>
        <p><strong>Total Cost:</strong> {course.total_cost} $</p>

        <h3>Enter Credit Card Information</h3>
        <div className="credit-card-inputs">
          <input
            type="text"
            name="card_holder_name"
            placeholder="Card Holder Name"
            value={creditCard.card_holder_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="card_number"
            placeholder="Card Number"
            value={creditCard.card_number}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={creditCard.cvv}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expiry_date"
            placeholder="Expiry Date (MM/YYYY)"
            value={creditCard.expiry_date}
            onChange={handleInputChange}
          />
        </div>

        <button className="save-button" onClick={handleSaveCreditCard}>Save Credit Card</button>
      </div>
    </div>
  );
};

export default SubscriptionModal;
