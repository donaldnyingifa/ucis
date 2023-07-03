import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './user.scss';

function User() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleUpdate = () => {
    navigate('/update', {
      state: state
    });
  };

  return (
    <div className="user-container">
      <h2>{state?.name}'s Data</h2>
      <div>
        <p>
          <strong>ID:</strong> {state?.id}
        </p>
        <p>
          <strong>Name:</strong> {state?.name}
        </p>
        <p>
          <strong>State of Origin:</strong> {state?.stateOfOrigin}
        </p>
        <p>
          <strong>Email:</strong> {state?.email}
        </p>
        <p>
          <strong>Date of Birth:</strong> {state?.dob}
        </p>
        <p>
          <strong>Gender:</strong> {state?.gender}
        </p>
        <p>
          <strong>Income:</strong> ₦ {state?.income || 0}
        </p>
        <p>
          <strong>Number of Accounts:</strong> {state?.totalAcc || '--'}
        </p>
        <p>
          <strong>Loan:</strong> ₦ {state?.loan || 0}
        </p>
        <p>
          <strong>Polling Unit:</strong> {state?.pollingUnit || '--'}
        </p>
      </div>
      <div className="button-container">
        <button onClick={handleGoBack}>Back</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default User;
