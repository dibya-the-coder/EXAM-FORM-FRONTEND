import { AiOutlineEyeInvisible } from "react-icons/ai"; 
import { AiFillEye } from "react-icons/ai"; 
import { useState } from "react";
import { POST } from "../config/axiosRequestService";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/**Register component for user registration.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 */
const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
  });

  const [error, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmasswordVisible, setConfirmasswordVisible] = useState(false);

   /**Validates individual form fields.
   *
   * @param {string} id - The id of the field to validate.
   * @param {string} value - The value of the field to validate.
   * @returns {string|null} - The error message if validation fails, otherwise null.
   */

   const handleConfirm = (e) => {
      if(!(e.target.value == data.password)){
        setError({...error, conFirmPasswordError: 'Confirm password must be same with password'})
        return false;
      }
      else{
        setError({...error, conFirmPasswordError: null});
        return true;
      }
   }
  const validateField = (id, value) => {
    let errorMessage = null;
    // Check if the field is empty
    if (value.trim() === "") {
      errorMessage = "This field is required";
      return errorMessage;
    }

    switch (id) {
      case 'name':
        if (!/^(?=[A-Za-z]{5,}\s)(?=.{8,}$)[A-Za-z]{5,}(?:\s[A-Za-z]+)+$/.test(value.trim())) {
          errorMessage = 'Full name must be at least 8 characters amd minimum of two words your First name and middle name must be of 5 letters combined';
        }
        break;
      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = 'Enter a valid email';
        }
        break;
      case 'password':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
          errorMessage = 'Password must be at least 6 characters long with a mix of upper, lower case letters, numbers, and special characters';
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleOnChange = (event) => {
    const { id, value, checked, type } = event.target;

    if (type === 'checkbox') {
      setData((prevData) => ({
        ...prevData,
        [id]: checked,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));

      const fieldError = validateField(id, value);
      setError((prevErrors) => ({
        ...prevErrors,
        [`${id}Error`]: fieldError,
      }));
    }
  };


  /** Handles form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The submit event.
   */
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // Validate all fields
    const newErrors = {};
    for (const field of ['name', 'email', 'password']) {
      const error = validateField(field, data[field]);
      if (error) {
        newErrors[`${field}Error`] = error;
      }
    }

    if (!data.termsAccepted) {
      newErrors.termsAcceptedError = 'You must accept the Terms and Conditions';
    }

    if (!data.privacyPolicyAccepted) {
      newErrors.privacyPolicyAcceptedError = 'You must accept the Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // If form is valid, proceed with API request
    try {
      // Send the full data object including termsAccepted and privacyPolicyAccepted
      console.log(data);
      const response = await POST("/auth/register", data);

      if (response.statusCode === 201) {
        toast.success("User created successfully!");

        // Navigate to home after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(response.error || "Registration failed.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const isSubmitDisabled = !data.termsAccepted || !data.privacyPolicyAccepted;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-[36rem]">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">Register</h1>
        
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
            />
            {error.nameError && <p className="text-red-600 text-sm mt-1">{error.nameError}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
            {error.emailError && <p className="text-red-600 text-sm mt-1">{error.emailError}</p>}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div>
              <input
                className="border w-full border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={data.password}
                onChange={handleOnChange}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(prev => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                {passwordVisible ? <AiFillEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
              </div>
            </div>
            {error.passwordError && <p className="text-red-600 text-sm mt-1">{error.passwordError}</p>}
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <div>
              <input
                className="border w-full border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={confirmasswordVisible ? "text" : "password"}
                id="condirm Password"
                onChange={handleConfirm}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setConfirmasswordVisible(prev => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
              >
                {confirmasswordVisible ? <AiFillEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
              </button>
              </div>
            </div>
            {error.conFirmPasswordError && <p className="text-red-600 text-sm mt-1">{error.conFirmPasswordError}</p>}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                checked={data.termsAccepted}
                onChange={handleOnChange}
                className="mr-2"
              />
              I accept the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                id="privacyPolicyAccepted"
                checked={data.privacyPolicyAccepted}
                onChange={handleOnChange}
                className="mr-2"
              />
              I accept the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </label>
          </div>
          <p> <span className="text-blue-400">Note:</span> Accept our Privacy Policy and Term and Conditions to continue</p>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white transition duration-300 ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={isSubmitDisabled}
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            <Link className="text-blue-600 hover:underline" to="/">
              Already have an account? Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer autoClose={3000} className='w-full lg:w-[30%]' position="top-center"/>
    </div>
  );
};

export default Register;