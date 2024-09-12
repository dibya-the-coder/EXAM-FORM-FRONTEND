import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormContext } from "../context/FormContext";


/**
 * Navbar component for navigation and user authentication.
 *
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentUser } = useFormContext();
  const navigate = useNavigate();
  const path = useLocation().pathname
  console.log(path)
  

  /**Toggles the mobile menu open/close state.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /** Logs out the user by clearing session data and navigating to the home page.
   */
  const logout = () => { 
    setCurrentUser({ _id: '', name: '', email: '' });
    sessionStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 left-0 shadow-lg">
      <div className="container mx-auto px-4 py-3 text-lg">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <span className="text-3xl font-extrabold text-white">FORM TASK</span>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex gap-8 text-white">
            <li>
              <Link
                to={''}
                className={`hover:text-yellow-300 transition duration-300 ${path=='/dashboard'? 'text-orange-400':''}`}
              >
                profile
              </Link>
            </li>
            <li>
              <Link
                to={'exam-page'}
                className={`hover:text-yellow-300 transition duration-300 ${path=='/dashboard/exam-page'? 'text-orange-400':''}`}
              >
                    exam form
              </Link>
            </li>
            <li>
              <Link
                to={'get-all'}
                className={`hover:text-yellow-300 transition duration-300 ${path=='/dashboard/get-all'? 'text-orange-400':''}`}
              >
                see your form
              </Link>
            </li>
          </ul>

          {/* Logout Button (Desktop) */}
          <button
            onClick={logout} // Add the onClick handler here
            className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col gap-4 text-white">
              <li>
                <Link
                  to={''}
                  className="block hover:text-yellow-300 transition duration-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={'exam-page'}
                  className="block hover:text-yellow-300 transition duration-300"
                >
                  Exam Form
                </Link>
              </li>
              <li>
                <Link
                  to={'get-all'}
                  className="block hover:text-yellow-300 transition duration-300"
                >
                  See All Form
                </Link>
              </li>
              {/* Logout Button (Mobile) */}
              <li>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
