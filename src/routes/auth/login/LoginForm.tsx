import { Input } from 'src/components/form/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { useState } from 'react';
import { options } from 'src/config/options';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './login-schema';
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" max-w-[50rem] w-full">
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

const loginUser = async (data: FieldValues) => {
  fetch('https://v2.api.noroff.dev/auth/login', {
    method: 'POST',
    body: options.body(data),
    headers: options.headers,
  })
    .then((response) => response.json())
    .then((results) => {
      console.log(results);
      if (results.errors) {
        throw new Error(results.errors[0].message);
      }

      const user = {
        name: results.data.name,
        email: results.data.email,
        avatar: results.data.avatar,
        bio: results.data.bio,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', results.data.accessToken);
    })
    .catch((error) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid email or password';
    });
};
