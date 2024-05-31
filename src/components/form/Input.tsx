import { RefObject } from 'react';
import { FieldValues } from 'react-hook-form';
interface InputProps extends FieldValues {
  type: string;
  label: string;
  id: string;
  name: string;
  required: boolean;
  optional: boolean;
  errors?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  id,
  name,
  required,
  optional,
  register,
  errors,
  errorRef,
}) => {
  return (
    <label className="flex flex-col" htmlFor={id}>
      <p>
        {label} {required && <span className="text-xs">(required) </span>}
        {optional && <span className="text-xs">(optional) </span>}
      </p>

      <input
        className={`${
          errorRef ? 'border-red-500' : 'border'
        } border  py-2 rounded-sm pl-2`}
        type={type}
        id={id}
        {...register(name)}
      />
      <div className="min-h-[5vh] py-2">
        {errors && (
          <label className="flex items-center gap-2" htmlFor={`error-${name}`}>
            <p className="text-sm text-red-500">{errors.toString()}</p>
          </label>
        )}
      </div>
    </label>
  );
};
