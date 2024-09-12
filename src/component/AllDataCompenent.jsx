import PropTypes from 'prop-types'

const AllDataComponent = ({data, isEven}) => {
  const examData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    adhaar: data.adhaar,
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    image: data.image,
  
    address: {
      nation: data.address.nation,
      state: data.address.state,
      district: data.address.district,
      pin: data.address.pin
    },
  
    matriculation: {
      yearOfPassing: data.matriculation.yearOfPassing,
      markSecured: data.matriculation.markSecured,
      nameOfSchool: data.matriculation.nameOfSchool,
    },
  
    higherSecondery: {
      yearOfPassing: data.higherSecondery.yearOfPassing,
      markSecured: data.higherSecondery.markSecured,
      nameOfCollege: data.higherSecondery.nameOfCollege,
    },
  
    graduation: {
      yearOfPassing: data.graduation.yearOfPassing,
      markSecured: data.graduation.markSecured,
      nameOfCollege: data.graduation.nameOfCollege,
    },
  
    profession: {
      applyForPost: data.profession.applyForPost,
      yearsOfExperience: data.profession.yearsOfExperience,
      resume: data.profession.resume,
      objective: data.profession.objective,
      contactNumber: data.profession.contactNumber,
      contactEmail: data.profession.contactEmail,
      previousCompany: data.profession.previousCompany,
    }
  };
  console.log(examData)

  const tableStyle = "min-w-full max-w-full bg-white border border-gray-300 rounded-lg shadow-md ";
  const tdStyle = "px-6 py-4 text-gray-700 text-left w-1/2 break-all"; // Set width to 50%

  return (
    <div className= {`p-6 container mx-auto ${isEven? 'bg-gray-100':'bg-gray-300'} my-4 rounded-lg mb-12 border-4 border-blue-700`}>
      <div className="mb-8">
        <p className="text-2xl font-bold text-blue-700 mb-4">PERSONAL DETAIL</p>
        <table className={tableStyle}>
        
          <tbody>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Your Photo:</td>
              <td className={tdStyle}>
                <img src={examData.image} className="h-33 max-w-32 rounded-md border border-gray-300" alt="Profile" />
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>First Name:</td>
              <td className={tdStyle}>{examData.firstName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Last Name Name:</td>
              <td className={tdStyle}>{examData.lastName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Email:</td>
              <td className={tdStyle}>{examData.email}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Adhaar No:</td>
              <td className={tdStyle}>{examData.adhaar}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Gender:</td>
              <td className={tdStyle}>{examData.gender}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Country:</td>
              <td className={tdStyle}>{examData.address.nation}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>State:</td>
              <td className={tdStyle}>{examData.address.state}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>District:</td>
              <td className={tdStyle}>{examData.address.district}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Area Pin:</td>
              <td className={tdStyle}>{examData.address.pin}</td>
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
              <td className={tdStyle}>{examData.matriculation.nameOfSchool}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Matriculation Passing Year:</td>
              <td className={tdStyle}>{examData.matriculation.yearOfPassing}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Matriculation Result:</td>
              <td className={tdStyle}>{examData.matriculation.markSecured}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Institute Name:</td>
              <td className={tdStyle}>{examData.higherSecondery.nameOfCollege}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Passing Year:</td>
              <td className={tdStyle}>{examData.higherSecondery.yearOfPassing}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Higher Secondary Result:</td>
              <td className={tdStyle}>{examData.higherSecondery.markSecured}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation University Name:</td>
              <td className={tdStyle}>{examData.graduation.nameOfCollege}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation Passing Year:</td>
              <td className={tdStyle}>{examData.graduation.yearOfPassing}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Graduation Result:</td>
              <td className={tdStyle}>{examData.graduation.markSecured}</td>
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
                  src={examData.profession.resume}
                  className="max-w-32 max-h-40 bg-transparent"
                  onError={(e) => {
                    e.target.src = '';
                  }}
                >
                  <p>Your browser does not support PDFs. <a href={examData.cv}>Download the PDF</a>.</p>
                </iframe>
              </td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Contact email:</td>
              <td className={tdStyle}>{examData.profession.contactEmail}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Contact Phone number:</td>
              <td className={tdStyle}>{examData.profession.contactNumber}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Objective:</td>
              <td className={tdStyle}>{examData.profession.objective}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Post applied for:</td>
              <td className={tdStyle}>{examData.profession.applyForPost}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Experience in Years:</td>
              <td className={tdStyle}>{examData.profession.yearsOfExperience}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Previous company:</td>
              <td className={tdStyle}>{examData.profession.previousCompany}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
AllDataComponent.propTypes = {
    data: PropTypes.object,
    isEven: PropTypes.bool
}

export default AllDataComponent;
