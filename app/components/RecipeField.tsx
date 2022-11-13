import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

type Props = {
  iconElement?: JSX.Element;
  label: string;
  inlineLabel?: boolean;
  hideLabel?: boolean;
  isEditMode?: boolean;
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
} & InputHTMLAttributes<HTMLInputElement>;

export function RecipeField({
  iconElement,
  label,
  hideLabel = false,
  isEditMode = true,
  name,
  inlineLabel = false,
  className,
  ...rest
}: Props): JSX.Element {
  const { error, getInputProps } = useField(name);

  return (
    <div className="group flex flex-1 flex-col gap-2 rounded-md hover:bg-stone-200">
      <div className="flex items-center gap-2">
        <div className={`h-auto w-6`}>
          {iconElement && (
            <iconElement.type
              {...iconElement.props}
              className={`h-6 w-6 text-stone-600 ${
                iconElement.props["className"] || ""
              }`}
            />
          )}
        </div>
        {!isEditMode && <span>{label}</span>}
        {isEditMode && (
          <div className="flex flex-1 gap-2 rounded-md p-1 group-hover:bg-inherit">
            <label
              className={`text-stone-600 ${
                hideLabel || inlineLabel ? "sr-only" : ""
              }`}
              htmlFor={name}
            >
              {label}
            </label>
            <input
              name={name}
              {...getInputProps({
                id: name,
                placeholder: inlineLabel ? label : undefined,
                ...rest,
              })}
              className={`h-auto flex-1 border-2 border-none border-gray-800 bg-inherit outline-none group-hover:bg-inherit ${className}`}
            />
          </div>
        )}
      </div>
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
}
