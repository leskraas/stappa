import classNames from "classnames";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { AnimatedShadow } from "../AnimatedShadow";

type ButtonProps = Omit<HTMLMotionProps<"button">, "aria-labelledby"> & {
  icon?: JSX.Element;
};

export function Button({
  icon,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element {
  const iconStyling = icon?.props["className"];
  return (
    <AnimatedShadow className="inline-block rounded-full">
      <motion.button
        className={classNames(
          "flex items-center gap-2 rounded-full bg-slate-800 py-2 px-4 text-sm font-bold text-white shadow-md",
          {
            classNames: !!classNames,
          }
        )}
        {...props}
      >
        {icon && (
          <icon.type
            {...icon.props}
            aria-hidden={true}
            className={classNames("h-5 w-5", {
              iconStyling: !!iconStyling,
            })}
          />
        )}
        <span className="">{children}</span>
      </motion.button>
    </AnimatedShadow>
  );
}
