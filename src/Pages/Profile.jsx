import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const Navigate = useNavigate();
  const Logout = async()=>{
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("jwt")
      Navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 cursor-pointer">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 text-center">
            <h2 className="text-lg font-semibold text-center mb-4 text-black">
              User Information
            </h2>
            <p className="text-sm text-slate-500">
              Username: <span className="font-semibold">johnDoe</span>
            </p>
            <p className="text-sm text-slate-500 mt-3">
              Email:{" "}
              <span className="font-semibold underline">
                johndoe@example.com
              </span>
            </p>
            <button
              onClick={() => Logout()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-5 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
