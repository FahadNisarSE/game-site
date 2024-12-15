import { useState, useEffect } from "react";

const useScroll = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setscrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(window.scrollX);
      setscrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollX, scrollY };
};

export default useScroll;
