import React, { useState } from "react";
// import { auth, firestore } from "./firebase";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
