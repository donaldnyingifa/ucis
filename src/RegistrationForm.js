import React, { useState } from "react";
// import { auth, firestore } from "./firebase";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Create a new user in Firebase Authentication
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     `${name}@example.com`,
    //     "password"
    //   );

    //   // Store additional user information in Firestore
    //   await firestore.collection("users").doc(user.uid).set({
    //     name,
    //     dateOfBirth,
    //   });

    //   // Clear form inputs
    //   setName("");
    //   setDateOfBirth("");

    //   // Display success message
    //   alert("Registration successful!");
    // } catch (error) {
    //   console.error(error);
    //   alert("Registration failed. Please try again.");
    // }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
