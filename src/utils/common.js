export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePincode = (pincode) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };
  
  export const formatCurrency = (amount) => {
    return `₹${amount.toFixed(2)}`;
  };
  
  export const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return 'Something went wrong';
  };