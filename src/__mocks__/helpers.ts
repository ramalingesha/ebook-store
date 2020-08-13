import { act } from 'react-dom/test-utils';

export const waitForDomChanges = async (ms = 0) => {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
};