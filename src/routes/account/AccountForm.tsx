import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountUpdateSchema, AccountUpdate } from './account-update';
import { useFetchProfile } from 'src/client/api/use-fetch-profile.hook';
import { Input } from 'src/components/form/Input';
import { getUsername } from 'src/utilities/utilities';
import { options } from 'src/config/options';
import { PrimaryButton } from 'src/components/button/PrimaryButton';
import { ToasterProvider } from 'src/components/ui/ToasterProvider/ToasterProvider';
import { Spinner } from 'src/components/ui/spinner/Spinner';
import { errorToast } from 'src/components/ui/ToasterProvider/toast';
import { useLocation } from 'react-router-dom';

export const AccountForm = () => {
  const username = getUsername();
  const { data } = useFetchProfile(username);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<AccountUpdate>({
    resolver: zodResolver(AccountUpdateSchema),
    defaultValues: {
      avatar: {
        url: data?.data?.avatar?.url,
        alt: data?.data?.avatar?.alt,
      },
      bio: data?.data.bio,
      venueManager: data?.data?.venueManager,
    },
  });

  const bioLength = watch('bio', data?.data.bio) || '';
  const onSubmit = (data: AccountUpdate) => {
    console.log(data, 'here data');
    if (!isDirty) {
      return;
    }

    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${username}`, {
      method: 'PUT',
      headers: options.headers,
      body: options.body(data),
    })
      .then((response) => {
        if (!isDirty) return;
        console.log(response);
        console.log(response.statusText, response.status);
        if (!response.ok) {
          throw new Error(`${response.statusText}: Error updating profile`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <ToasterProvider />
      <Input
        type="text"
        label="Update your avatar"
        id="avatar.url"
        name="avatar.url"
        optional={true}
        required={false}
        register={register}
        errors={errors?.avatar?.url?.message}
      />

      <label htmlFor="bio">
        <div className="flex gap-2 items-center">
          <p>Update your bio </p>
          <span className="text-xs">(optional)</span>
        </div>
        <textarea
          maxLength={160}
          className="border rounded-md w-full min-h-[20vh] px-2 py-2 resize-none"
          id="bio"
          {...register('bio')}
        ></textarea>
        <p className="text-xs"> {bioLength.length}/160</p>
        <div className="min-h-[5vh] flex items-center">
          {errors && errors.bio && <p>{errors?.bio.message}</p>}
        </div>
      </label>

      <label className="flex items-center gap-2" htmlFor="venueManager">
        {data?.data.venueManager
          ? 'Uncheck to stop being a venue manager'
          : 'Check to become a venue manager'}{' '}
        <input type="checkbox" {...register('venueManager')} />
      </label>
      <PrimaryButton type="submit" width="full">
        Change
      </PrimaryButton>
    </form>
  );
};
