import { useState, useEffect } from 'react';

export function useMobileScreen(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update the state based on window width
    const updateSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener
    window.addEventListener('resize', updateSize);

    // Call it initially
    updateSize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, [breakpoint]);

  return isMobile;
};