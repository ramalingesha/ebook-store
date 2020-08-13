import { useState } from 'react';

export enum ErrorType {
  REQUIRED,
  EMAIL,
  REGEX,
  MINLENGTH,
  MAXLENGTH
}

export interface Validation {
  type: ErrorType;
  message: string;
}

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const handleInputErrors = (
  value: string,
  validations: Validation[] = []
): string | undefined => {
  if (validations.length === 0) {
    return undefined;
  }

  let error;
  validations.some((validation) => {
    switch (validation.type) {
      case ErrorType.REQUIRED:
        if (value.length === 0) {
          error = validation.message;
          return true;
        }
        break;
      case ErrorType.EMAIL:
        if (!EMAIL_REGEX.test(value)) {
          error = validation.message;
          return true;
        }
        break;
    }
  });

  return error;
};

export const useFormInput = (
  initialValue: string,
  validations?: Validation[]
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value: string = event.target.value;
    setError(handleInputErrors(value, validations));
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleChange,
    error: error !== undefined,
    helperText: error || ''
  };
};
