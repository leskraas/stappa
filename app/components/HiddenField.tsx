import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

type Props = {
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
} & InputHTMLAttributes<HTMLInputElement>;

export function HiddenField({ name, ...rest }: Props): JSX.Element {
  const { getInputProps } = useField(name);

  return <input name={name} {...getInputProps({ id: name, ...rest })} hidden />;
}
