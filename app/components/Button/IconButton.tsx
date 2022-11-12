import { HTMLMotionProps, motion } from "framer-motion";

type IconButtonProps = Omit<HTMLMotionProps<"button">, "aria-labelledby"> & {
  icon: JSX.Element;
  text: string;
};

export function IconButton({
  icon,
  text,
  ...props
}: IconButtonProps): JSX.Element {
  const id = `icon-button-${text}`;
  return (
    <motion.button aria-labelledby={id} {...props}>
      <span id={id} hidden className="hidden">
        {text}
      </span>
      <icon.type
        {...icon.props}
        aria-hidden={true}
        className={`h-6 w-6 ${icon.props["className"] || ""}`}
      />
    </motion.button>
  );
}
