import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  // State for email field
  const [email, setEmail] = useState("");

  // State for password field
  const [password, setPassword] = useState("");

  // State for error messages
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /**
   * Handle Login Form Submission
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API logic will come later
  };

  return (
    <AuthLayout>
      <div className="w-full lg:w-[70%]">
        {/* Page Heading */}
        <h3 className="text-3xl font-bold text-black">Welcome Back!</h3>

        {/* Page Description */}
        <p className="text-sm text-slate-600 mt-2 mb-8">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          {/* Password Input */}
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Login Button */}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          {/* Signup Redirect */}
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
