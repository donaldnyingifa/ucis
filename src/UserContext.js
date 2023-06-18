import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signInUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser, signInUser }}>
      {children}
    </UserContext.Provider>
  );
};
