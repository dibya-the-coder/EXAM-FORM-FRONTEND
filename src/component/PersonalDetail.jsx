import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from "../config/firebase";
import { useFormContext } from '../context/FormContext';
import PropTypes from 'prop-types'


const PersonalDetail = ({ option, submitAction, showConfirmation }) => {
    const { formData, setFormData, currentUser } = useFormContext()   
    console.log(currentUser)
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [error, setError] = useState({});
    const ArrayName = currentUser.name.split(' ')
    
    const NAME = {}
    if(ArrayName.length != 1){ 
        NAME.lastName = ArrayName.pop();
        NAME.firstName = ArrayName.join(' ')
    }
    else NAME.firstName = currentUser.name;
    
    
    /**
     * @description it will initialize the data with some default value 
     * 
     */
    const [data, setData] = useState({
        firstName: formData.personal?.firstName || NAME.firstName || "",
        lastName: formData.personal?.lastName || NAME.lastName|| "",
        email: formData.personal?.email || currentUser.email || "",
        country: formData.personal?.country || "",
        state: formData.personal?.state || "",
        district: formData.personal?.district || "",
        pin: formData.personal?.pin || '',
        adhaar: formData.personal?.adhaar || '',
        gender: formData.personal?.gender || '',
        image: formData.personal?.image || ''
    });

    /**
     * 
     * @param {string} id 
     * @param {string , number} value : current value of the triggered input field
     * Set an error message
     */
    const validateField = (id, value) => {
        let errorMessage = null;

        switch (id) {
            case 'firstName':
                if (!/^[a-zA-Z\s]{5,}$/.test(value.trim())) {
                    errorMessage = 'First name must be at least 5 letters long and can only contain alphabets';
                }
                else {
                    errorMessage = null;
                }
                break;
            case 'lastName':
                if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                    errorMessage = 'Last name can only contain alphabets and spaces';
                }
                break;
            case 'email':
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(value)) {
                    errorMessage = 'Enter a valid email';
                }
                break;
                case 'country':
                    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                        errorMessage = 'Country name can only contain alphabets and spaces';
                    }
                    break;
                case 'state':
                    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                        errorMessage = 'State name can only contain alphabets and spaces';
                    }
                    break;
                case 'district':
                    if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
                        errorMessage = 'District name can only contain alphabets and spaces';
                    }
                    break;
            case 'pin':
                if (!/^\d{6}$/.test(value)) {
                    errorMessage = 'Pin must be a 6-digit';
                }
                break;
            case 'adhaar':
                if (!/^\d{12}$/.test(value)) {
                    errorMessage = 'Adhaar must be 12 digits';
                }
                break;
            case 'gender':
                if (!value || value === '') {
                    errorMessage = 'Please select your gender';
                }
                break;
            default:
                break;
        }
        return errorMessage;
    };

    const handleOnChange = async (event) => {
        const { type, id, value, name, files } = event.target;

        // Clear non-numeric characters for specific fields
        if (id === 'adhaar' && !/^\d*$/.test(value)) {
            setData(prevData => ({ ...prevData, [id]: value.replace(/[^0-9]/g, '') }));
            return;
        }


        if (type === 'file') {
            const image = files[0];
            if (image) {
                if (image.size > 2 * 1024 * 1024) {
                    setUploadError("File size exceeds 2MB. Please upload a smaller image.");
                    setData(prevData => ({ ...prevData, image: '' }));
                    return;
                }
                const storage = getStorage(app);
                const storageRef = ref(storage, 'images/' + image.name);
                setLoading(true);
                setUploadError(null);

                try {
                    await uploadBytes(storageRef, image);
                    const downloadUrl = await getDownloadURL(storageRef);
                    setData(prevData => ({ ...prevData, image: downloadUrl }));
                    setError(prevErrors => ({ ...prevErrors, imageError: null }));
                } catch (error) {
                    console.log(error);
                    setUploadError("Failed to upload image. Please try again.");
                } finally {
                    setLoading(false);
                }
            }
        } else if (type === 'radio' && name === 'gender') {
            setData(prevData => ({ ...prevData, gender: id }));
            setError(prevErrors => ({ ...prevErrors, genderError: null })); // Clear gender error when a gender is selected
        } else {
            const trimmedValue = value.replace(/^\s+/, '');
            setData(prevData => ({ ...prevData, [id]: trimmedValue }));
            const fieldError = validateField(id, trimmedValue);

            // Clear the error message if the field is valid
            setError(prevErrors => ({
                ...prevErrors,
                [`${id}Error`]: fieldError
            }));
        }
    };


    const handleOnSubmit = (event) => {
        event.preventDefault();
        let formIsValid = true;
        const newErrors = {};

        Object.keys(data).forEach(field => {
            const value = data[field];
            if (!data.image) {
                formIsValid = false;
                newErrors.imageError = 'Please upload your photo';
            }
            if (!value) {
                newErrors[`${field}Error`] = `${field.charAt(0).toUpperCase() + field.slice(1)} must not be empty`;
                formIsValid = false;
            } else {
                const fieldError = validateField(field, value);
                if (fieldError) {
                    formIsValid = false;
                    newErrors[`${field}Error`] = fieldError;
                }
            }
        });

        if (formIsValid) {
            setFormData(prev => ({
                ...prev,
                personal: data
            }));
            option()
            submitAction((a) => ({ ...a, section2: true }))
            console.log('coming')
            showConfirmation('Personal Detail')
        } else {
            setError(newErrors);
        }
        console.log('form data :  ',formData)
    };

    return (
        <div>
            <form onSubmit={handleOnSubmit} className="lg:mt-12 flex flex-col lg:gap-8 m-4 lg:border-2 lg:p-3 rounded-md">
                <div className="flex flex-col gap-x-8 md:flex-row w-full">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="firstName">First Name</label>
                        <input
                            value={data.firstName}
                            onChange={handleOnChange}
                            placeholder="Enter your first name"
                            className={`border-2 p-2 rounded-lg w-full ${!error.firstNameError && data.firstName ? 'border-green-700' : 'border-gray-300'}`}
                            id="firstName"
                            type="text"
                            maxLength={100}
                            readOnly
                        />
                        {error.firstNameError && <p className="text-red-600">{error.firstNameError}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="lastName">Last Name</label>
                        <input
                            defaultValue={data.lastName}
                            onChange={handleOnChange}
                            placeholder="Enter your last name"
                            className={`border-2 p-2 rounded-lg w-full ${!error.lastNameError && data.lastName ? 'border-green-700' : 'border-gray-300'}`}
                            id="lastName"
                            type="text"
                            maxLength={30}
                            readOnly
                        />
                        {error.lastNameError && <p className="text-red-600">{error.lastNameError}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-x-8 md:flex-row">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="email">Email</label>
                        <input
                            defaultValue={data.email}
                            onChange={handleOnChange}
                            maxLength={100}
                            placeholder="Enter your email"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.emailError && data.email ? 'border-green-700' : 'border-gray-300'}`}
                            id="email"
                            type="email"
                            readOnly
                        />
                        {error.emailError && <p className="text-red-600">{error.emailError}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="adhaar">Adhaar</label>
                        <input
                            defaultValue={data.adhaar}
                            onChange={handleOnChange}
                            placeholder="Enter your Adhaar"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.adhaarError && data.adhaar ? 'border-green-700' : 'border-gray-300'}`}
                            id="adhaar"
                            type="text"
                            maxLength={12}
                        />
                        {error.adhaarError && <p className="text-red-600">{error.adhaarError}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-x-8 md:flex-row">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="country">Country</label>
                        <input
                            defaultValue={data.country}
                            onChange={handleOnChange}
                            placeholder="Enter your country name"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.countryError && data.country ? 'border-green-700' : 'border-gray-300'}`}
                            id="country"
                            type="text"
                            maxLength={100}
                        />
                        {error.countryError && <p className="text-red-600">{error.countryError}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="state">State</label>
                        <input
                            defaultValue={data.state}
                            onChange={handleOnChange}
                            placeholder="Enter your state"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.stateError && data.state ? 'border-green-700' : 'border-gray-300'}`}
                            id="state"
                            type="text"
                            maxLength={100}
                        />
                        {error.stateError && <p className="text-red-600">{error.stateError}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-x-8 md:flex-row">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="district">District</label>
                        <input
                            maxLength={100}
                            defaultValue={data.district}
                            onChange={handleOnChange}
                            placeholder="Enter your district name"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.districtError && data.district ? 'border-green-700' : 'border-gray-300'}`}
                            id="district"
                            type="text"
                        />
                        {error.districtError && <p className="text-red-600">{error.districtError}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="pin">Pin</label>
                        <input
                            defaultValue={data.pin}
                            onChange={handleOnChange}
                            placeholder="Enter your area pin"
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!error.pinError && data.pin ? 'border-green-700' : 'border-gray-300'}`}
                            id="pin"
                            type="number"
                            maxLength={6}
                        />
                        {error.pinError && <p className="text-red-600">{error.pinError}</p>}
                    </div>
                </div>

                <div className="flex gap-x-8 justify-around md:flex-row mt-3">
                    <div className="block">
                        <label className="lg:block">Gender</label>
                        <div className="flex gap-4 mt-1">
                            <label>
                                <input
                                    className="mx-1"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    onChange={handleOnChange}
                                    checked={data.gender === 'male'}
                                /> Male
                            </label>
                            <label>
                                <input
                                    className="mx-1"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    onChange={handleOnChange}
                                    checked={data.gender === 'female'}
                                /> Female
                            </label>
                            <label>
                                <input
                                    className="mx-1"
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    onChange={handleOnChange}
                                    checked={data.gender === 'other'}
                                /> Other
                            </label>
                        </div>
                        {error.genderError && <p className="text-red-600">{error.genderError}</p>}
                    </div>

                    <div className="flex flex-col gap-1 lg:gap-2">
                        <label>{data.image ? 'Update your photo' : 'Upload your photo'}</label> {/* Conditionally change label */}
                        <input
                            onChange={handleOnChange}
                            className="border-2 rounded-md p-2 w-full"
                            id="image"
                            type="file"
                            accept="image/*"
                            size={'10kb'}
                        />
                        {loading && <p className="text-yellow-600">Uploading...</p>}
                        {uploadError && <p className="text-red-600">{uploadError}</p>}
                        {error.imageError && <p className="text-red-600">{error.imageError}</p>}

                        {/* Display a preview if an image has been uploaded */}
                        {data.image && (
                            <div className="mt-2">
                                <p className="text-green-600">Image uploaded successfully</p>
                                <img className="max-w-32 max-h-32 mt-2" src={data.image} alt="Uploaded preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="my-8 flex flex-col lg:flex-row gap-4">
                    <button type="submit" className="w-full font-bold border-blue-700 border-2 bg-white text-blue-700 hover:bg-blue-700 p-2 rounded-lg hover:text-white">
                        SAVE AND NEXT
                    </button>
                </div>
            </form>
        </div>
    );
}

PersonalDetail.propTypes = {
    option: PropTypes.func,
    submitAction: PropTypes.func,
    showConfirmation: PropTypes.func
}

export default PersonalDetail;
