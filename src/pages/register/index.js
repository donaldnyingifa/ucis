import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { generateSocialSecurityNumber } from '../../utils';
import { database, ref, set } from '../../firebase';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './register.scss';

function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [stateOfOrigin, setStateOfOrigin] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function writeUserData(name, email, dateOfBirth, gender, income, stateOfOrigin) {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      name,
      email,
      dateOfBirth,
      gender,
      income,
      stateOfOrigin,
    };

    try {

      writeUserData(
        formData.name,
        formData.email,
        formData.dateOfBirth,
        formData.gender,
        formData.income,
        formData.stateOfOrigin
      );

      setErr('User added successfully');
      setTimeout(()=>{
        navigate("/dashboard");
      }, 2000)
    } catch (err) {
      setErr(err);
    } finally {
      setIsLoading(false);
    }

    setName('');
    setEmail('');
    setDateOfBirth('');
    setGender('');
    setIncome('');
    setStateOfOrigin('');
  };

  return (
    <>
      <div className="register-wrapper">
        <h1 className="center-div">Register</h1>
        <Form onSubmit={handleRegister}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="dateOfBirth">
            <Form.Label column sm={2}>
              Date of Birth
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="gender">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              {genderOptions.map((option) => (
                <Form.Check
                  key={option.value}
                  inline
                  label={option.label}
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              ))}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="stateOfOrigin">
            <Form.Label column sm={2}>
              State of Origin
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={stateOfOrigin}
                onChange={(e) => setStateOfOrigin(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="income">
            <Form.Label column sm={2}>
              Income
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          {err && (
            <div className="center-div">
              <p>{err}</p>
            </div>
          )}

          <div className="center-div">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Register'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
