import { Register, RegisterSchema } from './register-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { Input } from 'src/components/form/Input';
import { options } from 'src/config/options';
import { RegisterError } from './RegisterError';
import { Link, useNavigate } from 'react-router-dom';
import { redirectLogin } from './redirectLogin';
import {
  errorToast,
  successToast,
} from 'src/components/ui/ToasterProvider/toast';
import { useState } from 'react';
import { ToasterProvider } from 'src/components/ui/ToasterProvider/ToasterProvider';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Register>({ resolver: zodResolver(RegisterSchema) });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const onSubmit = async (data: Register) => {
    setIsLoading(true);
    fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: options.headers,
      body: options.body(data),
    })
      .then((response) => response.json())
      .then((results) => {
        if (results.errors) {
          throw new Error(results.errors[0].message);
        }

        redirectLogin({ email: data.email, password: data.password });
        successToast('Registration successful!', 'bottom-right');
        setTimeout(() => {
          navigate('/');
          reset();
        }, 1500);
      })

      .catch((error) => {
        const errorMessage =
          error instanceof Error ? error.message : 'Profile already exists';
        errorToast(errorMessage, 'bottom-right');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[50rem] w-full">
      <Input
        type="text"
        name="name"
        id="name"
        label="Name"
        required={true}
        optional={false}
        register={register}
      />
      <Input
        type="text"
        name="email"
        id="email"
        label="Email address"
        required={true}
        optional={false}
        register={register}
      />
      <Input
        type="password"
        name="password"
        id="password"
        label="Create a password"
        required={true}
        optional={false}
        register={register}
      />
      <section className="flex flex-col gap-3 my-4  min-h-[14vh] py-2">
        {errors?.name ? (
          <RegisterError variant={'error'}>
            The name must not contain punctuation symbols apart from underscore
          </RegisterError>
        ) : (
          <RegisterError variant={'success'}>
            The name must not contain punctuation symbols apart from underscore
          </RegisterError>
        )}

        {errors?.email ? (
          <RegisterError variant={'error'}>
            The email value must be a valid stud.noroff.no email
          </RegisterError>
        ) : (
          <RegisterError variant={'success'}>
            The email value must be a valid stud.noroff.no email
          </RegisterError>
        )}

        {errors?.password ? (
          <RegisterError variant={'error'}>
            The password value must be at least 8 characters
          </RegisterError>
        ) : (
          <RegisterError variant={'success'}>
            The password value must be at least 8 characters
          </RegisterError>
        )}
      </section>

      <PrimaryButton type="submit" width="full">
        Create account
      </PrimaryButton>
      <span className="flex gap-2  text-sm md:text-base">
        Already have an account?
        <Link className="underline text-blue-600 " to={'/sign-in'}>
          Sign in
        </Link>
      </span>
      <ToasterProvider />
    </form>
  );
};
