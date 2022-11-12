import type { InputHTMLAttributes } from "react";
import { useField } from "remix-validated-form";

type Props = {
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  newVal: number;
} & InputHTMLAttributes<HTMLInputElement>;

export function HiddenFieldOrder({
  name,
  newVal,
  ...rest
}: Props): JSX.Element {
  const { getInputProps } = useField(name);
  // const [val, setValue] = useControlField<number>(name);
  // console.log("val", newVal, val, name);

  // useEffect(() => {
  //   setValue(newVal);
  // }, [newVal]);

  return (
    <input
      name={name}
      {...getInputProps({
        // id: name,
        value: newVal,
        // onChange: (e) => setValue(e.target.value),
        ...rest,
      })}
    />
  );
}
