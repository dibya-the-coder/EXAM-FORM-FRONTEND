import { useState } from "react";
import QualificationDetail from "../component/QualificationDetail";
import PersonalDetail from "../component/PersonalDetail";
import ProfessionalDetail from "../component/ProfessionalDetail";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**ExamAccordion component handles the display and submission of different sections
 * in a multi-section form. It uses state to manage which sections have been submitted
 * and which section is currently open.
 *
 * @component
 * @example
 * return (
 *   <ExamAccordion />
 * )
 */
const ExamAccordion = () => {
    const [submittedSections, setSubmittedSections] = useState({
        section1: true,
        section2: false,
        section3: false,
    });

    const [openSection, setOpenSection] = useState('section1'); // Open section1 by default

    /**Shows a success toast message when a section is submitted.
     *
     * @param {string} sectionName - The name of the section that was submitted.
     */
    const showToast = (sectionName) => {
        toast.success(`${sectionName} submitted successfully!`);
    };


    /**Handles the transition to the next section when the current section is submitted.
     *
     * @param {string} currentSection - The name of the currently submitted section.
     */
    const  handleNextSection = (currentSection) => {
        if (currentSection === 'section1') {
            setSubmittedSections((prev) => ({ ...prev, section2: true }));
            setOpenSection('section2');
        } else if (currentSection === 'section2') {
            setSubmittedSections((prev) => ({ ...prev, section3: true }));
            setOpenSection('section3');
        }
    };

    /**Toggles the visibility of a section. A section can only be toggled open if it has been submitted.
     *
     * @param {string} section - The name of the section to toggle.
     */
    const handleToggle = (section) => {
        if (submittedSections[section]) {
            setOpenSection((prev) => (prev === section ? null : section));
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <ToastContainer position="top-center" className={'w-full lg:w-[30%]'} />
            {/* Section 1 */}
            <div className="border-b border-slate-200 mb-4">
                <button
                    className="w-full flex justify-between items-center py-5 text-slate-800"
                    onClick={() => handleToggle('section1')}
                >
                    <h2 className="text-center text-2xl">PERSONAL DETAIL</h2>
                    <span id="icon-1" className="text-slate-800 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={`w-4 h-4 ${openSection === 'section1' ? 'rotate-180' : ''}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {openSection === 'section1' && (
                    <div id="content-1" className="transition-all duration-300 ease-in-out overflow-hidden">
                        <div className="p-4">
                            <PersonalDetail
                                showConfirmation={() => {
                                    showToast('Personal Detail');
                                    handleNextSection('section1'); // Automatically go to the next section
                                }}
                                option={setOpenSection}
                                submitAction={setSubmittedSections}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Section 2 */}
            <div className="border-b border-slate-200 mb-4">
                <button
                    className={`w-full flex justify-between items-center py-5 text-slate-800 ${
                        submittedSections.section1 ? '' : 'cursor-not-allowed'
                    }`}
                    disabled={!submittedSections.section1}
                    onClick={() => handleToggle('section2')}
                >
                    <h2 className="text-center text-2xl">ACADEMIC DETAIL</h2>
                    <span id="icon-2" className="text-slate-800 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={`w-4 h-4 ${openSection === 'section2' ? 'rotate-180' : ''}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {openSection === 'section2' && (
                    <div id="content-2" className="transition-all duration-300 ease-in-out overflow-hidden">
                        <div className="p-4">
                            <QualificationDetail
                                showConfirmation={() => {
                                    showToast('Academic Detail');
                                    handleNextSection('section2');
                                }}
                                option={setOpenSection}
                                submitAction={setSubmittedSections}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Section 3 */}
            <div className="border-b border-slate-200 mb-4">
                <button
                    className={`w-full flex justify-between items-center py-5 text-slate-800 ${
                        submittedSections.section2 ? '' : 'cursor-not-allowed'
                    }`}
                    disabled={!submittedSections.section2}
                    onClick={() => handleToggle('section3')}
                >
                    <h2 className="text-center text-2xl">PROFESSIONAL DETAIL</h2>
                    <span id="icon-3" className="text-slate-800 transition-transform duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={`w-4 h-4 ${openSection === 'section3' ? 'rotate-180' : ''}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                {openSection === 'section3' && (
                    <div id="content-3" className="transition-all duration-300 ease-in-out overflow-hidden">
                        <div className="p-4">
                            <ProfessionalDetail
                                showConfirmation={() => {
                                    showToast('Professional Detail');
                                    handleNextSection('section3');
                                }}
                                option={setOpenSection}
                                submitAction={setSubmittedSections}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamAccordion;
