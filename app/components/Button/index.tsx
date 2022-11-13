import classNames from "classnames";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";

type ButtonProps = Omit<HTMLMotionProps<"button">, "aria-labelledby"> & {
  icon?: JSX.Element;
  variant?: "green";
};

export function Button({
  icon,
  className,
  children,
  variant,
  ...props
}: ButtonProps): JSX.Element {
  const iconStyling = icon?.props["className"];
  return (
    <motion.button
      className={classNames(
        "flex items-center gap-2 rounded-full border border-stone-300 px-3 py-1.5 text-sm font-bold text-stone-900 duration-300 hover:bg-stone-200 sm:py-2 sm:px-4",
        {
          classNames: !!classNames,
          "pl-2 sm:pl-3": !!icon,
          "border-green-600 hover:bg-green-50": variant === "green",
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
  );
}
