import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../Store/thunk/auth.thunk";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onhandleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });    
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUserThunk(loginData));

    console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 shadow-xl bg-base-200 border-base-300 rounded-box border p-4">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={loginData.email}
              onChange={onhandleChange}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              onChange={onhandleChange}
              value={loginData.password}
              onClick={() => setShowPassword(!showPassword)}
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
