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
      <div className="flex items-center gap-2">
        <p>
          {label} {required && <span className="text-xs">(obligatorisk) </span>}
          {optional && <span className="text-xs">(valgfritt) </span>}
        </p>
      </div>
      <input
        className={`${
          errorRef ? 'border-red-500' : 'border'
        } border rounded-md py-1`}
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
