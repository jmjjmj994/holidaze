import { RegisterForm } from './RegisterForm';
export const Register = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="max-w-[50rem] w-full text-center title-gap">
        <h1>Create account</h1>
      </div>
      <RegisterForm />
    </section>
  );
};
