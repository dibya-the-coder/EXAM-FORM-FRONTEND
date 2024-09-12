import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { POST } from "../config/axiosRequestService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const Preview = () => {
  const navigate = useNavigate();
  const { formData, resetFormData } = useFormContext();
  const personalDetail = formData.personal;
  const qualificationDetail = formData.qualification;
  const professionalDetail = formData.professional;
  const validateAllFormData = () => {
    return (
      personalDetail.firstName &&
      personalDetail.lastName &&
      personalDetail.email &&
      personalDetail.adhaar &&
      qualificationDetail.schoolName &&
      qualificationDetail.schoolPassingYear &&
      professionalDetail.post &&
      professionalDetail.cv &&
      professionalDetail.email &&
      professionalDetail.phoneNumber &&
      professionalDetail.objective
    );
  };

  const submitExamForm = async () => {
    if (!validateAllFormData()) {
      toast.error("Please fill all the fields."); // Show error toast
      return;
    }

    const examForm = {
      firstName: personalDetail.firstName,
      lastName: personalDetail.lastName,
      email: personalDetail.email,
      adhaar: personalDetail.adhaar,
      gender: personalDetail.gender,
      image: personalDetail.image,
      address: {
        nation: personalDetail.country,
        state: personalDetail.state,
        district: personalDetail.district,
        pin: personalDetail.pin
      },
      matriculation: {
        yearOfPassing: qualificationDetail.schoolPassingYear,
        markSecured: qualificationDetail.schoolMark,
        nameOfSchool: qualificationDetail.schoolName,
      },
      higherSecondery: {
        yearOfPassing: qualificationDetail.higherSeconderyPassingYear,
        markSecured: qualificationDetail.higherSeconderylMark,
        nameOfCollege: qualificationDetail.higherSeconderyName,
      },
      graduation: {
        yearOfPassing: qualificationDetail.universityPassingYear,
        markSecured: qualificationDetail.universitylMark,
        nameOfCollege: qualificationDetail.universityName,
      },
      profession: {
        applyForPost: professionalDetail.post,
        yearsOfExperience: professionalDetail.experience,
        resume: professionalDetail.cv,
        objective: professionalDetail.objective,
        contactNumber: professionalDetail.phoneNumber,
        contactEmail: professionalDetail.email,
        previousCompany: professionalDetail.previousCompany
      }
    };

    try {
      const response = await POST('/exam/create', examForm);
      if (response.statusCode === 201) {
        toast.success("Form is successfully submitted.");
        setTimeout(() => {
          resetFormData();
          navigate('/dashboard/get-all');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the form."); // Show error toast
    }
  };

  const tableStyle = "min-w-full bg-white border border-gray-300 rounded-lg shadow-md";
  const tdStyle = "px-6 py-4 text-gray-700 text-left w-1/2 overflow-auto"; // Set width to 50%

  return (
    <div className="p-6 container mx-auto capitalize">
      <div className="mb-8">
        <p className="text-2xl font-bold text-blue-700 mb-4">PERSONAL DETAIL</p>
        <table className={tableStyle}>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Image:</td>
              <td className={tdStyle}>
                <img src={personalDetail.image} className="h-33 max-w-32 rounded-md border border-gray-300" alt="Profile" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>First Name:</td>
              <td className={tdStyle}>{personalDetail.firstName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Last Name:</td>
              <td className={tdStyle}>{personalDetail.lastName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Email:</td>
              <td className={tdStyle}>{personalDetail.email}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Adhaar No:</td>
              <td className={tdStyle}>{personalDetail.adhaar}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Gender:</td>
              <td className={tdStyle}>{personalDetail.gender}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Country:</td>
              <td className={tdStyle}>{personalDetail.country}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>State:</td>
              <td className={tdStyle}>{personalDetail.state}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>District:</td>
              <td className={tdStyle}>{personalDetail.district}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Area Pin:</td>
              <td className={tdStyle}>{personalDetail.pin}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-bold text-blue-700 mb-4">QUALIFICATION DETAIL</p>
        <table className={tableStyle}>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Matriculation School Name:</td>
              <td className={tdStyle}>{qualificationDetail.schoolName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Matriculation Passing Year:</td>
              <td className={tdStyle}>{qualificationDetail.schoolPassingYear}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Matriculation Result:</td>
              <td className={tdStyle}>{qualificationDetail.schoolMark}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Institute Name:</td>
              <td className={tdStyle}>{qualificationDetail.higherSeconderyName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Passing Year:</td>
              <td className={tdStyle}>{qualificationDetail.higherSeconderyPassingYear}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Result:</td>
              <td className={tdStyle}>{qualificationDetail.higherSeconderylMark}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation University Name:</td>
              <td className={tdStyle}>{qualificationDetail.universityName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation Passing Year:</td>
              <td className={tdStyle}>{qualificationDetail.universityPassingYear}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation Result:</td>
              <td className={tdStyle}>{qualificationDetail.universitylMark}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-bold text-blue-700 mb-4">PROFESSIONAL DETAIL</p>
        <table className={tableStyle}>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Your CV:</td>
              <td className={tdStyle}>
                <iframe
                  src={professionalDetail.cv}
                  className="max-w-32 max-h-40 bg-transparent"
                  width="100%"
                  height="500px"
                  onError={(e) => {
                    e.target.src = ''; // Clear the iframe source
                    // Optionally display an error message or fallback content
                  }}
                >
                  <p>Your browser does not support PDFs. <a href={professionalDetail.cv}>Download the PDF</a>.</p>
                </iframe>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Contact email:</td>
              <td className={tdStyle}>{professionalDetail.email}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Contact Phone number:</td>
              <td className={tdStyle}>{professionalDetail.phoneNumber}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Objective:</td>
              <td className={tdStyle}>{professionalDetail.objective}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Post applied for:</td>
              <td className={tdStyle}>{professionalDetail.post}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Experience in Years:</td>
              <td className={tdStyle}>{professionalDetail.experience}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Previous company:</td>
              <td className={tdStyle}>{professionalDetail.previousCompany}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/dashboard/exam-page')}
          className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md"
        >
          BACK
        </button>
        <button
          onClick={submitExamForm}
          className="px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-lg shadow-md ml-4"
        >
          SUBMIT
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Preview;
