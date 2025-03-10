import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://todoserver-2iij.onrender.com/api/user/login",
        user,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      Navigate("/");
      localStorage.setItem("jwt", res.data.token); // Store the token
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.errors || error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center m-36">
      <div className="flex justify-center">
        <form onSubmit={HandleSubmit}>
          <div className="card w-96 bg-base-100 shadow-xl justify-center items-center">
            <div className="card-body">
              <h1 className="card-title justify-center font-semibold cursor-pointer">
                Login
              </h1>

              <div className="items-center mt-2">
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      setuser({ ...user, email: e.target.value })
                    }
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="******"
                    name="password"
                    value={user.password}
                    onChange={(e) =>
                      setuser({ ...user, password: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full">Login</button>
              </div>
              <div className="bold justify-center text-center">
                I Have no Account? {""}
                <Link to="/register" className="text-red-500">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
