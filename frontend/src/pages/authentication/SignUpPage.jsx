import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserThunk } from "../../Store/thunk/auth.thunk";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const result = await dispatch(signUpUserThunk(signUpData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 shadow-xl bg-base-200 border-base-300 rounded-box border p-4">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              value={signUpData.username}
              placeholder="Name"
              className="input input-bordered w-full"
              onChange={onhandleChange}
            />
            <input
              type="email"
              name="email"
              value={signUpData.email}
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={onhandleChange}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={signUpData.password}
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={onhandleChange}
              onClick={() => setShowPassword(!showPassword)}
            />
            
            <button type="submit" className="btn btn-primary w-full">
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
