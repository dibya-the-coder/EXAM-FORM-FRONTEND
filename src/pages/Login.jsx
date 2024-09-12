import { useState } from "react";
import { POST } from "../config/axiosRequestService";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useFormContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const validateField = (id, value) => {
    let errorMessage = null;

    switch (id) {
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = "Enter a valid email";
        }
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
          )
        ) {
          errorMessage =
            "Password must be at least 6 characters long and contain a mix of upper case, lower case, numbers, and special characters";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleOnChange = (event) => {
    const { id, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    const fieldError = validateField(id, value);
    setError((prevErrors) => ({
      ...prevErrors,
      [`${id}Error`]: fieldError,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = {};

    Object.keys(data).forEach((field) => {
      const fieldError = validateField(field, data[field]);
      if (fieldError) {
        formIsValid = false;
        newErrors[`${field}Error`] = fieldError;
      }
    });

    if (!formIsValid) {
      setError(newErrors);
      return;
    }

    try {
      const response = await POST("/auth/login", data);
      if (response.statusCode === 200) {
        sessionStorage.setItem("access_token", response.access_token);
        toast.success("Login Successful!");
        setCurrentUser({
          name: response.payload.name,
          email: response.payload.email,
          _id: response.payload._id,
        });

        setTimeout(() => {
          navigate("/dashboard/");
        }, 3000);
      } else {
        toast.error(response.error || "Login failed.");
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h1>

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300 outline-none"
              type="email"
              id="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
            {error.emailError && (
              <p className="text-sm text-red-600">{error.emailError}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(prev => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                {passwordVisible ? <AiFillEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
            </div>
            {error.passwordError && (
              <p className="text-sm text-red-600">{error.passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <Link className="text-blue-600 text-sm text-center mt-2 hover:underline" to="/register">
            Not registered? Sign up here
          </Link>
        </form>
      </div>
      <ToastContainer autoClose={3000} closeButton className='w-full lg:w-[30%]' position="top-center" />
    </div>
  );
};

export default Login;
