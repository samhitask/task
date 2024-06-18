import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const updateUser = (id, name, isLoggedIn) => {
    setUserId(id);
    setUsername(name);
    setLoggedIn(isLoggedIn);
  };

  const logoutUser = () => {
    setUserId(null);
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userId, username, loggedIn, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
