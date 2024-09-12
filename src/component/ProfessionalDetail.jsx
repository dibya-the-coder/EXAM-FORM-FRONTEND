import { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../config/firebase';
import PropTypes from 'prop-types'

const ProfessionalDetail = ({showConfirmation}) => {
    const { formData, setFormData } = useFormContext();
    const navigate = useNavigate();
    const [data, setData] = useState({
        post: formData.professional?.post || '',
        email: formData.professional?.email || '',
        experience: formData.professional?.experience || '',
        previousCompany: formData.professional?.previousCompany || '',
        phoneNumber: formData.professional?.phoneNumber || '',
        objective: formData.professional?.objective || '',
        cv: formData.professional?.cv || null
    });
    const [errors, setErrors] = useState({});
    const [uploadStatus, setUploadStatus] = useState(''); // to track upload status

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Update the data state
        setData(prev => ({ ...prev, [id]: value }));

        // Validate the field and update the errors state
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            // Perform field-specific validation
            if (id === 'email') {
                if (!validateEmail(value)) newErrors.email = 'Invalid email format';
                else delete newErrors.email;
            }
            if (id === 'phoneNumber') {
                if (!validatePhoneNumber(value)) newErrors.phoneNumber = 'Invalid phone number format';
                else delete newErrors.phoneNumber;
            }
            if (id === 'experience' && !value.trim()) {
                newErrors.experience = 'Experience is required';
            } else {
                delete newErrors.experience;
            }
            if (id === 'previousCompany' && !value.trim()) {
                newErrors.previousCompany = 'Previous company is required';
            } else {
                delete newErrors.previousCompany;
            }
            if (id === 'objective' && !value.trim()) {
                newErrors.objective = 'Objective is required';
            } else {
                delete newErrors.objective;
            }
            if (id === 'post' && !value) {
                newErrors.postError = 'Post is required';
            } else {
                delete newErrors.postError;
            }

            return newErrors;
        });
    };

    const handleFileChange = async (e) => {
        const { type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            if (file) {
                setUploadStatus('uploading'); // Set status to uploading
                try {
                    const storage = getStorage(app);
                    const storageRef = ref(storage, 'image/' + file.name);
                    await uploadBytes(storageRef, file);
                    const downloadUrl = await getDownloadURL(storageRef);
                    setData(prevData => ({ ...prevData, cv: downloadUrl }));
                    setErrors(prevErrors => {
                        const newErrors = { ...prevErrors };
                        delete newErrors.cv;
                        return newErrors;
                    });
                    setUploadStatus('success'); // Set status to success
                } catch (error) {
                    console.error(error.message);
                    setUploadStatus('error'); // Set status to error
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!data.post) newErrors.postError = 'Post is required';
        if (!data.email) newErrors.email = 'Email is required';
        if (!data.experience) newErrors.experience = 'Experience is required';
        if (!data.previousCompany) newErrors.previousCompany = 'Previous company is required';
        if (!data.phoneNumber) newErrors.phoneNumber = 'Contact phone number is required';
        if (!data.objective) newErrors.objective = 'Objective is required';
        if (data.email && !validateEmail(data.email)) newErrors.email = 'Invalid email format';
        if (data.phoneNumber && !validatePhoneNumber(data.phoneNumber)) newErrors.phoneNumber = 'Invalid phone number format';
        if (!data.cv) newErrors.cv = 'Add your CV';

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setFormData(prev => ({
            ...prev,
            professional: data
        }));
        showConfirmation('Professional Detail')
        navigate('/dashboard/preview');
    };

    return (
        <div>
            {/* <h2 className="text-center m-4 text-4xl font-bold text-blue-700">PROFESSIONAL DETAIL</h2> */}
            <form className="lg:mt-12 flex flex-col lg:gap-8 m-4 lg:border-2 lg:p-3 rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-x-8 md:flex-row w-full">
                    <div className='block w-full lg:w-1/2'>
                    <label className='lg:block' htmlFor="post">Select the post you are applying for</label>
                    <select
                        value={data.post}
                        onChange={handleChange}
                        className={` bg-white border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${!errors.postError && data.post ? 'border-green-700' : 'border-gray-300'}`}
                        id="post"
                    >
                        <option value="" disabled>Select a post</option>
                        <option value="Intern">Intern</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                        <option value="Manager">Manager</option>
                        <option value="Business Analyst">Business Analyst</option>
                    </select>
                    {errors.postError && <p className="text-red-600">{errors.postError}</p>}
                    </div>

                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="email">Contact email</label>
                        <input
                            placeholder="Enter your email"
                            className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-x-8 md:flex-row">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="experience">Experience</label>
                        <input
                            placeholder="Enter your experience in years"
                            className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full"
                            id="experience"
                            type="number"
                            value={data.experience}
                            onChange={handleChange}
                        />
                        {errors.experience && <p className="text-red-600">{errors.experience}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="previousCompany">Previous company</label>
                        <input
                            placeholder="Enter your previous company"
                            className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full"
                            id="previousCompany"
                            type="text"
                            value={data.previousCompany}
                            onChange={handleChange}
                        />
                        {errors.previousCompany && <p className="text-red-600">{errors.previousCompany}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-x-8 md:flex-row">
                    <div className="block w-full lg:w-1/2">
                        <label className='lg:block' htmlFor="phoneNumber">Contact phone number</label>
                        <input
                            placeholder="Enter your phone number"
                            className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full"
                            id="phoneNumber"
                            type="text"
                            value={data.phoneNumber}
                            maxLength={10}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
                    </div>
                    <div className="block w-full lg:w-1/2">
                    <label className='lg:block' htmlFor="cv">{data.cv ? 'Update your CV' : 'Upload your CV'}</label>
                    <input
                        className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full"
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={uploadStatus === 'uploading'}
                    />
                    {uploadStatus === 'uploading' && <p className="text-yellow-600">Uploading CV...</p>}
                    {uploadStatus === 'success' && <p className="text-green-600">CV uploaded successfully!</p>}
                    {uploadStatus === 'error' && <p className="text-red-600">Failed to upload CV. Please try again.</p>}
                    {data.cv && (
                        <iframe
                            src={data.cv}
                            className="max-w-32 max-h-40 bg-transparent"
                            onError={(e) => {
                                e.target.src = '';
                            }}
                        >
                            <p>Your browser does not support PDFs. <a href={data.cv}>Download the PDF</a>.</p>
                        </iframe>
                    )}
                    {errors.cv && <p className="text-red-600">{errors.cv}</p>}
                </div>
                </div>

                <div>
                    <label className="lg:block" htmlFor="objective">Why are you applying for this post</label>
                    <textarea
                        placeholder="Write your objective in 250 letters"
                        className="border-2 p-2 rounded-lg focus:border-cyan-700 w-full min-h-32"
                        id="objective"
                        value={data.objective}
                        onChange={handleChange}
                        maxLength={250}
                    />
                    {errors.objective && <p className="text-red-600">{errors.objective}</p>}
                </div>

                <div className="flex flex-col lg:flex-row gap-5">
                    <button type="submit" className="w-full font-bold border-blue-700 border-2 bg-white text-blue-700 hover:bg-blue-700 p-2 rounded-lg hover:text-white">PREVIEW</button>
                </div>
            </form>
        </div>
    );
};
ProfessionalDetail.propTypes = {
    showConfirmation: PropTypes.func
}

export default ProfessionalDetail;
