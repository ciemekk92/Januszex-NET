import React from 'react';

export const useOutsideClick = (ref: Unrestricted, handler: Unrestricted) => {
  React.useEffect(() => {
    const listener = (event: Unrestricted) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
