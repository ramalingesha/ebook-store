import { renderHook, act } from '@testing-library/react-hooks';
import { useFormInput, Validation, ErrorType } from './form-input';
import '@testing-library/jest-dom/extend-expect';
import { waitForDomChanges } from '../../__mocks__/helpers';

describe.only('useFormInput hook', () => {
  describe('value change', () => {
    it('should use formInput', () => {
      const { result } = renderHook(() => useFormInput(''));

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');
      expect(typeof result.current.onChange).toBe('function');
      expect(typeof result.current.onBlur).toBe('function');
    });

    it('onChange function should update value', async () => {
      const { result } = renderHook(() => useFormInput(''));

      expect(result.current.value).toBe('');

      const event = {
        target: {
          value: 'new value'
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('new value');
    });

    it('onBlur function should update value', async () => {
      const { result } = renderHook(() => useFormInput('value'));

      expect(result.current.value).toBe('value');

      const event = {
        target: {
          value: 'updated value'
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('updated value');
    });
  });

  describe('error validations', () => {
    const requiredError: Validation[] = [
      {
        type: ErrorType.REQUIRED,
        message: 'This is required field'
      }
    ];

    const emailError: Validation[] = [
      {
        type: ErrorType.EMAIL,
        message: 'Invalid email'
      }
    ];

    it('required error on onBlur function call', async () => {
      const { result } = renderHook(() => useFormInput('value', requiredError));

      expect(result.current.value).toBe('value');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('This is required field');

      event.target.value = 'new value';

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('new value');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');
    });

    it('invalid email error on onBlur function call', async () => {
      const { result } = renderHook(() => useFormInput('', emailError));

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: 'test'
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('test');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('Invalid email');

      event.target.value = 'test@sd.com';

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('test@sd.com');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');
    });

    it('required error on onChange function call', async () => {
      const { result } = renderHook(() => useFormInput('value', requiredError));

      expect(result.current.value).toBe('value');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('This is required field');

      event.target.value = 'new value';

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('new value');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');
    });

    it('invalid email error on onChange function call', async () => {
      const { result } = renderHook(() => useFormInput('', emailError));

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: 'test'
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('test');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('Invalid email');

      event.target.value = 'test@sd.com';

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('test@sd.com');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');
    });

    it('should validate errors only on onBlur or onChange function call', () => {
      let { result } = renderHook(() => useFormInput('', requiredError));

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('This is required field');

      act(() => {
        result = renderHook(() => useFormInput('test', emailError)).result;
      });

      expect(result.current.value).toBe('test');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      event = {
        target: {
          value: 'test@sd'
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('test@sd');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('Invalid email');
    });

    it('when error validation matches with more than one error type, it should set error with first match in insertion order and skip all other errors', () => {
      let validations = [...requiredError, ...emailError];
      let { result } = renderHook(() => useFormInput('', validations));

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      let event = {
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onBlur(event);
      });

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('This is required field');

      validations = [...emailError, ...requiredError];

      act(() => {
        result = renderHook(() => useFormInput('value', validations)).result;
      });

      expect(result.current.value).toBe('value');
      expect(result.current.error).toBeFalsy();
      expect(result.current.helperText).toBe('');

      event = {
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

      act(() => {
        result.current.onChange(event);
      });

      expect(result.current.value).toBe('');
      expect(result.current.error).toBeTruthy();
      expect(result.current.helperText).toBe('Invalid email');
    });
  });
});
