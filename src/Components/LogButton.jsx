import react from 'react';

const LogButton = () => {
  return (
<button className="fill second">login</button>
  )
}

export default LogButton;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LogButton = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Listen to authentication state changes
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//     });

//   }, []);

//   const handleButtonClick = () => {
//     if (user) {
//       auth.signOut()
//         .then(() => {
//           navigate('/'); 
//         })
//         .catch((error) => {
//           console.error('Error logging out: ', error);
//         });
//     } else {
//       navigate('/login');
//     }
//   };

//   return (
//     <button onClick={handleButtonClick} className="fill second">
//       {user ? 'Logout' : 'Login'}
//     </button>
//   );
// };

// export default LogButton;
