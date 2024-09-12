import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {},
    qualification: {},
    professional: {},
  });

  const getInitialUserData = () => {
    const token = sessionStorage.getItem('access_token');
    
    if (token) {
      try {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = atob(tokenPayload);
        const userData = JSON.parse(decodedPayload);

        return {
          _id: userData._id || '',
          name: userData.name || '',
          email: userData.email || '',
        };

      } catch (error) {
        console.error('Error decoding token:', error);
        return {
          _id: '',
          name: '',
          email: ''
        };
      }
    }

    return {
      _id: '',
      name: '',
      email: ''
    };
  };

  const [currentUser, setCurrentUser] = useState(getInitialUserData);

  const resetFormData = () => {
    setFormData({
      personal: {},
      qualification: {},
      professional: {},
    });
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, resetFormData, currentUser, setCurrentUser }}>
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormContext = () => useContext(FormContext);
