import React from 'react';
import { useLocation } from 'react-router-dom';
import './user.scss';

function User() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userDetails = searchParams.get('name');
  const { dob, email, gender, id, income, name, stateOfOrigin } = JSON.parse(userDetails);

  return (
    <div className="user-container">
      <h2>{name}'s Data</h2>
      <div>
      <p>
          <strong>ID:</strong> {id}
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dob}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        
        <p>
          <strong>Income:</strong> ₦ {income || 0}
        </p>
        <p>
          <strong>State of Origin:</strong> {stateOfOrigin}
        </p>
      </div>
    </div>
  );
}

export default User;
