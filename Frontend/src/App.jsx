import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Auth Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

// Dashboard Pages
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      {/* Router enables client-side routing in React */}
      <div>
        <Router>
          <Routes>
            {/* Root route checks authentication status */}
            <Route path="/" element={<Root />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes (currently not protected) */}
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

/**
 * Root Component
 *
 * Purpose:
 * Checks whether the user is authenticated.
 *
 * If token exists:
 *   Redirect to Dashboard
 *
 * Otherwise:
 *   Redirect to Login Page
 */
const Root = () => {
  // localStorage.getItem() returns:
  // token string -> if present
  // null         -> if absent
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
