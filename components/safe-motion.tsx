"use client";

import { motion, MotionProps } from "framer-motion";
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";

interface SafeMotionProps extends MotionProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

// Component wrapper để tránh hydration issues với framer-motion
export function SafeMotion({ children, as = "div", className, ...props }: SafeMotionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Component = (motion[as as keyof typeof motion] || motion.div) as typeof motion.div;

    if (!isMounted) {
        const StaticComponent = as as any;
        return (
        <StaticComponent className={className} style={props.style}>
            {children}
        </StaticComponent>
        );
    }

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

// Hook để tránh hydration issues
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}