import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    const payload =
      currState === "Sign up"
        ? { FullName, email, password, bio }
        : { email, password };

    await login(currState === "Sign up" ? "signup" : "login", payload);

    // 🔀 Redirect to chat page (or dashboard)
    navigate("/chat"); // ← You can change this route as needed
  };
  // Toggle between Sign Up and Login

  const toggleState = () => {
    setCurrState(currState === "Sign up" ? "Login" : "Sign up");
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
    setIsDataSubmitted(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center
      gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/* Left */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* Right */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 
        flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          <img src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" />
        </h2>

        {/* Full Name (Sign Up Step 1) */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={FullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {/* Shared Email and Password Fields */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none
              focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none
              focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* Bio (Sign Up Step 2) */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none
              focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us who you are..."
            required
          ></textarea>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400
        to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up"
            ? isDataSubmitted
              ? "Submit"
              : "Next"
            : "Login Now"}
        </button>

        {/* Terms Checkbox */}
        <label className="flex gap-2 items-center text-sm">
          <input type="checkbox" required />
          <span>Agree to the terms of use and Privacy.</span>
        </label>

        {/* Switch Mode */}
        <div className="text-sm text-gray-300 mt-2 text-center">
          {currState === "Sign up" ? (
            <p>
              Have an account?{" "}
              <span
                onClick={toggleState}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={toggleState}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
