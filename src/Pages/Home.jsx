import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [tode, setTode] = useState([]);
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [newtodo, Setnewtodo] = useState("");
  const navigate = useNavigate()
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const featchdata = async () => {
      try {
        SetLoading(true);
        const response = await axios.get(
          "https://todoserver-2iij.onrender.com/api/todo/gettodos",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          }
        );
        // console.log(response.data.pretodo);
        setTode(response.data.pretodo);
        setError(null);
      } catch (error) {
        setError("Failed to Featch Todo" || error);
      } finally {
        SetLoading(false);
      }
    };
    featchdata();
  }, [token]);

  const TodoCreate = async () => {
    if (!TodoCreate) return;
    if (!newtodo) {
      toast.error("Please enter a Todo");
      return;
    }
    try {
      const response = await axios.post(
        "https://todoserver-2iij.onrender.com/api/todo/todocreate",
        {
          text: newtodo,
          completed: false,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          
        }
      );
      toast.success(response.data.message);
      setTode([...tode, response.data.newTodo]);
      setError(null);
      Setnewtodo("");
    } catch (error) {
      console.log(error);
      setError("Failed to Create Todo" || error);
    }
  };

  const TodoUpdate = async (id) => {
    const todolist = tode.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `https://todoserver-2iij.onrender.com/api/todo/updatetodo/${id}`,
        {
          ...todolist,
          completed: !todolist.completed,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success(response.data.message )
      setTode(tode.map((t) => (t._id === id ? response.data.updatedTodos : t)));
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to Create Todo" || error);
    }
  };

  const TodoDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://todoserver-2iij.onrender.com/api/todo/removetodo/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        }
      );
      toast.success(response.data.message);
      setTode(tode.filter((t) => t._id !== id));
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to Delete Todo" || error);
    }
  };

  const Logout = async()=>{
    try {
      const response = await axios.get(
        "https://todoserver-2iij.onrender.com/api/user/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("jwt")
      navigate("/login")
    } catch (error) {
      console.log(error);
      setError("Failed to Logout" || error);
    }
  }

  const ReamingTodo = tode.filter((todes)=> !todes.completed).length;


  return (
    <>
      <div className=" max-w-lg lg:max-w-lg rounded-lg shadow-lg sm: mx-auto p-6 cursor-pointer ">
        <h1 className="text-2xl  font-semibold text-center text-gray-400">
          Todo App
        </h1>
        <div className="flex mt-4  mb-5  ">
          <input
            className="flex-grow p-2 border rounded focus:outline-none bg-slate-200"
            type="text"
            placeholder="Add a New Todo"
            value={newtodo}
            onChange={(e) => Setnewtodo(e.target.value)}
            onKeyPress={(e)=> e.key === "Enter" && TodoCreate()}
          />
          <button
            onClick={TodoCreate}
            className="bg-green-7 00 rounded text-white px-4 py-2 hover:bg-red-600 duration-300"
          >
            Add Todo
          </button>
        </div>
        {
          loading?
          (
            <div className="flex justify-center items-center mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
          :error?
          (
            <>
            <p className="mt-4 text-center text-red-800 font-semibold ">
              {error || "Something Went"}
            </p>
            </>
          ):(
            <>
            <ul>
          {tode.map((todos, index) => (
            <li
              key={todos._id || index}
              className="flex items-center justify-between p-3 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todos.completed}
                  onChange={() => TodoUpdate(todos._id)}
                />
                <span className={`${todos.completed ? "line-through font-semibold" : "font-semibold"}`}>{todos.text}</span>
              </div>
              <buttonx
                className="text-red-600 hover:text-red-900 duration-300"
                onClick={() => TodoDelete(todos._id)}
              >
                Delete
              </buttonx>
            </li>
          ))}
        </ul>
            </>
          )
        }
        
        <p className="mt-4 text-center text-sm  text-gray-500">
          {ReamingTodo} Todo Remaning
        </p>
        <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-900 duration-700 block mx-auto"
        onClick={()=> Logout()}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
