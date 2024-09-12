import { useState } from "react";
import { useFormContext } from "../context/FormContext";
import PropTypes from 'prop-types'

const QualificationDetail = ({option, submitAction, showConfirmation}) => {
    const { formData, setFormData } = useFormContext();
    console.log(formData)


    /**This State is initializing the form with certain values
    * @returns {this.state.data}
    * 
    */
    const [data, setData] = useState({
        schoolName: formData.qualification.schoolName || '',
        schoolMark: formData.qualification.schoolMark || '',
        schoolPassingYear: formData.qualification.schoolPassingYear || '',
        higherSeconderyName: formData.qualification.higherSeconderyName || '',
        higherSeconderylMark: formData.qualification.higherSeconderylMark || '',
        higherSeconderyPassingYear: formData.qualification.higherSeconderyPassingYear || '',
        universityName: formData.qualification.universityName || '',
        universitylMark: formData.qualification.universitylMark || '',
        universityPassingYear: formData.qualification.universityPassingYear || ''
    });

    const [error, setError] = useState({});
    const [valid, setValid] = useState({});

     /**It runs when any changes is detected in the form
     * 
     * @param {event} event 
     * @description This method will run if any changes detected and call the validation function
     */

     const handleOnChange = (event) => {
        const { value, id } = event.target;
        let newErrors = { ...error }; // Start with existing errors
        let newValid = { ...valid };
        
        if (id.includes('Year')) {
            const numericValue = value.replace(/[^0-9]/g, '');
            event.target.value = numericValue;
            
            if (numericValue.length > 4) {
                newErrors[id] = "Year cannot exceed 4 digits.";
                newValid[id] = false;
            } else if (numericValue && (isNaN(numericValue) || numericValue < 1900 || numericValue > new Date().getFullYear())) {
                newErrors[id] = `Please enter a valid year between 1900 and ${new Date().getFullYear()}.`;
                newValid[id] = false;
            } else {
                newErrors[id] = '';
                newValid[id] = true;
            }
            
            // Update the input value with numeric only
            setData((prevData) => ({
                ...prevData,
                [id]: numericValue
            }));
        } else if (id.includes('Mark')) {
            const cleanedValue = value.replace(/[^0-9.]/g, '');
            const parts = cleanedValue.split('.');
            const numericValue = parts[0] + (parts[1] ? '.' + parts[1].slice(0, 2) : '');
            
            if (numericValue > 100) {
                newErrors[id] = "Percentage cannot exceed 100.";
                newValid[id] = false;
            } else if (numericValue <=0) {
                newErrors[id] = "Percentage must be greater than 0.";
                newValid[id] = false;
            } else if (/\.\d{3,}/.test(numericValue)) { 
                newErrors[id] = "Mark field can contain only one decimal point.";
                newValid[id] = false;
            } else if (numericValue === "") {
                newErrors[id] = '';
                newValid[id] = false;
            } else {
                newErrors[id] = '';
                newValid[id] = true;
            }
            
            setData((prevData) => ({
                ...prevData,
                [id]: numericValue
            }));
        } else if (id.includes('Name')) {
            // Allow only specific characters and minimum length check
            if (!validateName(value)) {
                newErrors[id] = "Academy name must be at least 2 characters long and can only contain alphabets and specific special characters like . , ( )";
                newValid[id] = false;
            } else {
                newErrors[id] = '';
                newValid[id] = true;
            }
            
            // Update the input value
            setData((prevData) => ({
                ...prevData,
                [id]: value
            }));
        }
        
        setError(newErrors);
        setValid(newValid);
        console.log(data);
    };
    
    const validateName = (name) => {
        return /^[a-zA-Z][a-zA-Z0-9\s.,()]*$/.test(name) && name.length >= 2;
    };

    
    /**This method will run when the the form is submitted/pressed save and next
     * 
     * @param {event} event 
     * @description It will save the form if all the input fields are validated
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        
        // Validate required fields
        for (const field in data) {
            if (data[field].trim() === "") {
                newErrors[field] = `The ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field is required.`;
            }
        }
        
        // Validate percentages
        const validatePercentage = (percentage) => {
            const num = parseFloat(percentage);
            return num >= 30 && num <= 100;
        };
    
        if (data.schoolMark && !validatePercentage(data.schoolMark)) {
            newErrors.schoolMark = "Please enter a valid percentage between 30 and 100 for the school mark.";
        }
        if (data.higherSeconderylMark && !validatePercentage(data.higherSeconderylMark)) {
            newErrors.higherSeconderylMark = "Please enter a valid percentage between 30 and 100 for the higher secondary mark.";
        }
        if (data.universitylMark && !validatePercentage(data.universitylMark)) {
            newErrors.universitylMark = "Please enter a valid percentage between 30 and 100 for the university mark.";
        }
        
        // Validate years
        const validateYear = (year) => {
            const num = parseInt(year, 10);
            const currentYear = new Date().getFullYear();
            return num >= 1900 && num <= currentYear;
        };
    
        if (data.schoolPassingYear && !validateYear(data.schoolPassingYear)) {
            newErrors.schoolPassingYear = `Please enter a valid school passing year between 1900 and the current year.`;
        }

        if (data.higherSeconderyPassingYear && !validateYear(data.higherSeconderyPassingYear)) {
            newErrors.higherSeconderyPassingYear = `Please enter a valid higher secondary passing year between 1900 and the current year.`;
        } else if (data.higherSeconderyPassingYear && data.higherSeconderyPassingYear <= data.schoolPassingYear) {
            newErrors.higherSeconderyPassingYear = `Higher secondary passing year must not be less than Matriculation passing year.`;
        }

        if (data.universityPassingYear && !validateYear(data.universityPassingYear)) {
            newErrors.universityPassingYear = `Please enter a valid university passing year between 1900 and the current year.`;
        }else if(data.universityPassingYear && data.universityPassingYear <= data.higherSeconderyPassingYear){
            newErrors.universityPassingYear = `Graduation passing year must not be less than Higher Secondery passing year`;
        }

        if (data.schoolName && !validateName(data.schoolName)) {
            newErrors.schoolName = "Academy name must be at least 2 characters long and can only contain alphabets and specific special characters like . , ( )";
        }
        if (data.higherSeconderyName && !validateName(data.higherSeconderyName)) {
            newErrors.higherSeconderyName = "Academy name must be at least 2 characters long and can only contain alphabets and specific special characters like . , ( )";
        }
        if (data.universityName && !validateName(data.universityName)) {
            newErrors.universityName = "Academy name must be at least 2 characters long and can only contain alphabets and specific special characters like . , ( )";
        }
        
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }
        
        // Clear errors and submit the form data
        setError({});
        setFormData(prev => ({
            ...prev,
            qualification: data
        }));
        
        option();
        submitAction((a) => ({ ...a, section3: true }));
        showConfirmation('Qualification Detail');
        console.log(formData);
    };
    
    

    return (
        <div>
            <form className="lg:mt-12 flex flex-col lg:gap-8 m-4 lg:border-2 lg:p-3 rounded-md" onSubmit={handleSubmit}>
                {/* Matriculation */}
                <div>
                    <p className="text-lg font-bold">MATRICULATION</p>
                    <div className="my-2">
                        <label htmlFor="schoolName">Name of school</label>
                        <input
                            onChange={handleOnChange}
                            defaultValue={data.schoolName}
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.schoolName ? 'border-green-500' : ''}`}
                            id="schoolName"
                            type="text"
                            maxLength={200}
                        />
                        {error.schoolName && <p className="text-red-600">{error.schoolName}</p>}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="w-full lg:w-1/2 my-2">
                            <label htmlFor="schoolMark">Secured Mark in percentage</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.schoolMark}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.sch ? 'border-green-500' : ''}`}
                                id="schoolMark"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                            />
                            {error.schoolMark && <p className="text-red-600">{error.schoolMark}</p>}
                        </div>
                        <div className="w-full lg:w-1/2 lg:my-2">
                            <label htmlFor="schoolPassingYear">Year of passing</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.schoolPassingYear}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.schoolPassingYear ? 'border-green-500' : ''}`}
                                id="schoolPassingYear"
                                type="number"
                                placeholder="e.g. 2012"
                            />
                            {error.schoolPassingYear && <p className="text-red-600">{error.schoolPassingYear}</p>}
                        </div>
                    </div>
                </div>

                {/* Higher Secondary */}
                <div>
                    <p className="text-lg font-bold">HIGHER SECONDERY</p>
                    <div className="my-2">
                        <label htmlFor="higherSeconderyName">Name of the institute</label>
                        <input
                            onChange={handleOnChange}
                            defaultValue={data.higherSeconderyName}
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.higherSeconderyName ? 'border-green-500' : ''}`}
                            id="higherSeconderyName"
                            type="text"
                            maxLength={200}
                        />
                        {error.higherSeconderyName && <p className="text-red-600">{error.higherSeconderyName}</p>}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="w-full lg:w-1/2 my-2">
                            <label htmlFor="higherSeconderylMark">Secured mark in percentage</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.higherSeconderylMark}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.higherSeconderylMark ? 'border-green-500' : ''}`}
                                id="higherSeconderylMark"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                            />
                            {error.higherSeconderylMark && <p className="text-red-600">{error.higherSeconderylMark}</p>}
                        </div>
                        <div className="w-full lg:w-1/2 my-2">
                            <label htmlFor="higherSeconderyPassingYear">Year of passing</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.higherSeconderyPassingYear}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.higherSeconderyPassingYear ? 'border-green-500' : ''}`}
                                id="higherSeconderyPassingYear"
                                type="number"
                                placeholder="e.g. 2015"
                            />
                            {error.higherSeconderyPassingYear && <p className="text-red-600">{error.higherSeconderyPassingYear}</p>}
                        </div>
                    </div>
                </div>

                {/* Graduation */}
                <div>
                    <p className="text-lg font-bold">GRADUATION</p>
                    <div className="my-2">
                        <label htmlFor="universityName">Name of the University</label>
                        <input
                            onChange={handleOnChange}
                            defaultValue={data.universityName}
                            className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.universityName ? 'border-green-500' : ''}`}
                            id="universityName"
                            type="text"
                            maxLength={200}
                        />
                        {error.universityName && <p className="text-red-600">{error.universityName}</p>}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="w-full lg:w-1/2 my-2">
                            <label htmlFor="universitylMark">Secured Mark</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.universitylMark}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.universitylMark ? 'border-green-500' : ''}`}
                                id="universitylMark"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                            />
                            {error.universitylMark && <p className="text-red-600">{error.universitylMark}</p>}
                        </div>
                        <div className="w-full lg:w-1/2 my-2">
                            <label htmlFor="universityPassingYear">Year of passing</label>
                            <input
                                onChange={handleOnChange}
                                defaultValue={data.universityPassingYear}
                                className={`border-2 p-2 rounded-lg focus:border-cyan-700 w-full ${valid.universityPassingYear ? 'border-green-500' : ''}`}
                                id="universityPassingYear"
                                type="number"
                                placeholder="e.g. 2015"
                            />
                            {error.universityPassingYear && <p className="text-red-600">{error.universityPassingYear}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5">
                    <button
                        type="submit"
                        className="w-full font-bold border-blue-700 border-2 bg-white text-blue-700 hover:bg-blue-700 p-2 rounded-lg hover:text-white"
                    >
                        SAVE AND NEXT
                    </button>
                </div>
            </form>
        </div>
    );
};

QualificationDetail.propTypes = {
    option: PropTypes.func,
    submitAction: PropTypes.func,
    showConfirmation: PropTypes.func

}

export default QualificationDetail;
