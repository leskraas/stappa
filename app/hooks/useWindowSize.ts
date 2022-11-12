import { useEffect, useState } from "react";

type WindowSize = {
  width?: number;
  height?: number;
};

export type UseWindowSize = {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} & WindowSize;

export function useWindowSize(): UseWindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const isPhone = (windowSize.width || 0) < 640;
  const isTablet = !isPhone && (windowSize.width || 0) < 1024;
  const isDesktop = !isTablet && !isPhone;

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    ...windowSize,
    isPhone,
    isTablet,
    isDesktop,
  };
}
