import { useState, useEffect, useRef } from "react";

export const useElementWidth = (className: string) => {
  const [width, setWidth] = useState(0);
  const elementRef = useRef<any>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    elementRef.current = document.querySelector(`.${className}`);
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth);
    }
  }, [className]);

  return width;
};
