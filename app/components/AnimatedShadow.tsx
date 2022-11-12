import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";

export function AnimatedShadow({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">): JSX.Element {
  return (
    <motion.div whileHover={"shadow-hover"}>
      <div {...props} className={`relative ${className}`}>
        <div className="bg-inherit">{children}</div>
        <motion.span
          variants={{
            "shadow-hover": {
              opacity: 1,
            },
          }}
          className="absolute inset-0 -z-10 opacity-0 shadow-lg  rounded-inherit"
        />
      </div>
    </motion.div>
  );
}
