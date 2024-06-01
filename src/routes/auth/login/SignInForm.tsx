import { Input } from 'src/components/form/Input';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { useState } from 'react';
import { options } from 'src/config/options';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, LoginForm } from './login-schema';
import {
  errorToast,
  successToast,
} from 'src/components/ui/ToasterProvider/toast';
import { ToasterProvider } from 'src/components/ui/ToasterProvider/ToasterProvider';

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit = async (data: LoginForm): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        body: options.body(data),
        headers: options.headers,
      });

      const results = await response.json();
      if (!response.ok) {
        throw new Error(
          results.errors ? results.errors[0].message : 'Login failed'
        );
      }

      const user = {
        name: results.data.name,
        email: results.data.email,
        avatar: results.data.avatar,
        bio: results.data.bio,
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', results.data.accessToken);

      successToast('Login successful!', 'bottom-right');
      setTimeout(() => {
        navigate('/');
        reset();
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Invalid email or password';
      errorToast(errorMessage, 'bottom-right');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[50rem] w-full">
      <Input
        type="text"
        name="email"
        id="email"
        label="Email address"
        errorRef={errors.email?.ref as HTMLInputElement}
        required={true}
        optional={false}
        register={register}
        errors={errors?.email?.message}
      />

      <Input
        type="password"
        name="password"
        id="password"
        label="Password"
        errorRef={errors.password?.ref as HTMLInputElement}
        required={true}
        optional={false}
        register={register}
        errors={errors?.password?.message}
      />

      <PrimaryButton type="submit" width="full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </PrimaryButton>

      <span>
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-700 underline">
          create one
        </Link>
      </span>
      <ToasterProvider />
    </form>
  );
};
