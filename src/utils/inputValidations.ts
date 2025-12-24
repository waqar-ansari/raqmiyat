export const nameRules = {
  required: 'Name is required',
};

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email',
  },
};

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};
export const phoneNumberRules = {
   pattern: {
    value: /^\d+$/,
    message: 'Phone number can only contain numbers',
  },
  minLength: {
    value: 8,
    message: 'Phone number must be atleast 8 digit',
  },
};
