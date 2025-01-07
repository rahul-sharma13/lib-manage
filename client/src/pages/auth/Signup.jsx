import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUpAuth } from "../../hooks/useAuth";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const { fetchData, loading, error } = useSignUpAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);
    
    // Use the custom hook to call the signup API
    await fetchData({
      name: form.name,
      phone: form.phone,
      password: form.password,
    });
  };

  // Check if all fields have at least one character
  const isFormValid = form.name && form.phone && form.password;

  return (
    <div className="flex w-[850px] max-w-4xl mx-auto items-center">
      <div className="w-[70%] mx-auto bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              !isFormValid || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        {error && (
          <p className="text-center text-sm text-red-500 mt-4">
            {error || "An error occurred. Please try again."}
          </p>
        )}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
