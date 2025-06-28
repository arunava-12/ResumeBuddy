interface InputProps<K extends string, V extends string | string[]> {
  label: string;
  labelClassName?: string;
  // name is passed in as a const string. Therefore, we make it a generic type so its type can
  // be more restricted as a const for the first argument in onChange
  name: K;
  value?: V;
  placeholder: string;
  onChange: (name: K, value: V) => void;
}

/**
 * InputGroupWrapper wraps a label element around a input children. This is preferable
 * than having input as a sibling since it makes clicking label auto focus input children
 */
export const InputGroupWrapper = ({
  label,
  className,
  labelClassName = "", // ✅ add this
  children,
}: {
  label: string;
  className?: string;
  labelClassName?: string; // ✅ add this
  children?: React.ReactNode;
}) => (
  <label className={`text-base font-medium ${labelClassName} ${className}`}>
    {label}
    {children}
  </label>
);


export const INPUT_CLASS_NAME =
  "mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base";

import { LexicalListEditor } from "./LexicalListEditor";
import { LexicalPlainEditor } from "./LexicalPlainEditor";

export const Input = <K extends string>({
  name,
  value = "",
  placeholder,
  onChange,
  label,
  labelClassName,
}: InputProps<K, string>) => {
  return (
    <LexicalPlainEditor
      label={label}
      labelClassName={labelClassName}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      minHeight="40px"
    />
  );
};

export const Textarea = <T extends string>({
  label,
  labelClassName: wrapperClassName,
  name,
  value = "",
  placeholder,
  onChange,
}: InputProps<T, string>) => {
  return (
    <LexicalPlainEditor
      label={label}
      labelClassName={wrapperClassName}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      minHeight="100px"
      autoResizable={true}
    />
  );
};

export const BulletListTextarea = <T extends string>(
  props: InputProps<T, string[]>
) => {

  return (
    <LexicalListEditor
      label={props.label}
      labelClassName={props.labelClassName}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};
