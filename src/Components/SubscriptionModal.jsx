import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // For saving credit card info
import '../assets/css/SubscriptionModal.css';

const SubscriptionModal = ({ course, onClose }) => {
  const [creditCard, setCreditCard] = useState({
    card_holder_name: '',
    card_number: '',
    cvv: '',
    expiry_date: ''
  });

  const [user, setUser] = useState({
    name: '',
    userid: ''
  });

  useEffect(() => {
    // Retrieve the user's name and ID from localStorage
    const userName = localStorage.getItem('user_name');
    const userId = localStorage.getItem('user_id');
    
    if (userName && userId) {
      setUser({ name: userName, userid: userId });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleSaveCreditCard = async () => {
    if (!creditCard.card_holder_name || !creditCard.card_number || !creditCard.cvv || !creditCard.expiry_date) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Add credit card info to Firebase under `credit_card` collection
      await addDoc(collection(db, 'credit_card'), {
        ...creditCard,
        user_name: user.name, // Associate with the user directly
        user_id: user.userid // Assuming you have `userid` field for user identification
      });
      alert('Credit Card Info Saved Successfully!');
    } catch (error) {
      console.error('Error saving credit card info: ', error);
    }

    onClose(); // Close the modal after saving
  };

  if (!course || !user.name) return null; // Don't show the modal if data is missing

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>X</button>
        <h2>Subscription Details</h2>
        <p><strong>User Name:</strong> {user.name}</p>
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
