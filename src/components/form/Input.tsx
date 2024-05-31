import { FieldValues, UseFormRegister } from 'react-hook-form';
interface InputProps extends FieldValues {
  type: string;
  label: string;
  id: string;
  name: string;
  required: boolean;
  optional: boolean;
  error?: string;
  register: UseFormRegister<FieldValues>;
  errorRef?: HTMLElement;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  id,
  name,
  required,
  optional,
  register,
  error,
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
        {error && (
          <label className="flex items-center gap-2" htmlFor={`error-${name}`}>
            <p className="text-sm">{error}</p>
          </label>
        )}
      </div>
    </label>
  );
};
