import { LoginForm } from './LoginForm';
//https://v2.api.noroff.dev/holidaze/venues/?_owner=true&_bookings=true&page=${currentPage}
export const Login = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <div className="max-w-[50rem] w-full text-center title-gap">
        <h1 className="text-xl ">Log in or sign up</h1>
      </div>
      <LoginForm />
    </section>
  );
};
