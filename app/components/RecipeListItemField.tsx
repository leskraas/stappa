import classNames from "classnames";
import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

type Props = {
  label: string;
  isEditMode?: boolean;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function RecipeListItemField({
  label,
  isEditMode = true,
  name,
  className,
  width,
  ...rest
}: Props): JSX.Element {
  const { error, getInputProps } = useField(name);

  return (
    <div
      className={classNames(
        "group relative my-1 flex gap-2 rounded-md bg-inherit p-1",
        { "outline outline-2 outline-offset-[-1px] outline-red-600": !!error },
        { "hover:outline-red-800": !!error },
        { "hover:bg-stone-100": !error }
      )}
    >
      <label className="sr-only text-stone-600" htmlFor={name}>
        {label}
      </label>
      <input
        style={{ minWidth: width }}
        name={name}
        {...getInputProps({
          id: name,
          placeholder: label,
          ...rest,
        })}
        className={`w-full py-1 outline-none group-hover:bg-inherit ${className}`}
      />
      {error && (
        <span
          className={classNames(
            "absolute bottom-full translate-y-2 bg-white p-0.5 text-xs text-red-600",
            { "group-hover:text-red-800": !!error }
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
}
