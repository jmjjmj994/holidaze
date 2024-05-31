import { useState } from 'react';
import { Input } from 'src/components/form/Input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form
      action="
  "
      className=" max-w-[50rem] w-full"
    >
      <Input
        type="text"
        name="email"
        id="email"
        label="email"
        required={true}
        optional={false}
        register={register}
      />
      <Input
        type="password"
        name="password"
        id="password"
        label="password"
        required={false}
        optional={true}
        register={register}
      />

      <PrimaryButton type="submit" width="full">
        Log in
      </PrimaryButton>

      <span>
        Don't have an account?{' '}
        <Link to={''} className="text-blue-700 underline">
          create one{' '}
        </Link>{' '}
      </span>
    </form>
  );
};
