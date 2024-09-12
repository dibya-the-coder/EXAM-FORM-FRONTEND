import { useFormContext } from "../context/FormContext";

const Profile = () => {
  const { currentUser } = useFormContext();
  const tableStyle = " mx-4 w-full lg:w-4/5 mx-auto bg-white border border-gray-300 rounded-lg shadow-md mt-20";
  const tdStyle = "px-6 py-6 text-gray-700 text-left w-1/2 ";
  return (
    <div>
      <h1 className="text-center my-4 text-3xl font-bold text-blue-600">HERE IS YOUR PROFILE</h1>
      <table className={tableStyle}>
        <tbody>
            <tr className="border-b border-gray-200 capitalize">
              <td className={tdStyle}>Name:</td>
              <td className={tdStyle}>{currentUser.name}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={tdStyle}>Email:</td>
              <td className={tdStyle}>{currentUser.email}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Profile