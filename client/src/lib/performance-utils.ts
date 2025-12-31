import { useEffect, useRef, useState } from 'react';

/**
 * Throttle hook to prevent excessive function calls
 * Useful for scroll, resize, and mouse move events
 */
export const useThrottle = (callback: (...args: any[]) => void, delay: number) => {
  const lastRun = useRef(Date.now());
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return (...args: any[]) => {
    if (Date.now() - lastRun.current >= delay) {
      ref.current(...args);
      lastRun.current = Date.now();
    }
  };
};

/**
 * Debounce hook to delay function execution
 * Useful for search inputs and resize handlers
 */
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Check if user prefers reduced motion
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Intersection Observer hook for lazy rendering
 */
export const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
};

/**
 * Optimize component rendering by reducing unnecessary re-renders
 * Monitors device performance and adjusts rendering quality
 */
export const usePerformanceMonitor = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check for low-end devices using navigator properties
    const cores = navigator.hardwareConcurrency || 1;
    const memory = (navigator.deviceMemory as any) || 4;
    
    if (cores <= 2 || memory <= 4) {
      setIsLowPerformance(true);
    }

    // Check connection speed
    const connection = (navigator.connection as any) || {};
    if (connection.effectiveType === '4g' || connection.effectiveType === '3g') {
      setIsLowPerformance(true);
    }
  }, []);

  return isLowPerformance;
};
