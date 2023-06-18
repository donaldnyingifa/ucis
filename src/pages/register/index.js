import React, { useState } from 'react';
import { database, ref, push, set } from '../../firebase';
import { TextField } from "@mui/material";
import Header from '../../components/header';
import Footer from '../../components/footer';
import './register.scss';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');

  const [err, setErr] = useState('');

  function writeUserData(name, email, dateOfBirth, gender, income) {

    const newUserRef = push(ref(database, 'registeredUsers/'));
    const userId = newUserRef.key; // Get the auto-generated ID

    set(ref(database, 'registeredUsers/' + userId), {
      id: userId,
      name: name,
      email: email,
      dob: dateOfBirth,
      gender,
      income,
    });
  }

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const handleRegister = () => {
    const formData = {
      name,
      email,
      dateOfBirth,
      gender,
      income,
    };

    // console.log(formData);

    // Add your logic to handle the registration process or API calls here

    try {
      writeUserData(formData.name, formData.email, formData.dateOfBirth, formData.gender, formData.income);
      setErr("User added succeccfully");
    } catch (err) {
      setErr(err)
    }

    // Clear the form fields after registration
    setName('');
    setEmail('');
    setDateOfBirth('');
    setGender('');
    setIncome('');
  };

  return (
    <>
      <Header />

      <div className="register-wrapper">
        <h1 className="center-div">Register</h1>
        <div className="center-div">
          <TextField
            id='name'
            type="text"
            label='Name'
            variant='standard'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div className="center-div">
          <TextField
            id='email'
            type="email"
            label='Email'
            variant='standard'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className="center-div">
          <input
            id='dateOfBirth'
            type="date"
            label='Date of Birth'
            variant='standard'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <br />
        <div className="center-div">
          {genderOptions.map((option) => (
            <label key={option.value} className="radio-label">
              <input
                type="radio"
                name="gender"
                value={option.value}
                checked={gender === option.value}
                onChange={(e) => setGender(e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
        <br />
        <div className="center-div">
          <TextField
            id='income'
            type="text"
            label='Income'
            variant='standard'
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <br />
        {
          err && (
            <div className="center-div">
              <p>{err}</p>
            </div>
          )
        }
        <div className="center-div">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;