import React, { useState } from 'react';
import { generateSocialSecurityNumber } from '../../utils';
import { database, ref, push, set } from '../../firebase';
import { TextField, InputLabel, } from '@mui/material';
import './register.scss';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');


  const [err, setErr] = useState('');

  function writeUserData(name, email, dateOfBirth, gender, income) {

    // const newUserRef = push(ref(database, 'registeredUsers/'));
    // const userId = newUserRef.key; // Get the auto-generated ID

    const userId = generateSocialSecurityNumber();

    set(ref(database, 'registeredUsers/' + userId), {
      id: userId,
      name: name,
      email: email,
      dob: dateOfBirth,
      gender,
      income,
      stateOfOrigin,
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

    // Add your logic to handle the registration process or API calls here

    try {
      writeUserData(formData.name, formData.email, formData.dateOfBirth, formData.gender, formData.income);
      setErr("User added successfully");
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
          <InputLabel htmlFor="dateOfBirth" style={{ paddingRight: '10px' }}>Date of Birth </InputLabel>
          <input
            id='dateOfBirth'
            type="date"
            label='Date of Birth'
            variant='standard'
            value={dateOfBirth}
            style={{ width: "30%" }}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <br />
        <div className="center-div">
          <InputLabel style={{ paddingRight: '10px' }} htmlFor="dateOfBirth">Gender </InputLabel>
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
            id='stateOfOrigin'
            type="text"
            label='State of Origin'
            variant='standard'
            value={stateOfOrigin}
            onChange={(e) => setStateOfOrigin(e.target.value)}
          />
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
    </>
  );
}

export default Register;
