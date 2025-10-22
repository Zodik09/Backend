// utils/auth.js

// Get a cookie value by name
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getCookie("token"); // returns true if token cookie exists
};
